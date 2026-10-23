export const siteConfig = {
  name: "Your Name",
  role: "Software & Systems Engineer",
  description:
    "A placeholder portfolio for engineering work across software, AI, cybersecurity, systems, and infrastructure.",
  url: "https://example.com",
  email: "you@example.com",
  location: "Your location",
  availability: "Replace with your availability",
  social: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  specialties: [
    {
      name: "Software engineering",
      description: "Reliable applications, maintainable architecture, and thoughtful developer experience.",
      code: "01",
    },
    {
      name: "Applied AI",
      description: "Practical AI systems designed around evaluation, safety, and measurable outcomes.",
      code: "02",
    },
    {
      name: "Cybersecurity",
      description: "Security-minded engineering spanning threat modeling, hardening, and resilient design.",
      code: "03",
    },
    {
      name: "Systems & infrastructure",
      description: "Observable platforms, automation, and infrastructure that remain operable under pressure.",
      code: "04",
    },
  ],
} as const;

export const navigation = [
  { href: "/projects/", label: "Projects" },
  { href: "/writing/", label: "Writing" },
  { href: "/resume/", label: "Resume" },
  { href: "/about/", label: "About" },
] as const;
