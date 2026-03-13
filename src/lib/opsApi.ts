import { edgeFunctionUrl, env, hasPhaseBBackend } from './env';
import { getAdminSessionRole } from './adminAuth';
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

export type CouponRequestDraft = {
  code: string;
  bindType: 'email' | 'phone' | 'open';
  bindValue: string;
  discountLabel: string;
  validUntil: string;
  notes?: string;
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

export function listProgramsFallback() {
  return readArray(PROGRAMS_KEY, samplePrograms);
}

export function listCouponRequestsFallback() {
  return readArray(COUPONS_KEY, sampleCouponRequests);
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
