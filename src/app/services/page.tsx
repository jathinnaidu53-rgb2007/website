"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Baby,
  Smile,
  Activity,
  Layers,
  Sparkles,
  Shield,
  Stethoscope,
  Flame,
  Brain,
  Feather,
  PlusCircle,
  ArrowRight,
  ClipboardList
} from "lucide-react";

const services = [
  { icon: Stethoscope, title: "General Homeopathy", desc: "Holistic general medicine to restore vitality, improve natural metabolic balance, and resolve recurring acute illnesses." },
  { icon: Baby, title: "Children's Health Care", desc: "Extremely gentle, chemical-free remedies suitable for infants and kids dealing with poor growth, colic, tonsillitis, and asthma." },
  { icon: Smile, title: "Women's Health Care", desc: "Hormonal management plans focusing on PCOD/PCOS, thyroid imbalances, menstrual irregularities, and emotional health." },
  { icon: Sparkles, title: "Skin Disorders Care", desc: "Targeted root-cause treatments for eczema, acne, psoriasis, chronic hives, and persistent skin rashes." },
  { icon: Shield, title: "Allergy Management", desc: "Desensitizing the body naturally to resolve dust, pollen, and food allergies without lifelong antihistamine dependencies." },
  { icon: Activity, title: "Respiratory Disorders", desc: "Long-term healing pathways for asthma, bronchitis, sinus congestion, and recurrent nasal allergies." },
  { icon: Layers, title: "Digestive Problems", desc: "Permanent relief from hyperacidity, IBS, chronic constipation, bloating, gastritis, and ulcers." },
  { icon: Brain, title: "Migraine Treatment", desc: "Reducing headache frequency, intensity, and duration by correcting neurological triggers and stress points." },
  { icon: Flame, title: "Joint Pain Management", desc: "Managing musculoskeletal wear and tear, reducing inflammation in rheumatoid and osteo-arthritis." },
  { icon: PlusCircle, title: "Chronic Disease Care", desc: "Specialized remedies for stubborn, long-standing health issues that conventional medicine has failed to treat." },
  { icon: Heart, title: "Lifestyle Disorders Care", desc: "Supportive homeopathic therapies to manage high cholesterol, obesity, hypertension, and stress markers." },
  { icon: Feather, title: "Immunity Enhancement", desc: "Natural therapies designed to enhance cellular resilience, reducing seasonal cold and cough vulnerabilities." }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function Services() {
  const steps = [
    { num: "01", title: "In-Depth Case Study", desc: "We conduct an extensive analysis covering physical symptoms, lifestyle, genetic background, and emotional factors." },
    { num: "02", title: "Remedy Selection", desc: "Applying repertorization rules to pinpoint the single homeopathic remedy that maps exactly to your constitution." },
    { num: "03", title: "Natural Prescription", desc: "We provide highly diluted, safe remedies along with precise dietary and lifestyle recommendations." },
    { num: "04", title: "Progress Monitoring", desc: "Periodic follow-ups to evaluate recovery steps, modifying remedy potencies as your vital force returns." }
  ];

  return (
    <div className="flex flex-col w-full bg-slate-50 dark:bg-slate-950 font-inter overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-teal-50/20 to-slate-50 dark:from-slate-900/10 dark:to-slate-950 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary dark:text-accent rounded-full text-xs font-semibold">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Comprehensive Treatment Offerings</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-poppins font-extrabold text-slate-900 dark:text-white leading-tight">
            Our Homeopathic Services
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We provide specialized, safe, and natural treatment structures for 12 key therapeutic fields, catering to all ages.
          </p>
        </motion.div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((serv, idx) => (
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -6 }}
                key={idx}
                className="glass-card p-8 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div className="space-y-4 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <serv.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-poppins font-bold text-lg text-slate-900 dark:text-white leading-tight mt-2">
                    {serv.title}
                  </h3>
                  <p className="text-xs font-inter text-slate-500 dark:text-slate-400 leading-relaxed">
                    {serv.desc}
                  </p>
                </div>
                <div className="pt-6 text-left">
                  <Link
                    href="/treatments"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-accent hover:underline group/link"
                  >
                    <span>View Treatment Protocol</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. TREATMENT PROCESS STEPS */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-primary dark:text-accent font-semibold tracking-wider uppercase text-sm font-poppins">
              Patient Journey
            </span>
            <h2 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">
              Our 4-Step Homeopathic Healing Process
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Unlike allopathy which focuses on suppressing symptoms, our clinical flow follows a thorough mapping of symptoms for permanent relief.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {steps.map((step, idx) => (
              <div key={idx} className="relative bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                <span className="text-5xl font-poppins font-extrabold text-primary/10 dark:text-accent/15 block -mt-2">
                  {step.num}
                </span>
                <div className="space-y-1">
                  <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-inter">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-2xl font-poppins font-bold">Need a Personalized Consultation?</h2>
          <p className="text-xs text-teal-50 font-inter max-w-xl mx-auto leading-relaxed">
            Every case is unique. Consult with Dr. Anil Kumar to find the right homeopathic path to recover from your health conditions.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/book"
              className="px-6 py-3 bg-white text-primary font-poppins text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Book Appointment
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-white hover:bg-white/10 font-poppins text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              Contact Clinic
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
