import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ankauf from "@/components/Ankauf";
import Services from "@/components/Services";
import Fahrzeuge from "@/components/Fahrzeuge";
import Stats from "@/components/Stats";
import VehicleCalculator from "@/components/VehicleCalculator";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      <Ankauf />
      <VehicleCalculator />
      <Stats />
      <Services />
      <Fahrzeuge />
      <CTASection />
      <FAQ />
      <Footer />
    </main>
  );
}
