"use client";

import Image from "next/image";

type Logo = { src: string; alt: string };

type Props = {
  logos: Logo[];
};

export function LogoMarquee({ logos }: Props) {
  const track = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[color:var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[color:var(--background)] to-transparent" />

      <div className="marquee-track flex w-max items-center gap-8 py-4">
        {track.map((logo, idx) => (
          <div
            key={`${logo.src}-${idx}`}
            className="flex items-center justify-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-5 py-3"
          >
            <Image src={logo.src} alt={logo.alt} width={96} height={48} className="h-9 w-auto opacity-85" />
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 22s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

