// src/data/projects.ts

// ============================================================
// TYPES
// ============================================================

export type ProjectStatus = "live" | "development" | "completed";

export type ProjectCategory =
  | "business"
  | "application"
  | "concept";

export interface ProjectCaseStudy {
  overview?: string;
  challenge: string;
  solution: string;
  outcome?: string;
  highlights?: string[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  year: number;

  category: ProjectCategory;

  thumbnail: string;
  images?: string[];

  accent: string;
  technologies: string[];

  featured: boolean;
  order: number;

  status: ProjectStatus;

  liveUrl?: string;
  githubUrl?: string;

  caseStudy?: ProjectCaseStudy;
}

// ============================================================
// PROJECT DATA
// ============================================================

export const projects: Project[] = [
  // ==========================================================
  // 01 — IONIAN DIGITAL
  // ==========================================================

  {
    slug: "ionian-digital",
    title: "Ionian Digital",
    subtitle: "Independent Digital Agency",
    description:
      "A modern, multilingual agency website combining expressive design, smooth interactions, and practical business functionality.",

    year: 2026,
    category: "business",

    thumbnail: "/projects/ioniandigital.png",
    images: [],

    accent: "#A855F7",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "next-intl",
      "Motion",
    ],

    featured: true,
    order: 1,

    status: "live",

    liveUrl: "https://www.ionian-digital.com",

    caseStudy: {
      overview:
        "Ionian Digital is my independent web development and digital solutions agency, focused on helping businesses establish compelling online experiences.",

      challenge:
        "Create a professional digital presence that clearly communicates the agency's services while standing out visually and making it easy for prospective clients to get in touch.",

      solution:
        "Designed and developed a responsive, multilingual website featuring interactive service sections, smooth animations, clear service information, and streamlined contact functionality.",

      outcome:
        "Launched a complete agency website that serves as the central destination for showcasing services and connecting with potential clients.",

      highlights: [
        "Independent design and development",
        "Multilingual website architecture",
        "Responsive, mobile-friendly layouts",
        "Interactive animations and transitions",
        "Integrated contact functionality",
        "Search engine optimization considerations",
      ],
    },
  },

  // ==========================================================
  // 02 — CRAVE NUTRITION
  // ==========================================================

  {
    slug: "crave-nutrition",
    title: "Crave Nutrition",
    subtitle: "Café Website",
    description:
      "A clean, mobile-first café website showcasing menu offerings, featured items, and essential customer information.",

    year: 2026,
    category: "business",

    thumbnail: "/projects/crave.png",
    images: [],

    accent: "#C7FF4D",

    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Responsive Design",
      "UI/UX Design",
    ],

    featured: true,
    order: 2,

    status: "live",

    liveUrl: "https://www.cravenutritionedh.com/",

