export type ProgramStatus = 'draft' | 'published' | 'archived';

export type ProgramRecord = {
  id: string;
  name: string;
  slug: string;
  status: ProgramStatus;
  mode: 'Online' | 'Live' | 'Hybrid';
  duration: string;
  priceInr: number;
  featured: boolean;
  audience: string;
  outcomes: string[];
  courseCount: number;
};

export type CouponRequestRecord = {
  id: string;
  code: string;
  bindType: 'email' | 'phone' | 'open';
  bindValue: string;
  requestedBy: string;
  financeStatus: 'draft' | 'requested' | 'under_finance_review' | 'approved' | 'published' | 'rejected';
  discountLabel: string;
  validUntil: string;
  notes: string;
};

export const samplePrograms: ProgramRecord[] = [
  {
    id: 'prog-ai-engineer',
    name: 'AI Engineer Career Track',
    slug: 'ai-engineer-career-track',
    status: 'published',
    mode: 'Hybrid',
    duration: '22 weeks',
    priceInr: 75000,
    featured: true,
    audience: 'Learners moving from Python foundations into ML, LLMs, and deployable portfolio work.',
    outcomes: ['Portfolio-ready capstone', 'Mentor-reviewed code', 'Interview story pack'],
    courseCount: 3,
  },
  {
    id: 'prog-product-builder',
    name: 'AI Product Builder Track',
    slug: 'ai-product-builder-track',
    status: 'draft',
    mode: 'Hybrid',
    duration: '14 weeks',
    priceInr: 52000,
    featured: false,
    audience: 'Founders, PMs, and operators who want to design, validate, and launch AI-assisted products.',
    outcomes: ['Product brief', 'AI workflow prototype', 'Demo-day presentation'],
    courseCount: 2,
  },
  {
    id: 'prog-everyday',
    name: 'Everyday AI Productivity Sprint',
    slug: 'everyday-ai-productivity-sprint',
    status: 'published',
    mode: 'Online',
    duration: '2 weeks',
    priceInr: 10000,
    featured: true,
    audience: 'Working professionals who need fast wins, templates, and guided adoption.',
    outcomes: ['Daily AI toolkit', '7-day challenge completion', 'Reusable templates'],
    courseCount: 2,
  },
];

export const sampleCouponRequests: CouponRequestRecord[] = [
  {
    id: 'coupon-001',
    code: 'PRERNA-LEAD-2026',
    bindType: 'email',
    bindValue: 'prerna@example.com',
    requestedBy: 'Counselor · Anita Nair',
    financeStatus: 'under_finance_review',
    discountLabel: '₹5,000 off on AI Engineer Career Track',
    validUntil: '2026-04-15',
    notes: 'Conversion rescue after counselling call. Auto-publish after finance approval.',
  },
  {
    id: 'coupon-002',
    code: '919876543210-AI',
    bindType: 'phone',
    bindValue: '+91 9876543210',
    requestedBy: 'Admissions Admin · Harini S.',
    financeStatus: 'approved',
    discountLabel: '10% off on published programs',
    validUntil: '2026-05-01',
    notes: 'Phone-bound coupon for WhatsApp lead. Awaiting automatic publish job.',
  },
  {
    id: 'coupon-003',
    code: 'WELCOME10',
    bindType: 'open',
    bindValue: 'All new registrations',
    requestedBy: 'Super Admin · Founder desk',
    financeStatus: 'published',
    discountLabel: '10% off on all public programs',
    validUntil: '2026-12-31',
    notes: 'Campaign code already active on registration funnel.',
  },
];
