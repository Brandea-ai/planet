"use client";

import { motion } from "framer-motion";
import { Wrench, Sparkles, Shield, Clock, ChevronRight } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Reifenwechsel",
    description: "Professioneller Reifenwechsel mit modernster Ausrüstung. Schnell, sicher und zuverlässig.",
    features: ["Sommer & Winterreifen", "Auswuchten inklusive", "Reifeneinlagerung"],
    price: "ab 49€",
  },
  {
    icon: Sparkles,
    title: "Fahrzeugaufbereitung",
    description: "Bringen Sie Ihr Auto wieder zum Glänzen. Innen- und Außenaufbereitung auf höchstem Niveau.",
    features: ["Innenreinigung", "Außenpolitur", "Keramikversiegelung"],
    price: "ab 99€",
  },
  {
    icon: Shield,
    title: "Fahrzeugcheck",
    description: "Umfassende Inspektion Ihres Fahrzeugs. Sicherheit und Zuverlässigkeit garantiert.",
    features: ["Bremsencheck", "Ölwechsel", "Diagnose"],
    price: "ab 39€",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Services() {
  return (
    <section id="service" className="section-padding bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-green-500 font-semibold tracking-wider uppercase text-sm">
            Unsere Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
            Premium <span className="gradient-text">Autoservice</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Von Reifenwechsel bis Fahrzeugaufbereitung – wir bieten Ihnen erstklassigen Service für Ihr Fahrzeug.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="h-full glass rounded-3xl p-8 transition-all duration-300 hover:border-green-500/30">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-green-500" />
                </div>

                {/* Title & Price */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  <span className="text-green-500 font-bold text-lg">{service.price}</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#kontakt"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-green-500 font-semibold group/link"
                >
                  Termin buchen
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 glass rounded-full px-8 py-4">
            <Clock className="w-5 h-5 text-green-500" />
            <span className="text-gray-300">Termine auch kurzfristig verfügbar</span>
            <a
              href="tel:+491728650128"
              className="text-green-500 font-semibold hover:text-green-400 transition-colors"
            >
              Jetzt anrufen
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
