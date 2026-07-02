"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Phone,
  Calendar,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Smile,
  ChevronRight,
  HeartPulse,
  Leaf,
  Star,
  Quote
} from "lucide-react";

// Mock testimonial data matching Screen 5 "What Our Patients Say"
const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Patient since 2021",
    rating: 5,
    text: "I was suffering from severe asthma for over 5 years. Dr. Anil Kumar's homeopathic treatment showed massive improvements within 3 months. Now I live inhaler-free!",
  },
  {
    name: "Kiran M.",
    role: "Reviewed on Google",
    rating: 5,
    text: "Excellent doctor! He listens patiently and details the root causes. My chronic eczema has completely cleared up. Highly recommended for long-term health.",
  },
  {
    name: "Triveni G.",
    role: "Patient",
    rating: 5,
    text: "Very professional and effective homeopathic care. The joint pains that restricted my movements for years have subsided significantly. The clinic environment is peaceful.",
  }
];

const services = [
  {
    title: "General Homeopathy",
    desc: "Comprehensive homeopathic treatment for chronic and acute conditions.",
    bullets: ["Digestive Disorders", "Hormonal Imbalance", "Chronic Fatigue"],
    tag: "Primary Care",
    icon: Stethoscope,
  },
  {
    title: "Paediatrics",
    desc: "Safe and gentle homeopathic remedies for infant colic, teething, and child development support.",
    bullets: ["Immunity Boosters", "Allergy Relief", "Sleep Issues"],
    tag: "Child Care",
    icon: Smile,
  },
  {
    title: "Skin Care",
    desc: "Effective treatment for eczema, psoriasis, acne, and hives using natural remedies.",
    bullets: ["Psoriasis Management", "Acne & Scar Healing", "Fungal Infections"],
    tag: "Dermatology",
    icon: Leaf,
  },
];

// Helper component for count-up numbers on view
function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span ref={elementRef}>{count}</span>;
}

