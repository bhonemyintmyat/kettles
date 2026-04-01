"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LoadingPage } from "./app/components/LoadingPage";
import { useGsapSmoothScroll } from "./app/hooks/useGsapSmoothScroll";
import { ThemeToggle } from "./app/components/ThemeToggle";
import { MobileMenu, type MenuItem } from "./app/components/MobileMenu";
import { LogoMarquee } from "./app/components/LogoMarquee";
import { KettlesMark } from "./app/components/KettlesMark";
import { Bot, Boxes, Mail, Menu, Workflow } from "lucide-react";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const ACCENT = "#FF5303";

gsap.registerPlugin(ScrollToPlugin);

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.146 2H21.6l-7.548 8.63L22 22h-6.81l-5.33-6.98L3.75 22H.3l8.08-9.24L2 2h6.98l4.82 6.28L18.146 2Zm-1.2 17.97h1.914L6.9 3.94H4.85l12.096 16.03Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.4 23.5h4.2V7.9H.4v15.6ZM8.2 7.9h4v2.13h.06c.56-1.06 1.93-2.18 3.98-2.18 4.26 0 5.05 2.8 5.05 6.44v9.21h-4.2v-8.17c0-1.95-.04-4.45-2.72-4.45-2.72 0-3.14 2.12-3.14 4.32v8.3H7.06V7.9h1.14Z" />
    </svg>
  );
}

