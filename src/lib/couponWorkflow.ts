export type CouponRequestStatus =
  | "draft"
  | "requested"
  | "under_finance_review"
  | "approved"
  | "published"
  | "rejected"
  | "expired";

export const couponAllowedRequestors = [
  "super_admin",
  "admissions_admin",
  "approver",
  "counselor",
] as const;

export const couponApprovalRole = "finance";

export const couponRequests = [
  {
    code: "NBK-IND-8374",
    bindType: "phone",
    bindValue: "+918374617625",
    requestedBy: "counselor",
    status: "under_finance_review",
    discount: "₹2,000 off enrollment fee",
    validity: "Valid until 30 Apr 2026",
    program: "Everyday AI Accelerator",
  },
  {
    code: "CAREER-PRIYA-01",
    bindType: "email",
    bindValue: "priya@example.com",
    requestedBy: "admissions_admin",
    status: "approved",
    discount: "10% off flagship cohort",
    validity: "Valid for one use",
    program: "Tech & Data AI Portfolio Sprint",
  },
  {
    code: "FOUNDERS-BOOST",
    bindType: "campaign",
    bindValue: "Public campaign",
    requestedBy: "super_admin",
    status: "published",
    discount: "₹5,000 off Business AI program",
    validity: "Valid until seats close",
    program: "Business AI Revenue Engine",
  },
] as const;
