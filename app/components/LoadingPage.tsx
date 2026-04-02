"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  onDone: () => void;
  minDurationMs?: number;
};

// Full-viewport black preloader
const BG = "#000000";

// Colors
const WHITE = "#FFFFFF";
const ORANGE = "#F37321";
const TRACK = "#2B2B2B";

// Timing (as requested)
const FADE_IN_MS = 400;
const BAR_FILL_MS = 2000;
const LOGO_FILL_MS = 1500;
const HOLD_MS = 500;
const FADE_OUT_MS = 450;

// Clip-path values (CSS inset order: top right bottom left)
const CLIP_HIDDEN = "inset(0 100% 0 0)";
const CLIP_VISIBLE = "inset(0 0 0 0)";

// Provided logo image (copied to `public/preloader-logo.png`)
const LOGO_SRC = "/preloader-logo.png";

function makeLuminanceMaskDataUrl(imageEl: HTMLImageElement): string {
  const canvas = document.createElement("canvas");
  const w = Math.max(1, imageEl.naturalWidth || imageEl.width);
  const h = Math.max(1, imageEl.naturalHeight || imageEl.height);
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return "";

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(imageEl, 0, 0, w, h);

  const img = ctx.getImageData(0, 0, w, h);
  const data = img.data;

  // Luminance-based alpha:
  // - black pixels -> alpha 0 (transparent)
  // - white pixels -> alpha 255 (opaque)
  // - mid-tone pixels -> alpha interpolated
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = Math.max(0, Math.min(255, Math.round(lum)));
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

function LogoMask({ color, maskUrl }: { color: string; maskUrl: string }) {
  const mask = `url("${maskUrl}")`;
  return (
    <div
      className="h-full w-full"
      style={
        {
          backgroundColor: color,
          maskImage: mask,
          maskRepeat: "no-repeat",
          maskPosition: "center",
          maskSize: "contain",
          WebkitMaskImage: mask,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "contain",
        } as any
      }
    />
  );
}

export function LoadingPage({ onDone, minDurationMs = 0 }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [maskUrl, setMaskUrl] = useState<string>("");
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const logoInnerRef = useRef<HTMLDivElement | null>(null);
  const whiteLogoRef = useRef<HTMLDivElement | null>(null);
  const orangeOverlayRef = useRef<HTMLDivElement | null>(null);
  const barTrackRef = useRef<HTMLDivElement | null>(null);
  const barFillRef = useRef<HTMLDivElement | null>(null);

  const doneRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const img = new Image();
    img.decoding = "async";
    img.src = LOGO_SRC;
    img.onload = () => {
      if (cancelled) return;
      const url = makeLuminanceMaskDataUrl(img);
      if (cancelled) return;
      setMaskUrl(url);
    };

    return () => {
      cancelled = true;
    };
  }, []);

  const canRenderLogo = useMemo(() => Boolean(maskUrl), [maskUrl]);

  useEffect(() => {
    const rootEl = rootRef.current;
    const whiteEl = whiteLogoRef.current;
    const overlayEl = orangeOverlayRef.current;
    const trackEl = barTrackRef.current;
    const fillEl = barFillRef.current;
    const logoWrapEl = logoWrapRef.current;
    const logoInnerEl = logoInnerRef.current;

    if (!rootEl || !whiteEl || !overlayEl || !trackEl || !fillEl || !logoWrapEl || !logoInnerEl) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    // Step durations
    const baseTotal = FADE_IN_MS + BAR_FILL_MS + LOGO_FILL_MS + HOLD_MS + FADE_OUT_MS;
    const extraWait = Math.max(0, minDurationMs - baseTotal);

    const timers: number[] = [];
    let barTransitionDone = false;

    const cleanup = () => {
      document.documentElement.style.overflow = prevOverflow;
      for (const t of timers) window.clearTimeout(t);
      doneRef.current = true;
    };

    // Initial styles (hidden overlay, empty bar, fade-in elements)
    rootEl.style.opacity = "1";
    rootEl.style.transition = "none";

    whiteEl.style.opacity = "0";
    whiteEl.style.transition = `opacity ${FADE_IN_MS}ms ease`;

    trackEl.style.opacity = "0";
    trackEl.style.transition = `opacity ${FADE_IN_MS}ms ease`;

    overlayEl.style.clipPath = CLIP_HIDDEN;
    overlayEl.style.transition = "none";

    fillEl.style.width = "0%";
    fillEl.style.transition = "none";

    // Size logo to be exactly 60% of the loading bar width.
    const setLogoSize = () => {
      const barW = trackEl.getBoundingClientRect().width;
      const size = Math.round(barW * 0.6);
      logoInnerEl.style.width = `${size}px`;
      logoInnerEl.style.height = `${size}px`;
    };
    setLogoSize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => setLogoSize());
      ro.observe(trackEl);
    } else {
      window.addEventListener("resize", setLogoSize);
    }

    // Trigger Step 0: fade in white logo + empty bar
    timers.push(
      window.setTimeout(() => {
        whiteEl.style.opacity = "1";
        trackEl.style.opacity = "1";
      }, 0),
    );

    // Step 1: bar fill (0% -> 100%)
    const startLogoRevealAndFadeOut = () => {
      if (barTransitionDone) return;
      barTransitionDone = true;

      // Step 2: logo overlay reveals exactly when bar is full.
      overlayEl.style.transition = `clip-path ${LOGO_FILL_MS}ms linear`;
      overlayEl.style.clipPath = CLIP_VISIBLE;

      // Step 3: hold 0.5s after logo is fully orange, then fade out wrapper.
      timers.push(
        window.setTimeout(() => {
          rootEl.style.transition = `opacity ${FADE_OUT_MS}ms ease`;
          rootEl.style.opacity = "0";

          timers.push(
            window.setTimeout(() => {
              if (doneRef.current) return;
              doneRef.current = true;
              onDone();
            }, FADE_OUT_MS),
          );
        }, LOGO_FILL_MS + HOLD_MS + extraWait),
      );
    };

    const onBarTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "width") return;
      startLogoRevealAndFadeOut();
    };

    fillEl.addEventListener("transitionend", onBarTransitionEnd);

    timers.push(
      window.setTimeout(() => {
        fillEl.style.transition = `width ${BAR_FILL_MS}ms linear`;
        // Force reflow to ensure the transition is picked up reliably.
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        fillEl.offsetWidth;
        fillEl.style.width = "100%";
      }, FADE_IN_MS),
    );

    // Fallback: if transitionend doesn't fire for any reason, start Step 2 on time.
    timers.push(
      window.setTimeout(() => {
        startLogoRevealAndFadeOut();
      }, FADE_IN_MS + BAR_FILL_MS),
    );

    return () => {
      cleanup();
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", setLogoSize);
      fillEl.removeEventListener("transitionend", onBarTransitionEnd);
    };
  }, [onDone, minDurationMs]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center justify-center px-6">
        <div
          ref={logoWrapRef}
          className="relative w-[260px] max-w-[70vw]"
        >
          {/* LogoInner is sized (60% of bar width) by JS, and stays centered. */}
          <div
            ref={logoInnerRef}
            className="relative mx-auto"
            style={{ width: "156px", height: "156px" }}
          >
            <div
              ref={whiteLogoRef}
              className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: canRenderLogo ? 0 : 0 }}
            >
            {canRenderLogo ? <LogoMask color={WHITE} maskUrl={maskUrl} /> : null}
            </div>
            <div
              ref={orangeOverlayRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{ clipPath: CLIP_HIDDEN }}
            >
            {canRenderLogo ? <LogoMask color={ORANGE} maskUrl={maskUrl} /> : null}
            </div>
          </div>

          {/* BarTrack is absolute under the visible part; negative margin pulls it up to overlap transparent logo padding. */}
          <div
            ref={barTrackRef}
            className="absolute left-0 top-full mt-[-12px] h-[4px] w-full overflow-hidden rounded-full bg-[#2B2B2B]"
            style={{ opacity: 0 }}
          >
            <div ref={barFillRef} className="h-full bg-[#F37321]" style={{ width: "0%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
