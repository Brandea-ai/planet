"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Car, CheckCircle, Send, Loader2, Phone, Mail, MapPin, Clock, Shield, Banknote, Truck } from "lucide-react";

const carBrands: Record<string, string[]> = {
  "Audi": ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "RS3", "RS6", "e-tron"],
  "BMW": ["1er", "2er", "3er", "4er", "5er", "6er", "7er", "8er", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "M3", "M5", "i3", "i4", "iX"],
  "Mercedes-Benz": ["A-Klasse", "B-Klasse", "C-Klasse", "E-Klasse", "S-Klasse", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Klasse", "AMG GT", "EQC", "EQS"],
  "Volkswagen": ["Polo", "Golf", "Passat", "Arteon", "T-Roc", "T-Cross", "Tiguan", "Touareg", "ID.3", "ID.4", "ID.5", "Touran", "Sharan", "Caddy"],
  "Opel": ["Corsa", "Astra", "Insignia", "Mokka", "Crossland", "Grandland", "Combo", "Zafira", "Vivaro"],
  "Ford": ["Fiesta", "Focus", "Mondeo", "Puma", "Kuga", "Explorer", "Mustang", "Ranger", "Transit"],
  "Toyota": ["Yaris", "Corolla", "Camry", "RAV4", "C-HR", "Highlander", "Land Cruiser", "Supra", "Aygo", "Prius"],
  "Honda": ["Jazz", "Civic", "Accord", "HR-V", "CR-V", "e"],
  "Hyundai": ["i10", "i20", "i30", "Ioniq", "Kona", "Tucson", "Santa Fe", "Ioniq 5", "Ioniq 6"],
  "Kia": ["Picanto", "Rio", "Ceed", "Stonic", "Sportage", "Sorento", "EV6", "Niro"],
  "Nissan": ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Ariya"],
  "Mazda": ["2", "3", "6", "CX-3", "CX-30", "CX-5", "MX-5", "CX-60"],
  "Porsche": ["911", "Cayenne", "Macan", "Panamera", "Taycan", "718 Boxster", "718 Cayman"],
  "Skoda": ["Fabia", "Scala", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Enyaq"],
  "Seat": ["Ibiza", "Leon", "Ateca", "Arona", "Tarraco", "Cupra Formentor"],
  "Fiat": ["500", "Panda", "Tipo", "500X", "500L"],
  "Renault": ["Clio", "Captur", "Megane", "Kadjar", "Koleos", "Zoe", "Arkana"],
  "Peugeot": ["208", "308", "508", "2008", "3008", "5008", "e-208", "e-2008"],
  "Citroen": ["C1", "C3", "C4", "C5 X", "Berlingo", "C3 Aircross", "C5 Aircross"],
  "Mini": ["One", "Cooper", "Clubman", "Countryman", "Cabrio"],
};

const benefits = [
  {
    icon: Banknote,
    title: "Faire Preise",
    description: "Wir bieten Ihnen marktgerechte Preise für Ihr Fahrzeug",
  },
  {
    icon: Clock,
    title: "Schnelle Abwicklung",
    description: "Bewertung und Auszahlung innerhalb von 24 Stunden",
  },
  {
    icon: Truck,
    title: "Kostenlose Abholung",
    description: "Wir holen Ihr Fahrzeug kostenlos bei Ihnen ab",
  },
  {
    icon: Shield,
    title: "Sicher & Seriös",
    description: "Über 10 Jahre Erfahrung im Autoankauf",
  },
];

export default function AnkaufPage() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedBrand("");
      setSelectedModel("");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://brandea.b-cdn.net/CarcenterLandshut/startseite-ankauf-hero.webp"
            alt="Auto Ankauf"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-emerald-500 font-semibold tracking-wider uppercase text-sm">
              Auto Ankauf
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4 mb-6">
              Wir kaufen <span className="text-emerald-500">Ihr Auto</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Schnell, fair und unkompliziert. Erhalten Sie noch heute ein unverbindliches Angebot für Ihr Fahrzeug.
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-600/20 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 md:p-10"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <Car className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Anfrage senden</h2>
                  <p className="text-gray-400">Wir melden uns innerhalb von 24 Stunden</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Ihr Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="Max Mustermann"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Telefon *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="+49 172 1234567"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 text-sm mb-2 block">E-Mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="ihre@email.de"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Automarke *</label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => {
                        setSelectedBrand(e.target.value);
                        setSelectedModel("");
                      }}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Marke wählen...</option>
                      {Object.keys(carBrands).sort().map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Modell *</label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors disabled:opacity-50"
                      disabled={!selectedBrand}
                      required
                    >
                      <option value="">Modell wählen...</option>
                      {selectedBrand && carBrands[selectedBrand]?.map((model) => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Nachricht</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                    placeholder="Zusätzliche Informationen (Baujahr, Kilometerstand, Zustand...)"
                  />
                </div>

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
                      Anfrage erfolgreich gesendet!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Unverbindliche Anfrage senden
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Oder kontaktieren Sie uns direkt
              </h2>
              <p className="text-gray-400 mb-8">
                Sie möchten lieber persönlich mit uns sprechen? Kein Problem! Rufen Sie uns an oder besuchen Sie uns vor Ort.
              </p>

              <div className="space-y-6">
                <a
                  href="tel:+491728650128"
                  className="flex items-center gap-4 p-4 glass rounded-xl hover:border-emerald-600/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center group-hover:bg-emerald-600/30 transition-colors">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Telefon</p>
                    <p className="text-white font-semibold">+49 172 8650128</p>
                  </div>
                </a>

                <a
                  href="mailto:carcenterlandshut@gmail.com"
                  className="flex items-center gap-4 p-4 glass rounded-xl hover:border-emerald-600/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center group-hover:bg-emerald-600/30 transition-colors">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">E-Mail</p>
                    <p className="text-white font-semibold">carcenterlandshut@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://maps.google.com/?q=Niedermayerstr.+44,+84028+Landshut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 glass rounded-xl hover:border-emerald-600/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center group-hover:bg-emerald-600/30 transition-colors">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Adresse</p>
                    <p className="text-white font-semibold">Niedermayerstr. 44, 84028 Landshut</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 glass rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Öffnungszeiten</p>
                    <p className="text-white font-semibold">Mo-Fr: 9-18 Uhr | Sa: 10-14 Uhr</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
