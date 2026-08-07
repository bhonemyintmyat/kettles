"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  Clock3,
  Globe2,
  MapPin,
  MessageCircle,
  Scissors,
  Sparkles,
  X,
} from "lucide-react";
import "./nagi.css";

type Language = "en" | "ja";

const services = [
  {
    id: "signature",
    category: "cut",
    en: "Signature cut",
    ja: "シグネチャーカット",
    detailEn: "Consultation, shampoo, precision cut and finish",
    detailJa: "カウンセリング・シャンプー・カット・仕上げ",
    duration: "60 min",
    price: "¥7,700",
    tone: "sand",
  },
  {
    id: "color",
    category: "color",
    en: "Cut + soft color",
    ja: "カット＋ソフトカラー",
    detailEn: "Personal color consultation, gloss and treatment",
    detailJa: "パーソナルカラー提案・艶カラー・トリートメント",
    duration: "120 min",
    price: "¥15,400",
    tone: "rose",
  },
  {
    id: "texture",
    category: "care",
    en: "Cut + texture care",
    ja: "カット＋髪質ケア",
    detailEn: "Shape, moisture treatment and home-care guidance",
    detailJa: "フォルム調整・保湿ケア・ホームケアアドバイス",
    duration: "90 min",
    price: "¥12,100",
    tone: "sage",
  },
  {
    id: "spa",
    category: "care",
    en: "Quiet head spa",
    ja: "クワイエットヘッドスパ",
    detailEn: "Scalp consultation, cleansing and slow massage",
    detailJa: "頭皮カウンセリング・クレンジング・マッサージ",
    duration: "45 min",
    price: "¥6,600",
    tone: "blue",
  },
] as const;

const dates = [
  { day: "Tue", ja: "火", date: "11", month: "Aug" },
  { day: "Wed", ja: "水", date: "12", month: "Aug" },
  { day: "Thu", ja: "木", date: "13", month: "Aug" },
  { day: "Fri", ja: "金", date: "14", month: "Aug" },
];

const times = ["10:00", "11:30", "14:00", "15:30", "17:00"];

const channels = [
  {
    id: "line",
    en: "Continue with LINE",
    ja: "LINEで続ける",
    detailEn: "Chat with the salon in its official account",
    detailJa: "サロン公式アカウントで相談",
  },
  {
    id: "hotpepper",
    en: "Open Hot Pepper",
    ja: "ホットペッパーを開く",
    detailEn: "Finish in the salon’s current booking system",
    detailJa: "現在の予約システムで完了",
  },
  {
    id: "request",
    en: "Send a booking request",
    ja: "予約リクエストを送る",
    detailEn: "The salon confirms the final appointment",
    detailJa: "サロンから最終日時をご連絡",
  },
] as const;

type ServiceId = (typeof services)[number]["id"];
type ChannelId = (typeof channels)[number]["id"];

