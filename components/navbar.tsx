// "use client"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { Youtube } from "lucide-react"

// export function Navbar() {
//   const pathname = usePathname()

//   const routes = [
//     {
//       href: "/",
//       label: "Home",
//       active: pathname === "/",
//     },
//     {
//       href: "/#features",
//       label: "Features",
//       active: pathname === "/#features",
//     },
//     {
//       href: "/#demo",
//       label: "Demo",
//       active: pathname === "/#demo",
//     },
//     {
//       href: "/dashboard",
//       label: "Dashboard",
//       active: pathname === "/dashboard" || pathname.startsWith("/dashboard/"),
//     },
//     {
//       href: "/#contact",
//       label: "Contact",
//       active: pathname === "/#contact",
//     },
//   ]

//   return (
//     <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
//         <div className="flex gap-6 md:gap-10">
//           <Link href="/" className="flex items-center space-x-2">
//             <Youtube className="h-6 w-6 text-red-500" />
//             <span className="inline-block font-bold">Comment Analyzer</span>
//           </Link>
//           <nav className="hidden md:flex gap-6">
//             {routes.map((route) => (
//               <Link
//                 key={route.href}
//                 href={route.href}
//                 className={cn(
//                   "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
//                   route.active ? "text-foreground" : "text-foreground/60",
//                 )}
//               >
//                 {route.label}
//               </Link>
//             ))}
//           </nav>
//         </div>
//         <div className="flex flex-1 items-center justify-end space-x-4">
//           <nav className="flex items-center space-x-2">
//             <ThemeToggle />
//             <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex mr-2">
//               <Link href="/login">Sign In</Link>
//             </Button>
//             <Button asChild size="sm" className="hidden sm:inline-flex">
//               <Link href="/register">Sign Up</Link>
//             </Button>
//             <Button asChild size="sm" className="hidden sm:inline-flex">
//               <Link href="/dashboard">Try Now</Link>
//             </Button>
//           </nav>
//         </div>
//       </div>
//     </header>
//   )
// }

"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Youtube, Menu, X } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const routes = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/#features", label: "Features", active: pathname === "/#features" },
    { href: "/#demo", label: "Demo", active: pathname === "/#demo" },
    { href: "/dashboard", label: "Dashboard", active: pathname.startsWith("/dashboard") },
    { href: "/#contact", label: "Contact", active: pathname === "/#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Youtube className="h-6 w-6 text-red-500" />
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
        </nav>

        {/* Right Actions (Theme Toggle, Sign In/Up, Dashboard) */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/register">Sign Up</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/dashboard">Try Now</Link>
          </Button>
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

