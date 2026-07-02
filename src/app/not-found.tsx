import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Sarada Homeo Clinic",
  description: "The page you are looking for could not be found. Return to Sarada Homeo Clinic's homepage.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-24 font-inter">
      <div className="text-center space-y-8 max-w-lg">
        {/* Animated leaf icon */}
        <div className="flex justify-center">
          <div className="relative">
            <svg
              width="80"
              height="80"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-80"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="notFoundLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#0F9D58", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#009688", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path
                d="M100 20 C60 20 30 50 30 90 C30 140 100 180 100 180 C100 180 170 140 170 90 C170 50 140 20 100 20Z"
                fill="url(#notFoundLeafGrad)"
                opacity="0.12"
              />
              <path
                d="M100 40 Q70 40 70 80 Q70 120 100 160 Q130 120 130 80 Q130 40 100 40 Z"
                fill="url(#notFoundLeafGrad)"
              />
              <path
                d="M100 60 V100 M80 80 H120"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
            {/* 404 badge */}
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wider">
              404
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-poppins font-extrabold text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Sorry, the page you're looking for doesn't exist or may have been moved.
            Let us help you find what you need.
          </p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About Doctor" },
            { href: "/services", label: "Our Services" },
            { href: "/treatments", label: "Treatments" },
            { href: "/book", label: "Book Appointment" },
            { href: "/contact", label: "Contact Us" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-accent transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Primary CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-poppins font-bold text-sm rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-lg"
          aria-label="Return to Sarada Homeo Clinic homepage"
        >
          ← Return to Homepage
        </Link>

        {/* Call to action */}
        <p className="text-[11px] text-slate-400">
          Need help?{" "}
          <a
            href="tel:+919440955008"
            className="text-primary dark:text-accent font-semibold hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded"
            aria-label="Call Sarada Homeo Clinic"
          >
            Call us: +91 94409 55008
          </a>
        </p>
      </div>
    </div>
  );
}
