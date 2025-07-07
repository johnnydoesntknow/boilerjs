import { mockUser } from '@/data/mockData';

export default function ProfilePage() {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-white">
                  {mockUser.username[0].toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-1">{mockUser.username}</h2>
              <p className="text-gray-400 mb-4">Rank #{mockUser.rank}</p>
              
              <div className="w-full space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Member since</span>
                  <span className="text-white">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Discord</span>
                  <span className="text-green-500">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Badges */}
        <div className="lg:col-span-2 space-y-6">
          {/* REP Stats */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">REP Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{mockUser.totalRep.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Total REP</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{mockUser.weeklyRep}</p>
                <p className="text-gray-400 text-sm">This Week</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{mockUser.monthlyRep}</p>
                <p className="text-gray-400 text-sm">This Month</p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Badges ({mockUser.badges})</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🌟</div>
                <p className="text-white text-sm font-medium">Early Adopter</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🤝</div>
                <p className="text-white text-sm font-medium">Helpful</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🔥</div>
                <p className="text-white text-sm font-medium">7 Day Streak</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}