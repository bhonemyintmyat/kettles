"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const landingData = [
  {
    id: "pair-1",
    title: "neutral-to-primary",
    leftImagePath: "/Artboard1.png",
    rightImagePath: "/Artboardcopy.png",
  },
  {
    id: "pair-2",
    title: "primary-to-accent",
    leftImagePath: "/Artboardcopy2.png",
    rightImagePath: "/Artboardcopy3.png",
  },
  {
    id: "pair-3",
    title: "accent-to-warm",
    leftImagePath: "/Artboardcopy4.png",
    rightImagePath: "/Artboardcopy5.png",
  },
  {
    id: "pair-4",
    title: "warm-to-highlight",
    leftImagePath: "/Artboardcopy6.png",
    rightImagePath: "/Artboard1.png",
  },
];

const continuitySectionsData = [
  {
    id: "continuity-1",
    title: "Continuity is the product",
    topParagraph:
      "Most teams do not fail on vision—they fail on drift. When messaging, UI, and physical goods diverge, customers feel the seams before they read a single line of copy. Kettles treats continuity as infrastructure: one rhythm from the first pixel to the last mile.",
    bottomParagraph:
      "That is why we anchor everything in a single dark canvas and a single accent. The orange is not decoration; it is activation—heat moving through the system every time someone takes an action.",
    boxLabel: "PRIMARY-TO-ACCENT",
    imageLeft: "/Artboardcopy2.png",
    imageRight: "/Artboardcopy3.png",
  },
  {
    id: "continuity-2",
    title: "Dummy continuity block",
    topParagraph: "Placeholder top paragraph for scroll and spacing behavior checks.",
    bottomParagraph: "Placeholder bottom paragraph to validate visual rhythm and transitions.",
    boxLabel: "NEUTRAL-TO-PRIMARY",
    imageLeft: "/Artboardcopy.png",
    imageRight: "/Artboardcopy4.png",
  },
  {
    id: "continuity-3",
    title: "Dummy continuity block two",
    topParagraph: "Another placeholder top paragraph used to test sequence progression.",
    bottomParagraph: "Another placeholder bottom paragraph to test card pinning behavior.",
    boxLabel: "PRIMARY-TO-GLOW",
    imageLeft: "/Artboardcopy.png",
    imageRight: "/Artboardcopy2.png",
  },
];

const pageContentData = {
  nav: {
    logoPath: "/Artboardcopy.png",
    links: [
      { label: "Hero", href: "#hero" },
      { label: "Brand Blocks", href: "#brand-blocks" },
      { label: "Billboard", href: "#billboard" },
    ],
    ctaButtons: [
      { label: "Contact", href: "#" },
      { label: "Start Building", href: "#" },
    ],
  },
  hero: {
    headline: "Technology Connects People",
    subhead: "where ideas are heated into impact",
    intro:
      "Kettles is the layer where brand energy becomes product motion—built for teams who ship narratives, systems, and surfaces without losing the spark that started the work.",
    primaryImagePath: "/cv-image.jpg",
  },
  brandVisual: {
    eyebrow: "Brand Blocks",
    lead:
      "Your mockups deserve room to breathe. This board is dedicated to the full brand collage—merch, social, hardware, and outdoor—so every touchpoint reads as one connected story.",
    imagePath: "/kettles-option.jpg",
    footnote:
      "Use this as your single source of truth when reviewing color balance, glow, and contrast against the #0C0C0C canvas before you lock creative.",
  },
  story: {
    sections: [
      {
        id: "chapter-1",
        title: "Continuity is the product",
        paragraphs: [
          "Most teams do not fail on vision—they fail on drift. When messaging, UI, and physical goods diverge, customers feel the seams before they read a single line of copy. Kettles treats continuity as infrastructure: one rhythm from the first pixel to the last mile.",
          "That is why we anchor everything in a single dark canvas and a single accent. The orange is not decoration; it is activation—heat moving through the system every time someone takes an action.",
        ],
      },
      {
        id: "chapter-2",
        title: "From kettle to engine",
        paragraphs: [
          "A kettle turns latent energy into something you can pour. Kettles does the same for ideas: structured inputs, predictable outputs, and a loop that keeps teams aligned while they iterate fast.",
          "You will still debate strategy—that is healthy. What you will not debate is whether the brand still looks like itself on day thirty of a sprint.",
        ],
      },
      {
        id: "chapter-3",
        title: "Built for modern launch teams",
        paragraphs: [
          "Whether you are shipping a consumer app, a creator tool, or a hybrid physical launch, you need a page that feels intentional on first scroll and still holds up on the sixth pass.",
          "This layout is deliberately long. Not to waste time, but to reward attention: each section adds a little more context so stakeholders can align without another deck.",
        ],
      },
      {
        id: "chapter-4",
        title: "Signals you can trust",
        paragraphs: [
          "When photography carries your logo and your glow, the page should not fight it. We keep typography calm, spacing disciplined, and motion restrained so the visuals stay authoritative.",
          "If something feels empty, it is usually missing narrative—not missing decoration. We fill space with language so the experience feels complete, not padded.",
        ],
      },
    ],
  },
  billboard: {
    title: "Billboard",
    body:
      "Out-of-home is a promise: your brand can hold attention without a click. Kettles extends the same contrast discipline to large-format moments—high read, high recall, zero noise.",
    ctaHint: "When you are ready, bring the team. We will pressure-test the story against real surfaces and real distances.",
  },
  footer: {
    line: "Kettles · Dark canvas · #0C0C0C · Accent #FF5303",
  },
};