function GlowDivider() {
  return (
    <div className="relative">
      <div className="h-px w-full bg-[color:var(--line)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-px w-40 -translate-x-1/2 -translate-y-1/2 opacity-70 blur-[0.5px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
        }}
      />
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function BentoCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={[
        "group relative overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6",
        "transition-colors duration-300 hover:border-[#FF5303]/60",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px 260px at 30% 20%, ${ACCENT}1F, transparent 60%)`,
        }}
      />
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--line)] bg-[color:var(--background)] text-[color:var(--foreground)]">
            {icon}
          </div>
          <h3 className="text-base font-semibold tracking-tight text-[color:var(--foreground)]">{title}</h3>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted)]">{description}</p>
      </div>
    </motion.div>
  );
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useGsapSmoothScroll({ enabled: !isLoading, lerp: 0.115 });

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 2800);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems: MenuItem[] = [
    { id: "top", label: "Home" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const social = [
    { label: "X", href: "https://x.com", icon: <XIcon className="h-4 w-4" /> },
    { label: "LinkedIn", href: "https://linkedin.com", icon: <LinkedInIcon className="h-4 w-4" /> },
    { label: "Email", href: "mailto:hello@kettles.dev", icon: <Mail className="h-4 w-4" /> },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 88;
    gsap.to(window, { duration: 0.85, ease: "power3.out", scrollTo: y });
  };

  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] selection:bg-[#FF5303]/20">
      {isLoading ? <LoadingPage onDone={() => setIsLoading(false)} minDurationMs={1600} /> : null}
      <MobileMenu
        open={menuOpen}
        items={menuItems}
        onClose={() => setMenuOpen(false)}
        onNavigate={(id) => {
          setMenuOpen(false);
          // let overlay animate out
          window.setTimeout(() => scrollToSection(id), 120);
        }}
        social={social}
      />
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 border-b border-[color:var(--line)] py-4 backdrop-blur-xl",
          isScrolled
            ? "bg-[color:var(--background)]/82 shadow-[0_10px_40px_rgba(0,0,0,0.10)]"
            : "bg-[color:var(--background)]/45",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6">
            <a href="#top" className="group inline-flex items-center gap-3">
              <span className="-ml-[50px] text-[color:var(--brand)] transition-colors duration-200 group-hover:text-[#FF5303]">
                <span className="relative inline-flex h-7 items-center overflow-visible">
                  <KettlesMark className="h-7 w-auto origin-left scale-[8]" />
                </span>
              </span>
            </a>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 md:flex">
                {menuItems.slice(1).map((it) => (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => scrollToSection(it.id)}
                    className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2 text-xs font-semibold tracking-tight text-[color:var(--muted)] transition hover:border-[#FF5303]/35 hover:text-[color:var(--foreground)]"
                  >
                    {it.label}
                  </button>
                ))}
              </div>
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--muted)] transition hover:text-[color:var(--foreground)] md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[72px]" />

      <div className="mx-auto w-full max-w-6xl px-6">

        <section id="top" className="relative py-20 md:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(255,83,3,0.18) 0%, transparent 62%)`,
            }}
          />

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative md:col-span-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">Minimalist B2B</p>
              <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
                Where ideas are heated into impact
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[color:var(--muted)] md:text-lg">
                We build sharp B2B systems that move fast: automation pipelines, product surfaces, and AI
                integration—kept minimal, readable, and relentlessly shippable.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  id="start"
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FF5303] px-6 py-3 text-sm font-semibold tracking-tight text-white"
                  style={{
                    boxShadow:
                      "0 18px 45px rgba(255,83,3,0.45), 0 6px 14px rgba(255,83,3,0.38), 0 0 0 1px rgba(255,83,3,0.55)",
                  }}
                >
                  Start Project
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-6 py-3 text-sm font-semibold tracking-tight text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
                >
                  View Projects
                </a>
                <span className="text-xs text-[color:var(--muted)]">No decks. No noise. Just execution.</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-5"
            >
              <div className="relative overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-10 opacity-70 blur-2xl"
                  style={{
                    background: `radial-gradient(600px 420px at 70% 10%, rgba(255,83,3,0.12), transparent 55%)`,
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.35]"
                  style={{
                    background:
                      "linear-gradient(transparent 0, transparent 22px, rgba(127,127,127,0.14) 22px, rgba(127,127,127,0.14) 23px)",
                    backgroundSize: "100% 24px",
                  }}
                />
                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">Hero image</p>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">A light, fast visual—no heavy photography.</p>
                  </div>
                  <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--background)] p-2">
                    <Image
                      src="/logos/logo-07.svg"
                      alt="Client logo"
                      width={48}
                      height={48}
                      className="h-10 w-10 opacity-90"
                    />
                  </div>
                </div>
                <div className="relative mt-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "Latency", value: "24ms" },
                    { label: "Uptime", value: "99.98%" },
                    { label: "Deploys", value: "Daily" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--background)] p-3 transition-colors hover:border-[#FF5303]/35"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">{m.label}</p>
                      <p className="mt-2 text-lg font-semibold tracking-tight">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="-mt-10 pb-10 md:-mt-14 md:pb-14">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">Trusted by</p>
            <div className="mt-6">
              <LogoMarquee
                logos={[
                  { src: "/logos/logo-02.svg", alt: "Logo 02" },
                  { src: "/logos/logo-03.svg", alt: "Logo 03" },
                  { src: "/logos/logo-04.svg", alt: "Logo 04" },
                  { src: "/logos/logo-07.svg", alt: "Logo 07" },
                  { src: "/logos/logo-08.svg", alt: "Logo 08" },
                  { src: "/logos/logo-09.svg", alt: "Logo 09" },
                ]}
              />
            </div>
          </Reveal>
        </section>

        <GlowDivider />

        <section id="services" className="py-16 md:py-20">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">Services</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[color:var(--foreground)] md:text-3xl">
                  Built for shipping teams
                </h2>
              </div>
              <p className="hidden max-w-sm text-right text-sm text-[color:var(--muted)] md:block">
                Bento-style layout. Thin borders. Orange glow on intent.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <BentoCard
              title="Automations"
              description="Cut cycle time with reliable workflows—events, queues, integrations, and internal tooling that stays invisible until it saves you."
              icon={<Workflow className="h-5 w-5" />}
            />
            <BentoCard
              title="B2B Products"
              description="Design + engineering for crisp dashboards, onboarding, and core product surfaces—typography-led, fast to scan, hard to forget."
              icon={<Boxes className="h-5 w-5" />}
            />
            <BentoCard
              title="AI Integration"
              description="Practical AI: retrieval, summarization, agents, and evals—wrapped in product UX that feels deterministic, not magical."
              icon={<Bot className="h-5 w-5" />}
            />
          </div>
        </section>

        <GlowDivider />

        <section id="projects" className="py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">Projects</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[color:var(--foreground)] md:text-3xl">
                Recent work
              </h2>
            </div>
            <p className="hidden max-w-sm text-right text-sm text-[color:var(--muted)] md:block">
              Clean surfaces. Strong hierarchy. Tech Noir energy.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                title: "Ops Automation Console",
                desc: "Event-driven workflows, audit trails, and instant observability—built to reduce human load.",
                tag: "Automations",
              },
              {
                title: "B2B Product Dashboard",
                desc: "Typography-led IA, fast scanning, and crisp interaction states for daily power users.",
                tag: "B2B Products",
              },
              {
                title: "AI Assist Layer",
                desc: "RAG + guardrails + evals, integrated into UX that feels predictable under pressure.",
                tag: "AI Integration",
              },
            ].map((p) => (
              <motion.div
                key={p.title}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 transition-colors hover:border-[#FF5303]/60"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(520px 240px at 20% 20%, ${ACCENT}1A, transparent 60%)`,
                  }}
                />
                <div className="relative">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">{p.tag}</p>
                  <h3 className="mt-3 text-base font-semibold tracking-tight text-[color:var(--foreground)]">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <GlowDivider />

        <section id="contact" className="py-16 md:py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">Contact us</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[color:var(--foreground)] md:text-3xl">
                Start a project
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--muted)]">
                Tell us what you’re building. We’ll respond with a clear scope, timeline, and the fastest path to impact.
              </p>
            </div>
            <div className="md:col-span-7">
              <form
                className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 md:p-8"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                      Name
                    </span>
                    <input
                      className="mt-2 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--background)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[#FF5303]/60"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                      Email
                    </span>
                    <input
                      className="mt-2 w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--background)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[#FF5303]/60"
                      placeholder="you@company.com"
                      type="email"
                      autoComplete="email"
                    />
                  </label>
                </div>
                <label className="mt-4 block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                    Message
                  </span>
                  <textarea
                    className="mt-2 min-h-[120px] w-full resize-y rounded-2xl border border-[color:var(--line)] bg-[color:var(--background)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[#FF5303]/60"
                    placeholder="What are we building?"
                  />
                </label>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#FF5303] px-6 py-3 text-sm font-semibold tracking-tight text-white"
                    style={{
                      boxShadow:
                        "0 18px 45px rgba(255,83,3,0.45), 0 6px 14px rgba(255,83,3,0.38), 0 0 0 1px rgba(255,83,3,0.55)",
                    }}
                  >
                    Contact Us
                  </button>
                  <a
                    className="text-xs font-semibold text-[color:var(--muted)] underline decoration-[color:var(--line)] underline-offset-4 hover:text-[color:var(--foreground)]"
                    href="mailto:hello@kettles.dev?subject=Start%20Project"
                  >
                    or email hello@kettles.dev
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>

        <GlowDivider />

        <section className="py-16 md:py-20">
          <div className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)] p-8 md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)] md:text-3xl">
                  Ready to heat it up?
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[color:var(--muted)]">
                  Minimal surfaces. High-signal motion. A single accent that reads like electricity.
                </p>
              </div>
              <a
                href="#start"
                className="inline-flex items-center justify-center rounded-2xl bg-[#FF5303] px-7 py-3.5 text-sm font-semibold tracking-tight text-white"
                style={{
                  boxShadow:
                    "0 22px 60px rgba(255,83,3,0.55), 0 8px 18px rgba(255,83,3,0.42), 0 0 0 1px rgba(255,83,3,0.65)",
                }}
              >
                Start Project
              </a>
            </div>
          </div>
        </section>

        <footer className="py-10 text-xs text-[color:var(--muted)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span>Kettles</span>
            <span>All rights reserved © 2026</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
