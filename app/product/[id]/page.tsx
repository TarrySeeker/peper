import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Truck, Shield, RefreshCcw } from "lucide-react";
import {
  products,
  getProductById,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import PersonalizationForm from "@/components/PersonalizationForm";
import SimpleAddToCart from "@/components/SimpleAddToCart";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return {};
  return {
    title: `${product.name} · PAPER.FAIRIES`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <article className="pt-8 pb-24">
      <div className="container-site">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink-500">
          <Link href="/" className="hover:text-rose-700">
            Главная
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/catalog" className="hover:text-rose-700">
            Каталог
          </Link>
          {category && (
            <>
              <ChevronRight className="h-3 w-3" />
              <Link
                href={`/catalog/${category.slug}`}
                className="hover:text-rose-700"
              >
                {category.title}
              </Link>
            </>
          )}
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-rose-100 shadow-petal">
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
              {product.isBestseller && (
                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-rose-700 backdrop-blur">
                  Хит коллекции
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {product.images.slice(1).map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-2xl bg-rose-100"
                  >
                    <Image src={src} alt="" fill sizes="200px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            {category && (
              <div className="eyebrow">{category.title}</div>
            )}
            <h1 className="heading-display mt-3 text-4xl sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-4xl text-ink-900">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="font-display text-xl text-ink-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            <p className="mt-6 text-base leading-relaxed text-ink-700">
              {product.description}
            </p>

            <div className="mt-8 border-t border-rose-200 pt-8">
              {product.customizable ? (
                <PersonalizationForm product={product} />
              ) : (
                <SimpleAddToCart product={product} />
              )}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                { Icon: Truck, t: "Доставка от 48ч" },
                { Icon: Shield, t: "Гарантия 1 год" },
                { Icon: RefreshCcw, t: "Возврат 14 дней" },
              ].map(({ Icon, t }) => (
                <div
                  key={t}
                  className="rounded-2xl bg-white/60 p-4 text-center backdrop-blur"
                >
                  <Icon className="mx-auto h-5 w-5 text-rose-700" />
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-700">
                    {t}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-xs uppercase tracking-[0.3em] text-ink-500">
                В деталях
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-800">
                {product.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-500" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-28">
            <h2 className="heading-display text-3xl sm:text-4xl">
              Дополнят образ
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
