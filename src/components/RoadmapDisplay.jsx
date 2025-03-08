import React, { useState, useEffect, useRef } from 'react';
import RoadmapGraph from './RoadmapGraph';

const RoadmapDisplay = ({ roadmap, onUpdate, onDelete, onNodeCompletionChange }) => {
  const [completedNodes, setCompletedNodes] = useState(roadmap.completedNodes || 0);
  const isInitialRender = useRef(true);
  
  // Sync local state with incoming props, but only when roadmap.completedNodes actually changes
  useEffect(() => {
    if (roadmap.completedNodes !== completedNodes) {
      setCompletedNodes(roadmap.completedNodes || 0);
    }
  }, [roadmap.completedNodes]);

  // Only call onUpdate when completedNodes changes after initial render
  const handleNodeCompletionChange = (completedCount, totalCount, completedNodeIds) => {
    setCompletedNodes(completedCount);
    
    // Always pass the node IDs even on initial render to ensure proper synchronization
    if (onNodeCompletionChange) {
      onNodeCompletionChange(completedCount, totalCount, completedNodeIds);
    }
    
    if (!isInitialRender.current && onUpdate) {
      const newPercentage = Math.round((completedCount / totalCount) * 100);
      onUpdate({ 
        ...roadmap, 
        completedNodes: completedCount,
        completionPercentage: newPercentage,
        nodes: completedNodeIds // Save the IDs of completed nodes
      });
    }
    
    // After first render, set flag to false
    if (isInitialRender.current) {
      isInitialRender.current = false;
    }
  };

  // Calculate completion percentage based on roadmap.completionPercentage
  const completionPercentage = roadmap.completionPercentage || 0;

  return (
    <div className="space-y-6">
      <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Roadmap for {roadmap.skill}</h2>
          <div className="flex space-x-2">
            <button 
              onClick={onDelete}
              className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
              title="Delete roadmap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600">Created on {roadmap.date}</p>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-gray-600 mr-2">Progress:</span>
            <div className="w-48 bg-gray-200 rounded-full h-2 mr-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">{completionPercentage}%</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Prerequisites</h3>
          <div className="flex flex-wrap gap-2">
            {roadmap.existingSkills && roadmap.existingSkills.map((skill, index) => (
              <div key={index} className="bg-white px-3 py-1 rounded-full text-sm">
                {skill}
              </div>
            ))}
            {(!roadmap.existingSkills || roadmap.existingSkills.length === 0) && (
              <p className="text-gray-500 text-sm">No prerequisites specified</p>
            )}
          </div>
        </div>
      </div>

      {/* Graph visualization */}
      <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none">
        <h2 className="text-xl font-medium mb-4">Roadmap Visualization</h2>
        <RoadmapGraph 
          onNodeCompletionChange={handleNodeCompletionChange} 
          initialCompleted={roadmap.nodes || []} 
          key={`roadmap-${roadmap.id || 'current'}-${JSON.stringify(roadmap.nodes || [])}`}  
        />
      </div>
    </div>
  );
};

export default RoadmapDisplay;