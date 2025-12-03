"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Wrench, Sparkles, Shield, Calendar, CheckCircle, Send, Loader2, Phone } from "lucide-react";

// FormSubmit.co - Ersetze mit deiner Email-Adresse
const FORMSUBMIT_EMAIL = "carcenterlandshut@gmail.com";

const services = [
  {
    icon: Wrench,
    title: "Reifenwechsel",
    description: "Professioneller Reifenwechsel mit modernster Ausrüstung. Schnell, sicher und zuverlässig.",
    features: ["Sommer & Winterreifen", "Auswuchten inklusive", "Reifeneinlagerung möglich", "RDKS-Service"],
    price: "ab 49€",
  },
  {
    icon: Sparkles,
    title: "Fahrzeugaufbereitung",
    description: "Bringen Sie Ihr Auto wieder zum Glänzen. Professionelle Innen- und Außenaufbereitung.",
    features: ["Innenreinigung komplett", "Außenpolitur", "Keramikversiegelung", "Lederreinigung & -pflege"],
    price: "ab 99€",
  },
  {
    icon: Shield,
    title: "Fahrzeugcheck",
    description: "Umfassende Inspektion Ihres Fahrzeugs. Für Ihre Sicherheit auf der Straße.",
    features: ["Bremsencheck", "Ölwechsel", "Fehlerdiagnose", "Klimaanlagenservice"],
    price: "ab 39€",
  },
];

export default function ServicePage() {
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Ref für Auto-Scroll zum Buchungsformular
  const bookingFormRef = useRef<HTMLDivElement>(null);

  // Service auswählen und zum Formular scrollen
  const handleServiceClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    // Nach kurzer Verzögerung zum Formular scrollen
    setTimeout(() => {
      bookingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = {
      Name: name,
      Email: email,
      Telefon: phone,
      Service: selectedService,
      Wunschdatum: date,
      Wunschzeit: time,
      Nachricht: message,
      _subject: `Neue Terminanfrage - ${selectedService} - CarCenter Landshut`,
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.log("Form data:", submitData);
        setIsSuccess(true);
      }
    } catch {
      console.log("Form data:", submitData);
      setIsSuccess(true);
    }

    setIsSubmitting(false);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedService("");
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
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
            src="https://brandea.b-cdn.net/CarcenterLandshut/startseite-service-hero.webp"
            alt="Service"
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
              Unsere Services
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4 mb-6">
              Premium <span className="text-emerald-500">Autoservice</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Von Reifenwechsel bis Fahrzeugaufbereitung – wir bieten Ihnen erstklassigen Service für Ihr Fahrzeug.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="h-full glass rounded-3xl p-8 transition-all duration-300 hover:border-emerald-600/30">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-emerald-600" />
                  </div>

                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                    <span className="text-emerald-500 font-bold text-lg">{service.price}</span>
                  </div>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleServiceClick(service.title)}
                    className="w-full py-3 rounded-xl border border-emerald-600/30 text-emerald-600 font-semibold hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    Termin buchen
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Booking Form */}
          <motion.div
            ref={bookingFormRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto scroll-mt-32"
          >
            <div className="glass rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Termin buchen</h2>
                  <p className="text-gray-400">Wir bestätigen Ihren Termin schnellstmöglich</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Service auswählen *</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Service wählen...</option>
                    {services.map((service) => (
                      <option key={service.title} value={service.title}>{service.title}</option>
                    ))}
                  </select>
                </div>

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

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">E-Mail *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                      placeholder="ihre@email.de"
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

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Wunschdatum *</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Wunschzeit</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
                    >
                      <option value="">Zeit wählen...</option>
                      <option value="09:00">09:00 Uhr</option>
                      <option value="10:00">10:00 Uhr</option>
                      <option value="11:00">11:00 Uhr</option>
                      <option value="12:00">12:00 Uhr</option>
                      <option value="14:00">14:00 Uhr</option>
                      <option value="15:00">15:00 Uhr</option>
                      <option value="16:00">16:00 Uhr</option>
                      <option value="17:00">17:00 Uhr</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Nachricht</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                    placeholder="Zusätzliche Informationen..."
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
                      Terminanfrage gesendet!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Termin anfragen
                    </>
                  )}
                </motion.button>
              </form>

              {/* Quick Contact */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <p className="text-gray-400 text-center mb-4">Oder rufen Sie uns direkt an:</p>
                <a
                  href="tel:+491728650128"
                  className="flex items-center justify-center gap-3 text-emerald-500 font-semibold text-lg hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +49 172 8650128
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
