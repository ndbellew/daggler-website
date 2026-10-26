export const siteConfig = {
  name: "Nathan Bellew",
  role: "Senior Software Engineer",
  headline: "Backend • Distributed Systems • Cloud • Security",
  description:
    "Senior Software Engineer with 7+ years of experience designing and delivering production software across defense, cybersecurity, AI, and commercial technology environments.",
  summary:
    "Senior Software Engineer with 7+ years of experience designing and delivering production software across defense, cybersecurity, AI, and commercial technology environments. Strong background in Python, backend engineering, distributed systems, cloud infrastructure, containerization, and secure communications. Experienced owning systems from architecture and implementation through CI/CD, deployment, production troubleshooting, and long-term support. Proven technical leader with experience mentoring engineers, defining engineering standards, and translating complex product requirements into reliable production systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  email: "ndbellew@gmail.com",
  location: "Colorado Springs, Colorado",
  social: {
    linkedin: "https://www.linkedin.com/in/nathanbellew",
  },
  specialties: [
    {
      name: "Backend & distributed systems",
      description: "Backend services, APIs, databases, edge devices, and distributed production systems.",
      code: "01",
    },
    {
      name: "Cloud & DevOps",
      description: "Cloud infrastructure, containerization, CI/CD, automated deployment, and long-term production support.",
      code: "02",
    },
    {
      name: "Security engineering",
      description: "Cybersecurity, secure communications, TLS/JWT authentication, key management, and security automation.",
      code: "03",
    },
    {
      name: "Technical leadership",
      description: "Engineering standards, cross-functional leadership, mentoring, technical ownership, and execution priorities.",
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
