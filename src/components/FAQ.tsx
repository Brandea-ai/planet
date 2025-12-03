"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Wie gestaltet sich der Ablauf des Ankaufs?",
    answer: "Zunächst besprechen wir Ihre Anforderungen und Wünsche, anschließend führen wir eine Bewertung durch, und letztendlich schließen wir den Kaufvertrag ab. Unser Team steht Ihnen dabei jederzeit unterstützend zur Seite.",
  },
  {
    question: "Kaufen Sie auch beschädigte Fahrzeuge an?",
    answer: "Für den Ankauf benötigen wir genauere Informationen zu Ihrem Schaden. Zusätzlich bietet unser Serviceteam Reifenwechsel und professionelle Aufbereitung an.",
  },
  {
    question: "Was hebt unser Unternehmen von der Konkurrenz ab?",
    answer: "Drei entscheidende Punkte: 1. Exzellente Fachkompetenz - Unsere hochqualifizierten Techniker und Berater verfügen über umfangreiche Erfahrung. 2. Modernste Technik - Wir setzen auf neueste Technologie und innovative Verfahren. 3. Kundenzufriedenheit - Maßgeschneiderte Dienstleistungen, transparente und faire Preise.",
  },
  {
    question: "Bieten Sie ebenfalls die Organisation und Durchführung des Fahrzeugtransports an?",
    answer: "Im Rahmen unseres Ankaufservices sind wir in der Lage, auch weite Strecken für die Abholung Ihres Fahrzeugs zu überbrücken. Selbstverständlich werden Ihnen hierfür keine zusätzlichen Kosten in Rechnung gestellt.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-#6cb036/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-#6cb036/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-#6cb036/20 to-#5a9a2d/20 mb-6">
            <HelpCircle className="w-8 h-8 text-#6cb036" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Häufige <span className="text-#6cb036">Fragen</span>
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
                  activeIndex === index ? "border-#6cb036/30" : ""
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
                    activeIndex === index ? "bg-#6cb036" : "bg-gray-800"
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
            href="tel:+491728650128"
            className="inline-flex items-center gap-2 text-#6cb036 font-semibold hover:text-#7ec843 transition-colors"
          >
            Kontaktieren Sie uns direkt
          </a>
        </motion.div>
      </div>
    </section>
  );
}
