"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Car, Phone, Mail, MapPin, Clock,
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
  const currentYear = new Date().getFullYear();
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
    <ContactFormModal
      isOpen={showContactModal}
      onClose={() => setShowContactModal(false)}
      type="general"
    />
    <footer id="kontakt" className="bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Top Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Car</span>
                <span className="text-xl font-bold text-green-500">Center</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Wir sind Ihr Autohaus in Landshut. Ihr zuverlässiger Partner für Fahrzeugankauf, Verkauf und Service.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/carcenterlandshut"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/491728650128"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-green-500 transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-green-500 transition-colors flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-lg mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=Niedermayerstr.+44,+84028+Landshut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 hover:text-green-500 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Niedermayerstr. 44<br />84028 Landshut</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+491728650128"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Phone className="w-5 h-5 text-green-500" />
                  <span>+49 172 8650128</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:carcenterlandshut@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Mail className="w-5 h-5 text-green-500" />
                  <span>carcenterlandshut@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Clock className="w-5 h-5 text-green-500" />
                <span>Mo-Fr: 9:00 - 18:00<br />Sa: 10:00 - 14:00</span>
              </li>
              <li className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Nachricht senden
                </motion.button>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              Copyright 2025 - CarCenter | Erstellt von <a href="https://brandea.de" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400">Brandea</a> ®
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/impressum" className="text-gray-500 hover:text-green-500 transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-gray-500 hover:text-green-500 transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
