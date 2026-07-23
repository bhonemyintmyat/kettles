"use client";

import Image from "next/image";
import { type PointerEvent, useEffect, useRef, useState } from "react";

export type KittleMode =
  | "static"
  | "standby"
  | "running-right"
  | "running-left"
  | "waving"
  | "jumping"
  | "failed"
  | "waiting"
  | "working"
  | "review";

type Props = {
  className?: string;
  mode?: KittleMode;
};

const animatedSources: Record<Exclude<KittleMode, "static">, string> = {
  standby: "/pets/kittle/kittle-standby.webp",
  "running-right": "/pets/kittle/kittle-running-right.webp",
  "running-left": "/pets/kittle/kittle-running-left.webp",
  waving: "/pets/kittle/kittle-waving.webp",
  jumping: "/pets/kittle/kittle-jumping.webp",
  failed: "/pets/kittle/kittle-failed.webp",
  waiting: "/pets/kittle/kittle-waiting.webp",
  working: "/pets/kittle/kittle-working.webp",
  review: "/pets/kittle/kittle-review.webp",
};

export function KittlePet({ className = "", mode = "static" }: Props) {
  const [isActive, setIsActive] = useState(false);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootClassName = ["kittle-pet relative touch-manipulation", className || "w-28"]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    return () => {
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current);
      }
    };
  }, []);

  const triggerTapAnimation = () => {
    if (mode === "static") {
      return;
    }

    setIsActive(true);

    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
    }

    tapTimerRef.current = setTimeout(() => {
      setIsActive(false);
    }, 1800);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      return;
    }

    triggerTapAnimation();
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      setIsActive(true);
    }
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      setIsActive(false);
    }
  };

  const staticLayerClassName = [
    "h-full w-full object-contain transition-opacity duration-200",
    isActive ? "opacity-0" : "opacity-100",
  ].join(" ");
  const animatedLayerClassName = [
    "absolute inset-0 h-full w-full object-contain transition-opacity duration-200",
    isActive ? "opacity-100" : "opacity-0",
  ].join(" ");

  if (mode !== "static") {
    return (
      <div
        className={rootClassName}
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <Image
          src="/pets/kittle/kittle-static.webp"
          alt="Kittle mascot"
          width={192}
          height={208}
          className={staticLayerClassName}
          priority
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={animatedSources[mode]}
          alt=""
          width={192}
          height={208}
          aria-hidden="true"
          className={animatedLayerClassName}
        />
      </div>
    );
  }

  return (
    <div className={rootClassName}>
      <Image
        src="/pets/kittle/kittle-static.webp"
        alt="Kittle mascot"
        width={192}
        height={208}
        className="h-full w-full object-contain"
        priority
      />
    </div>
  );
}
