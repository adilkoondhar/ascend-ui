'use client';

import React, { useState, useCallback, useRef } from 'react';
import RoadmapGraph from './RoadmapGraph';
import RoadmapHistory from './RoadmapHistory';
import RoadmapDisplay from './RoadmapDisplay';

const RoadmapGenerator = () => {
  const [skillToLearn, setSkillToLearn] = useState('');
  const [existingSkills, setExistingSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [showHistoryView, setShowHistoryView] = useState(true);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const isUpdatingRef = useRef(false);

  // Sample data for previous roadmaps
  const [previousRoadmaps, setPreviousRoadmaps] = useState([
    {
      id: 1,
      skill: "React Development",
      date: "March 1, 2025",
      totalSteps: 6,
      completionPercentage: 67,
      completedNodes: 4,
      existingSkills: ["HTML", "CSS", "JavaScript"],
      steps: [
        { id: 1, title: 'React Fundamentals', duration: '2 weeks', completed: true },
        { id: 2, title: 'Component Architecture', duration: '3 weeks', completed: true },
        { id: 3, title: 'State Management', duration: '3 weeks', completed: true },
        { id: 4, title: 'Hooks and Context API', duration: '2 weeks', completed: true },
        { id: 5, title: 'Performance Optimization', duration: '2 weeks', completed: false },
        { id: 6, title: 'Advanced Patterns', duration: '3 weeks', completed: false }
      ],
      nodes: ['readFileApi', 'bundleApi', 'readFileSdk', 'bundleSdk']
    },
    {
      id: 2,
      skill: "Machine Learning",
      date: "February 20, 2025",
      totalSteps: 6,
      completionPercentage: 33,
      completedNodes: 2,
      existingSkills: ["Python", "Statistics"],
      steps: [
        { id: 1, title: 'Data Preprocessing', duration: '2 weeks', completed: true },
        { id: 2, title: 'Supervised Learning', duration: '4 weeks', completed: true },
        { id: 3, title: 'Unsupervised Learning', duration: '3 weeks', completed: false },
        { id: 4, title: 'Neural Networks', duration: '4 weeks', completed: false },
        { id: 5, title: 'Deep Learning', duration: '5 weeks', completed: false },
        { id: 6, title: 'Model Deployment', duration: '2 weeks', completed: false }
      ],
      nodes: ['readFileApi', 'bundleApi']
    }
  ]);

  const handleAddSkill = () => {
    if (currentSkill.trim() !== '' && !existingSkills.includes(currentSkill.trim())) {
      setExistingSkills([...existingSkills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setExistingSkills(existingSkills.filter(skill => skill !== skillToRemove));
  };

  const handleGenerateRoadmap = () => {
    if (skillToLearn.trim() === '') return;
    
    setIsGenerating(true);
    // Simulate API call with timeout
    setTimeout(() => {
      const newRoadmap = {
        id: Date.now(), // Use timestamp as unique ID
        skill: skillToLearn,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        totalSteps: 6,
        completionPercentage: 0,
        completedNodes: 0,
        existingSkills: [...existingSkills],
        steps: [
          { id: 1, title: 'Fundamentals', duration: '2 weeks', completed: false },
          { id: 2, title: 'Basic Concepts', duration: '3 weeks', completed: false },
          { id: 3, title: 'Intermediate Topics', duration: '4 weeks', completed: false },
          { id: 4, title: 'Advanced Techniques', duration: '5 weeks', completed: false },
          { id: 5, title: 'Real-world Projects', duration: '6 weeks', completed: false },
          { id: 6, title: 'Expert Level', duration: '4 weeks', completed: false }
        ],
        nodes: []
      };
      
      // Automatically save the roadmap to previousRoadmaps
      setPreviousRoadmaps([newRoadmap, ...previousRoadmaps]);
      
      // Show roadmap detail view
      setSelectedRoadmap(newRoadmap);
      setIsGenerating(false);
      setShowHistoryView(false);
      
      // Reset form
      setSkillToLearn('');
      setExistingSkills([]);
    }, 1500);
  };

  // Handle node completion from graph
  // Handle node completion from graph
  const handleNodeCompletion = useCallback((completedCount, totalCount, completedNodeIds) => {
    // Use a ref to prevent update loops
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    
    // Calculate the new percentage
    const newPercentage = Math.round((completedCount / totalCount) * 100);
    
    // Update the roadmap based on which one is active
    if (selectedRoadmap) {
      // Update in previousRoadmaps array
      setPreviousRoadmaps(prevRoadmaps => 
        prevRoadmaps.map(r => {
          if (r.id === selectedRoadmap.id) {
            return {
              ...r,
              completionPercentage: newPercentage,
              completedNodes: completedCount,
              nodes: completedNodeIds // Save the IDs of completed nodes
            };
          }
          return r;
        })
      );
      
      // Update selectedRoadmap state
      setSelectedRoadmap(prev => ({
        ...prev,
        completionPercentage: newPercentage,
        completedNodes: completedCount,
        nodes: completedNodeIds // Save the IDs of completed nodes
      }));
    } else if (roadmap) {
      // Update current roadmap
      setRoadmap(prev => ({
        ...prev,
        completionPercentage: newPercentage,
        completedNodes: completedCount,
        nodes: completedNodeIds // Save the IDs of completed nodes
      }));
    }
    
    // Reset the ref after a short delay
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 0);
  }, [selectedRoadmap, roadmap]);

  const handleSelectRoadmap = (roadmap) => {
    setSelectedRoadmap(roadmap);
    setShowHistoryView(false);
  };
  
  const handleBackToHistory = () => {
    setShowHistoryView(true);
    setSelectedRoadmap(null);
    setRoadmap(null);
  };

  const handleDeleteRoadmap = (roadmapId) => {
    if (roadmapId) {
      setPreviousRoadmaps(previousRoadmaps.filter(r => r.id !== roadmapId));
      setSelectedRoadmap(null);
      setShowHistoryView(true);
    } else {
      // It's the newly generated roadmap
      setRoadmap(null);
      setShowHistoryView(true);
    }
  };

  const handleUpdateRoadmap = (updatedRoadmap) => {
    // Use the ref to prevent update loops
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    
    if (selectedRoadmap) {
      // Update existing roadmap
      setPreviousRoadmaps(prevRoadmaps => 
        prevRoadmaps.map(r => r.id === updatedRoadmap.id ? updatedRoadmap : r)
      );
      setSelectedRoadmap(updatedRoadmap);
    } else if (roadmap) {
      // Update current roadmap
      setRoadmap(updatedRoadmap);
    }
    
    // Reset the ref after updates are processed
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 0);
  };

  const handleSaveRoadmap = () => {
    if (roadmap) {
      setPreviousRoadmaps([roadmap, ...previousRoadmaps]);
      setRoadmap(null);
      setShowHistoryView(true);
      // Reset form
      setSkillToLearn('');
      setExistingSkills([]);
    }
  };

  return (
    <main className="px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Learning Roadmap Generator</h1>
        {!showHistoryView && (
          <button 
            onClick={handleBackToHistory}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-xs hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to all roadmaps</span>
          </button>
        )}
      </div>
      
      {showHistoryView ? (
        <>
          {/* Form to create new roadmap */}
          <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none mb-6">
            <div className="mb-6">
              <label htmlFor="skillToLearn" className="block text-gray-700 text-sm font-medium mb-2">
                What skill do you want to learn?
              </label>
              <input
                type="text"
                id="skillToLearn"
                className="w-full p-3 bg-white border-none rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g. React, Machine Learning, Photography"
                value={skillToLearn}
                onChange={(e) => setSkillToLearn(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Skills you already know (optional)
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  className="flex-1 p-3 bg-white border-none rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500 mr-2"
                  placeholder="e.g. HTML, CSS, JavaScript"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600 transition-colors"
                >
                  Add
                </button>
              </div>
              
              {existingSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {existingSkills.map((skill, index) => (
                    <div 
                      key={index} 
                      className="bg-white px-3 py-2 rounded-xl shadow-xs flex items-center"
                    >
                      <span>{skill}</span>
                      <button 
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleGenerateRoadmap}
              disabled={isGenerating || skillToLearn.trim() === ''}
              className={`w-full p-3 rounded-xl text-white font-medium transition-colors ${
                isGenerating || skillToLearn.trim() === '' 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate Roadmap'}
            </button>
          </div>
          
          {/* Previous Roadmaps List */}
          <RoadmapHistory
            roadmaps={previousRoadmaps}
            onSelectRoadmap={handleSelectRoadmap}
          />
        </>
      ) : selectedRoadmap ? (
        // Display selected roadmap
        <RoadmapDisplay 
          roadmap={selectedRoadmap}
          onUpdate={handleUpdateRoadmap}
          onDelete={() => handleDeleteRoadmap(selectedRoadmap.id)}
          onNodeCompletionChange={handleNodeCompletion}
        />
      ) : roadmap ? (
        // Display newly generated roadmap
          <RoadmapDisplay 
            roadmap={roadmap}
            onUpdate={handleUpdateRoadmap}
            onDelete={() => handleDeleteRoadmap()}
            onNodeCompletionChange={handleNodeCompletion}
          />
      ) : null}
    </main>
  );
};

export default RoadmapGenerator;