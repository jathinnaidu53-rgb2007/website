"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Search, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryCategory = "clinic" | "consultation" | "medicine" | "doctor" | "waiting";

interface GalleryItem {
  id: number;
  category: GalleryCategory;
  title: string;
  caption: string;
  alt: string;
  imgUrl: string;
}

/* ── Exact order specified by the user ── */
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: "clinic",
    title: "Sarada Homeo Clinic Exterior",
    caption: "Sarada Homeo Clinic Exterior",
    alt: "Sarada Homeo Clinic Exterior — front view with signage, Srikakulam",
    imgUrl: "/images/gallery/clinic-exterior.jpg"
  },
  {
    id: 2,
    category: "consultation",
    title: "Doctor Consulting Patient",
    caption: "Doctor Consultation with Patient",
    alt: "Doctor consulting a patient at Sarada Homeo Clinic",
    imgUrl: "/images/gallery/doctor-consultation.jpg"
  },
  {
    id: 3,
    category: "medicine",
    title: "Homeopathic Medicine Section",
    caption: "Homeopathic Medicine Collection",
    alt: "Homeopathic medicine shelves stocked with dilutions and remedies",
    imgUrl: "/images/gallery/medicine-section.jpg"
  },
  {
    id: 4,
    category: "doctor",
    title: "Dr. Panchireddi Anil Kumar",
    caption: "Dr. Panchireddi Anil Kumar, BHMS",
    alt: "Dr. Panchireddi Anil Kumar (BHMS) — Chief Physician, Sarada Homeo Clinic",
    imgUrl: "/images/doctor/doctor-portrait.jpg"
  },
  {
    id: 5,
    category: "waiting",
    title: "Patient Waiting Area",
    caption: "Patient Waiting Area",
    alt: "Patient waiting area at Sarada Homeo Clinic",
    imgUrl: "/images/gallery/waiting-area.jpg"
  }
];

const filterTabs = [
  { id: "all",          label: "All" },
  { id: "clinic",       label: "Clinic Exterior" },
  { id: "consultation", label: "Consultation" },
  { id: "medicine",     label: "Medicine" },
  { id: "doctor",       label: "Doctor" },
  { id: "waiting",      label: "Waiting Area" }
];

export default function Gallery() {
  const [filter, setFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  /* Keyboard navigation for lightbox */
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((p) => (p !== null ? (p + 1) % filteredItems.length : null));
      if (e.key === "ArrowLeft")
        setLightboxIndex((p) =>
          p !== null ? (p - 1 + filteredItems.length) % filteredItems.length : null
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <div className="flex flex-col w-full bg-slate-50 dark:bg-slate-950 font-inter overflow-hidden">

      {/* ── 1. HERO ── */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-teal-50/20 to-slate-50 dark:from-slate-900/10 dark:to-slate-950 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary dark:text-accent rounded-full text-xs font-semibold">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Clinic Infrastructure</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-poppins font-extrabold text-slate-900 dark:text-white leading-tight">
            Our Gallery &amp; Space
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Take a visual tour of our consulting chambers, pharmacy, waiting lounge, and our doctor.
          </p>
        </motion.div>
      </section>

      {/* ── 2. GALLERY GRID ── */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Gallery filter">
            {filterTabs.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={filter === cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2 rounded-full font-poppins font-semibold text-[10px] uppercase tracking-widest transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  filter === cat.id
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Responsive Grid: 1 → 2 → 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
                    <Image
                      src={item.imgUrl}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay with search icon */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 flex items-center justify-center transition-colors duration-300">
                      <Search className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Caption bar */}
                  <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="font-poppins font-bold text-slate-900 dark:text-white text-sm">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-inter mt-1 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── 3. LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((p) =>
                  p !== null ? (p - 1 + filteredItems.length) % filteredItems.length : null
                );
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors hidden md:block focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((p) =>
                  p !== null ? (p + 1) % filteredItems.length : null
                );
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors hidden md:block focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image & info */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl w-full text-center space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-80 sm:h-[450px] relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                <Image
                  src={filteredItems[lightboxIndex].imgUrl}
                  alt={filteredItems[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
              <div className="space-y-1 text-white">
                <h3 className="font-poppins font-bold text-base sm:text-lg">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs font-inter text-slate-400">
                  {filteredItems[lightboxIndex].caption}
                </p>
              </div>
              {/* Dot navigation */}
              <div className="flex justify-center gap-1.5 pt-2">
                {filteredItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setLightboxIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      lightboxIndex === index ? "w-6 bg-primary" : "w-2 bg-white/20"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
