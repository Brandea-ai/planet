"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Car, Calendar, Gauge, Star, AlertTriangle, ChevronDown, Euro, TrendingDown, Info } from "lucide-react";

// ============================================================================
// UMFANGREICHE FAHRZEUG-DATENBANK MIT REALISTISCHEN DEUTSCHEN MARKTPREISEN
// Stand: 2024 - Basierend auf typischen deutschen Marktpreisen
// ============================================================================

interface VehicleModel {
  name: string;
  basePrice: number; // Neupreis in Euro
  category: "kleinwagen" | "kompakt" | "mittelklasse" | "oberklasse" | "suv" | "sportwagen" | "van" | "transporter";
}

interface VehicleBrand {
  name: string;
  country: string;
  premium: boolean;
  models: VehicleModel[];
}

const vehicleDatabase: VehicleBrand[] = [
  // ==================== DEUTSCHE PREMIUM-MARKEN ====================
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
      { name: "EQC", basePrice: 71800, category: "suv" },
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
      { name: "RS4 Avant", basePrice: 86400, category: "mittelklasse" },
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
      { name: "Cayenne Coupé", basePrice: 95200, category: "suv" },
      { name: "Macan", basePrice: 69800, category: "suv" },
      { name: "Taycan", basePrice: 97800, category: "sportwagen" },
    ],
  },

  // ==================== DEUTSCHE VOLUMEN-MARKEN ====================
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
      { name: "ID.7", basePrice: 56900, category: "mittelklasse" },
      { name: "Passat", basePrice: 43500, category: "mittelklasse" },
      { name: "Arteon", basePrice: 51300, category: "oberklasse" },
      { name: "T-Cross", basePrice: 25900, category: "suv" },
      { name: "T-Roc", basePrice: 30900, category: "suv" },
      { name: "Tiguan", basePrice: 38900, category: "suv" },
      { name: "Touareg", basePrice: 69500, category: "suv" },
      { name: "Multivan", basePrice: 52900, category: "van" },
      { name: "Caddy", basePrice: 32500, category: "van" },
      { name: "Transporter T6.1", basePrice: 39800, category: "transporter" },
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
      { name: "Astra Sports Tourer", basePrice: 30200, category: "kompakt" },
      { name: "Insignia", basePrice: 39900, category: "mittelklasse" },
      { name: "Mokka", basePrice: 28700, category: "suv" },
      { name: "Mokka-e", basePrice: 41900, category: "suv" },
      { name: "Grandland", basePrice: 36900, category: "suv" },
      { name: "Crossland", basePrice: 24900, category: "suv" },
      { name: "Combo Life", basePrice: 29900, category: "van" },
      { name: "Zafira Life", basePrice: 43500, category: "van" },
    ],
  },

  // ==================== JAPANISCHE MARKEN ====================
  {
    name: "Toyota",
    country: "Japan",
    premium: false,
    models: [
      { name: "Aygo X", basePrice: 17900, category: "kleinwagen" },
      { name: "Yaris", basePrice: 20900, category: "kleinwagen" },
      { name: "Yaris Cross", basePrice: 27900, category: "suv" },
      { name: "Corolla", basePrice: 29900, category: "kompakt" },
      { name: "Corolla Cross", basePrice: 35900, category: "suv" },
      { name: "C-HR", basePrice: 33900, category: "suv" },
      { name: "RAV4", basePrice: 42900, category: "suv" },
      { name: "Camry", basePrice: 44900, category: "mittelklasse" },
      { name: "Highlander", basePrice: 56900, category: "suv" },
      { name: "Land Cruiser", basePrice: 79900, category: "suv" },
      { name: "Supra", basePrice: 54900, category: "sportwagen" },
      { name: "GR86", basePrice: 33900, category: "sportwagen" },
      { name: "bZ4X", basePrice: 47900, category: "suv" },
      { name: "Proace City Verso", basePrice: 33900, category: "van" },
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
      { name: "ZR-V", basePrice: 42900, category: "suv" },
      { name: "CR-V", basePrice: 49900, category: "suv" },
      { name: "e:Ny1", basePrice: 47900, category: "suv" },
      { name: "Honda e", basePrice: 39900, category: "kleinwagen" },
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
      { name: "CX-3", basePrice: 24900, category: "suv" },
      { name: "CX-30", basePrice: 28900, category: "suv" },
      { name: "CX-5", basePrice: 36900, category: "suv" },
      { name: "CX-60", basePrice: 48900, category: "suv" },
      { name: "MX-5", basePrice: 33900, category: "sportwagen" },
      { name: "MX-30", basePrice: 35900, category: "suv" },
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
      { name: "Ariya", basePrice: 49900, category: "suv" },
      { name: "370Z", basePrice: 45900, category: "sportwagen" },
      { name: "GT-R", basePrice: 129900, category: "sportwagen" },
    ],
  },
  {
    name: "Subaru",
    country: "Japan",
    premium: false,
    models: [
      { name: "Impreza", basePrice: 28900, category: "kompakt" },
      { name: "XV", basePrice: 32900, category: "suv" },
      { name: "Forester", basePrice: 39900, category: "suv" },
      { name: "Outback", basePrice: 44900, category: "suv" },
      { name: "BRZ", basePrice: 35900, category: "sportwagen" },
      { name: "Solterra", basePrice: 57900, category: "suv" },
    ],
  },
  {
    name: "Mitsubishi",
    country: "Japan",
    premium: false,
    models: [
      { name: "Space Star", basePrice: 15900, category: "kleinwagen" },
      { name: "Colt", basePrice: 18900, category: "kleinwagen" },
      { name: "ASX", basePrice: 27900, category: "suv" },
      { name: "Eclipse Cross", basePrice: 33900, category: "suv" },
      { name: "Outlander", basePrice: 44900, category: "suv" },
    ],
  },
  {
    name: "Suzuki",
    country: "Japan",
    premium: false,
    models: [
      { name: "Swift", basePrice: 18900, category: "kleinwagen" },
      { name: "Swift Sport", basePrice: 26900, category: "kleinwagen" },
      { name: "Ignis", basePrice: 19900, category: "kleinwagen" },
      { name: "Vitara", basePrice: 26900, category: "suv" },
      { name: "S-Cross", basePrice: 29900, category: "suv" },
      { name: "Jimny", basePrice: 29900, category: "suv" },
      { name: "Across", basePrice: 49900, category: "suv" },
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
      { name: "LC", basePrice: 104900, category: "sportwagen" },
      { name: "RZ", basePrice: 69900, category: "suv" },
    ],
  },

  // ==================== KOREANISCHE MARKEN ====================
  {
    name: "Hyundai",
    country: "Südkorea",
    premium: false,
    models: [
      { name: "i10", basePrice: 15900, category: "kleinwagen" },
      { name: "i20", basePrice: 19900, category: "kleinwagen" },
      { name: "i20 N", basePrice: 32900, category: "kleinwagen" },
      { name: "i30", basePrice: 27900, category: "kompakt" },
      { name: "i30 N", basePrice: 42900, category: "kompakt" },
      { name: "Bayon", basePrice: 20900, category: "suv" },
      { name: "Kona", basePrice: 28900, category: "suv" },
      { name: "Kona Elektro", basePrice: 41900, category: "suv" },
      { name: "Tucson", basePrice: 36900, category: "suv" },
      { name: "Santa Fe", basePrice: 52900, category: "suv" },
      { name: "Ioniq 5", basePrice: 47900, category: "suv" },
      { name: "Ioniq 6", basePrice: 46900, category: "mittelklasse" },
      { name: "Staria", basePrice: 56900, category: "van" },
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
      { name: "ProCeed", basePrice: 32900, category: "kompakt" },
      { name: "Stonic", basePrice: 21900, category: "suv" },
      { name: "Niro", basePrice: 33900, category: "suv" },
      { name: "Niro EV", basePrice: 47900, category: "suv" },
      { name: "Sportage", basePrice: 36900, category: "suv" },
      { name: "Sorento", basePrice: 52900, category: "suv" },
      { name: "EV6", basePrice: 49900, category: "suv" },
      { name: "EV9", basePrice: 74900, category: "suv" },
      { name: "Stinger", basePrice: 54900, category: "mittelklasse" },
    ],
  },
  {
    name: "Genesis",
    country: "Südkorea",
    premium: true,
    models: [
      { name: "G70", basePrice: 42900, category: "mittelklasse" },
      { name: "G80", basePrice: 59900, category: "oberklasse" },
      { name: "G90", basePrice: 94900, category: "oberklasse" },
      { name: "GV60", basePrice: 54900, category: "suv" },
      { name: "GV70", basePrice: 52900, category: "suv" },
      { name: "GV80", basePrice: 72900, category: "suv" },
    ],
  },

  // ==================== FRANZÖSISCHE MARKEN ====================
  {
    name: "Renault",
    country: "Frankreich",
    premium: false,
    models: [
      { name: "Twingo", basePrice: 16900, category: "kleinwagen" },
      { name: "Clio", basePrice: 19900, category: "kleinwagen" },
      { name: "Captur", basePrice: 25900, category: "suv" },
      { name: "Mégane E-Tech", basePrice: 42900, category: "kompakt" },
      { name: "Arkana", basePrice: 30900, category: "suv" },
      { name: "Austral", basePrice: 35900, category: "suv" },
      { name: "Scenic E-Tech", basePrice: 44900, category: "suv" },
      { name: "Espace", basePrice: 48900, category: "suv" },
      { name: "Kangoo", basePrice: 28900, category: "van" },
      { name: "Trafic", basePrice: 39900, category: "transporter" },
      { name: "ZOE", basePrice: 36900, category: "kleinwagen" },
    ],
  },
  {
    name: "Peugeot",
    country: "Frankreich",
    premium: false,
    models: [
      { name: "208", basePrice: 20900, category: "kleinwagen" },
      { name: "e-208", basePrice: 37900, category: "kleinwagen" },
      { name: "308", basePrice: 29900, category: "kompakt" },
      { name: "408", basePrice: 39900, category: "kompakt" },
      { name: "508", basePrice: 43900, category: "mittelklasse" },
      { name: "2008", basePrice: 27900, category: "suv" },
      { name: "e-2008", basePrice: 39900, category: "suv" },
      { name: "3008", basePrice: 37900, category: "suv" },
      { name: "5008", basePrice: 42900, category: "suv" },
      { name: "Rifter", basePrice: 28900, category: "van" },
      { name: "Traveller", basePrice: 48900, category: "van" },
    ],
  },
  {
    name: "Citroën",
    country: "Frankreich",
    premium: false,
    models: [
      { name: "C3", basePrice: 18900, category: "kleinwagen" },
      { name: "C3 Aircross", basePrice: 22900, category: "suv" },
      { name: "C4", basePrice: 27900, category: "kompakt" },
      { name: "ë-C4", basePrice: 39900, category: "kompakt" },
      { name: "C4 X", basePrice: 29900, category: "kompakt" },
      { name: "C5 Aircross", basePrice: 34900, category: "suv" },
      { name: "C5 X", basePrice: 35900, category: "mittelklasse" },
      { name: "Berlingo", basePrice: 27900, category: "van" },
      { name: "SpaceTourer", basePrice: 44900, category: "van" },
    ],
  },
  {
    name: "DS Automobiles",
    country: "Frankreich",
    premium: true,
    models: [
      { name: "DS 3 Crossback", basePrice: 32900, category: "suv" },
      { name: "DS 4", basePrice: 38900, category: "kompakt" },
      { name: "DS 7", basePrice: 47900, category: "suv" },
      { name: "DS 9", basePrice: 56900, category: "oberklasse" },
    ],
  },
  {
    name: "Alpine",
    country: "Frankreich",
    premium: true,
    models: [
      { name: "A110", basePrice: 62900, category: "sportwagen" },
      { name: "A110 S", basePrice: 74900, category: "sportwagen" },
      { name: "A110 R", basePrice: 104900, category: "sportwagen" },
    ],
  },

  // ==================== ITALIENISCHE MARKEN ====================
  {
    name: "Fiat",
    country: "Italien",
    premium: false,
    models: [
      { name: "500", basePrice: 18900, category: "kleinwagen" },
      { name: "500e", basePrice: 32900, category: "kleinwagen" },
      { name: "500X", basePrice: 26900, category: "suv" },
      { name: "Panda", basePrice: 16900, category: "kleinwagen" },
      { name: "Tipo", basePrice: 21900, category: "kompakt" },
      { name: "600e", basePrice: 36900, category: "suv" },
    ],
  },
  {
    name: "Alfa Romeo",
    country: "Italien",
    premium: true,
    models: [
      { name: "Giulia", basePrice: 47900, category: "mittelklasse" },
      { name: "Giulia Quadrifoglio", basePrice: 89900, category: "mittelklasse" },
      { name: "Stelvio", basePrice: 54900, category: "suv" },
      { name: "Stelvio Quadrifoglio", basePrice: 99900, category: "suv" },
      { name: "Tonale", basePrice: 41900, category: "suv" },
    ],
  },

  // ==================== BRITISCHE MARKEN ====================
  {
    name: "MINI",
    country: "Großbritannien",
    premium: true,
    models: [
      { name: "Cooper", basePrice: 29900, category: "kleinwagen" },
      { name: "Cooper S", basePrice: 35900, category: "kleinwagen" },
      { name: "Cooper SE", basePrice: 36900, category: "kleinwagen" },
      { name: "Countryman", basePrice: 38900, category: "suv" },
      { name: "Clubman", basePrice: 33900, category: "kompakt" },
      { name: "John Cooper Works", basePrice: 42900, category: "kleinwagen" },
    ],
  },
  {
    name: "Land Rover",
    country: "Großbritannien",
    premium: true,
    models: [
      { name: "Defender 90", basePrice: 62900, category: "suv" },
      { name: "Defender 110", basePrice: 69900, category: "suv" },
      { name: "Discovery Sport", basePrice: 52900, category: "suv" },
      { name: "Discovery", basePrice: 72900, category: "suv" },
      { name: "Range Rover Evoque", basePrice: 51900, category: "suv" },
      { name: "Range Rover Velar", basePrice: 65900, category: "suv" },
      { name: "Range Rover Sport", basePrice: 93900, category: "suv" },
      { name: "Range Rover", basePrice: 127900, category: "suv" },
    ],
  },
  {
    name: "Jaguar",
    country: "Großbritannien",
    premium: true,
    models: [
      { name: "E-Pace", basePrice: 47900, category: "suv" },
      { name: "F-Pace", basePrice: 62900, category: "suv" },
      { name: "I-Pace", basePrice: 82900, category: "suv" },
      { name: "F-Type", basePrice: 74900, category: "sportwagen" },
      { name: "XE", basePrice: 44900, category: "mittelklasse" },
      { name: "XF", basePrice: 54900, category: "oberklasse" },
    ],
  },

  // ==================== SCHWEDISCHE MARKEN ====================
  {
    name: "Volvo",
    country: "Schweden",
    premium: true,
    models: [
      { name: "XC40", basePrice: 42900, category: "suv" },
      { name: "XC40 Recharge", basePrice: 52900, category: "suv" },
      { name: "XC60", basePrice: 58900, category: "suv" },
      { name: "XC90", basePrice: 79900, category: "suv" },
      { name: "C40 Recharge", basePrice: 54900, category: "suv" },
      { name: "S60", basePrice: 49900, category: "mittelklasse" },
      { name: "S90", basePrice: 62900, category: "oberklasse" },
      { name: "V60", basePrice: 51900, category: "mittelklasse" },
      { name: "V90", basePrice: 64900, category: "oberklasse" },
      { name: "EX30", basePrice: 38900, category: "suv" },
      { name: "EX90", basePrice: 89900, category: "suv" },
    ],
  },
  {
    name: "Polestar",
    country: "Schweden",
    premium: true,
    models: [
      { name: "Polestar 2", basePrice: 52900, category: "mittelklasse" },
      { name: "Polestar 3", basePrice: 89900, category: "suv" },
      { name: "Polestar 4", basePrice: 64900, category: "suv" },
    ],
  },

  // ==================== AMERIKANISCHE MARKEN ====================
  {
    name: "Tesla",
    country: "USA",
    premium: true,
    models: [
      { name: "Model 3", basePrice: 42900, category: "mittelklasse" },
      { name: "Model 3 Performance", basePrice: 55900, category: "mittelklasse" },
      { name: "Model Y", basePrice: 44900, category: "suv" },
      { name: "Model Y Performance", basePrice: 57900, category: "suv" },
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
      { name: "Explorer", basePrice: 74900, category: "suv" },
      { name: "Mustang", basePrice: 54900, category: "sportwagen" },
      { name: "Mustang Mach-E", basePrice: 52900, category: "suv" },
      { name: "Ranger", basePrice: 42900, category: "transporter" },
      { name: "Transit Custom", basePrice: 39900, category: "transporter" },
      { name: "Tourneo Custom", basePrice: 52900, category: "van" },
    ],
  },
  {
    name: "Jeep",
    country: "USA",
    premium: false,
    models: [
      { name: "Renegade", basePrice: 32900, category: "suv" },
      { name: "Compass", basePrice: 38900, category: "suv" },
      { name: "Wrangler", basePrice: 62900, category: "suv" },
      { name: "Grand Cherokee", basePrice: 74900, category: "suv" },
      { name: "Avenger", basePrice: 38900, category: "suv" },
    ],
  },

  // ==================== TSCHECHISCHE MARKEN ====================
  {
    name: "Škoda",
    country: "Tschechien",
    premium: false,
    models: [
      { name: "Fabia", basePrice: 19900, category: "kleinwagen" },
      { name: "Scala", basePrice: 24900, category: "kompakt" },
      { name: "Octavia", basePrice: 31900, category: "kompakt" },
      { name: "Octavia RS", basePrice: 44900, category: "kompakt" },
      { name: "Superb", basePrice: 42900, category: "mittelklasse" },
      { name: "Kamiq", basePrice: 25900, category: "suv" },
      { name: "Karoq", basePrice: 32900, category: "suv" },
      { name: "Kodiaq", basePrice: 42900, category: "suv" },
      { name: "Enyaq iV", basePrice: 48900, category: "suv" },
      { name: "Enyaq Coupé iV", basePrice: 53900, category: "suv" },
    ],
  },

  // ==================== SPANISCHE MARKEN ====================
  {
    name: "SEAT",
    country: "Spanien",
    premium: false,
    models: [
      { name: "Ibiza", basePrice: 19900, category: "kleinwagen" },
      { name: "Leon", basePrice: 27900, category: "kompakt" },
      { name: "Leon Cupra", basePrice: 47900, category: "kompakt" },
      { name: "Arona", basePrice: 23900, category: "suv" },
      { name: "Ateca", basePrice: 32900, category: "suv" },
      { name: "Tarraco", basePrice: 42900, category: "suv" },
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
      { name: "Ateca", basePrice: 47900, category: "suv" },
      { name: "Tavascan", basePrice: 52900, category: "suv" },
    ],
  },

  // ==================== CHINESISCHE MARKEN ====================
  {
    name: "BYD",
    country: "China",
    premium: false,
    models: [
      { name: "Dolphin", basePrice: 33900, category: "kleinwagen" },
      { name: "Atto 3", basePrice: 39900, category: "suv" },
      { name: "Seal", basePrice: 47900, category: "mittelklasse" },
      { name: "Tang", basePrice: 72900, category: "suv" },
      { name: "Han", basePrice: 72900, category: "oberklasse" },
    ],
  },
  {
    name: "MG",
    country: "China",
    premium: false,
    models: [
      { name: "MG4 Electric", basePrice: 34900, category: "kompakt" },
      { name: "MG5 Electric", basePrice: 38900, category: "kompakt" },
      { name: "ZS EV", basePrice: 36900, category: "suv" },
      { name: "Marvel R", basePrice: 47900, category: "suv" },
      { name: "HS", basePrice: 32900, category: "suv" },
    ],
  },
  {
    name: "NIO",
    country: "China",
    premium: true,
    models: [
      { name: "ET5", basePrice: 49900, category: "mittelklasse" },
      { name: "ET7", basePrice: 74900, category: "oberklasse" },
      { name: "EL7", basePrice: 79900, category: "suv" },
      { name: "EL6", basePrice: 64900, category: "suv" },
    ],
  },
];

