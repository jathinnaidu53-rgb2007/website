"use client";

import { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  MapPin,
  MessageSquare,
  ChevronDown,
  AlertCircle,
  Copy,
  ExternalLink,
  X as XIcon,
} from "lucide-react";

// ─── Zod Schema ─────────────────────────────────────────────────────────────
const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid mobile number"),
  email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
  age: z
    .string()
    .min(1, "Age is required")
    .refine((val) => Number(val) >= 1 && Number(val) <= 120, "Enter a valid age (1–120)"),
  gender: z.enum(["male", "female", "other"] as const, { message: "Please select gender" }),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.enum(["morning", "evening"] as const, { message: "Please select a time slot" }),
  concern: z.string().min(10, "Please describe your health concern (min. 10 characters)"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  honeypot: z.string().max(0, "Bot detected"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

// ─── Toast ───────────────────────────────────────────────────────────────────
type ToastType = "success" | "error" | "info";
interface Toast { id: number; message: string; type: ToastType }

function ToastContainer({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: number) => void }) {
  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 w-80 pointer-events-none" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-medium ${
              t.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/40 dark:border-emerald-700 dark:text-emerald-200"
                : t.type === "error"
                ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/40 dark:border-red-700 dark:text-red-200"
                : "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/40 dark:border-blue-700 dark:text-blue-200"
            }`}
            role="alert"
          >
            {t.type === "success" && <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />}
            {t.type === "error" && <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />}
            <p className="flex-1 text-xs leading-relaxed">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Dismiss notification"
            >
              <XIcon className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Constants ───────────────────────────────────────────────────────────────
const services = [
  "General Homeopathy Consultation",
  "Children's Health Care",
  "Women's Health Care",
  "Skin Disorders Treatment",
  "Allergy Management",
  "Respiratory Disorders (Asthma)",
  "Digestive Problems",
  "Migraine Treatment",
  "Joint Pain / Arthritis",
  "Thyroid Disorders",
  "Hair Loss & Scalp Care",
  "Stress & Anxiety Management",
  "Diabetes Support",
  "Hypertension (BP) Care",
  "Kidney Disorders",
  "Lifestyle Diseases",
];

const timings = [
  { day: "Mon / Tue / Wed / Fri", hours: "9:00 AM – 1:00 PM  &  6:00 PM – 8:00 PM" },
  { day: "Thursday", hours: "11:00 AM – 1:00 PM  &  6:00 PM – 8:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 12:00 PM" },
  { day: "Sunday", hours: "Closed", closed: true },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BookAppointment() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [networkError, setNetworkError] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastCounter = useRef(0);
  const submitLock = useRef(false); // prevent double-submit

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++toastCounter.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = useCallback(async (data: BookingFormData) => {
    // Prevent double submission
    if (submitLock.current || submitting) return;
    submitLock.current = true;
    setSubmitting(true);
    setNetworkError("");

    try {
      const genderLabel = data.gender.charAt(0).toUpperCase() + data.gender.slice(1);
      const timeLabel = data.preferredTime.charAt(0).toUpperCase() + data.preferredTime.slice(1);

      const messageText = `🏥 Sarada Homeo Clinic

📌 NEW APPOINTMENT REQUEST

👤 Patient Name:
${data.name}

📱 Mobile:
${data.mobile}

🎂 Age:
${data.age}

⚧ Gender:
${genderLabel}

📍 Address:
${data.address || "N/A"}

🩺 Health Problem:
${data.service}

📅 Preferred Date:
${data.preferredDate}

🕒 Preferred Time:
${timeLabel}

📝 Additional Notes:
${data.concern}

Please confirm my appointment.

Thank you.`;

      const whatsappUrl = `https://wa.me/919440955008?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, "_blank");

      const ref = `SHC${Date.now().toString().slice(-6)}`;
      setBookingRef(ref);
      setSubmitted(true);
      reset();
      addToast("Appointment request redirected to WhatsApp!", "success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error. Please check your connection and try again.";
      setNetworkError(msg);
      addToast(msg, "error");
    } finally {
      setSubmitting(false);
      submitLock.current = false;
    }
  }, [submitting, reset, addToast]);

  const fieldClass = (hasError: boolean) =>
    `w-full px-4 py-2.5 rounded-xl border ${
      hasError
        ? "border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-700 focus:ring-red-400/40"
        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary/40"
    } text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500`;

  const errorMsg = (msg?: string) =>
    msg ? (
      <p className="text-[10px] text-red-600 dark:text-red-400 font-medium mt-1 flex items-center gap-1" role="alert">
        <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
        {msg}
      </p>
    ) : null;

  return (
    <>
      <ToastContainer toasts={toasts} dismiss={dismissToast} />

      <div className="flex flex-col w-full bg-slate-50 dark:bg-slate-950 font-inter">
        {/* 1. HERO SECTION */}
        <section className="relative pt-24 pb-16 bg-gradient-to-b from-teal-50/20 to-slate-50 dark:from-slate-900 dark:to-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[10px] text-primary dark:text-accent font-bold uppercase tracking-widest">
                  Dear Patients Care
                </span>
                <h1 className="text-3xl sm:text-4xl font-poppins font-extrabold text-slate-900 dark:text-white">
                  Book Your <br />Appointment
                </h1>
                <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                  Begin your journey to natural wellness with specialized homeopathic treatments tailored for your family's health needs.
                </p>
                <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                  <span>✔ Certified Specialist</span>
                  <span>✔ Flexible Timings</span>
                  <span>✔ 5000+ Patients Treated</span>
                </div>
              </div>
              <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
                <Image
                  src="/images/doctor/doctor-portrait.jpg"
                  alt="Dr. Panchireddi Anil Kumar – Sarada Homeo Clinic"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. FORM & INFO GRID */}
        <section className="py-12 bg-white dark:bg-slate-900" aria-label="Appointment booking">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* LEFT: Clinic Details */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl space-y-4">
                  <h2 className="font-poppins font-bold text-sm text-slate-900 dark:text-white">Clinic Details</h2>
                  <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">Clinic Name</p>
                        <p>Sarada Homeo Clinic</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <User className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">Lead Physician</p>
                        <p>Dr. Panchireddi Anil Kumar, BHMS</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">Phone Number</p>
                        <a href="tel:+919440955008" className="hover:text-primary transition-colors">+91 94409 55008</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">Clinic Timings</p>
                        <ul className="space-y-1 mt-1 text-[11px]">
                          {timings.map((t) => (
                            <li key={t.day} className={t.closed ? "text-red-500 font-semibold" : ""}>
                              <span className="font-medium">{t.day}:</span> {t.hours}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">Address</p>
                        <p>Opp. Diamond Park, New Colony, D.No. 7-6-381/1, Pengunari Street, Srikakulam – 532001</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <a
                    href="tel:+919440955008"
                    className="flex items-center justify-center gap-3 px-5 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary dark:text-accent rounded-xl transition-all font-semibold text-xs"
                    aria-label="Call Sarada Homeo Clinic"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>Call Now: +91 94409 55008</span>
                  </a>
                  <a
                    href="https://wa.me/919440955008?text=Hello%20Doctor%2C%20I%20would%20like%20to%20book%20an%20appointment."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-5 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all font-semibold text-xs"
                    aria-label="Chat on WhatsApp with Dr. Anil Kumar"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp Support</span>
                  </a>
                  <a
                    href="https://www.google.com/maps?cid=4063544908076580735"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-5 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all font-semibold text-xs"
                    aria-label="Get directions to Sarada Homeo Clinic on Google Maps"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* RIGHT: Booking Form */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-8 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl text-center space-y-6"
                      role="alert"
                      aria-live="polite"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto"
                      >
                        <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      </motion.div>
                      <div className="space-y-2">
                        <h2 className="text-xl font-poppins font-bold text-slate-900 dark:text-white">
                          Appointment Registered!
                        </h2>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                          We have received your request. Dr. Anil Kumar's clinic coordinator will call you within 2 hours to confirm your slot.
                        </p>
                      </div>
                      <div className="inline-block px-6 py-3 bg-primary/10 rounded-xl">
                        <span className="text-[10px] text-slate-500">Booking Reference: </span>
                        <span className="font-poppins font-extrabold text-primary text-base">{bookingRef}</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-3 pt-2">
                        <button
                          onClick={() => setSubmitted(false)}
                          className="px-6 py-2.5 border border-primary/30 text-primary font-semibold rounded-xl hover:bg-primary/5 text-xs transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
                        >
                          Book Another Appointment
                        </button>
                        <a
                          href={`https://wa.me/919440955008?text=Hello%2C%20my%20booking%20reference%20is%20${bookingRef}.%20I%20would%20like%20to%20confirm%20my%20appointment.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 bg-[#25D366] text-white font-semibold rounded-xl text-xs transition-all hover:bg-[#22c55e]"
                        >
                          Confirm via WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl space-y-6"
                    >
                      <div className="space-y-1">
                        <h2 className="font-poppins font-bold text-slate-900 dark:text-white text-base">Book Your Slot</h2>
                        <p className="text-[11px] text-slate-500">Fill out the form below to secure your consultation.</p>
                      </div>

                      {/* Network error banner */}
                      {networkError && (
                        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300" role="alert">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                          <p>{networkError}</p>
                        </div>
                      )}

                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                        noValidate
                        aria-label="Appointment booking form"
                      >
                        {/* Honeypot spam field — hidden from users */}
                        <input
                          type="text"
                          {...register("honeypot")}
                          className="hidden"
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                              id="name"
                              type="text"
                              placeholder="Full Name *"
                              autoComplete="name"
                              aria-required="true"
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? "name-error" : undefined}
                              {...register("name")}
                              className={fieldClass(!!errors.name)}
                            />
                            <span id="name-error">{errorMsg(errors.name?.message)}</span>
                          </div>
                          <div>
                            <label htmlFor="mobile" className="sr-only">Phone Number</label>
                            <input
                              id="mobile"
                              type="tel"
                              placeholder="Phone Number *"
                              autoComplete="tel"
                              inputMode="tel"
                              aria-required="true"
                              aria-invalid={!!errors.mobile}
                              aria-describedby={errors.mobile ? "mobile-error" : undefined}
                              {...register("mobile")}
                              className={fieldClass(!!errors.mobile)}
                            />
                            <span id="mobile-error">{errorMsg(errors.mobile?.message)}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <label htmlFor="email" className="sr-only">Email Address</label>
                            <input
                              id="email"
                              type="email"
                              placeholder="Email Address (Optional)"
                              autoComplete="email"
                              inputMode="email"
                              aria-invalid={!!errors.email}
                              {...register("email")}
                              className={fieldClass(!!errors.email)}
                            />
                            {errorMsg(errors.email?.message)}
                          </div>
                          <div>
                            <label htmlFor="age" className="sr-only">Age</label>
                            <input
                              id="age"
                              type="number"
                              placeholder="Age *"
                              autoComplete="age"
                              inputMode="numeric"
                              min={1}
                              max={120}
                              aria-required="true"
                              aria-invalid={!!errors.age}
                              {...register("age")}
                              className={fieldClass(!!errors.age)}
                            />
                            {errorMsg(errors.age?.message)}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="relative">
                            <label htmlFor="gender" className="sr-only">Gender</label>
                            <select
                              id="gender"
                              aria-required="true"
                              aria-invalid={!!errors.gender}
                              {...register("gender")}
                              className={`${fieldClass(!!errors.gender)} appearance-none pr-10 cursor-pointer`}
                            >
                              <option value="">Select gender *</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other / Prefer not to say</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                            {errorMsg(errors.gender?.message)}
                          </div>
                          <div className="relative">
                            <label htmlFor="service" className="sr-only">Treatment Service</label>
                            <select
                              id="service"
                              aria-required="true"
                              aria-invalid={!!errors.service}
                              {...register("service")}
                              className={`${fieldClass(!!errors.service)} appearance-none pr-10 cursor-pointer`}
                            >
                              <option value="">Select a service *</option>
                              {services.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                            {errorMsg(errors.service?.message)}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="address" className="sr-only">Address / City</label>
                          <input
                            id="address"
                            type="text"
                            placeholder="Address / City *"
                            autoComplete="address-level2"
                            aria-required="true"
                            aria-invalid={!!errors.address}
                            {...register("address")}
                            className={fieldClass(!!errors.address)}
                          />
                          {errorMsg(errors.address?.message)}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="preferredDate" className="sr-only">Preferred Date</label>
                            <input
                              id="preferredDate"
                              type="date"
                              aria-required="true"
                              aria-invalid={!!errors.preferredDate}
                              {...register("preferredDate")}
                              min={new Date().toISOString().split("T")[0]}
                              className={fieldClass(!!errors.preferredDate)}
                            />
                            {errorMsg(errors.preferredDate?.message)}
                          </div>
                          <div className="relative">
                            <label htmlFor="preferredTime" className="sr-only">Preferred Time Slot</label>
                            <select
                              id="preferredTime"
                              aria-required="true"
                              aria-invalid={!!errors.preferredTime}
                              {...register("preferredTime")}
                              className={`${fieldClass(!!errors.preferredTime)} appearance-none pr-10 cursor-pointer`}
                            >
                              <option value="">Select time slot *</option>
                              <option value="morning">Morning Session (9 AM – 1 PM)</option>
                              <option value="evening">Evening Session (6 PM – 8 PM)</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                            {errorMsg(errors.preferredTime?.message)}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="concern" className="sr-only">Health Concern</label>
                          <textarea
                            id="concern"
                            rows={4}
                            placeholder="Brief Message / Health Concern *"
                            aria-required="true"
                            aria-invalid={!!errors.concern}
                            aria-describedby={errors.concern ? "concern-error" : "concern-hint"}
                            {...register("concern")}
                            className={fieldClass(!!errors.concern)}
                          />
                          <span id="concern-hint" className="text-[10px] text-slate-400 mt-1 block">
                            Please describe your main symptoms or reason for consultation (min. 10 characters).
                          </span>
                          <span id="concern-error">{errorMsg(errors.concern?.message)}</span>
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3.5 bg-primary hover:bg-primary/95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                          aria-label={submitting ? "Submitting appointment request…" : "Confirm appointment request"}
                        >
                          {submitting ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                              <span>Submitting…</span>
                            </>
                          ) : (
                            <>
                              <Calendar className="w-4 h-4" aria-hidden="true" />
                              <span>Confirm Appointment Request</span>
                            </>
                          )}
                        </button>
                        <p className="text-[10px] text-center text-slate-400">
                          ✔ We will call you within 2 hours to confirm your scheduled slot. Your data is kept private.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* 3. GOOGLE MAP EMBED */}
        <section className="py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800" aria-label="Clinic location map">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-lg font-poppins font-bold text-slate-900 dark:text-white">Visit Our Clinic</h2>
                <p className="text-xs text-slate-500">Opposite Diamond Park, New Colony, Srikakulam – 532001, Andhra Pradesh</p>
              </div>
              <a
                href="https://www.google.com/maps?cid=4063544908076580735"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-all shrink-0"
                aria-label="Open Sarada Homeo Clinic location in Google Maps"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                Open in Google Maps
              </a>
            </div>
            <div className="w-full aspect-[2/1] rounded-3xl overflow-hidden shadow-sm border border-slate-150 dark:border-slate-850 relative min-h-[300px]">
              <iframe
                title="Sarada Homeo Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3788.1186742381587!2d83.89923327371747!3d18.296180282754328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c159ddd9db8ef%3A0x386449b333ffff7f!2sSarada%20Homeo%20Clinic!5e0!3m2!1sen!2sin!4v1784636364984!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
