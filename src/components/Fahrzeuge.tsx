"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Gauge, DoorOpen, Car, ExternalLink, ChevronRight, ChevronLeft, X, Phone } from "lucide-react";
import Link from "next/link";

const vehicles = [
  {
    id: 1,
    name: "Mercedes-Benz AMG GT GTS",
    fullName: "Mercedes-Benz AMG GTS NIGHT-PAKET,BURMESTER,PANO,KEYLESS",
    price: "69.990",
    year: "2016",
    km: "93.000 km",
    fuel: "Benzin",
    power: "510 PS",
    powerKW: "375 kW",
    transmission: "Automatik",
    seats: 2,
    doors: 2,
    type: "Sportwagen",
    color: "Iridium Silber",
    hu: "05/2026",
    mobileLink: "https://home.mobile.de/CARCENTERLANDSHUT#des_441594421",
    autoScoutLink: "https://www.autoscout24.de/angebote/mercedes-benz-amg-gt-amg-gts-night-paket-burmester-pano-keyless-benzin-schwarz-cfee2258-bff7-432f-bf95-7f2cd2b4643d",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618843479619-f3d0d81e4d10?w=800&h=600&fit=crop",
    ],
    features: ["Night-Paket", "Burmester", "Panoramadach", "Keyless"],
  },
  {
    id: 2,
    name: "BMW 440i",
    fullName: "BMW 440i DEUTSCH,NO OPF,MEMORY,CAR-PLAY,SPURH,LEDER",
    price: "39.990",
    year: "2017",
    km: "28.000 km",
    fuel: "Benzin",
    power: "326 PS",
    powerKW: "240 kW",
    transmission: "Automatik",
    seats: 4,
    doors: 4,
    type: "Limousine",
    color: "Mineralgrau",
    hu: "04/2027",
    mobileLink: "https://home.mobile.de/CARCENTERLANDSHUT#des_441594585",
    autoScoutLink: "https://www.autoscout24.de/angebote/bmw-440-440i-deutsch-no-opf-memory-car-play-spurh-leder-benzin-blau-1c0d2cfc-90ed-4f5d-83ab-7ff209e3573c",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?w=800&h=600&fit=crop",
    ],
    features: ["Memory", "CarPlay", "Spurhalte", "Leder"],
  },
  {
    id: 3,
    name: "BMW 530d M-Paket",
    fullName: "BMW 530d M-PAKET SCHIEBEDACH,AMBIENTE,NAVI,LEDER,LED",
    price: "29.990",
    year: "2019",
    km: "148.000 km",
    fuel: "Diesel",
    power: "265 PS",
    powerKW: "195 kW",
    transmission: "Automatik",
    seats: 5,
    doors: 4,
    type: "Limousine",
    color: "Schwarz",
    hu: "07/2027",
    mobileLink: "https://home.mobile.de/CARCENTERLANDSHUT#des_441594546",
    autoScoutLink: "https://www.autoscout24.de/angebote/bmw-530-d-m-paket-schiebedach-ambiente-navi-leder-led-diesel-schwarz-f7425f39-5207-4bef-a7eb-188d7ac029bd",
    images: [
      "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop",
    ],
    features: ["Schiebedach", "Ambiente", "Navi", "Leder"],
  },
  {
    id: 4,
    name: "Mercedes-Benz A 35 AMG 4MATIC",
    fullName: "Mercedes-Benz A 35 AMG 4MATIC 360°,LED,STDHZG,NIGHT,SPUR,ALCAN",
    price: "29.990",
    year: "2019",
    km: "77.000 km",
    fuel: "Benzin",
    power: "306 PS",
    powerKW: "225 kW",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "Limousine",
    color: "Kosmos Schwarz",
    hu: "05/2026",
    mobileLink: "https://home.mobile.de/CARCENTERLANDSHUT#des_441594486",
    autoScoutLink: "https://www.autoscout24.de/haendler/carcenter-landshut",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop",
    ],
    features: ["360° Kamera", "LED", "Standheizung", "Night-Paket"],
  },
  {
    id: 5,
    name: "Audi Q5 2.0 TDI Quattro S-Line",
    fullName: "Audi Q5 2.0 TDI QUATTRO 3xS-LINE VIRTUAL/KAMERA/MwSt.",
    price: "27.990",
    year: "2017",
    km: "132.000 km",
    fuel: "Diesel",
    power: "190 PS",
    powerKW: "140 kW",
    transmission: "Automatik",
    seats: 5,
    doors: 5,
    type: "SUV",
    color: "Daytonagrau",
    hu: "05/2026",
    mobileLink: "https://home.mobile.de/CARCENTERLANDSHUT#des_442702667",
    autoScoutLink: "https://www.autoscout24.de/angebote/audi-q5-2-0-tdi-quattro-3xs-line-virtual-kamera-mwst-diesel-schwarz-15030855-cb45-4d6a-872e-51fa5405ee34",
    images: [
      "https://images.unsplash.com/photo-1606664913919-86d67eaa5a69?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&h=600&fit=crop",
    ],
    features: ["3xS-Line", "Virtual Cockpit", "Kamera", "MwSt. ausw."],
  },
  {
    id: 6,
    name: "Audi A6 3.0 TDI Quattro S-Line",
    fullName: "Audi A6 3.0 TDI 3xS-LINE QUATTRO/ACC/R-KAM/AHK/LED",
    price: "23.990",
    year: "2017",
    km: "125.000 km",
    fuel: "Diesel",
    power: "272 PS",
    powerKW: "200 kW",
    transmission: "Automatik",
    seats: 5,
    doors: 4,
    type: "Kombi",
    color: "Daytonagrau",
    hu: "07/2026",
    mobileLink: "https://home.mobile.de/CARCENTERLANDSHUT#des_442101130",
    autoScoutLink: "https://www.autoscout24.de/angebote/audi-a6-3-0-tdi-3xs-line-quattro-acc-r-kam-ahk-led-diesel-schwarz-e912e466-4e85-4f7d-a2d9-08cce11654c1",
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    ],
    features: ["3xS-Line", "ACC", "Rückfahrkamera", "AHK"],
  },
];

