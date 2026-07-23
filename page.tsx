"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Layers3,
  Mail,
  Menu,
  Minus,
  MousePointer2,
  Plus,
  Sparkles,
  Wrench,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { LoadingPage } from "./app/components/LoadingPage";
import { MobileMenu, type MenuItem } from "./app/components/MobileMenu";
import { KittlePet, type KittleMode } from "./app/components/KittlePet";
import { useGsapSmoothScroll } from "./app/hooks/useGsapSmoothScroll";

gsap.registerPlugin(ScrollToPlugin);

type Lang = "en" | "my";

function trackInquiry(method: "telegram" | "linkedin" | "email") {
  const analyticsWindow = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
  };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  analyticsWindow.dataLayer.push({ event: "inquiry_click", inquiry_method: method });
}

type PackageItem = {
  title: string;
  price: string;
  audience: string;
  includesLabel: string;
  includes: string[];
  result: string;
  note?: string;
  icon: "starter" | "trust" | "monthly" | "lite";
  compact?: boolean;
};

type FocusedServiceItem = {
  title: string;
  price: string;
  copy: string;
  includes: string[];
};

type PartnerItem = {
  name: string;
  label: string;
};

type PageContent = {
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
  packagesLabel: string;
  packagesTitle: string;
  packagesCopy: string;
  packages: PackageItem[];
  focusedLabel: string;
  focusedTitle: string;
  focusedCopy: string;
  focusedServices: FocusedServiceItem[];
  processLabel: string;
  processTitle: string;
  processItems: Array<{ title: string; copy: string }>;
  helpLabel: string;
  helpTitle: string;
  helpCopy: string;
  labItems: Array<{ title: string; copy: string; label: string }>;
  trustedLabel: string;
  trustedTitle: string;
  trustedCopy: string;
  trustedPartners: PartnerItem[];
  contactLabel: string;
  contactTitle: string;
  contactCopy: string;
  contactCta: string;
  footer: string;
  footerRights: string;
};

