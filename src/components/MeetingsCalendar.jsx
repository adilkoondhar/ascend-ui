import React from 'react';

const MeetingsCalendar = () => {
  // Days of the week with their meeting counts
  const daysData = [
    {
      name: 'Monday',
      shortName: 'M',
      meetings: [7],
    },
    {
      name: 'Tuesday',
      shortName: 'T',
      meetings: [8],
    },
    {
      name: 'Wednesday',
      shortName: 'W',
      meetings: [5],
    },
    {
      name: 'Thursday',
      shortName: 'T',
      meetings: [10],
    },
    {
      name: 'Friday',
      shortName: 'F',
      meetings: [6],
    },
    {
      name: 'Saturday',
      shortName: 'S',
      meetings: [2],
    },
    {
      name: 'Sunday',
      shortName: 'S',
      meetings: [0],
    }
  ];

  return (
    <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Weekly Meeting Distribution</h2>
        <div className="relative">
          <select className="appearance-none bg-white border-none rounded-2xl shadow-xs py-2 pl-3 pr-8 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>Current Week</option>
            <option>Next Week</option>
            <option>Last Week</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Meeting load visualization */}
      <div className="flex justify-between px-2">
        {daysData.map((day) => (
          <div key={day.name} className="flex flex-col items-center">
            {/* Meeting count bars */}
            <div className="h-32 w-10 flex flex-col-reverse mb-2">
              {day.meetings.map((count, idx) => {
                // Calculate height based on count (max 10 = 100% height)
                const height = Math.min(Math.max((count / 10) * 100, 10), 100);
                // Different color for different count ranges
                let bgColor = 'bg-green-500';
                if (count > 8) bgColor = 'bg-orange-500';
                else if (count > 5) bgColor = 'bg-yellow-500';
                else if (count === 0) bgColor = 'bg-gray-200';
                
                return (
                  <div
                    key={idx}
                    className={`w-full rounded-full ${bgColor}`}
                    style={{ height: `${height}%` }}
                  >
                    {count > 0 && (
                      <div className="flex items-center justify-center h-full text-xs text-white font-bold">
                        {count}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Day label */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm text-gray-600 font-medium">{day.shortName}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-end mt-5 space-x-4 text-xs text-gray-600">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-green-500 rounded-sm mr-1"></div>
          <span>1-5 meetings</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-yellow-500 rounded-sm mr-1"></div>
          <span>6-8 meetings</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-orange-500 rounded-sm mr-1"></div>
          <span>9+ meetings</span>
        </div>
      </div>
    </div>
  );
};

export default MeetingsCalendar;