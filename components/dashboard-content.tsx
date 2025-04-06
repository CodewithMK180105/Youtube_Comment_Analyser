// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { DashboardSidebar } from "@/components/dashboard-sidebar"
// import { Loader2, Youtube } from "lucide-react"
// import { AnalysisResults } from "@/components/analysis-results"

// // Sample data for the dashboard
// const sampleData = {
//   positive: {
//     count: 42,
//     comments: [
//       "This video was so helpful! Thank you for making it.",
//       "I've been looking for this information for ages. Great explanation!",
//       "Your content is always top-notch. Keep it up!",
//       "This changed my perspective completely. Amazing work!",
//       "I've watched this three times already. So good!",
//     ],
//   },
//   negative: {
//     count: 12,
//     comments: [
//       "I didn't find this very helpful to be honest.",
//       "The audio quality could be better.",
//       "You missed some important points here.",
//       "This seems oversimplified.",
//       "I expected more detailed information.",
//     ],
//   },
//   questions: {
//     count: 18,
//     comments: [
//       "Can you explain more about the second point?",
//       "How does this compare to your previous video?",
//       "When will you release a follow-up?",
//       "What tools did you use for this?",
//       "Could you make a tutorial on this specific part?",
//     ],
//   },
//   requests: {
//     count: 15,
//     comments: [
//       "Please make a video about advanced techniques!",
//       "I'd love to see a collaboration with other creators.",
//       "Can you do a live Q&A session?",
//       "More examples would be helpful in future videos.",
//       "Consider adding timestamps to your longer videos.",
//     ],
//   },
//   engagement: {
//     count: 35,
//     comments: [
//       "I'm sharing this with my colleagues!",
//       "First time watching your channel, definitely subscribing!",
//       "Watching from Australia, love your content!",
//       "Been following since your first video, great progress!",
//       "This is exactly what I needed today.",
//     ],
//   },
//   spam: {
//     count: 8,
//     comments: [
//       "Check out my channel for similar content!",
//       "I'm selling courses on this topic, DM me for details.",
//       "Want to earn money online? Click my profile!",
//       "I can help you get more subscribers, check my website.",
//       "Free giveaway on my page!",
//     ],
//   },
// }

// export function DashboardContent() {
//   const [videoUrl, setVideoUrl] = useState("")
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [hasResults, setHasResults] = useState(false)
//   const [analysisData, setAnalysisData] = useState<any>(null)
//   const [notification, setNotification] = useState<{
//     type: "success" | "error"
//     message: string
//   } | null>(null)

//   // Extract video ID from YouTube URL
//   const extractVideoId = (url: string) => {
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
//     const match = url.match(regExp)
//     return match && match[2].length === 11 ? match[2] : null
//   }

//   const handleAnalyze = () => {
//     if (!videoUrl) {
//       setNotification({
//         type: "error",
//         message: "Please enter a valid YouTube URL",
//       })
//       setTimeout(() => setNotification(null), 3000)
//       return
//     }

//     const videoId = extractVideoId(videoUrl)
//     if (!videoId) {
//       setNotification({
//         type: "error",
//         message: "Please enter a valid YouTube video URL",
//       })
//       setTimeout(() => setNotification(null), 3000)
//       return
//     }

//     setIsAnalyzing(true)

//     // Simulate API call
//     setTimeout(() => {
//       setIsAnalyzing(false)
//       setHasResults(true)
//       setAnalysisData({
//         videoId,
//         title: "Sample YouTube Video",
//         thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
//         commentData: sampleData,
//       })

//       setNotification({
//         type: "success",
//         message: "Your YouTube comments have been analyzed successfully!",
//       })
//       setTimeout(() => setNotification(null), 3000)
//     }, 2500)
//   }

//   return (
//     <div className="flex min-h-[calc(100vh-4rem)] w-full">
//       {/* <DashboardSidebar /> */}

//       <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
//         <div className="space-y-8 mx-auto">
//           <div className="animate-slide-down">
//             <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
//             <p className="text-muted-foreground">Analyze YouTube comments and get valuable insights</p>
//           </div>

