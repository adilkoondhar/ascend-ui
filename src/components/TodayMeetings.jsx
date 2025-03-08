'use client';

import React, { useState } from 'react';

const TodayMeetings = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Product Design Weekly Sync',
      time: '09:30 - 10:30',
      participants: 5,
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Marketing Campaign Review',
      time: '11:00 - 12:00',
      participants: 3,
      status: 'In progress'
    },
    {
      id: 3,
      title: 'Client Project Update',
      time: '13:30 - 14:30',
      participants: 7,
      status: 'Upcoming'
    },
    {
      id: 4,
      title: 'Team Retrospective',
      time: '15:00 - 16:00',
      participants: 9,
      status: 'Upcoming'
    },
    {
      id: 5,
      title: 'Engineering Standup',
      time: '16:30 - 17:00',
      participants: 6,
      status: 'Upcoming'
    }
  ]);

  // Function to get the appropriate background color for status badges
  const getStatusBgColor = (status) => {
    switch (status) {
      case 'In progress':
        return 'bg-green-100 text-green-800';
      case 'Upcoming':
        return 'bg-orange-100 text-orange-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { name: 'Today', count: 5 },
    { name: 'Tomorrow', count: 3 },
    { name: 'This Week', count: 12 },
    { name: 'All', count: null }
  ];

  return (
    <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none mb-6">
      <h2 className="text-xl font-medium mb-4">Today's Meetings</h2>
      
      {/* Tabs */}
      <div className="flex border-b mb-6 border-[#dad3ce]">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`px-4 py-2 text-sm relative h-12 ${
              activeTab === tab.name
                ? 'border-b-2 border-orange-500'
                : 'text-gray-600 hover:text-gray-800 cursor-pointer'
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
            {tab.count && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full bg-[#dedce5] text-orange-600 size-6">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
      
      {/* Meeting list */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className='border-b border-[#dad3ce]'>
            <tr>
              <th className="text-left text-sm font-medium text-gray-600 py-3">Meeting</th>
              <th className="text-left text-sm font-medium text-gray-600 py-3">Time</th>
              <th className="text-left text-sm font-medium text-gray-600 py-3">Participants</th>
              <th className="text-left text-sm font-medium text-gray-600 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.id} className="border-b border-[#dad3ce] last:border-0">
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-orange-500 rounded-full mr-3"></div>
                    {meeting.title}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {meeting.time}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {meeting.participants}
                  </div>
                </td>
                <td className="py-4">
                  <span className={`inline-block px-2 py-1 text-xs rounded-md ${getStatusBgColor(meeting.status)}`}>
                    {meeting.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayMeetings;