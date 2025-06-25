"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, ImageIcon, Video, Mic, Download, Share, Wand2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreatePage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [contentType, setContentType] = useState("image")
  const [style, setStyle] = useState("viral")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NexaraX
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push("/dashboard")}>
              Dashboard
            </Button>
            <Button variant="ghost" onClick={() => router.push("/")}>
              Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
              🎨 AI Content Studio
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Viral Content
            </h1>

            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Generate stunning images, videos, and social posts with AI. Just describe what you want and watch the
              magic happen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Creation Panel */}
            <Card className="border-2 border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Wand2 className="w-6 h-6 mr-2 text-blue-600" />
                  AI Content Generator
                </CardTitle>
                <CardDescription>Describe your vision and let AI bring it to life</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={contentType} onValueChange={setContentType}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="image" className="flex items-center">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Image
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center">
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="voice" className="flex items-center">
                      <Mic className="w-4 h-4 mr-2" />
                      Voice
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="image" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="prompt">Describe your image</Label>
                      <Textarea
                        id="prompt"
                        placeholder="A futuristic city at sunset with flying cars and neon lights..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="style">Art Style</Label>
                      <Select value={style} onValueChange={setStyle}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viral">Viral Social Media</SelectItem>
                          <SelectItem value="photorealistic">Photorealistic</SelectItem>
                          <SelectItem value="anime">Anime/Manga</SelectItem>
                          <SelectItem value="digital-art">Digital Art</SelectItem>
                          <SelectItem value="oil-painting">Oil Painting</SelectItem>
                          <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="video" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="video-prompt">Describe your video</Label>
                      <Textarea
                        id="video-prompt"
                        placeholder="A time-lapse of a flower blooming in a magical garden..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Select defaultValue="15">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 seconds</SelectItem>
                            <SelectItem value="15">15 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                            <SelectItem value="60">1 minute</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Format</Label>
                        <Select defaultValue="square">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="square">Square (1:1)</SelectItem>
                            <SelectItem value="vertical">Vertical (9:16)</SelectItem>
                            <SelectItem value="horizontal">Horizontal (16:9)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="voice" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="voice-text">Text to speak</Label>
                      <Textarea
                        id="voice-text"
                        placeholder="Welcome to NexaraX, where AI meets creativity..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Voice Type</Label>
                        <Select defaultValue="professional">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="energetic">Energetic</SelectItem>
                            <SelectItem value="calm">Calm</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button
                  onClick={handleGenerate}
                  disabled={!prompt || isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Preview Panel */}
            <Card className="border-2 border-purple-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <ImageIcon className="w-6 h-6 mr-2 text-purple-600" />
                  Preview
                </CardTitle>
                <CardDescription>Your generated content will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 text-blue-600 animate-pulse mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-700">Creating your content...</p>
                      <p className="text-sm text-gray-500">This usually takes 10-30 seconds</p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center text-gray-500">
                      <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Your content will appear here</p>
                      <p className="text-sm">Enter a prompt and click generate</p>
                    </div>
                  </div>
                )}

                {!isGenerating && prompt && (
                  <div className="mt-6 space-y-3">
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share className="w-4 h-4 mr-2" />
                      Share to Social Media
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Templates */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8">Quick Start Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">Viral Meme</CardTitle>
                  <CardDescription>Create trending meme content</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setPrompt("A funny cat wearing sunglasses with text overlay")}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg">Product Showcase</CardTitle>
                  <CardDescription>Professional product images</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setPrompt("Modern smartphone on a clean white background with dramatic lighting")}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg">Motivational Quote</CardTitle>
                  <CardDescription>Inspiring quote graphics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setPrompt("Beautiful sunset landscape with inspirational quote overlay")}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
