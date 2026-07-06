"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, Layers3, Mail, Menu, MousePointer2, Wrench } from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { LoadingPage } from "./app/components/LoadingPage";
import { MobileMenu, type MenuItem } from "./app/components/MobileMenu";
import { KittlePet, type KittleMode } from "./app/components/KittlePet";
import { useGsapSmoothScroll } from "./app/hooks/useGsapSmoothScroll";

gsap.registerPlugin(ScrollToPlugin);

type Lang = "en" | "my";

const content = {
  en: {
    menu: [
      { id: "top", label: "Home" },
      { id: "build", label: "Services" },
      { id: "process", label: "Process" },
      { id: "lab", label: "Who We Help" },
      { id: "contact", label: "Contact" },
    ],
    heroLabel: "Websites, content systems, and practical tools",
    heroTitle: "Ideas are heated into impact.",
    heroCopy:
      "Kettles builds websites, landing pages, content systems, internal tools, and digital products. Simple scope, clean design, useful delivery.",
    heroChips: ["Websites", "Landing Pages", "Content Systems", "Internal Tools"],
    primaryCta: "Start a Project",
    secondaryCta: "View Services",
    heroCardTitle: "Practical build partner.",
    heroCardCopy: "For brands, service businesses, and teams who need the work done clearly.",
    trustItems: ["Clear scope", "Focused pace", "Plain communication", "Useful handoff"],
    typicalLabel: "Typical work",
    typicalWork: [
      ["New website", "Design + build"],
      ["Content workflow", "Plan + system"],
      ["Internal tool", "Prototype + handoff"],
    ],
    problemLabel: "Why teams ask for help",
    problemTitle: "The work is important, but the team is already stretched.",
    problemCopy:
      "You need a better website, a clearer landing page, a content system, or a practical tool that removes manual work. Kettles helps you get it built without turning it into a huge project.",
    servicesLabel: "Services",
    servicesTitle: "What we can help with.",
    servicesCopy:
      "Straightforward digital work for teams that need clear output, reliable communication, and a clean handoff.",
    buildItems: [
      {
        title: "Websites & Landing Pages",
        copy: "Clear pages for services, launches, portfolios, and campaigns. Built to explain the offer fast.",
        icon: <MousePointer2 className="h-5 w-5" />,
      },
      {
        title: "Content Systems",
        copy: "Simple planning, publishing, and repurposing flows so your team can stay consistent.",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Automation & Tools",
        copy: "Practical internal tools, forms, dashboards, and repeatable workflows that save time.",
        icon: <Wrench className="h-5 w-5" />,
      },
      {
        title: "Digital Products",
        copy: "MVPs, client portals, and product screens shaped around real users and real work.",
        icon: <Layers3 className="h-5 w-5" />,
      },
    ],
    processLabel: "Process",
    processTitle: "A simple way to work together.",
    processItems: [
      {
        title: "Listen",
        copy: "We understand the goal, audience, current problems, and what needs to be done first.",
      },
      {
        title: "Plan",
        copy: "We agree on the pages, features, timeline, and what success should look like.",
      },
      {
        title: "Build",
        copy: "We design, write, and build in focused steps so you can review real progress.",
      },
      {
        title: "Support",
        copy: "We hand over the work clearly and stay available for fixes, updates, and next steps.",
      },
    ],
    helpLabel: "Who we help",
    helpTitle: "Built for real work.",
    helpCopy: "No bloated process. No vague strategy theater. Just useful planning, clean design, and practical delivery.",
    labItems: [
      {
        title: "Service Businesses",
        copy: "Websites and landing pages that make the offer, proof, and next step easy to understand.",
        label: "Web",
      },
      {
        title: "Growing Teams",
        copy: "Content and workflow systems for teams that need more consistency without more meetings.",
        label: "Ops",
      },
      {
        title: "Early Products",
        copy: "Simple product screens, portals, and prototypes for testing an idea before overbuilding.",
        label: "Product",
      },
    ],
    contactLabel: "Start here",
    contactTitle: "Need a website, system, or tool built?",
    contactCopy: "Send a short note about what you need. We'll reply with the clearest next step.",
    contactCta: "Work With Kettles",
    footer: "Kettles. Websites, content systems, and practical digital tools.",
    footerRights: "All rights reserved 2026",
  },
  my: {
    menu: [
      { id: "top", label: "???" },
      { id: "build", label: "???????????" },
      { id: "process", label: "???????????" },
      { id: "lab", label: "???????????????" },
      { id: "contact", label: "??????????" },
    ],
    heroLabel: "??????????? ????????????? ?????????????????? tools",
    heroTitle: "အိုင်ဒီယာကို ရလဒ်ဖြစ်အောင် တည်ဆောက်ပေးတယ်။",
    heroCopy:
      "Kettles ? websites, landing pages, content systems, internal tools ??? digital products ?????? ?????????????????? ????????????????? Scope ????????? design ?????????? ?????????????????? ???????",
    heroChips: ["Websites", "Landing Pages", "Content Systems", "Internal Tools"],
    primaryCta: "Project ???????",
    secondaryCta: "???????????????????",
    heroCardTitle: "????????????????? ?????????????? partner.",
    heroCardCopy: "Brands, service businesses ??? teams ???????? ????????????????? ?????????????????? ???????????? ?????????????",
    trustItems: ["Scope ????????", "??????????? ???????", "????????????????? ????????????", "Handoff ?????????"],
    typicalLabel: "?????????????????????",
    typicalWork: [
      ["Website ????", "Design + build"],
      ["Content workflow", "Plan + system"],
      ["Internal tool", "Prototype + handoff"],
    ],
    problemLabel: "????????? ?????????????",
    problemTitle: "?????????????????????? ???????????? ??????????????????",
    problemCopy:
      "Website ???????????????? landing page ??????????????? content system ??????????? manual work ?????????? tool ???????????????? Kettles ? project ????????????? ??????????? ?????????????????",
    servicesLabel: "???????????????",
    servicesTitle: "??????????????????????",
    servicesCopy: "Output ?????? communication ????????? handoff ????????? digital work ?????? ?????????????????",
    buildItems: [
      {
        title: "Websites & Landing Pages",
        copy: "Service, launch, portfolio, campaign ???????? offer ??? ??????????????????? ?????????????",
        icon: <MousePointer2 className="h-5 w-5" />,
      },
      {
        title: "Content Systems",
        copy: "Content planning, publishing, repurposing ??? ??? consistent ????????? workflow ?????????",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Automation & Tools",
        copy: "???????????????????????? ????????????? internal tools, forms, dashboards ??? workflows.",
        icon: <Wrench className="h-5 w-5" />,
      },
      {
        title: "Digital Products",
        copy: "???????????? user ??? workflow ??? ???????????? MVPs, portals ??? product screens.",
        icon: <Layers3 className="h-5 w-5" />,
      },
    ],
    processLabel: "???????????",
    processTitle: "????????????? ????????????????????",
    processItems: [
      {
        title: "????????",
        copy: "Goal, audience, current problems ??? ??????????????????????? ?????????????????? ?????????????????????",
      },
      {
        title: "?????",
        copy: "Pages, features, timeline ??? success ??? ????????????????????? ??????????????????",
      },
      {
        title: "????????",
        copy: "Design, copy ??? build ??? ?????????????????? ???????????? progress ??? review ?????????????????",
      },
      {
        title: "???????",
        copy: "Handoff ??? ????????????????????????? fixes, updates, next steps ???????? ??????????????????",
      },
    ],
    helpLabel: "???????????????",
    helpTitle: "????????????????????????????",
    helpCopy: "???????????? process ?????????? ???????? strategy ??????????????? ?????????? Plan ?????? design ??????? delivery ??????????????? ??????????????",
    labItems: [
      {
        title: "Service Businesses",
        copy: "Offer, proof ??? next step ??? ??????????? ??????????????????? websites ??? landing pages.",
        label: "Web",
      },
      {
        title: "Growing Teams",
        copy: "Meetings ??????? content ??? workflow ??? ??? consistent ????????????? teams.",
        label: "Ops",
      },
      {
        title: "Early Products",
        copy: "????????????????? idea ??? ?????????????? product screens, portals ??? prototypes.",
        label: "Product",
      },
    ],
    contactLabel: "????? ??????????????",
    contactTitle: "Website, system, tool ????? ????????????",
    contactCopy: "??????????? ???????????????? ???????????????????????????? ?????????????????? ?????????????????",
    contactCta: "Kettles ??? ???????????",
    footer: "Kettles. Websites, content systems ??? practical digital tools.",
    footerRights: "??????????????????? ?????????????? 2026",
  },
} satisfies Record<Lang, {
  menu: MenuItem[];
  heroLabel: string;
  heroTitle: string;
  heroCopy: string;
  heroChips: string[];
  primaryCta: string;
  secondaryCta: string;
  heroCardTitle: string;
  heroCardCopy: string;
  trustItems: string[];
  typicalLabel: string;
  typicalWork: string[][];
  problemLabel: string;
  problemTitle: string;
  problemCopy: string;
  servicesLabel: string;
  servicesTitle: string;
  servicesCopy: string;
  buildItems: Array<{ title: string; copy: string; icon: React.ReactNode }>;
  processLabel: string;
  processTitle: string;
  processItems: Array<{ title: string; copy: string }>;
  helpLabel: string;
  helpTitle: string;
  helpCopy: string;
  labItems: Array<{ title: string; copy: string; label: string }>;
  contactLabel: string;
  contactTitle: string;
  contactCopy: string;
  contactCta: string;
  footer: string;
  footerRights: string;
}>;