type MarqueeAsset = {
  id: string;
  title: string;
  imagePath: string;
};

/** Logo image paths (under /public). Reused between story paragraphs. */
const marqueeAssets: MarqueeAsset[] = [
  { id: "artboard-1", title: "Primary mark on dark canvas", imagePath: "/Artboard1.png" },
  { id: "artboard-2", title: "Secondary lockup study", imagePath: "/Artboard2.png" },
  { id: "artboard-3", title: "Wordmark emphasis variant", imagePath: "/Artboardcopy3.png" },
  { id: "artboard-copy", title: "White logo on black", imagePath: "/Artboardcopy.png" },
  { id: "artboard-copy-2", title: "Orange glow brand tile", imagePath: "/Artboardcopy2.png" },
  { id: "artboard-copy-3", title: "Social surface mockup", imagePath: "/Artboardcopy3.png" },
  { id: "artboard-copy-4", title: "AR glasses mockup", imagePath: "/Artboardcopy4.png" },
  { id: "artboard-copy-5", title: "Merch stack preview", imagePath: "/Artboardcopy5.png" },
  { id: "artboard-copy-6", title: "Billboard silhouette study", imagePath: "/Artboardcopy6.png" },
];

const gap = {
  section: 64,
  block: 20,
  navRow: 14,
  text: 14,
};

const sectionMinH = "min-h-[72vh]";

const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
};

const interactiveHoverClass =
  "transition-all duration-300 hover:scale-[1.02] hover:ring-2 hover:ring-inset hover:ring-[#FF5303]";

