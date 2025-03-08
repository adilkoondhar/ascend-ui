'use client';

// components/Sidebar.jsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
const UserSettingsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M6 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const RoadmapIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const MeetingMinutesIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" />
    <path d="M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M7 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DashboardIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ProjectsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const TasksIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TimeLogIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6v6l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ResourceIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const TemplateIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
    <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="2" />
    <line x1="3" y1="9" x2="9" y2="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const SupportIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" />
    <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function Sidebar({ isOpen, setActiveComponent, activeComponent }) {
  const pathname = usePathname();
  
  // Modified navItems to include meeting minutes and use component switching instead of href for some items
  const navItems = [
    { 
      name: 'Dashboard', 
      icon: DashboardIcon, 
      action: () => setActiveComponent('dashboard'),
      component: 'dashboard'
    },
    { 
      name: 'Meeting Minutes', 
      icon: MeetingMinutesIcon, 
      action: () => setActiveComponent('meetingMinutes'),
      component: 'meetingMinutes'
    },
    {
      name: 'Learning Roadmap', 
      icon: RoadmapIcon, 
      action: () => setActiveComponent('roadmap'),
      component: 'roadmap'
    },
    { 
      name: 'User Settings', 
      icon: UserSettingsIcon, 
      action: () => setActiveComponent('userSettings'),
      component: 'userSettings'
    },
    // Keep the rest of your navigation items with href
    { name: 'Projects', icon: ProjectsIcon, href: '/projects' },
    { name: 'Tasks', icon: TasksIcon, href: '/tasks' },
    { name: 'Time log', icon: TimeLogIcon, href: '/time-log' },
    { name: 'Resource mgnt', icon: ResourceIcon, href: '/resources' },
    { name: 'Users', icon: UsersIcon, href: '/users' },
    { name: 'Project template', icon: TemplateIcon, href: '/project-templates' },
    { name: 'Menu settings', icon: SettingsIcon, href: '/settings' },
  ];
  
  return (
    <div className={`${isOpen ? 'w-60' : 'w-20'} bg-black text-white flex flex-col h-screen transition-all duration-300 ease-in-out overflow-hidden`}>
      {/* Logo */}
      <div className={`${isOpen ? 'py-6 px-4' : 'p-4'} flex items-center ${isOpen ? 'justify-start' : 'justify-center'} transition-all duration-300`}>
      <svg 
  className="w-8 h-8 text-orange-500 transition-transform duration-300" 
  viewBox="0 0 24 24" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Circular outline */}
  <circle 
    cx="12" 
    cy="12" 
    r="9" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
  />
  
  {/* Triangle inside */}
  <path 
    d="M12 7L16.5 15H7.5L12 7Z" 
    fill="currentColor" 
  />
</svg>
        <span className={`text-xl font-semibold transition-opacity duration-300 ${isOpen ? 'opacity-100 ml-3' : 'opacity-0 w-0 overflow-hidden'}`}>Ascend</span>
      </div>
      
      {/* Create New Project Button */}
      <div className={`${isOpen ? 'px-4' : 'px-3'} mb-6 transition-all duration-300`}>
        {isOpen ? (
          <button className="flex items-center justify-start bg-white rounded-full py-3 px-4 w-full hover:bg-opacity-90 transition-all duration-300 cursor-pointer h-12 group">
            <div className="size-8 rounded-full bg-orange-500 flex items-center justify-center mr-3 transition-all duration-300">
              <svg className="w-5 h-5 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-black font-medium text-left leading-none transition-opacity duration-300 delay-75">Create new minutes</span>
          </button>
        ) : (
          <button className="w-14 h-14 rounded-full bg-orange-500 mx-auto flex items-center justify-center transition-all duration-300">
            <svg className="w-6 h-6 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3">
        {navItems.map((item, index) => {
          // Check if this is a component-based navigation or URL-based
          const isActive = item.component 
            ? activeComponent === item.component
            : pathname === item.href;

          return item.component ? (
            // Component-based navigation item (Dashboard, Meeting Minutes)
            <button
              key={item.name}
              onClick={item.action}
              className={`flex items-center ${isOpen ? 'px-4 py-3' : 'py-4 justify-center'} my-1 rounded-full transition-all duration-300 ease-in-out w-full ${
                isActive 
                  ? 'bg-white text-orange-500 cursor-default'
                  : 'text-gray-300 hover:bg-white/10 cursor-pointer'
              }`}
            >
              <span className={`transition-all duration-300 ${isOpen ? 'mr-3' : ''}`}><item.icon /></span>
              <span 
                className={`whitespace-nowrap transition-all duration-300 delay-75 ${
                  isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 overflow-hidden'
                }`}
              >
                {item.name}
              </span>
            </button>
          ) : (
            // URL-based navigation item (remaining nav items)
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center ${isOpen ? 'px-4 py-3' : 'py-4 justify-center'} my-1 rounded-full transition-all duration-300 ease-in-out ${
                isActive 
                  ? 'bg-white text-orange-500'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className={`transition-all duration-300 ${isOpen ? 'mr-3' : ''}`}><item.icon /></span>
              <span 
                className={`whitespace-nowrap transition-all duration-300 delay-75 ${
                  isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 overflow-hidden'
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
      
      {/* Support Button */}
      <div className={`mt-auto mb-6 flex transition-all duration-300 ${isOpen ? 'justify-start pl-4' : 'justify-center'}`}>
        <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300">
          <SupportIcon />
        </button>
      </div>
    </div>
  );
}