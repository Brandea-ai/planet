"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Car, Users, Star, Award } from "lucide-react";

const stats = [
  {
    icon: Car,
    value: 500,
    suffix: "+",
    label: "Verkaufte Fahrzeuge",
    description: "in 2024",
  },
  {
    icon: Users,
    value: 450,
    suffix: "+",
    label: "Angekaufte Fahrzeuge",
    description: "in 2024",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "Kundenbewertung",
    description: "Google Reviews",
  },
  {
    icon: Award,
    value: 10,
    suffix: "+",
    label: "Jahre Erfahrung",
    description: "seit 2014",
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
    <section className="py-20 bg-gradient-to-r from-green-600 to-green-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold">{stat.label}</div>
              <div className="text-white/70 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
