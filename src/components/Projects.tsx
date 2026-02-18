const projects = [
  {
    title: "Barbershop Landing",
    description:
      "A stylish dark-themed landing page for a barbershop with smooth animations, service showcase, and booking section.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    url: "https://barbershop-six-pi.vercel.app",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop",
  },
  {
    title: "IRONPULSE Gym",
    description:
      "A bold, energetic landing page for a fitness gym featuring membership plans, trainer profiles, and class schedules.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    url: "https://gym-six-roan.vercel.app",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
  },
];

export default function Projects() {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
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
                <p className="mt-2 text-sm leading-relaxed text-gray">
                  {project.description}
                </p>
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
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                >
                  View Site
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