const myContent = {
  menu: [
    { id: "top", label: "မူလ" },
    { id: "build", label: "ဝန်ဆောင်မှု" },
    { id: "process", label: "လုပ်ငန်းစဉ်" },
    { id: "lab", label: "ဘယ်သူတွေအတွက်လဲ" },
    { id: "contact", label: "ဆက်သွယ်ရန်" },
  ],
  heroLabel: "Websites၊ Content System၊ လက်တွေ့အသုံးဝင်သော Softwareများ",
  heroTitle: "အိုင်ဒီယာမှ ရလာဒ်ကောင်းများ၊ အသုံးဝင် Product များဆီသို့",
  heroCopy:
    "လူကြီးမင်းတို့ရဲ့ စီးပွားရေးလုပ်ငန်းများ အတွက် Kettles Studio မှ Websites, Landing pages, Content များနှင့် Digital Software Products များကို ဝန်ဆောင်မှုပေးနေပါသည်။ Scope ရှင်းတယ်၊ design သပ်ရပ်တယ်၊ အသုံးဝင်တဲ့ရလာဒ် ဖန်တီးပေးတယ်။",
  heroChips: ["Websites", "Landing Pages", "Contents", "Customize Softwares"],
  primaryCta: "Project စတင်မယ်",
  secondaryCta: "ဝန်ဆောင်မှုကြည့်မယ်",
  heroCardTitle: "တကယ်အသုံးတည့်တဲ့ ရလာဒ်များ တည်ဆောက်ပေးနေတဲ့ သင့်အတွက် Kettles Studio.",
  heroCardCopy: "Brands,Companies, Service Businesses နဲ့ Teams တွေအတွက် လိုအပ်တဲ့အလုပ်ကို ထိရောက် ပြီးစီးအောင် ကူညီပေးပါတယ်။",
  trustItems: ["Scope ရှင်းတယ်", "အလုပ်တိကျတယ်", "စိတ်ချရတယ်", "Handoff သပ်ရပ်တယ်"],
  typicalLabel: "ဘာလုပ်ပေးလဲ?",
  typicalWork: [
    ["Website အသစ်", "Design + build"],
    ["Content workflow", "Plan + system"],
    ["Internal tool", "Prototype + handoff"],
    ["Customize Softwares", "Utilty + handoff"],

  ],
  problemLabel: "ဘာကြောင့် အကူအညီလိုတာလဲ",
  problemTitle: "အရေးကြီးတဲ့အလုပ်တွေကို ဆက်ရွှေ့ဖို့ အချိန်မလောက်တဲ့အခါ",
  problemCopy:
    "Website ပိုကောင်းချင်တာ၊ landing page ပိုရှင်းချင်တာ၊ content system တစ်ခုလိုတာ၊ manual work လျှော့မယ့် tool တစ်ခုလိုတာတွေကို Kettles က project ကြီးမဖြစ်စေဘဲ လက်တွေ့ကျကျ တည်ဆောက်ပေးပါတယ်။",
  servicesLabel: "ဝန်ဆောင်မှုများ",
  servicesTitle: "ကူညီပေးနိုင်တဲ့အရာများ",
  servicesCopy: "Output ရှင်း၊ communication ယုံကြည်ရ၊ handoff သပ်ရပ်တဲ့ digital work တွေကို တည်ဆောက်ပေးပါတယ်။",
  buildItems: [
    {
      title: "Websites & Landing Pages",
      copy: "Service, launch, portfolio, campaign တွေအတွက် offer ကို မြန်မြန်နားလည်စေတဲ့ စာမျက်နှာတွေ။",
      icon: <MousePointer2 className="h-5 w-5" />,
    },
    {
      title: "Content Systems",
      copy: "Content planning, publishing, repurposing ကို ပို consistent ဖြစ်စေတဲ့ workflow စနစ်များ။",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Automation & Tools",
      copy: "အချိန်ကုန်တဲ့အလုပ်တွေကို လျှော့ပေးမယ့် internal tools, forms, dashboards နဲ့ workflows.",
      icon: <Wrench className="h-5 w-5" />,
    },
    {
      title: "Digital Products",
      copy: "တကယ်သုံးမယ့် user နဲ့ workflow ကို အခြေခံထားတဲ့ MVPs, portals နဲ့ product screens.",
      icon: <Layers3 className="h-5 w-5" />,
    },
  ],
  processLabel: "လုပ်ငန်းစဉ်",
  processTitle: "အတူတူလုပ်ဖို့ ရိုးရှင်းတဲ့နည်းလမ်း",
  processItems: [
    {
      title: "နားထောင်",
      copy: "Goal, audience, current problems နဲ့ အရင်ဆုံးလုပ်ရမယ့်အရာကို ရှင်းရှင်းလင်းလင်း နားလည်အောင်လုပ်ပါတယ်။",
    },
    {
      title: "စီစဉ်",
      copy: "Pages, features, timeline နဲ့ success ကို ဘယ်လိုမြင်မလဲဆိုတာကို အတူတူသတ်မှတ်ပါတယ်။",
    },
    {
      title: "တည်ဆောက်",
      copy: "Design, copy နဲ့ build ကို အဆင့်လိုက်လုပ်ပြီး တကယ်မြင်ရတဲ့ progress ကို review လုပ်နိုင်စေပါတယ်။",
    },
    {
      title: "ဆက်ကူညီ",
      copy: "Handoff ကို ရှင်းရှင်းလင်းလင်းပေးပြီး fixes, updates, next steps တွေအတွက် ဆက်ကူညီနိုင်ပါတယ်။",
    },
  ],
  helpLabel: "ဘယ်သူတွေအတွက်လဲ",
  helpTitle: "တကယ်အသုံးဝင်တဲ့အလုပ်တွေအတွက်",
  helpCopy: "ရှုပ်ထွေးတဲ့ process မလိုပါဘူး။ မရေရာတဲ့ strategy စကားလုံးတွေလည်း မလိုပါဘူး။ Plan ရှင်း၊ design သပ်ရပ်၊ delivery လက်တွေ့ကျဖို့ပဲ အရေးကြီးပါတယ်။",
  labItems: [
    {
      title: "Service Businesses",
      copy: "Offer, proof နဲ့ next step ကို ဖောက်သည်တွေ မြန်မြန်နားလည်စေတဲ့ websites နဲ့ landing pages.",
      label: "Web",
    },
    {
      title: "Growing Teams",
      copy: "Meetings မများဘဲ content နဲ့ workflow ကို ပို consistent ဖြစ်စေချင်တဲ့ teams.",
      label: "Ops",
    },
    {
      title: "Early Products",
      copy: "အလွန်မတည်ဆောက်ခင် idea ကို စမ်းသပ်ချင်တဲ့ product screens, portals နဲ့ prototypes.",
      label: "Product",
    },
  ],
  contactLabel: "ဒီမှာ စတင်နိုင်ပါတယ်",
  contactTitle: "Website, system, tool တစ်ခု လိုနေပါသလား?",
  contactCopy: "လိုအပ်တာကို အတိုချုပ်ပို့ပါ။ ဘယ်လိုစရင်အကောင်းဆုံးလဲဆိုတာ ရှင်းရှင်းလင်းလင်း ပြန်ပြောပေးပါမယ်။",
  contactCta: "Kettles နဲ့ စကားပြောမယ်",
  footer: "Kettles. Websites, content systems နဲ့ practical digital tools.",
  footerRights: "မူပိုင်ခွင့်အားလုံး ထိန်းသိမ်းပြီး 2026",
} satisfies typeof content.en;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/42">
      {children}
    </p>
  );
}

