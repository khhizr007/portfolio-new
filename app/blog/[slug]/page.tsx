import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { blogPosts } from "@/lib/blog-data"
import { marked } from 'marked';
import BlogDetailClient from './client';

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

const getBlogData = (slug: string) => {
  // Find the blog post in the imported data
  const blogPost = blogPosts.find(post => post.slug === slug)

  if (!blogPost) return null

  // Convert markdown to HTML for display using marked
  const htmlContent = marked.parse(blogPost.content) as string;

  return {
    id: blogPost.id,
    title: blogPost.title,
    date: blogPost.date,
    readTime: blogPost.readTime,
    category: blogPost.category,
    author: "Saiyyed Khhizr Aalam",
    excerpt: blogPost.excerpt,
    content: htmlContent
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = getBlogData(slug)
  
  if (!blog) {
    return {
      title: "Article not found",
    }
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
    },
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = getBlogData(slug)

  if (!blog) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation scrolled={false} />
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

  return <BlogDetailClient blog={blog} />
}