//           <Card className="animate-fade-in w-full">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Youtube className="h-5 w-5 text-red-500" />
//                 Analyze YouTube Video
//               </CardTitle>
//               <CardDescription>Enter a YouTube video URL to analyze its comments</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
//                 <Input
//                   placeholder="https://www.youtube.com/watch?v=..."
//                   value={videoUrl}
//                   onChange={(e) => setVideoUrl(e.target.value)}
//                   disabled={isAnalyzing}
//                   className="flex-1"
//                 />
//                 <Button onClick={handleAnalyze} disabled={isAnalyzing || !videoUrl} className="w-full sm:w-auto">
//                   {isAnalyzing ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Analyzing...
//                     </>
//                   ) : (
//                     "Analyze"
//                   )}
//                 </Button>
//               </div>

//               {notification && (
//                 <div
//                   className={`mt-4 p-3 rounded-md ${notification.type === "success" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
//                 >
//                   {notification.message}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {hasResults && analysisData && <AnalysisResults data={analysisData} />}
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Youtube } from "lucide-react"
import { AnalysisResults } from "@/components/analysis-results"
// import { auth } from "@clerk/nextjs/server";

export function DashboardContent() {

  // const { userId } =await auth();

  // if (!userId) return null; // or handle edge case

  const [videoUrl, setVideoUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasResults, setHasResults] = useState(false)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [notification, setNotification] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  // Extract video ID from YouTube URL
  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const handleAnalyze = async () => {
    if (!videoUrl) {
      setNotification({
        type: "error",
        message: "Please enter a valid YouTube URL",
      })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      setNotification({
        type: "error",
        message: "Please enter a valid YouTube video URL",
      })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    setIsAnalyzing(true)

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: videoUrl }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze video")
      }

      const data = await response.json()
      setIsAnalyzing(false)
      setHasResults(true)
      setAnalysisData({
        videoId: data.video_id,
        title: "YouTube Video", // You can modify this to include actual video title if available
        thumbnail: `https://img.youtube.com/vi/${data.video_id}/maxresdefault.jpg`,
        commentData: {
          positive: {
            count: data.sentiment.positive.count,
            comments: data.sentiment.positive.comments,
          },
          negative: {
            count: data.sentiment.negative.count,
            comments: data.sentiment.negative.comments,
          },
          neutral: {
            count: data.sentiment.neutral.count,
            comments: data.sentiment.neutral.comments,
          },
          questions: {
            count: data.sentiment.questions.count,
            comments: data.sentiment.questions.comments,
          },
          requests: {
            count: data.sentiment.requests.count,
            comments: data.sentiment.requests.comments,
          },
          spam: {
            count: data.sentiment.spam.count,
            comments: data.sentiment.spam.comments,
          },
          generic: {
            count: data.sentiment.generic.count,
            comments: data.sentiment.generic.comments,
          },
        },
      })
      setNotification({
        type: "success",
        message: "Your YouTube comments have been analyzed successfully!",
      })
    } catch (error) {
      console.error(error)
      setIsAnalyzing(false)
      setNotification({
        type: "error",
        message: "An error occurred while analyzing the video",
      })
    } finally {
      setTimeout(() => setNotification(null), 3000)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full">
      {/* <DashboardSidebar /> */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="space-y-8 mx-auto">
          <div className="animate-slide-down">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Analyze YouTube comments and get valuable insights</p>
          </div>
          <Card className="animate-fade-in w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                Analyze YouTube Video
              </CardTitle>
              <CardDescription>Enter a YouTube video URL to analyze its comments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <Input
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  disabled={isAnalyzing}
                  className="flex-1"
                />
                <Button onClick={handleAnalyze} disabled={isAnalyzing || !videoUrl} className="w-full sm:w-auto">
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze"
                  )}
                </Button>
              </div>
              {notification && (
                <div
                  className={`mt-4 p-3 rounded-md ${notification.type === "success" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
                >
                  {notification.message}
                </div>
              )}
            </CardContent>
          </Card>
          {hasResults && analysisData && <AnalysisResults data={analysisData} />}
        </div>
      </div>
    </div>
  )
}
