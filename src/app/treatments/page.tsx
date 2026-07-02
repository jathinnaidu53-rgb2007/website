"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShieldAlert,
  Flame,
  Activity,
  CheckCircle2,
  ChevronRight,
  ClipboardList
} from "lucide-react";

interface TreatmentData {
  id: string;
  name: string;
  symptoms: string[];
  causes: string[];
  approach: string;
  duration: string;
  benefits: string[];
  quote: string;
}

const treatmentsData: TreatmentData[] = [
  {
    id: "diabetes",
    name: "Diabetes Support",
    symptoms: ["Frequent urination", "Excessive thirst", "Unexplained weight loss", "Slow wound healing", "Fatigue"],
    causes: ["Insulin resistance", "Pancreatic fatigue", "Genetic markers", "Sedentary lifestyle & poor diet"],
    approach: "We use constitutional homeopathy to stimulate pancreatic cell efficiency, reduce insulin resistance, and check diabetic neuropathic/vascular risks alongside lifestyle management.",
    duration: "6 to 12 months (varies with HbA1c history)",
    benefits: ["Maintained blood glucose levels", "Lowered risk of neuropathic pains", "Enhanced natural energy & metabolic vigor"],
    quote: "Helped stabilize my fasting sugar counts within 4 months of treatment."
  },
  {
    id: "hypertension",
    name: "Hypertension (BP)",
    symptoms: ["Frequent headaches", "Dizziness", "Palpitations", "Tension in neck/shoulders", "Anxiety states"],
    causes: ["Stress", "Kidney filtration triggers", "Arterial stiffness", "Hereditary traits"],
    approach: "Focuses on calming the sympathetic nervous system, boosting arterial wall elasticity, and treating emotional triggers to drop systolic/diastolic blood pressure naturally.",
    duration: "3 to 6 months of continuous care",
    benefits: ["Balanced blood pressure readings", "Minimized cardiac load", "Reduced dependency on conventional beta-blockers"],
    quote: "My BP readings have stayed stable under stress without any side effects."
  },
  {
    id: "thyroid",
    name: "Thyroid Disorders",
    symptoms: ["Sudden weight shifts", "Chronic fatigue", "Hair fall", "Sensitivity to cold/heat", "Irregular cycles"],
    causes: ["Autoimmune triggers (Hashimoto's/Graves')", "Iodine absorption lapses", "Chronic emotional stress"],
    approach: "Treatments aim to trigger the thyroid gland for balanced thyroxine excretion, targeting hormonal cycles without lifelong hormone replacement pills.",
    duration: "6 to 9 months",
    benefits: ["Balanced TSH, T3, and T4 levels", "Reduced physical lethargy", "Controlled weight fluctuations"],
    quote: "My TSH levels returned to normal ranges without hormonal supplements."
  },
  {
    id: "skin",
    name: "Skin Diseases (Eczema)",
    symptoms: ["Itching & scaling", "Red patches", "Dry, cracked skin layers", "Fluid-filled blisters"],
    causes: ["Immune hyper-activity", "Genetic skin barrier issues", "Allergen exposure"],
    approach: "Treats skin flare-ups by addressing inner digestive and blood impurities, balancing immune hyper-responses instead of applying temporary external steroid ointments.",
    duration: "4 to 8 months for complete clearance",
    benefits: ["Cleared skin textures", "Reduced recurring skin itchiness", "Restored natural skin protection"],
    quote: "My severe eczema patches on my hands are fully healed now."
  },
  {
    id: "allergies",
    name: "Allergies & Rhinitis",
    symptoms: ["Sneezing fits", "Nasal congestion", "Watery eyes", "Itchy throat", "Skin hives"],
    causes: ["Dust mites, pollen, pet dander", "Hyperactive immune barrier", "Weak respiratory defenses"],
    approach: "Increases the threshold of allergen tolerance. Constitutional remedies desensitize the mucous linings of the nose and throat to seasonal changes.",
    duration: "3 to 6 months",
    benefits: ["Freedom from daily antihistamine tablets", "Decreased nasal blocks", "Improved lung respiration capacity"],
    quote: "I can now walk in parks in spring without allergy attacks."
  },
  {
    id: "asthma",
    name: "Asthma Management",
    symptoms: ["Shortness of breath", "Wheezing sounds", "Chest tightness", "Dry coughing spells"],
    causes: ["Bronchial airway inflammation", "Family genetic history", "Environmental triggers"],
    approach: "Relieves bronchial muscle spasms, checks hyper-secretion of mucus, and restores deep lung elastic functionality.",
    duration: "6 to 12 months",
    benefits: ["Reduced frequency of asthma attacks", "Lowered inhaler dependency", "Better sleep quality without night coughing"],
    quote: "I haven't used my inhaler in three months since starting treatments."
  },
  {
    id: "hairloss",
    name: "Hair Loss & Alopecia",
    symptoms: ["Excessive daily hair fall", "Thinning at crown", "Patchy baldness (Alopecia)", "Dandruff & itchy scalp"],
    causes: ["Nutritional deficits", "Hormonal shifts (DHT)", "Chronic stress", "Poor scalp circulation"],
    approach: "Nourishes the hair follicles internally, regulates systemic hormone balance, and cleanses scalp toxins.",
    duration: "3 to 6 months",
    benefits: ["Halted active hair shedding", "Regrowth on bald patches", "Balanced scalp health & thickness"],
    quote: "Noticeable hair regrowth around my crown after three months."
  },
  {
    id: "jointpain",
    name: "Joint Pain & Sciatica",
    symptoms: ["Radiating leg pain", "Stiffness in lower back", "Numbness in toes", "Restricted walking space"],
    causes: ["Sciatic nerve compression", "Disc degeneration", "Muscle spasms"],
    approach: "Reduces nerve root inflammation, relaxes deep spinal musculature, and checks structural friction in disc areas.",
    duration: "4 to 8 months",
    benefits: ["Relief from radiating nerve pain", "Better lumbar flexion & posture", "Pain-free walking mobility"],
    quote: "My shooting leg pains resolved completely without surgery."
  },
  {
    id: "arthritis",
    name: "Arthritis Care",
    symptoms: ["Joint swelling", "Morning joint stiffness", "Deformity risk in fingers", "Chronic bone pain"],
    causes: ["Autoimmune joint wear (RA)", "Cartilage erosion (OA)", "High uric acid deposits"],
    approach: "Halts progressive cartilage destruction, lowers uric acid levels, and maintains optimal synovial fluid consistency in joints.",
    duration: "6 to 12 months",
    benefits: ["Reduced joint swelling & heat", "Improved morning mobility", "Lower joint pain counts"],
    quote: "My morning joint stiffness is gone, and I can move my hands freely."
  },
  {
    id: "migraine",
    name: "Migraine Treatments",
    symptoms: ["One-sided throbbing headache", "Nausea or vomiting", "Light & sound sensitivity", "Visual aura flashes"],
    causes: ["Vascular expansion in brain", "Hormonal cycle shifts", "Lack of sleep / stress"],
    approach: "Stabilizes vasospasms in cerebral capillaries, addresses autonomic nervous triggers, and lowers sensitivity to environmental migraine triggers.",
    duration: "3 to 6 months",
    benefits: ["Reduced intensity of headaches", "Decreased migraine frequencies", "No dependency on daily painkillers"],
    quote: "Migraine attacks have reduced from weekly to once in two months."
  },
  {
    id: "kidney",
    name: "Kidney Care & Stones",
    symptoms: ["Radiating back pain", "Burning urination", "Hematuria (blood in urine)", "Nausea"],
    causes: ["Mineral crystallization", "Dehydration", "High calcium/oxalate levels"],
    approach: "Dissolves and flushes out urinary calculi naturally by altering urinary pH and relaxing ureter walls.",
    duration: "1 to 3 months (depends on stone sizes)",
    benefits: ["Natural, pain-free stone excretion", "Prevention of recurrent stone formation", "Restored renal health"],
    quote: "A 7mm kidney stone passed out painlessly within 3 weeks of medicine."
  },
  {
    id: "womenhealth",
    name: "Women's Health (PCOS)",
    symptoms: ["Irregular menstrual cycles", "Facial hair growth", "Ovarian cyst clusters", "Difficulty conceiving"],
    causes: ["Ovarian hormone imbalances", "Insulin resistance", "High stress profiles"],
    approach: "Re-establishes normal pituitary-ovarian communication, dissolves follicular cysts, and optimizes ovulation cycles.",
    duration: "6 to 9 months",
    benefits: ["Regular monthly menstrual cycles", "Natural weight loss support", "Improved fertility indicators"],
    quote: "Resolved my irregular cycles and PCOD scans showed clear ovaries."
  },
  {
    id: "children",
    name: "Children's Diseases",
    symptoms: ["Recurrent tonsillitis", "Frequent fever/cold", "Bed-wetting", "Digestive colic problems"],
    causes: ["Immune responses", "Adenoid inflammation", "Gut sensitivities"],
    approach: "Builds immune defenses naturally. Homeopathic child-friendly remedies treat throat infections and adenoids without antibiotics.",
    duration: "3 to 6 months",
    benefits: ["Fewer seasonal sickness episodes", "Avoided tonsil surgeries", "Better nutrient absorption & growth"],
    quote: "My son's recurring tonsillitis is fully cured, avoiding surgery."
  },
  {
    id: "digestive",
    name: "Digestive Disorders",
    symptoms: ["Chronic acid reflux", "IBS (spastic colon)", "Bloating & flatulence", "Altered bowel patterns"],
    causes: ["Gut flora imbalance", "Stress-induced stomach spasms", "Poor dietary habits"],
    approach: "Restores optimal gut acid secretion, heals gastric mucosal linings, and regulates intestinal peristalsis.",
    duration: "3 to 6 months",
    benefits: ["Acidity-free eating and digestions", "Calm, regulated bowel patterns", "No bloating or heartburn"],
    quote: "Years of chronic acidity cured within 2 months of gentle medicines."
  },
  {
    id: "lifestyle",
    name: "Lifestyle Diseases",
    symptoms: ["Chronic exhaustion", "High cholesterol counts", "Mild fatty liver profiles", "Sleep apnea"],
    causes: ["Chronic mental stress", "Lack of sleep", "Metabolic inertia"],
    approach: "Constitutional remedies detoxify hepatic tissues, regulate fat metabolism, and calm mental exhaustion.",
    duration: "4 to 8 months",
    benefits: ["Reversed fatty liver signs", "Reduced bad cholesterol levels", "Better daytime focus & vital energy"],
    quote: "My energy levels are back, and my fatty liver index has normalized."
  }
];

