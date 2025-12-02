"use client";

import { motion } from "framer-motion";
import { Users, Gauge, DoorOpen, Car, ExternalLink, ChevronRight } from "lucide-react";

const vehicles = [
  {
    id: 1,
    name: "VW Golf VII",
    price: "8.290",
    year: "2018",
    km: "89.000 km",
    fuel: "Diesel",
    power: "115 PS",
    seats: 5,
    doors: 5,
    type: "Kompaktwagen",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Mitsubishi Space Star",
    price: "3.490",
    year: "2016",
    km: "67.000 km",
    fuel: "Benzin",
    power: "80 PS",
    seats: 5,
    doors: 5,
    type: "Kleinwagen",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Mini J.C. Works Clubman",
    price: "6.790",
    year: "2017",
    km: "92.000 km",
    fuel: "Benzin",
    power: "192 PS",
    seats: 5,
    doors: 5,
    type: "Kompaktwagen",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
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

export default function Fahrzeuge() {
  return (
    <section id="fahrzeuge" className="section-padding bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-green-500 font-semibold tracking-wider uppercase text-sm">
            Fahrzeugbestand
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
            Unsere <span className="gradient-text">Fahrzeuge</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Entdecken Sie unsere handverlesene Auswahl an Qualitätsfahrzeugen. Jedes Fahrzeug geprüft und startklar.
          </p>
        </motion.div>

        {/* Vehicles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass rounded-3xl overflow-hidden transition-all duration-300 hover:border-green-500/30">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                    {vehicle.price}€
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-sm text-white">
                    {vehicle.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Name */}
                  <h3 className="text-xl font-bold text-white mb-2">{vehicle.name}</h3>

                  {/* Quick Info */}
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                    <span>{vehicle.km}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span>{vehicle.fuel}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span>{vehicle.power}</span>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    <div className="flex flex-col items-center p-2 bg-gray-900/50 rounded-xl">
                      <Users className="w-4 h-4 text-green-500 mb-1" />
                      <span className="text-xs text-gray-400">{vehicle.seats}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-900/50 rounded-xl">
                      <Gauge className="w-4 h-4 text-green-500 mb-1" />
                      <span className="text-xs text-gray-400">{vehicle.power}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-900/50 rounded-xl">
                      <DoorOpen className="w-4 h-4 text-green-500 mb-1" />
                      <span className="text-xs text-gray-400">{vehicle.doors}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-900/50 rounded-xl">
                      <Car className="w-4 h-4 text-green-500 mb-1" />
                      <span className="text-xs text-gray-400 truncate">{vehicle.type.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all"
                  >
                    Details ansehen
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://www.mobile.de"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 glass px-8 py-4 rounded-full text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Alle Fahrzeuge auf mobile.de
            <ExternalLink className="w-5 h-5 text-green-500" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
