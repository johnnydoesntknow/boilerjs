import { mockLeaderboard } from '@/data/mockData';

export default function LeaderboardPage() {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Community Leaderboard</h1>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Total REP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Weekly REP
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {mockLeaderboard.map((user) => (
              <tr key={user.rank} className="hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-lg font-bold text-white">#{user.rank}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-white">{user.username}</span>
                  {user.username === 'DemoUser' && (
                    <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">You</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-white font-medium">{user.totalRep.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-300">{user.weeklyRep}</span>
                  {user.change === 'up' && <span className="ml-2 text-green-500">↑</span>}
                  {user.change === 'down' && <span className="ml-2 text-red-500">↓</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}