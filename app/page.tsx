import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Bestsellers from "@/components/Bestsellers";
import SaleSection from "@/components/SaleSection";
import About from "@/components/About";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Bestsellers />
      <SaleSection />
      <About />
      <ContactSection />
    </>
  );
}
