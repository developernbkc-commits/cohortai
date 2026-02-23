import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import Button from "../components/Button";
import { Helmet } from "react-helmet-async";
import { canonical, seoDefaults } from "../lib/seo";
import { useLocation } from "react-router-dom";

export default function Contact() {
  
  const location = useLocation();
return (
    
<Helmet>
  <title>Contact | CohortAI Labs</title>
  <meta name="description" content="Contact CohortAI Labs for batch schedule and guidance call. WhatsApp, call, or email info.cohortai.labs@itprofessional.pro." />
  <link rel="canonical" href={canonical(location.pathname)} />
  <meta property="og:title" content="Contact | CohortAI Labs" />
  <meta property="og:description" content="Contact CohortAI Labs for batch schedule and guidance call. WhatsApp, call, or email info.cohortai.labs@itprofessional.pro." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical(location.pathname)} />
  <meta property="og:image" content={seoDefaults.ogImage} />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>

<div>
      <section className="pt-12 pb-10">
        <Container>
          <SectionTitle
            eyebrow="Contact"
            title="Get a batch schedule + recommended starting level"
            desc="Fill the form and we’ll contact you. Or WhatsApp / call for faster help."
          />
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button href={`https://wa.me/91${site.whatsapp}`} target="_blank" rel="noreferrer">
              WhatsApp +91 {site.whatsapp}
            </Button>
            <Button href={`tel:${site.phone}`} variant="secondary">
              Email: <a className="underline" href="mailto:info.cohortai.labs@itprofessional.pro">info.cohortai.labs@itprofessional.pro</a><br/>Call {site.phone}
            </Button>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="card card-3d rounded-3xl p-6 ">
              <div className="text-sm font-semibold text-slate-950">Contact details</div>
              <div className="mt-3 text-sm text-slate-800 grid gap-2">
                <div>Locations: {site.cities.join(" • ")}</div>
                <div>Batches start: {site.startDate}</div>
                <div>Tracks: Everyday AI • Business AI • Tech & Data AI</div>
              </div>
              <div className="mt-6 rounded-2xl bg-white/70 border border-slate-200/80 p-4 text-sm text-slate-800">
                Tip: Share your background and goal—career switch, business growth, or productivity—so we can recommend the right level.
              </div>
            </div>

            <form id="lead"
              name="lead"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              action="/thanks"
              className="card card-3d rounded-3xl p-6 "
            >
              <input type="hidden" name="form-name" value="lead" />
              <p className="hidden">
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>

              <div className="grid gap-4">
                <div>
                  <label className="text-xs text-slate-800">Full name</label>
                  <input
                    name="name"
                    required
                    className="mt-2 w-full rounded-2xl bg-white/70 border border-slate-200/80 px-4 py-3 text-sm text-slate-950 placeholder:text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-200/30"
                    placeholder="Your name"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-slate-800">Phone</label>
                    <input
                      name="phone"
                      required
                      className="mt-2 w-full rounded-2xl bg-white/70 border border-slate-200/80 px-4 py-3 text-sm text-slate-950 placeholder:text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-200/30"
                      placeholder="10-digit number"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-800">City</label>
                    <select
                      name="city"
                      className="mt-2 w-full rounded-2xl bg-white/70 border border-slate-200/80 px-4 py-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-200/30"
                      defaultValue={site.cities[0]}
                    >
                      {site.cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                      <option value="Online">Online</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-slate-800">Track</label>
                    <select
                      name="track"
                      className="mt-2 w-full rounded-2xl bg-white/70 border border-slate-200/80 px-4 py-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-200/30"
                      defaultValue="Everyday AI"
                    >
                      {site.tracks.map((t) => (
                        <option key={t.name} value={t.name}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-800">Preferred mode</label>
                    <select
                      name="mode"
                      className="mt-2 w-full rounded-2xl bg-white/70 border border-slate-200/80 px-4 py-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-200/30"
                      defaultValue="Hybrid"
                    >
                      <option>Hybrid</option>
                      <option>Online</option>
                      <option>Offline</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-800">Goal</label>
                  <textarea
                    name="goal"
                    rows={4}
                    className="mt-2 w-full rounded-2xl bg-white/70 border border-slate-200/80 px-4 py-3 text-sm text-slate-950 placeholder:text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-200/30"
                    placeholder="Example: career switch, business growth, productivity, portfolio projects..."
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 hover:opacity-95 transition accent-ring"
                >
                  Submit
                </button>

                <div className="text-xs text-slate-500">
                  By submitting, you agree to be contacted by CohortAI Labs. We respect your privacy.
                </div>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </div>
  );
}