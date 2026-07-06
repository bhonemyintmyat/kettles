import Image from "next/image";

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
  const rootClassName = ["kittle-pet group relative", className || "w-28"].filter(Boolean).join(" ");

  if (mode !== "static") {
    return (
      <div className={rootClassName}>
        <Image
          src="/pets/kittle/kittle-static.webp"
          alt="Kittle mascot"
          width={192}
          height={208}
          className="h-full w-full object-contain transition-opacity duration-200 group-hover:opacity-0"
          priority
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={animatedSources[mode]}
          alt=""
          width={192}
          height={208}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
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
