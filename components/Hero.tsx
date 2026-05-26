import Image from "next/image";
import Marquee from "./Marquee";

export default function Hero() {
  return (
    <>
      <section
        aria-label="Главное"
        className="w-full"
      >
        <div className="flex flex-col md:flex-row md:h-[70vh]">
          {/* LEFT — фото */}
          <div className="relative min-h-[40vh] w-full md:min-h-0 md:flex-1">
            <Image
              src="/hero/hero-split.png"
              alt="PAPER.FAIRIES — бутик нежности"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* RIGHT — editorial-текст */}
          <div className="flex w-full items-center justify-center bg-rose-100 px-8 py-12 md:flex-1 md:px-12 lg:px-16">
            <div className="max-w-md text-center">
              {/* Eyebrow */}
              <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold-600">
                Spring 2026 · №06
              </p>

              {/* Main H2 */}
              <h2 className="mt-4 font-passions font-normal text-4xl leading-[0.85] tracking-normal text-ink-900 sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
                Маленькие детали{" "}
                <span className="text-rose-700">
                  создают
                </span>{" "}
                магию
              </h2>

              {/* Тонкая золотая линия */}
              <div aria-hidden className="mt-4 md:mt-6 mx-auto h-px w-12 bg-gold-400/60" />

              {/* Tagline */}
              <p className="mt-4 md:mt-6 font-sans text-xs uppercase tracking-[0.32em] text-rose-700 sm:text-sm md:text-base">
                Любимые аксессуары для самых нежных образов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee — БЕЗ ИЗМЕНЕНИЙ */}
      <div className="border-y border-rose-200/70 bg-white/40 py-5 backdrop-blur">
        <Marquee
          durationSeconds={30}
          itemClassName="font-sans text-sm md:text-base uppercase tracking-[0.32em] text-rose-700 font-medium"
          dividers={["❀", "⚜", "❋", "☙"]}
          dividerClassName="text-gold-600 text-2xl md:text-3xl"
          items={[
            "Доставка по всей России",
            "Персонализация",
            "Подарочные боксы",
            "Упаковка подарков",
          ]}
        />
      </div>
    </>
  );
}
