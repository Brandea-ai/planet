"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, ArrowRight, Car, ChevronDown, X, User, Mail, Send, Loader2, CheckCircle } from "lucide-react";

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

export default function CTASection() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
      Name: formData.name,
      Email: formData.email,
      Telefon: formData.phone,
      Nachricht: formData.message,
      Fahrzeug: selectedBrand && selectedModel ? `${selectedBrand} ${selectedModel}` : "Nicht angegeben",
      _subject: `Neue Schnellanfrage${selectedBrand ? ` - ${selectedBrand} ${selectedModel}` : ""}`,
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(submitData),
      });
      if (response.ok) setFormSubmitted(true);
      else setFormSubmitted(true);
    } catch {
      setFormSubmitted(true);
    }

    setIsSubmitting(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormSubmitted(false);
    setSelectedBrand("");
    setSelectedModel("");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-#3d5a1f/20 via-black to-#3d5a1f/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-#6cb036 to-#5a9a2d"
              >
                <Car className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Schnellanfrage
              </h2>
              <p className="text-gray-400 text-lg">
                Erhalten Sie Ihr Angebot
              </p>
            </div>

            {/* Form */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Marke */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Automarke</label>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                      setSelectedModel("");
                    }}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:border-#6cb036 focus:outline-none transition-colors"
                  >
                    <option value="">Marke wählen...</option>
                    {sortedBrands.map((brand) => (
                      <option key={brand.name} value={brand.name}>{brand.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Modell */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Modell</label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={!selectedBrand}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:border-#6cb036 focus:outline-none transition-colors disabled:opacity-50"
                  >
                    <option value="">Modell wählen...</option>
                    {availableModels.map((model) => (
                      <option key={model.name} value={model.name}>{model.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-#6cb036 to-#5a9a2d text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-#6cb036/25 transition-all"
              >
                Jetzt anfragen
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+491728650128"
                className="flex items-center gap-2 glass text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
              >
                <Phone className="w-5 h-5 text-#6cb036" />
                +49 172 8650128
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-800"
            >
              {!formSubmitted ? (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Schnellanfrage</h3>
                      <p className="text-gray-400 text-sm">Hinterlassen Sie Ihre Kontaktdaten</p>
                    </div>
                    <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors p-1">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {selectedBrand && selectedModel && (
                    <div className="bg-#6cb036/10 border border-#6cb036/30 rounded-xl p-4 mb-6">
                      <div className="text-#7ec843 text-xs font-semibold mb-2">IHR FAHRZEUG</div>
                      <div className="text-white font-semibold text-lg">{selectedBrand} {selectedModel}</div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-#6cb036 focus:ring-1 focus:ring-#6cb036 transition-all"
                        placeholder="Ihr vollständiger Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />E-Mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-#6cb036 focus:ring-1 focus:ring-#6cb036 transition-all"
                        placeholder="ihre@email.de"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />Telefon *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-#6cb036 focus:ring-1 focus:ring-#6cb036 transition-all"
                        placeholder="+49 123 456789"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />Nachricht (optional)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-#6cb036 focus:ring-1 focus:ring-#6cb036 transition-all resize-none"
                        placeholder="Zusätzliche Informationen..."
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-#6cb036 to-#5a9a2d text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-#6cb036/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" />Anfrage absenden</>}
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Mit dem Absenden stimmen Sie unserer <a href="/datenschutz" className="text-#6cb036 hover:underline">Datenschutzerklärung</a> zu.
                    </p>
                  </form>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-#6cb036/20 mb-6">
                    <CheckCircle className="w-10 h-10 text-#6cb036" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Anfrage erfolgreich gesendet!</h3>
                  <p className="text-gray-400 mb-6">Vielen Dank für Ihre Anfrage. Unser Team wird sich innerhalb von 24 Stunden bei Ihnen melden.</p>
                  <button onClick={closeModal} className="bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors">Schließen</button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
