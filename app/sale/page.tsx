import SectionHero from "@/components/SectionHero";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Акции · PAPER.FAIRIES",
  description:
    "Сезонные предложения и приятные скидки на любимые аксессуары PAPER.FAIRIES.",
};

export default function SalePage() {
  const items = products.filter((p) => p.oldPrice);
  const maxDiscount = items.reduce((acc, p) => {
    const d = Math.round((1 - p.price / (p.oldPrice ?? p.price)) * 100);
    return Math.max(acc, d);
  }, 0);

  const totalSaved = items.reduce(
    (acc, p) => acc + ((p.oldPrice ?? p.price) - p.price),
    0
  );

  return (
    <>
      <SectionHero
        eyebrow="Сезонные предложения"
        title={
          <>
            Тёплые{" "}
            <span className="font-script italic font-light text-rose-600">
              акции
            </span>
          </>
        }
        description="Те самые любимые позиции — со скидкой. Количество ограничено, спешите выбрать."
        breadcrumb={[
          { href: "/", label: "Главная" },
          { href: "/sale", label: "Акции" },
        ]}
      />

      {items.length > 0 && (
        <section className="container-site mt-10">
          <div className="mx-auto grid max-w-2xl grid-cols-3 gap-3">
            {[
              { v: `${items.length}`, l: "позиций" },
              { v: `−${maxDiscount}%`, l: "макс. скидка" },
              { v: formatPrice(totalSaved), l: "общая выгода" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl bg-white/70 px-4 py-5 text-center backdrop-blur"
              >
                <div className="font-display text-2xl text-ink-900">{s.v}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ink-500">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container-site mt-14 pb-24">
        <ProductGrid
          products={items}
          emptyTitle="Сейчас без акций"
          emptyText="Цены остаются неизменными — следите за рассылкой, в ней мы первым делом сообщаем о скидках."
        />
      </section>
    </>
  );
}
