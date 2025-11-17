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
  {
    id: 6,
    slug: "postgresql-optimization",
    title: "Mastering PostgreSQL for High-Traffic Rails Apps",
    excerpt:
      "Deep dive into PostgreSQL optimization techniques, indexing strategies, and query planning for handling millions of transactions daily.",
    category: "Database",
    date: "2024-11-28",
    readTime: "14 min read",
    featured: true,
    content: `
# Mastering PostgreSQL for High-Traffic Rails Apps

In today's world of high-traffic applications, database optimization is critical for performance. PostgreSQL, being a powerful and extensible open-source database, offers numerous features for handling massive workloads.

## Query Optimization

PostgreSQL's query planner is sophisticated and can handle complex queries efficiently, but it needs proper guidance through indexing and well-structured queries.

### Using EXPLAIN and ANALYZE

Always analyze your queries using EXPLAIN and ANALYZE to understand how PostgreSQL executes them:

\`\`\`sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT users.id, users.name, posts.title
FROM users
JOIN posts ON users.id = posts.user_id
WHERE users.created_at > '2024-01-01';
\`\`\`

This will show you the actual execution plan and help you identify bottlenecks.

### Indexing Strategies

Effective indexing is crucial for performance. Consider these strategies:

- **Single-column indexes** for frequently queried columns
- **Composite indexes** for multi-column conditions
- **Partial indexes** to reduce index size when filtering by common conditions
- **Expression indexes** for computed values that are frequently queried

\`\`\`sql
-- Example of a partial index
CREATE INDEX idx_active_users_created_at
ON users (created_at)
WHERE active = true;

-- Example of a composite index
CREATE INDEX idx_user_posts_created_at
ON posts (user_id, created_at);
\`\`\`

## Connection Management

For high-traffic Rails applications, connection management becomes critical:

- Use connection pooling (pgbouncer or PgHero)
- Configure appropriate timeout values
- Monitor connection usage patterns

## Partitioning

For very large tables, consider partitioning to improve query performance:

- Range partitioning for time-based data
- List partitioning for categorical data
- Hash partitioning for even distribution

## Monitoring and Maintenance

Regular maintenance tasks include:

- VACUUM and ANALYZE operations
- Monitoring bloat
- Checking for unused indexes

## Conclusion

With proper optimization techniques, PostgreSQL can handle very high traffic loads efficiently. The key is to monitor, analyze, and continuously optimize based on your application's specific patterns.
    `,
  },
  {
    id: 7,
    slug: "container-security",
    title: "Container Security Best Practices for Production",
    excerpt:
      "Comprehensive guide on securing containerized applications in production environments. Learn about image scanning, runtime security, and compliance.",
    category: "Security",
    date: "2024-11-20",
    readTime: "11 min read",
    featured: true,
    content: `
# Container Security Best Practices for Production

Containerization has revolutionized application deployment, but security remains a critical concern in production environments. A comprehensive security strategy covers the entire container lifecycle from build to runtime.

## Image Security

### Building Secure Images

Start with minimal base images like Alpine Linux or Distroless to reduce the attack surface:

\`\`\`dockerfile
# Use a minimal base image
FROM alpine:latest

# Create a non-root user
RUN addgroup -g 1001 -S appgroup && \\
    adduser -u 1001 -S appuser -G appgroup

# Copy application files
COPY --chown=appuser:appgroup . /app

# Switch to non-root user
USER appuser

WORKDIR /app
CMD ["./app"]
\`\`\`

### Image Scanning

Implement automated scanning for vulnerabilities:

- Use tools like Trivy, Clair, or Anchore
- Scan images during CI/CD pipeline
- Block deployment of images with critical vulnerabilities

## Runtime Security

### Kubernetes Security Contexts

Configure security contexts to limit container privileges:

\`\`\`yaml
apiVersion: v1
kind: Pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1001
    fsGroup: 2000
  containers:
  - name: app
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
\`\`\`

### Runtime Monitoring

Implement runtime security monitoring with tools like Falco or Sysdig to detect anomalous behavior in running containers.

## Network Security

- Use network policies to limit container-to-container communication
- Implement service mesh for advanced traffic control and encryption
- Encrypt inter-service communication with TLS

## Secret Management

Never hardcode secrets in images. Use:

- Kubernetes secrets or HashiCorp Vault
- Environment variable injection
- Secret stores with rotation capabilities

## Compliance and Auditing

- Enable comprehensive logging
- Implement audit trails
- Regular security assessments
- Compliance reporting

## Conclusion

Container security requires a defense-in-depth approach covering the build, deployment, and runtime phases. Regular security assessments and staying updated with new vulnerabilities are essential for maintaining a secure containerized infrastructure.
    `,
  },
  {
    id: 8,
    slug: "realtime-rails-redis",
    title: "Real-time Data Processing with Rails and Redis",
    excerpt:
      "Learn how to implement real-time data processing, WebSocket integration, and pub/sub patterns using Rails and Redis.",
    category: "Architecture",
    date: "2024-11-15",
    readTime: "9 min read",
    featured: true,
    content: `
# Real-time Data Processing with Rails and Redis

Modern web applications often require real-time functionality like live notifications, chat features, or live dashboards. Rails combined with Redis provides a robust solution for implementing these features.

## Understanding Real-time Architecture

Real-time functionality in web applications typically involves:

- Client-server communication via WebSockets
- Pub/sub messaging for broadcasting
- In-memory data storage for fast access

## Setting Up Redis

Redis serves as both a message broker and a data store for real-time features:

\`\`\`ruby
# Gemfile
gem 'redis'
gem 'actioncable'

# config/cable.yml
production:
  adapter: redis
  url: <%= ENV.fetch("REDIS_URL") { "redis://localhost:6379/1" } %>
\`\`\`

## Implementing ActionCable

ActionCable is Rails' built-in WebSocket framework:

\`\`\`ruby
# app/channels/application_cable/connection.rb
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      # Authenticate user using session or token
    end
  end
end

# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    Message.create!(
      room: params[:room],
      user: current_user,
      content: data['content']
    )

    ActionCable.server.broadcast(
      "chat_#{params[:room]}",
      message: data['content'],
      user: current_user.name
    )
  end
end
\`\`\`

## Redis Pub/Sub Patterns

Use Redis for more complex real-time architectures:

\`\`\`ruby
# Publisher
Redis.current.publish('notifications', {
  user_id: current_user.id,
  type: 'new_message',
  content: message.content
}.to_json)

# Subscriber (in a background job)
redis = Redis.new
redis.subscribe('notifications') do |on|
  on.message do |channel, message|
    data = JSON.parse(message)
    # Process the real-time notification
    ActionCable.server.broadcast(
      "notifications_#{data['user_id']}",
      data
    )
  end
end
\`\`\`

## Performance Considerations

- Optimize WebSocket connection management
- Use Redis clustering for high availability
- Implement proper connection limits
- Monitor memory usage for real-time data

## Scaling Strategies

- Horizontal scaling of ActionCable servers
- Redis clustering for pub/sub
- Connection load balancing
- CDN for static assets

## Conclusion

Combining Rails and Redis provides a powerful platform for real-time functionality. Proper architecture decisions and performance optimizations ensure your real-time features scale effectively.
    `,
  },
]
