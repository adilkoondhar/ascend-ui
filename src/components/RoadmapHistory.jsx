import React from 'react';

const RoadmapHistory = ({ roadmaps, onSelectRoadmap }) => {
  return (
    <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none mb-6">
      <h2 className="text-xl font-medium mb-4">Previous Roadmaps</h2>
      <div className="space-y-3">
        {roadmaps.map((roadmap) => (
          <div 
            key={roadmap.id}
            onClick={() => onSelectRoadmap(roadmap)}
            className="bg-white rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-orange-50 transition-colors duration-200"
          >
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium">{roadmap.skill}</p>
                <p className="text-gray-500 text-sm">Created on {roadmap.date} • {roadmap.totalSteps} steps</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${roadmap.completionPercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">{roadmap.completionPercentage}%</span>
              </div>
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

export default RoadmapHistory;