export default function Treatments() {
  const [activeTab, setActiveTab] = useState<string>("diabetes");

  const activeTreatment = treatmentsData.find((t) => t.id === activeTab) || treatmentsData[0];

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
            <span>Interactive Disease Directory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-poppins font-extrabold text-slate-900 dark:text-white leading-tight">
            Specialized Treatments
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Constitutional homeopathic care targeting root physiological and immune causes of disease.
          </p>
        </motion.div>
      </section>

      {/* 2. TAB CONTENT SYSTEM */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT TAB SELECTOR LIST */}
            <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
              {treatmentsData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl text-xs font-bold font-poppins tracking-wider uppercase transition-all duration-200 flex justify-between items-center ${
                    activeTab === item.id
                      ? "bg-primary text-white shadow-md shadow-primary/10"
                      : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* RIGHT TAB DETAILED PANELS CONTAINER */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl space-y-8"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] text-primary dark:text-accent font-bold uppercase tracking-wider">Clinical Approach</span>
                    <h2 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white">{activeTreatment.name}</h2>
                    <p className="text-xs text-slate-500 leading-relaxed pt-2">{activeTreatment.approach}</p>
                  </div>

                  {/* Split grid for Symptoms & Causes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Symptoms */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-danger font-bold text-xs uppercase tracking-wider">
                        <ShieldAlert className="w-4.5 h-4.5" />
                        <span>Common Symptoms</span>
                      </div>
                      <ul className="space-y-2">
                        {activeTreatment.symptoms.map((s, idx) => (
                          <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Causes */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-primary dark:text-accent font-bold text-xs uppercase tracking-wider">
                        <Flame className="w-4.5 h-4.5" />
                        <span>Root Causes</span>
                      </div>
                      <ul className="space-y-2">
                        {activeTreatment.causes.map((c, idx) => (
                          <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Expected Recovery and Quote */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-850 space-y-4">
                    <div className="flex flex-wrap justify-between items-center gap-4 text-xs">
                      <div>
                        <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Expected Duration</p>
                        <p className="text-slate-800 dark:text-slate-200 font-bold mt-0.5">{activeTreatment.duration}</p>
                      </div>
                      <Link
                        href="/book"
                        className="px-5 py-2.5 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-md hover:scale-105 transition-all"
                      >
                        Book Protocol
                      </Link>
                    </div>

                    {/* Quote review box */}
                    <div className="p-4 bg-primary/5 dark:bg-accent/5 rounded-2xl text-xs italic text-slate-600 dark:text-slate-400 flex gap-2">
                      <span className="text-primary font-bold">“</span>
                      <p>{activeTreatment.quote} <span className="text-primary dark:text-accent font-semibold not-italic">— Patient Case Review</span></p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
