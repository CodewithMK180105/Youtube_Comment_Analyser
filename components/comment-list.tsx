import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThumbsUp, ThumbsDown, HelpCircle, HandIcon as HandsPraying, MessageSquare, AlertTriangle } from "lucide-react"

interface CommentListProps {
  title: string
  icon: string
  color: string
  count: number
  comments?: string[]
}

export function CommentList({ title, icon, color, count, comments = [] }: CommentListProps) {
  // Use provided comments or generate placeholders
  // const displayComments =
  //   comments.length > 0
  //     ? comments.slice(0, Math.min(count, 5))
  //     : Array(Math.min(count, 5))
  //         .fill("")
  //         .map((_, i) => `Sample ${title.toLowerCase()} comment ${i + 1}`)

  const displayComments = comments.length > 0 ? comments : []



  const getIcon = () => {
    switch (icon) {
      case "thumbs-up":
        return <ThumbsUp className={`h-5 w-5 ${color}`} />
      case "thumbs-down":
        return <ThumbsDown className={`h-5 w-5 ${color}`} />
      case "help-circle":
        return <HelpCircle className={`h-5 w-5 ${color}`} />
      case "hands-praying":
        return <HandsPraying className={`h-5 w-5 ${color}`} />
      case "message-square":
        return <MessageSquare className={`h-5 w-5 ${color}`} />
      case "alert-triangle":
        return <AlertTriangle className={`h-5 w-5 ${color}`} />
      default:
        return <MessageSquare className={`h-5 w-5 ${color}`} />
    }
  }

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          <div className="flex items-center gap-2">
            {getIcon()}
            <span>{title}</span>
            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{count}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          {displayComments.length > 0 ? (
            <div className="space-y-4">
              {displayComments.map((comment, index) => (
                <div key={index} className="rounded-lg border p-3 transition-all hover:bg-muted/50">
                  <p className="text-sm">{comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">No comments found</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

