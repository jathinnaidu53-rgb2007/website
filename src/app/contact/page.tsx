"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  X as XIcon,
} from "lucide-react";

// ─── Copy-to-clipboard hook ──────────────────────────────────────────────────
function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    });
  }, [timeout]);
  return { copied, copy };
}

// ─── Toast types ─────────────────────────────────────────────────────────────
type ToastType = "success" | "error";
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
            role="alert"
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-medium ${
              t.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/40 dark:border-emerald-700 dark:text-emerald-200"
                : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/40 dark:border-red-700 dark:text-red-200"
            }`}
          >
            {t.type === "success" ? (
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <p className="flex-1 leading-relaxed">{t.message}</p>
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

// ─── Info Card ────────────────────────────────────────────────────────────────
function InfoCard({
  icon: Icon,
  title,
  children,
  copyValue,
  onCopy,
  copied,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  copyValue?: string;
  onCopy?: (val: string) => void;
  copied?: boolean;
}) {
  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl text-center space-y-3 hover:shadow-sm transition-all group">
      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto" aria-hidden="true">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-poppins font-bold text-xs text-slate-900 dark:text-white">{title}</h3>
      <div className="text-[11px] text-slate-500 space-y-0.5">{children}</div>
      {copyValue && onCopy && (
        <button
          onClick={() => onCopy(copyValue)}
          className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:underline"
          aria-label={`Copy ${title}`}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastCounter = useRef(0);
  const submitLock = useRef(false);

  // Copy hooks per copyable field
  const phoneCopy = useCopy();
  const emailCopy = useCopy();
  const addressCopy = useCopy();
  const whatsappCopy = useCopy();

  const addToast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++toastCounter.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitLock.current || loading) return;
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setFormError("Please fill in all required fields (Name, Mobile, Subject, Message).");
      return;
    }
    setFormError("");
    submitLock.current = true;
    setLoading(true);

    try {
      const messageText = `🏥 Sarada Homeo Clinic

📩 NEW CONTACT ENQUIRY

👤 Name:
${formData.name}

📱 Phone:
${formData.mobile}

📧 Email:
${formData.email || "N/A"}

📌 Subject:
${formData.subject}

💬 Message:
${formData.message}