interface Vehicle {
  id: number;
  name: string;
  fullName: string;
  price: string;
  year: string;
  km: string;
  fuel: string;
  power: string;
  powerKW: string;
  transmission: string;
  seats: number;
  doors: number;
  type: string;
  color: string;
  hu: string;
  mobileLink: string;
  autoScoutLink: string;
  images: string[];
  features: string[];
}

function VehicleDetailModal({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 rounded-3xl overflow-hidden max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 flex flex-col lg:flex-row"
      >
        {/* Left Side - Image Gallery */}
        <div className="lg:w-2/3 relative bg-black flex items-center justify-center">
          <div className="relative w-full h-72 lg:h-full lg:min-h-[550px] flex items-center justify-center">
            <img
              src={vehicle.images[currentImageIndex]}
              alt={vehicle.name}
              className="max-w-full max-h-full object-contain"
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 lg:hidden bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Navigation */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-between px-4">
              <button
                onClick={prevImage}
                className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Image Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {vehicle.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-emerald-500" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="lg:w-1/3 p-6 lg:p-8 flex flex-col overflow-y-auto">
          {/* Close Button Desktop */}
          <button
            onClick={onClose}
            className="hidden lg:block absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 p-2 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="text-emerald-500 text-sm font-semibold mb-2">{vehicle.type}</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{vehicle.fullName}</h2>
            <div className="text-3xl lg:text-4xl font-bold text-emerald-500">{vehicle.price} €</div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-gray-400 text-xs mb-1">Erstzulassung</div>
              <div className="text-white font-semibold">{vehicle.year}</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-gray-400 text-xs mb-1">Kilometerstand</div>
              <div className="text-white font-semibold">{vehicle.km}</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-gray-400 text-xs mb-1">Leistung</div>
              <div className="text-white font-semibold">{vehicle.powerKW} ({vehicle.power})</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-gray-400 text-xs mb-1">Kraftstoff</div>
              <div className="text-white font-semibold">{vehicle.fuel}</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-gray-400 text-xs mb-1">Getriebe</div>
              <div className="text-white font-semibold">{vehicle.transmission}</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-gray-400 text-xs mb-1">HU</div>
              <div className="text-white font-semibold">{vehicle.hu}</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-gray-400 text-xs mb-1">Farbe</div>
              <div className="text-white font-semibold">{vehicle.color}</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-3">
              <div className="text-gray-400 text-xs mb-1">Türen / Sitze</div>
              <div className="text-white font-semibold">{vehicle.doors} / {vehicle.seats}</div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <div className="text-gray-400 text-sm mb-2">Ausstattung</div>
            <div className="flex flex-wrap gap-2">
              {vehicle.features.map((feature) => (
                <span key={feature} className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-lg">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-auto space-y-3">
            <a
              href={vehicle.mobileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/25 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              Auf Mobile.de ansehen
            </a>
            <a
              href={vehicle.autoScoutLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-center flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              Auf AutoScout24 ansehen
            </a>
            <a
              href="tel:+491728650128"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-center flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
            >
              <Phone className="w-5 h-5" />
              Jetzt anrufen: +49 172 8650128
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  return (
    <section id="fahrzeuge" className="section-padding bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-500 font-semibold tracking-wider uppercase text-sm">
            Fahrzeugbestand
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
            Unsere <span className="text-emerald-500">Fahrzeuge</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Entdecken Sie unsere handverlesene Auswahl an Qualitätsfahrzeugen. Jedes Fahrzeug geprüft und startklar.
          </p>
        </motion.div>

        {/* Vehicles Grid - Only first 6 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {vehicles.slice(0, 6).map((vehicle) => (
            <motion.div
              key={vehicle.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass rounded-3xl overflow-hidden transition-all duration-300 hover:border-emerald-500/30">
                {/* Image - Clickable */}
                <div
                  className="relative h-56 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-lg">
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
                      <Users className="w-4 h-4 text-emerald-500 mb-1" />
                      <span className="text-xs text-gray-400">{vehicle.seats}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-900/50 rounded-xl">
                      <Gauge className="w-4 h-4 text-emerald-500 mb-1" />
                      <span className="text-xs text-gray-400">{vehicle.power}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-900/50 rounded-xl">
                      <DoorOpen className="w-4 h-4 text-emerald-500 mb-1" />
                      <span className="text-xs text-gray-400">{vehicle.doors}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-900/50 rounded-xl">
                      <Car className="w-4 h-4 text-emerald-500 mb-1" />
                      <span className="text-xs text-gray-400 truncate">{vehicle.type.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => setSelectedVehicle(vehicle)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
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
          <Link href="/fahrzeuge">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer"
            >
              Mehr Fahrzeuge anzeigen
              <ChevronRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <VehicleDetailModal
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
