"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Car, Calendar, Gauge, Star, ChevronDown, Info, X, Phone, Mail, User, MessageSquare, CheckCircle, Send, Loader2 } from "lucide-react";

// FormSubmit.co - Ersetze mit deiner Email-Adresse
// Nach dem ersten Absenden bekommst du eine Bestätigungs-Email
const FORMSUBMIT_EMAIL = "carcenterlandshut@gmail.com";

// ============================================================================
// UMFANGREICHE FAHRZEUG-DATENBANK
// ============================================================================

interface VehicleModel {
  name: string;
  basePrice: number;
  category: "kleinwagen" | "kompakt" | "mittelklasse" | "oberklasse" | "suv" | "sportwagen" | "van" | "transporter";
}

interface VehicleBrand {
  name: string;
  country: string;
  premium: boolean;
  models: VehicleModel[];
}

const vehicleDatabase: VehicleBrand[] = [
  // DEUTSCHE PREMIUM-MARKEN
  {
    name: "BMW",
    country: "Deutschland",
    premium: true,
    models: [
      { name: "1er (F40)", basePrice: 32900, category: "kompakt" },
      { name: "2er Gran Coupé", basePrice: 36200, category: "kompakt" },
      { name: "3er (G20)", basePrice: 47300, category: "mittelklasse" },
      { name: "4er Coupé", basePrice: 53900, category: "mittelklasse" },
      { name: "5er (G30)", basePrice: 57400, category: "oberklasse" },
      { name: "7er (G70)", basePrice: 114900, category: "oberklasse" },
      { name: "X1 (U11)", basePrice: 42800, category: "suv" },
      { name: "X3 (G01)", basePrice: 56500, category: "suv" },
      { name: "X5 (G05)", basePrice: 76900, category: "suv" },
      { name: "X6", basePrice: 82500, category: "suv" },
      { name: "X7", basePrice: 99500, category: "suv" },
      { name: "Z4", basePrice: 52100, category: "sportwagen" },
      { name: "M2", basePrice: 73900, category: "sportwagen" },
      { name: "M3", basePrice: 89900, category: "sportwagen" },
      { name: "M4", basePrice: 93600, category: "sportwagen" },
      { name: "iX", basePrice: 84400, category: "suv" },
      { name: "i4", basePrice: 58900, category: "mittelklasse" },
      { name: "i7", basePrice: 138900, category: "oberklasse" },
    ],
  },
  {
    name: "Mercedes-Benz",
    country: "Deutschland",
    premium: true,
    models: [
      { name: "A-Klasse (W177)", basePrice: 35500, category: "kompakt" },
      { name: "B-Klasse", basePrice: 38900, category: "kompakt" },
      { name: "C-Klasse (W206)", basePrice: 49700, category: "mittelklasse" },
      { name: "E-Klasse (W214)", basePrice: 64400, category: "oberklasse" },
      { name: "S-Klasse (W223)", basePrice: 117600, category: "oberklasse" },
      { name: "CLA", basePrice: 40800, category: "kompakt" },
      { name: "CLS", basePrice: 79900, category: "oberklasse" },
      { name: "GLA", basePrice: 43500, category: "suv" },
      { name: "GLB", basePrice: 46200, category: "suv" },
      { name: "GLC", basePrice: 57800, category: "suv" },
      { name: "GLE", basePrice: 75100, category: "suv" },
      { name: "GLS", basePrice: 105800, category: "suv" },
      { name: "G-Klasse", basePrice: 115500, category: "suv" },
      { name: "AMG GT", basePrice: 129900, category: "sportwagen" },
      { name: "EQA", basePrice: 52300, category: "suv" },
      { name: "EQB", basePrice: 55500, category: "suv" },
      { name: "EQE", basePrice: 68700, category: "oberklasse" },
      { name: "EQS", basePrice: 109800, category: "oberklasse" },
    ],
  },
  {
    name: "Audi",
    country: "Deutschland",
    premium: true,
    models: [
      { name: "A1 Sportback", basePrice: 28500, category: "kleinwagen" },
      { name: "A3 Sportback", basePrice: 35900, category: "kompakt" },
      { name: "A4 (B9)", basePrice: 46100, category: "mittelklasse" },
      { name: "A5 Sportback", basePrice: 51800, category: "mittelklasse" },
      { name: "A6 (C8)", basePrice: 61400, category: "oberklasse" },
      { name: "A7 Sportback", basePrice: 75900, category: "oberklasse" },
      { name: "A8 (D5)", basePrice: 104100, category: "oberklasse" },
      { name: "Q2", basePrice: 33500, category: "suv" },
      { name: "Q3", basePrice: 42200, category: "suv" },
      { name: "Q4 e-tron", basePrice: 52900, category: "suv" },
      { name: "Q5", basePrice: 55700, category: "suv" },
      { name: "Q7", basePrice: 74800, category: "suv" },
      { name: "Q8", basePrice: 86800, category: "suv" },
      { name: "e-tron GT", basePrice: 106900, category: "sportwagen" },
      { name: "RS3", basePrice: 62800, category: "kompakt" },
      { name: "RS6 Avant", basePrice: 128900, category: "oberklasse" },
      { name: "TT", basePrice: 49900, category: "sportwagen" },
      { name: "R8", basePrice: 199900, category: "sportwagen" },
    ],
  },
  {
    name: "Porsche",
    country: "Deutschland",
    premium: true,
    models: [
      { name: "718 Cayman", basePrice: 63400, category: "sportwagen" },
      { name: "718 Boxster", basePrice: 65800, category: "sportwagen" },
      { name: "911 Carrera", basePrice: 120100, category: "sportwagen" },
      { name: "911 Turbo", basePrice: 200400, category: "sportwagen" },
      { name: "Panamera", basePrice: 104900, category: "oberklasse" },
      { name: "Cayenne", basePrice: 87700, category: "suv" },
      { name: "Macan", basePrice: 69800, category: "suv" },
      { name: "Taycan", basePrice: 97800, category: "sportwagen" },
    ],
  },
  // DEUTSCHE VOLUMEN-MARKEN
  {
    name: "Volkswagen",
    country: "Deutschland",
    premium: false,
    models: [
      { name: "Polo", basePrice: 22900, category: "kleinwagen" },
      { name: "Golf 8", basePrice: 31500, category: "kompakt" },
      { name: "Golf GTI", basePrice: 44900, category: "kompakt" },
      { name: "Golf R", basePrice: 52900, category: "kompakt" },
      { name: "ID.3", basePrice: 39900, category: "kompakt" },
      { name: "ID.4", basePrice: 47300, category: "suv" },
      { name: "ID.5", basePrice: 53800, category: "suv" },
      { name: "Passat", basePrice: 43500, category: "mittelklasse" },
      { name: "Arteon", basePrice: 51300, category: "oberklasse" },
      { name: "T-Cross", basePrice: 25900, category: "suv" },
      { name: "T-Roc", basePrice: 30900, category: "suv" },
      { name: "Tiguan", basePrice: 38900, category: "suv" },
      { name: "Touareg", basePrice: 69500, category: "suv" },
      { name: "Multivan", basePrice: 52900, category: "van" },
    ],
  },
  {
    name: "Opel",
    country: "Deutschland",
    premium: false,
    models: [
      { name: "Corsa", basePrice: 19900, category: "kleinwagen" },
      { name: "Corsa-e", basePrice: 35600, category: "kleinwagen" },
      { name: "Astra", basePrice: 28500, category: "kompakt" },
      { name: "Insignia", basePrice: 39900, category: "mittelklasse" },
      { name: "Mokka", basePrice: 28700, category: "suv" },
      { name: "Grandland", basePrice: 36900, category: "suv" },
      { name: "Crossland", basePrice: 24900, category: "suv" },
    ],
  },
  // JAPANISCHE MARKEN
  {
    name: "Toyota",
    country: "Japan",
    premium: false,
    models: [
      { name: "Aygo X", basePrice: 17900, category: "kleinwagen" },
      { name: "Yaris", basePrice: 20900, category: "kleinwagen" },
      { name: "Yaris Cross", basePrice: 27900, category: "suv" },
      { name: "Corolla", basePrice: 29900, category: "kompakt" },
      { name: "C-HR", basePrice: 33900, category: "suv" },
      { name: "RAV4", basePrice: 42900, category: "suv" },
      { name: "Camry", basePrice: 44900, category: "mittelklasse" },
      { name: "Land Cruiser", basePrice: 79900, category: "suv" },
      { name: "Supra", basePrice: 54900, category: "sportwagen" },
    ],
  },
  {
    name: "Honda",
    country: "Japan",
    premium: false,
    models: [
      { name: "Jazz", basePrice: 24900, category: "kleinwagen" },
      { name: "Civic", basePrice: 32900, category: "kompakt" },
      { name: "Civic Type R", basePrice: 52900, category: "kompakt" },
      { name: "HR-V", basePrice: 34900, category: "suv" },
      { name: "CR-V", basePrice: 49900, category: "suv" },
    ],
  },
  {
    name: "Mazda",
    country: "Japan",
    premium: false,
    models: [
      { name: "Mazda2", basePrice: 20900, category: "kleinwagen" },
      { name: "Mazda3", basePrice: 27900, category: "kompakt" },
      { name: "Mazda6", basePrice: 38900, category: "mittelklasse" },
      { name: "CX-30", basePrice: 28900, category: "suv" },
      { name: "CX-5", basePrice: 36900, category: "suv" },
      { name: "CX-60", basePrice: 48900, category: "suv" },
      { name: "MX-5", basePrice: 33900, category: "sportwagen" },
    ],
  },
  {
    name: "Nissan",
    country: "Japan",
    premium: false,
    models: [
      { name: "Micra", basePrice: 19900, category: "kleinwagen" },
      { name: "Leaf", basePrice: 37900, category: "kompakt" },
      { name: "Qashqai", basePrice: 31900, category: "suv" },
      { name: "X-Trail", basePrice: 43900, category: "suv" },
      { name: "Juke", basePrice: 25900, category: "suv" },
      { name: "GT-R", basePrice: 129900, category: "sportwagen" },
    ],
  },
  {
    name: "Lexus",
    country: "Japan",
    premium: true,
    models: [
      { name: "UX", basePrice: 44900, category: "suv" },
      { name: "NX", basePrice: 52900, category: "suv" },
      { name: "RX", basePrice: 72900, category: "suv" },
      { name: "ES", basePrice: 54900, category: "oberklasse" },
      { name: "LS", basePrice: 109900, category: "oberklasse" },
    ],
  },
  // KOREANISCHE MARKEN
  {
    name: "Hyundai",
    country: "Südkorea",
    premium: false,
    models: [
      { name: "i10", basePrice: 15900, category: "kleinwagen" },
      { name: "i20", basePrice: 19900, category: "kleinwagen" },
      { name: "i30", basePrice: 27900, category: "kompakt" },
      { name: "Kona", basePrice: 28900, category: "suv" },
      { name: "Tucson", basePrice: 36900, category: "suv" },
      { name: "Santa Fe", basePrice: 52900, category: "suv" },
      { name: "Ioniq 5", basePrice: 47900, category: "suv" },
      { name: "Ioniq 6", basePrice: 46900, category: "mittelklasse" },
    ],
  },
  {
    name: "Kia",
    country: "Südkorea",
    premium: false,
    models: [
      { name: "Picanto", basePrice: 14900, category: "kleinwagen" },
      { name: "Rio", basePrice: 18900, category: "kleinwagen" },
      { name: "Ceed", basePrice: 26900, category: "kompakt" },
      { name: "Sportage", basePrice: 36900, category: "suv" },
      { name: "Sorento", basePrice: 52900, category: "suv" },
      { name: "EV6", basePrice: 49900, category: "suv" },
      { name: "EV9", basePrice: 74900, category: "suv" },
    ],
  },
  // FRANZÖSISCHE MARKEN
  {
    name: "Renault",
    country: "Frankreich",
    premium: false,
    models: [
      { name: "Clio", basePrice: 19900, category: "kleinwagen" },
      { name: "Captur", basePrice: 25900, category: "suv" },
      { name: "Mégane E-Tech", basePrice: 42900, category: "kompakt" },
      { name: "Arkana", basePrice: 30900, category: "suv" },
      { name: "Austral", basePrice: 35900, category: "suv" },
    ],
  },
  {
    name: "Peugeot",
    country: "Frankreich",
    premium: false,
    models: [
      { name: "208", basePrice: 20900, category: "kleinwagen" },
      { name: "308", basePrice: 29900, category: "kompakt" },
      { name: "508", basePrice: 43900, category: "mittelklasse" },
      { name: "2008", basePrice: 27900, category: "suv" },
      { name: "3008", basePrice: 37900, category: "suv" },
      { name: "5008", basePrice: 42900, category: "suv" },
    ],
  },
  {
    name: "Citroën",
    country: "Frankreich",
    premium: false,
    models: [
      { name: "C3", basePrice: 18900, category: "kleinwagen" },
      { name: "C4", basePrice: 27900, category: "kompakt" },
      { name: "C5 Aircross", basePrice: 34900, category: "suv" },
      { name: "C5 X", basePrice: 35900, category: "mittelklasse" },
    ],
  },
  // ITALIENISCHE MARKEN
  {
    name: "Fiat",
    country: "Italien",
    premium: false,
    models: [
      { name: "500", basePrice: 18900, category: "kleinwagen" },
      { name: "500e", basePrice: 32900, category: "kleinwagen" },
      { name: "Panda", basePrice: 16900, category: "kleinwagen" },
      { name: "Tipo", basePrice: 21900, category: "kompakt" },
    ],
  },
  {
    name: "Alfa Romeo",
    country: "Italien",
    premium: true,
    models: [
      { name: "Giulia", basePrice: 47900, category: "mittelklasse" },
      { name: "Stelvio", basePrice: 54900, category: "suv" },
      { name: "Tonale", basePrice: 41900, category: "suv" },
    ],
  },
  // BRITISCHE MARKEN
  {
    name: "MINI",
    country: "Großbritannien",
    premium: true,
    models: [
      { name: "Cooper", basePrice: 29900, category: "kleinwagen" },
      { name: "Cooper S", basePrice: 35900, category: "kleinwagen" },
      { name: "Countryman", basePrice: 38900, category: "suv" },
    ],
  },
  {
    name: "Land Rover",
    country: "Großbritannien",
    premium: true,
    models: [
      { name: "Defender", basePrice: 62900, category: "suv" },
      { name: "Discovery Sport", basePrice: 52900, category: "suv" },
      { name: "Range Rover Evoque", basePrice: 51900, category: "suv" },
      { name: "Range Rover Sport", basePrice: 93900, category: "suv" },
      { name: "Range Rover", basePrice: 127900, category: "suv" },
    ],
  },
  // SCHWEDISCHE MARKEN
  {
    name: "Volvo",
    country: "Schweden",
    premium: true,
    models: [
      { name: "XC40", basePrice: 42900, category: "suv" },
      { name: "XC60", basePrice: 58900, category: "suv" },
      { name: "XC90", basePrice: 79900, category: "suv" },
      { name: "S60", basePrice: 49900, category: "mittelklasse" },
      { name: "V60", basePrice: 51900, category: "mittelklasse" },
      { name: "EX30", basePrice: 38900, category: "suv" },
    ],
  },
  // AMERIKANISCHE MARKEN
  {
    name: "Tesla",
    country: "USA",
    premium: true,
    models: [
      { name: "Model 3", basePrice: 42900, category: "mittelklasse" },
      { name: "Model Y", basePrice: 44900, category: "suv" },
      { name: "Model S", basePrice: 99900, category: "oberklasse" },
      { name: "Model X", basePrice: 109900, category: "suv" },
    ],
  },
  {
    name: "Ford",
    country: "USA",
    premium: false,
    models: [
      { name: "Fiesta", basePrice: 19900, category: "kleinwagen" },
      { name: "Focus", basePrice: 27900, category: "kompakt" },
      { name: "Puma", basePrice: 28900, category: "suv" },
      { name: "Kuga", basePrice: 38900, category: "suv" },
      { name: "Mustang", basePrice: 54900, category: "sportwagen" },
      { name: "Mustang Mach-E", basePrice: 52900, category: "suv" },
    ],
  },
  // TSCHECHISCHE MARKEN
  {
    name: "Škoda",
    country: "Tschechien",
    premium: false,
    models: [
      { name: "Fabia", basePrice: 19900, category: "kleinwagen" },
      { name: "Scala", basePrice: 24900, category: "kompakt" },
      { name: "Octavia", basePrice: 31900, category: "kompakt" },
      { name: "Superb", basePrice: 42900, category: "mittelklasse" },
      { name: "Kamiq", basePrice: 25900, category: "suv" },
      { name: "Karoq", basePrice: 32900, category: "suv" },
      { name: "Kodiaq", basePrice: 42900, category: "suv" },
      { name: "Enyaq iV", basePrice: 48900, category: "suv" },
    ],
  },
  // SPANISCHE MARKEN
  {
    name: "SEAT",
    country: "Spanien",
    premium: false,
    models: [
      { name: "Ibiza", basePrice: 19900, category: "kleinwagen" },
      { name: "Leon", basePrice: 27900, category: "kompakt" },
      { name: "Arona", basePrice: 23900, category: "suv" },
      { name: "Ateca", basePrice: 32900, category: "suv" },
    ],
  },
  {
    name: "CUPRA",
    country: "Spanien",
    premium: true,
    models: [
      { name: "Born", basePrice: 42900, category: "kompakt" },
      { name: "Leon", basePrice: 42900, category: "kompakt" },
      { name: "Formentor", basePrice: 44900, category: "suv" },
    ],
  },
];

