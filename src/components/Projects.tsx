"use client";

import { useState } from "react";

type ProjectTag = "All" | "Web" | "Mobile";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: ProjectTag[];
  url?: string;
  gitUrl?: string;
}

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Barbershop Landing",
    description:
      "A stylish dark-themed landing page for a barbershop with smooth animations, service showcase, and booking section.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    category: ["All", "Web"],
    url: "https://barbershop-six-pi.vercel.app",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "IRONPULSE Gym",
    description:
      "A bold, energetic landing page for a fitness gym featuring membership plans, trainer profiles, and class schedules.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    category: ["All", "Web"],
    url: "https://gym-six-roan.vercel.app",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "AI Resume Builder",
    description:
      "An AI-powered resume builder that helps create professional resumes with smart suggestions and templates.",
    tags: ["React", "Node.js", "AI"],
    category: ["All", "Web"],
    url: "https://ai-builder-app-kappa.vercel.app/",
    gitUrl: "https://github.com/ArtyomZayarny/ai-builder-app",
    image: "/images/projects/ai-resume-builder.png",
  },
  {
    id: 4,
    title: "Dental Care",
    description:
      "A modern dental clinic website with appointment booking, service listings, and patient portal.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    category: ["All", "Web"],
    url: "https://dentalscaner-fe.vercel.app/",
    gitUrl: "https://github.com/ArtyomZayarny/dentalscaner",
    image: "/images/projects/dental-care.png",
  },
  {
    id: 5,
    title: "Neuro Focus",
    description:
      "A neuroscience-focused productivity app helping users improve concentration and track cognitive performance.",
    tags: ["Next.js", "TypeScript", "API"],
    category: ["All", "Web"],
    url: "https://neuro-focus-murex.vercel.app/",
    gitUrl: "https://github.com/ArtyomZayarny/neuro-focus",
    image: "/images/projects/neuro-focus.png",
  },
  {
    id: 6,
    title: "Tickets Booking System",
    description:
      "A full-featured ticket booking platform with seat selection, payment processing, and booking management.",
    tags: ["React", "Node.js", "MongoDB"],
    category: ["All", "Web"],
    url: "https://booking-ticks-fe.vercel.app/",
    gitUrl: "https://github.com/ArtyomZayarny/booking-ticks/",
    image: "/images/projects/tickets-booking.png",
  },
  {
    id: 7,
    title: "Trello Clone",
    description:
      "A Kanban-style task management app with drag-and-drop boards, lists, and cards for team collaboration.",
    tags: ["React", "TypeScript", "DnD"],
    category: ["All", "Web"],
    url: "https://trello-clone-tau-sage.vercel.app/",
    gitUrl: "https://github.com/ArtyomZayarny/TaskManager",
    image: "/images/projects/trello-clone.png",
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<ProjectTag>("All");
  const projects = fallbackProjects;

  const tabs: ProjectTag[] = ["All", "Web", "Mobile"];

  const filtered = projects.filter((p) => p.category.includes(activeTab));

  return (
    <section className="px-6 py-10 md:py-14">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>

        <div className="mt-6 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-accent text-white"
                  : "bg-card border border-border text-gray hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray line-clamp-2">
                    {project.description}
                  </p>
                  {project.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-background px-3 py-1 text-xs font-medium text-gray"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-4">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                      >
                        View Site
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                    )}
                    {project.gitUrl && (
                      <a
                        href={project.gitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray transition-colors hover:text-foreground"
                        aria-label={`${project.title} source code`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center text-gray">
            <p>No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
