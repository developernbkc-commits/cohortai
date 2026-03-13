import AdminShell from '../../components/admin/AdminShell';
import ProgramStudio from '../ProgramStudio';

export default function AdminProgramStudio() {
  return (
    <AdminShell
      title="Program Studio"
      blurb="Programs stay admin-defined and data-driven. This wrapper keeps the operations context, premium theme continuity, and role-aware navigation intact while the public site consumes the same program source of truth."
    >
      <ProgramStudio />
    </AdminShell>
  );
}
