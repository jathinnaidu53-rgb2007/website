"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Download, Star } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Register service worker if supported
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        (reg) => console.log("PWA SW registered with scope: ", reg.scope),
        (err) => console.error("PWA SW registration failed: ", err)
      );
    }

    // Check PWA installation conditions
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    const isInstalled = localStorage.getItem("pwa-installed") === "true";
    const dismissedUntil = localStorage.getItem("pwa-dismissed-until");
    const isDismissed = dismissedUntil && Date.now() < parseInt(dismissedUntil, 10);

    if (isStandalone || isInstalled || isDismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome's default mini-infobar
      e.preventDefault();
      // Store event
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show custom popup
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show native prompt
    await deferredPrompt.prompt();

    // Wait for response
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem("pwa-installed", "true");
      setShowPrompt(false);
    } else {
      // Hide for 7 days
      const expireTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem("pwa-dismissed-until", String(expireTime));
      setShowPrompt(false);
    }
  };

  const handleDismissClick = () => {
    // Hide for 7 days
    const expireTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("pwa-dismissed-until", String(expireTime));
    setShowPrompt(false);
  };

  if (!mounted || !showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pwa-prompt-title"
        aria-describedby="pwa-prompt-desc"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 w-full md:bottom-6 md:right-[88px] md:left-auto md:max-w-sm rounded-t-[24px] md:rounded-[24px] border-t md:border border-slate-200/50 dark:border-slate-800/50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-2xl p-6 z-50 flex flex-col gap-4 font-inter text-slate-800 dark:text-slate-100"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Logo/Icon */}
            <div className="relative w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0 shadow-inner">
              <Image
                src="/logo.svg"
                alt="Sarada Homeo Clinic App Icon"
                width={28}
                height={28}
                className="object-contain text-primary dark:text-accent"
              />
            </div>
            <div>
              <h2
                id="pwa-prompt-title"
                className="font-poppins font-bold text-slate-900 dark:text-white text-sm tracking-tight"
              >
                Install Sarada Homeo Clinic
              </h2>
              <div className="flex items-center gap-1 text-[10px] text-primary dark:text-accent font-semibold mt-0.5">
                <Star className="w-3 h-3 fill-current" />
                <span>Web App available</span>
              </div>
            </div>
          </div>
          {/* Close button */}
          <button
            onClick={handleDismissClick}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Not now, dismiss install prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <p
          id="pwa-prompt-desc"
          className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium"
        >
          Get faster access to appointments, clinic timings, WhatsApp booking, contact information, and healthcare services directly from your home screen.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={handleInstallClick}
            className="flex-grow inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/95 text-white rounded-full font-poppins font-semibold text-xs transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Download className="w-3.5 h-3.5" />
            Install
          </button>
          <button
            onClick={handleDismissClick}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350 rounded-full font-poppins font-semibold text-xs transition-all focus:outline-none focus:ring-2 focus:ring-slate-350 dark:focus:ring-slate-600"
          >
            Not Now
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
