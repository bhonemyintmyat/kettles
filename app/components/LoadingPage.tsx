"use client";

import { useEffect, useState } from "react";

type Props = {
  onDone: () => void;
  minDurationMs?: number;
};

const FADE_OUT_MS = 520;
const BASE_DURATION_MS = 2800;
const LOGO_SRC = "/Artboardcopy2.png";

export function LoadingPage({ onDone, minDurationMs = BASE_DURATION_MS }: Props) {
  const [exiting, setExiting] = useState(false);
  const [ready, setReady] = useState(false);
  const duration = Math.max(BASE_DURATION_MS, minDurationMs);

  useEffect(() => {
    const logo = new Image();
    let cancelled = false;

    logo.decoding = "async";
    logo.src = LOGO_SRC;
    logo.onload = () => {
      if (!cancelled) setReady(true);
    };
    logo.onerror = () => {
      if (!cancelled) setReady(true);
    };

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const unlockScroll = () => {
      if (prevHtmlOverflow) document.documentElement.style.overflow = prevHtmlOverflow;
      else document.documentElement.style.removeProperty("overflow");
      if (prevBodyOverflow) document.body.style.overflow = prevBodyOverflow;
      else document.body.style.removeProperty("overflow");
    };

    const fadeTimer = window.setTimeout(() => setExiting(true), duration);
    const doneTimer = window.setTimeout(() => {
      unlockScroll();
      onDone();
    }, duration + FADE_OUT_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
      unlockScroll();
    };
  }, [duration, onDone]);

  return (
    <div
      className={[
        "fixed inset-0 z-[60] flex touch-none items-center justify-center overflow-hidden bg-black text-white",
        "transition-opacity duration-500 ease-out",
        exiting ? "opacity-0" : "opacity-100",
      ].join(" ")}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex w-full max-w-[920px] flex-col items-center px-6">
        <div className="loader-lockup relative flex min-h-[220px] w-full items-center justify-center">
          {ready ? (
            <img
              className="loader-logo-image block w-[min(92vw,820px)] max-w-none select-none"
              src={LOGO_SRC}
              alt="Kettles"
              draggable={false}
            />
          ) : null}
        </div>

      </div>

      <style jsx global>{`
        .loader-logo-image {
          opacity: 0;
          clip-path: inset(0 100% 0 0);
          transform: translateY(10px) scale(0.985);
          filter: drop-shadow(0 0 18px rgba(255, 83, 3, 0.2));
          image-rendering: auto;
          animation: loader-logo-reveal 1.15s cubic-bezier(0.22, 1, 0.36, 1) 0.08s forwards;
          transform-origin: center;
        }

        @keyframes loader-logo-reveal {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
            transform: translateY(10px) scale(0.985);
          }
          18% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 640px) {
          .loader-lockup {
            min-height: 190px;
          }

          .loader-logo-image {
            width: min(118vw, 520px);
          }
        }
      `}</style>
    </div>
  );
}
