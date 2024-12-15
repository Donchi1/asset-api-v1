"use client";

import { useState } from "react";
import { Search, Star, FileText, Trash2 } from "lucide-react";
import moment from "moment";
import { useNotifications } from "@/hooks/useNotification";
import LoadingPage from "@/components/global/LoadingPage";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { EmptyPage } from "@/components/dashboard/EmptyPage";


export type TabType = "all" | "archive" | "favorite";

export default function NotificationList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const {
    counts,
    filteredNotifications,
    noteLoading,
    toggleArchive,
    handleDelete,
    handleToggleFavorite
  } = useNotifications(activeTab, searchQuery)

  if (noteLoading) return <LoadingPage />

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader label="Dashboard" />
        <div className="p-4 md:p-6 main-gradient !bg-gradient-to-br min-h-screen">
          {/* <SubHeader /> */}
          <div className="mx-auto md:max-w-4xl w-full ">
            <div className="mb-6 flex flex-wrap items-center justify-between">
              <h1 className="text-xl text-white font-semibold mb-2 md:mb-0">Notifications</h1>
              <div className="relative md:w-auto w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by Notification Text"
                  className="md:w-[300px] w-full py-2 pl-10 pr-4 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6 flex space-x-6 border-b">
              {(["all", "archive", "favorite"] as const).map((tab) => (
                <button
                  key={tab}
                  className={`relative pb-4 text-sm ${activeTab === tab
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary [&_span]:text-primary-blue"
                    : "text-gray-500"
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                    {counts[tab]}
                  </span>
                </button>
              ))}
            </div>

              {filteredNotifications.length > 0 ? filteredNotifications.map((notification) => (
            <Card key={notification.id} className="space-y-2 bg-primary-blue/30 mb-2">
                <div
                  
                  className="flex items-center justify-between rounded-lg  p-4"
                >
                  <div className="flex items-center space-x-4">
                    {!notification.recent && (
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    )}
                    <button
                      onClick={() => handleToggleFavorite(notification.id)}
                      className={`${notification.isFavorite ? "text-yellow-500" : "text-gray-400"
                        }`}
                    >
                      <Star className="h-5 w-5" />
                    </button>
                    <button onClick={() => toggleArchive(notification.id)}>
                      <FileText className="h-5 w-5 text-gray-400" />
                    </button>
                    <div className="max-w-2xl">
                      <p className="text-sm text-white">{notification.text}</p>
                      <p className="text-xs text-gray-500">
                        {moment(notification.date?.toDate()).fromNow()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
            </Card>
              )): <EmptyPage text="No notification yet" showButton={false} />}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
