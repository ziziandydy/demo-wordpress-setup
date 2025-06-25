"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Dashboard } from "@/components/dashboard"
import { PluginsPage } from "@/components/plugins-page"
import { PluginSettings } from "@/components/plugin-settings"

export default function WordPressDemo() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [pluginActivated, setPluginActivated] = useState(false)

  const handleActivatePlugin = () => {
    setPluginActivated(true)
  }

  const handleDeactivatePlugin = () => {
    setPluginActivated(false)
    // If user is on settings page and deactivates, redirect to plugins page
    if (currentPage === "ddkt-analytics") {
      setCurrentPage("plugins")
    }
  }

  const handleOpenSettings = () => {
    setCurrentPage("ddkt-analytics")
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "plugins":
        return (
          <PluginsPage
            onActivatePlugin={handleActivatePlugin}
            onDeactivatePlugin={handleDeactivatePlugin}
            onOpenSettings={handleOpenSettings}
            pluginActivated={pluginActivated}
          />
        )
      case "ddkt-analytics":
        return <PluginSettings />
      default:
        return <Dashboard />
    }
  }

  return (
    <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage} pluginActivated={pluginActivated}>
      {renderPage()}
    </AdminLayout>
  )
}
