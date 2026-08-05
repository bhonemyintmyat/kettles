"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Globe2,
  MapPin,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import "./nagi.css";

type Language = "en" | "ja";

const services = [
  {
    id: "signature",
    en: "Signature cut",
    ja: "シグネチャーカット",
    detailEn: "Consultation, shampoo, precision cut and finish",
    detailJa: "カウンセリング・シャンプー・カット・仕上げ",
    duration: "60 min",
    price: "¥7,700",
  },
  {
    id: "color",
    en: "Cut + soft color",
    ja: "カット＋ソフトカラー",
    detailEn: "Personal color consultation, gloss and treatment",
    detailJa: "パーソナルカラー提案・艶カラー・トリートメント",
    duration: "120 min",
    price: "¥15,400",
  },
  {
    id: "texture",
    en: "Cut + texture care",
    ja: "カット＋髪質ケア",
    detailEn: "Shape, moisture treatment and home-care guidance",
    detailJa: "フォルム調整・保湿ケア・ホームケアアドバイス",
    duration: "90 min",
    price: "¥12,100",
  },
  {
    id: "spa",
    en: "Quiet head spa",
    ja: "クワイエットヘッドスパ",
    detailEn: "Scalp consultation, cleansing and slow massage",
    detailJa: "頭皮カウンセリング・クレンジング・マッサージ",
    duration: "45 min",
    price: "¥6,600",
  },
];

const bookingChannels = [
  {
    id: "line",
    en: "LINE",
    ja: "LINE",
    detailEn: "Continue in the salon's official chat",
    detailJa: "サロン公式LINEで相談・予約",
  },
  {
    id: "hotpepper",
    en: "Hot Pepper Beauty",
    ja: "ホットペッパービューティー",
    detailEn: "Open the salon's existing reservation page",
    detailJa: "現在の予約ページへ移動",
  },
  {
    id: "salon-system",
    en: "Salon app / booking form",
    ja: "サロンアプリ・予約フォーム",
    detailEn: "Use the system the salon already manages",
    detailJa: "現在お使いのシステムで予約",
  },
];

