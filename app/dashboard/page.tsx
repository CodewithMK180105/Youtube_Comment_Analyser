import type { Metadata } from "next"
import { DashboardContent } from "@/components/dashboard-content"
import { SidebarProvider } from "@/components/ui/sidebar"

export const metadata: Metadata = {
  title: "Dashboard - YouTube Comment Analyzer",
  description: "Analyze YouTube comments and get valuable insights",
}

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  )
}

