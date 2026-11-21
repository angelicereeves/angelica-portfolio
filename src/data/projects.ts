export type ProjectStatus = "live" | "development" | "completed";

export interface ProjectCaseStudy {
  overview?: string;
  challenge: string;
  solution: string;
  outcome?: string;
  highlights?: string[];
}

export interface Project {
  // Basic information
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  year: number;

  // Visual identity
  thumbnail: string;
  images?: string[];
  accent: string;

  // Technical information
  technologies: string[];

  // Display settings
  featured: boolean;
  order: number;
  status: ProjectStatus;

  // External links
  liveUrl?: string;
  githubUrl?: string;

  // Optional detailed case study
  caseStudy?: ProjectCaseStudy;
}

export const projects: Project[] = [
  {
    slug: "ionian-digital",
    title: "Ionian Digital",
    subtitle: "Digital Agency & Multilingual Web Development",
    description:
      "A digital agency helping businesses establish a stronger online presence through modern, multilingual websites and thoughtful design.",
    year: 2026,

    thumbnail: "/projects/ionian-digital.webp",
    images: [],

    accent: "#A855F7",

    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "next-intl",
      "Motion",
    ],

    featured: true,
    order: 1,
    status: "live",

    caseStudy: {
      overview:
        "Ionian Digital is a web development agency focused on helping local businesses build a stronger digital presence.",
      challenge:
        "Many businesses in tourism-focused areas lack modern, multilingual websites that effectively serve international customers.",
      solution:
        "Developed a responsive, multilingual agency website showcasing services, pricing, and client projects, with streamlined contact functionality.",
      highlights: [
        "Multilingual website architecture",
        "Responsive layouts",
        "Interactive animations",
        "Service and pricing presentation",
        "Contact form integration",
      ],
    },
  },

  {
    slug: "crave-nutrition",
    title: "Crave Nutrition",
    subtitle: "Brand Identity & Website Development",
    description:
      "A vibrant digital experience combining modern frontend development with a distinctive visual identity.",
    year: 2026,

    thumbnail: "/projects/crave-nutrition.webp",
    images: [],

    accent: "#C7FF4D",

    technologies: [
      "React",
      "Responsive Design",
      "UI/UX Design",
    ],

    featured: true,
    order: 2,
    status: "live",

    caseStudy: {
      overview:
        "A nutrition-focused website designed to create a memorable, approachable digital presence.",
      challenge:
        "Create an engaging website that communicates the brand's personality while remaining easy to navigate.",
      solution:
        "Designed and developed a responsive frontend experience emphasizing strong visual hierarchy, intuitive navigation, and cohesive branding.",
      highlights: [
        "Custom visual design",
        "Responsive frontend development",
        "Brand-focused UI",
      ],
    },
  },

  {
    slug: "bistrica-paddleboard",
    title: "Bistrica Paddleboard",
    subtitle: "Tourism Website & Digital Experience",
    description:
      "A visually engaging tourism website showcasing paddleboarding experiences along Albania's southern coast.",
    year: 2026,

    thumbnail: "/projects/bistrica-paddleboard.webp",
    images: [],

    accent: "#00E5FF",

    technologies: [
      "React",
      "Responsive Design",
      "UI/UX Design",
    ],

    featured: true,
    order: 3,
    status: "live",

    caseStudy: {
      overview:
        "A tourism-focused website built to showcase paddleboarding experiences and help visitors explore available activities.",
      challenge:
        "Present outdoor experiences in a way that captures visitors' attention while keeping information easy to access.",
      solution:
        "Created a visually immersive, responsive website emphasizing imagery, clear navigation, and accessible information.",
      highlights: [
        "Tourism-focused visual design",
        "Mobile-friendly layouts",
        "Clear user navigation",
      ],
    },
  },

  {
    slug: "vics-training-app",
    title: "Vic's Training App",
    subtitle: "Custom Business Application",
    description:
      "A custom training application designed to simplify employee onboarding and improve operational consistency.",
    year: 2026,

    thumbnail: "/projects/vics-training.webp",
    images: [],

    accent: "#5454FF",

    technologies: [
      "React",
      "JavaScript",
      "Full-Stack Development",
    ],

    featured: true,
    order: 4,
    status: "completed",

    caseStudy: {
      overview:
        "A custom application developed to help streamline employee training and onboarding.",
      challenge:
        "Traditional employee training processes can be inconsistent, difficult to organize, and time-consuming.",
      solution:
        "Built an application to organize training materials and provide a more structured onboarding experience.",
      highlights: [
        "Custom application development",
        "Employee onboarding workflows",
        "Business process improvement",
      ],
    },
  },

  {
    slug: "wine-of-albania",
    title: "Wine of Albania",
    subtitle: "Digital Wine Marketplace",
    description:
      "An evolving marketplace designed to connect Albanian wineries with customers through a centralized digital platform.",
    year: 2026,

    thumbnail: "/projects/wine-of-albania.webp",
    images: [],

    accent: "#FF3CAC",

    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],

    featured: true,
    order: 5,
    status: "development",

    caseStudy: {
      overview:
        "A digital marketplace concept focused on showcasing Albanian wineries and making their products more accessible.",
      challenge:
        "Albanian wineries have limited visibility through centralized online marketplaces, particularly for international audiences.",
      solution:
        "Developing a marketplace architecture that supports winery discovery, product exploration, and future commerce functionality.",
      highlights: [
        "Marketplace architecture",
        "Responsive interface development",
        "Winery discovery experience",
        "Scalable application planning",
      ],
    },
  },
];

// --------------------------------------------------
// PROJECT HELPERS
// --------------------------------------------------

// All projects, sorted by display order
export const getAllProjects = (): Project[] => {
  return [...projects].sort((a, b) => a.order - b.order);
};

// Featured projects for the homepage
export const getFeaturedProjects = (limit = 6): Project[] => {
  return getAllProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
};

// Find a project by its URL slug
export const getProjectBySlug = (
  slug: string
): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};

// Total project count
export const getProjectCount = (): number => {
  return projects.length;
};

// Get all project slugs for dynamic routes
export const getProjectSlugs = (): string[] => {
  return projects.map((project) => project.slug);
};