const content = {
  en: {
    menu: [
      { id: "build", label: "Offer" },
      { id: "packages", label: "Packages" },
      { id: "focused-services", label: "Focused Services" },
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
        title: "B2B Products & Portals",
        copy: "Client portals, focused MVPs, and practical product screens built around real business workflows.",
        icon: <Layers3 className="h-5 w-5" />,
      },
    ],
    packagesLabel: "Packages",
    packagesTitle: "Choose the clearest next step.",
    packagesCopy:
      "Start with a professional business foundation, launch a client-ready website, or keep your online presence active every month.",
    packages: [
      {
        title: "Quick Business Setup",
        price: "$249 one-time",
        audience: "For founders who need a clear business message and one professional online profile.",
        includesLabel: "What you get",
        includes: [
          "30-minute discovery call",
          "Core offer and business bio",
          "Up to 3 service descriptions",
          "1 primary profile setup or cleanup",
          "Contact and inquiry path",
          "3 ready-to-post starter posts",
          "Simple 14-day launch checklist",
        ],
        result: "A clear online starting point customers can understand and contact.",
        note: "One primary platform, one revision round, and delivery in 3-5 business days.",
        icon: "starter",
      },
      {
        title: "Client-Ready Website",
        price: "from $699 one-time",
        audience: "For businesses that need a professional place to explain their offer and receive inquiries.",
        includesLabel: "What you get",
        includes: [
          "Discovery and one-page plan",
          "Customer-focused website copy",
          "Responsive one-page website",
          "Contact or inquiry form",
          "Basic SEO metadata",
          "Analytics and launch setup",
          "Account handoff and launch support",
        ],
        result: "A live, professional website ready to explain your business and collect inquiries.",
        note: "Up to 8 standard sections, two revision rounds, and delivery in 7-14 business days.",
        icon: "trust",
      },
      {
        title: "Monthly Online Support",
        price: "from $399 / month",
        audience: "For businesses that want consistent content and online updates without planning alone.",
        includesLabel: "What you get each month",
        includes: [
          "Monthly planning call",
          "Monthly content calendar",
          "8 content ideas and captions",
          "4 short video scripts",
          "1 Google Business update text",
          "1 small profile or website text update",
          "Monthly performance summary",
        ],
        result: "A steady online presence supported by a repeatable monthly content system.",
        note: "Managed scheduling for up to 8 posts is available on the $599 plan. Filming, ads, daily community management, and heavy editing are not included.",
        icon: "monthly",
      },
    ],
    focusedLabel: "Focused Services",
    focusedTitle: "Need one specific thing?",
    focusedCopy:
      "Small, clear boxes for the exact piece you need now. Each one stays scoped so it can move quickly.",
    focusedServices: [
      {
        title: "Short Video Scripts",
        price: "from $200",
        copy: "Ready-to-record ideas and scripts for TikTok, Reels, and Shorts.",
        includes: ["10 video ideas", "10 hooks and scripts", "Calls to action", "Simple filming direction"],
      },
      {
        title: "Social Content Writing",
        price: "from $150",
        copy: "Customer-facing social posts written in a clear, consistent business voice.",
        includes: ["8 social posts", "Captions and CTAs", "Business tone alignment", "1 revision batch"],
      },
      {
        title: "Burmese Voice & Localization",
        price: "custom quote",
        copy: "Natural Burmese voiceover and localization for international content and campaigns.",
        includes: ["Burmese translation", "Script localization", "Voiceover recording", "Clean audio delivery"],
      },
      {
        title: "Google Business",
        price: "from $200",
        copy: "Google Business Profile setup and cleanup for a clearer Search and Maps presence.",
        includes: [
          "Profile setup or cleanup",
          "Business description rewrite",
          "Service and category direction",
          "Contact, location, and hours check",
          "Review request and update ideas",
        ],
      },
      {
        title: "Brand Message",
        price: "from $300",
        copy: "A clearer message so customers can quickly understand your business and offer.",
        includes: ["Core business message", "Business bio", "Offer descriptions", "Tone and contact CTA"],
      },
      {
        title: "AI Workflow",
        price: "from $500",
        copy: "A practical AI-assisted workflow for repeatable content or administrative tasks.",
        includes: ["Workflow diagnosis", "Reusable prompt system", "Task templates", "Documentation and training"],
      },
      {
        title: "Custom Build",
        price: "from $950",
        copy: "Custom software, automation, or digital systems that do not fit a standard package.",
        includes: ["Problem mapping", "Defined scope", "Delivery plan", "Timeline and estimate"],
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
    trustedLabel: "Trusted Partner",
    trustedTitle: "Built to support real work, not just nice words.",
    trustedCopy:
      "Kettles collaborates across projects, brands, and creative systems with a practical, reliable approach.",
    trustedPartners: [
      { name: "TrustMark", label: "Dried nipa palm and agricultural exporter" },
      { name: "89Lounge", label: "Creative / media brand" },
      { name: "Japan Style", label: "Clothing and lifestyle brand retailer" },
      { name: "High Table", label: "Cannabis brand" },
      { name: "Myo Myanmar", label: "Real estate and local business presence" },
    ],
    contactLabel: "Start here",
    contactTitle: "Need a website, system, or tool built?",
    contactCopy:
      "Send a short note about what you need. We can talk online or meet in person when location and schedule allow.",
    contactCta: "Work With Kettles",
    footer: "Kettles. Websites, content systems, and practical digital tools.",
    footerRights: "All rights reserved 2026",
  },
  my: {
    menu: [
      { id: "build", label: "Offer" },
      { id: "packages", label: "Packages" },
      { id: "focused-services", label: "Focused Services" },
      { id: "lab", label: "Who We Help" },
      { id: "contact", label: "Contact" },
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
        title: "B2B Products & Portals",
        copy: "???????????? user ??? workflow ??? ???????????? MVPs, client portals ??? product screens.",
        icon: <Layers3 className="h-5 w-5" />,
      },
    ],
    packagesLabel: "Packages",
    packagesTitle: "Choose the shape of help you need.",
    packagesCopy:
      "Clear, productized support for businesses that want to look trustworthy online, communicate clearly, and stay active consistently.",
    packages: [
      {
        title: "Online Starter Kit",
        price: "from $250 one-time",
        audience: "Founders or businesses starting from zero and needing a clear online foundation.",
        includesLabel: "What you get",
        includes: ["Business bio", "Service description", "Social profile bio", "Contact CTA", "5 starter captions", "Simple online setup checklist"],
        result: "A clear online starting point customers can understand.",
        icon: "starter",
      },
      {
        title: "Trust Cleanup",
        price: "from $500 one-time",
        audience: "Existing businesses whose online presence looks unclear, weak, or not trustworthy enough.",
        includesLabel: "What you get",
        includes: ["Profile cleanup", "Google Business Profile text support", "Business description rewrite", "Contact path improvement", "10 content ideas", "5 ready-to-post captions"],
        result: "A clearer, more trustworthy online presence.",
        icon: "trust",
      },
      {
        title: "Monthly Presence System",
        price: "from $500 / month",
        audience: "Businesses that want to stay visible every month without planning everything alone.",
        includesLabel: "What you get each month",
        includes: ["Monthly content calendar", "8 post ideas", "8 captions", "8 short video scripts", "1 Google Business update text", "Posting support for up to 8 posts per month", "1 monthly review call"],
        result: "A steady monthly presence with a repeatable content system.",
        note: "Scoped monthly support. Daily community management, ad management, heavy video editing, and unlimited revisions are not included.",
        icon: "monthly",
      },
    ],
    focusedLabel: "Focused Services",
    focusedTitle: "Need one specific thing?",
    focusedCopy:
      "Small, clear boxes for the exact piece you need now. Each one stays scoped so it can move quickly.",
    focusedServices: [
      {
        title: "Website Box",
        price: "from $750",
        copy: "A focused website or landing page build for a clear offer, launch, or service.",
        includes: ["Page structure", "Copy direction", "Responsive design", "Build and handoff"],
      },
      {
        title: "Short Video Content Box",
        price: "from $500/month",
        copy: "Monthly short-form content planning so your team has useful scripts and posting direction.",
        includes: ["Content angles", "Short video scripts", "Caption hooks", "Monthly content rhythm"],
      },
      {
        title: "Copy & Caption Box",
        price: "from $250",
        copy: "Clearer words for profiles, pages, posts, offers, and customer-facing messages.",
        includes: ["Offer copy cleanup", "Profile or page text", "Caption set", "Contact CTA"],
      },
      {
        title: "Google Box",
        price: "from $200",
        copy: "Google Business and local presence support, focused on trust and basic discoverability.",
        includes: [
          "Profile setup or cleanup",
          "Business description rewrite",
          "Service and category direction",
          "Contact, location, and hours check",
          "Review request and update ideas",
        ],
      },
      {
        title: "Brand Direction Box",
        price: "from $500",
        copy: "A compact direction system so your visuals, words, and offer feel more consistent.",
        includes: ["Brand positioning notes", "Visual direction", "Voice direction", "Practical usage guide"],
      },
      {
        title: "AI Workflow Box",
        price: "from $500",
        copy: "A practical workflow that helps your team use AI for repeatable business tasks.",
        includes: ["Workflow mapping", "Prompt system", "Tool recommendations", "Team handoff notes"],
      },
      {
        title: "Custom Build Plan",
        price: "from $950",
        copy: "For work that does not fit a standard box: a scoped plan for the build, timeline, and next step.",
        includes: ["Problem mapping", "Feature plan", "Build scope", "Timeline and estimate"],
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
    trustedLabel: "Trusted Partner",
    trustedTitle: "Built to support real work, not just nice words.",
    trustedCopy:
      "Kettles collaborates across projects, brands, and creative systems with a practical, reliable approach.",
    trustedPartners: [
      { name: "TrustMark", label: "Dried nipa palm and agricultural exporter" },
      { name: "89Lounge", label: "Creative / media brand" },
      { name: "Japan Style", label: "Clothing and lifestyle brand retailer" },
      { name: "High Table", label: "Cannabis brand" },
    ],
    contactLabel: "????? ??????????????",
    contactTitle: "Website, system, tool ????? ????????????",
    contactCopy: "??????????? ???????????????? ???????????????????????????? ?????????????????? ?????????????????",
    contactCta: "Kettles ??? ???????????",
    footer: "Kettles. Websites, content systems ??? practical digital tools.",
    footerRights: "??????????????????? ?????????????? 2026",
  },
} satisfies Record<Lang, PageContent>;

const myContent = {
  menu: [
    { id: "top", label: "မူလ" },
    { id: "build", label: "ဝန်ဆောင်မှု" },
    { id: "packages", label: "Packages" },
    { id: "process", label: "လုပ်ငန်းစဉ်" },
    { id: "trusted", label: "Trusted Partner" },
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
      title: "B2B Products & Portals",
      copy: "လုပ်ငန်းသုံး workflow တွေအတွက် client portals, focused MVPs နဲ့ အသုံးဝင်တဲ့ product screens များ။",
      icon: <Layers3 className="h-5 w-5" />,
    },
  ],
  packagesLabel: "Packages",
  packagesTitle: "လိုအပ်တဲ့အကူအညီပုံစံကို ရွေးချယ်ပါ။",
  packagesCopy:
    "Online မှာ ယုံကြည်ရတဲ့ပုံစံဖြစ်စေဖို့၊ စကားပြောရှင်းလင်းဖို့၊ content ကို consistent ဖြစ်စေဖို့ productized support package များ။",
  packages: [
    {
      title: "Online Starter Kit",
      price: "from $250 one-time",
      audience:
        "Online မှာ business ကို စတင်တည်ဆောက်ချင်ပြီး bio, service text, contact CTA, starter captions နဲ့ simple checklist လိုအပ်သူများအတွက်။",
      includesLabel: "ပါဝင်သည်များ",
      includes: ["Business bio", "Service description", "Social profile bio", "Contact CTA", "5 starter captions", "Simple online setup checklist"],
      result: "Customer နားလည်လွယ်တဲ့ online starting point တစ်ခုရရှိပါမယ်။",
      icon: "starter",
    },
    {
      title: "Trust Cleanup",
      price: "from $500 one-time",
      audience:
        "ရှိပြီးသား online presence က မရှင်းလင်းသေးတာ၊ weak ဖြစ်နေတာ၊ customer ယုံကြည်ဖို့ မလုံလောက်သေးတာတွေကို ပြန်သပ်ရပ်ချင်သူများအတွက်။",
      includesLabel: "ပါဝင်သည်များ",
      includes: [
        "Facebook / Instagram profile cleanup",
        "Google Business Profile text support",
        "Business description rewrite",
        "Service / menu / product text cleanup",
        "Contact path improvement",
        "Review request message",
        "10 content ideas",
        "5 ready-to-post captions",
      ],
      result: "Online presence ပိုရှင်းပြီး ပိုယုံကြည်ရတဲ့ပုံစံဖြစ်လာပါမယ်။",
      icon: "trust",
    },
    {
      title: "Monthly Presence System",
      price: "from $500 / month",
      audience:
        "လစဉ် content ideas, captions, scripts နဲ့ limited posting support ပါဝင်တဲ့ repeatable system နဲ့ online မှာ active ဖြစ်ချင်သူများအတွက်။",
      includesLabel: "လစဉ်ပါဝင်သည်များ",
      includes: [
        "Monthly content calendar",
        "8 post ideas",
        "8 captions",
        "8 short video scripts",
        "1 Google Business update text",
        "1 profile / website text improvement suggestion",
        "Posting support for up to 8 posts per month when source materials are provided",
        "1 monthly review call",
      ],
      result: "Repeatable content system နဲ့ လစဉ် steady presence ရရှိပါမယ်။",
      note: "Limited scope support ဖြစ်ပါတယ်။ Daily community management, ad management, heavy video editing, unlimited revisions မပါဝင်ပါ။",
      icon: "monthly",
    },
    {
      title: "Local Lite",
      price: "from $99-150 one-time",
      audience: "Budget-sensitive Myanmar businesses အတွက် basic starter option.",
      includesLabel: "ပါဝင်သည်များ",
      includes: ["Social bio rewrite", "Business description", "Contact CTA", "3 captions", "Basic improvement checklist"],
      result: "သေးငယ်ပေမယ့် သပ်ရပ်ပြီး professional ဖြစ်တဲ့ online foundation တစ်ခုစတင်နိုင်ပါမယ်။",
      icon: "lite",
      compact: true,
    },
  ],
  focusedLabel: "Focused Services",
  focusedTitle: "Need one specific thing?",
  focusedCopy:
    "Small, clear boxes for the exact piece you need now. Each one stays scoped so it can move quickly.",
  focusedServices: [
    {
      title: "Website Box",
      price: "from $750",
      copy: "A focused website or landing page build for a clear offer, launch, or service.",
      includes: ["Page structure", "Copy direction", "Responsive design", "Build and handoff"],
    },
    {
      title: "Short Video Content Box",
      price: "from $500/month",
      copy: "Monthly short-form content planning so your team has useful scripts and posting direction.",
      includes: ["Content angles", "Short video scripts", "Caption hooks", "Monthly content rhythm"],
    },
    {
      title: "Copy & Caption Box",
      price: "from $250",
      copy: "Clearer words for profiles, pages, posts, offers, and customer-facing messages.",
      includes: ["Offer copy cleanup", "Profile or page text", "Caption set", "Contact CTA"],
    },
    {
      title: "Google Box",
      price: "from $200",
      copy: "Google Business and local presence support, focused on trust and basic discoverability.",
      includes: [
        "Profile setup or cleanup",
        "Business description rewrite",
        "Service and category direction",
        "Contact, location, and hours check",
        "Review request and update ideas",
      ],
    },
    {
      title: "Brand Direction Box",
      price: "from $500",
      copy: "A compact direction system so your visuals, words, and offer feel more consistent.",
      includes: ["Brand positioning notes", "Visual direction", "Voice direction", "Practical usage guide"],
    },
    {
      title: "AI Workflow Box",
      price: "from $500",
      copy: "A practical workflow that helps your team use AI for repeatable business tasks.",
      includes: ["Workflow mapping", "Prompt system", "Tool recommendations", "Team handoff notes"],
    },
    {
      title: "Custom Build Plan",
      price: "from $950",
      copy: "For work that does not fit a standard box: a scoped plan for the build, timeline, and next step.",
      includes: ["Problem mapping", "Feature plan", "Build scope", "Timeline and estimate"],
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
  trustedLabel: "Trusted Partner",
  trustedTitle: "စကားလုံးလှလှတွေထက် တကယ့်အလုပ်ကို ကူညီနိုင်ဖို့ တည်ဆောက်ထားပါတယ်။",
  trustedCopy:
    "Kettles သည် projects, brands နှင့် creative systems များတွင် လက်တွေ့ကျပြီး ယုံကြည်ရသော approach ဖြင့် ပူးပေါင်းလုပ်ဆောင်ပါသည်။",
  trustedPartners: [
    { name: "TrustMark", label: "Dried nipa palm and agricultural exporter" },
    { name: "89Lounge", label: "Creative / media brand" },
    { name: "Japan Style", label: "Clothing and lifestyle brand retailer" },
    { name: "High Table", label: "Cannabis brand" },
    { name: "Myo Myanmar", label: "Real estate and local business presence" },
  ],
  contactLabel: "ဒီမှာ စတင်နိုင်ပါတယ်",
  contactTitle: "Website, system, tool တစ်ခု လိုနေပါသလား?",
  contactCopy:
    "လိုအပ်တာကို အတိုချုပ်ပို့ပါ။ Online မှာ ဆွေးနွေးနိုင်သလို နေရာနဲ့အချိန်အဆင်ပြေရင် လူချင်းလည်း တွေ့ဆုံနိုင်ပါတယ်။",
  contactCta: "Kettles နဲ့ စကားပြောမယ်",
  footer: "Kettles. Websites, content systems နဲ့ practical digital tools.",
  footerRights: "မူပိုင်ခွင့်အားလုံး ထိန်းသိမ်းပြီး 2026",
} satisfies PageContent;

const myContentResolved = {
  ...myContent,
  packagesLabel: "ပက်ကေ့ချ်များ",
  packagesTitle: "အခုလိုအပ်တဲ့ နောက်တစ်ဆင့်ကို ရွေးပါ။",
  packagesCopy:
    "Business ကို ရှင်းရှင်းလင်းလင်း စတင်ပါ၊ client-ready website တစ်ခု launch လုပ်ပါ၊ ဒါမှမဟုတ် လစဉ် online presence ကို ပုံမှန်ထိန်းသိမ်းပါ။",
  packages: [
    {
      title: "Quick Business Setup",
      price: "$249 တစ်ကြိမ်ပေး",
      audience: "Business message နဲ့ အဓိက online profile တစ်ခုကို ရှင်းလင်းစွာ စတင်လိုတဲ့ founders များအတွက်။",
      includesLabel: "ရရှိမည့်အရာများ",
      includes: [
        "မိနစ် ၃၀ discovery call",
        "Core offer နဲ့ business bio",
        "Service description ၃ ခုအထိ",
        "အဓိက profile ၁ ခု setup သို့ cleanup",
        "Contact နဲ့ inquiry လမ်းကြောင်း",
        "အသင့်တင်နိုင်သော starter posts ၃ ခု",
        "ရက် ၁၄ launch checklist",
      ],
      result: "Customer နားလည်ပြီး ဆက်သွယ်နိုင်တဲ့ ရှင်းလင်းသော online starting point တစ်ခု။",
      note: "အဓိက platform ၁ ခု၊ revision ၁ ကြိမ်၊ ၃–၅ business days အတွင်း delivery။",
      icon: "starter",
    },
    {
      title: "Client-Ready Website",
      price: "$699 မှစ၍ တစ်ကြိမ်ပေး",
      audience: "ကိုယ့် offer ကိုရှင်းပြပြီး inquiry လက်ခံနိုင်မယ့် professional website လိုအပ်သော businesses များအတွက်။",
      includesLabel: "ရရှိမည့်အရာများ",
      includes: [
        "Discovery နဲ့ one-page plan",
        "Customer-focused website copy",
        "Mobile responsive one-page website",
        "Contact သို့ inquiry form",
        "Basic SEO metadata",
        "Analytics နဲ့ launch setup",
        "Account handoff နဲ့ launch support",
      ],
      result: "Business ကိုရှင်းပြပြီး inquiry လက်ခံဖို့ အသင့်ဖြစ်နေသော live professional website တစ်ခု။",
      note: "Standard sections ၈ ခုအထိ၊ revision ၂ ကြိမ်၊ ၇–၁၄ business days အတွင်း delivery။",
      icon: "trust",
    },
    {
      title: "Monthly Online Support",
      price: "တစ်လ $399 မှစ၍",
      audience: "Content နဲ့ online updates ကို လစဉ် consistent ဖြစ်စေချင်တဲ့ businesses များအတွက်။",
      includesLabel: "လစဉ် ရရှိမည့်အရာများ",
      includes: [
        "Monthly planning call",
        "Monthly content calendar",
        "Content ideas နဲ့ captions ၈ ခု",
        "Short video scripts ၄ ခု",
        "Google Business update text ၁ ခု",
        "Profile သို့ website text update အသေး ၁ ခု",
        "Monthly performance summary",
      ],
      result: "ပြန်လည်အသုံးချနိုင်တဲ့ content system နဲ့ ပုံမှန်တက်ကြွနေသော online presence တစ်ခု။",
      note: "$599 plan တွင် post ၈ ခုအထိ scheduling ပါဝင်သည်။ Filming, ads, daily community management နဲ့ heavy editing မပါဝင်ပါ။",
      icon: "monthly",
    },
  ],
  focusedLabel: "သီးသန့်ဝန်ဆောင်မှုများ",
  focusedTitle: "တစ်ခုတည်းပဲ လိုအပ်ပါသလား?",
  focusedCopy: "အခုလိုအပ်တဲ့အရာကိုပဲ ရွေးနိုင်တဲ့ scope ရှင်းပြီး လျင်မြန်သော focused services များ။",
  focusedServices: [
    {
      title: "Short Video Scripts",
      price: "$200 မှစ၍",
      copy: "TikTok, Reels နဲ့ Shorts အတွက် ရိုက်ကူးအသုံးပြုနိုင်သော ideas နဲ့ scripts များ။",
      includes: ["Video ideas ၁၀ ခု", "Hooks နဲ့ scripts ၁၀ ခု", "Calls to action", "ရိုးရှင်းသော filming direction"],
    },
    {
      title: "Social Content Writing",
      price: "$150 မှစ၍",
      copy: "Business voice နဲ့ကိုက်ညီပြီး customer ဖတ်ရှုနားလည်လွယ်သော social posts များ။",
      includes: ["Social posts ၈ ခု", "Captions နဲ့ CTAs", "Business tone alignment", "Revision batch ၁ ကြိမ်"],
    },
    {
      title: "Burmese Voice & Localization",
      price: "လိုအပ်ချက်အလိုက် စျေးနှုန်း",
      copy: "နိုင်ငံတကာ content နဲ့ campaigns များအတွက် သဘာဝကျသော မြန်မာအသံနဲ့ localization။",
      includes: ["မြန်မာဘာသာပြန်", "Script localization", "Voiceover recording", "Clean audio delivery"],
    },
    {
      title: "Google Business",
      price: "$200 မှစ၍",
      copy: "Google Search နဲ့ Maps တွင် ပိုရှင်းလင်းစွာ ပေါ်လာရန် profile setup နဲ့ cleanup။",
      includes: ["Profile setup သို့ cleanup", "Business description", "Service နဲ့ category direction", "Contact/location/hours စစ်ဆေးခြင်း", "Review request နဲ့ update ideas"],
    },
    {
      title: "Brand Message",
      price: "$300 မှစ၍",
      copy: "Customer က business နဲ့ offer ကို မြန်မြန်နားလည်နိုင်စေမယ့် ရှင်းလင်းသော message။",
      includes: ["Core business message", "Business bio", "Offer descriptions", "Tone နဲ့ contact CTA"],
    },
    {
      title: "AI Workflow",
      price: "$500 မှစ၍",
      copy: "ထပ်ခါတလဲလဲလုပ်ရသော content သို့ admin tasks များအတွက် practical AI workflow။",
      includes: ["Workflow diagnosis", "Reusable prompt system", "Task templates", "Documentation နဲ့ training"],
    },
    {
      title: "Custom Build",
      price: "$950 မှစ၍",
      copy: "Standard package များထဲ မဝင်သော custom software, automation သို့ digital systems။",
      includes: ["Problem mapping", "Defined scope", "Delivery plan", "Timeline နဲ့ estimate"],
    },
  ],
} satisfies PageContent;

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
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#FF5303]/20 blur-3xl" />
      </div>
      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black text-[#FF5303]">
          {icon}
        </div>
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/58">{copy}</p>
      </div>
    </motion.article>
  );
}

const packageIconSrcMap = {
  starter: "/package-icons/online-starter-kit.png",
  trust: "/package-icons/trust-cleanup.png",
  monthly: "/package-icons/monthly-presence-system.png",
  lite: "/package-icons/local-lite.png",
} satisfies Record<PackageItem["icon"], string>;

function PackageCard({ item }: { item: PackageItem }) {
  const iconSrc = packageIconSrcMap[item.icon];

  return (
    <motion.article
      whileHover={{ y: item.compact ? -2 : -5 }}
      transition={{ type: "spring", stiffness: 250, damping: 24 }}
      className={[
        "group relative flex flex-col overflow-hidden rounded-[22px] border p-5 shadow-[0_20px_70px_rgba(0,0,0,0.26)]",
        item.compact
          ? "border-white/10 bg-white/[0.025] md:scale-[0.98]"
          : "border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))]",
      ].join(" ")}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5303]/70 to-transparent opacity-70" />
      <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#FF5303]/18 blur-3xl transition-opacity group-hover:opacity-90" />
      <div className="absolute -bottom-24 left-8 h-44 w-44 rounded-full bg-white/[0.045] blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div
          className={[
            "relative flex items-center justify-center overflow-visible rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_55%,rgba(0,0,0,0.22))] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_42px_rgba(0,0,0,0.34)]",
            item.compact ? "h-20 w-20" : "h-24 w-24",
          ].join(" ")}
        >
          <div className="absolute inset-3 rounded-full bg-[#FF5303]/18 blur-2xl" />
          <Image
            src={iconSrc}
            alt={`${item.title} package icon`}
            width={220}
            height={220}
            className={[
              "relative h-auto max-w-none drop-shadow-[0_18px_28px_rgba(0,0,0,0.36)]",
              item.compact ? "w-24" : "w-28",
            ].join(" ")}
          />
        </div>
        <p className="rounded-full border border-white/10 bg-black/36 px-3 py-1.5 text-xs font-semibold text-white/72">
          {item.price}
        </p>
      </div>

      <div className="relative mt-5">
        <h3 className={["font-semibold tracking-[-0.04em] text-white", item.compact ? "text-xl" : "text-2xl"].join(" ")}>
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/58">{item.audience}</p>
      </div>

      <div className="relative mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">{item.includesLabel}</p>
        <ul className="mt-3 grid gap-2.5">
          {item.includes.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-sm leading-6 text-white/68">
              <Sparkles className="mt-1 h-3.5 w-3.5 shrink-0 text-[#FF5303]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative pt-5">
        <div className="rounded-xl border border-white/10 bg-black/28 p-3.5">
          <p className="text-sm leading-6 text-white/76">{item.result}</p>
          {item.note ? <p className="mt-2 text-xs leading-5 text-white/42">{item.note}</p> : null}
        </div>
      </div>
    </motion.article>
  );
}

const focusedServiceIconSrcMap: Record<string, string> = {
  "Short Video Scripts": "/service-icons/short-video-scripts.png",
  "Social Content Writing": "/service-icons/social-content-writing.png",
  "Burmese Voice & Localization": "/service-icons/burmese-voice-localization.png",
  "Google Business": "/service-icons/google-business.png",
  "Brand Message": "/service-icons/brand-message.png",
  "AI Workflow": "/service-icons/ai-workflow.png",
  "Custom Build": "/service-icons/custom-build.png",
};

function FocusedServiceDetail({
  item,
  className = "",
}: {
  item: FocusedServiceItem;
  className?: string;
}) {
  return (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={[
        "gap-5 rounded-[22px] border border-[#FF5303]/25 bg-[linear-gradient(135deg,rgba(255,83,3,0.09),rgba(255,255,255,0.025))] p-4 md:grid-cols-[1fr_auto] md:items-center md:p-6",
        className,
      ].join(" ")}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-lg font-semibold tracking-[-0.03em] text-white md:text-xl">{item.title}</h3>
          <span className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] font-semibold text-white/60">
            {item.price}
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">{item.copy}</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {item.includes.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-white/68">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#FF5303]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
        className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#FF5303] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#ff6a26] md:mt-0"
      >
        Ask about this service
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

function FocusedServiceShelf({ items }: { items: FocusedServiceItem[] }) {
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const activeItem = items.find((item) => item.title === activeTitle);

  return (
    <div className="mt-9">
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7">
        {items.map((item, index) => {
          const selected = item.title === activeTitle;
          const iconSrc = focusedServiceIconSrcMap[item.title];

          return (
            <div key={item.title} className="contents">
              <motion.button
                type="button"
                aria-expanded={selected}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.035, duration: 0.4 }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveTitle(selected ? null : item.title)}
                className="group min-w-0 rounded-[22px] p-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5303]/80"
              >
                <span
                  className={[
                    "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[22px] border transition duration-300",
                    selected
                      ? "border-[#FF5303]/60 bg-[#FF5303]/12 shadow-[0_16px_45px_rgba(255,83,3,0.18)]"
                      : "border-white/10 bg-white/[0.035] group-hover:border-[#FF5303]/35 group-hover:bg-white/[0.055]",
                  ].join(" ")}
                >
                  <span className="absolute h-16 w-16 rounded-full bg-[#FF5303]/20 blur-2xl" />
                  {iconSrc ? (
                    <Image
                      src={iconSrc}
                      alt=""
                      aria-hidden="true"
                      width={220}
                      height={220}
                      className="relative h-[82%] w-[82%] object-contain drop-shadow-[0_14px_20px_rgba(0,0,0,0.4)] transition duration-300 group-hover:scale-[1.06]"
                    />
                  ) : null}
                </span>

                <span className="mt-3 flex min-w-0 items-start justify-between gap-2 px-1">
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-5 tracking-[-0.02em] text-white">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs text-white/42">{item.price}</span>
                  </span>
                  <span
                    className={[
                      "relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_18px_rgba(0,0,0,0.32)] transition",
                      selected
                        ? "border-[#ff8d59]/70 bg-[linear-gradient(145deg,#ff7938,#d93400)] text-white"
                        : "border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.13),rgba(255,255,255,0.035))] text-white/60 group-hover:border-[#FF5303]/50 group-hover:text-[#FF7938]",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <span className="absolute inset-x-1 top-0 h-px bg-white/40" />
                    {selected ? <Minus className="relative h-3.5 w-3.5" /> : <Plus className="relative h-3.5 w-3.5" />}
                  </span>
                </span>
              </motion.button>

              {selected ? (
                <FocusedServiceDetail
                  item={item}
                  className="col-span-2 grid sm:col-span-3 md:hidden"
                />
              ) : null}
            </div>
          );
        })}
      </div>

      {activeItem ? (
        <FocusedServiceDetail item={activeItem} className="mt-5 hidden md:grid" />
      ) : null}
    </div>
  );
}

const partnerLogoSrcMap: Record<string, string> = {
  TrustMark: "/partners/trustmark.png",
  "89Lounge": "/partners/89-lounge-cropped.png",
  "Japan Style": "/partners/japan-style.png",
  "High Table": "/partners/high-table.jpg",
  "Myo Myanmar": "/partners/myo-myanmar.png",
};

function PartnerMarqueeItem({ item }: { item: PartnerItem }) {
  const logoSrc = partnerLogoSrcMap[item.name];

  return (
    <div className="group flex shrink-0 items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.025] py-2 pl-2 pr-5 transition hover:border-[#FF5303]/35 hover:bg-white/[0.05]">
      <div className="relative h-16 w-16 shrink-0 rounded-full border border-white/12 bg-black p-1 shadow-[0_12px_30px_rgba(0,0,0,0.35)] md:h-[72px] md:w-[72px]">
        <div
          className={[
            "relative h-full w-full overflow-hidden rounded-full",
            item.name === "89Lounge" ? "bg-black" : "bg-white",
          ].join(" ")}
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={`${item.name} logo`}
              fill
              sizes="72px"
              className={[
                "object-contain transition duration-500",
                item.name === "89Lounge"
                  ? "-translate-x-1 -translate-y-1 scale-[1.06] group-hover:scale-[1.1]"
                  : "group-hover:scale-[1.04]",
              ].join(" ")}
            />
          ) : null}
        </div>
        <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border border-[#ff925f]/50 bg-[#FF5303]">
          <CheckCircle2 className="h-3 w-3 text-white" />
        </span>
      </div>
      <div>
        <p className="whitespace-nowrap text-sm font-semibold tracking-[-0.02em] text-white">{item.name}</p>
        <p className="mt-1 max-w-[12rem] whitespace-nowrap text-[11px] text-white/38">{item.label}</p>
      </div>
    </div>
  );
}

function PartnerMarquee({ items }: { items: PartnerItem[] }) {
  return (
    <div className="partner-marquee mt-8 overflow-hidden">
      <div className="partner-marquee-track flex w-max items-center gap-3">
        {[0, 1].map((group) => (
          <div
            key={group}
            aria-hidden={group === 1 ? "true" : undefined}
            className="flex shrink-0 items-center gap-3"
          >
            {items.map((item) => (
              <PartnerMarqueeItem key={`${group}-${item.name}`} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TelegramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M21.8 3.2 18.7 20c-.2 1.2-.9 1.5-1.9.9l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5L20.2 3c.9-.3 1.8.2 1.6.2Z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M5.3 3.4a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.5 9h3.6v11.5H3.5V9Zm5.8 0h3.4v1.6h.1c.5-.9 1.7-2 3.5-2 3.7 0 4.4 2.4 4.4 5.6v6.3h-3.6V15c0-1.3 0-3-1.9-3-1.9 0-2.2 1.5-2.2 2.9v5.6H9.3V9Z" />
    </svg>
  );
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const c = lang === "my" ? myContentResolved : content.en;

  useGsapSmoothScroll({ enabled: !isLoading, lerp: 0.115 });

  const menuItems: MenuItem[] = useMemo(
    () => content.en.menu,
    [],
  );

  const social = useMemo(
    () => [
      { label: "Email", href: "mailto:khaingkhantjp@gmail.com", icon: <Mail className="h-4 w-4" /> },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/kettles/",
        icon: <ArrowUpRight className="h-4 w-4" />,
      },
      {
        label: "Telegram",
        href: "https://t.me/normanozbornissick",
        icon: <TelegramIcon className="h-4 w-4" />,
      },
    ],
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
            {menuItems.map((item) => (
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
                  "mt-7 max-w-4xl text-balance font-semibold tracking-[-0.04em] text-white",
                  lang === "my"
                    ? "text-[1.75rem] leading-[1.4] md:text-[2.15rem] md:leading-[1.35]"
                    : "text-5xl leading-[1.08] md:text-7xl",
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

          <div className="mt-9 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.buildItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <StudioCard title={item.title} copy={item.copy} icon={item.icon} />
              </Reveal>
            ))}
          </div>
        </section>

        <GlowLine />

        <section id="packages" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <PetSectionLabel mode="jumping">{c.packagesLabel}</PetSectionLabel>
                <h2
                  className={[
                    "mt-5 text-balance font-semibold leading-[1.12] tracking-[-0.04em] text-white",
                    lang === "my" ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl",
                  ].join(" ")}
                >
                  {c.packagesTitle}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/56">
                {c.packagesCopy}
              </p>
            </div>
          </Reveal>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {c.packages.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <PackageCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>

        <GlowLine />

        <section id="focused-services" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <PetSectionLabel mode="waving">{c.focusedLabel}</PetSectionLabel>
                <h2
                  className={[
                    "mt-5 text-balance font-semibold leading-[1.12] tracking-[-0.04em] text-white",
                    lang === "my" ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl",
                  ].join(" ")}
                >
                  {c.focusedTitle}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/56">
                {c.focusedCopy}
              </p>
            </div>
          </Reveal>

          <FocusedServiceShelf items={c.focusedServices} />
        </section>

        <GlowLine />

        <section id="lab" className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <PetSectionLabel mode="running-right">{c.helpLabel}</PetSectionLabel>
                <h2
                  className={[
                    "mt-4 font-semibold leading-[1.12] tracking-[-0.04em] text-white",
                    lang === "my" ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl",
                  ].join(" ")}
                >
                  {c.helpTitle}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-white/50">
                {c.helpCopy}
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {c.labItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="group relative h-full overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#FF5303]/30">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5303]/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/42">
                      {item.label}
                    </span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#FF5303]" />
                  </div>
                  <h3 className="mt-8 text-lg font-semibold tracking-[-0.035em] text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/52">{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 border-t border-white/[0.08] pt-7">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/42">{c.trustedLabel}</p>
              <p className="max-w-xl text-xs leading-5 text-white/38">{c.trustedCopy}</p>
            </div>
            <PartnerMarquee items={c.trustedPartners} />
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
                    href="https://t.me/normanozbornissick"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackInquiry("telegram")}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5303] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_22px_70px_rgba(255,83,3,0.42)] transition hover:-translate-y-0.5"
                  >
                    <TelegramIcon className="h-4 w-4" />
                    {c.contactCta}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <footer className="flex flex-col gap-4 py-8 text-xs text-white/38 md:flex-row md:items-center md:justify-between">
            <span>Kettles Studio</span>
            <div className="flex items-center gap-2">
              <a
                href="https://t.me/normanozbornissick"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackInquiry("telegram")}
                aria-label="Contact Kettles on Telegram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition hover:border-[#FF5303]/60 hover:bg-[#FF5303]/10 hover:text-white"
              >
                <TelegramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/kettles/"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackInquiry("linkedin")}
                aria-label="Kettles on LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition hover:border-[#FF5303]/60 hover:bg-[#FF5303]/10 hover:text-white"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:khaingkhantjp@gmail.com"
                onClick={() => trackInquiry("email")}
                aria-label="Email Kettles"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/65 transition hover:border-[#FF5303]/60 hover:bg-[#FF5303]/10 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <span>© 2026 Kettles. All rights reserved.</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
