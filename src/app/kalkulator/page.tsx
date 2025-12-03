import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCalculator from "@/components/VehicleCalculator";

export const metadata = {
  title: "Fahrzeugwert-Kalkulator | CarCenter Landshut",
  description: "Berechnen Sie den Wert Ihres Fahrzeugs mit unserem kostenlosen Kalkulator. Über 30 Marken und 200+ Modelle mit realistischen Marktpreisen.",
};

export default function KalkulatorPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-20">
        <VehicleCalculator />
      </div>
      <Footer />
    </main>
  );
}
