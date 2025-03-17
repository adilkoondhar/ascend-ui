import React, { useState, useRef, useEffect } from 'react';

const PersonaChat = ({ persona, chatMessages, onSendMessage, onDeleteChat, onBack }) => {
  const [messageInput, setMessageInput] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const chatContainerRef = useRef(null);

  // Add this useEffect to scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="bg-[#f2eae5] rounded-2xl shadow-xs overflow-hidden flex flex-col">
      {/* Header with delete option */}
      <div className="p-4 border-b border-[#dad3ce] flex justify-between items-center">
        <div className="flex items-center">
          <button 
            className="mr-3 p-1 rounded-full hover:bg-gray-200 transition-colors"
            onClick={onBack}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="font-medium">Chat with {persona.name}</h3>
        </div>
        <div className="flex items-center">
          {!showDeleteConfirm ? (
            <button 
              className="text-gray-500 hover:text-red-500 p-1"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-red-600">Delete chat?</span>
              <button 
                className="text-green-600 hover:text-green-700 p-1"
                onClick={() => setShowDeleteConfirm(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button 
                className="text-red-600 hover:text-red-700 p-1"
                onClick={() => onDeleteChat(persona.id)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Chat messages */}
      <div 
        ref={chatContainerRef}
        className="flex-grow p-4 overflow-y-auto h-96"
      >
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>Start chatting with your generated persona!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatMessages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 p-3 rounded-xl ${
                    message.sender === 'user' 
                      ? 'bg-orange-500 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className={`text-xs ${message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'} block text-right mt-1`}>
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-[#dad3ce]">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-grow bg-white rounded-l-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-orange-500 text-white p-3 rounded-r-xl hover:bg-orange-600 transition-colors"
            onClick={handleSendMessage}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonaChat;