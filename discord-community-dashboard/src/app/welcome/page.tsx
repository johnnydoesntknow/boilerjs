import Link from 'next/link';

export default function WelcomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Welcome to IOPn Community
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Track your REP points, climb the leaderboard, and engage with our amazing Discord community.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            View Dashboard
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-lg font-semibold text-white mb-2">Earn REP Points</h3>
            <p className="text-gray-400">Contribute to the community and watch your reputation grow</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-white mb-2">Track Progress</h3>
            <p className="text-gray-400">Monitor your stats and see how you rank against others</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold text-white mb-2">Connect & Grow</h3>
            <p className="text-gray-400">Join a thriving community of engaged members</p>
          </div>
        </div>
      </div>
    </main>
  );
}