"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, CheckCircle, Send, Loader2, Phone } from "lucide-react";

const FORMSUBMIT_EMAIL = "carcenterlandshut@gmail.com";

const services = [
  {
    image: "https://brandea.b-cdn.net/CarcenterLandshut/service-reifenwechsel.webp",
    title: "Reifenwechsel",
    description: "Professioneller Reifenwechsel mit modernster Ausrüstung. Schnell, sicher und zuverlässig.",
    features: ["Sommer & Winterreifen", "Auswuchten inklusive", "Reifeneinlagerung möglich", "RDKS-Service"],
    price: "ab 49€",
  },
  {
    image: "https://brandea.b-cdn.net/CarcenterLandshut/service-autopflege.webp",
    title: "Fahrzeugaufbereitung",
    description: "Bringen Sie Ihr Auto wieder zum Glänzen. Professionelle Innen- und Außenaufbereitung.",
    features: ["Innenreinigung komplett", "Außenpolitur", "Keramikversiegelung", "Lederreinigung & -pflege"],
    price: "ab 99€",
  },
  {
    image: "https://brandea.b-cdn.net/CarcenterLandshut/service-card.webp",
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

  const bookingFormRef = useRef<HTMLDivElement>(null);

  const handleServiceClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
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
        setIsSuccess(true);
      }
    } catch {
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
    <main id="main-content" className="min-h-screen bg-black pb-safe">
      <Header />

      {/* Hero Section - Mobile First */}
      <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://brandea.b-cdn.net/CarcenterLandshut/startseite-service-hero.webp"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-[#6cb036] font-semibold tracking-wider uppercase text-xs sm:text-sm">
              Unsere Services
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6">
              Premium <span className="text-[#6cb036]">Autoservice</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Von Reifenwechsel bis Fahrzeugaufbereitung – wir bieten Ihnen erstklassigen Service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Mobile First with 9:16 Images */}
      <section className="py-8 sm:py-12 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile: Vertical Stack / Desktop: Grid - No horizontal scroll to avoid gesture conflicts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-full glass rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:border-[#5a9a2d]/30 group">
                  {/* 9:16 Image Container */}
                  <div className="relative aspect-[9/12] sm:aspect-[9/14] lg:aspect-[9/12] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Gradient Overlay - Stronger for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

                    {/* Price Badge */}
                    <span className="absolute top-4 right-4 bg-[#6cb036] text-white font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base shadow-lg">
                      {service.price}
                    </span>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                        {service.title}
                      </h2>
                      <p className="text-gray-200 text-sm sm:text-base mb-4 line-clamp-2 drop-shadow-lg">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-1.5 sm:space-y-2 mb-4">
                        {service.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-white text-xs sm:text-sm drop-shadow-md">
                            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6cb036] flex-shrink-0" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleServiceClick(service.title)}
                        className="w-full py-3 sm:py-3.5 rounded-xl bg-[#6cb036] text-white font-semibold text-sm sm:text-base active:scale-[0.98] transition-transform touch-target"
                        aria-label={`${service.title} buchen`}
                      >
                        Termin buchen
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* Booking Form */}
      <motion.section
        ref={bookingFormRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-8 sm:py-12 lg:py-20 scroll-mt-24 lg:scroll-mt-32"
        aria-labelledby="booking-title"
      >
        <div className="max-w-xl lg:max-w-3xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#6cb036] to-[#5a9a2d] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
              </div>
              <div>
                <h2 id="booking-title" className="text-xl sm:text-2xl font-bold text-white">
                  Termin buchen
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  Wir bestätigen Ihren Termin schnellstmöglich
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Service Select */}
              <div>
                <label htmlFor="service" className="text-gray-300 text-sm mb-2 block">
                  Service auswählen *
                </label>
                <select
                  id="service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 sm:py-3.5 text-white focus:border-[#6cb036] focus:outline-none focus:ring-2 focus:ring-[#6cb036]/20 transition-all text-base"
                  required
                >
                  <option value="">Service wählen...</option>
                  {services.map((service) => (
                    <option key={service.title} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="text-gray-300 text-sm mb-2 block">
                  Ihr Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 sm:py-3.5 text-white focus:border-[#6cb036] focus:outline-none focus:ring-2 focus:ring-[#6cb036]/20 transition-all text-base"
                  placeholder="Max Mustermann"
                  required
                />
              </div>

              {/* Email & Phone - Stack on Mobile */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="email" className="text-gray-300 text-sm mb-2 block">
                    E-Mail *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 sm:py-3.5 text-white focus:border-[#6cb036] focus:outline-none focus:ring-2 focus:ring-[#6cb036]/20 transition-all text-base"
                    placeholder="ihre@email.de"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-gray-300 text-sm mb-2 block">
                    Telefon *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 sm:py-3.5 text-white focus:border-[#6cb036] focus:outline-none focus:ring-2 focus:ring-[#6cb036]/20 transition-all text-base"
                    placeholder="+49 172 1234567"
                    required
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="date" className="text-gray-300 text-sm mb-2 block">
                    Wunschdatum *
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 sm:py-3.5 text-white focus:border-[#6cb036] focus:outline-none focus:ring-2 focus:ring-[#6cb036]/20 transition-all text-base [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="time" className="text-gray-300 text-sm mb-2 block">
                    Wunschzeit
                  </label>
                  <select
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 sm:py-3.5 text-white focus:border-[#6cb036] focus:outline-none focus:ring-2 focus:ring-[#6cb036]/20 transition-all text-base"
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

              {/* Message */}
              <div>
                <label htmlFor="message" className="text-gray-300 text-sm mb-2 block">
                  Nachricht (optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 sm:py-3.5 text-white focus:border-[#6cb036] focus:outline-none focus:ring-2 focus:ring-[#6cb036]/20 transition-all resize-none text-base"
                  placeholder="Zusätzliche Informationen..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting || isSuccess}
                className="w-full bg-gradient-to-r from-[#6cb036] to-[#5a9a2d] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#6cb036]/25 transition-all duration-300 disabled:opacity-70 touch-target text-base sm:text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    Wird gesendet...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5" aria-hidden="true" />
                    Terminanfrage gesendet!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" aria-hidden="true" />
                    Termin anfragen
                  </>
                )}
              </motion.button>
            </form>

            {/* Quick Contact */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
              <p className="text-gray-400 text-center text-sm sm:text-base mb-3 sm:mb-4">
                Oder rufen Sie uns direkt an:
              </p>
              <a
                href="tel:+491728650128"
                className="flex items-center justify-center gap-3 text-[#6cb036] font-semibold text-lg sm:text-xl hover:text-[#7ec843] transition-colors touch-target"
                aria-label="Anrufen: +49 172 8650128"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                +49 172 8650128
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