    caseStudy: {
      overview:
        "A responsive café website designed to present Crave Nutrition's menu and brand while making important business information easy to find.",

      challenge:
        "Create a welcoming online presence that helps customers quickly discover menu items, featured offerings, and location details, particularly on mobile devices.",

      solution:
        "Built a mobile-first React website with a clean visual hierarchy, intuitive navigation, and accessible menu and contact information.",

      outcome:
        "Delivered a live business website designed around the everyday needs of café customers.",

      highlights: [
        "Mobile-first design",
        "Digital menu presentation",
        "Featured menu items",
        "Location and contact information",
        "Responsive layouts",
        "Brand-focused interface design",
      ],
    },
  },

  // ==========================================================
  // 03 — BISTRICA PADDLE
  // ==========================================================

  {
    slug: "bistrica-paddleboard",
    title: "Bistrica Paddle",
    subtitle: "Tourism & Rental Website",
    description:
      "A multilingual paddleboard rental website helping visitors explore experiences, compare rental options, and connect directly with the business.",

    year: 2026,
    category: "business",

    thumbnail: "/projects/bistricapaddle.png",
    images: [],

    accent: "#00E5FF",

    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Responsive Design",
      "Multilingual Support",
      "WhatsApp Integration",
    ],

    featured: true,
    order: 3,

    status: "live",

    liveUrl: "https://www.bistricapaddleboard.com/",

    caseStudy: {
      overview:
        "A multilingual website for a paddleboard rental business in Sarandë, Albania, designed around the needs of international visitors.",

      challenge:
        "Make rental information accessible to tourists while reducing friction between discovering an experience and contacting the business.",

      solution:
        "Created a responsive website with multilingual content, clear rental information, WhatsApp contact integration, and Google Maps.",

      outcome:
        "Delivered a live tourism website that helps visitors explore services and contact the rental business directly.",

      highlights: [
        "Multilingual accessibility",
        "Paddleboard rental information",
        "Pricing presentation",
        "WhatsApp integration",
        "Google Maps integration",
        "Mobile-first experience",
      ],
    },
  },

  // ==========================================================
  // 04 — VIC'S TRAINING APP
  // ==========================================================

  {
    slug: "vics-training-app",
    title: "Vic's Training App",
    subtitle: "Restaurant Training Experience",
    description:
      "An interactive restaurant training application inspired by real hospitality experience and built to support practical skill development.",

    year: 2026,
    category: "application",

    thumbnail: "/projects/vicstrainingapp.png",
    images: [],

    accent: "#5454FF",

    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "State Management",
      "UI Design",
    ],

    featured: true,
    order: 4,

    status: "live",

    liveUrl: "https://vics-training.vercel.app/",

    caseStudy: {
      overview:
        "A personal application project created for the restaurant where I worked, providing a virtual environment for practicing and improving job-related skills.",

      challenge:
        "Explore how interactive software could make restaurant training more engaging and approachable.",

      solution:
        "Built a React application centered on user interaction, interface design, and application state management.",

      highlights: [
        "Restaurant-specific training concept",
        "Interactive learning interface",
        "React state management",
        "Custom UI components",
        "Practical hospitality use case",
        "User-focused training experience",
      ],
    },
  },

  // ==========================================================
  // 05 — RESTAURANT TRAINING PLATFORM
  // ==========================================================

  {
    slug: "restaurant-training-platform",
    title: "Restaurant Training Platform",
    subtitle: "Interactive Learning Application",
    description:
      "A modular restaurant training platform featuring interactive lessons, quizzes, and role-based learning experiences.",

    year: 2026,
    category: "application",

    thumbnail: "/projects/restauranttrainingplatform.png",
    images: [],

    accent: "#39FF88",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Authentication",
      "Dynamic Routing",
    ],

    featured: true,
    order: 5,

    status: "development",

    liveUrl:
      "https://restaurant-training-platform.vercel.app/r/demo",

    caseStudy: {
      overview:
        "A restaurant training platform concept designed to make employee onboarding and ongoing education more accessible, interactive, and organized.",

      challenge:
        "Traditional restaurant training can be inconsistent and difficult to standardize across different positions and experience levels.",

      solution:
        "Developed a modular application architecture supporting interactive lessons, quizzes, authentication, and role-based learning paths.",

      highlights: [
        "Interactive training lessons",
        "Knowledge-check quizzes",
        "Role-based learning paths",
        "Firebase integration and authentication",
        "Dynamic application routing",
        "Modular architecture designed for expansion",
      ],
    },
  },

  // ==========================================================
  // 06 — TRAVEL TRACKER
  // ==========================================================

  {
    slug: "travel-tracker",
    title: "Travel Tracker",
    subtitle: "Interactive Travel Map",
    description:
      "A personal travel application that transforms visited destinations, photographs, and travel memories into an interactive map experience.",

    year: 2026,
    category: "application",

    thumbnail: "/projects/traveltracker.png",
    images: [],

    accent: "#2DD4BF",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Leaflet",
      "Map APIs",
    ],

    featured: false,
    order: 6,

    status: "live",

    liveUrl:
      "https://alexysandajtraveltracker.vercel.app/",

    caseStudy: {
      overview:
        "A personal project built to visualize travel experiences and organize destinations, photographs, and notes in one place.",

      challenge:
        "Travel memories often end up scattered across photo libraries, notes, and separate applications, making it difficult to see the bigger picture of a journey.",

      solution:
        "Created a responsive application using Next.js and Leaflet to visualize visited locations on an interactive map and organize related travel information.",

      highlights: [
        "Interactive map visualization",
        "Leaflet integration",
        "Geographic location data",
        "Dynamic rendering",
        "Structured travel information",
        "Responsive application interface",
      ],
    },
  },

  // ==========================================================
  // 07 — FIREBASE ECOMMERCE
  // ==========================================================

  {
    slug: "firebase-ecommerce",
    title: "Firebase Ecommerce",
    subtitle: "Full-Stack Storefront",
    description:
      "A full-stack e-commerce application featuring authentication, real-time inventory, persistent cart state, and a checkout workflow.",

    year: 2026,
    category: "application",

    thumbnail: "/projects/firebase.png",
    images: [],

    accent: "#FF4DA6",

    technologies: [
      "React",
      "TypeScript",
      "Firebase Authentication",
      "Cloud Firestore",
      "Cloud Functions",
    ],

    featured: false,
    order: 7,

    status: "completed",

    githubUrl:
      "https://github.com/angelicereeves/firebase-ecommerce",

    caseStudy: {
      overview:
        "A Firebase-powered e-commerce storefront developed to explore full-stack application architecture, cloud services, and interactive shopping experiences.",

      challenge:
        "Build a responsive storefront capable of managing user authentication, product data, shopping cart state, and checkout interactions.",

      solution:
        "Developed the frontend with React and TypeScript, integrating Firebase Authentication, Cloud Firestore, and Cloud Functions for backend functionality.",

      highlights: [
        "Firebase Authentication",
        "Real-time Firestore and inventory updates",
        "Detailed product pages",
        "Persistent shopping cart",
        "Checkout workflow and state management",
        "Serverless backend integration",
      ],
    },
  },

  // ==========================================================
  // 08 — WESTOSHA FALCON TRACK & FIELD
  // ==========================================================

  {
    slug: "westosha-falcon-track",
    title: "Westosha Falcon Track & Field",
    subtitle: "Athletics Program Website",
    description:
      "A responsive athletics website providing a centralized, visually engaging digital presence for a high school track and field program.",

    year: 2026,
    category: "business",

    thumbnail: "/projects/westoshatrack.png",
    images: [],

    accent: "#4F8CFF",

    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Responsive Design",
      "UI/UX Design",
      "Lovable",
      "Vercel",
    ],

    featured: false,
    order: 8,

    status: "live",

    liveUrl:
      "https://westosha-falcon-track.vercel.app/",

    caseStudy: {
      overview:
        "A responsive athletics website developed for Westosha Central's track and field program.",

      challenge:
        "Create an organized and accessible digital presence that reflects the energy of a competitive high school athletics program.",

      solution:
        "Designed and developed a responsive interface with intuitive navigation, a clear information hierarchy, and an athletics-inspired visual identity.",

      highlights: [
        "Responsive athletics website",
        "Accessible information structure",
        "Intuitive navigation",
        "Custom visual design",
        "AI-assisted development",
        "Vercel deployment",
      ],
    },
  },

  // ==========================================================
  // 09 — HOTEL MIRË
  // ==========================================================

  {
    slug: "hotel-mire",
    title: "Hotel Mirë",
    subtitle: "Boutique Hotel Concept",
    description:
      "An elegant bilingual hotel website inspired by the Albanian Riviera, featuring immersive imagery, room showcases, and a booking inquiry preview.",

    year: 2026,
    category: "concept",

    thumbnail: "/projects/hotelmire.png",
    images: [],

    accent: "#4DDCC8",

    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Responsive Design",
      "Multilingual Support",
    ],

    featured: false,
    order: 9,

    status: "completed",

    liveUrl: "https://hotel-mire.vercel.app/",

    caseStudy: {
      overview:
        "A boutique hotel website concept inspired by the atmosphere and natural beauty of the Albanian Riviera.",

      challenge:
        "Design a hospitality experience that feels inviting and refined while presenting accommodation information clearly to international visitors.",

      solution:
        "Created a bilingual website with Mediterranean-inspired visuals, elegant room presentations, and a booking inquiry preview.",

      highlights: [
        "English and Albanian support",
        "Boutique hotel room showcases",
        "Mediterranean-inspired design",
        "Booking inquiry preview",
        "Responsive layouts",
        "Hospitality-focused UI/UX",
      ],
    },
  },

  // ==========================================================
  // 10 — VATRA RESTAURANT
  // ==========================================================

  {
    slug: "vatra-restaurant",
    title: "Vatra Restaurant",
    subtitle: "Traditional Albanian Kitchen Concept",
    description:
      "A bilingual restaurant website concept featuring warm visual storytelling, a complete menu, photo gallery, and demonstration reservation options.",

    year: 2026,
    category: "concept",

    thumbnail: "/projects/vatra.png",
    images: [],

    accent: "#FF6B6B",

    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Responsive Design",
      "Multilingual Support",
    ],

    featured: false,
    order: 10,

    status: "completed",

    liveUrl:
      "https://vatra-restaurant-five.vercel.app/",

    caseStudy: {
      overview:
        "A fictional restaurant website concept designed to celebrate traditional Albanian cuisine through a warm and welcoming digital experience.",

      challenge:
        "Develop a restaurant website that balances cultural personality, visual storytelling, and practical dining information.",

      solution:
        "Built a bilingual website featuring a full menu, photography gallery, embedded map, and demonstration reservation options through WhatsApp and email.",

      highlights: [
        "English and Albanian support",
        "Complete restaurant menu",
        "Photography gallery and responsive design",
        "Google Maps integration",
        "Demonstration reservation experience",
        "WhatsApp and email contact options",
      ],
    },
  },

  // ==========================================================
  // 11 — MIRA SALON
  // ==========================================================

  {
    slug: "mira-salon",
    title: "Mira Salon",
    subtitle: "Beauty & Hair Studio Concept",
    description:
      "An elegant multilingual salon website concept with detailed services, transparent pricing, and a streamlined appointment booking experience.",

    year: 2026,
    category: "concept",

    thumbnail: "/projects/mira-salon.png",
    images: [],

    accent: "#C084FC",

    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Responsive Design",
      "Multilingual Support",
    ],

    featured: false,
    order: 11,

    status: "completed",

    liveUrl:
      "https://mira-salon-psi.vercel.app/",

    caseStudy: {
      overview:
        "A multilingual website concept for a contemporary beauty and hair studio in Albania.",

      challenge:
        "Create a polished salon experience that communicates services and pricing clearly while making appointment inquiries approachable.",

      solution:
        "Designed a responsive website with refined typography, detailed service listings, transparent pricing, and an appointment booking experience.",

      highlights: [
        "Multilingual interface",
        "Detailed service listings",
        "Transparent pricing",
        "Appointment booking experience",
        "Elegant visual design",
        "Responsive layouts",
      ],
    },
  },
];

