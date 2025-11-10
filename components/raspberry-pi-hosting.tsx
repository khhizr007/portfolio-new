"use client"

import { Server, Zap, Shield } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function RaspberryPiHosting() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="hosting"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-accent/20 border border-accent/50 rounded-full">
            <p className="text-sm font-semibold text-accent">Homelab Infrastructure</p>
          </div>
          <h2 className="text-4xl font-bold mb-4">Hosted On Raspberry Pi</h2>
          <p className="text-xl text-muted-foreground">
            This entire website is self-hosted on a Raspberry Pi in my home. Efficient, sustainable, and always
            learning.
          </p>
        </div>

        {/* Feature cards with staggered animations */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Server,
              title: "Self-Hosted",
              description: "Running on a Raspberry Pi in my home with full control over infrastructure and deployment.",
              delay: 0,
            },
            {
              icon: Zap,
              title: "Energy Efficient",
              description:
                "Low power consumption with minimal environmental impact while maintaining high performance.",
              delay: 1,
            },
            {
              icon: Shield,
              title: "Always Learning",
              description: "Continuous exploration of DevOps, containerization, and Linux optimization techniques.",
              delay: 2,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`group relative p-6 bg-card/50 border border-border rounded-lg hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 transform hover:-translate-y-1 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: mounted ? `${feature.delay * 100}ms` : "0ms",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <feature.icon className="w-12 h-12 mb-4 text-accent group-hover:text-primary transition-colors group-hover:scale-110 transform duration-300 relative z-10" />
              <h3 className="text-lg font-bold mb-2 relative z-10">{feature.title}</h3>
              <p className="text-sm text-muted-foreground relative z-10">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Interested in how I set this up? Check out my detailed blog posts about homelab infrastructure.
          </p>
          <Link
            href="/blog?category=Homelab"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:scale-105 transform"
          >
            Read Blog Posts
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