const copy = {
  en: {
    nav: ["Services", "First visit", "Our approach", "Visit"],
    book: "Book a visit",
    eyebrow: "English-friendly hair atelier · Osaka",
    headline: "Hair that feels\nlike you.",
    intro:
      "Thoughtful cuts, soft color and quiet care—explained clearly before we begin.",
    explore: "Explore services",
    firstVisit: "Your first visit",
    reassurance: "No perfect Japanese required",
    servicesEyebrow: "01 · Menu",
    servicesTitle: "Choose a place\nto begin.",
    servicesIntro:
      "Every visit starts with a consultation. We confirm the plan and price before touching your hair.",
    from: "From",
    resultEyebrow: "Made to live with",
    resultTitle: "Beautiful when you leave.\nStill yours tomorrow.",
    resultBody:
      "We design around your natural texture, daily routine and the way your hair changes between visits—not just the final mirror moment.",
    resultQuote:
      "I finally understood what my hair needed, and styling it the next morning felt easy.",
    firstEyebrow: "02 · First visit",
    firstTitle: "Clear from hello\nto aftercare.",
    firstBody:
      "Bring reference photos or simply tell us what feels difficult. We use visual references, simple English and written aftercare so nothing important gets lost.",
    steps: [
      ["Choose a starting service", "It can change after your consultation."],
      ["Share your hair story", "Photos and past experiences are welcome."],
      ["Agree before we begin", "Service, time and price are confirmed first."],
    ],
    ritualEyebrow: "03 · Our approach",
    ritualTitle: "Less rush.\nMore attention.",
    ritualBody:
      "NAGI means calm water. Our appointment rhythm leaves room to listen, observe and make considered choices together.",
    principles: ["One guest at a time", "Quiet product choices", "Written home care"],
    bookingEyebrow: "04 · Request a visit",
    bookingTitle: "Begin with three\nsimple choices.",
    bookingBody:
      "Select a service, preferred date and time. We confirm the final appointment personally.",
    chooseService: "Choose a service",
    chooseDate: "Preferred date",
    chooseTime: "Preferred time",
    request: "Your request",
    continue: "Continue",
    demoTitle: "Your request is ready.",
    demoBody:
      "In a live salon site, the guest would now add their contact details and hair notes. This demonstration does not collect personal information.",
    close: "Return to the site",
    visitEyebrow: "Visit NAGI",
    visitTitle: "A quiet room,\nfour minutes away.",
    hours: "Tue–Sun · 10:00–19:00",
    address: "Nakazaki, Kita-ku, Osaka",
    directions: "4 min from Nakazakicho Station",
    faq: "Before you book",
    faqItems: [
      [
        "Can I book in English?",
        "Yes. Booking, consultation and aftercare can be supported in simple English and with visual references.",
      ],
      [
        "Will the price change?",
        "The prices shown are starting prices. We confirm any change with you before the service begins.",
      ],
      [
        "Can I bring reference photos?",
        "Please do. Photos help us understand both what you like and what you would prefer to avoid.",
      ],
    ],
  },
  ja: {
    nav: ["メニュー", "初めての方へ", "私たちの考え方", "アクセス"],
    book: "予約リクエスト",
    eyebrow: "大阪・英語対応ヘアアトリエ",
    headline: "自分らしく、\n美しい髪へ。",
    intro:
      "丁寧なカット、柔らかなカラー、静かなケア。施術前に分かりやすくご説明します。",
    explore: "メニューを見る",
    firstVisit: "初めての方へ",
    reassurance: "完璧な日本語は必要ありません",
    servicesEyebrow: "01 · メニュー",
    servicesTitle: "今日の悩みから、\n始めましょう。",
    servicesIntro:
      "すべての施術はカウンセリングから。内容と料金にご納得いただいてから施術を始めます。",
    from: "料金",
    resultEyebrow: "日常に馴染むデザイン",
    resultTitle: "サロン帰りだけでなく、\n明日も自分らしく。",
    resultBody:
      "髪質、毎朝の時間、次回来店までの変化を考えながら、無理なく続くスタイルをご提案します。",
    resultQuote:
      "自分の髪に必要なことが初めて分かり、翌朝のスタイリングも簡単でした。",
    firstEyebrow: "02 · 初めての方へ",
    firstTitle: "ご相談からアフターケアまで、\n分かりやすく。",
    firstBody:
      "参考写真をお持ちいただくか、お困りのことをそのままお話しください。写真・簡単な英語・書面で丁寧に確認します。",
    steps: [
      ["メニューを選ぶ", "カウンセリング後に変更できます。"],
      ["髪のお悩みを共有", "写真や過去の施術経験も歓迎です。"],
      ["施術前に確認", "内容・時間・料金を先に確認します。"],
    ],
    ritualEyebrow: "03 · 私たちの考え方",
    ritualTitle: "急がず、\n丁寧に。",
    ritualBody:
      "NAGIは「凪」のような穏やかな時間を大切にするアトリエです。お話を聞き、一緒に考える余白をつくります。",
    principles: ["一人ひとりに集中", "必要なものだけを選ぶ", "書面でホームケア"],
    bookingEyebrow: "04 · 予約リクエスト",
    bookingTitle: "3つ選ぶだけで、\n予約相談を開始。",
    bookingBody:
      "メニュー、希望日、希望時間を選択してください。最終予約はスタッフが確認します。",
    chooseService: "メニューを選択",
    chooseDate: "希望日",
    chooseTime: "希望時間",
    request: "選択内容",
    continue: "次へ",
    demoTitle: "予約内容を準備しました。",
    demoBody:
      "実際のサロンサイトでは、この後に連絡先と髪のお悩みを入力します。このデモでは個人情報を収集しません。",
    close: "サイトに戻る",
    visitEyebrow: "アクセス",
    visitTitle: "駅から4分の、\n静かな場所。",
    hours: "火–日 · 10:00–19:00",
    address: "大阪市北区中崎",
    directions: "中崎町駅から徒歩4分",
    faq: "ご予約の前に",
    faqItems: [
      [
        "英語で予約できますか？",
        "はい。簡単な英語と写真を使い、予約・カウンセリング・アフターケアをサポートします。",
      ],
      [
        "料金は変わりますか？",
        "表示価格は目安です。変更がある場合は、施術前に必ずご確認いただきます。",
      ],
      [
        "参考写真を持って行けますか？",
        "ぜひお持ちください。好きなスタイルだけでなく、避けたいスタイルの写真も役立ちます。",
      ],
    ],
  },
} as const;

