"use client"

import { useEffect, useRef, useState } from "react"

const experiences = [
  {
    role: "Product Owner / Product Lead",
    company: "eLitmus Evaluation Pvt. Ltd.",
    period: "Oct 2024 – Present",
    description:
      "Leading cross-functional teams to build and maintain assessment platforms, ensuring quality, performance, and timely delivery. Driving system upgrades, vulnerability management, and mentoring developers to maintain high engineering standards.",
    highlights: [
      "Leadership",
      "Product Management",
      "Team Mentorship",
      "Project Delivery",
      "System Architecture",
      "Performance Monitoring",
      "Vulnerability Management",
      "Stakeholder Communication"
    ],
  },
  {
    role: "Full Stack Developer",
    company: "eLitmus Evaluation Pvt. Ltd.",
    period: "Sep 2023 – Present",
    description:
      "Architected and implemented scalable backend systems, multi-tenant infrastructure, and CI/CD workflows. Improved performance, developer velocity, and enabled revenue growth through innovative system design and automation.",
    highlights: [
      "Full Stack Development",
      "Ruby on Rails",
      "React",
      "MySQL",
      "PostgreSQL",
      "DevOps",
      "CI/CD",
      "System Design",
      "Performance Optimization",
      "Active Storage",
      "ESBuild",
      "AWS"
    ]
  },
  {
    role: "Full Stack Developer Intern",
    company: "eLitmus Evaluation Pvt. Ltd.",
    period: "Mar 2023 – Sep 2023",
    description:
      "Contributed to multiple Rails-based applications, focusing on performance optimization and feature development. Improved user onboarding and query efficiency through database and API enhancements.",
    highlights: [
      "Ruby on Rails",
      "JavaScript",
      "API Development",
      "Database Optimization",
      "Docker",
      "Kubernetes",
      "Web Performance",
      "Agile Development"
    ]
  }
]

export default function Experience() {
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
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Experience</h2>

        <div ref={ref} className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={exp.company}
              className={`transition-all duration-700 delay-${idx * 100} ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="border-l-2 border-accent pl-6 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
                <p className="text-accent font-semibold mb-3">{exp.company}</p>
                <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((highlight) => (
                    <span key={highlight} className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
