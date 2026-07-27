import Image from "next/image";
import "./founder.css";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Mail,
  MapPin,
} from "lucide-react";

const projects = [
  {
    number: "01",
    category: "Immersive web",
    title: "NAFA — Year in Review",
    description:
      "A digital yearbook where art direction became interaction. Built with Next.js, Three.js and GSAP to carry NAFA’s creative identity across devices.",
    role: "Creative development",
    stack: "Next.js · Three.js · GSAP",
    href: "https://www.nafa.edu.sg/eBook/Year-In-Review-2022-2023/",
  },
  {
    number: "02",
    category: "Digital finance",
    title: "Immin Exchange",
    description:
      "Full-stack delivery across wallet views, reactive order books, order placement and scheduled microservice work for a digital exchange.",
    role: "Product engineering",
    stack: "Quarkus · Flutter · GraphQL",
  },
  {
    number: "03",
    category: "Energy intelligence",
    title: "Regional Monitoring Systems",
    description:
      "Real-time dashboards, maps and reporting systems that turned IoT energy data into decisions for teams in Singapore and Taiwan.",
    role: "Full-stack engineering",
    stack: "React · Java · Data visualization",
  },
  {
    number: "04",
    category: "Secure onboarding",
    title: "Xallet Wallet",
    description:
      "A considered KYC experience for a cryptocurrency wallet, connecting secure mobile interfaces with identity-verification APIs.",
    role: "Frontend engineering",
    stack: "React Native · Node.js · GraphQL",
    href: "https://xallet.swiss/",
  },
];

const timeline = [
  {
    year: "2018",
    place: "Myanmar",
    title: "Learning through real systems.",
    copy: "The journey began with energy dashboards, attendance tools and reporting software — practical products where reliable data mattered.",
  },
  {
    year: "2021",
    place: "Singapore · Taiwan · Europe",
    title: "From interfaces to infrastructure.",
    copy: "Work expanded into decentralized finance, secure onboarding, reactive backends and cross-border product teams.",
  },
  {
    year: "2023",
    place: "Singapore",
    title: "Engineering met storytelling.",
    copy: "At Wunderfauks, campaigns and immersive web experiences sharpened a belief: strong software should also make people feel something.",
  },
  {
    year: "2025",
    place: "Japan",
    title: "Building with a wider lens.",
    copy: "Now based in Japan, the work spans enterprise logistics, student systems and Kettles — a studio created to turn useful ideas into clear digital products.",
  },
];

const capabilities = [
  ["Product engineering", "React, Next.js, Java, Node.js and systems that survive beyond launch."],
  ["Creative development", "Motion, interaction and editorial detail that give a product a memorable point of view."],
  ["Business systems", "Internal tools, dashboards and workflows that remove friction from everyday work."],
  ["Cross-cultural delivery", "English, Burmese and working Japanese, shaped by teams across Asia and Europe."],
];

const partners = [
  { name: "TrustMark", src: "/partners/trustmark.png" },
  { name: "89 Lounge", src: "/partners/89-lounge-cropped.png" },
  { name: "Japan Style", src: "/partners/japan-style.png" },
  { name: "High Table", src: "/partners/high-table.jpg" },
  { name: "Myo Myanmar", src: "/partners/myo-myanmar.png" },
];

