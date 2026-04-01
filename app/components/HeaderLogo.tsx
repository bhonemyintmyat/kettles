"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getActiveTheme(): Theme {
  const t = document.documentElement.dataset.theme;
  if (t === "light" || t === "dark") return t;
  return getSystemTheme();
}

export function HeaderLogo() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const update = () => setTheme(getActiveTheme());
    update();

    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    mq?.addEventListener?.("change", update);

    return () => {
      obs.disconnect();
      mq?.removeEventListener?.("change", update);
    };
  }, []);

  const src = theme === "dark" ? "/brand/kettles-white.png" : "/brand/kettles-orange.png";

  return (
    <Image
      src={src}
      alt="Kettles"
      width={640}
      height={200}
      quality={100}
      priority
      sizes="(max-width: 768px) 180px, 220px"
      className="h-8 w-auto md:h-9"
    />
  );
}

