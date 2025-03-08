// components/OverviewStats.jsx
export default function OverviewStats() {
  const stats = [
    {
      title: 'Learning Roadmaps',
      value: '8',
      change: { value: '3', direction: 'up', text: 'new this month' },
      icon: (
        <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      )
    },
    {
      title: 'Total Meetings',
      value: '37',
      change: { value: '12%', direction: 'up', text: 'increase from last month' },
      icon: (
        <div className="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      )
    },
    {
      title: 'Upcoming Meetings',
      value: '5',
      subtitle: 'this week',
      change: { value: '2', direction: 'up', text: 'more than last week' },
      icon: (
        <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
          </svg>
        </div>
      )
    },
    {
      title: 'Time Saved',
      value: '48',
      subtitle: 'hours',
      change: { value: '15%', direction: 'up', text: 'increase from last month' },
      icon: (
        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
          </svg>
        </div>
      )
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none">
          <div className="flex flex-col items-start justify-between">
            {stat.icon}
            <span className="text-sm text-gray-500 mt-4">{stat.title}</span>
          </div>
          
          <div className="mt-1">
            <div className="flex items-end">
              <span className="text-3xl font-bold">{stat.value}</span>
              {stat.subtitle && <span className="text-gray-500 ml-1">{stat.subtitle}</span>}
            </div>
            
            <div className="flex items-center mt-2">
              <svg 
                className={`w-4 h-4 ${stat.change.direction === 'up' ? 'text-green-500 rotate-45' : 'text-red-500 rotate-135'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className={`text-sm ml-1`}>
                {stat.change.value} {stat.change.text}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}