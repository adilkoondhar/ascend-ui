import React from 'react';

const MeetingHistory = ({ meetings, onSelectMeeting }) => {
  return (
    <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none mb-6">
      <h2 className="text-xl font-medium mb-4">Previous Meetings</h2>
      <div className="space-y-3">
        {meetings.map((meeting) => (
          <div 
            key={meeting.id}
            onClick={() => onSelectMeeting(meeting)}
            className="bg-white rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-orange-50 transition-colors duration-200"
          >
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">{meeting.title}</p>
                <p className="text-gray-500 text-sm">{meeting.date} • {meeting.duration}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{meeting.participants} participants</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingHistory;