import React, { useState } from 'react';

const MeetingDisplay = ({ 
  meeting, 
  minutes, 
  transcript, 
  activeTab, 
  setActiveTab, 
  isNewlyGenerated = false,
  onCopy,
  onDownload,
  onDelete,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMinutes, setEditedMinutes] = useState(minutes);
  const [editedTranscript, setEditedTranscript] = useState(transcript);

  const handleEdit = () => {
    setEditedMinutes(minutes);
    setEditedTranscript(transcript);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(activeTab === 'minutes' ? editedMinutes : editedTranscript, activeTab);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleTextChange = (e) => {
    if (activeTab === 'minutes') {
      setEditedMinutes(e.target.value);
    } else {
      setEditedTranscript(e.target.value);
    }
  };

  return (
    <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none mb-6">
      <div className="flex justify-between items-center mb-4">
        {isNewlyGenerated ? (
          <h2 className="text-xl font-medium">Newly Generated Meeting</h2>
        ) : (
          <h2 className="text-xl font-medium">{meeting?.title || 'Meeting Details'}</h2>
        )}
        
        <div className="flex space-x-4">
          <button 
            className={`px-4 py-2 rounded-full font-medium ${activeTab === 'minutes' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('minutes')}
          >
            Meeting Minutes
          </button>
          <button 
            className={`px-4 py-2 rounded-full font-medium ${activeTab === 'transcript' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('transcript')}
          >
            Full Transcript
          </button>
        </div>
      </div>
      
      {/* Content container */}
      <div className="bg-white rounded-xl p-6">
        {/* Header with actions */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-medium text-lg">
              {isNewlyGenerated ? 'Project Status Update' : meeting?.title}
            </h3>
            <p className="text-gray-500 text-sm">
              {isNewlyGenerated ? 'March 7, 2025 • Generated just now' : `${meeting?.date} • ${meeting?.duration}`}
            </p>
          </div>
          <div className="flex space-x-2">
            {!isEditing ? (
              <>
                <button 
                  className="bg-gray-100 p-2 rounded-full shadow-xs hover:bg-gray-200"
                  onClick={() => onCopy(activeTab === 'minutes' ? minutes : transcript)}
                  title="Copy to clipboard"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
                <button 
                  className="bg-gray-100 p-2 rounded-full shadow-xs hover:bg-gray-200"
                  onClick={() => onDownload(
                    activeTab === 'minutes' ? minutes : transcript, 
                    activeTab === 'minutes' ? 'minutes' : 'transcript'
                  )}
                  title="Download"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <button 
                  className="bg-gray-100 p-2 rounded-full shadow-xs hover:bg-gray-200"
                  onClick={handleEdit}
                  title="Edit"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button 
                  className="bg-gray-100 p-2 rounded-full shadow-xs hover:bg-red-100"
                  onClick={onDelete}
                  title="Delete"
                >
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button 
                  className="bg-green-500 text-white px-3 py-1 rounded-full shadow-xs hover:bg-green-600"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button 
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full shadow-xs hover:bg-gray-200"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Content display area */}
        <div className="max-h-96 overflow-y-auto">
          {isEditing ? (
            <textarea
              className="w-full min-h-[300px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-gray-800"
              value={activeTab === 'minutes' ? editedMinutes : editedTranscript}
              onChange={handleTextChange}
            />
          ) : (
            <pre className="whitespace-pre-wrap font-sans text-gray-800">
              {activeTab === 'minutes' ? minutes : transcript}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingDisplay;