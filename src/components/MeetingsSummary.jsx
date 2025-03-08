'use client';

import React, { useState } from 'react';

const MeetingsSummary = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      name: 'Product Roadmap Review',
      organizer: 'Alex Meian',
      date: 'March 5, 2025',
      status: 'Completed',
      transcriptGenerated: true,
      minutesGenerated: true
    },
    {
      id: 2,
      name: 'Q1 Planning Session',
      organizer: 'Sarah Johnson',
      date: 'March 3, 2025',
      status: 'Processing',
      transcriptGenerated: true,
      minutesGenerated: false
    },
    {
      id: 3,
      name: 'UX Design Workshop',
      organizer: 'Michael Chen',
      date: 'February 28, 2025',
      status: 'Completed',
      transcriptGenerated: true,
      minutesGenerated: true
    },
    {
      id: 4,
      name: 'Sprint Retrospective',
      organizer: 'Emily Davis',
      date: 'February 25, 2025',
      status: 'Pending',
      transcriptGenerated: false,
      minutesGenerated: false
    },
    {
      id: 5,
      name: 'Marketing Strategy Session',
      organizer: 'Robert Wilson',
      date: 'February 20, 2025',
      status: 'Completed',
      transcriptGenerated: true,
      minutesGenerated: true
    }
  ]);

  // Function to get the appropriate background color for status badges
  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Meeting Summary</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <select className="appearance-none bg-white border border-none rounded-2xl shadow-xs py-2 pl-3 pr-8 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>All Meetings</option>
              <option>This Week</option>
              <option>Last Week</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <select className="appearance-none bg-white border border-none rounded-2xl shadow-xs py-2 pl-3 pr-8 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>All Organizers</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <select className="appearance-none bg-white border border-none rounded-2xl shadow-xs py-2 pl-3 pr-8 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Status</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className='border-b border-[#dad3ce]'>
            <tr>
              <th className="text-left text-sm font-medium text-gray-600 py-3">Meeting</th>
              <th className="text-left text-sm font-medium text-gray-600 py-3">Organizer</th>
              <th className="text-left text-sm font-medium text-gray-600 py-3">Date</th>
              <th className="text-left text-sm font-medium text-gray-600 py-3">Status</th>
              <th className="text-left text-sm font-medium text-gray-600 py-3">Transcript</th>
              <th className="text-left text-sm font-medium text-gray-600 py-3">Minutes</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.id} className="border-b border-[#dad3ce] last:border-0">
                <td className="py-4">{meeting.name}</td>
                <td className="py-4">{meeting.organizer}</td>
                <td className="py-4">{meeting.date}</td>
                <td className="py-4">
                  <span className={`inline-block px-2 py-1 text-xs rounded-md ${getStatusBgColor(meeting.status)}`}>
                    {meeting.status}
                  </span>
                </td>
                <td className="py-4">
                  {meeting.transcriptGenerated ? (
                    <span className="inline-flex items-center text-green-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Generated
                    </span>
                  ) : (
                    <span className="text-gray-500">Pending</span>
                  )}
                </td>
                <td className="py-4">
                  {meeting.minutesGenerated ? (
                    <span className="inline-flex items-center text-green-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Generated
                    </span>
                  ) : (
                    <button className="px-3 py-1 bg-orange-500 text-white text-xs rounded-md hover:bg-orange-600 transition-colors">
                      Generate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingsSummary;