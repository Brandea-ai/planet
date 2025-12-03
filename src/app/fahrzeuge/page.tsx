"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Gauge, DoorOpen, Car, Fuel, Calendar, ExternalLink, Phone } from "lucide-react";

const vehicles = [
  {
    id: 1,
    name: "Mercedes-Benz AMG GT GTS",
    price: "69.990",
    year: "2016",
    km: "93.000 km",
    fuel: "Benzin",
    power: "510 PS",
    transmission: "Automatik",
    seats: 2,
    doors: 2,
    type: "Sportwagen",
    color: "Iridium Silber",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    features: ["Night-Paket", "Burmester", "Panoramadach", "Keyless"],
  },
  {
    id: 2,
    name: "BMW 440i",
    price: "39.990",
    year: "2017",
    km: "28.000 km",
    fuel: "Benzin",
    power: "326 PS",
    transmission: "Automatik",
    seats: 4,
    doors: 4,
    type: "Limousine",
    color: "Mineralgrau",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    features: ["Memory", "CarPlay", "Spurhalte", "Leder"],
  },
  {
    id: 3,
    name: "BMW 530d M-Paket",
    price: "29.990",
    year: "2019",
    km: "148.000 km",
    fuel: "Diesel",
    power: "265 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 4,
    type: "Limousine",
    color: "Schwarz",
    image: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?w=800&h=600&fit=crop",
    features: ["Schiebedach", "Ambiente", "Navi", "Leder"],
  },
  {
    id: 4,
    name: "Mercedes-Benz A 35 AMG 4MATIC",
    price: "29.990",
    year: "2019",
    km: "77.000 km",
    fuel: "Benzin",
    power: "306 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "Limousine",
    color: "Kosmos Schwarz",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    features: ["360° Kamera", "LED", "Standheizung", "Night-Paket"],
  },
  {
    id: 5,
    name: "Audi Q5 2.0 TDI Quattro S-Line",
    price: "27.990",
    year: "2017",
    km: "132.000 km",
    fuel: "Diesel",
    power: "190 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "SUV",
    color: "Daytonagrau",
    image: "https://images.unsplash.com/photo-1606664913919-86d67eaa5a69?w=800&h=600&fit=crop",
    features: ["3xS-Line", "Virtual Cockpit", "Kamera", "MwSt. ausw."],
  },
  {
    id: 6,
    name: "Audi A6 3.0 TDI Quattro S-Line",
    price: "23.990",
    year: "2017",
    km: "125.000 km",
    fuel: "Diesel",
    power: "272 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 4,
    type: "Kombi",
    color: "Daytonagrau",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=600&fit=crop",
    features: ["3xS-Line", "ACC", "Rückfahrkamera", "AHK"],
  },
  {
    id: 7,
    name: "Audi A3 2.0 TDI S-Line",
    price: "21.990",
    year: "2016",
    km: "126.000 km",
    fuel: "Diesel",
    power: "150 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 4,
    type: "Limousine",
    color: "Navarrablau",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop",
    features: ["3xS-Line", "Matrix", "Virtual Cockpit", "Bang & Olufsen"],
  },
  {
    id: 8,
    name: "BMW 420d Coupé M-Paket",
    price: "21.990",
    year: "2018",
    km: "141.000 km",
    fuel: "Diesel",
    power: "190 PS",
    transmission: "Automatik",
    seats: 4,
    doors: 2,
    type: "Coupé",
    color: "Saphirschwarz",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=600&fit=crop",
    features: ["M-Paket", "Kamera", "LED", "Alcantara"],
  },
  {
    id: 9,
    name: "BMW 320d Luxury",
    price: "21.990",
    year: "2016",
    km: "64.000 km",
    fuel: "Diesel",
    power: "190 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 4,
    type: "Limousine",
    color: "Imperialblau",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop",
    features: ["Luxury Line", "Kamera", "Head-Up", "Leder"],
  },
  {
    id: 10,
    name: "Audi Q2 1.4 TFSI S-Line",
    price: "20.990",
    year: "2017",
    km: "90.000 km",
    fuel: "Benzin",
    power: "150 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "SUV",
    color: "Navarrablau",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop",
    features: ["3xS-Line", "Navi", "CarPlay", "LED"],
  },
  {
    id: 11,
    name: "VW Tiguan 2.0 TDI Highline 4Motion",
    price: "20.990",
    year: "2016",
    km: "125.000 km",
    fuel: "Diesel",
    power: "150 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "SUV",
    color: "Deep Black",
    image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&h=600&fit=crop",
    features: ["Virtual Cockpit", "Kamera", "4Motion", "Highline"],
  },
  {
    id: 12,
    name: "BMW X1 20d xDrive M-Paket",
    price: "20.990",
    year: "2017",
    km: "135.000 km",
    fuel: "Diesel",
    power: "190 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "SUV",
    color: "Mineralgrau",
    image: "https://images.unsplash.com/photo-1615063029854-6e4c3fc0d5b0?w=800&h=600&fit=crop",
    features: ["M-Paket Shadow", "Kamera", "Alcantara", "xDrive"],
  },
  {
    id: 13,
    name: "Audi A4 2.0 TDI S-Line",
    price: "19.990",
    year: "2016",
    km: "128.000 km",
    fuel: "Diesel",
    power: "190 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 4,
    type: "Kombi",
    color: "Mythosschwarz",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    features: ["S-Line", "Matrix", "Virtual Cockpit", "AHK"],
  },
  {
    id: 14,
    name: "BMW 320d M-Paket Panorama",
    price: "19.990",
    year: "2016",
    km: "129.000 km",
    fuel: "Diesel",
    power: "190 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 4,
    type: "Kombi",
    color: "Glaciersilber",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
    features: ["M-Paket", "Head-Up", "Pano", "Leder"],
  },
  {
    id: 15,
    name: "BMW 120i M-Paket Shadow",
    price: "18.990",
    year: "2019",
    km: "120.000 km",
    fuel: "Benzin",
    power: "184 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "Limousine",
    color: "Alpinweiß",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    features: ["M-Paket Shadow", "Digital-Tacho", "Navi", "LED"],
  },
  {
    id: 16,
    name: "VW Tiguan 2.0 TSI Highline 4Motion",
    price: "18.890",
    year: "2017",
    km: "130.000 km",
    fuel: "Benzin",
    power: "179 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "SUV",
    color: "Tungsten Silver",
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=600&fit=crop",
    features: ["Highline", "ACC", "CarPlay", "LED"],
  },
  {
    id: 17,
    name: "BMW 318d Sport",
    price: "17.990",
    year: "2016",
    km: "132.000 km",
    fuel: "Diesel",
    power: "150 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 4,
    type: "Limousine",
    color: "Mediterranblau",
    image: "https://images.unsplash.com/photo-1549925545-510eb9a28ad6?w=800&h=600&fit=crop",
    features: ["Sport Line", "Head-Up", "LED", "AHK"],
  },
  {
    id: 18,
    name: "Audi A5 Sportback 2.0 TDI S-Line",
    price: "16.990",
    year: "2017",
    km: "112.000 km",
    fuel: "Diesel",
    power: "190 PS",
    transmission: "Schaltgetriebe",
    seats: 5,
    doors: 5,
    type: "Limousine",
    color: "Manhattangrau",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop",
    features: ["S-Line", "Navi", "Xenon", "19 Zoll"],
  },
  {
    id: 19,
    name: "VW Tiguan 2.0 TDI 4Motion",
    price: "14.990",
    year: "2013",
    km: "112.000 km",
    fuel: "Diesel",
    power: "140 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "SUV",
    color: "Night Blue",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    features: ["Xenon", "Kamera", "Navi", "Klima"],
  },
  {
    id: 20,
    name: "BMW 220d Active Tourer",
    price: "13.990",
    year: "2017",
    km: "136.000 km",
    fuel: "Diesel",
    power: "190 PS",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "Van",
    color: "Sparkling Brown",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
    features: ["Automatik", "Leder", "Navi", "Keyless"],
  },
  {
    id: 21,
    name: "MINI Cooper Automatik",
    price: "6.990",
    year: "2009",
    km: "174.000 km",
    fuel: "Benzin",
    power: "120 PS",
    transmission: "Automatik",
    seats: 4,
    doors: 3,
    type: "Cabrio",
    color: "Pepper White",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    features: ["Leder", "Sitzheizung", "Steuerkette Neu", "Automatik"],
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
              Mehr Fahrzeuge finden Sie auf AutoScout24
            </p>
            <a
              href="https://www.autoscout24.de/haendler/carcenter-landshut"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 glass px-8 py-4 rounded-full text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Alle Fahrzeuge auf AutoScout24
              <ExternalLink className="w-5 h-5 text-green-500" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