// Zustandskategorien
const conditionOptions = [
  { value: "excellent", label: "Sehr gut", factor: 1.0, description: "Wie neu, keine Mängel, Scheckheftgepflegt" },
  { value: "good", label: "Gut", factor: 0.88, description: "Normale Gebrauchsspuren, gepflegt" },
  { value: "fair", label: "Befriedigend", factor: 0.75, description: "Sichtbare Gebrauchsspuren, kleinere Mängel" },
  { value: "poor", label: "Mäßig", factor: 0.60, description: "Deutliche Mängel, Reparaturbedarf" },
];

// Wertverlust-Berechnung basierend auf Alter
const calculateAgeFactor = (year: number): number => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (age <= 0) return 1.0;
  if (age === 1) return 0.78; // 22% Wertverlust im 1. Jahr
  if (age === 2) return 0.65; // Weiterer Wertverlust
  if (age === 3) return 0.55;
  if (age === 4) return 0.47;
  if (age === 5) return 0.40;

  // Ab Jahr 6: ca. 5% pro Jahr
  return Math.max(0.15, 0.40 - (age - 5) * 0.05);
};

// Wertverlust-Berechnung basierend auf Kilometerstand
const calculateMileageFactor = (mileage: number, category: string): number => {
  // Durchschnittliche jährliche Fahrleistung nach Kategorie
  const avgMileagePerYear: Record<string, number> = {
    kleinwagen: 10000,
    kompakt: 15000,
    mittelklasse: 18000,
    oberklasse: 20000,
    suv: 18000,
    sportwagen: 8000,
    van: 20000,
    transporter: 25000,
  };

  const avgMileage = avgMileagePerYear[category] || 15000;
  const deviation = mileage / avgMileage;

  if (deviation <= 0.5) return 1.05; // Wenig gefahren = Bonus
  if (deviation <= 0.8) return 1.02;
  if (deviation <= 1.0) return 1.0;
  if (deviation <= 1.2) return 0.97;
  if (deviation <= 1.5) return 0.93;
  if (deviation <= 2.0) return 0.85;
  return 0.75; // Sehr viel gefahren
};

