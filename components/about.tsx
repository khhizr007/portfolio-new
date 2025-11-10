"use client"

import { useEffect, useRef, useState } from "react"

export default function About() {
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar */}
          <div
            ref={ref}
            className={`flex justify-center transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="w-64 h-64 rounded-lg bg-gradient-to-br from-primary to-accent p-1 glow-primary">
              <div className="w-full h-full bg-card rounded-lg flex items-center justify-center">
                <div className="text-6xl font-bold text-primary">SK</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate full-stack developer with deep expertise in Ruby on Rails and DevOps infrastructure. My
                journey combines backend craftsmanship with infrastructure mastery, enabling me to build systems that
                are both elegant and resilient.
              </p>
              <p>
                Currently working as a Quality Analyst at Amazon, where I ensure adherence to quality and performance
                metrics in delivery systems. I bring a meticulous approach to every project, optimizing for performance,
                scalability, and maintainability.
              </p>
              <p>
                I'm passionate about clean code, open-source contribution, and solving complex problems through
                thoughtful engineering. When I'm not coding, you'll find me exploring new technologies, contributing to
                the community, or optimizing infrastructure pipelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
