import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";

// ─── Site-wide Metadata ───────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Sarada Homeo Clinic | Dr. Panchireddi Anil Kumar | Best Homeopathy Clinic in Srikakulam",
    template: "%s | Sarada Homeo Clinic",
  },
  description:
    "Sarada Homeo Clinic provides trusted, personalized, and holistic homeopathic treatment in Srikakulam, Andhra Pradesh. Led by Dr. Panchireddi Anil Kumar (Reg. No. 5732). Book an appointment today.",
  keywords: [
    "Sarada Homeo Clinic",
    "Dr. Panchireddi Anil Kumar",
    "Homeopathy Clinic Srikakulam",
    "Homeopathic Physician Srikakulam",
    "Best Homeopathy Doctor Srikakulam",
    "Natural Homeopathic Treatment",
    "Holistic Healing Srikakulam",
    "Andhra Pradesh Homeopathy",
    "BHMS doctor Srikakulam",
  ],
  authors: [{ name: "Dr. Panchireddi Anil Kumar" }],
  creator: "Sarada Homeo Clinic",
  publisher: "Sarada Homeo Clinic",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://saradahomeoclinic.com"),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://saradahomeoclinic.com",
  },
  openGraph: {
    title: "Sarada Homeo Clinic | Dr. Panchireddi Anil Kumar | Srikakulam",
    description:
      "Trusted, personalized, and holistic homeopathic treatment in Srikakulam, Andhra Pradesh. Led by Dr. Panchireddi Anil Kumar (Reg. No. 5732). Book an appointment today.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://saradahomeoclinic.com",
    siteName: "Sarada Homeo Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/doctor.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Panchireddi Anil Kumar – Sarada Homeo Clinic, Srikakulam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarada Homeo Clinic | Dr. Panchireddi Anil Kumar | Srikakulam",
    description:
      "Trusted homeopathic treatment in Srikakulam, Andhra Pradesh. Led by Dr. Panchireddi Anil Kumar (Reg. No. 5732).",
    images: ["/images/doctor.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "google-placeholder-token",
  },
};

// ─── Schema.org Structured Data ───────────────────────────────────────────────
const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": "https://saradahomeoclinic.com/#clinic",
  name: "Sarada Homeo Clinic",
  alternateName: "Sarada Homeopathy Clinic",
  url: "https://saradahomeoclinic.com",
  telephone: "+919440955008",
  priceRange: "$$",
  image: "https://saradahomeoclinic.com/images/doctor.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Opposite Diamond Park, New Colony, D.No. 7-6-381/1, Pengunari Street",
    addressLocality: "Srikakulam",
    addressRegion: "Andhra Pradesh",
    postalCode: "532001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "18.2949",
    longitude: "83.8967",
  },
  medicalSpecialty: "Homeopathy",
  hasMap: "https://maps.google.com/?q=Sarada+Homeo+Clinic+New+Colony+Srikakulam",
  founder: {
    "@type": "Person",
    name: "Dr. Panchireddi Anil Kumar",
    jobTitle: "Homeopathic Physician",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Friday"], opens: "09:00", closes: "13:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Friday"], opens: "18:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "11:00", closes: "13:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "18:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "12:00" },
  ],
};

const doctorSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": "https://saradahomeoclinic.com/#physician",
  name: "Dr. Panchireddi Anil Kumar",
  givenName: "Anil Kumar",
  familyName: "Panchireddi",
  medicalSpecialty: "HomeopathicPhysician",
  telephone: "+919440955008",
  image: "https://saradahomeoclinic.com/images/doctor.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Opposite Diamond Park, New Colony, D.No. 7-6-381/1, Pengunari Street",
    addressLocality: "Srikakulam",
    addressRegion: "Andhra Pradesh",
    postalCode: "532001",
    addressCountry: "IN",
  },
  description:
    "Dedicated homeopathic physician with over 10 years of experience, specializing in holistic, safe, and natural treatment for chronic and acute conditions.",
  memberOf: { "@type": "MedicalOrganization", name: "Sarada Homeo Clinic" },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: "BHMS",
    recognizedBy: { "@type": "Organization", name: "Andhra Pradesh Board of Homeopathic Medicine" },
  },
  identifier: { "@type": "PropertyValue", name: "Registration Number", value: "5732" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://saradahomeoclinic.com/#website",
  name: "Sarada Homeo Clinic",
  url: "https://saradahomeoclinic.com",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://saradahomeoclinic.com/?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://saradahomeoclinic.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://saradahomeoclinic.com/about" },
    { "@type": "ListItem", position: 3, name: "Services", item: "https://saradahomeoclinic.com/services" },
    { "@type": "ListItem", position: 4, name: "Treatments", item: "https://saradahomeoclinic.com/treatments" },
    { "@type": "ListItem", position: 5, name: "Book Appointment", item: "https://saradahomeoclinic.com/book" },
    { "@type": "ListItem", position: 6, name: "Contact", item: "https://saradahomeoclinic.com/contact" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is homeopathy safe for children and pregnant women?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Homeopathic remedies are highly diluted, contain no toxic chemicals, and are completely safe for infants, children, and pregnant women when prescribed by a qualified practitioner.",
      },
    },
    {
      "@type": "Question",
      name: "How long does homeopathic treatment take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Duration varies by condition. Acute illnesses typically respond within days to weeks. Chronic conditions such as eczema, asthma, or arthritis may require 3–12 months of consistent treatment.",
      },
    },
    {
      "@type": "Question",
      name: "What are the consultation timings at Sarada Homeo Clinic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mon/Tue/Wed/Fri: 9:00 AM – 1:00 PM & 6:00 PM – 8:00 PM. Thursday: 11:00 AM – 1:00 PM & 6:00 PM – 8:00 PM. Saturday: 10:00 AM – 12:00 PM. Sunday: Closed.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book an appointment online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can submit an online appointment request at saradahomeoclinic.com/book and our team will confirm your slot within 2 hours.",
      },
    },
  ],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // GA4 Measurement ID — set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#006a39" />
        <meta name="msapplication-TileColor" content="#006a39" />

        {/* Schema.org Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        {/* ── Google Analytics 4 ──────────────────────────────────────────── */}
        {/* Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local to activate     */}
        {gaMeasurementId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaMeasurementId}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}

        {/* ── Google Tag Manager (GTM) ────────────────────────────────────── */}
        {/* Set NEXT_PUBLIC_GTM_ID in .env.local to activate                */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col antialiased bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
        {/* GTM noscript fallback */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {/* ── Skip to Main Content (WCAG 2.2 AA Requirement) ─────────────── */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-xl focus:shadow-xl focus:font-bold focus:text-sm focus:outline-none"
        >
          Skip to main content
        </a>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main id="main-content" className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
          <FloatingWidgets />
        </ThemeProvider>
      </body>
    </html>
  );
}
