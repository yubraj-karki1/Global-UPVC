import type { IconName } from "@/components/Icons";
import { productPhotos } from "@/lib/photos";

export type Product = {
  slug: string;
  icon: IconName;
  title: string;
  shortDescription: string;
  introduction: string;
  image: string;
  imageAlt: string;
  options: { title: string; description: string }[];
  suitableFor: string[];
  quoteNeeds: string[];
};

export const products: Product[] = [
  {
    slug: "upvc-windows", icon: "window", title: "UPVC Windows",
    shortDescription: "Secure, weather-tight windows made to your exact opening.",
    introduction: "We measure, fabricate and install UPVC windows around the opening, ventilation and daily use of each room. The final configuration, glass and hardware are confirmed before fabrication.",
    image: productPhotos.windows.src, imageAlt: productPhotos.windows.alt,
    options: [
      { title: "Sliding windows", description: "Space-saving panels suited to wider openings and rooms where an outward-opening sash is impractical." },
      { title: "Casement windows", description: "Hinged sashes that open widely for ventilation and convenient access to the glass." },
      { title: "Fixed windows", description: "Non-opening glazed panels used for daylight, views and combination layouts." },
      { title: "Combination windows", description: "Fixed and opening panels arranged together for the needs of the room." },
    ],
    suitableFor: ["Homes and apartments", "Offices and shops", "Renovation openings", "Prefab buildings"],
    quoteNeeds: ["Approximate width and height", "Number of windows", "Preferred opening style", "Project location"],
  },
  {
    slug: "upvc-doors", icon: "door", title: "UPVC Doors",
    shortDescription: "Strong, low-maintenance doors for homes and commercial spaces.",
    introduction: "UPVC doors provide a clean, practical entrance or balcony opening with compatible glass and locking hardware. Every unit is sized for the actual opening and its expected use.",
    image: productPhotos.doors.src, imageAlt: productPhotos.doors.alt,
    options: [
      { title: "Sliding doors", description: "Wide glazed access that does not require swing space inside or outside." },
      { title: "Hinged doors", description: "A familiar single- or double-leaf arrangement for regular access." },
      { title: "Glazed doors", description: "Door frames combined with selected glass for daylight and visibility." },
      { title: "Door combinations", description: "Doors paired with fixed side or top panels for larger openings." },
    ],
    suitableFor: ["Main and secondary entrances", "Balconies and terraces", "Kitchens and utility areas", "Office partitions"],
    quoteNeeds: ["Opening width and height", "Opening direction", "Glass or privacy needs", "Project location"],
  },
  {
    slug: "prefabricated-homes", icon: "home", title: "Prefabricated Homes",
    shortDescription: "Practical steel-frame buildings designed for faster construction.",
    introduction: "We discuss the plot, intended use and room requirements before proposing a prefab steel-frame solution. Site access, foundations, structure, enclosure and finishes are reviewed as one project.",
    image: productPhotos.prefabHomes.src, imageAlt: productPhotos.prefabHomes.alt,
    options: [
      { title: "Residential spaces", description: "Compact homes planned around the number of rooms and daily living needs." },
      { title: "Site offices", description: "Practical workspaces for project and operational sites." },
      { title: "Utility buildings", description: "Purpose-led enclosed spaces for storage or supporting facilities." },
      { title: "Custom layouts", description: "Room arrangements developed from plot conditions and the agreed brief." },
    ],
    suitableFor: ["Residential plots", "Project sites", "Office requirements", "Additional buildings"],
    quoteNeeds: ["Plot location and access", "Approximate floor area", "Number and use of rooms", "Existing drawing, if available"],
  },
  {
    slug: "hardware-fittings", icon: "hardware", title: "Hardware & Fittings",
    shortDescription: "Reliable handles, locks, rollers and compatible fittings.",
    introduction: "Correct hardware affects how smoothly a window or door operates and how securely it closes. We match fittings to the unit type, size and expected frequency of use.",
    image: productPhotos.hardware.src, imageAlt: productPhotos.hardware.alt,
    options: [
      { title: "Handles", description: "Operating handles selected for the window or door configuration." },
      { title: "Locks", description: "Compatible locking components for secure and consistent closing." },
      { title: "Rollers", description: "Sliding components matched to the panel and track system." },
      { title: "Hinges and accessories", description: "Supporting fittings for opening, alignment and everyday operation." },
    ],
    suitableFor: ["New fabrication", "Compatible replacements", "Operational adjustments", "Window and door upgrades"],
    quoteNeeds: ["Window or door type", "Photo of the existing fitting", "Quantity required", "Project location"],
  },
  {
    slug: "glass-work", icon: "glass", title: "Glass Work",
    shortDescription: "Measured, supplied and fitted glass for doors, windows and partitions.",
    introduction: "Glass is selected around the opening, safety, privacy, daylight and intended use. We confirm sizes and edge conditions before supply and installation.",
    image: productPhotos.glassWork.src, imageAlt: productPhotos.glassWork.alt,
    options: [
      { title: "Window glass", description: "Glazing measured and fitted for compatible window systems." },
      { title: "Door glass", description: "Glass panels selected around access, visibility and safety requirements." },
      { title: "Fixed glazing", description: "Non-opening glazed sections for daylight and spatial separation." },
      { title: "Glass partitions", description: "Measured internal glazing for suitable residential or commercial spaces." },
    ],
    suitableFor: ["UPVC windows and doors", "Interior partitions", "Replacement glazing", "New openings"],
    quoteNeeds: ["Approximate glass size", "Application or opening type", "Photo of the location", "Project location"],
  },
  {
    slug: "site-consultation", icon: "measure", title: "Site Consultation",
    shortDescription: "On-site measurement and clear guidance before fabrication starts.",
    introduction: "A site visit helps turn an initial idea into a clear scope. We inspect openings or plot conditions, take relevant measurements and discuss the practical next steps for quoting.",
    image: productPhotos.siteConsultation.src, imageAlt: productPhotos.siteConsultation.alt,
    options: [
      { title: "Opening measurement", description: "Width, height and relevant wall or sill conditions recorded on site." },
      { title: "Configuration advice", description: "Opening styles discussed around ventilation, access and usable space." },
      { title: "Material discussion", description: "Profile, glass and hardware requirements reviewed before quoting." },
      { title: "Prefab site review", description: "Plot, access and initial space requirements discussed for prefab work." },
    ],
    suitableFor: ["New construction", "Renovation", "Replacement units", "Prefab project planning"],
    quoteNeeds: ["Site location", "Type of work", "Approximate quantity or area", "Preferred visit timing"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
