export type AdminRole =
  | 'super_admin'
  | 'admissions_admin'
  | 'approver'
  | 'counselor'
  | 'finance'
  | 'trainer'
  | 'operations'
  | 'learner';

export const adminRoleOptions: Array<{ value: AdminRole; label: string; blurb: string }> = [
  { value: 'super_admin', label: 'Super Admin', blurb: 'Owns platform configuration, roles, and privileged operations.' },
  { value: 'admissions_admin', label: 'Admissions Admin', blurb: 'Manages program intake, reviews, counselor coordination, and registrations.' },
  { value: 'approver', label: 'Approver', blurb: 'Can review candidate records and move learners into the approved funnel.' },
  { value: 'counselor', label: 'Counselor', blurb: 'Captures lead notes, requests unique coupons, and guides learners to conversion.' },
  { value: 'finance', label: 'Finance', blurb: 'Approves coupons, monitors payment status, and governs discount publishing.' },
  { value: 'trainer', label: 'Trainer', blurb: 'Views assigned learners, schedules, and course delivery operations.' },
  { value: 'operations', label: 'Operations', blurb: 'Owns batch allocation, session planning, and learner coordination.' },
  { value: 'learner', label: 'Learner', blurb: 'Public learner or student role without admin privileges.' },
];

const STORAGE_KEY = 'cohortai_admin_session';

export function getAdminSessionRole(): AdminRole | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (!value) return null;
  return adminRoleOptions.some((role) => role.value === value) ? (value as AdminRole) : null;
}

export function setAdminSessionRole(role: AdminRole) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, role);
}

export function clearAdminSessionRole() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function canAccessAdmin(role: AdminRole | null) {
  return role !== null && role !== 'learner';
}

export function canPublishCoupons(role: AdminRole | null) {
  return role === 'finance' || role === 'super_admin';
}

export function canRequestCoupon(role: AdminRole | null) {
  return role === 'super_admin' || role === 'admissions_admin' || role === 'approver' || role === 'counselor';
}

export const TEMP_BOOTSTRAP_SUPER_ADMIN = {
  phone: '9347062487',
  password: 'Tirupati@038',
};

export function authenticateBootstrapAdmin(phone: string, password: string, role: AdminRole) {
  return role === 'super_admin' && phone.replace(/\D/g, '') === TEMP_BOOTSTRAP_SUPER_ADMIN.phone && password === TEMP_BOOTSTRAP_SUPER_ADMIN.password;
}
