"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Car, Wrench, BadgeCheck, Calculator } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Ankauf",
    subtitle: "Auto Ankauf",
    description: "Unsere Vorzüge sind zügige und gerechte Leistungen",
    cta: "Jetzt Verkaufen",
    href: "/ankauf",
    icon: Car,
    image: "https://brandea.b-cdn.net/CarcenterLandshut/startseite-ankauf-hero.webp",
  },
  {
    id: 2,
    title: "Kalkulator",
    subtitle: "Fahrzeugwert-Rechner",
    description: "Ermitteln Sie den Wert Ihres Fahrzeugs - kostenlos und unverbindlich",
    cta: "Wert berechnen",
    href: "/kalkulator",
    icon: Calculator,
    image: "",
  },
  {
    id: 3,
    title: "Service",
    subtitle: "Reifenwechsel und Aufbereitung",
    description: "Reifenwechsel und Aufbereitung",
    cta: "Termin buchen",
    href: "/service",
    icon: Wrench,
    image: "https://brandea.b-cdn.net/CarcenterLandshut/startseite-service-hero.webp",
  },
  {
    id: 4,
    title: "CarCenter",
    subtitle: "Landshut",
    description: "Bayern's Nr 1 Auto Service",
    cta: "Unsere Produkte",
    href: "/fahrzeuge",
    icon: BadgeCheck,
    image: "https://brandea.b-cdn.net/CarcenterLandshut/bild-startseite-carcenter-landshut.webp",
  },
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[500px] lg:min-h-[700px] overflow-hidden"
      aria-label="Hauptbanner"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />

      {/* Carousel */}
      <div className="relative h-full touch-pan-y" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
              {/* Background Image or Gradient */}
              <div className="absolute inset-0">
                {slide.image ? (
                  <img
                    src={slide.image}
                    alt=""
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    aria-hidden="true"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900" />
                )}
                {/* Premium Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
              </div>

              {/* Content - Mobile First */}
              <div className="relative h-full flex items-center justify-center px-4 sm:px-6 pt-16 pb-24 lg:pt-20 lg:pb-16">
                <div className="max-w-5xl mx-auto text-center">
                  <AnimatePresence mode="wait">
                    {selectedIndex === index && (
                      <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Icon - Smaller on Mobile */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#6cb036] to-[#5a9a2d] mb-3 sm:mb-4 lg:mb-6 shadow-lg shadow-[#6cb036]/30"
                          aria-hidden="true"
                        >
                          <slide.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-[#6cb036] font-semibold tracking-wider uppercase text-xs sm:text-sm mb-2 sm:mb-3 lg:mb-4"
                        >
                          {slide.subtitle}
                        </motion.p>

                        {/* Title - Responsive */}
                        <motion.h1
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                        >
                          {slide.title}
                        </motion.h1>

                        {/* Description - Responsive */}
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10 leading-relaxed"
                        >
                          {slide.description}
                        </motion.p>

                        {/* CTA Button - Touch Friendly */}
                        <Link href={slide.href}>
                          <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6cb036] to-[#5a9a2d] text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg shadow-[#6cb036]/30 active:scale-95 transition-transform cursor-pointer touch-target"
                          >
                            {slide.cta}
                            <ChevronRight className="w-5 h-5" aria-hidden="true" />
                          </motion.span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Hidden on Mobile, Touch Swipe instead */}
      <button
        onClick={scrollPrev}
        className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full glass items-center justify-center text-white hover:bg-white/10 transition-colors z-10 touch-target"
        aria-label="Vorheriges Slide"
      >
        <ChevronLeft className="w-6 h-6" aria-hidden="true" />
      </button>
      <button
        onClick={scrollNext}
        className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full glass items-center justify-center text-white hover:bg-white/10 transition-colors z-10 touch-target"
        aria-label="Nächstes Slide"
      >
        <ChevronRight className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Dots - Positioned above bottom nav on mobile */}
      <div
        className="absolute bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10"
        role="tablist"
        aria-label="Slide Navigation"
      >
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 sm:h-3 rounded-full transition-all duration-300 touch-target ${
              selectedIndex === index
                ? "bg-[#6cb036] w-6 sm:w-8"
                : "bg-white/30 w-2 sm:w-3 hover:bg-white/50"
            }`}
            role="tab"
            aria-selected={selectedIndex === index}
            aria-label={`Slide ${index + 1}: ${slide.title}`}
          />
        ))}
      </div>

      {/* Scroll Indicator - Desktop Only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-8 hidden lg:block z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-gray-400 text-sm flex flex-col items-center gap-2"
        >
          <span className="rotate-90 origin-center">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#6cb036] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
