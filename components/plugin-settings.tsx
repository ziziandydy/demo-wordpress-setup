"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Settings, Shield, CheckCircle, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react"

export function PluginSettings() {
  const [trackingCode, setTrackingCode] = useState("")
  const [isEnabled, setIsEnabled] = useState(true)
  const [trackPageViews, setTrackPageViews] = useState(true)
  const [trackClicks, setTrackClicks] = useState(true)
  const [trackForms, setTrackForms] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showSetupWizard, setShowSetupWizard] = useState(false) // 預設為 false，直接顯示設定畫面
  const [wizardStep, setWizardStep] = useState(1)
  const [ddktAccountId, setDdktAccountId] = useState("")
  const [accountVerified, setAccountVerified] = useState(false)
  const [verifying, setVerifying] = useState(false)

  const [appId, setAppId] = useState("")
  const [appIdVerified, setAppIdVerified] = useState(false)
  const [appIdVerifying, setAppIdVerifying] = useState(false)
  const [originalAppId, setOriginalAppId] = useState("")
  const [trackLogins, setTrackLogins] = useState(true)
  const [trackSearch, setTrackSearch] = useState(true)
  const [trackAddToCart, setTrackAddToCart] = useState(true)
  const [trackRemoveFromCart, setTrackRemoveFromCart] = useState(true)
  const [trackProductViewed, setTrackProductViewed] = useState(true)
  const [trackPurchased, setTrackPurchased] = useState(true)
  const [trackPlacedOrders, setTrackPlacedOrders] = useState(true)
  const [wooCommerceEnabled, setWooCommerceEnabled] = useState(false)

  const [trackCategoryViewed, setTrackCategoryViewed] = useState(true)
  const [trackCheckoutMade, setTrackCheckoutMade] = useState(true)

  const [appIdError, setAppIdError] = useState("")

  const [trackUnlogins, setTrackUnlogins] = useState(true)

  // Check if app ID has changed from original verified value
  useEffect(() => {
    if (originalAppId && appId !== originalAppId) {
      setAppIdVerified(false)
    }
  }, [appId, originalAppId])

  // 只在 client side 設定 tracking ID 預設值
  useEffect(() => {
    if (typeof window !== "undefined") {
      const generatedId =
        window.location.hostname.replace(/\W/g, "") +
        "-" +
        Math.random().toString(36).substr(2, 6).toUpperCase()
      setTrackingCode(generatedId)
      setDdktAccountId(generatedId)
    }
  }, [])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleVerifyAccount = async () => {
    setVerifying(true)
    // Simulate verification process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setAccountVerified(true)
    setVerifying(false)
  }

  const handleVerifyAppId = async () => {
    setAppIdVerifying(true)
    // Simulate verification process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setAppIdVerified(true)
    setOriginalAppId(appId)
    setAppIdVerifying(false)
    if (appIdError) setAppIdError("")
  }

  const handleCompleteSetup = () => {
    setTrackingCode("DDKT-" + Math.random().toString(36).substr(2, 9).toUpperCase())
    setAppId(ddktAccountId) // Set App ID from account ID
    setAppIdVerified(true) // Mark as verified since it came from setup
    setOriginalAppId(ddktAccountId) // Set original value
    setShowSetupWizard(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleAppIdChange = (value: string) => {
    setAppId(value)
    if (appIdError) setAppIdError("")
    // Reset verification status if value changes
    if (value !== originalAppId) {
      setAppIdVerified(false)
    }
  }

  const getVerificationStatus = () => {
    if (!appId) return "empty"
    if (appIdVerified && appId === originalAppId) return "verified"
    return "not-connected"
  }

  const sampleTrackingCode = `<!-- DDKT Site Analytics -->
<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'ddkt.start':
new Date().getTime(),event:'ddkt.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://analytics.ddkt.com/tracker.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${trackingCode || "YOUR-DDKT-ID"}');
</script>`

  if (showSetupWizard) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
            <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
            Welcome to DDKT Site Analytics
          </h1>
          <p className="text-gray-600 mt-2">Let's get your tracking set up in just a few steps</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Progress value={(wizardStep / 3) * 100} className="w-full" />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Step {wizardStep} of 3</span>
              <span>{Math.round((wizardStep / 3) * 100)}% Complete</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              {wizardStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <Settings className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                    <h2 className="text-xl font-semibold">Basic Information</h2>
                    <p className="text-gray-600">Connect your DDKT account</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ddkt-site-account-id">DDKT site Tracking ID</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="ddkt-site-account-id"
                          placeholder="Enter your DDKT site Tracking ID"
                          value={ddktAccountId}
                          onChange={(e) => setDdktAccountId(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={handleVerifyAccount}
                          disabled={!ddktAccountId || verifying || accountVerified}
                          variant="outline"
                        >
                          {verifying ? "Verifying..." : accountVerified ? "Verified" : "Verify"}
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-blue-600">This ID is a unique value generated based on your domain.</div>
                      {accountVerified && (
                        <div className="mt-2">
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Successfully Connected
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      Not yet have a DDKT?{" "}
                      <a
                        href="https://insight.ghtinc.com/en-US/auth/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                      >
                        Register now!
                      </a>
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setShowSetupWizard(false)}>
                      Skip
                    </Button>
                    <Button
                      onClick={() => setWizardStep(2)}
                      disabled={!ddktAccountId || !accountVerified}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Next Step
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                    <h2 className="text-xl font-semibold">Tracking Preferences</h2>
                    <p className="text-gray-600">Choose what you'd like to track</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="text-base font-medium">Page Views</Label>
                        <p className="text-sm text-gray-600">Track page visits and navigation patterns</p>
                      </div>
                      <Switch checked={trackPageViews} onCheckedChange={setTrackPageViews} />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="text-base font-medium">User Logins</Label>
                        <p className="text-sm text-gray-600">Track when users log into your site</p>
                      </div>
                      <Switch checked={trackLogins} onCheckedChange={setTrackLogins} />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="text-base font-medium">Search Events</Label>
                        <p className="text-sm text-gray-600">Track when users search on your site</p>
                      </div>
                      <Switch checked={trackSearch} onCheckedChange={setTrackSearch} />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="text-base font-medium">Click Events</Label>
                        <p className="text-sm text-gray-600">Track button clicks and link interactions</p>
                      </div>
                      <Switch checked={trackClicks} onCheckedChange={setTrackClicks} />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="text-base font-medium">Add to Cart</Label>
                        <p className="text-sm text-gray-600">Track when users add items to their cart</p>
                      </div>
                      <Switch checked={trackAddToCart} onCheckedChange={setTrackAddToCart} />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="text-base font-medium">Remove from Cart</Label>
                        <p className="text-sm text-gray-600">Track when users remove items from their cart</p>
                      </div>
                      <Switch checked={trackRemoveFromCart} onCheckedChange={setTrackRemoveFromCart} />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="text-base font-medium">Purchased</Label>
                        <p className="text-sm text-gray-600">Track successful purchase completions</p>
                      </div>
                      <Switch checked={trackPurchased} onCheckedChange={setTrackPurchased} />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="text-base font-medium">Placed Orders</Label>
                        <p className="text-sm text-gray-600">Track when users place orders</p>
                      </div>
                      <Switch checked={trackPlacedOrders} onCheckedChange={setTrackPlacedOrders} />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setWizardStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button onClick={() => setWizardStep(3)} className="bg-blue-600 hover:bg-blue-700">
                      Next Step
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
                    <h2 className="text-xl font-semibold">Ready to Launch!</h2>
                    <p className="text-gray-600">Your tracking setup is complete</p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-medium text-green-900 mb-2">Setup Summary:</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• DDKT site Tracking ID: {ddktAccountId}</li>
                      <li>• Page Views: {trackPageViews ? "Enabled" : "Disabled"}</li>
                      <li>• Login Tracking: {trackLogins ? "Enabled" : "Disabled"}</li>
                      <li>• Search Tracking: {trackSearch ? "Enabled" : "Disabled"}</li>
                      <li>• Click Tracking: {trackClicks ? "Enabled" : "Disabled"}</li>
                      <li>• Add to Cart: {trackAddToCart ? "Enabled" : "Disabled"}</li>
                      <li>• Remove from Cart: {trackRemoveFromCart ? "Enabled" : "Disabled"}</li>
                      <li>• Purchased: {trackPurchased ? "Enabled" : "Disabled"}</li>
                      <li>• Placed Orders: {trackPlacedOrders ? "Enabled" : "Disabled"}</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Your tracking code will be automatically generated</li>
                      <li>• The code will be embedded in your website header</li>
                      <li>• Data collection will begin immediately</li>
                      <li>
                        • You can view reports in the{" "}
                        <a
                          href="https://insight.ghtinc.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline font-medium"
                        >
                          DDKT Platform
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setWizardStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button onClick={handleCompleteSetup} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Setup
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
            DDKT Site Analytics
          </h1>
          <p className="text-gray-600 mt-1">Configure your tracking settings and analytics code</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>
      </div>

      {saved && (
        <div className="mt-4">
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            You are all set! Now you are able to send ecommerce events to DDKT Site Analysis
          </Badge>
        </div>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Logs
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="mb-6 text-gray-700">
                All Set! You can now able to send ecommerce events and view Analytics in <a href="https://insight.ghtinc.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">DDKT Site Analysis</a>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <Switch id="track-unlogins" checked={trackUnlogins} onCheckedChange={setTrackUnlogins} />
                <div>
                  <Label htmlFor="track-unlogins" className="font-medium">Track unlogins</Label>
                  <div className="text-sm text-gray-600">Automatically track events when users visit and haven't login.</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <Switch id="track-logins" checked={trackLogins} onCheckedChange={setTrackLogins} />
                <div>
                  <Label htmlFor="track-logins" className="font-medium">Track logins</Label>
                  <div className="text-sm text-gray-600">Automatically track events when users log in.<br />This event will be logged on the subsequent page load after a user logs in.</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <Switch id="track-search" checked={trackSearch} onCheckedChange={setTrackSearch} />
                <div>
                  <Label htmlFor="track-search" className="font-medium">Track search made</Label>
                  <div className="text-sm text-gray-600">Automatically track events when users search on your site.<br />This setting will turn on & off the "Search made" event.</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tracking Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">Configure which events you want to track on your website.</p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Switch
                    id="track-page-views"
                    checked={trackPageViews}
                    onCheckedChange={setTrackPageViews}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="track-page-views" className="text-base font-medium">
                      Page Views
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">Track page visits and navigation patterns.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Switch
                    id="track-logins-pref"
                    checked={trackLogins}
                    onCheckedChange={setTrackLogins}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="track-logins-pref" className="text-base font-medium">
                      User Logins
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">Track when users log into your site.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Switch
                    id="track-search-pref"
                    checked={trackSearch}
                    onCheckedChange={setTrackSearch}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="track-search-pref" className="text-base font-medium">
                      Search Events
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">Track when users search on your site.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Switch
                    id="track-clicks-pref"
                    checked={trackClicks}
                    onCheckedChange={setTrackClicks}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="track-clicks-pref" className="text-base font-medium">
                      Click Events
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">Track button clicks and link interactions.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Switch
                    id="track-add-cart-pref"
                    checked={trackAddToCart}
                    onCheckedChange={setTrackAddToCart}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="track-add-cart-pref" className="text-base font-medium">
                      Add to Cart
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">Track when users add items to their cart.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Switch
                    id="track-remove-cart-pref"
                    checked={trackRemoveFromCart}
                    onCheckedChange={setTrackRemoveFromCart}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="track-remove-cart-pref" className="text-base font-medium">
                      Remove from Cart
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">Track when users remove items from their cart.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Switch
                    id="track-purchased-pref"
                    checked={trackPurchased}
                    onCheckedChange={setTrackPurchased}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="track-purchased-pref" className="text-base font-medium">
                      Purchased
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">Track successful purchase completions.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Switch
                    id="track-placed-orders-pref"
                    checked={trackPlacedOrders}
                    onCheckedChange={setTrackPlacedOrders}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="track-placed-orders-pref" className="text-base font-medium">
                      Placed Orders
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">Track when users place orders.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Recent tracking events from your website</p>
                  <Button variant="outline" size="sm">
                    Export Logs
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15 14:32:15</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">john_doe</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">12345</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">Page View</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">/products/laptop</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15 14:31:42</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">jane_smith</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">67890</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">Add to Cart</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Product ID: 456</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15 14:30:18</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">mike_wilson</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">11111</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">User Login</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Login successful</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15 14:29:55</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">sarah_jones</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">22222</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">Search Made</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          Query: "wireless headphones"
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15 14:28:33</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">alex_brown</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">33333</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">Purchased</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          Order ID: ORD-789, Amount: $299.99
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Showing 5 of 1,247 events</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Anonymize IP Addresses</Label>
                    <p className="text-sm text-gray-600">Comply with GDPR by anonymizing visitor IPs</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Respect Do Not Track</Label>
                    <p className="text-sm text-gray-600">Honor browser Do Not Track settings</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Cookie Consent Integration</Label>
                    <p className="text-sm text-gray-600">Wait for cookie consent before tracking</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Data Retention Period</Label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>14 months (Google Analytics default)</option>
                  <option>26 months</option>
                  <option>38 months</option>
                  <option>50 months</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
