import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/print-button";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "Résumé",
  description: `${siteConfig.name}'s professional experience, education, projects, and technical skills.`,
};

const experience = [
  {
    company: "Integrity Communications Solutions, Inc.",
    period: "Jun 2024 — Present",
    roles: [
      {
        title: "Head of Software and Customer Experience",
        location: "Colorado Springs, Colorado, United States",
        bullets: [
          "Lead products from research and prototyping through production deployment, field support, maintenance, and iterative improvement.",
          "Design software architecture and engineering standards for reliability, scalability, maintainability, security, automated testing, and CI/CD.",
          "Lead and mentor cross-functional engineering personnel while establishing technical ownership, development practices, and execution priorities.",
        ],
      },
      {
        title: "Principal Software Engineer & Senior AI Engineer",
        location: "Colorado Springs, Colorado, United States",
        bullets: [
          "Architected distributed production systems spanning backend services, edge devices, APIs, databases, cloud infrastructure, security, and automated deployment.",
          "Troubleshoot complex production failures across application software, Docker containers, Linux systems, networking, cloud infrastructure, and integrated hardware.",
          "Define software and AI technical strategy and align engineering architecture with product roadmaps and long-term business requirements.",
        ],
      },
    ],
  },
  {
    company: "Lockheed Martin",
    period: "Jan 2020 — May 2024",
    roles: [
      {
        title: "Software Engineer",
        location: "Colorado, United States",
        bullets: [
          "Maintained and enhanced satellite flight software and supporting simulation environments using Ada, C++, and Java.",
          "Served as Scrum Master within a SAFe Agile environment, coordinating team workloads, sprint execution, and release planning.",
          "Acted as Product Owner for software components, leading discussions around new features, defect resolution, prioritization, and release scope.",
        ],
      },
      {
        title: "Cyber Systems Security Engineer Associate",
        location: "Colorado Springs, Colorado Area",
        bullets: [
          "Automated portions of the security assessment and reporting process, reducing manual effort required to organize findings and prepare system security documentation.",
          "Designed and developed a Python/Flask application that consolidated cybersecurity scan results and generated reports formatted for use in eMASS documentation and compliance activities.",
          "Built a lightweight SIEM capability using PowerShell to collect, normalize, and analyze security-related system data for cybersecurity monitoring and assessment workflows.",
        ],
      },
    ],
  },
  {
    company: "Colorado Mesa University",
    period: "Feb 2019 — Jan 2020",
    roles: [
      {
        title: "Team Lead for Cyber Security Student Center",
        location: "Grand Junction, Colorado Area",
        bullets: [
          "Led a 3–5 person cybersecurity development team and coordinated technical project execution.",
          "Led development of an AI-based malicious web-page and URL classification system.",
        ],
      },
    ],
  },
] as const;

const projects = [
  {
    name: "BLDS",
    organization: "Integrity Communications Solutions",
    period: "Jun 2024 — Present",
    paragraphs: [
      "BLDS is an end-to-end radar-based monitoring platform I helped design, build, deploy, and maintain. The system combines mmWave radar hardware, Raspberry Pi edge controllers, Python-based processing, backend APIs, databases, containerized services, cloud infrastructure, and web interfaces to provide real-time occupancy, movement, and vital-sign monitoring without relying on wearable devices.",
      "My work has included Python and object-oriented software development, radar and sensor integration, REST APIs, PostgreSQL and Redis, Docker, Linux, networking, CI/CD, secure device communication, JWT/TLS authentication, key management, automated deployment, fleet management, and production troubleshooting. I have also contributed to the broader system architecture, including device enrollment, server assignment, heartbeats, software updates, and centralized management through supporting services such as AWS Guide and the Auto Setup Service.",
      "The project has progressed from early prototyping into a full production-oriented product, requiring development across embedded systems, backend services, infrastructure, security, deployment, testing, and long-term maintenance.",
    ],
  },
  {
    name: "Deep Learning Malicious URLs",
    period: "Jun 2019 — Present",
    paragraphs: [
      "Detecting and classifying malicious URLs using deep learning techniques. The system was trained to classify URLs as benign, defacement, malware, phishing, or spam using Fast.AI and Keras-TensorFlow.",
    ],
  },
] as const;

