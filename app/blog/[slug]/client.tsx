"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"

interface BlogData {
  id: number
  title: string
  date: string
  readTime: string
  category: string
  author: string
  excerpt: string
  content: string
}

export default function BlogDetailClient({ blog }: { blog: BlogData | null }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!blog) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation scrolled={scrolled} />
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article not found</h1>
            <Link href="/blog" className="text-accent hover:text-accent/80">
              Go back to all articles
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation scrolled={scrolled} />

      {/* Header */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6 animate-in fade-in slide-in-from-left-4 duration-500"
          >
            <ArrowLeft size={18} />
            Back to Articles
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground animate-in fade-in duration-500 delay-200">
            <div className="inline-block">
              <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full code-text font-semibold">
                {blog.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(blog.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {blog.readTime}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert max-w-none mb-12 animate-in fade-in duration-700 delay-300">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 py-8 border-t border-border">
            <span className="text-muted-foreground">Share this article:</span>
            <button className="p-2 bg-card border border-border rounded-lg hover:border-accent hover:glow-accent transition-all">
              <Share2 size={18} className="text-accent" />
            </button>
          </div>

          {/* Author */}
          <div className="bg-card/50 border border-border rounded-lg p-6 mt-12">
            <p className="text-sm text-muted-foreground mb-2">Written by</p>
            <p className="text-lg font-bold text-foreground">{blog.author}</p>
            <p className="text-muted-foreground mt-2">
              Rails developer and DevOps engineer building scalable web applications.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
