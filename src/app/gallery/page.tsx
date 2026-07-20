"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, CalendarCheck, Phone, Sparkles, Clock, ImageOff } from "lucide-react";

const featureCards = [
  {
    icon: Camera,
    title: "Clinic Exterior",
    desc: "Our clinic location and entrance in Srikakulam."
  },
  {
    icon: Sparkles,
    title: "Consultation Room",
    desc: "The chamber where healing begins — Dr. Anil Kumar's desk."
  },
  {
    icon: ImageOff,
    title: "Waiting Area",
    desc: "A comfortable space for patients before their appointment."
  },
  {
    icon: Clock,
    title: "Medicine Section",
    desc: "Our in-house homeopathic dilutions and remedy stocks."
  }
];

export default function Gallery() {
  return (
    <div className="flex flex-col w-full bg-slate-50 dark:bg-slate-950 font-inter overflow-hidden min-h-screen">

      {/* HERO SECTION */}
      <section
        className="relative pt-32 pb-20 bg-gradient-to-b from-teal-50/30 to-slate-50 dark:from-slate-900/20 dark:to-slate-950"
        aria-label="Gallery Coming Soon"
      >
        {/* Decorative blurred orb */}
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-teal-400/10 dark:bg-teal-500/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 dark:bg-teal-500/10 text-primary dark:text-teal-400 rounded-full text-xs font-semibold tracking-widest uppercase border border-primary/20 dark:border-teal-500/20">
              <Camera className="w-3.5 h-3.5" />
              <span>Clinic Gallery</span>
            </div>

            {/* Animated gallery icon */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-400/20 to-emerald-400/10 dark:from-teal-500/10 dark:to-emerald-500/5 blur-xl" aria-hidden="true" />
              <div className="relative w-28 h-28 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl flex items-center justify-center">
                <Camera className="w-12 h-12 text-primary dark:text-teal-400" strokeWidth={1.4} />
                {/* Sparkle dots */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="absolute top-3 right-3 w-2 h-2 bg-teal-400 rounded-full"
                  aria-hidden="true"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.8 }}
                  className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-emerald-400 rounded-full"
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                Gallery{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">
                  Coming Soon
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                We are updating our clinic gallery with new photos. Please check back soon to explore our facilities and patient care environment.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <Link
                href="/book"
                id="gallery-cta-book"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-full font-poppins font-semibold text-sm shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Appointment
              </Link>
              <Link
                href="/contact"
                id="gallery-cta-contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-full font-poppins font-semibold text-sm shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PREVIEW CARDS SECTION — what will be in the gallery */}
      <section className="py-16 bg-white dark:bg-slate-900" aria-label="Gallery preview categories">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary dark:text-teal-400">
              Coming Up
            </p>
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-slate-900 dark:text-white">
              What You'll Find in Our Gallery
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              A curated look at our clinic spaces, care environment, and team.
            </p>
          </motion.div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative flex flex-col items-center text-center gap-4 p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/60 to-transparent dark:from-teal-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" aria-hidden="true" />

                {/* Placeholder shimmer block */}
                <div className="w-full h-28 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" aria-hidden="true" />
                  <card.icon className="w-8 h-8 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
                </div>

                <div className="space-y-1 relative z-10">
                  <h3 className="font-poppins font-bold text-slate-800 dark:text-white text-sm">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA STRIP */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-emerald-700 dark:from-teal-800 dark:to-emerald-900" aria-label="Appointment call to action">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="text-sm text-teal-100 max-w-md mx-auto leading-relaxed">
              Don't wait for the gallery — visit us in person or book your appointment with Dr. Panchireddi Anil Kumar today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/book"
                id="gallery-bottom-cta-book"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-teal-700 rounded-full font-poppins font-semibold text-sm shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Appointment
              </Link>
              <Link
                href="/contact"
                id="gallery-bottom-cta-contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 border border-white/20 text-white rounded-full font-poppins font-semibold text-sm transition-all duration-200 hover:bg-white/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
