import type { Metadata } from "next";
import { DashboardContent } from "@/components/dashboard-content";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - YouTube Comment Analyzer",
  description: "Analyze YouTube comments and get valuable insights",
};

export default async function DashboardPage() {
  // const { userId } = await auth();

  // if (!userId) {
  //   redirect("https://proper-jackal-26.accounts.dev/sign-up");
  // }

  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
}

