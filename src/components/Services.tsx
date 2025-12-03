"use client";

import { motion } from "framer-motion";
import { Wrench, Car, ShoppingCart, BadgeDollarSign, Shield, Sofa, Headphones, ChevronRight } from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    icon: BadgeDollarSign,
    title: "Preis-Leistungs-Verhältnis",
    description: "Bei uns finden Sie Fahrzeuge, die ein hervorragendes Preis-Leistungs-Verhältnis bieten. Wir stellen sicher, dass Sie für Ihr Geld die bestmögliche Qualität erhalten. Unsere Angebote sind fair kalkuliert, sodass Sie sicher sein können, einen guten Deal zu machen.",
  },
  {
    icon: Shield,
    title: "Zuverlässigkeit und Sicherheit",
    description: "Ihre Sicherheit und die Zuverlässigkeit unserer Fahrzeuge stehen bei uns an erster Stelle. Jedes Auto in unserem Sortiment ist gründlich geprüft und erfüllt die höchsten Sicherheitsstandards.",
  },
  {
    icon: Sofa,
    title: "Ausstattung und Komfort",
    description: "Unsere Fahrzeuge bieten Ihnen hochwertige Innenausstattung und moderne Infotainment-Systeme für maximalen Komfort und Fahrgenuss.",
  },
  {
    icon: Headphones,
    title: "Kundendienst und Garantie",
    description: "Seit über 4 Jahren bieten wir unseren Kunden durch langjährige Erfahrung und zahlreiche Zertifizierungen zuverlässige und hochwertige Dienstleistungen.",
  },
];

const services = [
  {
    icon: Wrench,
    title: "Service",
    description: "Reifenpflege und professionelle Aufbereitung",
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
    description: "Verkaufen Sie Ihr Fahrzeug schnell und fair",
    href: "/ankauf",
    cta: "Jetzt verkaufen",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-#6cb036/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Highlights Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-#6cb036 font-semibold tracking-wider uppercase text-sm">
            Warum wir?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Unsere <span className="text-#6cb036">Leistungen</span>
          </h2>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {highlights.map((highlight) => (
            <motion.div
              key={highlight.title}
              variants={itemVariants}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-#6cb036/20 to-#5a9a2d/20 flex items-center justify-center flex-shrink-0">
                  <highlight.icon className="w-7 h-7 text-#6cb036" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{highlight.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{highlight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Unsere <span className="text-#6cb036">Services</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="h-full glass rounded-3xl p-8 transition-all duration-300 hover:border-#6cb036/30 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-#6cb036 to-#5a9a2d flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>

                <Link href={service.href}>
                  <span className="inline-flex items-center gap-2 text-#6cb036 font-semibold group-hover:text-[#7ec843] transition-colors cursor-pointer">
                    {service.cta}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
