"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, TrendingUp, Users, Star, Crown, Award } from "lucide-react"
import { mockLeaderboard, getUserRank, getPointsToTop50 } from "@/lib/mock-data"
import { useBadgeMarketplace } from "@/hooks/use-badge-marketplace"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useTheme } from "next-themes"

export default function LeaderboardPage() {
  const { theme } = useTheme()
  const { userREP } = useBadgeMarketplace()
  const [timeFilter, setTimeFilter] = useState("all")
  
  const userRank = getUserRank("1") // Current user's rank
  const pointsToTop50 = getPointsToTop50(userREP)
  
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return Crown
      case 2: return Medal
      case 3: return Award
      default: return Trophy
    }
  }
  
  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return "text-yellow-500"
      case 2: return "text-gray-400"
      case 3: return "text-orange-600"
      default: return "text-gray-600"
    }
  }
  
  const getRankBgColor = (rank) => {
    switch (rank) {
      case 1: return "from-yellow-500/20 to-yellow-600/20"
      case 2: return "from-gray-400/20 to-gray-500/20"
      case 3: return "from-orange-500/20 to-orange-600/20"
      default: return "from-gray-600/10 to-gray-700/10"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-black cyber-grid hex-pattern p-4 md:p-8">
          {/* Sidebar Trigger */}
          <div className="absolute top-4 left-4 z-50">
            <SidebarTrigger className="text-bright-aqua hover:text-white" />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-indigo to-bright-aqua bg-clip-text text-transparent mb-4">
                Global Leaderboard
              </h1>
              <p className="text-gray-400 text-lg">
                Compete with the best in the IOPn community
              </p>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className={`${
                theme === "light" 
                  ? "bg-white border-gray-200" 
                  : "bg-black/60 border-bright-aqua/20"
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Your Rank</p>
                      <p className="text-2xl font-bold text-bright-aqua">#{userRank}</p>
                    </div>
                    <Trophy className="w-8 h-8 text-bright-aqua" />
                  </div>
                </CardContent>
              </Card>

              <Card className={`${
                theme === "light" 
                  ? "bg-white border-gray-200" 
                  : "bg-black/60 border-violet-indigo/20"
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total REP</p>
                      <p className="text-2xl font-bold text-violet-indigo">
                        {userREP.toLocaleString()}
                      </p>
                    </div>
                    <Star className="w-8 h-8 text-violet-indigo" />
                  </div>
                </CardContent>
              </Card>

              <Card className={`${
                theme === "light" 
                  ? "bg-white border-gray-200" 
                  : "bg-black/60 border-amber-rust/20"
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Weekly Points</p>
                      <p className="text-2xl font-bold text-amber-rust">5</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-amber-rust" />
                  </div>
                </CardContent>
              </Card>

              <Card className={`${
                theme === "light" 
                  ? "bg-white border-gray-200" 
                  : "bg-black/60 border-crimson-red/20"
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">To Top 50</p>
                      <p className="text-2xl font-bold text-crimson-red">
                        {pointsToTop50 > 0 ? `${pointsToTop50} REP` : "You're in!"}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-crimson-red" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top 3 Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {mockLeaderboard.slice(0, 3).map((player, index) => {
                const Icon = getRankIcon(index + 1)
                return (
                  <Card
                    key={player.id}
                    className={`relative overflow-hidden ${
                      theme === "light"
                        ? "bg-white border-gray-200 shadow-xl"
                        : `holo-card neon-border ${
                            index === 0 ? "ring-2 ring-yellow-500" :
                            index === 1 ? "ring-2 ring-gray-400" :
                            "ring-2 ring-orange-600"
                          }`
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${getRankBgColor(index + 1)} opacity-50`} />
                    <CardContent className="relative p-6 text-center">
                      <Icon className={`w-12 h-12 mx-auto mb-3 ${getRankColor(index + 1)}`} />
                      <h3 className={`font-bold text-xl mb-1 ${
                        theme === "light" ? "text-gray-800" : "text-white"
                      }`}>
                        {player.name}
                      </h3>
                      <p className="text-3xl font-bold text-bright-aqua mb-2">
                        {player.totalPoints.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400 mb-3">Total REP</p>
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant="secondary" className="bg-violet-indigo/20 text-violet-indigo">
                          {player.badges} Badges
                        </Badge>
                        <Badge variant="secondary" className="bg-amber-rust/20 text-amber-rust">
                          +{player.weeklyPoints} Weekly
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Full Leaderboard */}
            <Card className={`${
              theme === "light" 
                ? "bg-white border-gray-200 shadow-xl" 
                : "holo-card neon-border"
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={theme === "light" ? "text-gray-800" : "text-white"}>
                      Rankings
                    </CardTitle>
                    <CardDescription className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
                      Top players in the IOPn ecosystem
                    </CardDescription>
                  </div>
                  <Tabs value={timeFilter} onValueChange={setTimeFilter}>
                    <TabsList>
                      <TabsTrigger value="all">All Time</TabsTrigger>
                      <TabsTrigger value="weekly">This Week</TabsTrigger>
                      <TabsTrigger value="monthly">This Month</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* Table Header */}
                  <div className={`grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}>
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">Player</div>
                    <div className="col-span-2 text-right">Total REP</div>
                    <div className="col-span-2 text-right">Weekly</div>
                    <div className="col-span-2 text-right">Badges</div>
                  </div>

                  {/* Leaderboard Rows */}
                  {mockLeaderboard.slice(0, 50).map((player) => {
                    const Icon = getRankIcon(player.rank)
                    const isCurrentUser = player.isUser
                    
                    return (
                      <div
                        key={player.id}
                        className={`grid grid-cols-12 gap-4 px-4 py-3 rounded-lg transition-all ${
                          isCurrentUser
                            ? theme === "light"
                              ? "bg-blue-50 border border-blue-200"
                              : "bg-violet-indigo/10 border border-violet-indigo/30"
                            : theme === "light"
                              ? "hover:bg-gray-50"
                              : "hover:bg-gray-900/50"
                        }`}
                      >
                        <div className="col-span-1 flex items-center">
                          {player.rank <= 3 ? (
                            <Icon className={`w-5 h-5 ${getRankColor(player.rank)}`} />
                          ) : (
                            <span className={`font-medium ${
                              theme === "light" ? "text-gray-700" : "text-gray-300"
                            }`}>
                              #{player.rank}
                            </span>
                          )}
                        </div>
                        
                        <div className="col-span-5 flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                            player.rank === 1 ? "from-yellow-400 to-yellow-600" :
                            player.rank === 2 ? "from-gray-300 to-gray-500" :
                            player.rank === 3 ? "from-orange-400 to-orange-600" :
                            "from-violet-indigo to-bright-aqua"
                          } flex items-center justify-center`}>
                            <span className="text-white font-semibold text-xs">
                              {player.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className={`font-medium ${
                              theme === "light" ? "text-gray-800" : "text-white"
                            }`}>
                              {player.name}
                              {isCurrentUser && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  You
                                </Badge>
                              )}
                            </p>
                          </div>
                        </div>
                        
                        <div className="col-span-2 text-right">
                          <p className="font-semibold text-bright-aqua">
                            {player.totalPoints.toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="col-span-2 text-right">
                          <p className={`font-medium ${
                            player.weeklyPoints > 0 ? "text-green-500" : "text-gray-500"
                          }`}>
                            {player.weeklyPoints > 0 ? `+${player.weeklyPoints}` : "-"}
                          </p>
                        </div>
                        
                        <div className="col-span-2 text-right">
                          <Badge variant="secondary" className="bg-violet-indigo/20 text-violet-indigo">
                            {player.badges}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Load More */}
                <div className="text-center mt-6">
                  <Button
                    variant="outline"
                    className={theme === "light" ? "" : "border-bright-aqua/50 hover:bg-bright-aqua/10"}
                  >
                    Load More Players
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}