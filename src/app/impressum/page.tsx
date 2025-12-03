"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Phone, Mail, MapPin, User, Building } from "lucide-react";

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-black to-black" />

        <div className="max-w-4xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6cb036]/20 to-[#5a9a2d]/20 mb-6">
              <FileText className="w-8 h-8 text-[#6cb036]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Impressum
            </h1>
            <p className="text-gray-400">
              Angaben gemäß § 5 TMG
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12 space-y-10"
          >
            {/* Anbieter */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Building className="w-6 h-6 text-[#6cb036]" />
                Anbieter
              </h2>
              <div className="text-gray-300 space-y-2">
                <p className="font-semibold text-white text-lg">CarCenter Landshut GbR</p>
                <p>Mehmet Emin Akin & Sofian Lakaksa</p>
                <p>Niedermayerstr. 44</p>
                <p>84028 Landshut</p>
              </div>
            </div>

            {/* Vertretungsberechtigte */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <User className="w-6 h-6 text-[#6cb036]" />
                Vertreten durch
              </h2>
              <p className="text-gray-300">
                Mehmet Emin Akin & Sofian Lakaksa
              </p>
            </div>

            {/* Kontakt */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Phone className="w-6 h-6 text-[#6cb036]" />
                Kontakt
              </h2>
              <div className="space-y-3">
                <a
                  href="tel:+491728650128"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#6cb036] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#6cb036]" />
                  +49 172 8650128
                </a>
                <a
                  href="mailto:carcenterlandshut@gmail.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#6cb036] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#6cb036]" />
                  carcenterlandshut@gmail.com
                </a>
              </div>
            </div>

            {/* Umsatzsteuer-ID */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Umsatzsteuer-ID</h2>
              <p className="text-gray-300">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                <span className="text-white font-semibold">DE366014618</span>
              </p>
            </div>

            {/* Verantwortlich für den Inhalt */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <div className="text-gray-300 space-y-2">
                <p className="font-semibold text-white">Mehmet Emin Akin & Sofian Lakaksa</p>
                <p>Niedermayerstr. 44</p>
                <p>84028 Landshut</p>
              </div>
            </div>

            {/* EU-Streitschlichtung */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">EU-Streitschlichtung</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                </p>
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6cb036] hover:text-[#7ec843] transition-colors block"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <p>
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </div>
            </div>

            {/* Verbraucherstreitbeilegung */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
              <p className="text-gray-300">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            {/* Haftung für Inhalte */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Haftung für Inhalte</h2>
              <p className="text-gray-300 leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>

            {/* Haftung für Links */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Haftung für Links</h2>
              <p className="text-gray-300 leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </div>

            {/* Urheberrecht */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Urheberrecht</h2>
              <p className="text-gray-300 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