// Zustandskategorien
const conditionOptions = [
  { value: "excellent", label: "Sehr gut", description: "Wie neu, keine Mängel" },
  { value: "good", label: "Gut", description: "Normale Gebrauchsspuren" },
  { value: "fair", label: "Befriedigend", description: "Sichtbare Gebrauchsspuren" },
  { value: "poor", label: "Mäßig", description: "Deutliche Mängel" },
];

export default function VehicleCalculator() {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [year, setYear] = useState<number>(2022);
  const [mileage, setMileage] = useState<number>(50000);
  const [condition, setCondition] = useState<string>("good");

  // Modal & Form States
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Marken sortiert nach Name
  const sortedBrands = useMemo(() =>
    [...vehicleDatabase].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  // Modelle der ausgewählten Marke
  const availableModels = useMemo(() => {
    const brand = vehicleDatabase.find(b => b.name === selectedBrand);
    return brand?.models || [];
  }, [selectedBrand]);

  const handleCalculate = () => {
    if (selectedBrand && selectedModel) {
      setShowModal(true);
      setFormSubmitted(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const conditionLabel = conditionOptions.find(c => c.value === condition)?.label || condition;

    const submitData = {
      Name: formData.name,
      Email: formData.email,
      Telefon: formData.phone,
      Nachricht: formData.message,
      Fahrzeug: `${selectedBrand} ${selectedModel}`,
      Baujahr: String(year),
      Kilometerstand: `${mileage.toLocaleString('de-DE')} km`,
      Zustand: conditionLabel,
      _subject: `Neue Fahrzeuganfrage - ${selectedBrand} ${selectedModel}`,
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        console.log("Form data:", submitData);
        setFormSubmitted(true);
      }
    } catch {
      console.log("Form data:", submitData);
      setFormSubmitted(true);
    }

    setIsSubmitting(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormSubmitted(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const years = Array.from({ length: 6 }, (_, i) => 2024 - i);

  return (
    <>
      <section id="kalkulator" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-#3d5a1f/10 via-transparent to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-#6cb036 to-#5a9a2d mb-6"
            >
              <Calculator className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Fahrzeugwert-<span className="text-#6cb036">Anfrage</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Geben Sie Ihre Fahrzeugdaten ein und erhalten Sie eine professionelle Bewertung von unseren Experten
            </p>
          </motion.div>

          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-8 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Marke */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Car className="w-4 h-4 inline mr-2" />
                  Marke
                </label>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                      setSelectedModel("");
                    }}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:border-#6cb036 focus:ring-1 focus:ring-#6cb036 transition-all"
                  >
                    <option value="">Marke wählen...</option>
                    {sortedBrands.map((brand) => (
                      <option key={brand.name} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Modell */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Car className="w-4 h-4 inline mr-2" />
                  Modell
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={!selectedBrand}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:border-#6cb036 focus:ring-1 focus:ring-#6cb036 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Modell wählen...</option>
                    {availableModels.map((model) => (
                      <option key={model.name} value={model.name}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Baujahr */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Erstzulassung
                </label>
                <div className="relative">
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:border-#6cb036 focus:ring-1 focus:ring-#6cb036 transition-all"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Kilometerstand */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Gauge className="w-4 h-4 inline mr-2" />
                  Kilometerstand
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(Number(e.target.value))}
                    min={0}
                    max={500000}
                    step={1000}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-#6cb036 focus:ring-1 focus:ring-#6cb036 transition-all"
                    placeholder="z.B. 50000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">km</span>
                </div>
              </div>

              {/* Zustand */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Star className="w-4 h-4 inline mr-2" />
                  Fahrzeugzustand
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {conditionOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setCondition(opt.value)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        condition === opt.value
                          ? "border-#6cb036 bg-#6cb036/10"
                          : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                      }`}
                    >
                      <div className={`font-semibold mb-1 ${condition === opt.value ? "text-#6cb036" : "text-white"}`}>
                        {opt.label}
                      </div>
                      <div className="text-xs text-gray-400">{opt.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCalculate}
              disabled={!selectedBrand || !selectedModel}
              className="w-full bg-gradient-to-r from-#6cb036 to-#5a9a2d text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-#6cb036/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Kostenlose Bewertung anfordern
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-#6cb036 mb-2">{vehicleDatabase.length}+</div>
              <div className="text-gray-400 text-sm">Marken</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-#6cb036 mb-2">
                {vehicleDatabase.reduce((acc, brand) => acc + brand.models.length, 0)}+
              </div>
              <div className="text-gray-400 text-sm">Modelle</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-#6cb036 mb-2">24h</div>
              <div className="text-gray-400 text-sm">Antwortzeit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-#6cb036 mb-2">100%</div>
              <div className="text-gray-400 text-sm">Kostenlos</div>
            </div>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex items-start gap-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50"
          >
            <Info className="w-6 h-6 text-#6cb036 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-400">
              <strong className="text-white">Wie funktioniert es?</strong>
              <p className="mt-2">
                Geben Sie die Daten Ihres Fahrzeugs ein und senden Sie Ihre Anfrage ab.
                Unser Expertenteam wird sich innerhalb von 24 Stunden bei Ihnen melden und
                Ihnen ein individuelles, unverbindliches Angebot für Ihr Fahrzeug unterbreiten.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal / Popup Kontaktformular */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-800"
            >
              {!formSubmitted ? (
                <>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Bewertung anfordern
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Hinterlassen Sie Ihre Kontaktdaten und wir melden uns mit einem Angebot
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Fahrzeug-Zusammenfassung */}
                  <div className="bg-#6cb036/10 border border-#6cb036/30 rounded-xl p-4 mb-6">
                    <div className="text-#7ec843 text-xs font-semibold mb-2">IHR FAHRZEUG</div>
                    <div className="text-white font-semibold text-lg">
                      {selectedBrand} {selectedModel}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      EZ {year} • {mileage.toLocaleString('de-DE')} km • Zustand: {conditionOptions.find(c => c.value === condition)?.label}
                    </div>
                  </div>

                  {/* Formular */}
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-#6cb036 focus:ring-1 focus:ring-#6cb036 transition-all"
                        placeholder="Ihr vollständiger Name"
                      />
                    </div>

                    {/* E-Mail */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-#6cb036 focus:ring-1 focus:ring-#6cb036 transition-all"
                        placeholder="ihre@email.de"
                      />
                    </div>

                    {/* Telefon */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-#6cb036 focus:ring-1 focus:ring-#6cb036 transition-all"
                        placeholder="+49 123 456789"
                      />
                    </div>

                    {/* Nachricht */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Nachricht (optional)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-#6cb036 focus:ring-1 focus:ring-#6cb036 transition-all resize-none"
                        placeholder="Zusätzliche Informationen zu Ihrem Fahrzeug..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-#6cb036 to-#5a9a2d text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-#6cb036/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Anfrage absenden
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Mit dem Absenden stimmen Sie unserer <a href="/datenschutz" className="text-#6cb036 hover:underline">Datenschutzerklärung</a> zu.
                    </p>
                  </form>
                </>
              ) : (
                /* Erfolgs-Nachricht */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-#6cb036/20 mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-#6cb036" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    Anfrage erfolgreich gesendet!
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Vielen Dank für Ihre Anfrage. Unser Team wird sich innerhalb von 24 Stunden bei Ihnen melden, um Ihnen ein individuelles Angebot für Ihren <strong className="text-white">{selectedBrand} {selectedModel}</strong> zu unterbreiten.
                  </p>

                  <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                    <div className="text-sm text-gray-400">
                      Bei dringenden Fragen erreichen Sie uns auch direkt unter:
                    </div>
                    <a href="tel:+491728650128" className="text-#6cb036 font-semibold text-lg hover:underline">
                      +49 172 8650128
                    </a>
                  </div>

                  <button
                    onClick={closeModal}
                    className="bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Schließen
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