export default function Page() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Aung Khaing Khant, home">
          AKK<span>.</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#story">Story</a>
          <a href="#work">Selected work</a>
          <a href="#kettles">Kettles</a>
        </nav>
        <a className="header-contact" href="mailto:khaingkhantjp@gmail.com">
          Let’s talk <ArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span>Full-stack engineer</span>
            <span>Founder of Kettles</span>
          </p>
          <h1>
            I build what
            <br />
            <em>businesses remember.</em>
          </h1>
          <p className="hero-intro">
            I’m Aung Khaing Khant — an engineer who moves between robust systems
            and expressive digital experiences. Born in Myanmar, shaped by
            cross-border teams, now building from Japan.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">
              Explore the work <ArrowDown aria-hidden="true" />
            </a>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/khaing-khant-b5ab67188"
              target="_blank"
              rel="noreferrer"
            >
              Verify on LinkedIn <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="hero-facts" aria-label="Profile facts">
            <div>
              <strong>2018—Now</strong>
              <span>Shipping real software</span>
            </div>
            <div>
              <strong>3 disciplines</strong>
              <span>Product · Creative · Systems</span>
            </div>
            <div>
              <strong>Osaka, Japan</strong>
              <span>Available worldwide</span>
            </div>
          </div>
        </div>

        <div className="hero-portrait">
          <div className="portrait-frame">
            <Image
              src="/aung-khaing-khant.jpg"
              alt="Portrait of Aung Khaing Khant"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 44vw"
              className="portrait-image"
            />
            <div className="portrait-wash" />
            <span className="portrait-index">PORTRAIT / 001</span>
            <span className="portrait-place">
              <MapPin aria-hidden="true" /> OSAKA · JP
            </span>
          </div>
          <div className="signature">
            <span>Engineering × Storytelling</span>
            <span className="signature-mark">温</span>
          </div>
        </div>
      </section>

      <section className="manifesto section-shell" id="story">
        <div className="section-number">01 / THE POINT OF VIEW</div>
        <div className="manifesto-grid">
          <h2>
            Code is the material.
            <br />
            <em>Clarity is the product.</em>
          </h2>
          <div className="manifesto-copy">
            <p>
              My career began inside operational software: live energy data,
              reporting tools, and systems people depended on. That taught me
              rigor.
            </p>
            <p>
              Creative campaigns and immersive websites taught me the other
              half: attention is earned through feeling. Today I bring both
              instincts to every build — stable underneath, distinctive on the
              surface, useful all the way through.
            </p>
          </div>
        </div>
      </section>

      <section className="journey section-shell" aria-labelledby="journey-title">
        <div className="section-heading">
          <div>
            <span className="section-number">02 / THE JOURNEY</span>
            <h2 id="journey-title">Built across borders.</h2>
          </div>
          <p>Four chapters. One consistent pursuit: make complex work feel clear.</p>
        </div>
        <div className="timeline">
          {timeline.map((item, index) => (
            <article className="timeline-item" key={item.year}>
              <div className="timeline-marker">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="timeline-meta">
                <strong>{item.year}</strong>
                <span>{item.place}</span>
              </div>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work section-shell" id="work" aria-labelledby="work-title">
        <div className="section-heading light">
          <div>
            <span className="section-number">03 / SELECTED EVIDENCE</span>
            <h2 id="work-title">Work with weight.</h2>
          </div>
          <p>
            A selection from product, infrastructure and experience work.
            Responsibilities shown are my direct contributions.
          </p>
        </div>
        <div className="project-list">
          {projects.map((project) => {
            const projectContent = (
              <>
                <div className="project-number">{project.number}</div>
                <div>
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.description}</p>
                <div className="project-detail">
                  <span>{project.role}</span>
                  <strong>{project.stack}</strong>
                </div>
                <div className="project-arrow">
                  {project.href ? <ArrowUpRight aria-hidden="true" /> : <Code2 aria-hidden="true" />}
                </div>
              </>
            );

            return project.href ? (
              <a
                className="project-row"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.number}
                aria-label={`${project.title}, open live project`}
              >
                {projectContent}
              </a>
            ) : (
              <article className="project-row" key={project.number}>
                {projectContent}
              </article>
            );
          })}
        </div>
      </section>

      <section className="capabilities section-shell" aria-labelledby="capabilities-title">
        <div className="section-heading">
          <div>
            <span className="section-number">04 / HOW I BUILD</span>
            <h2 id="capabilities-title">Depth, not decoration.</h2>
          </div>
          <p>
            I join the dots between the customer’s first impression and the
            system that keeps delivering after it.
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map(([title, copy], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Check aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="technology-line">
          <span>Core toolkit</span>
          <p>
            Java · Spring Boot · Quarkus · React · Next.js · Node.js · TypeScript
            · PostgreSQL · MySQL · Docker · GSAP
          </p>
        </div>
      </section>

      <section className="kettles section-shell" id="kettles" aria-labelledby="kettles-title">
        <div className="kettles-card">
          <div className="kettles-brand">
            <Image
              src="/brand/kettles-white.png"
              alt="Kettles"
              width={290}
              height={92}
              className="kettles-logo"
            />
            <span>Studio note / 2026</span>
          </div>
          <div className="kettles-statement">
            <p className="section-number">THE FOUNDER CHAPTER</p>
            <h2 id="kettles-title">
              Ideas are heated
              <br />
              <em>into impact.</em>
            </h2>
            <p>
              I founded Kettles to give founders and growing teams the kind of
              build partner I believe in: technically fluent, visually
              thoughtful and commercially practical.
            </p>
            <div className="kettles-offer">
              <span>Websites & digital products</span>
              <span>Internal tools & automation</span>
              <span>Content & online presence systems</span>
            </div>
            <a className="button button-orange" href="mailto:khaingkhantjp@gmail.com">
              Start a project <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="partner-strip">
          <span>Selected Kettles relationships</span>
          <div>
            {partners.map((partner) => (
              <div className="partner-logo" key={partner.name}>
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  sizes="120px"
                  className="partner-image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-kicker">A good project starts with a clear conversation.</div>
        <h2>
          Have something worth
          <br />
          <em>building properly?</em>
        </h2>
        <p>
          Tell me what you’re trying to make, change or simplify. I’ll reply with
          a practical next step.
        </p>
        <div className="contact-actions">
          <a className="button button-dark" href="mailto:khaingkhantjp@gmail.com">
            <Mail aria-hidden="true" /> khaingkhantjp@gmail.com
          </a>
          <a
            className="button button-outline"
            href="https://www.linkedin.com/in/khaing-khant-b5ab67188"
            target="_blank"
            rel="noreferrer"
          >
            <ArrowUpRight aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>AKK.</strong>
          <span>Aung Khaing Khant · Osaka, Japan</span>
        </div>
        <p>Full-stack engineering, creative technology and practical systems.</p>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