export default function Home() {
  const [clinicStatus, setClinicStatus] = useState({ open: false, next: "Checking status..." });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHoveringTestimonial, setIsHoveringTestimonial] = useState(false);

  // Timings checking logic
  useEffect(() => {
    const getStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const time = hours * 60 + minutes;

      if (day === 0) return { open: false, next: "Opens Monday at 9:00 AM" };

      if (day === 1 || day === 2 || day === 3 || day === 5) {
        // Mon, Tue, Wed, Fri: 9-1 & 6-8
        if (time >= 540 && time < 780) return { open: true, next: "Closes at 1:00 PM" };
        if (time >= 1080 && time < 1200) return { open: true, next: "Closes at 8:00 PM" };
        if (time < 540) return { open: false, next: "Opens at 9:00 AM today" };
        if (time >= 780 && time < 1080) return { open: false, next: "Opens at 6:00 PM today" };
        return { open: false, next: `Opens tomorrow at ${day === 3 ? "11:00 AM" : "9:00 AM"}` };
      }

      if (day === 4) {
        // Thu: 11-1 & 6-8
        if (time >= 660 && time < 780) return { open: true, next: "Closes at 1:00 PM" };
        if (time >= 1080 && time < 1200) return { open: true, next: "Closes at 8:00 PM" };
        if (time < 660) return { open: false, next: "Opens at 11:00 AM today" };
        if (time >= 780 && time < 1080) return { open: false, next: "Opens at 6:00 PM today" };
        return { open: false, next: "Opens tomorrow at 9:00 AM" };
      }

      if (day === 6) {
        // Sat: 10-12
        if (time >= 600 && time < 720) return { open: true, next: "Closes at 12:00 PM today" };
        if (time < 600) return { open: false, next: "Opens at 10:00 AM today" };
        return { open: false, next: "Opens Monday at 9:00 AM" };
      }

      return { open: false, next: "Closed" };
    };

    setClinicStatus(getStatus());
    const interval = setInterval(() => setClinicStatus(getStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    if (isHoveringTestimonial) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHoveringTestimonial]);

  return (
    <div className="flex flex-col w-full bg-slate-50 dark:bg-slate-950 font-inter overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-teal-50/20 via-slate-50 to-white dark:from-slate-900/10 dark:via-slate-950 dark:to-slate-950">
        
        {/* Floating background decorative blobs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl animate-float-delayed pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary dark:text-accent rounded-full text-xs font-semibold">
                <HeartPulse className="w-3.5 h-3.5" />
                <span>★ ★ ★ ★ ★ Rated Homeopathy Clinic</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-poppins font-extrabold text-slate-900 dark:text-white leading-tight">
                Natural Healing <br />
                Through <span className="text-primary italic font-serif font-light dark:text-accent">Trusted</span> <br />
                Homeopathic Care
              </h1>
              
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                Experience safe, chemical-free and personalized holistic healthcare at Sarada Homeo Clinic. Led by Dr. Panchireddy Anil Kumar, we treat the root cause, not just symptoms.
              </p>

              {/* Timing Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
                <span className={`w-2.5 h-2.5 rounded-full ${clinicStatus.open ? "bg-success animate-pulse" : "bg-danger"}`} />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {clinicStatus.open ? "Open Now" : "Closed"}
                </span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{clinicStatus.next}</span>
              </div>

              {/* Call-to-actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/book"
                  className="px-6 py-3.5 bg-primary hover:bg-primary/95 text-white font-poppins text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105"
                >
                  Book Appointment
                </Link>
                <a
                  href="tel:+919440955008"
                  className="px-6 py-3.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-poppins text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all"
                >
                  📞 Call +91 94409 55008
                </a>
              </div>

              {/* Quick stats grid with count-up animations */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-900">
                <div>
                  <h4 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white">
                    <Counter value={5000} />+
                  </h4>
                  <p className="text-xs text-slate-500">Happy Patients Treated</p>
                </div>
                <div>
                  <h4 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white">
                    <Counter value={10} />+
                  </h4>
                  <p className="text-xs text-slate-500">Years Clinical Excellence</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Right Content - Styled Doctor Portrait */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-6 relative flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 group">
                <Image
                  src="/images/doctor.jpg"
                  alt="Dr. Panchireddy Anil Kumar"
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                
                {/* Floating details card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex justify-between items-center shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                  <div>
                    <h3 className="font-poppins font-bold text-slate-900 dark:text-white text-sm">Dr. P. Anil Kumar</h3>
                    <p className="text-[10px] text-primary dark:text-accent font-semibold">Homeopathic Physician</p>
                  </div>
                  <span className="px-2.5 py-1 bg-primary text-white text-[10px] rounded-lg font-bold">
                    Reg. No. 5732
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES ROW */}
      <section className="py-8 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "100% Safe & Natural", desc: "No chemical side effects" },
              { label: "Personalized Care", desc: "Individualized case evaluation" },
              { label: "Evidence Based", desc: "Proven clinical success records" },
              { label: "Holistic Approach", desc: "Mind and body healing" }
            ].map((badge, idx) => (
              <div key={idx} className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">{badge.label}</h4>
                <p className="text-xs text-slate-500">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EXPERTISE SECTION (Decades of Expertise) */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Texts */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-accent">Expertise & Quality</span>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-slate-900 dark:text-white">
                Decades of Expertise in Holistic Healing
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Dr. Panchireddy Anil Kumar (Reg. No. 5732) is a visionary practitioner dedicated to the art of homeopathy. Under his leadership, Sarada Homeo Clinic has grown into a beacon of healing.
              </p>
              
              {/* Bullet checklist */}
              <ul className="space-y-3.5">
                {[
                  { title: "Personalized Care", desc: "Every case is analyzed holistically to tailormake your prescription." },
                  { title: "Holistic Medicine", desc: "Rebalancing your body's natural defense systems without side-effects." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Images grid - Mosaic style */}
            <div className="lg:col-span-7 grid grid-cols-12 gap-4">
              <div className="col-span-8 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group">
                <Image src="/images/screens/home.png" alt="Clinic Interior" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="col-span-4 relative aspect-square rounded-3xl overflow-hidden shadow-md group">
                <Image src="/images/screens/logo_plus.png" alt="Logo" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="col-span-4 relative aspect-square rounded-3xl overflow-hidden shadow-md group">
                <Image src="/images/screens/about.png" alt="Doctor Consultation" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="col-span-8 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group">
                <Image src="/images/screens/contact.png" alt="Medicine Room" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR SPECIALIZED CARE */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">Our Specialized Care</h2>
            <p className="text-sm text-slate-500">Provide safe, scientific, and permanent cures for a wide range of diseases.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((item, idx) => (
              <motion.div 
                whileHover={{ y: -8 }}
                key={idx} 
                className="glass-card p-6 rounded-3xl flex flex-col justify-between h-full group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-primary dark:text-accent font-bold uppercase tracking-wider">{item.tag}</span>
                    <h3 className="text-lg font-poppins font-bold text-slate-900 dark:text-white mt-1">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
                <ul className="space-y-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE SARADA CLINIC? */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Accent badge card */}
            <div className="lg:col-span-4 p-8 bg-primary rounded-3xl text-white space-y-6">
              <h3 className="font-poppins font-bold text-xl leading-tight">Need Urgent Consultation?</h3>
              <p className="text-sm text-teal-50 leading-relaxed">
                Connect directly with the doctor to discuss emergency cases or check immediate availability.
              </p>
              <a
                href="tel:+919440955008"
                className="block text-center py-3.5 bg-white text-primary font-poppins font-bold rounded-xl hover:bg-teal-50 transition-all text-sm shadow-md"
              >
                📞 Call +91 94409 55008
              </a>
            </div>

            {/* Grid checklist of choices */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">Why Choose Sarada Clinic?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Experienced Doctor", desc: "Dr. Anil Kumar brings over a decade of clinical homeopathic practice." },
                  { title: "Safe Medicines", desc: "100% natural, non-toxic remedies without side-effects for all age groups." },
                  { title: "Root Cause Analysis", desc: "We evaluate mental, physical and genetic history to target root causes." },
                  { title: "Patient Success", desc: "Over 5000+ satisfied patients treated successfully across Srikakulam." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT OUR PATIENTS SAY (Premium Carousel Carousel) */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">What Our Patients Say</h2>
            <p className="text-sm text-slate-500">Real feedback from patients treated at our clinic.</p>
          </div>

          {/* Testimonial slider component */}
          <div 
            className="max-w-3xl mx-auto relative px-4"
            onMouseEnter={() => setIsHoveringTestimonial(true)}
            onMouseLeave={() => setIsHoveringTestimonial(false)}
          >
            <div className="relative min-h-[220px] flex items-center justify-center bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700 p-8 sm:p-10">
              
              <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/10 dark:text-accent/10" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-center w-full"
                >
                  <div className="flex justify-center text-amber-500 text-sm gap-1">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-300 leading-relaxed italic font-medium max-w-xl mx-auto">
                    "{testimonials[activeTestimonial].text}"
                  </p>

                  <div className="pt-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeTestimonial ? "bg-primary w-6" : "bg-slate-300 dark:bg-slate-700"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. SCHEDULER & CONTACT CARD (Screen 5 Footer Design) */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-800">
            {/* Timings Left Card */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-2xl font-poppins font-bold text-white">Schedule Your Consultation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check our official timings block below and coordinate your visit. We will call you within 2 hours of booking request submission.
              </p>
              
              {/* Timing list */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Mon/Tue/Wed/Fri</span>
                  <span>9:00 AM - 1:00 PM & 6:00 PM - 8:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Thursday</span>
                  <span>11:00 AM - 1:00 PM & 6:00 PM - 8:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Saturday</span>
                  <span>10:00 AM - 12:00 PM</span>
                </div>
                <div className="flex justify-between text-danger font-semibold">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4 text-xs">
                <div>
                  <p className="text-slate-400">Clinic Location</p>
                  <p className="font-bold">Opposite Diamond Park, Srikakulam</p>
                </div>
              </div>
            </div>

            {/* Quick booking form Right Card */}
            <div className="lg:col-span-7 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="font-poppins font-bold text-sm">Send Quick Booking Request</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-primary rounded-xl text-xs focus:outline-none text-white transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-primary rounded-xl text-xs focus:outline-none text-white transition-colors"
                />
              </div>

              <input
                type="date"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-primary rounded-xl text-xs focus:outline-none text-white transition-colors"
              />

              <textarea
                rows={3}
                placeholder="Health Concerns..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-primary rounded-xl text-xs focus:outline-none text-white transition-colors"
              />

              <Link
                href="/book"
                className="block text-center w-full py-3 bg-primary hover:bg-primary/95 text-white text-xs font-poppins font-bold rounded-xl transition-all hover:scale-[1.01]"
              >
                Confirm Appointment Slot
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