Thank you.`;

      const whatsappUrl = `https://wa.me/919440955008?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, "_blank");

      setSuccess(true);
      setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
      addToast("Message sent! Redirecting to WhatsApp.", "success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error. Please check your connection and try again.";
      setFormError(msg);
      addToast(msg, "error");
    } finally {
      setLoading(false);
      submitLock.current = false;
    }
  }, [loading, formData, addToast]);

  const fieldCls =
    "w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500";

  return (
    <>
      <ToastContainer toasts={toasts} dismiss={dismissToast} />

      <div className="flex flex-col w-full bg-slate-50 dark:bg-slate-950 font-inter">

        {/* 1. HERO BANNER */}
        <section className="relative pt-24 pb-16 bg-gradient-to-b from-teal-50/20 to-slate-50 dark:from-slate-900 dark:to-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[10px] text-primary dark:text-accent font-bold uppercase tracking-widest">
                  Get In Touch
                </span>
                <h1 className="text-3xl sm:text-4xl font-poppins font-extrabold text-slate-900 dark:text-white">
                  Contact Our <br />Clinic
                </h1>
                <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                  Need directions, timings, or have questions about homeopathic treatment? Reach out via call, WhatsApp, or the message form.
                </p>
              </div>
              <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
                <Image
                  src="/images/doctor/doctor-portrait.jpg"
                  alt="Dr. Panchireddi Anil Kumar – Sarada Homeo Clinic, Srikakulam"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. CONTACT DETAILS GRID */}
        <section className="py-12 bg-white dark:bg-slate-900" aria-label="Contact details">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <InfoCard
                icon={Phone}
                title="Phone"
                copyValue="9440955008"
                onCopy={phoneCopy.copy}
                copied={phoneCopy.copied}
              >
                <a href="tel:+919440955008" className="hover:text-primary transition-colors font-semibold">
                  +91 94409 55008
                </a>
                <p className="text-[10px] text-slate-400">Call during clinic hours</p>
              </InfoCard>

              <InfoCard
                icon={MessageSquare}
                title="WhatsApp"
                copyValue="919440955008"
                onCopy={whatsappCopy.copy}
                copied={whatsappCopy.copied}
              >
                <a
                  href="https://wa.me/919440955008?text=Hello%20Doctor%2C%20I%20have%20an%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors font-semibold"
                >
                  +91 94409 55008
                </a>
                <p className="text-[10px] text-slate-400">Chat for details</p>
              </InfoCard>

              <InfoCard
                icon={Mail}
                title="Email"
                copyValue="contact@saradahomeoclinic.com"
                onCopy={emailCopy.copy}
                copied={emailCopy.copied}
              >
                <a href="mailto:contact@saradahomeoclinic.com" className="hover:text-primary transition-colors break-all">
                  contact@saradahomeoclinic.com
                </a>
                <p className="text-[10px] text-slate-400">We reply within 24 hours</p>
              </InfoCard>

              <InfoCard
                icon={MapPin}
                title="Clinic Address"
                copyValue="Opp. Diamond Park, New Colony, Srikakulam, Andhra Pradesh 532001"
                onCopy={addressCopy.copy}
                copied={addressCopy.copied}
              >
                <a
                  href="https://www.google.com/maps/place/Sarada+Homeo+Clinic/@18.296722,83.894879,16.5z/data=!4m6!3m5!1s0x3a3c1508ab026f8d:0x463273e970a5abf1!8m2!3d18.296722!4d83.894879!16s%2Fg%2F11wsp3ybd0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Opp. Diamond Park, New Colony, Srikakulam – 532001
                </a>
              </InfoCard>

              <InfoCard icon={Clock} title="Clinic Timings">
                <ul className="space-y-1 text-left text-[10px]">
                  <li><span className="font-semibold">Mon/Tue/Wed/Fri:</span> 9–1, 6–8</li>
                  <li><span className="font-semibold">Thursday:</span> 11–1, 6–8</li>
                  <li><span className="font-semibold">Saturday:</span> 10–12</li>
                  <li className="text-red-500 font-semibold">Sunday: Closed</li>
                </ul>
              </InfoCard>
            </div>
          </div>
        </section>

        {/* 3. MESSAGE FORM + MAP */}
        <section className="py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800" aria-label="Contact form and map">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

              {/* LEFT: Message form */}
              <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="space-y-1">
                  <h2 className="font-poppins font-bold text-slate-900 dark:text-white text-base">Send a Message</h2>
                  <p className="text-[11px] text-slate-500">Our clinical team will respond as soon as possible.</p>
                </div>

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-3"
                      role="alert"
                      aria-live="polite"
                    >
                      <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" aria-hidden="true" />
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">Message Sent!</h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Thank you for reaching out to Sarada Homeo Clinic. We will respond to your query soon.
                      </p>
                      <button
                        onClick={() => setSuccess(false)}
                        className="px-5 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      noValidate
                      aria-label="Quick contact form"
                    >
                      {formError && (
                        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300" role="alert">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                          <p>{formError}</p>
                        </div>
                      )}

                      <div>
                        <label htmlFor="contact-name" className="sr-only">Full Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="Full Name *"
                          autoComplete="name"
                          aria-required="true"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={fieldCls}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-mobile" className="sr-only">Phone Number</label>
                        <input
                          id="contact-mobile"
                          type="tel"
                          placeholder="Phone Number *"
                          autoComplete="tel"
                          inputMode="tel"
                          aria-required="true"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          className={fieldCls}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="sr-only">Email Address</label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="Email Address (Optional)"
                          autoComplete="email"
                          inputMode="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={fieldCls}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-subject" className="sr-only">Subject</label>
                        <input
                          id="contact-subject"
                          type="text"
                          placeholder="Subject *"
                          aria-required="true"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className={fieldCls}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="sr-only">Your message</label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          placeholder="Your Message *"
                          aria-required="true"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={fieldCls}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-poppins font-semibold rounded-xl shadow-md transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed text-xs flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
                        aria-label={loading ? "Sending message…" : "Send message to clinic"}
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                            <span>Sending…</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" aria-hidden="true" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* RIGHT: Map + Quick actions */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                {/* Map embed */}
                <div
                  className="w-full flex-grow aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden shadow-sm border border-slate-150 dark:border-slate-850 relative min-h-[280px]"
                  role="region"
                  aria-label="Interactive clinic location map"
                >
                  <iframe
                    title="Sarada Homeo Clinic Location"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15174.638432106718!2d83.894879!3d18.296722!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c1508ab026f8d%3A0x463273e970a5abf1!2sSarada%20Homeo%20Clinic!5e0!3m2!1sen!2sin!4v1719830000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>

                {/* Quick action chips */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <a
                    href="https://www.google.com/maps/place/Sarada+Homeo+Clinic/@18.296722,83.894879,16.5z/data=!4m6!3m5!1s0x3a3c1508ab026f8d:0x463273e970a5abf1!8m2!3d18.296722!4d83.894879!16s%2Fg%2F11wsp3ybd0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    aria-label="Get directions to Sarada Homeo Clinic on Google Maps"
                  >
                    <ExternalLink className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                    <span>Get Directions</span>
                  </a>
                  <a
                    href="tel:+919440955008"
                    className="flex items-center gap-2.5 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    aria-label="Call Sarada Homeo Clinic at +91 94409 55008"
                  >
                    <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href="https://wa.me/919440955008?text=Hello%20Doctor%2C%20I%20need%20help."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    aria-label="Chat on WhatsApp with Sarada Homeo Clinic"
                  >
                    <MessageSquare className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
