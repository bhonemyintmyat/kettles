"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";

export type MenuItem = {
  id: string;
  label: string;
};

type Props = {
  open: boolean;
  items: MenuItem[];
  onClose: () => void;
  onNavigate: (id: string) => void;
  social: Array<{ label: string; href: string; icon: React.ReactNode }>;
};

export function MobileMenu({ open, items, onClose, onNavigate, social }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const tl = useMemo(() => gsap.timeline({ paused: true }), []);

  useEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const list = listRef.current;
    if (!root || !panel || !list) return;

    const links = Array.from(list.querySelectorAll("[data-menu-item]"));
    tl.clear();
    tl.set(root, { display: "block" })
      .fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: "power1.out" }, 0)
      .fromTo(
        panel,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
        0,
      )
      .fromTo(
        links,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.24, ease: "power2.out", stagger: 0.06 },
        0.06,
      );

    return () => {
      tl.clear();
    };
  }, [tl, items.length]);

  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    if (open) document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (open) {
      tl.play(0);
      return;
    }

    if (root.style.display !== "none") {
      gsap.to(root, {
        opacity: 0,
        duration: 0.16,
        ease: "power1.in",
        onComplete: () => {
          gsap.set(root, { display: "none" });
        },
      });
    }
  }, [open, tl]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[55] hidden bg-black/70 opacity-0 backdrop-blur-sm"
      aria-hidden={!open}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="relative h-full w-full overflow-hidden bg-[#030303] text-white"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,83,3,0.14),transparent_34%),linear-gradient(180deg,#090909_0%,#030303_52%,#000_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-6 pb-8 pt-6">
          <div className="relative flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Menu</p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-[#FF5303]/40 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="relative mt-8 grid gap-4">
            {items.map((it) => (
              <button
                key={it.id}
                data-menu-item
                type="button"
                onClick={() => onNavigate(it.id)}
                className="w-full border-b border-white/10 py-5 text-left text-2xl font-semibold tracking-tight text-white transition-colors hover:text-[#FF5303]"
              >
                {it.label}
              </button>
            ))}
          </div>

          <div className="relative mt-auto pt-10">
            <div className="flex items-center gap-3">
              {social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-[#FF5303]/40 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

