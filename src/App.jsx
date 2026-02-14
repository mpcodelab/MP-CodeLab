import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const INSTAGRAM_URL = "https://www.instagram.com/mp_codelab/";
const EMAIL = "mpcodelab@gmail.com";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ScrollReveal({ children, delay = 0, y = 16, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
      {children}
    </span>
  );
}

function PrimaryButton({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold",
        "bg-blue-600 text-white shadow-lg shadow-blue-600/20",
        "hover:bg-blue-500 active:scale-[0.99] transition",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white",
        "dark:focus:ring-offset-slate-950",
        className
      )}
    >
      {children}
    </a>
  );
}

function SecondaryButton({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold",
        "bg-white text-slate-900 border border-slate-200 shadow-sm",
        "hover:bg-slate-50 active:scale-[0.99] transition",
        "dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10",
        className
      )}
    >
      {children}
    </a>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <div className="mb-3 flex items-center justify-center gap-2">
          <Pill>{eyebrow}</Pill>
        </div>
      ) : null}
      <h2 className="text-2xl font800 tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function PricingCard({
  name,
  price,
  desc,
  features,
  highlight = false,
  ctaText,
  ctaHref,
}) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border p-6 shadow-sm transition",
        "bg-white/70 border-slate-200 backdrop-blur",
        "dark:bg-white/5 dark:border-white/10",
        highlight ? "ring-2 ring-blue-500 shadow-lg" : ""
      )}
    >
      {highlight ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
            Recommended
          </span>
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {name}
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {desc}
          </p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {price}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            starting
          </div>
        </div>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-slate-700 dark:text-slate-200">
        {features.map((f, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <a
          href={ctaHref}
          className={cn(
            "w-full inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition",
            highlight
              ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20"
              : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          )}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("mpcodelab_theme");
    if (saved === "light") setDark(false);
    if (saved === "dark") setDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("mpcodelab_theme", dark ? "dark" : "light");
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const mailtoQuote = useMemo(() => {
    const subject = encodeURIComponent("Quote Request - MP CodeLab");
    const body = encodeURIComponent(
      `Hi MP CodeLab,\n\nI want a website / app / software for my business.\n\nMy Requirements:\n- Type:\n- Budget:\n- Timeline:\n\nThanks,\n`
    );
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b1220] dark:text-white">
      {/* 3D BLOBS */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-[380px] w-[380px] rounded-full bg-purple-600/30 blur-3xl dark:bg-purple-500/25 animate-pulse" />
        <div className="absolute top-24 -right-24 h-[420px] w-[420px] rounded-full bg-orange-500/25 blur-3xl dark:bg-orange-400/20 animate-pulse" />
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl dark:bg-blue-500/15 animate-pulse" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            {/* LOGO FIXED */}
            <img
              src="/logo.png"
              alt="MP CodeLab Logo"
              className="h-10 w-10 rounded-xl object-contain bg-white p-1 shadow-sm dark:bg-white/10"
            />
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight">
                MP CodeLab
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Solid code for a solid business
              </div>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${EMAIL}`}
              className="hidden sm:inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Email
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-600/15 hover:opacity-95"
            >
              Instagram
            </a>

            <button
              onClick={() => setDark((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-900 shadow-sm hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {dark ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main id="top" className="mx-auto max-w-6xl px-4">
        <section className="py-14 sm:py-20">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                <Pill>Karnataka, India</Pill>
                <Pill>Web • Mobile • Software • AI/ML</Pill>
                <Pill>Fast Delivery</Pill>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                MP CodeLab
              </h1>

              {/* TAGLINE BELOW NAME */}
              <p className="mt-2 text-lg font-semibold text-slate-700 dark:text-slate-200">
                Solid code for a solid business
              </p>

              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                We build modern websites, mobile apps, custom business software,
                AI/ML applications, and college projects — with premium UI, clean
                code, and long-term support.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <PrimaryButton href={mailtoQuote}>Get a Quote (Email)</PrimaryButton>

                <SecondaryButton href={INSTAGRAM_URL}>
                  DM on Instagram
                </SecondaryButton>

                <a
                  href="/MP_CodeLab_Brochure.pdf"
                  download
                  className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold bg-white/70 border border-slate-200 text-slate-900 shadow-sm hover:bg-white transition dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10"
                >
                  Download Brochure PDF
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-14">
          <ScrollReveal>
            <SectionTitle
              eyebrow="Services"
              title="What we do"
              subtitle="Premium development services designed for startups, small businesses, and students — delivered with clean code and modern UI."
            />
          </ScrollReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Website Development",
                points: ["Landing pages", "Business websites", "Portfolio + SEO"],
              },
              {
                title: "Mobile App Development",
                points: ["Android apps", "UI + API integration", "Play Store ready"],
              },
              {
                title: "Custom Business Software",
                points: ["Billing & inventory", "Admin dashboards", "Role-based systems"],
              },
              {
                title: "AI & ML Applications",
                points: ["Prediction models", "Chatbots", "Automation + analytics"],
              },
              {
                title: "College Projects",
                points: ["Final year projects", "Documentation + PPT", "Working demo"],
              },
              {
                title: "Deployment & Support",
                points: ["Vercel / Netlify", "Domain setup", "Post-launch support"],
              },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:shadow-lg dark:border-white/10 dark:bg-white/5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {s.title}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    {s.points.map((p, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-[2px] text-blue-600 dark:text-blue-400">
                          ✓
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* WHY */}
        <section className="py-14">
          <ScrollReveal>
            <SectionTitle
              eyebrow="Why MP CodeLab"
              title="Built for trust. Designed for results."
              subtitle="We focus on quality, speed, and clean scalable code — so your product looks premium and works perfectly."
            />
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Clean & solid code",
              "Affordable pricing",
              "Fast delivery",
              "Long-term support",
            ].map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    ✓ {t}
                  </div>
                  <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Professional workflow, clean UI, and on-time delivery.
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-14">
          <ScrollReveal>
            <SectionTitle
              eyebrow="Pricing"
              title="Simple pricing. Premium output."
              subtitle="We keep pricing transparent and flexible. Final cost depends on features and timeline."
            />
          </ScrollReveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <ScrollReveal>
              <PricingCard
                name="Basic"
                price="₹2,999+"
                desc="Perfect for simple landing pages and portfolios."
                features={[
                  "1-page website (premium UI)",
                  "Mobile responsive",
                  "Fast loading",
                  "Free deployment",
                  "7 days support",
                ]}
                ctaText="Get Basic Quote"
                ctaHref={mailtoQuote}
              />
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <PricingCard
                name="Standard"
                price="₹6,999+"
                desc="Best for startups & small businesses."
                features={[
                  "Up to 5 pages",
                  "Premium UI + animations",
                  "Contact form integration",
                  "SEO basics",
                  "15 days support",
                ]}
                highlight
                ctaText="Get Standard Quote"
                ctaHref={mailtoQuote}
              />
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <PricingCard
                name="Premium"
                price="₹14,999+"
                desc="Full business website / software / admin dashboard."
                features={[
                  "Full website / dashboard",
                  "Authentication (login system)",
                  "Admin panel + database",
                  "Deployment + hosting guidance",
                  "30 days support",
                ]}
                ctaText="Get Premium Quote"
                ctaHref={mailtoQuote}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* COMING SOON */}
        <section className="py-14">
          <ScrollReveal>
            <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Official Website Launching Soon 🚀
              </div>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                Until then, connect with us on Instagram or Email to get started.
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <PrimaryButton href={mailtoQuote}>Email for Quote</PrimaryButton>
                <SecondaryButton href={INSTAGRAM_URL}>
                  Instagram
                </SecondaryButton>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-14">
          <ScrollReveal>
            <SectionTitle
              eyebrow="Contact"
              title="Let’s build something premium."
              subtitle="We reply fast and guide you from idea → design → development → deployment."
            />
          </ScrollReveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <ScrollReveal>
              <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Contact Details
                </h3>

                <div className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      className="text-blue-600 hover:underline dark:text-blue-400"
                      href={`mailto:${EMAIL}`}
                    >
                      {EMAIL}
                    </a>
                  </div>

                  <div>
                    <span className="font-semibold">Instagram:</span>{" "}
                    <a
                      className="text-blue-600 hover:underline dark:text-blue-400"
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      @mp_codelab
                    </a>
                  </div>

                  <div>
                    <span className="font-semibold">Location:</span> Karnataka,
                    India
                  </div>

                  <div>
                    <span className="font-semibold">Founder:</span> Basavaraj
                    Malipatil
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton href={mailtoQuote}>Send Email</PrimaryButton>
                  <SecondaryButton href={INSTAGRAM_URL}>
                    DM on Instagram
                  </SecondaryButton>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Quick Note
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  We deliver clean, scalable and professional code. You’ll get
                  source code + deployment support + guidance for future updates.
                </p>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  <div className="font-semibold">Launch Tip:</div>
                  <div className="mt-1">
                    Put this website link in Instagram bio + Email signature.
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pb-10 pt-8">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-center text-sm text-slate-600 dark:border-white/10 dark:text-slate-300 sm:flex-row sm:text-left">
              <div>
                © {new Date().getFullYear()} MP CodeLab • Founder:{" "}
                <span className="font-semibold">Basavaraj Malipatil</span>
              </div>
              <div className="text-xs">
                Built with  by <span className="font-semibold">MP CodeLab</span>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* FLOATING INSTAGRAM BUTTON */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-95"
      >
        Instagram DM
      </a>
    </div>
  );
}