export default function VehicleCalculator() {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [year, setYear] = useState<number>(2022);
  const [mileage, setMileage] = useState<number>(50000);
  const [condition, setCondition] = useState<string>("good");
  const [showResult, setShowResult] = useState<boolean>(false);

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

  // Berechnung des geschätzten Werts
  const calculatedValue = useMemo(() => {
    if (!selectedBrand || !selectedModel) return null;

    const brand = vehicleDatabase.find(b => b.name === selectedBrand);
    const model = brand?.models.find(m => m.name === selectedModel);

    if (!model) return null;

    const conditionData = conditionOptions.find(c => c.value === condition);
    const conditionFactor = conditionData?.factor || 0.88;

    const ageFactor = calculateAgeFactor(year);
    const mileageFactor = calculateMileageFactor(mileage, model.category);

    // Premium-Marken halten den Wert etwas besser
    const premiumFactor = brand?.premium ? 1.05 : 1.0;

    const estimatedValue = Math.round(
      model.basePrice * ageFactor * mileageFactor * conditionFactor * premiumFactor
    );

    // Berechne Preisspanne (±10%)
    const minValue = Math.round(estimatedValue * 0.90);
    const maxValue = Math.round(estimatedValue * 1.10);

    return {
      estimatedValue,
      minValue,
      maxValue,
      basePrice: model.basePrice,
      ageFactor,
      mileageFactor,
      conditionFactor,
      category: model.category,
      isPremium: brand?.premium || false,
    };
  }, [selectedBrand, selectedModel, year, mileage, condition]);

  const handleCalculate = () => {
    if (selectedBrand && selectedModel) {
      setShowResult(true);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  const years = Array.from({ length: 6 }, (_, i) => 2024 - i);

  return (
    <section id="kalkulator" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent" />

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
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 mb-6"
          >
            <Calculator className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fahrzeugwert-<span className="text-green-500">Kalkulator</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Erhalten Sie eine erste Einschätzung zum Wert Ihres Fahrzeugs basierend auf aktuellen Marktdaten
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
                    setShowResult(false);
                  }}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                >
                  <option value="">Marke wählen...</option>
                  {sortedBrands.map((brand) => (
                    <option key={brand.name} value={brand.name}>
                      {brand.name} {brand.premium ? "★" : ""}
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
                  onChange={(e) => {
                    setSelectedModel(e.target.value);
                    setShowResult(false);
                  }}
                  disabled={!selectedBrand}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                  onChange={(e) => {
                    setYear(Number(e.target.value));
                    setShowResult(false);
                  }}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
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
                  onChange={(e) => {
                    setMileage(Number(e.target.value));
                    setShowResult(false);
                  }}
                  min={0}
                  max={500000}
                  step={1000}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
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
                    onClick={() => {
                      setCondition(opt.value);
                      setShowResult(false);
                    }}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      condition === opt.value
                        ? "border-green-500 bg-green-500/10"
                        : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                    }`}
                  >
                    <div className={`font-semibold mb-1 ${condition === opt.value ? "text-green-500" : "text-white"}`}>
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
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Fahrzeugwert berechnen
          </motion.button>
        </motion.div>

        {/* Result Section */}
        {showResult && calculatedValue && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Euro className="w-7 h-7 text-green-500" />
              Geschätzter Fahrzeugwert
            </h3>

            {/* Main Value */}
            <div className="text-center mb-8 p-8 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl border border-green-500/20">
              <div className="text-green-400 text-sm font-medium mb-2">Geschätzter Marktwert</div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {formatPrice(calculatedValue.estimatedValue)}
              </div>
              <div className="text-gray-400">
                Preisspanne: {formatPrice(calculatedValue.minValue)} - {formatPrice(calculatedValue.maxValue)}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800/30 rounded-xl p-4">
                <div className="text-gray-400 text-xs mb-1">Neupreis (Basis)</div>
                <div className="text-white font-semibold">{formatPrice(calculatedValue.basePrice)}</div>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4">
                <div className="text-gray-400 text-xs mb-1 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  Alter-Faktor
                </div>
                <div className="text-white font-semibold">{(calculatedValue.ageFactor * 100).toFixed(0)}%</div>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4">
                <div className="text-gray-400 text-xs mb-1">KM-Faktor</div>
                <div className="text-white font-semibold">{(calculatedValue.mileageFactor * 100).toFixed(0)}%</div>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-4">
                <div className="text-gray-400 text-xs mb-1">Zustand-Faktor</div>
                <div className="text-white font-semibold">{(calculatedValue.conditionFactor * 100).toFixed(0)}%</div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-gray-800/50 rounded-full text-sm text-gray-300">
                {selectedBrand} {selectedModel}
              </span>
              <span className="px-4 py-2 bg-gray-800/50 rounded-full text-sm text-gray-300">
                EZ {year}
              </span>
              <span className="px-4 py-2 bg-gray-800/50 rounded-full text-sm text-gray-300">
                {mileage.toLocaleString('de-DE')} km
              </span>
              <span className="px-4 py-2 bg-gray-800/50 rounded-full text-sm text-gray-300">
                Zustand: {conditionOptions.find(c => c.value === condition)?.label}
              </span>
              {calculatedValue.isPremium && (
                <span className="px-4 py-2 bg-green-500/20 rounded-full text-sm text-green-400">
                  ★ Premium-Marke
                </span>
              )}
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
              <div className="flex gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-500 font-semibold mb-2">Wichtiger Hinweis</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <strong>Dies ist nur eine erste Einschätzung</strong> basierend auf durchschnittlichen Marktdaten.
                    Der tatsächliche Wert Ihres Fahrzeugs kann aufgrund individueller Faktoren wie Ausstattung,
                    Servicehistorie, Unfallfreiheit und aktuellem Marktgeschehen abweichen.
                  </p>
                  <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                    <strong>Für eine verbindliche Bewertung</strong> kontaktieren Sie uns für eine professionelle
                    Fahrzeugbewertung durch unsere Spezialisten vor Ort.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/ankauf"
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                Jetzt Fahrzeug verkaufen
              </a>
              <a
                href="tel:+491728650128"
                className="flex-1 border border-green-500 text-green-500 py-4 rounded-xl font-semibold text-center hover:bg-green-500/10 transition-all"
              >
                Kostenlose Beratung
              </a>
            </div>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">{vehicleDatabase.length}+</div>
            <div className="text-gray-400 text-sm">Marken</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">
              {vehicleDatabase.reduce((acc, brand) => acc + brand.models.length, 0)}+
            </div>
            <div className="text-gray-400 text-sm">Modelle</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">2020-2024</div>
            <div className="text-gray-400 text-sm">Baujahre</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">100%</div>
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
          <Info className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-400">
            <strong className="text-white">Wie funktioniert die Bewertung?</strong>
            <p className="mt-2">
              Unser Kalkulator berücksichtigt den Neupreis des Fahrzeugs, das Alter, den Kilometerstand
              und den Zustand. Premium-Marken haben typischerweise einen geringeren Wertverlust.
              Die Berechnung basiert auf durchschnittlichen deutschen Marktpreisen und dient als
              erste Orientierung.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
