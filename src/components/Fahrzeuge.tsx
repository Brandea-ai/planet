"use client";

import { motion } from "framer-motion";
import { Users, Gauge, DoorOpen, Car, ExternalLink, ChevronRight } from "lucide-react";

const vehicles = [
  {
    id: 1,
    name: "Mercedes-Benz AMG GT GTS",
    price: "69.990",
    year: "2016",
    km: "93.000 km",
    fuel: "Benzin",
    power: "510 PS",
    seats: 2,
    doors: 2,
    type: "Sportwagen",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "BMW 440i",
    price: "39.990",
    year: "2017",
    km: "28.000 km",
    fuel: "Benzin",
    power: "326 PS",
    seats: 4,
    doors: 2,
    type: "Limousine",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "BMW 530d M-Paket",
    price: "29.990",
    year: "2019",
    km: "148.000 km",
    fuel: "Diesel",
    power: "265 PS",
    seats: 5,
    doors: 4,
    type: "Limousine",
    image: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Mercedes-Benz A 35 AMG 4MATIC",
    price: "29.990",
    year: "2019",
    km: "77.000 km",
    fuel: "Benzin",
    power: "306 PS",
    seats: 5,
    doors: 5,
    type: "Limousine",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Audi Q5 2.0 TDI Quattro S-Line",
    price: "27.990",
    year: "2017",
    km: "132.000 km",
    fuel: "Diesel",
    power: "190 PS",
    seats: 5,
    doors: 5,
    type: "SUV",
    image: "https://images.unsplash.com/photo-1606664913919-86d67eaa5a69?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Audi A6 3.0 TDI Quattro S-Line",
    price: "23.990",
    year: "2017",
    km: "125.000 km",
    fuel: "Diesel",
    power: "272 PS",
    seats: 5,
    doors: 4,
    type: "Kombi",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Audi A3 2.0 TDI S-Line",
    price: "21.990",
    year: "2016",
    km: "126.000 km",
    fuel: "Diesel",
    power: "150 PS",
    seats: 5,
    doors: 4,
    type: "Limousine",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    name: "BMW 420d Coupé M-Paket",
    price: "21.990",
    year: "2018",
    km: "141.000 km",
    fuel: "Diesel",
    power: "190 PS",
    seats: 4,
    doors: 2,
    type: "Coupé",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    name: "BMW 320d Luxury",
    price: "21.990",
    year: "2016",
    km: "64.000 km",
    fuel: "Diesel",
    power: "190 PS",
    seats: 5,
    doors: 4,
    type: "Limousine",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
  },
  {
    id: 10,
    name: "Audi Q2 1.4 TFSI S-Line",
    price: "20.990",
    year: "2017",
    km: "90.000 km",
    fuel: "Benzin",
    power: "150 PS",
    seats: 5,
    doors: 5,
    type: "SUV",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=400&fit=crop",
  },
  {
    id: 11,
    name: "VW Tiguan 2.0 TDI Highline 4Motion",
    price: "20.990",
    year: "2016",
    km: "125.000 km",
    fuel: "Diesel",
    power: "150 PS",
    seats: 5,
    doors: 5,
    type: "SUV",
    image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=600&h=400&fit=crop",
  },
  {
    id: 12,
    name: "BMW X1 20d xDrive M-Paket",
    price: "20.990",
    year: "2017",
    km: "135.000 km",
    fuel: "Diesel",
    power: "190 PS",
    seats: 5,
    doors: 5,
    type: "SUV",
    image: "https://images.unsplash.com/photo-1615063029854-6e4c3fc0d5b0?w=600&h=400&fit=crop",
  },
  {
    id: 13,
    name: "Audi A4 2.0 TDI S-Line",
    price: "19.990",
    year: "2016",
    km: "128.000 km",
    fuel: "Diesel",
    power: "190 PS",
    seats: 5,
    doors: 4,
    type: "Kombi",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
  },
  {
    id: 14,
    name: "BMW 320d M-Paket Panorama",
    price: "19.990",
    year: "2016",
    km: "129.000 km",
    fuel: "Diesel",
    power: "190 PS",
    seats: 5,
    doors: 4,
    type: "Kombi",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
  },
  {
    id: 15,
    name: "BMW 120i M-Paket Shadow",
    price: "18.990",
    year: "2019",
    km: "120.000 km",
    fuel: "Benzin",
    power: "184 PS",
    seats: 5,
    doors: 5,
    type: "Limousine",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
  },
  {
    id: 16,
    name: "VW Tiguan 2.0 TSI Highline 4Motion",
    price: "18.890",
    year: "2017",
    km: "130.000 km",
    fuel: "Benzin",
    power: "179 PS",
    seats: 5,
    doors: 5,
    type: "SUV",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=600&h=400&fit=crop",
  },
  {
    id: 17,
    name: "BMW 318d Sport",
    price: "17.990",
    year: "2016",
    km: "132.000 km",
    fuel: "Diesel",
    power: "150 PS",
    seats: 5,
    doors: 4,
    type: "Limousine",
    image: "https://images.unsplash.com/photo-1549925545-510eb9a28ad6?w=600&h=400&fit=crop",
  },
  {
    id: 18,
    name: "Audi A5 Sportback 2.0 TDI S-Line",
    price: "16.990",
    year: "2017",
    km: "112.000 km",
    fuel: "Diesel",
    power: "190 PS",
    seats: 5,
    doors: 5,
    type: "Limousine",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=600&h=400&fit=crop",
  },
  {
    id: 19,
    name: "VW Tiguan 2.0 TDI 4Motion",
    price: "14.990",
    year: "2013",
    km: "112.000 km",
    fuel: "Diesel",
    power: "140 PS",
    seats: 5,
    doors: 5,
    type: "SUV",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
  },
  {
    id: 20,
    name: "BMW 220d Active Tourer",
    price: "13.990",
    year: "2017",
    km: "136.000 km",
    fuel: "Diesel",
    power: "190 PS",
    seats: 5,
    doors: 5,
    type: "Van",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
  },
  {
    id: 21,
    name: "MINI Cooper Automatik",
    price: "6.990",
    year: "2009",
    km: "174.000 km",
    fuel: "Benzin",
    power: "120 PS",
    seats: 4,
    doors: 3,
    type: "Cabrio",
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
            Unsere <span className="text-green-500">Fahrzeuge</span>
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
            href="https://www.autoscout24.de/haendler/carcenter-landshut"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 glass px-8 py-4 rounded-full text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Alle Fahrzeuge auf AutoScout24
            <ExternalLink className="w-5 h-5 text-green-500" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