export default function Page() {
  return (
    <main
      style={{
        backgroundColor: "#0C0C0C",
        color: "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backgroundColor: "#0C0C0C",
            paddingTop: 32,
            paddingBottom: 32,
            paddingLeft: 0,
            paddingRight: 0,
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: gap.navRow }} aria-label="Primary">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <a href="#hero" style={{ display: "flex", alignItems: "center", lineHeight: 0 }}>
                <Image
                  src={pageContentData.nav.logoPath}
                  alt=""
                  width={140}
                  height={45}
                  style={{ objectFit: "contain" }}
                  sizes="140px"
                  priority
                />
              </a>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
                {pageContentData.nav.ctaButtons.map((btn, index) => (
                  <a
                    key={`${btn.href}-${btn.label}`}
                    href={btn.href}
                    className={`inline-block rounded-sm ${interactiveHoverClass}`}
                    style={{
                      border: index === 0 ? "1px solid #FFFFFF" : "1px solid #FF5303",
                      backgroundColor: index === 0 ? "#0C0C0C" : "#FF5303",
                      color: index === 0 ? "#FFFFFF" : "#FFFFFF",
                      textDecoration: "none",
                      paddingTop: 8,
                      paddingBottom: 8,
                      paddingLeft: 14,
                      paddingRight: 14,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 18,
                paddingTop: 4,
                borderTop: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {pageContentData.nav.links.map((link) => (
                <a
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  style={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    opacity: 0.8,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </header>

        <section
          id="hero"
          className={sectionMinH}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: gap.section,
            paddingBottom: gap.section * 1.25,
            paddingLeft: 0,
            paddingRight: 0,
            marginTop: 0,
            textAlign: "center",
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroContainerVariants}
            style={{ margin: 0, padding: 0, width: "100%" }}
          >
            <motion.div
              variants={heroItemVariants}
              style={{
                margin: `0 0 ${gap.block}px 0`,
                padding: "12px 16px 8px",
              }}
            >
              <h1 className="mb-4 text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
                {pageContentData.hero.headline}
              </h1>
              <p
                style={{
                  margin: `0 0 6px 0`,
                  maxWidth: 520,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="text-lg leading-relaxed text-white/80 md:text-xl"
              >
                {pageContentData.hero.subhead}
              </p>
              <p
                style={{
                  margin: `6px 0 0 0`,
                  maxWidth: 560,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="text-lg leading-loose text-white/80 md:text-xl"
              >
                {pageContentData.hero.intro}
              </p>
            </motion.div>

            <motion.div
              variants={heroItemVariants}
              style={{
                margin: `${gap.block}px 0 0 0`,
                marginLeft: -16,
                marginRight: -16,
                padding: 0,
                width: "calc(100% + 32px)",
                lineHeight: 0,
              }}
            >
              <Image
                src={pageContentData.hero.primaryImagePath}
                alt=""
                width={960}
                height={540}
                priority
                sizes="(max-width: 960px) 100vw, 960px"
                className="block h-auto w-full max-w-none"
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </motion.div>
        </section>

        <section className="space-y-16 border-t border-white/10 py-24 md:py-32 md:space-y-24">
          {continuitySectionsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid grid-cols-1 gap-12 md:gap-20 lg:grid-cols-2"
            >
              <div className={index % 2 === 0 ? "" : "lg:order-last"}>
                <h2 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-5xl">{item.title}</h2>
                <p className="text-lg leading-relaxed text-white/80 md:text-xl">{item.topParagraph}</p>
                <div className="h-5" />
                <p className="text-lg leading-loose text-white/80 md:text-xl">{item.bottomParagraph}</p>
              </div>

              <div className="rounded-md border border-black/15 bg-black p-4">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">{item.boxLabel}</p>
                <div className="grid grid-cols-2 gap-12 md:gap-20">
                  <div className="rounded-sm border border-white/15 bg-black p-3">
                    <Image
                      src={item.imageLeft}
                      alt=""
                      width={200}
                      height={200}
                      sizes="200px"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                  <div className="rounded-sm border border-white/15 bg-black p-3">
                    <Image
                      src={item.imageRight}
                      alt=""
                      width={200}
                      height={200}
                      sizes="200px"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <section
          id="brand-blocks"
          className={sectionMinH}
          style={{
            backgroundColor: "#0C0C0C",
            marginLeft: -16,
            marginRight: -16,
            paddingTop: gap.section * 1.75,
            paddingBottom: gap.section * 1.75,
            paddingLeft: 20,
            paddingRight: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: "center", maxWidth: 580, margin: "0 auto", marginBottom: gap.block }}
          >
            <p
              style={{
                margin: `0 0 ${gap.text}px 0`,
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              {pageContentData.brandVisual.eyebrow}
            </p>
            <p
              style={{
                margin: `0 0 ${gap.text}px 0`,
              }}
              className="text-lg leading-relaxed text-white/80 md:text-xl"
            >
              {pageContentData.brandVisual.lead}
            </p>
            <p className="text-lg leading-loose text-white/80 md:text-xl" style={{ margin: 0 }}>
              {pageContentData.brandVisual.footnote}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              marginLeft: -4,
              marginRight: -4,
              lineHeight: 0,
              overflow: "hidden",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Image
              src={pageContentData.brandVisual.imagePath}
              alt=""
              width={1200}
              height={800}
              sizes="(max-width: 960px) 100vw, 960px"
              className="block h-auto w-full max-w-full"
              style={{ objectFit: "contain" }}
            />
          </motion.div>
        </section>

        <section
          id="billboard"
          className={sectionMinH}
          style={{
            paddingTop: gap.section * 2,
            paddingBottom: gap.section * 2.5,
            paddingLeft: 12,
            paddingRight: 12,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            style={{ padding: "16px 12px 28px", maxWidth: 560, margin: "0 auto" }}
          >
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {pageContentData.billboard.title}
            </h2>
            <p
              style={{
                margin: `0 0 ${gap.text}px 0`,
              }}
              className="text-lg leading-relaxed text-white/80 md:text-xl"
            >
              {pageContentData.billboard.body}
            </p>
            <p className="text-lg leading-loose text-white/80 md:text-xl" style={{ margin: 0 }}>
              {pageContentData.billboard.ctaHint}
            </p>
          </motion.div>
        </section>

        <footer
          style={{
            paddingTop: gap.section,
            paddingBottom: 40,
            textAlign: "center",
            fontSize: 12,
            opacity: 0.5,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <p style={{ margin: 0 }}>{pageContentData.footer.line}</p>
        </footer>
      </div>
    </main>
  );
}
