'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import OverviewStats from '@/components/OverviewStats';
import MeetingsSummary from '@/components/MeetingsSummary';
import RoadmapsOverview from '@/components/RoadmapsOverview';
import TodayMeetings from '@/components/TodayMeetings';
import MeetingsCalendar from '@/components/MeetingsCalendar';
import MeetingMinutesGenerator from '@/components/MeetingMinutes';
import RoadmapGenerator from '@/components/RoadmapGenerator';
import UserSettings from '@/components/UserSettings';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState('dashboard');
  
  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Initialize sidebar state from localStorage on client side
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarOpen');
    if (savedState !== null) {
      setIsSidebarOpen(savedState === 'true');
    }
  }, []);
  
  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarOpen', isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen bg-[#ebdfd7]">
      {/* Sidebar with variable width */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <DashboardHeader 
          toggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen} 
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        
        {activeComponent === 'dashboard' && (
          <main className="px-8 py-6">
            <h1 className="text-2xl font-medium mb-6">Overview</h1>
            
            {/* Stats Overview Cards */}
            <OverviewStats />
            
            <div className="flex flex-col lg:flex-row gap-6 mt-8">
              {/* Meetings Summary Table */}
              <div className="lg:w-2/3">
                <MeetingsSummary />
              </div>
              
              {/* Roadmaps Overview */}
              <div className="lg:w-1/3">
                <RoadmapsOverview />
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6 mt-8">
              {/* Today's Meetings */}
              <div className="lg:w-2/3">
                <TodayMeetings />
              </div>
              
              {/* Meetings weekly calendar */}
              <div className="lg:w-1/3">
                <MeetingsCalendar />
              </div>
            </div>
          </main>
        )}

        {activeComponent === 'meetingMinutes' && (
          <MeetingMinutesGenerator />
        )}

        {activeComponent === 'roadmap' && (
          <RoadmapGenerator />
        )}

        {activeComponent === 'userSettings' && (
          <UserSettings />
        )}
      </div>
    </div>
  );
}