const copy = {
  en: {
    demo: "LIVE PRODUCT DEMO",
    demoNote: "Existing salon website + one Booking Bridge",
    nav: ["Menu", "First visit", "Access"],
    book: "Book in English",
    eyebrow: "English-friendly hair atelier · Osaka",
    headline: "Calm hair care, clearly booked.",
    intro: "Thoughtful cuts, soft color and quiet care—with a simple path from choosing a service to the salon’s existing booking system.",
    viewMenu: "View menu",
    openGuide: "Try the booking guide",
    highlights: ["Simple English support", "Price confirmed first", "4 min from Nakazakicho"],
    menuKicker: "SERVICE CATALOG",
    menuTitle: "Choose what feels right.",
    menuCopy: "Starting prices are shown clearly. Your stylist confirms the final service, time and price before beginning.",
    firstTitle: "A first visit without the uncertainty.",
    firstCopy: "Bring a reference photo or explain what feels difficult. We use simple language, visual references and written aftercare.",
    firstSteps: ["Choose a starting service", "Share your hair story", "Confirm everything first"],
    visitTitle: "A quiet room in Nakazaki.",
    widgetEyebrow: "NAGI BOOKING BRIDGE",
    widgetTitle: ["Choose a service", "Pick a preferred time", "Choose how to continue", "Your request is ready"],
    steps: ["Menu", "Time", "Contact", "Review"],
    next: "Continue",
    back: "Back",
    chooseDate: "Preferred date",
    chooseTime: "Preferred time",
    noLiveCalendar: "Demo times are illustrative. The salon confirms availability in its current system.",
    handoff: "No new calendar. Choose the route the salon already manages.",
    summary: ["Service", "Preferred time", "Booking route"],
    launch: "Preview handoff",
    completeTitle: "Ready for the salon’s system.",
    completeCopy: "A live widget now opens the selected LINE, Hot Pepper or request form with this context. This demo does not create a reservation.",
    restart: "Start again",
    floatingHint: "Try the new booking flow",
  },
  ja: {
    demo: "製品デモ",
    demoNote: "既存のサロンサイト＋Booking Bridge",
    nav: ["メニュー", "初めての方へ", "アクセス"],
    book: "英語で予約",
    eyebrow: "大阪・英語対応ヘアアトリエ",
    headline: "穏やかなヘアケアを、迷わず予約。",
    intro: "丁寧なカット、柔らかなカラー、静かなケア。メニュー選びから現在の予約システムまで、分かりやすくご案内します。",
    viewMenu: "メニューを見る",
    openGuide: "予約ガイドを試す",
    highlights: ["簡単な英語対応", "施術前に料金確認", "中崎町駅から4分"],
    menuKicker: "サービスカタログ",
    menuTitle: "今の気分に合うメニューを。",
    menuCopy: "開始価格を分かりやすく表示。施術前に内容・時間・最終料金をご確認いただきます。",
    firstTitle: "初めてでも、不安のない時間を。",
    firstCopy: "参考写真をお持ちいただくか、お困りのことをそのままお話しください。簡単な言葉と写真、書面でサポートします。",
    firstSteps: ["メニューを選ぶ", "髪のお悩みを共有", "施術前にすべて確認"],
    visitTitle: "中崎町の静かな空間。",
    widgetEyebrow: "NAGI BOOKING BRIDGE",
    widgetTitle: ["メニューを選ぶ", "希望日時を選ぶ", "予約方法を選ぶ", "リクエスト内容"],
    steps: ["メニュー", "日時", "連絡", "確認"],
    next: "次へ",
    back: "戻る",
    chooseDate: "希望日",
    chooseTime: "希望時間",
    noLiveCalendar: "表示時間はデモ用です。空き状況は現在の予約システムでサロンが確認します。",
    handoff: "新しいカレンダーは不要。サロンが現在使っている方法へつなぎます。",
    summary: ["メニュー", "希望日時", "予約方法"],
    launch: "連携画面を見る",
    completeTitle: "現在の予約システムへ進みます。",
    completeCopy: "実際のウィジェットでは、選択内容とともにLINE、ホットペッパー、または予約フォームを開きます。このデモでは予約は作成されません。",
    restart: "最初から見る",
    floatingHint: "新しい予約フローを試す",
  },
} as const;