function PetSectionLabel({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: KittleMode;
}) {
  return (
    <div className="flex items-end gap-3">
      <KittlePet mode={mode} className="w-12 shrink-0 md:w-14" />
      <SectionLabel>{children}</SectionLabel>
    </div>
  );
}

function GlowLine() {
  return (
    <div className="relative h-px w-full overflow-hidden bg-white/10">
      <div className="absolute left-1/2 top-0 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF5303] to-transparent opacity-80" />
    </div>
  );
}

function StudioCard({
  title,
  copy,
  icon,
}: {
  title: string;
  copy: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#FF5303]/20 blur-3xl" />
      </div>
      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black text-[#FF5303]">
          {icon}
        </div>
        <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/58">{copy}</p>
      </div>
    </motion.article>
  );
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const c = lang === "my" ? myContent : content.en;

  useGsapSmoothScroll({ enabled: !isLoading, lerp: 0.115 });

  const menuItems: MenuItem[] = useMemo(
    () => (lang === "my" ? myContent.menu : content.en.menu),
    [lang],
  );

  const social = useMemo(
    () => [{ label: "Email", href: "mailto:hello@kettles.dev", icon: <Mail className="h-4 w-4" /> }],
    [],
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 88;
    gsap.to(window, { duration: 0.85, ease: "power3.out", scrollTo: y });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] text-white selection:bg-[#FF5303]/30">
      {isLoading ? <LoadingPage onDone={() => setIsLoading(false)} minDurationMs={2800} /> : null}

      <MobileMenu
        open={menuOpen}
        items={menuItems}
        social={social}
        onClose={() => setMenuOpen(false)}
        onNavigate={(id) => {
          setMenuOpen(false);
          window.setTimeout(() => scrollToSection(id), 120);
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,83,3,0.12),transparent_28%),linear-gradient(180deg,#090909_0%,#030303_46%,#000_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.025] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]" />

      <header
        className={[
          "fixed inset-x-0 top-0 z-50 border-b px-6 py-4 backdrop-blur-xl transition-colors",
          isScrolled ? "border-white/10 bg-black/76" : "border-white/5 bg-black/30",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => scrollToSection("top")}
            className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5303]"
            aria-label="Scroll to top"
          >
            <span className="relative block h-10 w-40 overflow-hidden md:w-44" aria-hidden="true">
              <Image
                src="/logos/logo-01.svg"
                alt=""
                width={1080}
                height={1080}
                priority
                className="absolute left-0 top-1/2 h-10 w-10 max-w-none origin-left -translate-y-1/2 scale-[4.3] opacity-100 transition-opacity duration-200 [filter:brightness(0)_saturate(100%)_invert(43%)_sepia(95%)_saturate(3073%)_hue-rotate(2deg)_brightness(103%)_contrast(105%)] group-hover:opacity-0"
              />
              <Image
                src="/logos/logo-01.svg"
                alt=""
                width={1080}
                height={1080}
                priority
                className="absolute left-0 top-1/2 h-10 w-10 max-w-none origin-left -translate-y-1/2 scale-[4.3] opacity-0 invert transition-opacity duration-200 group-hover:opacity-100"
              />
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {menuItems.slice(1).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="rounded-full px-4 py-2 text-xs font-medium text-white/52 transition hover:bg-white/[0.06] hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1 text-[11px] font-semibold text-white/54">
              {(["en", "my"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLang(option)}
                  className={[
                    "rounded-full px-3 py-1.5 transition",
                    lang === option ? "bg-[#FF5303] text-white" : "hover:text-white",
                  ].join(" ")}
                  aria-pressed={lang === option}
                >
                  {option === "en" ? "EN" : "မြန်မာ"}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10">
        <section id="top" className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-20 pt-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionLabel>{c.heroLabel}</SectionLabel>
              <h1
                className={[
                  "mt-7 max-w-4xl text-balance font-semibold leading-[1.08] tracking-[-0.04em] text-white",
                  lang === "my" ? "text-2xl md:text-3xl" : "text-5xl md:text-7xl",
                ].join(" ")}
              >
                {c.heroTitle}
              </h1>
              <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-white/66 md:text-lg">
                {c.heroCopy}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/72">
                {c.heroChips.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center justify-center rounded-full bg-[#FF5303] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(255,83,3,0.38)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(255,83,3,0.48)]"
                >
                  {c.primaryCta}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("build")}
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/82 transition hover:border-[#FF5303]/50 hover:text-white"
                >
                  {c.secondaryCta}
                </button>
              </div>
            </motion.div>

            <Reveal delay={0.12}>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.36)]">
                <div className="flex items-center gap-5 border-b border-white/10 pb-5">
                  <KittlePet mode="waving" className="w-20 shrink-0 md:w-24" />
                  <div>
                    <p className="text-sm font-semibold text-white">{c.heroCardTitle}</p>
                    <p className="mt-2 text-sm leading-6 text-white/56">
                      {c.heroCardCopy}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  {c.trustItems.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-white/74">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF5303]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-black/24 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/42">{c.typicalLabel}</p>
                  <div className="mt-4 grid gap-3 text-sm text-white/70">
                    {c.typicalWork.map(([title, value]) => (
                      <div key={title} className="flex justify-between gap-4">
                        <span>{title}</span>
                        <span className="text-white/42">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <GlowLine />

        <section id="problem" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div className="max-w-4xl">
                <PetSectionLabel mode="waiting">{c.problemLabel}</PetSectionLabel>
                <h2
                  className={[
                    "mt-5 text-balance font-semibold leading-[1.12] tracking-[-0.04em] text-white",
                    lang === "my" ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl",
                  ].join(" ")}
                >
                  {c.problemTitle}
                </h2>
                <p className="mt-8 max-w-3xl text-lg leading-9 text-white/62">
                  {c.problemCopy}
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <GlowLine />

        <section id="build" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <PetSectionLabel mode="working">{c.servicesLabel}</PetSectionLabel>
                <h2
                  className={[
                    "mt-5 font-semibold leading-[1.12] tracking-[-0.04em] text-white",
                    lang === "my" ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl",
                  ].join(" ")}
                >
                  {c.servicesTitle}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/56">
                {c.servicesCopy}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {c.buildItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <StudioCard title={item.title} copy={item.copy} icon={item.icon} />
              </Reveal>
            ))}
          </div>
        </section>

        <GlowLine />

        <section id="process" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <Reveal>
            <PetSectionLabel mode="review">{c.processLabel}</PetSectionLabel>
            <h2
              className={[
                "mt-5 max-w-4xl font-semibold leading-[1.12] tracking-[-0.04em] text-white",
                lang === "my" ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl",
              ].join(" ")}
            >
              {c.processTitle}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {c.processItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#FF5303]">0{index + 1}</span>
                    <span className="h-2 w-2 rounded-full bg-[#FF5303] shadow-[0_0_18px_rgba(255,83,3,0.9)]" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/54">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <GlowLine />

        <section id="lab" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <PetSectionLabel mode="running-right">{c.helpLabel}</PetSectionLabel>
                <h2
                  className={[
                    "mt-5 font-semibold leading-[1.12] tracking-[-0.04em] text-white",
                    lang === "my" ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl",
                  ].join(" ")}
                >
                  {c.helpTitle}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/56">
                {c.helpCopy}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {c.labItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="group relative min-h-[260px] overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] p-7">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5303]/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">
                      {item.label}
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-[#FF5303]" />
                  </div>
                  <h3 className="mt-20 text-2xl font-semibold tracking-[-0.04em] text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 pb-10 pt-24 md:pt-32">
          <Reveal>
            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] p-8 md:p-12">
              <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#FF5303]/25 blur-3xl" />
              <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <SectionLabel>{c.contactLabel}</SectionLabel>
                  <h2
                    className={[
                      "mt-5 text-balance font-semibold leading-[1.12] tracking-[-0.04em] text-white",
                      lang === "my" ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl",
                    ].join(" ")}
                  >
                    {c.contactTitle}
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-8 text-white/62">
                    {c.contactCopy}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-center gap-3">
                  <KittlePet mode="waving" className="hidden w-20 md:block" />
                  <a
                    href="mailto:hello@kettles.dev?subject=Work%20With%20Kettles"
                    className="inline-flex items-center justify-center rounded-full bg-[#FF5303] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_22px_70px_rgba(255,83,3,0.42)] transition hover:-translate-y-0.5"
                  >
                    {c.contactCta}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <footer className="flex flex-col gap-4 py-10 text-xs text-white/38 md:flex-row md:items-center md:justify-between">
            <span>{c.footer}</span>
            <span>{c.footerRights}</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
