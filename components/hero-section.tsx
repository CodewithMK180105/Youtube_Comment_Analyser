import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              YouTube Comment Analyzer
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Understand Audience Feedback in One Click!
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg" className="animate-pulse">
              <Link href="/dashboard">
                Analyze Comments Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