// ============================================================
// PROJECT HELPERS
// ============================================================

export const getAllProjects = (): Project[] =>
  [...projects].sort((a, b) => a.order - b.order);

export const getFeaturedProjects = (
  limit: number = 6
): Project[] =>
  getAllProjects()
    .filter((project) => project.featured)
    .slice(0, limit);

export const getProjectBySlug = (
  slug: string
): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const getProjectCount = (): number =>
  projects.length;

export const getProjectSlugs = (): string[] =>
  projects.map((project) => project.slug);

// ============================================================
// CATEGORY HELPERS
// ============================================================

export const getProjectsByCategory = (
  category: ProjectCategory
): Project[] =>
  getAllProjects().filter(
    (project) => project.category === category
  );

export const getBusinessProjects = (): Project[] =>
  getProjectsByCategory("business");

export const getApplicationProjects = (): Project[] =>
  getProjectsByCategory("application");

export const getConceptProjects = (): Project[] =>
  getProjectsByCategory("concept");

// ============================================================
// CATEGORY FILTERS
// ============================================================

export const projectCategories = [
  {
    id: "all",
    label: "All Projects",
  },
  {
    id: "business",
    label: "Websites",
  },
  {
    id: "application",
    label: "Applications",
  },
  {
    id: "concept",
    label: "Concepts",
  },
] as const;