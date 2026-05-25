import Image from "next/image";
import Marquee from "./Marquee";

export default function Hero() {
  return (
    <>
      <section
        aria-label="Главное"
        className="h-screen w-full"
      >
        <div className="flex h-full flex-col md:flex-row">
          {/* LEFT — фото */}
          <div className="relative h-1/2 w-full md:h-full md:w-1/2">
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
          <div className="flex h-1/2 w-full items-center justify-center bg-rose-100 px-8 py-8 md:py-12 md:h-full md:w-1/2 md:px-12 lg:px-16">
            <div className="max-w-md text-center">
              {/* Eyebrow */}
              <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold-600">
                Spring 2026 · №06
              </p>

              {/* Main H2 */}
              <h2 className="mt-6 font-passions font-normal text-4xl leading-[0.85] tracking-normal text-ink-900 sm:text-5xl md:text-7xl lg:text-[7rem] xl:text-[9rem]">
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
