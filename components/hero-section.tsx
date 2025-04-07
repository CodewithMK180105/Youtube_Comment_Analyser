"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles"; // Adjust path as needed
import { useTheme } from "next-themes"; // Add this if using next-themes
import { TabsDemo } from "./hero-feature";

export function HeroSection() {
  const { theme } = useTheme(); // Hook to detect current theme
  const particleColor = theme === "dark" ? "#FFFFFF" : "#000000"; // White in dark mode, black in light mode

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full bg-gray-100 dark:bg-black">
        <SparklesCore
          id="tsparticleshero"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor={particleColor} // Dynamically set based on theme
        />
      </div>
      {/* Main Content */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-foreground dark:text-white drop-shadow-md">
              YouTube Comment Analyzer
            </h1>
            <p className="max-w-[600px] text-muted-foreground dark:text-white/90 md:text-xl drop-shadow-sm">
              Understand Audience Feedback in One Click!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/dashboard">
                Analyze Comments Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {/* Image */}
          <div className="flex justify-center w-full max-w-md mx-auto md:mx-0">
            {/* <div className="relative rounded-lg overflow-hidden shadow-lg border border-muted">
              <Image
                src="https://f.hellowork.com/blogdumoderateur/2021/10/analyse-rs-1200x655.jpeg"
                alt="analysing"
                width={600}
                height={400}
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 dark:from-black/40 to-transparent pointer-events-none"></div>
            </div> */}
            <TabsDemo />
          </div>
        </div>
      </div>
    </section>
  );
}