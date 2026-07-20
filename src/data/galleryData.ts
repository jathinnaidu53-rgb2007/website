/**
 * SINGLE SOURCE OF TRUTH for all gallery images.
 *
 * ⚠️  IMPORTANT: Each item explicitly maps its title to its image path.
 *     Never derive image order from array index — always use the `image` field.
 *     If you add, remove, or reorder items, the image shown is determined
 *     solely by the `image` property, not the position in the array.
 */

export interface GalleryItem {
  /** Unique stable key — never changes even if order changes */
  id: string;
  title: string;
  caption: string;
  alt: string;
  /** Explicit path — the ONLY thing that determines which photo is shown */
  image: string;
  category: "clinic" | "consultation" | "medicine" | "doctor" | "waiting";
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "clinic-exterior",
    title: "Sarada Homeo Clinic Exterior",
    caption: "Clinic Exterior",
    alt: "Sarada Homeo Clinic — front entrance with signboard, Srikakulam",
    image: "/images/gallery/clinic-exterior.jpg",      // ← exterior photo
    category: "clinic",
  },
  {
    id: "doctor-consulting",
    title: "Doctor Consulting Patient",
    caption: "Doctor Consultation with Patient",
    alt: "Doctor consulting a patient at Sarada Homeo Clinic",
    image: "/images/gallery/waiting-area.jpg",  // ← swapped to waiting area photo
    category: "consultation",
  },
  {
    id: "medicine-section",
    title: "Homeopathic Medicine Section",
    caption: "Medicine Storage",
    alt: "Homeopathic medicine shelves stocked with dilutions and remedies",
    image: "/images/gallery/medicine-section.jpg",     // ← medicine shelves photo
    category: "medicine",
  },
  {
    id: "doctor-portrait",
    title: "Dr. Panchireddi Anil Kumar",
    caption: "Dr. Panchireddi Anil Kumar, BHMS",
    alt: "Dr. Panchireddi Anil Kumar (BHMS) — Chief Physician, Sarada Homeo Clinic",
    image: "/images/doctor/doctor-portrait.jpg",       // ← professional portrait
    category: "doctor",
  },
  {
    id: "waiting-area",
    title: "Patient Waiting Area",
    caption: "Patient Waiting Area",
    alt: "Patient waiting area at Sarada Homeo Clinic",
    image: "/images/gallery/doctor-consultation.jpg",         // ← swapped to consulting photo
    category: "waiting",
  },
];

export const GALLERY_FILTER_TABS = [
  { id: "all",          label: "All" },
  { id: "clinic",       label: "Clinic Exterior" },
  { id: "consultation", label: "Consultation" },
  { id: "medicine",     label: "Medicine" },
  { id: "doctor",       label: "Doctor" },
  { id: "waiting",      label: "Waiting Area" },
] as const;
