"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Gauge, DoorOpen, Car, ExternalLink, ChevronRight, ChevronLeft, X, Phone } from "lucide-react";
import Link from "next/link";

const vehicles = [
  {
    id: 1,
    name: "Mercedes AMG GT GTS",
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
    name: "Mercedes A 35 AMG",
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
    name: "Audi Q5 Quattro S-Line",
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
    name: "Audi A6 Quattro S-Line",
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
        className="bg-gray-900 rounded-2xl sm:rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden border border-gray-800 flex flex-col lg:flex-row relative"
      >
        {/* Close Button - Always Visible */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-50 bg-black/80 hover:bg-black p-3 rounded-full text-white transition-colors"
          aria-label="Schließen"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side - Image Gallery */}
        <div className="lg:w-2/3 relative bg-black flex items-center justify-center">
          <div className="relative w-full h-56 sm:h-72 lg:h-full lg:min-h-[550px] flex items-center justify-center">
            <img
              src={vehicle.images[currentImageIndex]}
              alt={vehicle.name}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image Navigation */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="bg-black/60 active:bg-black/80 p-2.5 rounded-full text-white transition-colors touch-target"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="bg-black/60 active:bg-black/80 p-2.5 rounded-full text-white transition-colors touch-target"
                aria-label="Nächstes Bild"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Image Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {vehicle.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-[#6cb036]" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="lg:w-1/3 p-4 sm:p-6 lg:p-8 pt-14 lg:pt-6 flex flex-col overflow-y-auto overflow-x-hidden">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <div className="text-[#6cb036] text-xs sm:text-sm font-semibold mb-1 sm:mb-2">{vehicle.type}</div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-2 break-words">{vehicle.fullName}</h2>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#6cb036]">{vehicle.price} €</div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <div className="text-gray-400 text-[10px] sm:text-xs mb-0.5 sm:mb-1">Erstzulassung</div>
              <div className="text-white font-semibold text-xs sm:text-sm">{vehicle.year}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <div className="text-gray-400 text-[10px] sm:text-xs mb-0.5 sm:mb-1">Kilometerstand</div>
              <div className="text-white font-semibold text-xs sm:text-sm">{vehicle.km}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <div className="text-gray-400 text-[10px] sm:text-xs mb-0.5 sm:mb-1">Leistung</div>
              <div className="text-white font-semibold text-xs sm:text-sm">{vehicle.power}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3">
              <div className="text-gray-400 text-[10px] sm:text-xs mb-0.5 sm:mb-1">Kraftstoff</div>
              <div className="text-white font-semibold text-xs sm:text-sm">{vehicle.fuel}</div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-4 sm:mb-6">
            <div className="text-gray-400 text-xs sm:text-sm mb-2">Ausstattung</div>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {vehicle.features.map((feature) => (
                <span key={feature} className="text-[10px] sm:text-sm bg-gray-800 text-gray-300 px-2 sm:px-3 py-1 rounded-lg">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-auto space-y-2 sm:space-y-3">
            <a
              href={vehicle.mobileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              Mobile.de
            </a>
            <a
              href={vehicle.autoScoutLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-center flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              AutoScout24
            </a>
            <a
              href="tel:+491728650128"
              className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#6cb036] to-[#5a9a2d] text-white font-semibold text-center flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Anrufen
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
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Fahrzeuge() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  return (
    <section id="fahrzeuge" className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6cb036]/50 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-10 lg:mb-16"
        >
          <span className="text-[#6cb036] font-semibold tracking-wider uppercase text-xs sm:text-sm">
            Fahrzeugbestand
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 sm:mt-4 mb-2 sm:mb-4">
            Unsere <span className="text-[#6cb036]">Fahrzeuge</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm lg:text-base max-w-xl mx-auto px-2">
            Entdecken Sie unsere handverlesene Auswahl an Qualitätsfahrzeugen.
          </p>
        </motion.div>

        {/* Vehicles Grid - 2 cols mobile, 3 cols desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6"
        >
          {vehicles.slice(0, 6).map((vehicle) => (
            <motion.div
              key={vehicle.id}
              variants={itemVariants}
              className="group"
            >
              <div
                className="glass rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#6cb036]/30 cursor-pointer h-full flex flex-col"
                onClick={() => setSelectedVehicle(vehicle)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Price Badge */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#6cb036] text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-bold text-xs sm:text-sm">
                    {vehicle.price}€
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 glass px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs text-white">
                    {vehicle.year}
                  </div>
                </div>

                {/* Content - Compact */}
                <div className="p-2.5 sm:p-4 flex flex-col flex-grow">
                  {/* Name */}
                  <h3 className="text-xs sm:text-sm lg:text-base font-bold text-white mb-1 sm:mb-2 line-clamp-1">{vehicle.name}</h3>

                  {/* Quick Info */}
                  <div className="flex items-center gap-1 sm:gap-2 text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-3 flex-wrap">
                    <span>{vehicle.km}</span>
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-gray-600" />
                    <span>{vehicle.power}</span>
                  </div>

                  {/* Features - Hidden on small mobile */}
                  <div className="hidden sm:grid grid-cols-4 gap-1 mb-3">
                    <div className="flex flex-col items-center p-1.5 bg-gray-900/50 rounded-lg">
                      <Users className="w-3 h-3 text-[#6cb036] mb-0.5" aria-hidden="true" />
                      <span className="text-[9px] text-gray-400">{vehicle.seats}</span>
                    </div>
                    <div className="flex flex-col items-center p-1.5 bg-gray-900/50 rounded-lg">
                      <Gauge className="w-3 h-3 text-[#6cb036] mb-0.5" aria-hidden="true" />
                      <span className="text-[9px] text-gray-400">{vehicle.doors}T</span>
                    </div>
                    <div className="flex flex-col items-center p-1.5 bg-gray-900/50 rounded-lg">
                      <DoorOpen className="w-3 h-3 text-[#6cb036] mb-0.5" aria-hidden="true" />
                      <span className="text-[9px] text-gray-400">{vehicle.fuel.slice(0,3)}</span>
                    </div>
                    <div className="flex flex-col items-center p-1.5 bg-gray-900/50 rounded-lg">
                      <Car className="w-3 h-3 text-[#6cb036] mb-0.5" aria-hidden="true" />
                      <span className="text-[9px] text-gray-400 truncate">{vehicle.type.slice(0,3)}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <span className="w-full bg-gradient-to-r from-[#6cb036] to-[#5a9a2d] text-white py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-1 text-[10px] sm:text-xs lg:text-sm">
                      Details
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-10 text-center"
        >
          <Link href="/fahrzeuge">
            <motion.span
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6cb036] to-[#5a9a2d] px-5 py-2.5 sm:px-8 sm:py-4 rounded-full text-white font-semibold text-sm sm:text-base cursor-pointer touch-target"
            >
              Alle Fahrzeuge
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
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
