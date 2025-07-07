import { mockUser, mockActivity } from '@/data/mockData';
import { RepChart } from '@/components/dashboard/RepChart';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-4">
      {/* Animated Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse">
          Welcome back, {mockUser.username}! 👋
        </h2>
        <p className="text-gray-400">Here's your community overview</p>
      </div>
      
      {/* Stats Grid with Enhanced Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total REP Card - Purple */}
        <div className="group relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-6 rounded-xl border border-purple-700/50 backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <p className="text-purple-300 text-sm mb-2 font-medium">Total REP</p>
            <p className="text-4xl font-bold text-white mb-1">{mockUser.totalRep.toLocaleString()}</p>
            <div className="flex items-center gap-1">
              <span className="text-green-400 text-sm">↑ 12.5%</span>
              <span className="text-xs text-gray-400">this month</span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🏆</div>
        </div>

        {/* Weekly REP Card - Blue */}
        <div className="group relative bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-6 rounded-xl border border-blue-700/50 backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <p className="text-blue-300 text-sm mb-2 font-medium">Weekly REP</p>
            <p className="text-4xl font-bold text-white mb-1">{mockUser.weeklyRep}</p>
            <div className="flex items-center gap-1">
              <span className="text-green-400 text-sm">↑ 8.2%</span>
              <span className="text-xs text-gray-400">vs last week</span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">📈</div>
        </div>

        {/* Monthly REP Card - Green */}
        <div className="group relative bg-gradient-to-br from-emerald-900/50 to-green-900/50 p-6 rounded-xl border border-emerald-700/50 backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <p className="text-emerald-300 text-sm mb-2 font-medium">Monthly REP</p>
            <p className="text-4xl font-bold text-white mb-1">{mockUser.monthlyRep}</p>
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-sm">→ 0%</span>
              <span className="text-xs text-gray-400">no change</span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">💎</div>
        </div>

        {/* Rank Card - Orange */}
        <div className="group relative bg-gradient-to-br from-orange-900/50 to-red-900/50 p-6 rounded-xl border border-orange-700/50 backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <p className="text-orange-300 text-sm mb-2 font-medium">Current Rank</p>
            <p className="text-4xl font-bold text-white mb-1">#{mockUser.rank}</p>
            <div className="flex items-center gap-1">
              <span className="text-green-400 text-sm">↑ 2 positions</span>
              <span className="text-xs text-gray-400">this week</span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🚀</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Feed with Enhanced Effects */}
        <div className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-purple-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Recent Activity
          </h3>
          <div className="space-y-3">
            {mockActivity.map((activity, index) => (
              <div 
                key={activity.id} 
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-700/30 transition-all duration-200 cursor-pointer group/item"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-110 ${
                  index === 0 ? 'gradient-primary animate-pulse' :
                  index === 1 ? 'gradient-info' :
                  index === 2 ? 'gradient-success' :
                  'gradient-danger'
                }`}>
                  <span className="text-white font-bold text-sm">
                    {activity.user[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-white">
                    <span className="font-medium hover:text-purple-400 transition-colors">{activity.user}</span>
                    <span className="text-gray-400"> {activity.action} </span>
                    <span className="text-green-400 font-medium animate-pulse">+{activity.amount} REP</span>
                  </p>
                  <p className="text-gray-400 text-sm">{activity.reason}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats with Enhanced Colors */}
        <div className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-purple-900/20 border border-purple-700/30 hover:bg-purple-900/30 hover:border-purple-600/50 transition-all duration-200 cursor-pointer group/stat">
              <span className="text-purple-300 flex items-center gap-2">
                <span className="text-xl group-hover/stat:animate-bounce">🏆</span>
                Badges Earned
              </span>
              <span className="text-white font-bold text-lg">{mockUser.badges}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-blue-900/20 border border-blue-700/30 hover:bg-blue-900/30 hover:border-blue-600/50 transition-all duration-200 cursor-pointer group/stat">
              <span className="text-blue-300 flex items-center gap-2">
                <span className="text-xl group-hover/stat:animate-bounce">📈</span>
                Percentile
              </span>
              <span className="text-white font-bold text-lg">Top 10%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-orange-900/20 border border-orange-700/30 hover:bg-orange-900/30 hover:border-orange-600/50 transition-all duration-200 cursor-pointer group/stat">
              <span className="text-orange-300 flex items-center gap-2">
                <span className="text-xl group-hover/stat:animate-bounce">🔥</span>
                Current Streak
              </span>
              <span className="text-white font-bold text-lg">7 days</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-900/20 border border-emerald-700/30 hover:bg-emerald-900/30 hover:border-emerald-600/50 transition-all duration-200 cursor-pointer group/stat">
              <span className="text-emerald-300 flex items-center gap-2">
                <span className="text-xl group-hover/stat:animate-bounce">💎</span>
                Next Rank
              </span>
              <span className="text-white font-bold text-lg">300 REP to #4</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-pink-900/20 border border-pink-700/30 hover:bg-pink-900/30 hover:border-pink-600/50 transition-all duration-200 cursor-pointer group/stat">
              <span className="text-pink-300 flex items-center gap-2">
                <span className="text-xl group-hover/stat:animate-bounce">📊</span>
                Weekly Average
              </span>
              <span className="text-white font-bold text-lg">35 REP/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* REP Chart with Enhanced Styling */}
      <div className="mt-8 group">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <RepChart />
        </div>
      </div>
    </main>
  );
}