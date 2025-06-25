"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram, Twitter, Youtube, Sparkles, Wand2, Copy, Download, Calendar, TrendingUp, Hash } from "lucide-react"

interface GeneratedContent {
  platform: string
  content: string
  hashtags: string[]
  tips: string[]
  engagement_hooks: string[]
}

export default function ContentGeneratorPage() {
  const [topic, setTopic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([])

  const generateContent = async () => {
    if (!topic.trim()) return

    setIsGenerating(true)

    // Simulate AI content generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const content: GeneratedContent[] = [
      {
        platform: "Instagram",
        content: `🚀 Ready to transform your content game with AI?

${topic} is about to get a major upgrade! ✨

Here's what NexaraX can do for you:
• Generate stunning visuals in seconds
• Create viral-worthy captions
• Optimize for maximum engagement
• Scale your content 10x faster

The future of content creation is here, and it's powered by AI! 

Who's ready to go viral? 👇

#NexaraX #AIContent #ContentCreator #ViralMarketing #AITools #SocialMediaGrowth #ContentStrategy #DigitalMarketing #CreativeAI #TechInnovation`,
        hashtags: [
          "#NexaraX",
          "#AIContent",
          "#ContentCreator",
          "#ViralMarketing",
          "#AITools",
          "#SocialMediaGrowth",
          "#ContentStrategy",
          "#DigitalMarketing",
          "#CreativeAI",
          "#TechInnovation",
        ],
        tips: [
          "Post during peak hours (6-9 PM GMT)",
          "Use carousel format for higher engagement",
          "Include a clear call-to-action",
          "Add relevant location tags",
          "Engage with comments within first hour",
        ],
        engagement_hooks: [
          "Double tap if you agree! 👆",
          "Save this for later! 📌",
          "Tag someone who needs this! 👥",
          "What's your biggest content challenge? 💭",
        ],
      },
      {
        platform: "TikTok",
        content: `POV: You discover AI that creates viral content in seconds 🤯

*Shows before/after of content creation*

❌ Spending hours on one post
❌ Running out of ideas
❌ Low engagement rates
❌ Inconsistent posting

✅ AI generates content instantly
✅ Unlimited creative ideas
✅ Viral-optimized posts
✅ Consistent daily content

This is how ${topic} creators are scaling to 100K+ followers 📈

Try NexaraX and watch your content explode! 🚀

#NexaraX #AIContent #ContentHack #ViralTips #CreatorLife #AITools #SocialMediaHack #ContentStrategy #TechTok #CreativeAI`,
        hashtags: [
          "#NexaraX",
          "#AIContent",
          "#ContentHack",
          "#ViralTips",
          "#CreatorLife",
          "#AITools",
          "#SocialMediaHack",
          "#ContentStrategy",
          "#TechTok",
          "#CreativeAI",
        ],
        tips: [
          "Use trending sounds for better reach",
          "Hook viewers in first 3 seconds",
          "Keep videos 15-30 seconds for best performance",
          "Post 1-3 times daily",
          "Use text overlays for accessibility",
        ],
        engagement_hooks: [
          "Comment 'AI' if you want the link! 💬",
          "Which result shocked you most? 😱",
          "Try this and thank me later! 🙏",
          "Follow for more AI hacks! ➕",
        ],
      },
      {
        platform: "Twitter/X",
        content: `🧵 How I used AI to 10x my content output (and you can too)

${topic} creators are sleeping on this...

Here's the exact system I use with @NexaraX:

1/ Generate 50 post ideas in 30 seconds
→ Never run out of content again

2/ Create platform-specific versions
→ One idea becomes 4 optimized posts

3/ AI writes engaging captions
→ Higher engagement, less time

4/ Auto-schedule across platforms
→ Consistent presence without effort

5/ Analyze what works
→ AI learns and improves over time

The result? 300% more engagement, 80% less time spent.

This is the future of content creation.

Get started with NexaraX (link in bio) 🚀

What's your biggest content challenge? 👇`,
        hashtags: [
          "#NexaraX",
          "#AIContent",
          "#ContentStrategy",
          "#TwitterGrowth",
          "#AITools",
          "#SocialMediaTips",
          "#ContentCreation",
          "#DigitalMarketing",
          "#TechTwitter",
          "#CreativeAI",
        ],
        tips: [
          "Use thread format for longer content",
          "Tweet during peak hours (12-3 PM GMT)",
          "Engage with replies quickly",
          "Retweet with added commentary",
          "Use polls for engagement",
        ],
        engagement_hooks: [
          "RT if this helped you! 🔄",
          "What's your experience with AI tools? 💭",
          "Drop a 🚀 if you're trying this!",
          "Follow for more AI insights! ➕",
        ],
      },
      {
        platform: "YouTube",
        content: `🎬 VIDEO TITLE: "I Used AI to Create 30 Days of Content in 30 Minutes (${topic} Game-Changer!)"

📝 DESCRIPTION:
In this video, I'll show you exactly how I used NexaraX to revolutionize my content creation process. If you're struggling with ${topic} content, this AI tool will change everything!

🎯 What You'll Learn:
• How to generate unlimited content ideas with AI
• The exact prompts I use for viral content
• Platform-specific optimization secrets
• How to scale from 1 post to 100+ posts per month
• Real results from my 30-day experiment

⏰ TIMESTAMPS:
00:00 - Introduction
01:30 - The Content Creation Problem
03:15 - NexaraX Demo & Setup
06:45 - Generating Ideas with AI
09:20 - Platform Optimization
12:10 - Scheduling & Automation
15:30 - Results & Analytics
18:00 - Next Steps

🔗 RESOURCES MENTIONED:
• NexaraX Platform: [Link in description]
• Free Content Calendar Template
• AI Prompt Library
• Join our Discord Community

💡 If this video helped you, please LIKE, SUBSCRIBE, and hit the BELL for more AI content creation tips!

#NexaraX #AIContent #ContentCreation #YouTubeGrowth #AITools #SocialMediaStrategy #ContentMarketing #DigitalMarketing #CreativeAI #TechReview`,
        hashtags: [
          "#NexaraX",
          "#AIContent",
          "#ContentCreation",
          "#YouTubeGrowth",
          "#AITools",
          "#SocialMediaStrategy",
          "#ContentMarketing",
          "#DigitalMarketing",
          "#CreativeAI",
          "#TechReview",
        ],
        tips: [
          "Create eye-catching thumbnails",
          "Upload consistently (2-3 times per week)",
          "Optimize for YouTube SEO",
          "Engage with comments actively",
          "Create playlists for better discoverability",
        ],
        engagement_hooks: [
          "What content topic should I cover next?",
          "Share your AI success stories below!",
          "Subscribe for weekly AI tutorials!",
          "Join our community Discord!",
        ],
      },
    ]

    setGeneratedContent(content)
    setIsGenerating(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const platformIcons = {
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
    TikTok: (
      <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-5 w-5 text-blue-500" />,
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-800">🤖 AI Content Generator</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Generate Viral Content for All Platforms
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One topic → Four platform-optimized posts. Let AI create engaging content for Instagram, TikTok, Twitter/X,
            and YouTube.
          </p>
        </div>

        {/* Content Generator */}
        <Card className="mb-8 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-purple-600" />
              AI Content Generator
            </CardTitle>
            <CardDescription>
              Enter your topic and watch AI create platform-specific content that drives engagement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                Content Topic or Theme
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., AI tools for content creators, productivity hacks, social media tips..."
              />
            </div>

            <Button
              onClick={generateContent}
              disabled={isGenerating || !topic.trim()}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Content for All Platforms
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Content */}
        {generatedContent.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">🎉 Your AI-Generated Content is Ready!</h2>
              <p className="text-gray-600">Platform-optimized posts designed to maximize engagement</p>
            </div>

            <Tabs defaultValue="Instagram" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                {generatedContent.map((content) => (
                  <TabsTrigger key={content.platform} value={content.platform} className="flex items-center gap-2">
                    {platformIcons[content.platform as keyof typeof platformIcons]}
                    <span className="hidden sm:inline">{content.platform}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {generatedContent.map((content) => (
                <TabsContent key={content.platform} value={content.platform}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                      <Card className="border-2 border-blue-200">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {platformIcons[content.platform as keyof typeof platformIcons]}
                              {content.platform} Post
                            </div>
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(content.content)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <pre className="whitespace-pre-wrap text-sm font-mono">{content.content}</pre>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Optimization Tips */}
                    <div className="space-y-4">
                      {/* Hashtags */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Hash className="h-5 w-5 text-blue-600" />
                            Hashtags
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {content.hashtags.map((hashtag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {hashtag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Optimization Tips */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            Optimization Tips
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {content.tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* Engagement Hooks */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Sparkles className="h-5 w-5 text-purple-600" />
                            Engagement Hooks
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {content.engagement_hooks.map((hook, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                                {hook}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule All Posts
              </Button>
              <Button variant="outline" size="lg">
                <Download className="h-5 w-5 mr-2" />
                Export Content Calendar
              </Button>
              <Button variant="outline" size="lg">
                <Wand2 className="h-5 w-5 mr-2" />
                Generate More Variations
              </Button>
            </div>
          </div>
        )}

        {/* Features Overview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center border-2 border-pink-100">
            <CardContent className="p-6">
              <Instagram className="h-8 w-8 text-pink-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Instagram Optimization</h3>
              <p className="text-sm text-gray-600">Carousel-ready posts with engagement hooks and trending hashtags</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-gray-100">
            <CardContent className="p-6">
              <div className="h-8 w-8 bg-black rounded-sm flex items-center justify-center text-white text-sm font-bold mx-auto mb-3">
                T
              </div>
              <h3 className="font-semibold mb-2">TikTok Viral Format</h3>
              <p className="text-sm text-gray-600">Hook-heavy content designed for maximum viral potential</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-blue-100">
            <CardContent className="p-6">
              <Twitter className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Twitter/X Threads</h3>
              <p className="text-sm text-gray-600">Thread-optimized content that drives engagement and follows</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-red-100">
            <CardContent className="p-6">
              <Youtube className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">YouTube Scripts</h3>
              <p className="text-sm text-gray-600">Complete video scripts with timestamps and SEO optimization</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