const skills = [
  "Agile",
  "Automated Testing",
  "AWS",
  "Backend Development",
  "Bash",
  "C++",
  "CI/CD",
  "Confluence",
  "Containerization",
  "Database Design",
  "DevOps",
  "Distributed Systems",
  "Docker",
  "Docker Compose",
  "Dockerfiles",
  "Flask",
  "Git",
  "GitLab",
  "GitLab CI/CD",
  "Jira",
  "Linux",
  "Networking",
  "PostgreSQL",
  "Pytest",
  "Python",
  "Raspberry Pi",
  "Redis",
  "REST APIs",
  "SAFe",
  "Scrum",
  "Software Architecture",
  "SQL",
  "TLS/JWT",
] as const;

export default function ResumePage() {
  return (
    <div className="shell py-12 sm:py-20">
      <div className="no-print mb-10 flex flex-col gap-4 rounded-xl border border-accent/30 bg-accent/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">Choose the web, PDF, download, or print version of this résumé.</p>
        <div className="flex flex-wrap gap-3">
          <a className="button-secondary" href="/resume.pdf" target="_blank" rel="noreferrer">View PDF</a>
          <a className="button-secondary" href="/resume.pdf" download="Nathan-Bellew-Resume.pdf">Download résumé</a>
          <PrintButton />
        </div>
      </div>

      <header className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Résumé</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">{siteConfig.name}</h1>
          <p className="mt-2 text-lg text-muted">{siteConfig.role}</p>
          <p className="mt-1 text-sm text-muted">{siteConfig.headline}</p>
        </div>
        <address className="not-italic text-sm leading-6 text-muted sm:text-right">
          <p>{siteConfig.location}</p>
          <a className="hover:text-accent" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <p><a className="hover:text-accent" href={siteConfig.social.linkedin}>LinkedIn</a></p>
          <p className="no-print"><Link className="hover:text-accent" href="/">Portfolio home</Link></p>
        </address>
      </header>

      <div className="space-y-12 py-10">
        <section>
          <h2 className="eyebrow">Profile</h2>
          <p className="mt-4 max-w-4xl leading-7 text-muted">{siteConfig.summary}</p>
        </section>

        <section>
          <h2 className="eyebrow">Work experience</h2>
          <div className="mt-6 space-y-10">
            {experience.map((employer) => (
              <article key={employer.company} className="break-inside-avoid">
                <div className="flex flex-col gap-1 border-b border-line pb-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold">{employer.company}</h3>
                  <p className="font-mono text-xs text-muted">{employer.period}</p>
                </div>
                <div className="mt-5 space-y-7">
                  {employer.roles.map((role) => (
                    <div key={role.title} className="break-inside-avoid">
                      <h4 className="font-semibold">{role.title}</h4>
                      <p className="mt-1 text-sm text-muted">{role.location}</p>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                        {role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="eyebrow">Projects</h2>
          <div className="mt-6 space-y-9">
            {projects.map((project) => (
              <article key={project.name} className="break-inside-avoid">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    {"organization" in project && <p className="text-sm text-muted">{project.organization}</p>}
                  </div>
                  <p className="font-mono text-xs text-muted">{project.period}</p>
                </div>
                <div className="mt-3 max-w-4xl space-y-3 text-sm leading-6 text-muted">
                  {project.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-12 border-t border-line pt-10 lg:grid-cols-2">
          <section>
            <h2 className="eyebrow">Education</h2>
            <div className="mt-5 space-y-6 text-sm leading-6 text-muted">
              <div className="break-inside-avoid">
                <h3 className="font-semibold text-ink">Master of Science in Computer Science</h3>
                <p>Colorado Technical University • Colorado Springs, Colorado • GPA: 3.6</p>
                <p>Jan 2021 — Expected Dec 2026</p>
              </div>
              <div className="break-inside-avoid">
                <h3 className="font-semibold text-ink">Bachelor&apos;s Degree — Computer Science major, Mathematics minor</h3>
                <p>Colorado Mesa University • GPA: 3.5</p>
                <p>Jan 2015 — Dec 2019</p>
              </div>
            </div>
          </section>
          <section className="break-inside-avoid">
            <h2 className="eyebrow">Certifications</h2>
            <p className="mt-5 text-sm leading-6 text-muted">Active Top Secret Security Clearance | SCI Eligible</p>
          </section>
        </div>

        <section>
          <h2 className="eyebrow">Skills</h2>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technical and professional skills">
            {skills.map((skill) => <li className="tag" key={skill}>{skill}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}
