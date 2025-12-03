"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Car, Calculator, Wrench, Phone, Menu, X } from "lucide-react";
import Link from "next/link";
import ContactFormModal from "./ContactFormModal";

const navItems = [
  { name: "Start", href: "/", icon: Home },
  { name: "Ankauf", href: "/ankauf", icon: Car },
  { name: "Kalkulator", href: "/kalkulator", icon: Calculator },
  { name: "Service", href: "/service", icon: Wrench },
  { name: "Kontakt", href: "#", icon: Phone, isContact: true },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < 100) {
        // Always show near top
        setIsNavVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        // Scrolling down (with threshold to prevent jitter)
        setIsNavVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Zum Hauptinhalt springen
      </a>

      <ContactFormModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        type="general"
      />

      {/* Desktop Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden lg:block ${
          isScrolled ? "glass py-2" : "bg-black/50 backdrop-blur-sm py-4"
        } ${isNavVisible ? "translate-y-0" : "-translate-y-full"}`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center" aria-label="CarCenter Landshut - Startseite">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
                <img
                  src="https://brandea.b-cdn.net/CarcenterLandshut/logo-transparent.webp"
                  alt="CarCenter Landshut Logo"
                  className="h-20 w-auto"
                  loading="eager"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center" role="navigation" aria-label="Hauptnavigation">
              <div className="flex items-center bg-white/5 backdrop-blur-md rounded-full p-1.5 border border-white/10">
                {navItems.map((item) => {
                  const active = !item.isContact && isActive(item.href);
                  return item.isContact ? (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item)}
                      className="relative px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 rounded-full touch-target"
                      aria-label="Kontakt öffnen"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative px-5 py-2.5 text-sm font-medium transition-all duration-200 rounded-full touch-target"
                      aria-current={active ? "page" : undefined}
                    >
                      {active && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-[#6cb036] rounded-full"
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
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+491728650128"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors touch-target"
                aria-label="Anrufen: +49 172 8650128"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm">+49 172 8650128</span>
              </motion.a>
              <Link href="/ankauf">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-gradient-to-r from-[#6cb036] to-[#5a9a2d] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#6cb036]/25 transition-all duration-300"
                >
                  Jetzt Verkaufen
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Header - Top */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${
          isScrolled ? "glass py-2" : "bg-black/80 backdrop-blur-md py-3"
        } ${isNavVisible ? "translate-y-0" : "-translate-y-full"}`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
        role="banner"
      >
        <div className="px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" aria-label="CarCenter Landshut - Startseite">
              <img
                src="https://brandea.b-cdn.net/CarcenterLandshut/logo-transparent.webp"
                alt="CarCenter Landshut Logo"
                className="h-12 w-auto"
                loading="eager"
              />
            </Link>

            {/* Mobile CTA & Menu */}
            <div className="flex items-center gap-2">
              <motion.a
                whileTap={{ scale: 0.95 }}
                href="tel:+491728650128"
                className="w-10 h-10 rounded-full bg-[#6cb036] flex items-center justify-center text-white touch-target"
                aria-label="Anrufen"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
              </motion.a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white touch-target"
                aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Bottom Navigation - App Style */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden glass border-t border-white/10 transition-transform duration-300 ${
          isNavVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        role="navigation"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const active = !item.isContact && isActive(item.href);
            const Icon = item.icon;

            return item.isContact ? (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all touch-target"
                aria-label="Kontakt öffnen"
              >
                <Icon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                <span className="text-[10px] mt-1 text-gray-400 font-medium">{item.name}</span>
              </button>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all touch-target ${
                  active ? "text-[#6cb036]" : "text-gray-400"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <motion.div
                  animate={active ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className={`w-6 h-6 ${active ? "text-[#6cb036]" : ""}`} aria-hidden="true" />
                </motion.div>
                <span className={`text-[10px] mt-1 font-medium ${active ? "text-[#6cb036]" : ""}`}>
                  {item.name}
                </span>
                {active && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute -bottom-0 w-12 h-1 bg-[#6cb036] rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center px-8"
              style={{ paddingTop: "calc(4rem + env(safe-area-inset-top))" }}
            >
              <nav className="flex flex-col items-center gap-6 w-full max-w-sm">
                {navItems.map((item, index) => {
                  const active = !item.isContact && isActive(item.href);
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="w-full"
                    >
                      {item.isContact ? (
                        <button
                          onClick={() => handleNavClick(item)}
                          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium text-lg transition-all active:scale-[0.98]"
                        >
                          <Icon className="w-6 h-6 text-[#6cb036]" />
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all active:scale-[0.98] ${
                            active
                              ? "bg-[#6cb036] border-[#6cb036] text-white"
                              : "bg-white/5 border-white/10 text-white"
                          }`}
                        >
                          <Icon className={`w-6 h-6 ${active ? "text-white" : "text-[#6cb036]"}`} />
                          <span className="font-medium text-lg">{item.name}</span>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full mt-4"
                >
                  <Link
                    href="/ankauf"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#6cb036] to-[#5a9a2d] text-white font-semibold text-lg shadow-lg shadow-[#6cb036]/30"
                  >
                    <Car className="w-6 h-6" />
                    Jetzt Auto Verkaufen
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
