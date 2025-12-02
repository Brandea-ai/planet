"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Mail } from "lucide-react";

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-black to-black" />

        <div className="max-w-4xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 mb-6">
              <Shield className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Datenschutzerklärung
            </h1>
            <p className="text-gray-400">
              Informationen zum Umgang mit Ihren personenbezogenen Daten
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12 space-y-10"
          >
            {/* Einleitung */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Datenschutz auf einen Blick</h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <h3 className="text-xl font-semibold text-white">Allgemeine Hinweise</h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </div>
            </div>

            {/* Datenerfassung */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Datenerfassung auf dieser Website</h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <h3 className="text-xl font-semibold text-white">Wer ist verantwortlich für die Datenerfassung?</h3>
                <p>
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>

                <h3 className="text-xl font-semibold text-white mt-6">Wie erfassen wir Ihre Daten?</h3>
                <p>
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p>
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>

                <h3 className="text-xl font-semibold text-white mt-6">Wofür nutzen wir Ihre Daten?</h3>
                <p>
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
              </div>
            </div>

            {/* Rechte */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Ihre Rechte</h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>Sie haben jederzeit das Recht:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten</li>
                  <li>Berichtigung unrichtiger personenbezogener Daten zu verlangen</li>
                  <li>Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
                  <li>Einschränkung der Datenverarbeitung zu verlangen</li>
                  <li>Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen</li>
                  <li>Datenübertragbarkeit zu verlangen</li>
                </ul>
              </div>
            </div>

            {/* Hosting */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Hosting</h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
                </p>
                <p>
                  Der Einsatz des Hosters erfolgt im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
              </div>
            </div>

            {/* Kontaktformular */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Kontaktformular</h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
                <p>
                  Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p>
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
                </p>
                <p>
                  Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.
                </p>
              </div>
            </div>

            {/* SSL */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. SSL- bzw. TLS-Verschlüsselung</h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung.
                </p>
                <p>
                  Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </div>
            </div>

            {/* Kontakt Datenschutz */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Kontakt zum Datenschutz</h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail:
                </p>
                <a
                  href="mailto:carcenterlandshut@gmail.com"
                  className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  carcenterlandshut@gmail.com
                </a>
              </div>
            </div>

            {/* Stand */}
            <div className="pt-6 border-t border-gray-800">
              <p className="text-gray-500 text-sm">
                Stand: Dezember 2024
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
