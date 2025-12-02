"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Car, CheckCircle, Send, Loader2 } from "lucide-react";

const carBrands: Record<string, string[]> = {
  "Audi": ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "RS3", "RS6"],
  "BMW": ["1er", "2er", "3er", "4er", "5er", "6er", "7er", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "M3", "M5"],
  "Mercedes-Benz": ["A-Klasse", "B-Klasse", "C-Klasse", "E-Klasse", "S-Klasse", "GLA", "GLC", "GLE", "GLS", "AMG GT"],
  "Volkswagen": ["Golf", "Polo", "Passat", "Tiguan", "T-Roc", "T-Cross", "Touareg", "Arteon", "ID.3", "ID.4"],
  "Opel": ["Corsa", "Astra", "Insignia", "Mokka", "Crossland", "Grandland"],
  "Ford": ["Fiesta", "Focus", "Mondeo", "Kuga", "Puma", "Mustang", "Explorer"],
  "Toyota": ["Yaris", "Corolla", "Camry", "RAV4", "C-HR", "Land Cruiser", "Supra"],
  "Honda": ["Civic", "Jazz", "HR-V", "CR-V", "Accord"],
  "Hyundai": ["i10", "i20", "i30", "Tucson", "Kona", "Santa Fe", "Ioniq"],
  "Kia": ["Picanto", "Rio", "Ceed", "Sportage", "Sorento", "EV6", "Stinger"],
  "Skoda": ["Fabia", "Octavia", "Superb", "Kodiaq", "Karoq", "Kamiq", "Enyaq"],
  "Seat": ["Ibiza", "Leon", "Ateca", "Arona", "Tarraco", "Cupra Formentor"],
  "Porsche": ["911", "Cayenne", "Macan", "Panamera", "Taycan", "718 Boxster"],
  "Mini": ["One", "Cooper", "Clubman", "Countryman", "Cabrio"],
  "Fiat": ["500", "Panda", "Tipo", "500X", "500L"],
};

const benefits = [
  "Kostenlose Bewertung",
  "Sofortige Barauszahlung",
  "Alle Marken & Modelle",
  "Faire Preise garantiert",
];

export default function Ankauf() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedBrand("");
      setSelectedModel("");
      setMessage("");
    }, 3000);
  };

  return (
    <section id="ankauf" className="section-padding bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-green-500 font-semibold tracking-wider uppercase text-sm">
              Auto Ankauf
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Verkaufen Sie Ihr
              <span className="gradient-text"> Fahrzeug</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Unsere Vorzüge sind zügige und gerechte Leistungen. Wir kaufen Ihr Auto schnell und unkompliziert – zu fairen Preisen, ohne versteckte Kosten.
            </p>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 p-6 glass rounded-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-gray-400 text-sm">Angekauft 2024</div>
              </div>
              <div className="text-center border-x border-gray-800">
                <div className="text-3xl font-bold text-white">24h</div>
                <div className="text-gray-400 text-sm">Schnelle Abwicklung</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-gray-400 text-sm">Zufriedenheit</div>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Schnellanfrage</h3>
                  <p className="text-gray-400 text-sm">Erhalten Sie Ihr Angebot</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Brand Select */}
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Automarke</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                      setSelectedModel("");
                    }}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Marke wählen...</option>
                    {Object.keys(carBrands).map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Model Select */}
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Modell</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors disabled:opacity-50"
                    disabled={!selectedBrand}
                    required
                  >
                    <option value="">Modell wählen...</option>
                    {selectedBrand && carBrands[selectedBrand]?.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Nachricht (optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors resize-none"
                    placeholder="Zusätzliche Informationen zu Ihrem Fahrzeug..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || isSuccess}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Anfrage gesendet!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Anfrage senden
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
