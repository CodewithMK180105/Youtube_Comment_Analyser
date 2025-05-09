"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import { TbBrandYoutube } from "react-icons/tb";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs'
import { useToast } from "@/hooks/use-toast"


export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isSignedIn } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toast } = useToast()

  const routes = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/#features", label: "Features", active: pathname === "/#features" },
    { href: "/#demo", label: "Demo", active: pathname === "/#demo" },
    { href: "/#contact", label: "Contact", active: pathname === "/#contact" },
  ]

  const handleDashboardClick = () => {
    if (isSignedIn) {
      router.push("/dashboard")
    } else {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to access the Dashboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <TbBrandYoutube className="h-6 w-6 text-red-500" />
          <span className="inline-block font-bold">Comment Analyzer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
                route.active ? "text-foreground" : "text-foreground/60"
              )}
            >
              {route.label}
            </Link>
          ))}
          <button
            onClick={handleDashboardClick}
            className="text-sm font-medium transition-colors text-foreground/60 hover:text-foreground/80"
          >
            Dashboard
          </button>
        </nav>

        {/* Right Actions (Theme Toggle, Sign In/Up, Dashboard) */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Button (ALWAYS VISIBLE ON SMALL SCREENS) */}
        <div className="flex items-center gap-2">
          {
            mobileMenuOpen &&
            <ThemeToggle />
          }
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b shadow-md md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-sm font-medium transition-colors hover:text-foreground/80"
                onClick={() => setMobileMenuOpen(false)} // Close menu when clicking a link
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

