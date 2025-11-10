"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Blogs from "@/components/blogs"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import RaspberryPiHosting from "@/components/raspberry-pi-hosting"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Navigation scrolled={scrolled} />
      <Hero />
      <About />
      <Skills />
      <Blogs />
      <Experience />
      <RaspberryPiHosting />
      <Contact />
      <Footer />
    </main>
  )
}
