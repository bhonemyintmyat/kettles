import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  ExternalLink,
  Languages,
  Link2,
  Mail,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import "./booking-bridge.css";

const included = [
  "Mobile-first bilingual booking entrance",
  "Japanese and English content structure",
  "Up to six services with starting prices",
  "First-visit guidance and useful FAQs",
  "Hours, access and contact information",
  "Links to LINE, Hot Pepper, an app or form",
  "One revision and launch support",
];

const excluded = [
  "A second calendar or reservation engine",
  "Customer database or automatic payments",
  "Logo redesign, photography or a full rebuild",
  "Certified professional translation",
  "Ongoing maintenance unless agreed separately",
];

const inputs = [
  "Official salon name and logo",
  "Four to six main services",
  "Starting prices and durations",
  "Current booking links",
  "Opening hours and access",
  "Approved salon photographs",
  "First-visit and cancellation notes",
  "Japanese text approval contact",
];

export default function BookingBridgePage() {
  return (
    <main className="bridge">
      <div className="bridge-note">
        <span>CLIENT RESPONSE MATERIAL</span>
        <span>ご検討用資料</span>
        <span>Unlisted · Kettles Studio</span>
      </div>

      <header className="bridge-header">
        <Link href="/" className="bridge-wordmark" aria-label="Kettles Studio home">
          KETTLES<span>.</span>
        </Link>
        <nav aria-label="Booking Bridge navigation">
          <a href="#how">How it works</a>
          <a href="#scope">Scope</a>
          <a href="#start">Start</a>
        </nav>
        <Link className="bridge-demo-link" href="/nagi">
          Open salon demo <ExternalLink size={14} />
        </Link>
      </header>

      <section className="bridge-hero">
        <div className="bridge-hero__copy">
          <p className="bridge-kicker">Booking Bridge · Bilingual salon entrance</p>
          <h1>
            Your booking system stays.
            <em>The path becomes clear.</em>
          </h1>
          <p className="bridge-hero__jp">
            予約システムはそのまま。海外のお客様に、もっと分かりやすく。
          </p>
          <p className="bridge-hero__intro">
            A focused Japanese–English page that explains the visit and guides each guest into the
            LINE, Hot Pepper, app or form your salon already manages.
          </p>
          <div className="bridge-actions">
            <Link href="/nagi" className="bridge-button bridge-button--dark">
              Experience the demo <ArrowRight size={16} />
            </Link>
            <a href="#scope" className="bridge-text-link">See the fixed scope</a>
          </div>
          <div className="bridge-hero__facts">
            <span><strong>¥45,000</strong>Fixed project scope</span>
            <span><strong>7–10 days</strong>After materials arrive</span>
            <span><strong>50 / 50</strong>Start and launch</span>
          </div>
        </div>

        <div className="bridge-hero__visual" aria-label="Booking Bridge mobile journey preview">
          <div className="bridge-phone bridge-phone--back">
            <div className="bridge-phone__bar"><span>NAGI</span><small>EN / JP</small></div>
            <p>First visit</p>
            <strong>Clear before you arrive.</strong>
            <div className="bridge-mini-list"><i /><i /><i /></div>
          </div>
          <div className="bridge-phone bridge-phone--front">
            <div className="bridge-phone__bar"><span>NAGI</span><small>EN / JP</small></div>
            <p>Choose how to book</p>
            <button>LINE <ArrowRight size={13} /></button>
            <button>Hot Pepper Beauty <ArrowRight size={13} /></button>
            <button>Salon app / form <ArrowRight size={13} /></button>
            <small className="bridge-phone__note">No second calendar. No duplicate management.</small>
          </div>
        </div>
      </section>

      <section className="bridge-principles" aria-label="Booking Bridge principles">
        <article><Smartphone /><strong>One mobile entrance</strong><span>One clear place to understand the visit.</span></article>
        <article><Languages /><strong>Japanese + English</strong><span>Simple language and visual reassurance.</span></article>
        <article><Link2 /><strong>Existing system handoff</strong><span>No operational replacement or duplicate calendar.</span></article>
      </section>

      <section className="bridge-journey" id="how">
        <div className="bridge-section-heading">
          <p className="bridge-kicker">THE THREE-SCREEN STORY</p>
          <h2>Understand. Feel ready. Continue.</h2>
          <p>Three decisions remove the hesitation between finding the salon and requesting a visit.</p>
        </div>
        <div className="bridge-screen-grid">
          <article>
            <span>01</span>
            <div className="bridge-screen-card bridge-screen-card--menu">
              <small>EN / JP</small><strong>Services and starting prices</strong>
              <i /><i /><i />
            </div>
            <h3>Understand the offer</h3>
            <p>Services, prices and language support become clear before the customer contacts the salon.</p>
          </article>
          <article>
            <span>02</span>
            <div className="bridge-screen-card bridge-screen-card--trust">
              <ShieldCheck size={27} /><strong>Your first visit</strong>
              <small>What to bring · what happens · what is confirmed</small>
            </div>
            <h3>Feel safe enough to act</h3>
            <p>First-visit guidance and FAQs answer the quiet questions that often stop a booking.</p>
          </article>
          <article>
            <span>03</span>
            <div className="bridge-screen-card bridge-screen-card--handoff">
              <small>CONTINUE WITH</small><strong>LINE</strong><strong>HOT PEPPER</strong><strong>SALON APP</strong>
            </div>
            <h3>Use the existing system</h3>
            <p>The final action opens the booking channel the salon already knows and manages.</p>
          </article>
        </div>
      </section>

      <section className="bridge-scope" id="scope">
        <div className="bridge-scope__intro">
          <p className="bridge-kicker">FIXED SCOPE · 明確な制作範囲</p>
          <h2>Small enough to say yes. Complete enough to use.</h2>
          <p>
            This is a focused booking entrance—not a full website replacement. The boundary keeps the
            price, timing and responsibility understandable for both sides.
          </p>
        </div>
        <div className="bridge-scope__lists">
          <article>
            <span className="bridge-list-label bridge-list-label--yes">Included</span>
            <ul>{included.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>
          </article>
          <article>
            <span className="bridge-list-label">Not included</span>
            <ul>{excluded.map((item) => <li key={item}><X size={14} />{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="bridge-process">
        <div className="bridge-section-heading">
          <p className="bridge-kicker">SIMPLE DELIVERY</p>
          <h2>Four steps from yes to launch.</h2>
        </div>
        <ol>
          <li><span>01</span><strong>Confirm</strong><p>We confirm the current booking route, scope and launch goal.</p></li>
          <li><span>02</span><strong>Collect</strong><p>The salon provides approved information, links, logo and photographs.</p></li>
          <li><span>03</span><strong>Build</strong><p>Kettles prepares the bilingual mobile page and one review version.</p></li>
          <li><span>04</span><strong>Connect</strong><p>Approved buttons open the salon’s existing booking channels.</p></li>
        </ol>
      </section>

      <section className="bridge-inputs">
        <div>
          <p className="bridge-kicker">WHAT WE NEED FROM THE SALON</p>
          <h2>One checklist. No long meetings.</h2>
          <p>Production begins after the information below is complete and the first payment is received.</p>
        </div>
        <ul>{inputs.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
      </section>

      <section className="bridge-commercial" id="start">
        <div className="bridge-commercial__price">
          <p className="bridge-kicker">BOOKING BRIDGE</p>
          <span>Project fee</span>
          <strong>¥45,000</strong>
          <small>Any applicable tax is confirmed before work begins.</small>
        </div>
        <div className="bridge-commercial__copy">
          <h2>A practical first improvement—not a risky rebuild.</h2>
          <ul>
            <li><Clock3 size={15} />7–10 working days after all materials arrive</li>
            <li><ShieldCheck size={15} />50% to begin · 50% before public launch</li>
            <li><Check size={15} />One revision included</li>
          </ul>
          <a
            className="bridge-button bridge-button--orange"
            href="mailto:norman@kettles.studio?subject=Booking%20Bridge%20discussion"
          >
            <Mail size={16} /> Discuss your booking path
          </a>
          <p className="bridge-commercial__jp">現在の予約方法を確認し、最初に改善できる導線をご提案します。</p>
        </div>
      </section>

      <footer className="bridge-footer">
        <div><strong>KETTLES.</strong><span>Useful systems, thoughtfully presented.</span></div>
        <div>
          <Link href="/nagi">Salon demonstration</Link>
          <Link href="/founder">About Norman</Link>
          <a href="mailto:norman@kettles.studio">norman@kettles.studio</a>
        </div>
      </footer>
    </main>
  );
}
