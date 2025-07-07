'use client';

export function RepChart() {
  // Data for each day showing REP source breakdown
  const weekData = [
    {
      day: 'Mon',
      total: 180,
      sources: [
        { name: 'Discord Activity', value: 80, color: '#15BFC2' },
        { name: 'Community Help', value: 50, color: '#7D40B6' },
        { name: 'Content Creation', value: 30, color: '#CB121C' },
        { name: 'Event Participation', value: 20, color: '#CA6B0D' },
      ]
    },
    {
      day: 'Tue',
      total: 220,
      sources: [
        { name: 'Discord Activity', value: 90, color: '#15BFC2' },
        { name: 'Community Help', value: 70, color: '#7D40B6' },
        { name: 'Content Creation', value: 40, color: '#CB121C' },
        { name: 'Event Participation', value: 20, color: '#CA6B0D' },
      ]
    },
    {
      day: 'Wed',
      total: 200,
      sources: [
        { name: 'Discord Activity', value: 70, color: '#15BFC2' },
        { name: 'Community Help', value: 60, color: '#7D40B6' },
        { name: 'Content Creation', value: 50, color: '#CB121C' },
        { name: 'Event Participation', value: 20, color: '#CA6B0D' },
      ]
    },
    {
      day: 'Thu',
      total: 250,
      sources: [
        { name: 'Discord Activity', value: 100, color: '#15BFC2' },
        { name: 'Community Help', value: 80, color: '#7D40B6' },
        { name: 'Content Creation', value: 50, color: '#CB121C' },
        { name: 'Event Participation', value: 20, color: '#CA6B0D' },
      ]
    },
    {
      day: 'Fri',
      total: 230,
      sources: [
        { name: 'Discord Activity', value: 90, color: '#15BFC2' },
        { name: 'Community Help', value: 70, color: '#7D40B6' },
        { name: 'Content Creation', value: 40, color: '#CB121C' },
        { name: 'Event Participation', value: 30, color: '#CA6B0D' },
      ]
    },
    {
      day: 'Sat',
      total: 280,
      sources: [
        { name: 'Discord Activity', value: 120, color: '#15BFC2' },
        { name: 'Community Help', value: 80, color: '#7D40B6' },
        { name: 'Content Creation', value: 50, color: '#CB121C' },
        { name: 'Event Participation', value: 30, color: '#CA6B0D' },
      ]
    },
    {
      day: 'Sun',
      total: 250,
      sources: [
        { name: 'Discord Activity', value: 100, color: '#15BFC2' },
        { name: 'Community Help', value: 70, color: '#7D40B6' },
        { name: 'Content Creation', value: 50, color: '#CB121C' },
        { name: 'Event Participation', value: 30, color: '#CA6B0D' },
      ]
    },
  ];

  // Function to create mini pie chart
  const createMiniPieChart = (sources: any[]) => {
    let cumulativePercentage = 0;
    const total = sources.reduce((sum, item) => sum + item.value, 0);

    return sources.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const startAngle = (cumulativePercentage * 360) / 100;
      const endAngle = ((cumulativePercentage + percentage) * 360) / 100;
      const largeArcFlag = percentage > 50 ? 1 : 0;

      const startX = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
      const startY = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
      const endX = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
      const endY = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);

      const path = `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
      
      cumulativePercentage += percentage;

      return (
        <path
          key={index}
          d={path}
          fill={item.color}
          className="hover:opacity-80 transition-opacity duration-200"
          stroke="#1f2937"
          strokeWidth="0.5"
        />
      );
    });
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-6">REP Earned This Week</h3>
      
      {/* 7 Mini Pie Charts */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {weekData.map((dayData, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Mini Pie Chart */}
            <div className="relative w-20 h-20 mb-2 group">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 group-hover:scale-110 transition-transform">
                {createMiniPieChart(dayData.sources)}
              </svg>
              {/* Center total */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xs font-bold text-white">{dayData.total}</p>
              </div>
            </div>
            {/* Day label */}
            <p className="text-sm text-gray-400">{dayData.day}</p>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="border-t border-gray-700 pt-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#15BFC2' }} />
            <span className="text-xs text-gray-300">Discord Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#7D40B6' }} />
            <span className="text-xs text-gray-300">Community Help</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#CB121C' }} />
            <span className="text-xs text-gray-300">Content Creation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#CA6B0D' }} />
            <span className="text-xs text-gray-300">Event Participation</span>
          </div>
        </div>
      </div>
    </div>
  );
}