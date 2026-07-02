"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, GraduationCap, CheckCircle, Shield, Heart, Compass, HeartPulse } from "lucide-react";

export default function About() {
  const values = [
    { icon: Heart, title: "Compassion", desc: "We listen patiently to your problems and treat you with respect, empathy, and care." },
    { icon: Shield, title: "Integrity & Safety", desc: "No harmful chemical supplements. We use purely natural remedies tested for ultimate safety." },
    { icon: Compass, title: "Holistic Vision", desc: "Addressing the mental, emotional, and physical spheres to restore core vitality." },
    { icon: Award, title: "Excellence", desc: "Applying standard diagnostic methods alongside precise homeopathic prescription rules." }
  ];

  const milestones = [
    { year: "2012", title: "BHMS Graduation", desc: "Graduated with honors in Bachelor of Homeopathic Medicine and Surgery." },
    { year: "2013", title: "Official Registration", desc: "Licensed under the AP Board of Homeopathic Medicine (Reg No. 5732)." },
    { year: "2015", title: "Clinic Foundation", desc: "Established Sarada Homeo Clinic in Srikakulam for dedicated family care." },
    { year: "2020", title: "5000+ Cured Cases", desc: "Reaching a milestones of treating acute and chronic conditions." }
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
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Dedicated Healing Partner</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-poppins font-extrabold text-slate-900 dark:text-white leading-tight">
            About Sarada Homeo Clinic
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Healing families naturally with the precision of modern science and the wisdom of classical homeopathy.
          </p>
        </motion.div>
      </section>

      {/* 2. OUR JOURNEY SECTION */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 group"
            >
              <Image
                src="/images/screens/home.png"
                alt="Sarada Homeo Clinic Journey"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
            
            {/* Right Story Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-6"
            >
              <h2 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white">
                Our Journey
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                Founded with a vision to provide authentic, effective, and safe homeopathic treatment, Sarada Homeo Clinic has grown into a beacon of holistic health in our community. Under the leadership of Dr. P. Anil Kumar, we focus on the "Gentle and Healing" philosophy—where every patient is seen as a whole being, not just a set of symptoms.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                Our clinic blends clinical precision with a warm, empathetic environment. We have spent over a decade refining our protocols to ensure that natural healing is accessible, professional, and reliable for families across generations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION CARDS (Screen 1 Visual Cards) */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-poppins font-bold text-slate-900 dark:text-white">Our Mission</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                To provide compassionate care through root-cause treatment. We strive to empower our patients with safe, natural alternatives that foster long-term recovery without side-effects.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-poppins font-bold text-slate-900 dark:text-white">Our Vision</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Creating healthier families through holistic wellness. We aim to be the global standard for integrated homeopathic care, where tradition meets modern medical professionalism.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US LIST */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white">Why Choose Us?</h2>
            <p className="text-xs text-slate-500">We combine expertise with empathy to deliver the best patient outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <motion.div 
                whileHover={{ y: -4 }}
                key={idx} 
                className="p-6 bg-slate-50 dark:bg-slate-850 rounded-2xl space-y-3 border border-slate-100 dark:border-slate-800/50"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <val.icon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">{val.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DOCTOR PROFILE CARD (Screen 1 Dark Profile Section) */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-800 items-center">
            {/* Left Photo */}
            <div className="lg:col-span-4 relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 shadow-md group">
              <Image
                src="/images/doctor.jpg"
                alt="Dr. Panchireddy Anil Kumar"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Right Information */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] text-primary dark:text-accent font-bold uppercase tracking-wider">Chief Consultant</span>
                <h3 className="text-2xl font-poppins font-bold text-white">Dr. Panchireddy Anil Kumar</h3>
                <p className="text-xs text-primary dark:text-accent font-semibold">B.H.M.S, Homeopathic Specialist</p>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Dr. P. Anil Kumar is a distinguished homeopathic practitioner known for his empathetic approach and precise diagnostic skills. With over a decade of experience, he has dedicated his career to advancing the practice of classical homeopathy. He believes that true healing begins when we understand the individual's unique physical and emotional blueprint.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <p className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">Specialization</p>
                  <p className="text-slate-300 font-medium">Chronic, Asthma & Pediatrics</p>
                </div>
                <div>
                  <p className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">Consultation</p>
                  <p className="text-slate-300 font-medium">Available Mon-Sat (9am - 8pm)</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/book"
                  className="px-5 py-2.5 bg-primary hover:bg-primary/95 text-white font-poppins text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/contact"
                  className="px-5 py-2.5 border border-slate-700 text-slate-300 hover:bg-slate-800 font-poppins text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
                >
                  Contact Clinic
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ACHIEVEMENTS TIMELINE (New Profile Sub-section) */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white">Our Medical Milestones</h2>
            <p className="text-xs text-slate-500">A timeline of clinical dedication and achievements.</p>
          </div>

          <div className="relative border-l-2 border-primary/20 dark:border-primary/40 pl-6 ml-4 space-y-10">
            {milestones.map((mile, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx} 
                className="relative"
              >
                {/* Dot */}
                <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-900" />
                
                <span className="text-[10px] font-extrabold text-primary dark:text-accent font-poppins">{mile.year}</span>
                <h4 className="font-poppins font-bold text-slate-900 dark:text-white text-sm mt-0.5">{mile.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{mile.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
