"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

const ACCENT = "#FF5303";
const INK = "#0C0C0F";

type Props = {
  onDone: () => void;
  minDurationMs?: number;
};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function makeWavePath({
  width,
  height,
  t,
  intensity,
  lines = 2,
  lineIndex = 0,
}: {
  width: number;
  height: number;
  t: number;
  intensity: number;
  lines?: number;
  lineIndex?: number;
}) {
  const mid = height * (0.56 + (lineIndex - (lines - 1) / 2) * 0.14);
  const ampBase = height * 0.11 * intensity;
  const freq = 2.2 + lineIndex * 0.35;
  const phase = t * (1.25 + lineIndex * 0.28);

  const points = 72;
  const dx = width / (points - 1);

  let d = "";
  for (let i = 0; i < points; i++) {
    const x = i * dx;
    const nx = i / (points - 1);
    const envelope = Math.sin(Math.PI * nx);
    const wobble = Math.sin((nx * Math.PI * 2) * freq + phase);
    const micro = Math.sin((nx * Math.PI * 2) * (freq * 2.4) + phase * 1.85) * 0.35;
    const y = mid + (wobble + micro) * ampBase * envelope;
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

export function LoadingPage({ onDone, minDurationMs = 1200 }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const waveARef = useRef<SVGPathElement | null>(null);
  const waveBRef = useRef<SVGPathElement | null>(null);
  const [hint, setHint] = useState<"idle" | "boost">("idle");

  const dims = useMemo(() => ({ w: 980, h: 260 }), []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    let spaceDown = false;
    let done = false;
    const startedAt = performance.now();

    let intensity = 0.55;
    let t = 0;

    const tick = () => {
      const dt = gsap.ticker.deltaRatio(60) / 60;
      const targetIntensity = spaceDown ? 1 : 0.55;
      intensity = lerp(intensity, targetIntensity, 1 - Math.pow(0.001, dt));
      t += dt * (spaceDown ? 2.6 : 1.15);

      const a = waveARef.current;
      const b = waveBRef.current;
      if (a) {
        a.setAttribute("d", makeWavePath({ width: dims.w, height: dims.h, t, intensity, lines: 2, lineIndex: 0 }));
      }
      if (b) {
        b.setAttribute(
          "d",
          makeWavePath({ width: dims.w, height: dims.h, t: t * 1.05 + 0.6, intensity, lines: 2, lineIndex: 1 }),
        );
      }

      const p = clamp01(((performance.now() - startedAt) / minDurationMs) * (spaceDown ? 1.55 : 1));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;

      if (!done && p >= 1) {
        done = true;
        gsap.to(el, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
          onComplete: onDone,
        });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!spaceDown) setHint("boost");
        spaceDown = true;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        spaceDown = false;
        setHint("idle");
      }
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp, { passive: false });

    gsap.ticker.add(tick);
    gsap.set(el, { opacity: 1 });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [dims.h, dims.w, minDurationMs, onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0C0C0F] opacity-0"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto w-full max-w-4xl px-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">Loading</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">Heating up</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                Hold <span className="font-semibold text-white">Space</span> to speed up.
              </p>
            </div>
            <div className="min-w-[220px]">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    ref={progressRef}
                    className="h-full origin-left rounded-full"
                    style={{
                      transform: "scaleX(0)",
                      background: ACCENT,
                      boxShadow: "0 0 22px rgba(255,83,3,0.45)",
                    }}
                  />
                </div>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  {hint === "boost" ? "Boosting" : "Idle"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
            <div
              aria-hidden="true"
              className="pointer-events-none h-[260px] w-full"
              style={{
                background: `radial-gradient(900px 280px at 50% 20%, rgba(255,83,3,0.14), transparent 60%)`,
              }}
            >
              <svg className="h-full w-full" viewBox={`0 0 ${dims.w} ${dims.h}`} preserveAspectRatio="none">
                <rect x="0" y="0" width={dims.w} height={dims.h} fill={INK} />
                <path
                  ref={waveARef}
                  d={makeWavePath({ width: dims.w, height: dims.h, t: 0, intensity: 0.55, lines: 2, lineIndex: 0 })}
                  fill="none"
                  stroke="rgba(255,255,255,0.30)"
                  strokeWidth="2"
                />
                <path
                  ref={waveBRef}
                  d={makeWavePath({ width: dims.w, height: dims.h, t: 0.6, intensity: 0.55, lines: 2, lineIndex: 1 })}
                  fill="none"
                  stroke="rgba(255,83,3,0.80)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
          Waveform loader • Space to boost
        </p>
      </div>
    </div>
  );
}

