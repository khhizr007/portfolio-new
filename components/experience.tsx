"use client"

import { useEffect, useRef, useState } from "react"

const experiences = [
  {
    role: "Quality Analyst",
    company: "Amazon",
    period: "Jul 2024 – Present",
    description:
      "Ensuring adherence to quality and performance metrics in delivery systems. Implementing automated testing frameworks and performance monitoring.",
    highlights: ["Quality Assurance", "Performance Metrics", "System Reliability"],
  },
  {
    role: "Senior Rails Developer",
    company: "Tech Startup",
    period: "Jan 2023 – Jun 2024",
    description:
      "Led backend development for scalable APIs. Optimized database queries reducing response time by 60%. Implemented CI/CD pipelines.",
    highlights: ["API Development", "Performance Optimization", "DevOps"],
  },
  {
    role: "Full Stack Developer",
    company: "Digital Agency",
    period: "Jun 2021 – Dec 2022",
    description:
      "Built and maintained multiple Rails applications. Implemented Docker containerization and Kubernetes orchestration for production deployments.",
    highlights: ["Full Stack Development", "Docker", "Kubernetes"],
  },
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
