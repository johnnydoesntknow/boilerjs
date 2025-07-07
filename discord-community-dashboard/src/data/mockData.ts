export const mockUser = {
  username: "DemoUser",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser",
  totalRep: 1500,
  weeklyRep: 250,
  monthlyRep: 800,
  rank: 5,
  badges: 3,
};

export const mockLeaderboard = [
  { rank: 1, username: 'AlphaWolf', totalRep: 5000, weeklyRep: 800, change: 'up' },
  { rank: 2, username: 'CryptoKing', totalRep: 3200, weeklyRep: 450, change: 'up' },
  { rank: 3, username: 'TechGuru', totalRep: 2800, weeklyRep: 350, change: 'down' },
  { rank: 4, username: 'PixelMaster', totalRep: 2100, weeklyRep: 300, change: 'same' },
  { rank: 5, username: 'DemoUser', totalRep: 1500, weeklyRep: 250, change: 'up' },
  { rank: 6, username: 'MoonRider', totalRep: 1200, weeklyRep: 200, change: 'down' },
  { rank: 7, username: 'CodeNinja', totalRep: 1000, weeklyRep: 150, change: 'up' },
  { rank: 8, username: 'StarGazer', totalRep: 900, weeklyRep: 120, change: 'same' },
  { rank: 9, username: 'CryptoWhale', totalRep: 850, weeklyRep: 100, change: 'up' },
  { rank: 10, username: 'DiamondHands', totalRep: 800, weeklyRep: 90, change: 'down' },
];

export const mockActivity = [
  { id: '1', user: 'DemoUser', action: 'earned', amount: 50, reason: 'Helped a new member', time: '30m ago' },
  { id: '2', user: 'CryptoKing', action: 'earned', amount: 100, reason: 'Created helpful guide', time: '2h ago' },
  { id: '3', user: 'AlphaWolf', action: 'earned', amount: 75, reason: 'Active in voice chat', time: '5h ago' },
  { id: '4', user: 'TechGuru', action: 'earned', amount: 25, reason: 'Daily activity bonus', time: '12h ago' },
];