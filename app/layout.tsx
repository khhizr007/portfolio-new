import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Saiyyed Khhizr Aalam - Rails Developer & DevOps Engineer",
  description:
    "Full-stack developer specializing in Ruby on Rails and DevOps infrastructure. Building scalable web applications and automating infrastructure.",
  generator: "v0.app",
  openGraph: {
    title: "Saiyyed Khhizr Aalam - Rails Developer & DevOps Engineer",
    description: "Full-stack developer specializing in Ruby on Rails and DevOps infrastructure.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
