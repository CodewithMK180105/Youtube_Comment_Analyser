"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, BarChart, LineChart } from "@/components/ui/chart"
import { ThumbsUp, ThumbsDown, HelpCircle, HandIcon as HandsPraying, MessageSquare, AlertTriangle } from "lucide-react"

export function DemoSection() {
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ")

  // Sample data for the demo
  const commentData = {
    positive: 42,
    negative: 12,
    questions: 18,
    requests: 15,
    engagement: 35,
    spam: 8,
  }

  const chartData = [
    { name: "Positive", value: commentData.positive, color: "#22c55e" },
    { name: "Negative", value: commentData.negative, color: "#ef4444" },
    { name: "Questions", value: commentData.questions, color: "#3b82f6" },
    { name: "Requests", value: commentData.requests, color: "#a855f7" },
    { name: "Engagement", value: commentData.engagement, color: "#eab308" },
    { name: "Spam", value: commentData.spam, color: "#f97316" },
  ]

  return (
    <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">See It In Action</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Try our demo with a sample YouTube video
            </p>
          </div>

          <div className="w-full max-w-3xl space-y-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Enter YouTube URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="flex-1"
              />
              <Button>Analyze</Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Comment Distribution</CardTitle>
                  <CardDescription>Breakdown of comment categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="pie">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                      <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                      <TabsTrigger value="line">Line Chart</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pie" className="h-[300px]">
                      <PieChart data={chartData} />
                    </TabsContent>
                    <TabsContent value="bar" className="h-[300px]">
                      <BarChart data={chartData} />
                    </TabsContent>
                    <TabsContent value="line" className="h-[300px]">
                      <LineChart data={chartData} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Comment Summary</CardTitle>
                  <CardDescription>Quick overview of comment analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ThumbsUp className="mr-2 h-5 w-5 text-green-500" />
                        <span>Positive</span>
                      </div>
                      <span className="font-bold">{commentData.positive}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ThumbsDown className="mr-2 h-5 w-5 text-red-500" />
                        <span>Negative</span>
                      </div>
                      <span className="font-bold">{commentData.negative}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <HelpCircle className="mr-2 h-5 w-5 text-blue-500" />
                        <span>Questions</span>
                      </div>
                      <span className="font-bold">{commentData.questions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <HandsPraying className="mr-2 h-5 w-5 text-purple-500" />
                        <span>Requests</span>
                      </div>
                      <span className="font-bold">{commentData.requests}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5 text-yellow-500" />
                        <span>Engagement</span>
                      </div>
                      <span className="font-bold">{commentData.engagement}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                        <span>Spam</span>
                      </div>
                      <span className="font-bold">{commentData.spam}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

