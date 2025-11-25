"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [textIdx, setTextIdx] = useState(0)
  const fullText = "rails new khhizr_portfolio"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        setTextIdx(index)
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30 animate-grid" />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50 animate-float" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-50 animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-10 animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Terminal Code Block */}
        <div className="mb-8 inline-block bg-card border border-border rounded-lg p-4 code-text text-sm animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="text-muted-foreground">$ </span>
          <span className="text-accent">{displayText}</span>
          <span className="animate-pulse">_</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Saiyyed Khhizr Aalam
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-muted-foreground mb-8 text-balance animate-in fade-in duration-700 delay-200">
          FullStack Engineer
        </p>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-balance animate-in fade-in duration-700 delay-300">
          I build scalable web applications and automate infrastructure that powers them. Specializing in backend
          craftsmanship, performance optimization, and cloud infrastructure.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-in fade-in duration-700 delay-400">
          <a
            href="https://github.com/khhizr007"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all glow-primary hover:scale-105 duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-all hover:shadow-lg hover:shadow-accent/30 hover:scale-105 duration-300"
          >
            Download Resume
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <ChevronDown className="mx-auto text-accent" size={32} />
        </div>
      </div>
    </section>
  )
}
