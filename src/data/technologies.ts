export type Galaxy =
  | "frontend"
  | "backend"
  | "data"
  | "design";

export type Technology = {
  id: string;
  name: string;
  galaxy: Galaxy;
  headline: string;
  description: string;
  capabilities: string[];
  related: string[];
  projectIds: string[];
};

export const galaxies = [
  {
    id: "all",
    label: "All Systems",
    color: "#F5F5F7",
  },
  {
    id: "frontend",
    label: "Frontend",
    color: "#00E5FF",
  },
  {
    id: "backend",
    label: "Backend",
    color: "#A855F7",
  },
  {
    id: "data",
    label: "Data & Deployment",
    color: "#C7FF4D",
  },
  {
    id: "design",
    label: "Design",
    color: "#FF3CAC",
  },
] as const;

export const galaxyColors: Record<Galaxy, string> = {
  frontend: "#00E5FF",
  backend: "#A855F7",
  data: "#C7FF4D",
  design: "#FF3CAC",
};

export const technologies: Technology[] = [
  // ==================================================
  // FRONTEND
  // ==================================================

  {
    id: "react",
    name: "React",
    galaxy: "frontend",
    headline: "Interfaces that feel alive.",
    description:
      "My go-to library for building interactive, component-driven interfaces that feel intuitive and responsive.",
    capabilities: [
      "Component architecture",
      "Hooks & state",
      "Interactive UI",
    ],
    related: [
      "nextjs",
      "typescript",
      "javascript",
      "tailwind",
    ],
    projectIds: ["ionian-digital"],
  },

  {
    id: "nextjs",
    name: "Next.js",
    galaxy: "frontend",
    headline: "From idea to production.",
    description:
      "My preferred framework for building complete web experiences, from polished frontend pages to server-side functionality.",
    capabilities: [
      "App Router",
      "Server rendering",
      "Full-stack applications",
    ],
    related: [
      "react",
      "typescript",
      "nodejs",
      "vercel",
    ],
    projectIds: [
      "ionian-digital",
      "wine-of-albania",
    ],
  },

  {
    id: "typescript",
    name: "TypeScript",
    galaxy: "frontend",
    headline: "Clarity in every component.",
    description:
      "I use TypeScript to make applications easier to maintain, debug, and confidently expand.",
    capabilities: [
      "Type-safe components",
      "Interfaces & types",
      "Maintainable code",
    ],
    related: [
      "javascript",
      "react",
      "nextjs",
      "nodejs",
    ],
    projectIds: [
      "ionian-digital",
      "wine-of-albania",
    ],
  },

  {
    id: "javascript",
    name: "JavaScript",
    galaxy: "frontend",
    headline: "The logic behind the experience.",
    description:
      "The foundation of much of my web development work, from browser interactions to backend functionality.",
    capabilities: [
      "ES6+",
      "Async programming",
      "DOM & browser APIs",
    ],
    related: [
      "typescript",
      "react",
      "nodejs",
    ],
    projectIds: [],
  },

  {
    id: "tailwind",
    name: "Tailwind CSS",
    galaxy: "frontend",
    headline: "Design, translated into code.",
    description:
      "I use Tailwind to build responsive layouts, consistent design systems, and interfaces with personality.",
    capabilities: [
      "Responsive design",
      "Design systems",
      "Custom styling",
    ],
    related: [
      "react",
      "nextjs",
      "figma",
      "uiux",
    ],
    projectIds: [
      "ionian-digital",
      "wine-of-albania",
    ],
  },

  // ==================================================
  // BACKEND
  // ==================================================

  {
    id: "nodejs",
    name: "Node.js",
    galaxy: "backend",
    headline: "Beyond the browser.",
    description:
      "I use Node.js to build server-side functionality and connect applications with the services they depend on.",
    capabilities: [
      "Server-side JavaScript",
      "API integration",
      "Application logic",
    ],
    related: [
      "javascript",
      "typescript",
      "express",
      "rest",
    ],
    projectIds: [],
  },

  {
    id: "express",
    name: "Express.js",
    galaxy: "backend",
    headline: "Simple, practical backend systems.",
    description:
      "A lightweight framework I use for building API routes, middleware, and backend services.",
    capabilities: [
      "API routes",
      "Middleware",
      "Request handling",
    ],
    related: [
      "nodejs",
      "rest",
      "mysql",
    ],
    projectIds: [],
  },

  {
    id: "python",
    name: "Python",
    galaxy: "backend",
    headline: "A tool for solving problems.",
    description:
      "I use Python for backend development, application logic, and practical automation.",
    capabilities: [
      "Backend logic",
      "Automation",
      "Data handling",
    ],
    related: [
      "flask",
      "rest",
      "mysql",
    ],
    projectIds: [],
  },

  {
    id: "flask",
    name: "Flask",
    galaxy: "backend",
    headline: "Lightweight and flexible.",
    description:
      "I use Flask to create Python-based web applications and connect backend functionality with databases.",
    capabilities: [
      "Web applications",
      "API development",
      "Database integration",
    ],
    related: [
      "python",
      "rest",
      "mysql",
      "postgresql",
    ],
    projectIds: [],
  },

  {
    id: "php",
    name: "PHP",
    galaxy: "backend",
    headline: "Practical solutions, different tools.",
    description:
      "I've used PHP with MySQL to build functional, database-driven applications, including a veterinary clinic project.",
    capabilities: [
      "Server-side logic",
      "Forms & validation",
      "Database applications",
    ],
    related: [
      "mysql",
      "rest",
    ],
    projectIds: [],
  },

  {
    id: "rest",
    name: "REST APIs",
    galaxy: "backend",
    headline: "Making systems communicate.",
    description:
      "I build and integrate APIs that connect interfaces, backend services, and application data.",
    capabilities: [
      "API integration",
      "HTTP methods",
      "JSON data",
    ],
    related: [
      "nodejs",
      "express",
      "python",
      "flask",
    ],
    projectIds: [],
  },

  // ==================================================
  // DATA & DEPLOYMENT
  // ==================================================

  {
    id: "mysql",
    name: "MySQL",
    galaxy: "data",
    headline: "Structure behind the scenes.",
    description:
      "A relational database I've used to organize application data and support database-driven functionality.",
    capabilities: [
      "Relational databases",
      "SQL queries",
      "Data modeling",
    ],
    related: [
      "php",
      "flask",
      "postgresql",
    ],
    projectIds: [],
  },

  {
    id: "postgresql",
    name: "PostgreSQL",
    galaxy: "data",
    headline: "Reliable relational data.",
    description:
      "Experience working with PostgreSQL and relational database concepts for structured application data.",
    capabilities: [
      "SQL",
      "Relational modeling",
      "Queries",
    ],
    related: [
      "mysql",
      "flask",
      "mongodb",
    ],
    projectIds: [],
  },

  {
    id: "mongodb",
    name: "MongoDB",
    galaxy: "data",
    headline: "Flexible data structures.",
    description:
      "Experience working with document-based databases and flexible data models.",
    capabilities: [
      "Document databases",
      "JSON-like data",
      "CRUD operations",
    ],
    related: [
      "nodejs",
      "express",
      "postgresql",
    ],
    projectIds: [],
  },

  {
    id: "firebase",
    name: "Firebase",
    galaxy: "data",
    headline: "Building without unnecessary overhead.",
    description:
      "I use Firebase services to support application functionality without building every backend component from scratch.",
    capabilities: [
      "Backend services",
      "Authentication",
      "Application data",
    ],
    related: [
      "react",
      "nextjs",
      "vercel",
    ],
    projectIds: [],
  },

  {
    id: "vercel",
    name: "Vercel",
    galaxy: "data",
    headline: "Getting projects out into the world.",
    description:
      "I use Vercel to deploy and manage modern web projects, especially applications built with Next.js.",
    capabilities: [
      "Deployment",
      "Hosting",
      "Production workflows",
    ],
    related: [
      "nextjs",
      "react",
      "typescript",
    ],
    projectIds: ["ionian-digital"],
  },

  // ==================================================
  // DESIGN & CREATIVE
  // ==================================================

  {
    id: "figma",
    name: "Figma",
    galaxy: "design",
    headline: "Where ideas take shape.",
    description:
      "I use Figma to explore layouts, refine visual direction, and translate ideas into interfaces.",
    capabilities: [
      "Interface design",
      "Visual planning",
      "Prototyping",
    ],
    related: [
      "uiux",
      "tailwind",
      "react",
    ],
    projectIds: [],
  },

  {
    id: "uiux",
    name: "UI/UX Design",
    galaxy: "design",
    headline: "Beautiful should also be useful.",
    description:
      "I care about how people actually experience a website, from navigation and readability to the small interactions that make it feel intuitive.",
    capabilities: [
      "User-centered design",
      "Responsive layouts",
      "Accessibility",
    ],
    related: [
      "figma",
      "tailwind",
      "react",
    ],
    projectIds: [],
  },

  {
    id: "ai-images",
    name: "AI Image Generation",
    galaxy: "design",
    headline: "Creative tools, practical results.",
    description:
      "I use AI image generation to create custom visual assets for websites, menus, and other design projects.",
    capabilities: [
      "Visual concepts",
      "Custom assets",
      "Creative direction",
    ],
    related: [
      "figma",
      "uiux",
    ],
    projectIds: [],
  },

  {
    id: "i18n",
    name: "Internationalization",
    galaxy: "design",
    headline: "Designing beyond one language.",
    description:
      "I build multilingual websites with language switching and layouts designed for audiences across different markets.",
    capabilities: [
      "Multilingual interfaces",
      "Localization",
      "Language switching",
    ],
    related: [
      "nextjs",
      "react",
      "uiux",
    ],
    projectIds: ["ionian-digital"],
  },
];