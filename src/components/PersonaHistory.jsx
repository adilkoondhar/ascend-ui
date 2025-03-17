import React, { useState } from 'react';

const PersonaHistory = ({ personaChats, onSelectPersona, onDeleteChat }) => {
  const [expandedChat, setExpandedChat] = useState(null);

  const handleExpandChat = (id) => {
    setExpandedChat(expandedChat === id ? null : id);
  };

  return (
    <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none mb-6">
      <h2 className="text-xl font-medium mb-4">Previous Personas</h2>
      <div className="space-y-3">
        {personaChats.map((personaChat) => (
          <div key={personaChat.id} className="bg-white rounded-xl overflow-hidden">
            {/* Main persona row */}
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-orange-50 transition-colors duration-200"
              onClick={() => onSelectPersona(personaChat)}
            >
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">{personaChat.name}</p>
                  <p className="text-gray-500 text-sm">Created on {personaChat.createdAt} • {personaChat.messageCount} messages</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex flex-wrap gap-1 max-w-xs overflow-hidden">
                  {personaChat.traits.slice(0, 3).map((trait, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded-full truncate">
                      {trait}
                    </span>
                  ))}
                  {personaChat.traits.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      +{personaChat.traits.length - 3}
                    </span>
                  )}
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-600 p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpandChat(personaChat.id);
                  }}
                >
                  <svg className={`w-5 h-5 transition-transform duration-200 ${expandedChat === personaChat.id ? 'transform rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Expanded details */}
            {expandedChat === personaChat.id && (
              <div className="bg-gray-50 border-t border-gray-100 p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Personality Traits:</h3>
                  <div className="flex flex-wrap gap-2">
                    {personaChat.traits.map((trait, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-white text-gray-700 rounded-full">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Recent Messages:</h3>
                  <div className="bg-white rounded-lg p-3 max-h-32 overflow-y-auto">
                    {personaChat.recentMessages.map((message, index) => (
                      <div key={index} className="mb-2 last:mb-0">
                        <span className={`font-medium ${message.sender === 'user' ? 'text-gray-700' : 'text-orange-600'}`}>
                          {message.sender === 'user' ? 'You' : personaChat.name}:
                        </span>
                        <span className="text-gray-600 text-sm ml-2">{message.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button 
                    className="flex items-center space-x-1 py-2 px-3 rounded-lg text-sm bg-gray-200 hover:bg-gray-300 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPersona(personaChat);
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Continue Chat</span>
                  </button>
                  <button 
                    className="flex items-center space-x-1 py-2 px-3 rounded-lg text-sm text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(personaChat.id);
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Delete Chat</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonaHistory;