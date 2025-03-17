import React, { useState, useRef, useEffect } from 'react';
import PersonaHistory from './PersonaHistory';
import PersonaChat from './PersonaChat';

const PersonaGenerator = () => {
  const [traitsInput, setTraitsInput] = useState('');
  const [traits, setTraits] = useState([]);
  const [persona, setPersona] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatContainerRef = useRef(null);
  // Add state for persona history
  const [personaHistory, setPersonaHistory] = useState([]);
  // Add state to track if we're viewing a history item
  const [viewingHistory, setViewingHistory] = useState(false);

  // Add this useEffect to scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleAddTrait = () => {
    if (traitsInput.trim()) {
      setTraits([...traits, traitsInput.trim()]);
      setTraitsInput('');
    }
  };

  const handleRemoveTrait = (indexToRemove) => {
    setTraits(traits.filter((_, index) => index !== indexToRemove));
  };

  const handleGeneratePersona = () => {
    if (traits.length === 0) return;
    
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsGenerating(false);
      const newPersona = {
        id: Date.now().toString(),
        name: "Generated Persona",
        avatar: "/api/placeholder/100/100",
        title: "AI Assistant",
        traits: [...traits],
        createdAt: new Date().toLocaleDateString(),
        messageCount: 0,
        recentMessages: []
      };
      
      setPersona(newPersona);
      setChatMessages([]);
      setViewingHistory(false); // We're not viewing history now
    }, 2000);
  };

  const handleSendMessage = (messageContent) => {
    if (!messageContent.trim() || !persona) return;
    
    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newUserMessage]);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now().toString() + '-ai',
        sender: 'ai',
        content: `As a ${persona.traits.join(', ')} persona, I'd respond to that with thoughtful consideration.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const updatedMessages = [...chatMessages, newUserMessage, aiResponse];
      setChatMessages(updatedMessages);
      
      // Update persona in history
      if (viewingHistory) {
        // Update existing persona in history
        setPersonaHistory(personaHistory.map(p => 
          p.id === persona.id 
            ? {
                ...p, 
                messageCount: p.messageCount + 2,
                recentMessages: updatedMessages.slice(-6)
              }
            : p
        ));
      } else {
        // Add new persona to history if this is their first message
        if (chatMessages.length === 0) {
          const historyItem = {
            ...persona,
            messageCount: 2,
            recentMessages: [newUserMessage, aiResponse]
          };
          setPersonaHistory([historyItem, ...personaHistory]);
        } else {
          // Update in-progress persona before adding to history
          const updatedPersona = {
            ...persona,
            messageCount: chatMessages.length + 2,
            recentMessages: updatedMessages.slice(-6)
          };
          
          setPersonaHistory(personaHistory.map(p => 
            p.id === persona.id ? updatedPersona : p
          ));
        }
      }
    }, 1000);
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      if (action === 'addTrait') {
        handleAddTrait();
      } else if (action === 'sendMessage') {
        handleSendMessage(messageInput);
        setMessageInput('');
      }
    }
  };

  const handleSelectPersona = (selectedPersona) => {
    setPersona(selectedPersona);
    // Find the persona in history and load its messages
    const historyItem = personaHistory.find(p => p.id === selectedPersona.id);
    if (historyItem && historyItem.recentMessages) {
      setChatMessages(historyItem.recentMessages);
    } else {
      setChatMessages([]);
    }
    setViewingHistory(true);
  };

  const handleDeleteChat = (personaId) => {
    setPersonaHistory(personaHistory.filter(p => p.id !== personaId));
    if (persona && persona.id === personaId) {
      setPersona(null);
      setChatMessages([]);
    }
  };

  const handleBackToCreation = () => {
    setPersona(null);
    setChatMessages([]);
    setTraits([]);
  };

  return (
    <div className="flex flex-col bg-[#ebdfd7] h-full min-h-screen">
      <div className="px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">Persona Generator</h1>
        </div>
        
        {!persona ? (
          <>
            <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs mb-6">
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-4">Create a New Persona</h2>
                <p className="text-gray-600 mb-6">
                  Enter personality traits one by one to define the persona you want to chat with.
                </p>
                
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    className="flex-grow bg-white rounded-l-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter a personality trait..."
                    value={traitsInput}
                    onChange={(e) => setTraitsInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'addTrait')}
                  />
                  <button
                    className="bg-orange-500 text-white p-3 rounded-r-xl hover:bg-orange-600 transition-colors"
                    onClick={handleAddTrait}
                  >
                    Add Trait
                  </button>
                </div>
              </div>
              
              {traits.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3">Persona Traits:</h3>
                  <div className="flex flex-wrap gap-2">
                    {traits.map((trait, index) => (
                      <div 
                        key={index} 
                        className="bg-white px-3 py-2 rounded-full flex items-center"
                      >
                        <span>{trait}</span>
                        <button 
                          className="ml-2 text-gray-400 hover:text-gray-600"
                          onClick={() => handleRemoveTrait(index)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-center">
                <button
                  className={`flex items-center space-x-2 py-3 px-6 rounded-full font-medium ${
                    traits.length > 0 && !isGenerating
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  } transition-colors duration-300`}
                  disabled={traits.length === 0 || isGenerating}
                  onClick={handleGeneratePersona}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Generate Persona</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {personaHistory.length > 0 && (
              <PersonaHistory 
                personaChats={personaHistory} 
                onSelectPersona={handleSelectPersona} 
                onDeleteChat={handleDeleteChat}
              />
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {/* Persona Info Card */}
            <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center">
                <img 
                  src={persona.avatar} 
                  alt="Persona avatar" 
                  className="w-16 h-16 rounded-full mr-4 bg-orange-100"
                />
                <div>
                  <h2 className="text-xl font-medium">{persona.name}</h2>
                  <p className="text-gray-600">{persona.title}</p>
                </div>
                <button 
                  className="ml-auto bg-white hover:bg-gray-50 p-2 rounded-full"
                  onClick={handleBackToCreation}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4">
                <h3 className="text-md font-medium mb-2">Personality Traits:</h3>
                <div className="flex flex-wrap gap-2">
                  {persona.traits.map((trait, index) => (
                    <span 
                      key={index} 
                      className="bg-white px-3 py-1 text-sm rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Use PersonaChat component for the chat interface */}
            <PersonaChat 
              persona={persona}
              chatMessages={chatMessages}
              onSendMessage={handleSendMessage}
              onDeleteChat={handleDeleteChat}
              onBack={handleBackToCreation}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaGenerator;