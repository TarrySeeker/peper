import CatalogView from "@/components/CatalogView";
import { products } from "@/lib/products";

export const metadata = {
  title: "Каталог · PAPER.FAIRIES",
  description:
    "Полный каталог нежных аксессуаров: крабики, расчёски, гребешки с гравировкой, косметички и сумки.",
};

export default function CatalogPage() {
  return (
    <CatalogView
      products={products}
      title="Полная коллекция"
      subtitle="Каталог"
      description="Все аксессуары в одном месте — выбирайте по категории, новизне или возможности гравировки."
    />
  );
}
