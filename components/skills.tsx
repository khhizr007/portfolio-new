"use client"

import { useEffect, useRef, useState } from "react"

const skillCategories = [
  {
    title: "Backend",
    skills: ["Ruby", "Rails", "RSpec", "PostgreSQL", "Redis", "Sidekiq"],
    color: "from-primary to-primary/50",
  },
  {
    title: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "Nginx", "GitHub Actions", "CI/CD"],
    color: "from-accent to-accent/50",
  },
  {
    title: "Tools & Workflow",
    skills: ["Linux", "Shell Scripting", "Terraform", "Git", "VSCode", "Postman"],
    color: "from-secondary to-secondary/50",
  },
]

export default function Skills() {
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
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Skills & Expertise</h2>

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className={`transition-all duration-700 delay-${idx * 100} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group">
                <h3 className="text-xl font-bold mb-6 text-primary group-hover:text-accent transition-colors">
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill}
                      </span>
                    </div>
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
