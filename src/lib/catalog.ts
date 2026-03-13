export type CourseModule = {
  id: string;
  title: string;
  track: string;
  duration: string;
  price: number;
  level: "Starter" | "Core" | "Advanced";
  outcomes: string[];
};

export const modules: CourseModule[] = [
  {
    id: "foundation-ai",
    title: "AI Foundations & Prompting",
    track: "Everyday AI",
    duration: "1 week",
    price: 5000,
    level: "Starter",
    outcomes: ["Prompting basics", "Safe AI usage", "Daily productivity toolkit"],
  },
  {
    id: "career-kit",
    title: "Career Readiness with AI",
    track: "Everyday AI",
    duration: "2 weeks",
    price: 8000,
    level: "Core",
    outcomes: ["Resume optimization", "Interview prep", "Portfolio starter kit"],
  },
  {
    id: "content-engine",
    title: "Content & Growth Engine",
    track: "Business AI",
    duration: "2 weeks",
    price: 10000,
    level: "Core",
    outcomes: ["30-day content plan", "Lead magnets", "Campaign workflow"],
  },
  {
    id: "sales-automation",
    title: "Lead Follow-up Automation",
    track: "Business AI",
    duration: "2 weeks",
    price: 12000,
    level: "Advanced",
    outcomes: ["CRM-lite workflow", "WhatsApp/email follow-ups", "Reporting templates"],
  },
  {
    id: "python-data",
    title: "Python + Data Foundations",
    track: "Tech & Data AI",
    duration: "3 weeks",
    price: 15000,
    level: "Core",
    outcomes: ["Python refresher", "Data cleaning", "Notebook workflow"],
  },
  {
    id: "ml-portfolio",
    title: "AI Project Builder",
    track: "Tech & Data AI",
    duration: "4 weeks",
    price: 18000,
    level: "Advanced",
    outcomes: ["Portfolio project", "Model review", "Demo presentation"],
  },
];

export const adminRoles = [
  { role: "super_admin", scope: "Full access across admissions, finance, programs, coupons, batches, and RBAC" },
  { role: "admissions_admin", scope: "Lead intake, applications, counseling notes, queue movement" },
  { role: "approver", scope: "Operational approvals, exceptions, escalation handling" },
  { role: "counselor", scope: "Lead qualification, fit guidance, coupon request initiation" },
  { role: "finance", scope: "Coupon publishing approval, payment reconciliation, refunds" },
  { role: "operations", scope: "Batch creation, slot allocation, learner roster" },
  { role: "mentor", scope: "Assigned cohorts, attendance, learner notes" },
];

export const sampleApplicants = [
  {
    name: "Harini S.",
    track: "Business AI + Lead Follow-up Automation",
    status: "Pending review",
    payment: "Paid via UPI",
    slot: "Awaiting allocation",
  },
  {
    name: "Kiran P.",
    track: "Everyday AI + Career Readiness",
    status: "Approved",
    payment: "Paid via UPI",
    slot: "Weekend Batch A / 22 Mar",
  },
  {
    name: "Naveen R.",
    track: "Tech & Data AI + AI Project Builder",
    status: "Needs documents",
    payment: "Pending",
    slot: "Not assigned",
  },
];
