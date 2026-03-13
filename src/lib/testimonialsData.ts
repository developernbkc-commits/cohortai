export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  city: string;
  track: "Everyday AI" | "Business AI" | "Tech & Data AI" | "Enterprise" | "General";
  rating: number;
  quote: string;
  source?: string;
  featured?: boolean;
};

export type TestimonialsPayload = {
  version: string;
  updatedAt: string;
  schema: "cohortai.testimonials.v1";
  items: TestimonialItem[];
};

export const fallbackTestimonials: TestimonialsPayload = {
  version: "1.0",
  updatedAt: "2026-02-24",
  schema: "cohortai.testimonials.v1",
  items: [
    {
      id: "f001",
      name: "Working professional",
      role: "IT Professional",
      city: "Hyderabad",
      track: "Tech & Data AI",
      rating: 5,
      quote: "The cohort structure kept me consistent. Weekly reviews made a huge difference—no more random learning.",
      source: "Learner review",
      featured: true,
    },
    {
      id: "f002",
      name: "Small business owner",
      role: "Business Owner",
      city: "Pune",
      track: "Business AI",
      rating: 5,
      quote: "I finally built a content + follow-up system that saves time every day. Clear steps, real outputs.",
      source: "WhatsApp",
      featured: true,
    },
    {
      id: "f003",
      name: "Fresher / student",
      role: "Student",
      city: "Vizag",
      track: "Everyday AI",
      rating: 5,
      quote: "I liked the mentor feedback on submissions. I now have projects I can confidently show in interviews.",
      source: "Learner review",
      featured: false,
    },
  ],
};

const allowedTracks = new Set(["Everyday AI", "Business AI", "Tech & Data AI", "Enterprise", "General"]);

function normalizeItem(input: unknown): TestimonialItem | null {
  if (!input || typeof input !== "object") return null;
  const row = input as Record<string, unknown>;
  const id = String(row.id ?? "").trim();
  const name = String(row.name ?? "").trim();
  const role = String(row.role ?? "").trim();
  const city = String(row.city ?? "").trim();
  const track = String(row.track ?? "General").trim();
  const quote = String(row.quote ?? "").trim();
  const ratingRaw = Number(row.rating ?? 5);
  const rating = Number.isFinite(ratingRaw) ? Math.max(1, Math.min(5, Math.round(ratingRaw))) : 5;
  const source = row.source ? String(row.source).trim() : undefined;
  const featured = Boolean(row.featured);

  if (!id || !name || !role || !city || !quote) return null;
  if (!allowedTracks.has(track)) return null;

  return {
    id,
    name,
    role,
    city,
    track: track as TestimonialItem["track"],
    quote: quote.slice(0, 420),
    rating,
    source,
    featured,
  };
}

export function sanitizeTestimonialsPayload(input: unknown): TestimonialsPayload {
  if (!input || typeof input !== "object") return fallbackTestimonials;
  const obj = input as Record<string, unknown>;
  const itemsRaw = Array.isArray(obj.items) ? obj.items : [];
  const items = itemsRaw.map(normalizeItem).filter((v): v is TestimonialItem => Boolean(v));

  if (!items.length) return fallbackTestimonials;

  return {
    version: String(obj.version ?? "1.0"),
    updatedAt: String(obj.updatedAt ?? fallbackTestimonials.updatedAt),
    schema: "cohortai.testimonials.v1",
    items,
  };
}

export async function fetchTestimonialsPayload(): Promise<TestimonialsPayload> {
  try {
    const res = await fetch("/data/testimonials.json", { cache: "no-store" });
    if (!res.ok) return fallbackTestimonials;
    const json = (await res.json()) as unknown;
    return sanitizeTestimonialsPayload(json);
  } catch {
    return fallbackTestimonials;
  }
}
