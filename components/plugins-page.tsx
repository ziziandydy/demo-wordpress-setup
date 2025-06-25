"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Download, Settings, Trash2, BarChart3 } from "lucide-react"

interface PluginsPageProps {
  onActivatePlugin: () => void
  onDeactivatePlugin: () => void
  onOpenSettings: () => void
  pluginActivated: boolean
}

export function PluginsPage({
  onActivatePlugin,
  onDeactivatePlugin,
  onOpenSettings,
  pluginActivated,
}: PluginsPageProps) {
  const [showInstallModal, setShowInstallModal] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)

  const handleInstallPlugin = async () => {
    setInstalling(true)
    // Simulate installation process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setInstalling(false)
    setShowInstallModal(false)
    onActivatePlugin()
  }

  const handleDeactivatePlugin = () => {
    setShowDeactivateModal(false)
    onDeactivatePlugin()
  }

  const installedPlugins = [
    {
      name: "DDKT Site Analytics",
      description:
        "Comprehensive tracking solution for your WordPress site with advanced analytics and user behavior insights.",
      version: "2.1.4",
      author: "DDKT Team",
      status: pluginActivated ? "active" : "inactive",
      isTrackingPlugin: true,
    },
    {
      name: "Akismet Anti-Spam",
      description:
        "Used by millions, Akismet is quite possibly the best way in the world to protect your blog from spam.",
      version: "5.3.1",
      author: "Automattic",
      status: "active",
      isTrackingPlugin: false,
    },
    {
      name: "Yoast SEO",
      description: "Improve your WordPress SEO: Write better content and have a fully optimized WordPress site.",
      version: "21.7",
      author: "Team Yoast",
      status: "inactive",
      isTrackingPlugin: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Plugins</h1>
        <Button onClick={() => setShowInstallModal(true)} className="bg-blue-600 hover:bg-blue-700">
          Add New Plugin
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input placeholder="Search installed plugins..." className="pl-10" />
      </div>

      {/* Plugin Status Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button className="border-b-2 border-blue-500 py-2 px-1 text-sm font-medium text-blue-600">
            All ({installedPlugins.length})
          </button>
          <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
            Active ({installedPlugins.filter((p) => p.status === "active").length})
          </button>
          <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
            Inactive ({installedPlugins.filter((p) => p.status === "inactive").length})
          </button>
        </nav>
      </div>

      {/* Plugins List */}
      <div className="space-y-4">
        {installedPlugins.map((plugin, index) => (
          <Card
            key={index}
            className={plugin.isTrackingPlugin && pluginActivated ? "border-green-200 bg-green-50" : ""}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{plugin.name}</h3>
                    <Badge variant={plugin.status === "active" ? "default" : "secondary"}>{plugin.status}</Badge>
                    {plugin.isTrackingPlugin && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Analytics
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{plugin.description}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <span>Version {plugin.version}</span>
                    <span>•</span>
                    <span>By {plugin.author}</span>
                  </div>
                  {plugin.isTrackingPlugin && pluginActivated && (
                    <div className="mt-3">
                      <p className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-md inline-block">
                        ✓ Plugin activated! Access settings via "DDKT Site Analytics" in the main navigation.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {plugin.status === "active" ? (
                    <>
                      {/* Removed Settings button for DDKT Site Analytics plugin */}
                      {plugin.isTrackingPlugin ? null : (
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Settings
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={plugin.isTrackingPlugin ? () => setShowDeactivateModal(true) : undefined}
                      >
                        Deactivate
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={plugin.isTrackingPlugin ? onActivatePlugin : undefined}
                    >
                      Activate
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Install Plugin Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Install DDKT Site Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold">DDKT Site Analytics</h3>
                <p className="text-gray-600 mt-2">
                  Install comprehensive tracking solution with advanced analytics capabilities.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleInstallPlugin}
                  disabled={installing}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {installing ? (
                    <>
                      <Download className="h-4 w-4 mr-2 animate-spin" />
                      Installing...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Install Now
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setShowInstallModal(false)} disabled={installing}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Deactivate Plugin Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Deactivate Plugin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Settings className="h-16 w-16 mx-auto text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold">DDKT Site Analytics</h3>
                <p className="text-gray-600 mt-2">
                  Are you sure you want to deactivate this plugin? Your tracking data will be preserved, but tracking
                  will stop.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Deactivating will stop all tracking activities on your website.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleDeactivatePlugin}
                  variant="outline"
                  className="flex-1 border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  Yes, Deactivate
                </Button>
                <Button onClick={() => setShowDeactivateModal(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
