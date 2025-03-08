import React from 'react';

const RoadmapsOverview = () => {
  // Roadmap statistics
  const stats = {
    totalRoadmaps: 8,
    completed: 3,
    ongoing: 5,
    overallProgress: 58
  };

  return (
    <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Roadmap Progress</h2>
        <div className="relative">
          <select className="appearance-none bg-white border-none rounded-2xl shadow-xs py-2 pl-3 pr-8 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>All Roadmaps</option>
            <option>Last Month</option>
            <option>Last Week</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Progress gauge */}
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          {/* Gauge background */}
          <svg className="w-full h-full" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#EEEEEE"
              strokeWidth="12"
              strokeDasharray="339.3"
              strokeDashoffset="0"
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            {/* Progress arc - orange gradient */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="url(#roadmapGradient)"
              strokeWidth="12"
              strokeDasharray="339.3"
              strokeDashoffset={`${(100 - stats.overallProgress) * 3.393}`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            <defs>
              <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#fdba74" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{stats.overallProgress}%</span>
            <span className="text-sm text-gray-500">Average Progress</span>
          </div>
          
          {/* Gauge markers */}
          <div className="absolute top-0 left-1/2 -ml-px h-2 w-px bg-gray-300"></div>
          <div className="absolute top-1/2 left-0 -mt-px h-px w-2 bg-gray-300"></div>
          <div className="absolute bottom-0 left-1/2 -ml-px h-2 w-px bg-gray-300"></div>
          <div className="absolute top-1/2 right-0 -mt-px h-px w-2 bg-gray-300"></div>
          
          {/* Gauge labels */}
          <div className="absolute top-0 left-1/2 -ml-3 -mt-6 text-xs">0</div>
          <div className="absolute top-1/2 left-0 -ml-6 -mt-3 text-xs">25</div>
          <div className="absolute bottom-0 left-1/2 -ml-3 -mb-6 text-xs">50</div>
          <div className="absolute top-1/2 right-0 -mr-8 -mt-3 text-xs">100</div>
        </div>
      </div>
      
      {/* Stats breakdown */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-semibold">{stats.totalRoadmaps}</div>
          <div className="text-sm text-gray-500">Total Roadmaps</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-green-500">{stats.completed}</div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-orange-500">{stats.ongoing}</div>
          <div className="text-sm text-gray-500">In Progress</div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapsOverview;