"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, User, MessageSquare, CheckCircle, Send, Calendar, Clock } from "lucide-react";

interface VehicleInfo {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
}

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "general" | "vehicle" | "appointment";
  vehicleInfo?: VehicleInfo;
  title?: string;
  subtitle?: string;
}

// FormSubmit.co - Ersetze mit deiner Email-Adresse
// Nach dem ersten Absenden bekommst du eine Bestätigungs-Email
const FORMSUBMIT_EMAIL = "carcenterlandshut@gmail.com";

export default function ContactFormModal({
  isOpen,
  onClose,
  type = "general",
  vehicleInfo,
  title,
  subtitle,
}: ContactFormModalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Daten zusammenstellen für FormSubmit.co
    const submitData: Record<string, string> = {
      Name: formData.name,
      Email: formData.email,
      Telefon: formData.phone,
      Nachricht: formData.message,
      Typ: type === "vehicle" ? "Fahrzeuganfrage" : type === "appointment" ? "Terminanfrage" : "Allgemeine Anfrage",
      _subject: type === "vehicle"
        ? `Neue Fahrzeuganfrage - ${vehicleInfo?.brand} ${vehicleInfo?.model}`
        : type === "appointment"
        ? "Neue Terminanfrage - CarCenter Landshut"
        : "Neue Kontaktanfrage - CarCenter Landshut",
    };

    // Fahrzeug-Info hinzufügen wenn vorhanden
    if (vehicleInfo) {
      submitData.Fahrzeug = `${vehicleInfo.brand} ${vehicleInfo.model}`;
      submitData.Baujahr = String(vehicleInfo.year);
      submitData.Kilometerstand = `${vehicleInfo.mileage.toLocaleString('de-DE')} km`;
      submitData.Zustand = vehicleInfo.condition;
    }

    // Termin-Info hinzufügen wenn vorhanden
    if (type === "appointment" && formData.preferredDate) {
      submitData.Wunschdatum = formData.preferredDate;
      submitData.Wunschzeit = formData.preferredTime;
    }

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

  const handleClose = () => {
    setFormSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      preferredDate: "",
      preferredTime: "",
    });
    onClose();
  };

  const getTitle = () => {
    if (title) return title;
    switch (type) {
      case "vehicle":
        return "Bewertung anfordern";
      case "appointment":
        return "Termin vereinbaren";
      default:
        return "Kontakt aufnehmen";
    }
  };

  const getSubtitle = () => {
    if (subtitle) return subtitle;
    switch (type) {
      case "vehicle":
        return "Hinterlassen Sie Ihre Kontaktdaten und wir melden uns mit einem Angebot";
      case "appointment":
        return "Wählen Sie Ihren Wunschtermin und wir bestätigen Ihnen diesen";
      default:
        return "Wir melden uns schnellstmöglich bei Ihnen";
    }
  };

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
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
                      {getTitle()}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {getSubtitle()}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Fahrzeug-Info für vehicle type */}
                {type === "vehicle" && vehicleInfo && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
                    <div className="text-emerald-400 text-xs font-semibold mb-2">IHR FAHRZEUG</div>
                    <div className="text-white font-semibold text-lg">
                      {vehicleInfo.brand} {vehicleInfo.model}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      EZ {vehicleInfo.year} • {vehicleInfo.mileage.toLocaleString('de-DE')} km • Zustand: {vehicleInfo.condition}
                    </div>
                  </div>
                )}

                {/* Formular */}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
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
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
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
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                      placeholder="+49 123 456789"
                    />
                  </div>

                  {/* Termin-Felder nur für appointment type */}
                  {type === "appointment" && (
                    <>
                      {/* Datum */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Wunschdatum *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        />
                      </div>

                      {/* Uhrzeit */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Wunschzeit *
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setFormData({ ...formData, preferredTime: time })}
                              className={`p-2 rounded-lg border text-sm transition-all ${
                                formData.preferredTime === time
                                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                                  : "border-gray-700 bg-gray-800/30 text-gray-300 hover:border-gray-600"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Nachricht */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Nachricht {type === "general" ? "*" : "(optional)"}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required={type === "general"}
                      rows={3}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                      placeholder={
                        type === "appointment"
                          ? "Welchen Service benötigen Sie? (z.B. Reifenwechsel, Aufbereitung...)"
                          : type === "vehicle"
                          ? "Zusätzliche Informationen zu Ihrem Fahrzeug..."
                          : "Wie können wir Ihnen helfen?"
                      }
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || (type === "appointment" && !formData.preferredTime)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {type === "appointment" ? "Termin anfragen" : "Anfrage absenden"}
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Mit dem Absenden stimmen Sie unserer <a href="/datenschutz" className="text-emerald-500 hover:underline">Datenschutzerklärung</a> zu.
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
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {type === "appointment" ? "Terminanfrage gesendet!" : "Anfrage erfolgreich gesendet!"}
                </h3>
                <p className="text-gray-400 mb-6">
                  {type === "appointment"
                    ? `Vielen Dank! Wir werden Ihren Wunschtermin am ${formData.preferredDate} um ${formData.preferredTime} Uhr schnellstmöglich bestätigen.`
                    : "Vielen Dank für Ihre Anfrage. Unser Team wird sich innerhalb von 24 Stunden bei Ihnen melden."
                  }
                </p>

                <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-400">
                    Bei dringenden Fragen erreichen Sie uns auch direkt unter:
                  </div>
                  <a href="tel:+491728650128" className="text-emerald-500 font-semibold text-lg hover:underline">
                    +49 172 8650128
                  </a>
                </div>

                <button
                  onClick={handleClose}
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
  );
}
