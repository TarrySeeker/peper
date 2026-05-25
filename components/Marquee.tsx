"use client";

interface Props {
  items: string[];
  durationSeconds?: number;
  className?: string;
  itemClassName?: string;
  /** Array of divider symbols cycled between items. Default ["·"]. */
  dividers?: string[];
  /** Tailwind classes for divider span. Default "text-gold-500". */
  dividerClassName?: string;
}

export default function Marquee({
  items,
  durationSeconds = 60,
  className = "",
  itemClassName = "",
  dividers = ["·"],
  dividerClassName = "text-gold-500",
}: Props) {
  return (
    <div className={`group overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max gap-12 whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {[0, 1].map((copyIndex) => (
          <div
            key={copyIndex}
            className="flex shrink-0 items-center gap-12 pr-12"
            aria-hidden={copyIndex === 1}
          >
            {items.map((label, i) => (
              <span
                key={i}
                className={`flex items-center gap-12 ${itemClassName}`}
              >
                {label}
                <span className={dividerClassName}>
                  {dividers[i % dividers.length]}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
