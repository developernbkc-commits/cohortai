export type ProgramStatus = "draft" | "review" | "published" | "archived";

export type ProgramDefinition = {
  id: string;
  name: string;
  audience: string;
  mode: string;
  duration: string;
  feeBand: string;
  status: ProgramStatus;
  ownerRole: string;
  outcomes: string[];
};

export const programDefinitions: ProgramDefinition[] = [
  {
    id: "everyday-ai-accelerator",
    name: "Everyday AI Accelerator",
    audience: "Beginners, students, homemakers, career restarters",
    mode: "Weekend online + mentor reviews",
    duration: "2 weeks",
    feeBand: "₹10,000",
    status: "published",
    ownerRole: "admissions_admin",
    outcomes: ["AI confidence", "daily productivity stack", "first portfolio asset"],
  },
  {
    id: "business-ai-revenue-engine",
    name: "Business AI Revenue Engine",
    audience: "Founders, marketers, self-employed professionals",
    mode: "Hybrid cohort",
    duration: "4 weeks",
    feeBand: "₹20,000",
    status: "review",
    ownerRole: "counselor",
    outcomes: ["campaign workflows", "lead follow-up automation", "client-ready assets"],
  },
  {
    id: "tech-data-ai-portfolio",
    name: "Tech & Data AI Portfolio Sprint",
    audience: "Developers, analysts, IT professionals",
    mode: "Live + recorded + project reviews",
    duration: "6 weeks",
    feeBand: "₹30,000",
    status: "published",
    ownerRole: "super_admin",
    outcomes: ["portfolio project", "interview-ready proof", "capstone review"],
  },
];
