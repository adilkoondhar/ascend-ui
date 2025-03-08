// components/NodePanel.js
import React, { useEffect, useRef, useState } from 'react';

const NodePanel = ({ node, isOpen, onClose, onToggleComplete }) => {
  const panelRef = useRef(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Update local state when node changes
  useEffect(() => {
    if (node) {
      setIsCompleted(node.data.completed);
    }
  }, [node]);
  
  useEffect(() => {
    // Function to handle clicks outside of the panel
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    };

    // Function to handle escape key press
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    // Clean up event listeners when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!node) return null;

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
    onToggleComplete(node.id);
  };

  return (
    <div 
      className={`fixed top-0 right-0 w-96 h-full transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Glass panel container */}
      <div 
        ref={panelRef}
        className="h-full w-full bg-black bg-opacity-20 backdrop-blur-lg border-l border-white/10 shadow-2xl flex flex-col text-white p-6 overflow-y-auto"
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{node?.data?.icon}</span>
            <h2 className="text-2xl font-bold">{node?.data?.label}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Status toggle button */}
        <button
          onClick={handleToggleComplete}
          className={`w-full mb-6 py-2 px-4 rounded-md flex items-center justify-center transform active:scale-95 transition-all duration-150 ${
            isCompleted 
              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
              : 'bg-gray-700/30 text-gray-300 hover:bg-gray-700/50'
          }`}
          aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M20 6L9 17L4 12"></path>
          </svg>
          {isCompleted ? 'Completed' : 'Mark as Complete'}
        </button>
        
        {/* Gradient line */}
        <div className="w-full h-px bg-gradient-to-r from-purple-500 to-blue-500 mb-6"></div>

        {/* Node details */}
        <div className="space-y-6">
          {node?.data?.subLabel && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Source</h3>
              <p className="text-lg">{node.data.subLabel}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
            <p className="text-gray-300">{node?.data?.description || 'No description available'}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Input</h3>
            {node?.data?.inputs && node.data.inputs.length > 0 ? (
              <ul className="space-y-1">
                {node.data.inputs.map((input, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>{input}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No inputs</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Output</h3>
            {node?.data?.outputs && node.data.outputs.length > 0 ? (
              <ul className="space-y-1">
                {node.data.outputs.map((output, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    <span>{output}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No outputs</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Dependencies</h3>
            {node?.data?.dependencies && node.data.dependencies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {node.data.dependencies.map((dep, index) => (
                  <span 
                    key={index} 
                    className="bg-white/10 px-3 py-1 rounded-full text-sm"
                  >
                    {dep}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No dependencies</p>
            )}
          </div>
        </div>

        {/* Node ID and position info */}
        <div className="mt-auto pt-6">
          <div className="bg-white/5 rounded-lg p-4 text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Node ID:</span>
              <span className="font-mono">{node.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Position:</span>
              <span className="font-mono">
                x: {Math.round(node.position.x)}, y: {Math.round(node.position.y)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodePanel;