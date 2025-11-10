"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { blogPosts } from "@/lib/blog-data"

export default function Blogs() {
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

  const featuredBlogs = blogPosts.filter((post) => post.featured).slice(0, 3)

  return (
    <section id="blogs" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4 text-center">Latest Articles</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Insights on Rails development, DevOps practices, and modern infrastructure patterns
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredBlogs.map((blog, idx) => (
            <div
              key={blog.id}
              className={`transition-all duration-700 delay-${idx * 100} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Link href={`/blog/${blog.slug}`}>
                <div className="bg-background border border-border rounded-lg p-6 h-full hover:border-accent hover:glow-accent transition-all group cursor-pointer hover:shadow-lg hover:shadow-accent/20">
                  <div className="mb-3 inline-block">
                    <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full code-text font-semibold">
                      {blog.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">{blog.excerpt}</p>

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

                  <div className="flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
                    <span className="text-sm font-semibold">Read Article</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-all hover:gap-3 group"
          >
            View All Articles
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
