"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Car, ShoppingCart, Star, Award } from "lucide-react";

const stats = [
  {
    icon: Car,
    value: 750,
    suffix: "+",
    label: "Verkauft",
    description: "Fahrzeuge",
  },
  {
    icon: ShoppingCart,
    value: 900,
    suffix: "+",
    label: "Angekauft",
    description: "Fahrzeuge",
  },
  {
    icon: Star,
    value: 9.8,
    suffix: "/10",
    label: "Bewertung",
    description: "Kunden",
  },
  {
    icon: Award,
    value: 5,
    suffix: "+",
    label: "Jahre",
    description: "Erfahrung",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const displayValue = Number.isInteger(value) ? Math.floor(count) : count.toFixed(1);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header - Compact on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-10 lg:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 px-2">
            Unsere <span className="text-[#6cb036]">Kundenzufriedenheit</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm lg:text-base max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-2">
            Wir verbessern kontinuierlich unsere Leistungen für optimale Kundenzufriedenheit.
          </p>
        </motion.div>

        {/* Stats Grid - Compact 2x2 on Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-5 lg:p-6 h-full">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#6cb036]/20 to-[#5a9a2d]/20 mb-2 sm:mb-3">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#6cb036]" aria-hidden="true" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white font-semibold text-xs sm:text-sm">{stat.label}</div>
                <div className="text-gray-500 text-[10px] sm:text-xs">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