export default function NagiPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceId>(services[0].id);
  const [selectedDate, setSelectedDate] = useState("11");
  const [selectedTime, setSelectedTime] = useState("11:30");
  const [selectedChannel, setSelectedChannel] = useState<ChannelId>(channels[0].id);
  const [complete, setComplete] = useState(false);
  const text = copy[language];

  const service = useMemo(
    () => services.find((item) => item.id === selectedService) ?? services[0],
    [selectedService],
  );
  const date = dates.find((item) => item.date === selectedDate) ?? dates[0];
  const channel = channels.find((item) => item.id === selectedChannel) ?? channels[0];

  useEffect(() => {
    if (!bookingOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBookingOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [bookingOpen]);

  function openBooking(serviceId?: ServiceId) {
    if (serviceId) setSelectedService(serviceId);
    setComplete(false);
    setStep(serviceId ? 1 : 0);
    setBookingOpen(true);
  }

  return (
    <main className="nagi" lang={language}>
      <div className="nagi-demo-bar">
        <span>{text.demo}</span>
        <p>{text.demoNote}</p>
        <Link href="/booking-bridge">How the product works <ArrowRight size={13} /></Link>
      </div>

      <header className="nagi-header">
        <a className="nagi-brand" href="#top" aria-label="NAGI home">
          <span className="nagi-brand__mark">凪</span>
          <span><strong>NAGI</strong><small>HAIR ATELIER · OSAKA</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#menu">{text.nav[0]}</a>
          <a href="#first-visit">{text.nav[1]}</a>
          <a href="#visit">{text.nav[2]}</a>
        </nav>
        <div className="nagi-header__actions">
          <button
            className="nagi-language"
            type="button"
            onClick={() => setLanguage(language === "en" ? "ja" : "en")}
            aria-label={language === "en" ? "日本語に切り替える" : "Switch to English"}
          >
            <Globe2 size={14} /> {language === "en" ? "JP" : "EN"}
          </button>
          <button className="nagi-header-book" type="button" onClick={() => openBooking()}>
            {text.book} <ArrowRight size={14} />
          </button>
        </div>
      </header>

      <section id="top" className="nagi-hero">
        <div className="nagi-hero__copy">
          <p className="nagi-kicker">{text.eyebrow}</p>
          <h1>{text.headline}</h1>
          <p className="nagi-hero__intro">{text.intro}</p>
          <div className="nagi-hero__actions">
            <button type="button" onClick={() => openBooking()}>{text.openGuide}<ArrowRight size={16} /></button>
            <a href="#menu">{text.viewMenu}</a>
          </div>
          <div className="nagi-hero__highlights">
            {text.highlights.map((item) => <span key={item}><Check size={13} />{item}</span>)}
          </div>
        </div>
        <div className="nagi-hero__visual">
          <Image
            src="/concepts/nagi-salon-hero.png"
            alt="A calm NAGI salon appointment"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 52vw"
          />
          <div className="nagi-hero__availability">
            <span><i /> {language === "en" ? "Next opening" : "次の空き"}</span>
            <strong>{language === "en" ? "Tue · 11:30" : "火曜日・11:30"}</strong>
            <button type="button" onClick={() => openBooking()}>{text.book}<ArrowRight size={13} /></button>
          </div>
        </div>
      </section>

      <section id="menu" className="nagi-menu-section">
        <div className="nagi-section-heading">
          <div><p className="nagi-kicker">{text.menuKicker}</p><h2>{text.menuTitle}</h2></div>
          <p>{text.menuCopy}</p>
        </div>
        <div className="nagi-service-grid">
          {services.map((item, index) => (
            <button className={`nagi-service-card is-${item.tone}`} key={item.id} type="button" onClick={() => openBooking(item.id)}>
              <span className="nagi-service-card__number">0{index + 1}</span>
              <span className="nagi-service-card__icon">{item.category === "care" ? <Sparkles size={19} /> : <Scissors size={19} />}</span>
              <strong>{language === "en" ? item.en : item.ja}</strong>
              <small>{language === "en" ? item.detailEn : item.detailJa}</small>
              <span className="nagi-service-card__meta"><b>{item.price}</b><em>{item.duration}</em></span>
              <span className="nagi-service-card__choose">{language === "en" ? "Choose" : "選択"}<ArrowRight size={14} /></span>
            </button>
          ))}
        </div>
      </section>

      <section id="first-visit" className="nagi-first-visit">
        <div className="nagi-first-visit__image">
          <Image src="/concepts/nagi-editorial.png" alt="A soft natural haircut at NAGI" fill sizes="(max-width: 800px) 100vw, 42vw" />
        </div>
        <div className="nagi-first-visit__content">
          <p className="nagi-kicker">FIRST VISIT</p>
          <h2>{text.firstTitle}</h2>
          <p>{text.firstCopy}</p>
          <ol>{text.firstSteps.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong><Check size={15} /></li>)}</ol>
        </div>
      </section>

      <section id="visit" className="nagi-visit">
        <div><p className="nagi-kicker">VISIT NAGI</p><h2>{text.visitTitle}</h2></div>
        <div className="nagi-visit__details">
          <span><MapPin size={17} /><b>Nakazaki, Kita-ku, Osaka</b><small>4 min from Nakazakicho Station</small></span>
          <span><Clock3 size={17} /><b>Tue–Sun · 10:00–19:00</b><small>Monday closed</small></span>
          <button type="button" onClick={() => openBooking()}>{text.book}<ArrowRight size={15} /></button>
        </div>
      </section>

      <footer className="nagi-footer">
        <div className="nagi-brand nagi-brand--footer"><span className="nagi-brand__mark">凪</span><span><strong>NAGI</strong><small>HAIR ATELIER · OSAKA</small></span></div>
        <p>Concept salon by <Link href="/founder">Kettles Studio</Link> · NAGI is fictional.</p>
      </footer>

      {!bookingOpen && (
        <div className="nagi-floating-wrap">
          <span>{text.floatingHint}</span>
          <button type="button" className="nagi-floating-book" onClick={() => openBooking()}>
            <CalendarDays size={20} /><span><small>NAGI</small>{text.book}</span><ArrowRight size={17} />
          </button>
        </div>
      )}

      {bookingOpen && (
        <div className="nagi-widget-layer">
          <button className="nagi-widget-backdrop" type="button" onClick={() => setBookingOpen(false)} aria-label="Close booking guide" />
          <aside className="nagi-widget" role="dialog" aria-modal="true" aria-labelledby="widget-title">
            <header className="nagi-widget__header">
              <div><span className="nagi-widget__mark">凪</span><span><small>{text.widgetEyebrow}</small><strong>{complete ? text.completeTitle : text.widgetTitle[step]}</strong></span></div>
              <div>
                <button type="button" onClick={() => setLanguage(language === "en" ? "ja" : "en")} aria-label="Change language"><Globe2 size={15} />{language === "en" ? "JP" : "EN"}</button>
                <button type="button" onClick={() => setBookingOpen(false)} aria-label="Close"><X size={19} /></button>
              </div>
            </header>

            {!complete && (
              <div className="nagi-widget__progress" aria-label={`Step ${step + 1} of 4`}>
                {text.steps.map((label, index) => <span key={label} className={index <= step ? "is-active" : ""}><i>{index + 1}</i><small>{label}</small></span>)}
              </div>
            )}

            <div className="nagi-widget__body">
              {complete ? (
                <div className="nagi-widget-complete">
                  <span className="nagi-widget-complete__icon"><Check size={28} /></span>
                  <h3>{text.completeTitle}</h3>
                  <p>{text.completeCopy}</p>
                  <div className="nagi-widget-complete__route"><MessageCircle size={19} /><span><small>{text.summary[2]}</small><strong>{language === "en" ? channel.en : channel.ja}</strong></span></div>
                  <button type="button" onClick={() => { setComplete(false); setStep(0); }}>{text.restart}</button>
                </div>
              ) : (
                <>
                  {step === 0 && (
                    <div className="nagi-widget-services">
                      <p>{language === "en" ? "Select a starting point. You can adjust it after consultation." : "最初のメニューを選択してください。カウンセリング後に変更できます。"}</p>
                      {services.map((item) => (
                        <button key={item.id} type="button" className={selectedService === item.id ? "is-selected" : ""} onClick={() => setSelectedService(item.id)}>
                          <span className={`nagi-widget-services__swatch is-${item.tone}`}>{item.category === "care" ? <Sparkles size={17} /> : <Scissors size={17} />}</span>
                          <span><strong>{language === "en" ? item.en : item.ja}</strong><small>{language === "en" ? item.detailEn : item.detailJa}</small><em>{item.duration}</em></span>
                          <b>{item.price}</b>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="nagi-widget-time">
                      <section><h3><CalendarDays size={17} />{text.chooseDate}</h3><div className="nagi-widget-dates">{dates.map((item) => <button key={item.date} type="button" className={selectedDate === item.date ? "is-selected" : ""} onClick={() => setSelectedDate(item.date)}><small>{language === "en" ? item.day : item.ja}</small><strong>{item.date}</strong><span>{item.month}</span></button>)}</div></section>
                      <section><h3><Clock3 size={17} />{text.chooseTime}</h3><div className="nagi-widget-times">{times.map((item) => <button key={item} type="button" className={selectedTime === item ? "is-selected" : ""} onClick={() => setSelectedTime(item)}>{item}</button>)}</div></section>
                      <p className="nagi-widget-note">{text.noLiveCalendar}</p>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="nagi-widget-channels">
                      <p>{text.handoff}</p>
                      {channels.map((item) => <button key={item.id} type="button" className={selectedChannel === item.id ? "is-selected" : ""} onClick={() => setSelectedChannel(item.id)}><span className="nagi-widget-channel-icon">{item.id === "line" ? "L" : item.id === "hotpepper" ? "H" : <MessageCircle size={18} />}</span><span><strong>{language === "en" ? item.en : item.ja}</strong><small>{language === "en" ? item.detailEn : item.detailJa}</small></span><i>{selectedChannel === item.id && <Check size={14} />}</i></button>)}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="nagi-widget-review">
                      <div className="nagi-widget-review__hero"><span><Sparkles size={18} /></span><div><small>{language === "en" ? "REQUEST SUMMARY" : "リクエスト内容"}</small><strong>{language === "en" ? service.en : service.ja}</strong></div></div>
                      <dl>
                        <div><dt>{text.summary[0]}</dt><dd>{language === "en" ? service.en : service.ja}<small>{service.duration} · {service.price}</small></dd></div>
                        <div><dt>{text.summary[1]}</dt><dd>{language === "en" ? date.day : date.ja}, {date.month} {date.date} · {selectedTime}<small>{language === "en" ? "Subject to salon confirmation" : "サロン確認後に確定"}</small></dd></div>
                        <div><dt>{text.summary[2]}</dt><dd>{language === "en" ? channel.en : channel.ja}<small>{language === "en" ? channel.detailEn : channel.detailJa}</small></dd></div>
                      </dl>
                    </div>
                  )}
                </>
              )}
            </div>

            {!complete && (
              <footer className="nagi-widget__footer">
                {step > 0 ? <button className="nagi-widget__back" type="button" onClick={() => setStep((current) => Math.max(0, current - 1))}><ChevronLeft size={15} />{text.back}</button> : <span />}
                <button className="nagi-widget__next" type="button" onClick={() => step === 3 ? setComplete(true) : setStep((current) => Math.min(3, current + 1))}>{step === 3 ? text.launch : text.next}<ArrowRight size={15} /></button>
              </footer>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
