"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Globe2,
  MapPin,
  Menu,
  Scissors,
  Sparkles,
  X,
} from "lucide-react";
import "./salon.css";

const services = [
  {
    id: "cut",
    name: "Cut & finish",
    detail: "Consultation, shampoo, cut and finish",
    duration: "60 min",
    price: "¥7,700",
  },
  {
    id: "color",
    name: "Cut + color",
    detail: "Personal color consultation, cut and gloss",
    duration: "120 min",
    price: "¥15,400",
  },
  {
    id: "spa",
    name: "Head spa ritual",
    detail: "Scalp care, massage and restorative treatment",
    duration: "45 min",
    price: "¥6,600",
  },
];

const times = ["10:00", "11:30", "14:00", "16:30"];

export default function SalonConceptPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [selectedTime, setSelectedTime] = useState(times[1]);
  const [notice, setNotice] = useState(false);

  const selected = useMemo(
    () => services.find((service) => service.id === selectedService) ?? services[0],
    [selectedService],
  );

  function scrollToBooking() {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  function showConceptNotice() {
    setNotice(true);
    window.setTimeout(() => setNotice(false), 4500);
  }

  return (
    <main className="salon-concept">
      <div className="concept-disclaimer">
        <span>Self-initiated concept by Kettles Studio</span>
        <span className="concept-disclaimer__dot" />
        <span>Fictional salon — not commissioned client work</span>
      </div>

      <header className="salon-header">
        <Link className="salon-brand" href="#top" aria-label="Nagi Hair Atelier home">
          <span className="salon-brand__mark">N</span>
          <span>
            <strong>NAGI</strong>
            <small>HAIR ATELIER · OSAKA</small>
          </span>
        </Link>

        <nav className={menuOpen ? "salon-nav salon-nav--open" : "salon-nav"} aria-label="Salon navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#welcome" onClick={() => setMenuOpen(false)}>First visit</a>
          <a href="#atelier" onClick={() => setMenuOpen(false)}>Atelier</a>
          <button type="button" onClick={scrollToBooking}>Choose a service</button>
        </nav>

        <button
          className="salon-menu"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <section id="top" className="salon-hero">
        <Image
          src="/concepts/nagi-salon-hero.png"
          alt="Stylist finishing a guest's haircut in a calm, light-filled salon"
          fill
          priority
          sizes="100vw"
          className="salon-hero__image"
        />
        <div className="salon-hero__wash" />
        <div className="salon-hero__content">
          <p className="salon-eyebrow">English-friendly hair care in Osaka</p>
          <h1>A quieter kind of<br />hair appointment.</h1>
          <p className="salon-hero__copy">
            Thoughtful cuts, natural color and restorative care—explained clearly,
            booked simply and shaped around you.
          </p>
          <div className="salon-hero__actions">
            <button type="button" onClick={scrollToBooking}>
              Choose a service <ArrowRight size={17} />
            </button>
            <a href="#welcome">What to expect</a>
          </div>
        </div>
        <div className="salon-hero__meta">
          <span><MapPin size={15} /> 4 min from Nakazakicho</span>
          <span><Clock3 size={15} /> Tue–Sun · 10:00–19:00</span>
        </div>
      </section>

      <section className="salon-promise" aria-label="Salon promises">
        <div><Globe2 size={20} /><span><strong>English support</strong>Before, during and after your visit</span></div>
        <div><CalendarDays size={20} /><span><strong>Clear availability</strong>Choose a service before contacting us</span></div>
        <div><Sparkles size={20} /><span><strong>Unhurried care</strong>One guest, one considered consultation</span></div>
      </section>

      <section id="services" className="salon-section salon-services">
        <div className="salon-section__intro">
          <p className="salon-eyebrow">01 · Services</p>
          <h2>Start with what<br />you need today.</h2>
          <p>Every appointment includes a consultation. Final pricing is confirmed before the service begins.</p>
        </div>
        <div className="salon-service-list">
          {services.map((service, index) => (
            <button
              type="button"
              key={service.id}
              className="salon-service"
              onClick={() => {
                setSelectedService(service.id);
                scrollToBooking();
              }}
            >
              <span className="salon-service__number">0{index + 1}</span>
              <span className="salon-service__main">
                <strong>{service.name}</strong>
                <small>{service.detail}</small>
              </span>
              <span className="salon-service__details">
                <small>{service.duration}</small>
                <strong>{service.price}</strong>
              </span>
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
      </section>

      <section id="welcome" className="salon-welcome">
        <div className="salon-welcome__visual">
          <span className="salon-welcome__line" />
          <div className="salon-welcome__monogram">凪</div>
          <p>Nagi means a moment of calm water.</p>
        </div>
        <div className="salon-welcome__content">
          <p className="salon-eyebrow">02 · Your first visit</p>
          <h2>No perfect Japanese required.</h2>
          <p>
            Share reference photos, tell us how much time you have each morning, and
            explain what has or has not worked before. We will confirm the plan and
            price in simple English before we begin.
          </p>
          <ol>
            <li><span>1</span><div><strong>Choose your starting service</strong><small>You can adjust it after consultation.</small></div></li>
            <li><span>2</span><div><strong>Send your preferred time</strong><small>We confirm availability personally.</small></div></li>
            <li><span>3</span><div><strong>Arrive and slow down</strong><small>Reference photos are always welcome.</small></div></li>
          </ol>
        </div>
      </section>

      <section id="atelier" className="salon-section salon-atelier">
        <div className="salon-section__intro">
          <p className="salon-eyebrow">03 · The atelier</p>
          <h2>Small by design.</h2>
        </div>
        <div className="salon-atelier__grid">
          <article>
            <Scissors size={23} />
            <h3>One chair, full attention</h3>
            <p>A private appointment rhythm with time to talk, observe and refine.</p>
          </article>
          <article>
            <Sparkles size={23} />
            <h3>Natural, wearable results</h3>
            <p>Shape and color that settle beautifully into ordinary mornings.</p>
          </article>
          <article>
            <Globe2 size={23} />
            <h3>Clear communication</h3>
            <p>English service explanations, visual references and written aftercare.</p>
          </article>
        </div>
      </section>

      <section id="booking" className="salon-booking">
        <div className="salon-booking__intro">
          <p className="salon-eyebrow">04 · Request a visit</p>
          <h2>Three simple choices.</h2>
          <p>This concept demonstrates a low-friction booking request. No real appointment or personal data is submitted.</p>
        </div>

        <div className="salon-booking__card">
          <div className="salon-booking__step">
            <div className="salon-booking__label"><span>1</span><strong>Choose a service</strong></div>
            <div className="salon-booking__options">
              {services.map((service) => (
                <button
                  type="button"
                  key={service.id}
                  className={selectedService === service.id ? "is-selected" : ""}
                  onClick={() => setSelectedService(service.id)}
                >
                  {selectedService === service.id && <Check size={14} />}
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          <div className="salon-booking__step">
            <div className="salon-booking__label"><span>2</span><strong>Preferred time</strong></div>
            <div className="salon-booking__options salon-booking__times">
              {times.map((time) => (
                <button
                  type="button"
                  key={time}
                  className={selectedTime === time ? "is-selected" : ""}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="salon-booking__summary">
            <div>
              <small>Your request</small>
              <strong>{selected.name}</strong>
              <span>Saturday · {selectedTime} · {selected.duration}</span>
            </div>
            <div>
              <small>From</small>
              <strong>{selected.price}</strong>
            </div>
            <button type="button" onClick={showConceptNotice}>
              Continue <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      <section className="salon-case-study">
        <div className="salon-case-study__tag">Kettles concept note</div>
        <div className="salon-case-study__content">
          <div>
            <p className="salon-eyebrow">Why this page exists</p>
            <h2>A beautiful salon still needs a clear next step.</h2>
          </div>
          <p>
            This self-initiated concept shows how Kettles could turn scattered service,
            language and contact information into one mobile-first path: understand the
            salon, choose a service, select a preferred time, then make contact.
          </p>
        </div>
        <div className="salon-case-study__outcomes">
          <span><strong>01</strong>Clear English positioning</span>
          <span><strong>02</strong>Mobile service menu</span>
          <span><strong>03</strong>Low-friction booking request</span>
          <span><strong>04</strong>Trust-building first-visit guidance</span>
        </div>
      </section>

      <footer className="salon-footer">
        <div>
          <span>Concept designed and built by</span>
          <strong>Kettles Studio</strong>
        </div>
        <Link href="/founder"><ArrowLeft size={16} /> View the Kettles founder profile</Link>
        <p>Fictional business and example content. Not a commissioned client project.</p>
      </footer>

      <button className="salon-mobile-cta" type="button" onClick={scrollToBooking}>
        Choose a service <ArrowRight size={16} />
      </button>

      {notice && (
        <div className="salon-toast" role="status">
          <Check size={17} />
          Concept preview only — no booking or personal data was sent.
        </div>
      )}
    </main>
  );
}
