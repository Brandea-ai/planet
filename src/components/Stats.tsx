"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Car, ShoppingCart, Star, Award } from "lucide-react";

const stats = [
  {
    icon: Car,
    value: 150,
    suffix: "+",
    label: "Verkaufte Fahrzeuge",
    description: "2023",
  },
  {
    icon: ShoppingCart,
    value: 200,
    suffix: "+",
    label: "Angekaufte Fahrzeuge",
    description: "2023",
  },
  {
    icon: Star,
    value: 9.8,
    suffix: "/10",
    label: "Kundenrezensionen",
    description: "Bewertung",
  },
  {
    icon: Award,
    value: 4,
    suffix: "+",
    label: "Jahre Erfahrung",
    description: "seit 2020",
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
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Unsere <span className="gradient-text">Kundenzufriedenheit</span> ist unser oberstes Gebot
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Im Laufe unserer Karriere war es stets unser oberstes Ziel, unsere Leistungen, Fähigkeiten und Angebote kontinuierlich zu verbessern, um eine optimale Kundenzufriedenheit zu gewährleisten.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="glass rounded-2xl p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 mb-4">
                  <stat.icon className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white font-semibold">{stat.label}</div>
                <div className="text-gray-500 text-sm">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
