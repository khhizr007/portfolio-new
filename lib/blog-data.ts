export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: string
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "setting-up-raspberry-pi-homelab",
    title: "Setting Up a Homelab on Raspberry Pi: A Complete Guide",
    excerpt:
      "Learn how to build a complete homelab infrastructure on a Raspberry Pi, including Docker, networking, and monitoring setup. Perfect for anyone starting their homelab journey.",
    category: "Homelab",
    date: "2024-12-20",
    readTime: "12 min read",
    featured: true,
    content: `
# Setting Up a Homelab on Raspberry Pi

Setting up a homelab on a Raspberry Pi can be an incredibly rewarding experience for anyone interested in DevOps, system administration, or just wanting to understand how infrastructure works.

## Why Raspberry Pi?

Raspberry Pi offers several advantages for a homelab:
- **Low Power Consumption**: Uses minimal electricity, perfect for always-on services
- **Compact Size**: Takes up minimal space in your home
- **Community**: Massive community with endless tutorials and support
- **Cost-Effective**: Affordable hardware compared to traditional servers
- **Learning Opportunities**: Perfect for learning Linux, Docker, networking, and more

## Hardware Requirements

- Raspberry Pi 4 (8GB recommended)
- Power supply (USB-C)
- SD card (128GB recommended)
- Ethernet cable or WiFi
- Cooling solution (optional but recommended)

## Software Setup

Start with a fresh Ubuntu Server installation. Then install the essentials:

\`\`\`bash
sudo apt update
sudo apt upgrade -y
sudo apt install docker.io docker-compose -y
\`\`\`

## Running Services on Raspberry Pi

My entire portfolio website runs on Docker on this Raspberry Pi. The beauty is that you can run multiple services simultaneously with proper resource management.

## Performance Considerations

While a Raspberry Pi is powerful, consider these optimizations:
- Use optimized Node.js images
- Implement proper caching strategies
- Monitor CPU and memory usage continuously
- Use load balancing if needed

## Conclusion

Running a homelab on Raspberry Pi is not only possible but practical for personal projects and learning.
    `,
  },
  {
    id: 2,
    slug: "docker-deployment-best-practices",
    title: "Docker Deployment Best Practices for Homelab",
    excerpt:
      "Explore containerization strategies and best practices for deploying applications in a resource-constrained homelab environment.",
    category: "Homelab",
    date: "2024-12-18",
    readTime: "10 min read",
    featured: true,
    content: `
# Docker Deployment Best Practices for Homelab

Docker has revolutionized how we deploy applications. In a homelab environment with limited resources, understanding best practices becomes even more critical.

## Container Optimization

### Image Size Matters

Use minimal base images like Alpine Linux to reduce memory footprint:

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

## Resource Limits

Always set resource limits for containers:

\`\`\`yaml
services:
  app:
    image: my-app:latest
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 256M
\`\`\`

## Monitoring and Logging

Implement proper monitoring to catch issues early.

## Conclusion

Proper containerization ensures your homelab runs smoothly with limited resources.
    `,
  },
  {
    id: 3,
    slug: "optimizing-rails-queries",
    title: "Optimizing Rails Applications: Query Performance Deep Dive",
    excerpt:
      "Learn advanced techniques for optimizing N+1 queries, implementing smart caching strategies, and reducing database load. We'll explore real-world examples from production systems.",
    category: "Performance",
    date: "2024-12-15",
    readTime: "8 min read",
    featured: true,
    content: `
# Optimizing Rails Applications

Rails is a powerful framework, but performance optimization is crucial at scale.

## N+1 Query Problems

The classic N+1 problem occurs when you load parent records and then query for each child in a loop.

\`\`\`ruby
# Bad
users = User.all
users.each { |user| puts user.posts.count }

# Good
users = User.includes(:posts).all
users.each { |user| puts user.posts.count }
\`\`\`

## Caching Strategies

Implement multi-level caching:
- Fragment caching for views
- Query result caching
- HTTP caching headers

## Conclusion

Small optimizations add up to significant performance improvements.
    `,
  },
  {
    id: 4,
    slug: "github-actions-pipelines",
    title: "Building Scalable CI/CD Pipelines with GitHub Actions",
    excerpt:
      "A comprehensive guide to setting up robust CI/CD pipelines that scale with your infrastructure. From automated testing to blue-green deployments, we cover it all.",
    category: "DevOps",
    date: "2024-12-10",
    readTime: "12 min read",
    featured: false,
    content: `
# Building Scalable CI/CD Pipelines with GitHub Actions

GitHub Actions provides powerful automation capabilities for your projects.

## Pipeline Basics

Start with automated testing and linting on every push.

## Deployment Strategies

Implement safe deployment patterns like blue-green deployments and canary releases.

## Conclusion

Robust CI/CD pipelines ensure reliability and safety in production.
    `,
  },
  {
    id: 5,
    slug: "microservices-architecture",
    title: "Microservices Architecture: When and Why to Migrate",
    excerpt:
      "Explore the decision-making process behind microservices migration. We'll discuss trade-offs, implementation patterns, and lessons learned from real deployments.",
    category: "Architecture",
    date: "2024-12-05",
    readTime: "10 min read",
    featured: false,
    content: `
# Microservices Architecture

Understanding when to transition to microservices is critical.

## Monolith vs Microservices

Each approach has benefits and trade-offs. Consider your team size, complexity, and operational maturity.

## Implementation Patterns

Use API gateways, service discovery, and proper monitoring.

## Conclusion

Microservices are powerful but come with operational complexity.
    `,
  },
]
