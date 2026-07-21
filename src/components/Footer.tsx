"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950 border-t border-slate-800 pt-16 pb-8 relative font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Clinic Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Custom SVG Leaf Logo */}
              <svg width="32" height="32" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#0F9D58", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#009688", stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path d="M100 20 C60 20 30 50 30 90 C30 140 100 180 100 180 C100 180 170 140 170 90 C170 50 140 20 100 20Z" fill="url(#footerLeafGrad)" opacity="0.1" />
                <path d="M100 40 Q70 40 70 80 Q70 120 100 160 Q130 120 130 80 Q130 40 100 40 Z" fill="url(#footerLeafGrad)" />
                <path d="M100 60 V100 M80 80 H120" stroke="white" strokeWidth="8" strokeLinecap="round" />
                <path d="M100 160 Q110 140 120 130" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
              </svg>
              <span className="font-poppins font-bold text-base text-white tracking-tight">
                Sarada Homeo Clinic
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premium homeopathic healthcare under the expert guidance of Dr. Panchireddi Anil Kumar. Committed to natural, safe, and root-cause treatments to restore your long-term health.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-poppins font-bold text-white text-xs mb-5 uppercase tracking-widest relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-primary">
              Quick Links
            </h3>
            <ul className="space-y-3 text-xs">
              {[
                { name: "Home", href: "/" },
                { name: "About Doctor", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Treatments", href: "/treatments" },
                { name: "Gallery", href: "/gallery" },
                { name: "Contact Us", href: "/contact" },
                { name: "Book Appointment", href: "/book" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary dark:hover:text-accent transition-colors duration-250 flex items-center gap-1.5"
                  >
                    <span>&rsaquo;</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h3 className="font-poppins font-bold text-white text-xs mb-5 uppercase tracking-widest relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-primary">
              Get In Touch
            </h3>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps?cid=4063544908076580735"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-primary transition-colors leading-relaxed"
                >
                  Opposite Diamond Park, New Colony, Srikakulam, Andhra Pradesh, 532001, India
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-primary shrink-0" />
                <span className="text-slate-400">
                  <a href="tel:+919440955008" className="hover:text-primary transition-colors">
                    +91 94409 55008
                  </a>
                  <br />
                  <a href="tel:08942223509" className="hover:text-primary transition-colors">
                    08942-223509
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-primary shrink-0" />
                <a href="mailto:contact@saradahomeoclinic.com" className="text-slate-400 hover:text-primary transition-colors">
                  contact@saradahomeoclinic.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Timings Summary */}
          <div>
            <h3 className="font-poppins font-bold text-white text-xs mb-5 uppercase tracking-widest relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-primary">
              Timings Summary
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-300">Mon/Tue/Wed/Fri</p>
                  <p className="text-[11px] mt-0.5">9:00 AM – 1:00 PM &amp; 6:00 PM – 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-300">Thursday</p>
                  <p className="text-[11px] mt-0.5">11:00 AM - 1:00 PM & 6:00 PM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-300">Saturday</p>
                  <p className="text-[11px] mt-0.5">10:00 AM – 12:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-red-400">Sunday</p>
                  <p className="text-[11px] mt-0.5 text-red-400">Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and Scroll-to-top */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Sarada Homeo Clinic. Reg. No. 5732. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-primary hover:text-white rounded-lg transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
