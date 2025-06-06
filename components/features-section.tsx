"use client";
import { ThumbsUp, ThumbsDown, HelpCircle, MessageSquare, AlertTriangle, HandIcon as HandsPraying } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useObserver from "@/hooks/use-observer";
import { cn } from "@/lib/utils";

export function FeaturesSection() {
  const features = [
    {
      icon: ThumbsUp,
      title: "Positive Comments",
      description: "Identify praise, compliments, and positive feedback from your audience.",
      color: "text-green-500",
    },
    {
      icon: ThumbsDown,
      title: "Negative Comments",
      description: "Detect criticism, complaints, and areas for improvement.",
      color: "text-red-500",
    },
    {
      icon: HelpCircle,
      title: "Question-Based Comments",
      description: "Find questions from your audience that need answers.",
      color: "text-blue-500",
    },
    {
      icon: HandsPraying,
      title: "Request Comments",
      description: "Identify suggestions and requests for future content.",
      color: "text-purple-500",
    },
    {
      icon: MessageSquare,
      title: "Engagement Comments",
      description: "Recognize general engagement and conversation starters.",
      color: "text-yellow-500",
    },
    {
      icon: AlertTriangle,
      title: "Promotional/Spam Comments",
      description: "Filter out spam, self-promotion, and irrelevant content.",
      color: "text-orange-500",
    },
  ];

  const { Observer, isVisible } = useObserver();

  // Debug log to check isVisible state
  // console.log("isVisible:", isVisible);

  return (
    <section id="features" className="relative w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      {/* Make Observer visible temporarily for debugging */}
      <Observer className="absolute top-1/4 h-1 w-full" />
      <div className="container px-4 md:px-6 transition-all duration-500 ease-in-out">
        <div className="flex flex-col items-center justify-center space-y-4 text-center transition duration-1000">
          <div className={cn("space-y-2 transition duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          )}>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Powerful Comment Analysis
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Categorize and understand your YouTube comments with our advanced analysis tools.
            </p>
          </div>
          <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-10 transition duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          )}>
            {features.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col items-center text-center transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <div className={`rounded-full p-3 ${feature.color} bg-muted`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}