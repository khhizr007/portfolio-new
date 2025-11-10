"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Built a scalable e-commerce platform handling 10k+ concurrent users with optimized database queries and caching strategies.",
    stack: ["Ruby on Rails", "PostgreSQL", "Redis", "Sidekiq"],
    challenge: "Reduced page load time by 65% through query optimization and caching",
    link: "#",
    github: "#",
  },
  {
    title: "CI/CD Pipeline Automation",
    description:
      "Designed and implemented a comprehensive CI/CD pipeline reducing deployment time from 45 minutes to 8 minutes.",
    stack: ["GitHub Actions", "Docker", "AWS", "Terraform"],
    challenge: "Automated infrastructure provisioning and deployment workflows",
    link: "#",
    github: "#",
  },
  {
    title: "Microservices Architecture",
    description:
      "Architected and deployed a microservices infrastructure using Kubernetes, improving system scalability and resilience.",
    stack: ["Kubernetes", "Docker", "AWS ECS", "RabbitMQ"],
    challenge: "Achieved 99.9% uptime with automated failover and load balancing",
    link: "#",
    github: "#",
  },
]

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Featured Projects</h2>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`transition-all duration-700 delay-${idx * 100} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-background border border-border rounded-lg p-6 h-full hover:border-accent hover:glow-accent transition-all group">
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="mb-4">
                  <p className="text-xs text-accent font-semibold mb-2">Challenge Solved:</p>
                  <p className="text-sm text-muted-foreground">{project.challenge}</p>
                </div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded code-text">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.link}
                    className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    <ExternalLink size={16} />
                    View
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
