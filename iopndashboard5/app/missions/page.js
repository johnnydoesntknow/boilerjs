"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Clock, Trophy, Users, Zap, CheckCircle2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockMissions } from "@/lib/mock-data"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useTheme } from "next-themes"
import { useBadgeMarketplace } from "@/hooks/use-badge-marketplace"
import { useAchievement } from "@/hooks/use-achievement"

export default function MissionsPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const { earnREP } = useBadgeMarketplace()
  const { triggerAchievement } = useAchievement()
  const [missions, setMissions] = useState(mockMissions)
  const [filter, setFilter] = useState("all")

  const completeMission = (missionId) => {
    const mission = missions.find(m => m.id === missionId)
    if (!mission || mission.status === "completed") return

    // Update mission status
    setMissions(missions.map(m => 
      m.id === missionId 
        ? { ...m, status: "completed" }
        : m
    ))

    // Award REP
    earnREP(mission.repReward)

    // Trigger achievement
    triggerAchievement({
      id: `mission_${missionId}`,
      title: `Mission Complete!`,
      description: `+${mission.repReward} REP earned`,
      type: "reward",
    })
  }

  const filteredMissions = missions.filter(mission => {
    if (filter === "all") return true
    if (filter === "available") return mission.status === "available"
    if (filter === "in-progress") return mission.status === "in-progress"
    if (filter === "completed") return mission.status === "completed"
    return mission.type === filter
  })

  const getMissionIcon = (category) => {
    switch (category) {
      case "social": return Users
      case "gaming": return Trophy
      case "referral": return Zap
      default: return Target
    }
  }

  const getMissionColor = (category) => {
    switch (category) {
      case "social": return "text-bright-aqua"
      case "gaming": return "text-violet-indigo"
      case "referral": return "text-amber-rust"
      default: return "text-crimson-red"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
       <div className={`min-h-screen p-4 md:p-8 ${
  theme === "light" ? "bg-white" : "bg-black cyber-grid hex-pattern"
}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-indigo to-bright-aqua bg-clip-text text-transparent mb-4">
                Mission Control
              </h1>
              <p className="text-gray-300 text-lg">
                Complete missions to earn REP and unlock rewards
              </p>
            </div>

            {/* Mission Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-black/60 border-bright-aqua/30 hover:border-bright-aqua/50 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-300">Daily Missions</p>
                      <p className="text-2xl font-bold text-white">
                        {missions.filter(m => m.type === "daily" && m.status !== "completed").length}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-bright-aqua" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-violet-indigo/30 hover:border-violet-indigo/50 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-300">Weekly Missions</p>
                      <p className="text-2xl font-bold text-white">
                        {missions.filter(m => m.type === "weekly" && m.status !== "completed").length}
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-violet-indigo" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-amber-rust/30 hover:border-amber-rust/50 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-300">Total REP Available</p>
                      <p className="text-2xl font-bold text-white">
                        {missions
                          .filter(m => m.status !== "completed")
                          .reduce((sum, m) => sum + m.repReward, 0)}
                      </p>
                    </div>
                    <Zap className="w-8 h-8 text-amber-rust" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 border-crimson-red/30 hover:border-crimson-red/50 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-300">Completed</p>
                      <p className="text-2xl font-bold text-white">
                        {missions.filter(m => m.status === "completed").length}
                      </p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-crimson-red" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mission Tabs */}
            <Card className="holo-card neon-border bg-gradient-to-br from-black/80 to-midnight-indigo/30">
              <CardHeader>
                <CardTitle className="text-white">
                  Available Missions
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Choose your missions and start earning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="special">Special</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <TabsContent value={filter} className="mt-6 space-y-4">
                    {filteredMissions.map((mission) => {
                      const Icon = getMissionIcon(mission.category)
                      const isCompleted = mission.status === "completed"
                      const isInProgress = mission.status === "in-progress"
                      
                      return (
                        <Card
                          key={mission.id}
                          className={`bg-black/60 border-gray-700 hover:border-bright-aqua/50 transition-all ${
                            isCompleted ? "opacity-60" : ""
                          }`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-lg bg-gray-800/50">
                                <Icon className={`w-6 h-6 ${getMissionColor(mission.category)}`} />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="font-semibold text-white">
                                      {mission.title}
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-1">
                                      {mission.description}
                                    </p>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="bg-violet-indigo/20 text-violet-indigo">
                                      +{mission.repReward} REP
                                    </Badge>
                                    {mission.badgeReward && (
                                      <Badge variant="secondary" className="bg-amber-rust/20 text-amber-rust">
                                        {mission.badgeReward}
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                {/* Requirements */}
                                <div className="space-y-2 mb-4">
                                  {mission.requirements.map((req, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm">
                                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                        isCompleted 
                                          ? "bg-green-500 border-green-500" 
                                          : "border-gray-500 bg-gray-800"
                                      }`}>
                                        {isCompleted && (
                                          <CheckCircle2 className="w-3 h-3 text-white" />
                                        )}
                                      </div>
                                      <span className={isCompleted ? "text-gray-400 line-through" : "text-gray-300"}>
                                        {req}
                                      </span>
                                    </div>
                                  ))}
                                </div>

                                {/* Progress (for missions with progress tracking) */}
                                {mission.progress !== undefined && mission.target && (
                                  <div className="mb-4">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                      <span className="text-gray-400">Progress</span>
                                      <span className="text-gray-300">
                                        {mission.progress}/{mission.target}
                                      </span>
                                    </div>
                                    <Progress 
                                      value={(mission.progress / mission.target) * 100} 
                                      className="h-2"
                                    />
                                  </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-300">
                                    <Clock className="w-3 h-3 inline mr-1" />
                                    {mission.timeLimit}
                                  </span>
                                  
                                  <Button
                                    onClick={() => completeMission(mission.id)}
                                    disabled={isCompleted}
                                    size="sm"
                                    className={`${
                                      isCompleted
                                        ? "bg-gray-600"
                                        : "cyber-button bg-gradient-to-r from-violet-indigo to-bright-aqua hover:from-violet-indigo/90 hover:to-bright-aqua/90"
                                    } text-white`}
                                  >
                                    {isCompleted ? (
                                      <>
                                        <CheckCircle2 className="w-4 h-4 mr-1" />
                                        Completed
                                      </>
                                    ) : isInProgress ? (
                                      "Continue"
                                    ) : (
                                      "Start Mission"
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                    
                    {filteredMissions.length === 0 && (
                      <div className="text-center py-12">
                        <Target className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-300">No missions found in this category</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}