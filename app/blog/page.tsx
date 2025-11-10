"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowLeft, Calendar, Clock, Search } from "lucide-react"

const allBlogs = [
  {
    id: 1,
    title: "Optimizing Rails Applications: Query Performance Deep Dive",
    excerpt:
      "Learn advanced techniques for optimizing N+1 queries, implementing smart caching strategies, and reducing database load. We'll explore real-world examples from production systems.",
    date: "2024-12-15",
    readTime: "8 min read",
    category: "Performance",
    slug: "optimizing-rails-queries",
    content:
      "In this comprehensive guide, we explore the most effective strategies for optimizing Rails applications at scale...",
  },
  {
    id: 2,
    title: "Building Scalable CI/CD Pipelines with GitHub Actions",
    excerpt:
      "A comprehensive guide to setting up robust CI/CD pipelines that scale with your infrastructure. From automated testing to blue-green deployments, we cover it all.",
    date: "2024-12-10",
    readTime: "12 min read",
    category: "DevOps",
    slug: "github-actions-pipelines",
    content:
      "GitHub Actions provides a powerful platform for automating your deployment workflows. In this article, we break down...",
  },
  {
    id: 3,
    title: "Microservices Architecture: When and Why to Migrate",
    excerpt:
      "Explore the decision-making process behind microservices migration. We'll discuss trade-offs, implementation patterns, and lessons learned from real deployments.",
    date: "2024-12-05",
    readTime: "10 min read",
    category: "Architecture",
    slug: "microservices-architecture",
    content:
      "Microservices architecture is not a silver bullet, but when implemented correctly, it can provide significant benefits...",
  },
  {
    id: 4,
    title: "Mastering PostgreSQL for High-Traffic Rails Apps",
    excerpt:
      "Deep dive into PostgreSQL optimization techniques, indexing strategies, and query planning for handling millions of transactions daily.",
    date: "2024-11-28",
    readTime: "14 min read",
    category: "Database",
    slug: "postgresql-optimization",
    content: "PostgreSQL is a powerful database engine that can handle massive workloads when properly configured...",
  },
  {
    id: 5,
    title: "Container Security Best Practices for Production",
    excerpt:
      "Comprehensive guide on securing containerized applications in production environments. Learn about image scanning, runtime security, and compliance.",
    date: "2024-11-20",
    readTime: "11 min read",
    category: "Security",
    slug: "container-security",
    content:
      "Container security is a critical aspect of modern infrastructure. This article covers best practices and common pitfalls...",
  },
  {
    id: 6,
    title: "Real-time Data Processing with Rails and Redis",
    excerpt:
      "Learn how to implement real-time data processing, WebSocket integration, and pub/sub patterns using Rails and Redis.",
    date: "2024-11-15",
    readTime: "9 min read",
    category: "Architecture",
    slug: "realtime-rails-redis",
    content:
      "Real-time features have become essential in modern web applications. This guide shows you how to implement them effectively...",
  },
]

export default function BlogPage() {
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBlogs, setFilteredBlogs] = useState(allBlogs)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    let filtered = allBlogs

    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((blog) => blog.category === selectedCategory)
    }

    setFilteredBlogs(filtered)
  }, [searchQuery, selectedCategory])

  const categories = [...new Set(allBlogs.map((blog) => blog.category))]

  return (
    <main className="min-h-screen bg-background">
      <Navigation scrolled={scrolled} />

      {/* Header */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Link
            href="/#blogs"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <h1 className="text-5xl font-bold mb-4 text-balance">Articles & Insights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Exploring Rails development, DevOps practices, and modern infrastructure patterns
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="sticky top-16 bg-background/80 backdrop-blur-md border-b border-border z-40 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-accent text-background"
                  : "bg-card border border-border text-muted-foreground hover:border-accent"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-background"
                    : "bg-card border border-border text-muted-foreground hover:border-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredBlogs.length > 0 ? (
            <div ref={containerRef} className="grid md:grid-cols-2 gap-6 animate-in fade-in duration-500">
              {filteredBlogs.map((blog, idx) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <div
                    className={`bg-card border border-border rounded-lg p-6 h-full hover:border-accent hover:glow-accent transition-all group cursor-pointer hover:shadow-lg hover:shadow-accent/20 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-${idx * 50}`}
                  >
                    <div className="mb-3 inline-block">
                      <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full code-text font-semibold">
                        {blog.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{blog.excerpt}</p>

                    <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(blog.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {blog.readTime}
                      </div>
                    </div>

                    <div className="text-accent font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Read More →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found. Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
