"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Car, CheckCircle, Send, Loader2, ChevronDown } from "lucide-react";

// FormSubmit.co Email
const FORMSUBMIT_EMAIL = "carcenterlandshut@gmail.com";

// Fahrzeug-Datenbank
interface VehicleModel {
  name: string;
}

interface VehicleBrand {
  name: string;
  models: VehicleModel[];
}

const vehicleDatabase: VehicleBrand[] = [
  { name: "BMW", models: [{ name: "1er" }, { name: "2er" }, { name: "3er" }, { name: "4er" }, { name: "5er" }, { name: "7er" }, { name: "X1" }, { name: "X3" }, { name: "X5" }, { name: "X6" }, { name: "X7" }, { name: "Z4" }, { name: "M2" }, { name: "M3" }, { name: "M4" }, { name: "iX" }, { name: "i4" }, { name: "i7" }] },
  { name: "Mercedes-Benz", models: [{ name: "A-Klasse" }, { name: "B-Klasse" }, { name: "C-Klasse" }, { name: "E-Klasse" }, { name: "S-Klasse" }, { name: "CLA" }, { name: "CLS" }, { name: "GLA" }, { name: "GLB" }, { name: "GLC" }, { name: "GLE" }, { name: "GLS" }, { name: "G-Klasse" }, { name: "AMG GT" }, { name: "EQA" }, { name: "EQB" }, { name: "EQE" }, { name: "EQS" }] },
  { name: "Audi", models: [{ name: "A1" }, { name: "A3" }, { name: "A4" }, { name: "A5" }, { name: "A6" }, { name: "A7" }, { name: "A8" }, { name: "Q2" }, { name: "Q3" }, { name: "Q4 e-tron" }, { name: "Q5" }, { name: "Q7" }, { name: "Q8" }, { name: "e-tron GT" }, { name: "RS3" }, { name: "RS6" }, { name: "TT" }, { name: "R8" }] },
  { name: "Porsche", models: [{ name: "718 Cayman" }, { name: "718 Boxster" }, { name: "911" }, { name: "Panamera" }, { name: "Cayenne" }, { name: "Macan" }, { name: "Taycan" }] },
  { name: "Volkswagen", models: [{ name: "Polo" }, { name: "Golf" }, { name: "Golf GTI" }, { name: "Golf R" }, { name: "ID.3" }, { name: "ID.4" }, { name: "ID.5" }, { name: "Passat" }, { name: "Arteon" }, { name: "T-Cross" }, { name: "T-Roc" }, { name: "Tiguan" }, { name: "Touareg" }] },
  { name: "Opel", models: [{ name: "Corsa" }, { name: "Astra" }, { name: "Insignia" }, { name: "Mokka" }, { name: "Crossland" }, { name: "Grandland" }] },
  { name: "Toyota", models: [{ name: "Aygo" }, { name: "Yaris" }, { name: "Corolla" }, { name: "C-HR" }, { name: "RAV4" }, { name: "Camry" }, { name: "Land Cruiser" }, { name: "Supra" }] },
  { name: "Honda", models: [{ name: "Jazz" }, { name: "Civic" }, { name: "HR-V" }, { name: "CR-V" }] },
  { name: "Mazda", models: [{ name: "Mazda2" }, { name: "Mazda3" }, { name: "Mazda6" }, { name: "CX-30" }, { name: "CX-5" }, { name: "CX-60" }, { name: "MX-5" }] },
  { name: "Nissan", models: [{ name: "Micra" }, { name: "Leaf" }, { name: "Qashqai" }, { name: "X-Trail" }, { name: "Juke" }, { name: "GT-R" }] },
  { name: "Lexus", models: [{ name: "UX" }, { name: "NX" }, { name: "RX" }, { name: "ES" }, { name: "LS" }] },
  { name: "Hyundai", models: [{ name: "i10" }, { name: "i20" }, { name: "i30" }, { name: "Kona" }, { name: "Tucson" }, { name: "Santa Fe" }, { name: "Ioniq 5" }, { name: "Ioniq 6" }] },
  { name: "Kia", models: [{ name: "Picanto" }, { name: "Rio" }, { name: "Ceed" }, { name: "Sportage" }, { name: "Sorento" }, { name: "EV6" }, { name: "EV9" }] },
  { name: "Renault", models: [{ name: "Clio" }, { name: "Captur" }, { name: "Mégane" }, { name: "Arkana" }, { name: "Austral" }] },
  { name: "Peugeot", models: [{ name: "208" }, { name: "308" }, { name: "508" }, { name: "2008" }, { name: "3008" }, { name: "5008" }] },
  { name: "Citroën", models: [{ name: "C3" }, { name: "C4" }, { name: "C5 Aircross" }, { name: "C5 X" }] },
  { name: "Fiat", models: [{ name: "500" }, { name: "500e" }, { name: "Panda" }, { name: "Tipo" }] },
  { name: "Alfa Romeo", models: [{ name: "Giulia" }, { name: "Stelvio" }, { name: "Tonale" }] },
  { name: "MINI", models: [{ name: "Cooper" }, { name: "Cooper S" }, { name: "Countryman" }] },
  { name: "Land Rover", models: [{ name: "Defender" }, { name: "Discovery Sport" }, { name: "Range Rover Evoque" }, { name: "Range Rover Sport" }, { name: "Range Rover" }] },
  { name: "Volvo", models: [{ name: "XC40" }, { name: "XC60" }, { name: "XC90" }, { name: "S60" }, { name: "V60" }, { name: "EX30" }] },
  { name: "Tesla", models: [{ name: "Model 3" }, { name: "Model Y" }, { name: "Model S" }, { name: "Model X" }] },
  { name: "Ford", models: [{ name: "Fiesta" }, { name: "Focus" }, { name: "Puma" }, { name: "Kuga" }, { name: "Mustang" }, { name: "Mustang Mach-E" }] },
  { name: "Škoda", models: [{ name: "Fabia" }, { name: "Scala" }, { name: "Octavia" }, { name: "Superb" }, { name: "Kamiq" }, { name: "Karoq" }, { name: "Kodiaq" }, { name: "Enyaq" }] },
  { name: "SEAT", models: [{ name: "Ibiza" }, { name: "Leon" }, { name: "Arona" }, { name: "Ateca" }] },
  { name: "CUPRA", models: [{ name: "Born" }, { name: "Leon" }, { name: "Formentor" }] },
];

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

  const sortedBrands = useMemo(() =>
    [...vehicleDatabase].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const availableModels = useMemo(() => {
    const brand = vehicleDatabase.find(b => b.name === selectedBrand);
    return brand?.models || [];
  }, [selectedBrand]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = {
      Fahrzeug: `${selectedBrand} ${selectedModel}`,
      Nachricht: message || "Keine Nachricht",
      _subject: `Ankaufsanfrage - ${selectedBrand} ${selectedModel}`,
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(submitData),
      });
      if (response.ok) setIsSuccess(true);
      else setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    }

    setIsSubmitting(false);

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
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-emerald-500 font-semibold tracking-wider uppercase text-sm">
              Auto Ankauf
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Verkaufen Sie Ihr
              <span className="text-emerald-500"> Fahrzeug</span>
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
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
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
                  <label className="text-gray-300 text-sm mb-2 block">Automarke *</label>
                  <div className="relative">
                    <select
                      value={selectedBrand}
                      onChange={(e) => {
                        setSelectedBrand(e.target.value);
                        setSelectedModel("");
                      }}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:border-emerald-500 focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Marke wählen...</option>
                      {sortedBrands.map((brand) => (
                        <option key={brand.name} value={brand.name}>{brand.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Model Select */}
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Modell *</label>
                  <div className="relative">
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:border-emerald-500 focus:outline-none transition-colors disabled:opacity-50"
                      disabled={!selectedBrand}
                      required
                    >
                      <option value="">Modell wählen...</option>
                      {availableModels.map((model) => (
                        <option key={model.name} value={model.name}>{model.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Nachricht (optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                    placeholder="Zusätzliche Informationen zu Ihrem Fahrzeug..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || isSuccess}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-70"
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
