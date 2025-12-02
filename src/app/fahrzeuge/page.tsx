"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Gauge, DoorOpen, Car, Fuel, Calendar, ExternalLink, Phone } from "lucide-react";

const vehicles = [
  {
    id: 1,
    name: "VW Golf VII",
    price: "8.290",
    year: "2018",
    km: "89.000 km",
    fuel: "Diesel",
    power: "115 PS",
    transmission: "Schaltgetriebe",
    seats: 5,
    doors: 5,
    type: "Kompaktwagen",
    color: "Grau Metallic",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop",
    features: ["Klimaautomatik", "Navigationssystem", "Einparkhilfe", "Sitzheizung"],
  },
  {
    id: 2,
    name: "Mitsubishi Space Star",
    price: "3.490",
    year: "2016",
    km: "67.000 km",
    fuel: "Benzin",
    power: "80 PS",
    transmission: "Schaltgetriebe",
    seats: 5,
    doors: 5,
    type: "Kleinwagen",
    color: "Weiß",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    features: ["Klimaanlage", "Bluetooth", "Isofix", "Start-Stop"],
  },
  {
    id: 3,
    name: "Mini J.C. Works Clubman",
    price: "6.790",
    year: "2017",
    km: "92.000 km",
    fuel: "Benzin",
    power: "192 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "Kompaktwagen",
    color: "British Racing Green",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    features: ["Sportfahrwerk", "Lederausstattung", "LED Scheinwerfer", "JCW Paket"],
  },
  {
    id: 4,
    name: "BMW 320d Touring",
    price: "12.990",
    year: "2019",
    km: "78.000 km",
    fuel: "Diesel",
    power: "190 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "Kombi",
    color: "Schwarz",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    features: ["M-Sportpaket", "Head-Up Display", "Panoramadach", "Vollausstattung"],
  },
  {
    id: 5,
    name: "Mercedes-Benz A 180",
    price: "15.490",
    year: "2020",
    km: "45.000 km",
    fuel: "Benzin",
    power: "136 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "Kompaktwagen",
    color: "Polarweiß",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    features: ["MBUX System", "AMG Line", "Rückfahrkamera", "Ambiente Beleuchtung"],
  },
  {
    id: 6,
    name: "Audi A4 Avant 2.0 TDI",
    price: "18.990",
    year: "2019",
    km: "62.000 km",
    fuel: "Diesel",
    power: "150 PS",
    transmission: "S tronic",
    seats: 5,
    doors: 5,
    type: "Kombi",
    color: "Navarrablau",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    features: ["Virtual Cockpit", "S line", "Matrix LED", "B&O Sound"],
  },
];

export default function FahrzeugePage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-green-500 font-semibold tracking-wider uppercase text-sm">
              Fahrzeugbestand
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4 mb-6">
              Unsere <span className="gradient-text">Fahrzeuge</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Entdecken Sie unsere handverlesene Auswahl an Qualitätsfahrzeugen. Jedes Fahrzeug wird geprüft und ist sofort startklar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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

                    <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                      {vehicle.price}€
                    </div>

                    <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-sm text-white">
                      {vehicle.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{vehicle.name}</h3>

                    <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {vehicle.km}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className="flex items-center gap-1">
                        <Fuel className="w-4 h-4" />
                        {vehicle.fuel}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span>{vehicle.power}</span>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
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
                        <span className="text-xs text-gray-400 truncate">{vehicle.transmission.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Quick Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {vehicle.features.slice(0, 3).map((feature) => (
                        <span key={feature} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-lg">
                          {feature}
                        </span>
                      ))}
                      {vehicle.features.length > 3 && (
                        <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-lg">
                          +{vehicle.features.length - 3} mehr
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3">
                      <a
                        href="tel:+491728650128"
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-center flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        Anrufen
                      </a>
                      <button className="py-3 px-4 rounded-xl border border-gray-700 text-gray-300 hover:border-green-500 hover:text-green-500 transition-all">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All on Mobile.de */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-6">
              Mehr Fahrzeuge finden Sie auf mobile.de
            </p>
            <a
              href="https://www.mobile.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 glass px-8 py-4 rounded-full text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Alle Fahrzeuge auf mobile.de
              <ExternalLink className="w-5 h-5 text-green-500" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
