import AdminShell from '../../components/admin/AdminShell';
import CouponGovernance from '../CouponGovernance';

export default function AdminCouponGovernance() {
  return (
    <AdminShell
      title="Coupon Governance"
      blurb="Coupons can be requested by authorized roles, bound to phone or email when needed, and auto-published only after Finance approval. This wrapper keeps the governed discount workflow inside the admin surface."
    >
      <CouponGovernance />
    </AdminShell>
  );
}
