import SectionHero from "@/components/SectionHero";

export const metadata = {
  title: "Новые поступления · PAPER.FAIRIES",
  description:
    "Свежие находки сезона — крабики, гребешки и сумки, недавно появившиеся в коллекции PAPER.FAIRIES.",
};

export default function NewPage() {
  return (
    <SectionHero
      eyebrow="Свежее в бутике"
      title={
        <>
          Новые{" "}
          <span className="font-script italic font-light text-rose-600">
            поступления
          </span>
        </>
      }
      description="Каждые две недели мы добавляем небольшую партию изделий — лимитированно и с заботой о деталях."
      breadcrumb={[
        { href: "/", label: "Главная" },
        { href: "/new", label: "Новинки" },
      ]}
    />
  );
}
