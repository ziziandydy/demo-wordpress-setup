"use client"

import type { ReactNode } from "react"
import {
  LayoutDashboard,
  Plug,
  Settings,
  Users,
  FileText,
  ImageIcon,
  MessageSquare,
  Palette,
  BarChart3,
  Bell,
} from "lucide-react"

interface AdminLayoutProps {
  children: ReactNode
  currentPage: string
  onPageChange: (page: string) => void
  pluginActivated: boolean
}

export function AdminLayout({ children, currentPage, onPageChange, pluginActivated }: AdminLayoutProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "posts", label: "Posts", icon: FileText },
    { id: "media", label: "Media", icon: ImageIcon },
    { id: "pages", label: "Pages", icon: FileText },
    { id: "comments", label: "Comments", icon: MessageSquare },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "plugins", label: "Plugins", icon: Plug },
    { id: "users", label: "Users", icon: Users },
    { id: "tools", label: "Tools", icon: Settings },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* WordPress Admin Bar */}
      <div className="bg-gray-800 text-white px-4 py-2 text-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <span className="font-semibold">WordPress Demo Site</span>
            <span>•</span>
            <a href="#" className="hover:text-blue-300">
              Visit Site
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-4 w-4" />
            <span>Admin User</span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-black shadow-sm min-h-screen">
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-xl font-bold text-white">WordPress</h1>
          </div>

          <nav className="mt-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center px-4 py-2 text-left hover:bg-gray-800 hover:text-white transition-colors ${
                    currentPage === item.id ? "bg-blue-600 text-white border-r-4 border-blue-400" : "text-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                </button>
              )
            })}

            {/* DDKT Site Analytics - Only show when activated */}
            {pluginActivated && (
              <button
                onClick={() => onPageChange("ddkt-analytics")}
                className={`w-full flex items-center px-4 py-2 text-left hover:bg-gray-800 hover:text-green-400 transition-colors ${
                  currentPage === "ddkt-analytics"
                    ? "bg-green-600 text-white border-r-4 border-green-400"
                    : "text-gray-300"
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                DDKT Site Analytics
              </button>
            )}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  )
}
