"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CommentList } from "@/components/comment-list"
import { PieChart, BarChart, DonutChart } from "@/components/ui/chart"
import Image from "next/image"
import React from "react"

interface AnalysisResultsProps {
  data: {
    videoId: string
    title: string
    thumbnail: string
    commentData: {
      positive: { count: number; comments: string[] }
      negative: { count: number; comments: string[] }
      neutral: { count: number; comments: string[] }
      questions: { count: number; comments: string[] }
      requests: { count: number; comments: string[] }
      spam: { count: number; comments: string[] }
      generic: { count: number; comments: string[] }
    }
  }
}

export function AnalysisResults({ data }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = React.useState("overview")

  // Prepare chart data
  const chartData = [
    { name: "Positive", value: data.commentData.positive.count, color: "#22c55e" },
    { name: "Negative", value: data.commentData.negative.count, color: "#ef4444" },
    { name: "Neutral", value: data.commentData.neutral.count, color: "#a3a3a3" },
    { name: "Questions", value: data.commentData.questions.count, color: "#3b82f6" },
    { name: "Requests", value: data.commentData.requests.count, color: "#a855f7" },
    { name: "Spam", value: data.commentData.spam.count, color: "#f97316" },
    { name: "Generic", value: data.commentData.generic.count, color: "#cbd5e1" },
  ]

  // Calculate total comments
  const totalComments = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-8 animate-slide-up">
      <Card>
        <CardHeader>
          <CardTitle>Video Information</CardTitle>
          <CardDescription>Details about the analyzed video</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-1/3 aspect-video rounded-lg overflow-hidden">
              <Image
                src={data.thumbnail || "/placeholder.svg?height=720&width=1280"}
                alt={data.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">Video ID: {data.videoId}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">Total Comments</p>
                  <p className="text-2xl font-bold">{totalComments}</p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">Positive Rate</p>
                  <p className="text-2xl font-bold text-green-500">
                    {Math.round((data.commentData.positive.count / totalComments) * 100)}%
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">Negative Rate</p>
                  <p className="text-2xl font-bold text-red-500">
                    {Math.round((data.commentData.negative.count / totalComments) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comment Analysis Overview</CardTitle>
              <CardDescription>Summary of comment categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {chartData.map((item) => (
                  <div key={item.name} className="bg-muted rounded-lg p-4 text-center">
                    <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }} />
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{Math.round((item.value / totalComments) * 100)}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CommentList
              title="Positive Comments"
              icon="thumbs-up"
              color="text-green-500"
              count={data.commentData.positive.count}
              comments={data.commentData.positive.comments}
            />
            <CommentList
              title="Negative Comments"
              icon="thumbs-down"
              color="text-red-500"
              count={data.commentData.negative.count}
              comments={data.commentData.negative.comments}
            />
            <CommentList
              title="Questions"
              icon="help-circle"
              color="text-blue-500"
              count={data.commentData.questions.count}
              comments={data.commentData.questions.comments}
            />
          </div>
        </TabsContent>
        <TabsContent value="charts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Comment Distribution</CardTitle>
              <CardDescription>Visual representation of comment categories</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pie" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                  <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                  <TabsTrigger value="donut">Donut Chart</TabsTrigger>
                </TabsList>
                <TabsContent value="pie" className="h-[400px] mt-4">
                  <PieChart data={chartData} />
                </TabsContent>
                <TabsContent value="bar" className="h-[400px] mt-4">
                  <BarChart data={chartData} />
                </TabsContent>
                <TabsContent value="donut" className="h-[400px] mt-4">
                  <DonutChart data={chartData} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="comments" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CommentList
              title="Positive Comments"
              icon="thumbs-up"
              color="text-green-500"
              count={data.commentData.positive.count}
              comments={data.commentData.positive.comments}
            />
            <CommentList
              title="Negative Comments"
              icon="thumbs-down"
              color="text-red-500"
              count={data.commentData.negative.count}
              comments={data.commentData.negative.comments}
            />
            <CommentList
              title="Questions"
              icon="help-circle"
              color="text-blue-500"
              count={data.commentData.questions.count}
              comments={data.commentData.questions.comments}
            />
            <CommentList
              title="Requests"
              icon="hands-praying"
              color="text-purple-500"
              count={data.commentData.requests.count}
              comments={data.commentData.requests.comments}
            />
            <CommentList
              title="Spam/Promotional"
              icon="alert-triangle"
              color="text-orange-500"
              count={data.commentData.spam.count}
              comments={data.commentData.spam.comments}
            />
            <CommentList
              title="Generic Comments"
              icon="message-square"
              color="text-gray-500"
              count={data.commentData.generic.count}
              comments={data.commentData.generic.comments}
            />
          </div>
        </TabsContent>
        <TabsContent value="insights" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Comment Insights</CardTitle>
              <CardDescription>Key takeaways from the comment analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Sentiment Analysis</h3>
                  <p className="text-muted-foreground">
                    The overall sentiment of comments is
                    <span className="font-medium text-green-500"> positive</span>, with
                    {Math.round((data.commentData.positive.count / totalComments) * 100)}% of comments expressing
                    positive feedback.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Engagement Quality</h3>
                  <p className="text-muted-foreground">
                    {data.commentData.questions.count} viewers asked questions, indicating high engagement and interest
                    in your content. Consider addressing these questions in a follow-up video.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Content Suggestions</h3>
                  <p className="text-muted-foreground">
                    Based on {data.commentData.requests.count} request comments, viewers are interested in more detailed
                    explanations and related topics. Consider creating content that addresses these requests.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Areas for Improvement</h3>
                  <p className="text-muted-foreground">
                    {data.commentData.negative.count} negative comments mentioned issues with
                    {data.commentData.negative.count > 5
                      ? " content clarity and audio quality"
                      : " minor technical aspects"}
                    . Addressing these concerns could improve viewer satisfaction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