export default function NagiPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [selectedChannel, setSelectedChannel] = useState(bookingChannels[0].id);
  const [bookingOpen, setBookingOpen] = useState(false);
  const text = copy[language];

  const selected = useMemo(
    () => services.find((service) => service.id === selectedService) ?? services[0],
    [selectedService],
  );

  const selectedBookingChannel = useMemo(
    () => bookingChannels.find((channel) => channel.id === selectedChannel) ?? bookingChannels[0],
    [selectedChannel],
  );

  function jumpTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <main className="nagi" lang={language}>
      <header className="nagi-header">
        <button className="nagi-brand" type="button" onClick={() => jumpTo("top")}>
          <span className="nagi-brand__mark">凪</span>
          <span>
            <strong>NAGI</strong>
            <small>HAIR ATELIER · OSAKA</small>
          </span>
        </button>

        <nav className={menuOpen ? "nagi-nav is-open" : "nagi-nav"} aria-label="Main navigation">
          {[
            ["services", text.nav[0]],
            ["first-visit", text.nav[1]],
            ["approach", text.nav[2]],
            ["visit", text.nav[3]],
          ].map(([id, label]) => (
            <button key={id} type="button" onClick={() => jumpTo(id)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="nagi-header__actions">
          <button
            className="nagi-language"
            type="button"
            onClick={() => setLanguage((current) => (current === "en" ? "ja" : "en"))}
            aria-label={language === "en" ? "日本語に切り替える" : "Switch to English"}
          >
            <Globe2 size={14} />
            {language === "en" ? "JP" : "EN"}
          </button>
          <button className="nagi-book-button" type="button" onClick={() => jumpTo("booking")}>
            {text.book}
          </button>
          <button
            className="nagi-menu"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <section id="top" className="nagi-hero">
        <Image
          src="/concepts/nagi-salon-hero.png"
          alt="A calm, light-filled NAGI salon appointment"
          fill
          priority
          sizes="100vw"
          className="nagi-hero__image"
        />
        <div className="nagi-hero__veil" />
        <div className="nagi-hero__content">
          <p className="nagi-kicker">{text.eyebrow}</p>
          <h1>{text.headline.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p>{text.intro}</p>
          <div className="nagi-hero__actions">
            <button type="button" onClick={() => jumpTo("services")}>
              {text.explore} <ArrowRight size={16} />
            </button>
            <button type="button" onClick={() => jumpTo("first-visit")}>
              {text.firstVisit}
            </button>
          </div>
        </div>
        <div className="nagi-hero__aside">
          <span>{text.reassurance}</span>
          <span><MapPin size={14} /> {text.directions}</span>
        </div>
      </section>

      <section className="nagi-proof" aria-label="Salon highlights">
        <span><Globe2 size={18} /><strong>EN / JP</strong>{language === "en" ? "Simple language support" : "分かりやすい言語サポート"}</span>
        <span><Clock3 size={18} /><strong>60–120</strong>{language === "en" ? "Minutes, never rushed" : "ゆとりある施術時間"}</span>
        <span><Sparkles size={18} /><strong>1 : 1</strong>{language === "en" ? "Personal consultation" : "一人ひとりに合わせた相談"}</span>
      </section>

      <section id="services" className="nagi-section nagi-services">
        <div className="nagi-section__heading">
          <p className="nagi-kicker">{text.servicesEyebrow}</p>
          <h2>{text.servicesTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          <p>{text.servicesIntro}</p>
        </div>
        <div className="nagi-service-list">
          {services.map((service, index) => (
            <button
              key={service.id}
              type="button"
              className="nagi-service"
              onClick={() => {
                setSelectedService(service.id);
                jumpTo("booking");
              }}
            >
              <span>0{index + 1}</span>
              <span>
                <strong>{language === "en" ? service.en : service.ja}</strong>
                <small>{language === "en" ? service.detailEn : service.detailJa}</small>
              </span>
              <span>
                <small>{service.duration}</small>
                <strong>{service.price}</strong>
              </span>
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
      </section>

      <section className="nagi-result">
        <div className="nagi-result__image">
          <Image
            src="/concepts/nagi-editorial.png"
            alt="A soft layered haircut finished at NAGI"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
          />
          <span>{language === "en" ? "Soft layer / natural finish" : "ソフトレイヤー・ナチュラル仕上げ"}</span>
        </div>
        <div className="nagi-result__content">
          <p className="nagi-kicker">{text.resultEyebrow}</p>
          <h2>{text.resultTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          <p>{text.resultBody}</p>
          <blockquote>“{text.resultQuote}”</blockquote>
          <div className="nagi-result__meta">
            <span><strong>01</strong>{language === "en" ? "Natural movement" : "自然な動き"}</span>
            <span><strong>02</strong>{language === "en" ? "Easy home styling" : "自宅で簡単"}</span>
          </div>
        </div>
      </section>

      <section id="first-visit" className="nagi-first">
        <div>
          <p className="nagi-kicker">{text.firstEyebrow}</p>
          <h2>{text.firstTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          <p>{text.firstBody}</p>
        </div>
        <ol>
          {text.steps.map(([title, detail], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <div><strong>{title}</strong><small>{detail}</small></div>
            </li>
          ))}
        </ol>
      </section>

      <section id="approach" className="nagi-ritual">
        <div className="nagi-ritual__copy">
          <p className="nagi-kicker">{text.ritualEyebrow}</p>
          <h2>{text.ritualTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          <p>{text.ritualBody}</p>
          <ul>
            {text.principles.map((principle) => <li key={principle}><Check size={15} />{principle}</li>)}
          </ul>
        </div>
        <div className="nagi-ritual__image">
          <Image
            src="/concepts/nagi-ritual.png"
            alt="Natural tools prepared for a quiet NAGI hair ritual"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        </div>
      </section>

      <section id="booking" className="nagi-booking">
        <div className="nagi-booking__intro">
          <p className="nagi-kicker">{text.bookingEyebrow}</p>
          <h2>{text.bookingTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          <p>{text.bookingBody}</p>
        </div>

        <div className="nagi-booking__card">
          <div className="nagi-booking__step">
            <div className="nagi-booking__label"><span>1</span><strong>{text.chooseService}</strong></div>
            <div className="nagi-booking__services">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className={selectedService === service.id ? "is-selected" : ""}
                  onClick={() => setSelectedService(service.id)}
                >
                  <span>{language === "en" ? service.en : service.ja}</span>
                  <small>{service.duration} · {service.price}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="nagi-booking__step">
            <div className="nagi-booking__label">
              <span>2</span>
              <strong>{language === "en" ? "Choose how to book" : "予約方法を選ぶ"}</strong>
            </div>
            <div className="nagi-booking__channels">
              {bookingChannels.map((channel) => (
                <button
                  key={channel.id}
                  type="button"
                  className={selectedChannel === channel.id ? "is-selected" : ""}
                  onClick={() => setSelectedChannel(channel.id)}
                >
                  <span>{language === "en" ? channel.en : channel.ja}</span>
                  <small>{language === "en" ? channel.detailEn : channel.detailJa}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="nagi-booking__step">
            <div className="nagi-booking__label">
              <span>3</span>
              <strong>{language === "en" ? "Continue in the salon's system" : "現在の予約システムへ"}</strong>
            </div>
            <div className="nagi-booking__handoff">
              <p>
                {language === "en"
                  ? "NAGI keeps one source of truth. This page explains the visit, then hands the guest to the booking tool the salon already uses."
                  : "予約管理はひとつのまま。このページでサービス内容を分かりやすく案内し、現在お使いの予約ツールへお客様をご案内します。"}
              </p>
              <ul>
                <li><Check size={14} />{language === "en" ? "No second calendar" : "予約カレンダーを増やさない"}</li>
                <li><Check size={14} />{language === "en" ? "No duplicate management" : "二重管理なし"}</li>
                <li><Check size={14} />{language === "en" ? "One clear next action" : "次の行動が明確"}</li>
              </ul>
            </div>
          </div>

          <div className="nagi-booking__summary">
            <div>
              <small>{text.request}</small>
              <strong>{language === "en" ? selected.en : selected.ja}</strong>
              <span>{language === "en" ? selectedBookingChannel.en : selectedBookingChannel.ja}</span>
            </div>
            <button type="button" onClick={() => setBookingOpen(true)}>
              {language === "en" ? "Preview handoff" : "予約画面へ進む"} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="nagi-faq">
        <div>
          <p className="nagi-kicker">{text.faq}</p>
          <h2>{language === "en" ? "The useful details." : "ご予約前のご案内。"}</h2>
        </div>
        <div>
          {text.faqItems.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<ChevronDown size={18} /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="visit" className="nagi-visit">
        <div className="nagi-visit__mark">凪</div>
        <div>
          <p className="nagi-kicker">{text.visitEyebrow}</p>
          <h2>{text.visitTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          <address>
            <span><MapPin size={16} />{text.address}</span>
            <span><Clock3 size={16} />{text.hours}</span>
            <span><CalendarDays size={16} />{text.directions}</span>
          </address>
          <button type="button" onClick={() => jumpTo("booking")}>{text.book}<ArrowRight size={16} /></button>
        </div>
      </section>

      <footer className="nagi-footer">
        <div className="nagi-brand nagi-brand--footer">
          <span className="nagi-brand__mark">凪</span>
          <span><strong>NAGI</strong><small>HAIR ATELIER · OSAKA</small></span>
        </div>
        <p>© 2026 NAGI Hair Atelier</p>
        <p className="nagi-footer__demo">
          Demonstration salon by <Link href="/founder">Kettles Studio</Link>. NAGI is fictional.
        </p>
      </footer>

      {bookingOpen && (
        <div className="nagi-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <button className="nagi-modal__backdrop" type="button" onClick={() => setBookingOpen(false)} aria-label="Close" />
          <div className="nagi-modal__card">
            <span className="nagi-modal__icon"><Check size={22} /></span>
            <p className="nagi-kicker">{text.request}</p>
            <h2 id="booking-title">{text.demoTitle}</h2>
            <p>
              {language === "en"
                ? `On a live salon site, this button opens ${selectedBookingChannel.en}. This demonstration never collects personal information or creates a reservation.`
                : `実際のサロンサイトでは、このボタンから${selectedBookingChannel.ja}へ移動します。このデモでは個人情報の収集や予約の作成は行いません。`}
            </p>
            <dl>
              <div><dt>{text.chooseService}</dt><dd>{language === "en" ? selected.en : selected.ja}</dd></div>
              <div><dt>{language === "en" ? "Booking method" : "予約方法"}</dt><dd>{language === "en" ? selectedBookingChannel.en : selectedBookingChannel.ja}</dd></div>
            </dl>
            <button type="button" onClick={() => setBookingOpen(false)}>{text.close}</button>
          </div>
        </div>
      )}
    </main>
  );
}
