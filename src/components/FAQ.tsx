"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Wie funktioniert der Autoankauf?",
    answer: "Der Ankauf ist einfach: Kontaktieren Sie uns mit Ihren Fahrzeugdaten, wir erstellen eine kostenlose Bewertung und machen Ihnen ein faires Angebot. Bei Einigung holen wir das Fahrzeug ab und Sie erhalten sofort Ihr Geld.",
  },
  {
    question: "Welche Fahrzeuge kaufen Sie an?",
    answer: "Wir kaufen alle Marken und Modelle an – egal ob PKW, SUV, Transporter oder Unfallwagen. Auch ältere Fahrzeuge oder Autos mit hoher Laufleistung sind für uns interessant.",
  },
  {
    question: "Wie schnell erfolgt die Auszahlung?",
    answer: "Die Auszahlung erfolgt sofort bei Übergabe des Fahrzeugs. Sie können zwischen Barzahlung oder Überweisung wählen. Bei Überweisung ist das Geld in der Regel am gleichen oder nächsten Werktag auf Ihrem Konto.",
  },
  {
    question: "Muss ich einen Termin für den Reifenwechsel vereinbaren?",
    answer: "Ja, wir empfehlen eine Terminvereinbarung, um Wartezeiten zu vermeiden. Rufen Sie uns an oder nutzen Sie unser Online-Formular. Bei Verfügbarkeit nehmen wir auch kurzfristige Termine an.",
  },
  {
    question: "Bieten Sie auch Finanzierungsmöglichkeiten an?",
    answer: "Ja, wir arbeiten mit verschiedenen Finanzierungspartnern zusammen und können Ihnen attraktive Finanzierungsangebote für unsere Fahrzeuge unterbreiten. Sprechen Sie uns einfach an.",
  },
  {
    question: "Kann ich mein Fahrzeug auch in Zahlung geben?",
    answer: "Selbstverständlich! Wir nehmen Ihr altes Fahrzeug gerne in Zahlung. Der Wert wird fair berechnet und vom Kaufpreis des neuen Fahrzeugs abgezogen.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 mb-6">
            <HelpCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Häufige <span className="gradient-text">Fragen</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Hier finden Sie Antworten auf die häufigsten Fragen unserer Kunden.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "border-green-500/30" : ""
                }`}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    activeIndex === index ? "bg-green-500" : "bg-gray-800"
                  }`}>
                    {activeIndex === index ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px bg-gray-800 mb-4" />
                        <p className="text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            Haben Sie weitere Fragen?
          </p>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 text-green-500 font-semibold hover:text-green-400 transition-colors"
          >
            Kontaktieren Sie uns direkt
          </a>
        </motion.div>
      </div>
    </section>
  );
}
