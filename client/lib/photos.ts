export type ProjectPhoto = {
  src: string;
  alt: string;
};

export const projectPhotos = {
  installation: {
    src: "/images/upvc-installation.png",
    alt: "Installer aligning a white UPVC window frame with a spirit level",
  },
  home: {
    src: "/images/upvc-home-nepal.png",
    alt: "Nepal-context home with white UPVC windows after rain",
  },
  prefabFrame: {
    src: "/images/prefab-steel-frame.png",
    alt: "Lightweight galvanized steel-frame prefab structure under construction",
  },
} satisfies Record<string, ProjectPhoto>;

export const productPhotos = {
  windows: { ...projectPhotos.home, alt: "White UPVC windows fitted in a finished residential home" },
  doors: { ...projectPhotos.installation, alt: "Installer fitting a white UPVC door and frame" },
  prefabHomes: projectPhotos.prefabFrame,
  hardware: { ...projectPhotos.installation, alt: "Installer checking UPVC frame hardware during fitting" },
  glassWork: { ...projectPhotos.home, alt: "Glazed UPVC windows and doors fitted in a residential home" },
  siteConsultation: { ...projectPhotos.installation, alt: "Installer measuring and aligning a UPVC frame on site" },
} satisfies Record<string, ProjectPhoto>;

export const galleryPhotos = [
  { ...projectPhotos.installation, label: "Measured installation", className: "md:row-span-2" },
  { ...projectPhotos.home, label: "Weather-ready UPVC", className: "md:col-span-2" },
  { ...projectPhotos.prefabFrame, label: "Prefab steel frame", className: "" },
];
