"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock,
  Instagram, Facebook, MessageCircle,
  ChevronRight, Send
} from "lucide-react";
import Link from "next/link";
import ContactFormModal from "./ContactFormModal";

const quickLinks = [
  { name: "Start", href: "/" },
  { name: "Auto Ankauf", href: "/ankauf" },
  { name: "Service", href: "/service" },
  { name: "Fahrzeuge", href: "/fahrzeuge" },
];

const services = [
  { name: "Auto Ankauf", href: "/ankauf" },
  { name: "Reifenwechsel", href: "/service" },
  { name: "Fahrzeugaufbereitung", href: "/service" },
  { name: "Fahrzeugverkauf", href: "/fahrzeuge" },
  { name: "Termin buchen", href: "/service" },
];

export default function Footer() {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
      <ContactFormModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        type="general"
      />
      <footer
        id="kontakt"
        className="bg-gradient-to-b from-gray-950 to-black relative overflow-hidden pb-20 lg:pb-0"
        role="contentinfo"
      >
        {/* Top Border */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#6cb036]/50 to-transparent" aria-hidden="true" />

        {/* Main Footer - Mobile First */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <Link href="/" className="inline-block mb-4 sm:mb-6" aria-label="CarCenter Landshut - Startseite">
                <img
                  src="https://brandea.b-cdn.net/CarcenterLandshut/logo-transparent.webp"
                  alt="CarCenter Landshut Logo"
                  className="h-16 sm:h-20 lg:h-24 w-auto"
                  loading="lazy"
                />
              </Link>
              <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Wir sind Ihr Autohaus in Landshut. Ihr zuverlässiger Partner für Fahrzeugankauf, Verkauf und Service.
              </p>
              {/* Social Links */}
              <div className="flex gap-3" role="list" aria-label="Soziale Medien">
                <a
                  href="https://www.instagram.com/carcenterlandshut/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#6cb036] hover:text-white transition-all touch-target"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61576748729748"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#6cb036] hover:text-white transition-all touch-target"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://wa.me/491728650128"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#6cb036] hover:text-white transition-all touch-target"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              aria-labelledby="footer-links"
            >
              <h3 id="footer-links" className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">
                Quick Links
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#6cb036] transition-colors flex items-center gap-2 group py-1 touch-target text-sm sm:text-base"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* Services */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              aria-labelledby="footer-services"
            >
              <h3 id="footer-services" className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">
                Services
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-gray-400 hover:text-[#6cb036] transition-colors flex items-center gap-2 py-1 touch-target text-sm sm:text-base"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6cb036]" aria-hidden="true" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">Kontakt</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <a
                    href="https://maps.google.com/?q=Niedermayerstr.+44,+84028+Landshut"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-gray-400 hover:text-[#6cb036] transition-colors py-1 touch-target text-sm sm:text-base"
                    aria-label="Adresse auf Google Maps öffnen"
                  >
                    <MapPin className="w-5 h-5 text-[#6cb036] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Niedermayerstr. 44<br />84028 Landshut</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+491728650128"
                    className="flex items-center gap-3 text-gray-400 hover:text-[#6cb036] transition-colors py-1 touch-target text-sm sm:text-base"
                    aria-label="Anrufen: +49 172 8650128"
                  >
                    <Phone className="w-5 h-5 text-[#6cb036]" aria-hidden="true" />
                    <span>+49 172 8650128</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:carcenterlandshut@gmail.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-[#6cb036] transition-colors py-1 touch-target text-sm sm:text-base"
                    aria-label="E-Mail senden"
                  >
                    <Mail className="w-5 h-5 text-[#6cb036]" aria-hidden="true" />
                    <span className="break-all">carcenterlandshut@gmail.com</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400 text-sm sm:text-base">
                  <Clock className="w-5 h-5 text-[#6cb036] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Mo-Fr: 9:00 - 18:00<br />Sa: 10:00 - 14:00</span>
                </li>
                <li className="pt-2 sm:pt-4">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowContactModal(true)}
                    className="w-full bg-gradient-to-r from-[#6cb036] to-[#5a9a2d] text-white px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#6cb036]/25 transition-all touch-target text-sm sm:text-base"
                    aria-label="Kontaktformular öffnen"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    Nachricht senden
                  </motion.button>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
                © 2025 CarCenter Landshut | Erstellt von{" "}
                <a
                  href="https://brandea.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6cb036] hover:text-[#7ec843] transition-colors"
                >
                  Brandea
                </a>{" "}
                ®
              </p>
              <nav className="flex gap-4 sm:gap-6 text-xs sm:text-sm" aria-label="Rechtliche Links">
                <Link href="/impressum" className="text-gray-500 hover:text-[#6cb036] transition-colors py-1 touch-target">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="text-gray-500 hover:text-[#6cb036] transition-colors py-1 touch-target">
                  Datenschutz
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
