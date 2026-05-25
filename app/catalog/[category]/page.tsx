import { notFound } from "next/navigation";
import CatalogView from "@/components/CatalogView";
import { categories, products, getCategoryBySlug } from "@/lib/products";
import type { CategorySlug } from "@/types";

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.title} · PAPER.FAIRIES`,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  return (
    <CatalogView
      products={products}
      initialCategory={cat.slug as CategorySlug}
      title={cat.title}
      subtitle={cat.subtitle}
      description={cat.description}
    />
  );
}
