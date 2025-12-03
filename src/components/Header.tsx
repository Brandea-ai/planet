"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Car } from "lucide-react";
import Link from "next/link";
import ContactFormModal from "./ContactFormModal";

const navItems = [
  { name: "Start", href: "/" },
  { name: "Ankauf", href: "/ankauf" },
  { name: "Kalkulator", href: "/kalkulator" },
  { name: "Service", href: "/service" },
  { name: "Fahrzeuge", href: "/fahrzeuge" },
  { name: "Kontakt", href: "#", isContact: true },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isContact) {
      setShowContactModal(true);
      setIsMobileMenuOpen(false);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <ContactFormModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        type="general"
      />
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-black/50 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Car</span>
                <span className="text-xl font-bold text-green-500">Center</span>
                <p className="text-[10px] text-gray-400 -mt-1">LANDSHUT</p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Premium Tab Style */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center bg-white/5 backdrop-blur-md rounded-full p-1.5 border border-white/10">
              {navItems.map((item) => {
                const active = !item.isContact && isActive(item.href);
                return item.isContact ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="relative px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 rounded-full"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative px-5 py-2 text-sm font-medium transition-all duration-200 rounded-full"
                  >
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-green-500 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={`relative z-10 ${active ? "text-white" : "text-gray-300 hover:text-white"}`}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+491728650128"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+49 172 8650128</span>
            </motion.a>
            <Link href="/ankauf">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                Jetzt Verkaufen
              </motion.span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 mx-4 rounded-2xl overflow-hidden bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <nav className="flex flex-col p-3 gap-1">
              {navItems.map((item) => {
                const active = !item.isContact && isActive(item.href);
                return item.isContact ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className="relative px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      active
                        ? "bg-green-500 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="h-px bg-white/10 my-2" />
              <Link
                href="/ankauf"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl text-center font-semibold shadow-lg shadow-green-500/20"
              >
                Jetzt Verkaufen
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}
