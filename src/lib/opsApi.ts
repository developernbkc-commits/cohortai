import { edgeFunctionUrl, env, hasPhaseBBackend } from './env';
import { canPublishCoupons, getAdminSessionRole } from './adminAuth';
import { sampleCouponRequests, samplePrograms } from './programStudioData';

export type ProgramDraft = {
  name: string;
  slug: string;
  mode: 'Online' | 'Live' | 'Hybrid';
  audience: string;
  duration: string;
  priceInr: number;
  outcomes: string[];
  featured: boolean;
};

export type ProgramRecord = ProgramDraft & {
  id: string;
  status?: string;
  courseCount?: number;
  title?: string;
  short_description?: string;
  publish_status?: string;
  is_featured?: boolean;
};

export type CouponRequestDraft = {
  code: string;
  bindType: 'email' | 'phone' | 'open';
  bindValue: string;
  discountLabel: string;
  validUntil: string;
  notes?: string;
};

export type CouponRequestRecord = CouponRequestDraft & {
  id: string;
  requestedBy?: string;
  requested_by_role_code?: string;
  financeStatus?: string;
  finance_status?: string;
  publish_status?: string;
  coupon_request_id?: string;
  bind_type?: 'email' | 'phone' | 'open';
  bind_value?: string;
  coupon_code?: string;
};

type Result<T> = { ok: true; mode: 'remote' | 'fallback'; data: T } | { ok: false; mode: 'remote' | 'fallback'; error: string };

const PROGRAMS_KEY = 'cohortai_program_studio_records';
const COUPONS_KEY = 'cohortai_coupon_requests';

function readArray<T>(key: string, fallback: T[]): T[] {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function writeArray<T>(key: string, value: T[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

async function postJson<T>(fn: string, payload: unknown): Promise<T> {
  const res = await fetch(edgeFunctionUrl(fn), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: env.supabaseAnonKey,
      Authorization: `Bearer ${env.supabaseAnonKey}`,
    },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || `Request failed: ${res.status}`);
  return json as T;
}

async function getJson<T>(fn: string): Promise<T> {
  const res = await fetch(edgeFunctionUrl(fn), {
    method: 'GET',
    headers: {
      apikey: env.supabaseAnonKey,
      Authorization: `Bearer ${env.supabaseAnonKey}`,
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || `Request failed: ${res.status}`);
  return json as T;
}

export function listProgramsFallback() {
  return readArray(PROGRAMS_KEY, samplePrograms) as ProgramRecord[];
}

export async function listPrograms(): Promise<Result<ProgramRecord[]>> {
  if (!hasPhaseBBackend()) {
    return { ok: true, mode: 'fallback', data: listProgramsFallback() };
  }
  try {
    const data = await getJson<{ items: any[] }>('admin-list-programs');
    return {
      ok: true,
      mode: 'remote',
      data: (data.items ?? []).map((item) => ({
        id: item.id,
        name: item.title,
        slug: item.slug,
        mode: item.mode,
        audience: item.short_description,
        duration: item.duration_label,
        priceInr: item.price_inr,
        outcomes: item.outcomes ?? [],
        featured: item.is_featured,
        status: item.publish_status,
        courseCount: item.course_count ?? item.outcomes?.length ?? 0,
      })),
    };
  } catch (error) {
    return { ok: false, mode: 'remote', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function listCouponRequestsFallback() {
  return readArray(COUPONS_KEY, sampleCouponRequests) as CouponRequestRecord[];
}

export async function listCouponRequests(): Promise<Result<CouponRequestRecord[]>> {
  if (!hasPhaseBBackend()) {
    return { ok: true, mode: 'fallback', data: listCouponRequestsFallback() };
  }
  try {
    const data = await getJson<{ items: any[] }>('admin-list-coupon-requests');
    return {
      ok: true,
      mode: 'remote',
      data: (data.items ?? []).map((item) => ({
        id: item.id,
        code: item.coupon_code,
        bindType: item.bind_type,
        bindValue: item.bind_value,
        discountLabel: item.discount_type === 'percent' ? `${item.discount_value}% off` : `₹${item.discount_value} off`,
        validUntil: item.valid_until ? String(item.valid_until).slice(0, 10) : '',
        notes: item.notes,
        requestedBy: item.requested_by_role_code,
        financeStatus: item.finance_status,
        publish_status: item.publish_status,
      })),
    };
  } catch (error) {
    return { ok: false, mode: 'remote', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function createProgram(draft: ProgramDraft): Promise<Result<{ id?: string }>> {
  const actorRole = getAdminSessionRole();
  const payload = { ...draft, actorRole };
  if (!hasPhaseBBackend()) {
    const next = [
      {
        id: `${Date.now()}`,
        status: 'draft',
        courseCount: draft.outcomes.length,
        ...draft,
      },
      ...listProgramsFallback(),
    ];
    writeArray(PROGRAMS_KEY, next);
    return { ok: true, mode: 'fallback', data: { id: `${Date.now()}` } };
  }
  try {
    const data = await postJson<{ id?: string }>('admin-upsert-program', payload);
    return { ok: true, mode: 'remote', data };
  } catch (error) {
    return { ok: false, mode: 'remote', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function requestCoupon(draft: CouponRequestDraft): Promise<Result<{ id?: string }>> {
  const actorRole = getAdminSessionRole();
  const payload = { ...draft, actorRole };
  if (!hasPhaseBBackend()) {
    const next = [
      {
        id: `${Date.now()}`,
        financeStatus: 'requested',
        requestedBy: actorRole || 'unknown',
        publish_status: 'draft',
        ...draft,
      },
      ...listCouponRequestsFallback(),
    ];
    writeArray(COUPONS_KEY, next);
    return { ok: true, mode: 'fallback', data: { id: `${Date.now()}` } };
  }
  try {
    const data = await postJson<{ id?: string }>('request-coupon', payload);
    return { ok: true, mode: 'remote', data };
  } catch (error) {
    return { ok: false, mode: 'remote', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function financePublishCoupon(couponRequestId: string): Promise<Result<{ couponId?: string; publishStatus?: string }>> {
  const actorRole = getAdminSessionRole();
  if (!canPublishCoupons(actorRole)) {
    return { ok: false, mode: hasPhaseBBackend() ? 'remote' : 'fallback', error: 'Current role cannot publish coupons.' };
  }

  if (!hasPhaseBBackend()) {
    const next = listCouponRequestsFallback().map((item) =>
      item.id === couponRequestId
        ? { ...item, financeStatus: 'approved', publish_status: 'published' }
        : item,
    );
    writeArray(COUPONS_KEY, next);
    return { ok: true, mode: 'fallback', data: { couponId: couponRequestId, publishStatus: 'published' } };
  }

  try {
    const data = await postJson<{ couponId?: string; publishStatus?: string }>('finance-publish-coupon', {
      couponRequestId,
      financeReviewerRoleCode: actorRole,
    });
    return { ok: true, mode: 'remote', data };
  } catch (error) {
    return { ok: false, mode: 'remote', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function notifyOps(subject: string, body: string): Promise<Result<{ queued?: boolean }>> {
  const actorRole = getAdminSessionRole();
  const payload = { subject, body, actorRole };
  if (!hasPhaseBBackend()) {
    return { ok: true, mode: 'fallback', data: { queued: true } };
  }
  try {
    const data = await postJson<{ queued?: boolean }>('notify-ops', payload);
    return { ok: true, mode: 'remote', data };
  } catch (error) {
    return { ok: false, mode: 'remote', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
