"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Treatments", href: "/treatments" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Custom SVG Leaf Logo */}
            <svg width="40" height="40" viewBox="0 0 200 200" className="group-hover:scale-105 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="navLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#0F9D58", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#009688", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M100 20 C60 20 30 50 30 90 C30 140 100 180 100 180 C100 180 170 140 170 90 C170 50 140 20 100 20Z" fill="url(#navLeafGrad)" opacity="0.1" />
              <path d="M100 40 Q70 40 70 80 Q70 120 100 160 Q130 120 130 80 Q130 40 100 40 Z" fill="url(#navLeafGrad)" />
              <path d="M100 60 V100 M80 80 H120" stroke="white" strokeWidth="8" strokeLinecap="round" />
              <path d="M100 160 Q110 140 120 130" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
            </svg>
            <div>
              <span className="font-poppins font-bold text-base leading-tight tracking-tight text-slate-800 dark:text-slate-100 block">
                Sarada Homeo Clinic
              </span>
              <span className="text-[10px] font-bold tracking-widest text-primary dark:text-accent uppercase block -mt-0.5">
                Natural Healing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative px-4 py-2 rounded-lg font-poppins text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-primary dark:text-accent"
                    : "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-accent"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive(link.href) && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary dark:bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/book"
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white font-poppins text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              aria-label="Book an appointment at Sarada Homeo Clinic"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden glass-nav absolute top-full left-0 right-0 py-4 shadow-xl border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95"
        >
          <nav className="flex flex-col px-6 space-y-3" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`py-2 rounded-lg font-poppins text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  isActive(link.href)
                    ? "text-primary dark:text-accent"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <a
                href="tel:+919440955008"
                className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label="Call Sarada Homeo Clinic at +91 94409 55008"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call +91 94409 55008</span>
              </a>
              <Link
                href="/book"
                className="flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl text-xs font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label="Book an appointment at Sarada Homeo Clinic"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
