"use client";

import { motion } from "framer-motion";
import { Wrench, Car, ShoppingCart, BadgeDollarSign, Shield, Sofa, Headphones, ChevronRight } from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    icon: BadgeDollarSign,
    title: "Preis-Leistung",
    description: "Fahrzeuge mit hervorragendem Preis-Leistungs-Verhältnis. Fair kalkuliert für den besten Deal.",
  },
  {
    icon: Shield,
    title: "Zuverlässigkeit",
    description: "Jedes Auto gründlich geprüft und erfüllt höchste Sicherheitsstandards.",
  },
  {
    icon: Sofa,
    title: "Komfort",
    description: "Hochwertige Ausstattung und moderne Infotainment-Systeme.",
  },
  {
    icon: Headphones,
    title: "Service",
    description: "Über 4 Jahre Erfahrung und zuverlässige Dienstleistungen.",
  },
];

const services = [
  {
    icon: Wrench,
    title: "Service",
    description: "Reifenpflege & Aufbereitung",
    href: "/service",
    cta: "Termin buchen",
  },
  {
    icon: Car,
    title: "Verkauf",
    description: "Top-Angebote auf Mobile.de",
    href: "/fahrzeuge",
    cta: "Fahrzeuge ansehen",
  },
  {
    icon: ShoppingCart,
    title: "Ankauf",
    description: "Schnell und fair verkaufen",
    href: "/ankauf",
    cta: "Jetzt verkaufen",
  },
];

export default function Services() {
  return (
    <section id="service" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6cb036]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-[#6cb036] font-semibold tracking-wider uppercase text-xs sm:text-sm">
            Warum wir?
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 sm:mt-3">
            Unsere <span className="text-[#6cb036]">Leistungen</span>
          </h2>
        </motion.div>

        {/* Highlights Grid - Compact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#6cb036]/20 to-[#5a9a2d]/20 flex items-center justify-center mb-3">
                <highlight.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#6cb036]" aria-hidden="true" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1 sm:mb-2">{highlight.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">{highlight.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Unsere <span className="text-[#6cb036]">Services</span>
          </h2>
        </motion.div>

        {/* Services Grid - Compact */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={service.href} className="block h-full">
                <div className="h-full glass rounded-xl sm:rounded-2xl p-3 sm:p-5 lg:p-6 transition-all duration-300 hover:border-[#6cb036]/30 text-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#6cb036] to-[#5a9a2d] flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-[10px] sm:text-xs lg:text-sm mb-2 sm:mb-3 hidden sm:block">{service.description}</p>
                  <span className="inline-flex items-center gap-1 text-[#6cb036] font-semibold text-xs sm:text-sm group-hover:text-[#7ec843] transition-colors">
                    <span className="hidden sm:inline">{service.cta}</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
