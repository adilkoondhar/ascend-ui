'use client';

import React, { useState, useRef } from 'react';

const UserSettings = () => {
  // User data state
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Wick',
    email: 'johnwick@example.com',
    password: '••••••••',
    birthday: '',
    securityQuestion: 'What was your first pet\'s name?',
    securityAnswer: '',
    profileImage: '/images/profile.jpg'
  });

  // State for current form being edited
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const fileInputRef = useRef(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would implement your API call
    console.log('Form submitted:', userData);
    
    // Reset password editing state if needed
    if (isEditingPassword) {
      setIsEditingPassword(false);
    }
  };

  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real implementation, you would upload the file to your server
      // For now, we'll create a local URL to display the image
      const imageUrl = URL.createObjectURL(file);
      setUserData({
        ...userData,
        profileImage: imageUrl
      });
    }
  };

  // Trigger file input click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-[#f2eae5] min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">User Settings</h1>
        
        {/* Tabs */}
        <div className="flex mb-6 border-b border-[#d8cdc6]">
          <button 
            className={`py-3 px-5 relative ${activeTab === 'profile' ? 'text-orange-500 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Information
            {activeTab === 'profile' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>}
          </button>
          <button 
            className={`py-3 px-5 relative ${activeTab === 'security' ? 'text-orange-500 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('security')}
          >
            Security
            {activeTab === 'security' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>}
          </button>
        </div>
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row">
              {/* Profile Image Section */}
              <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                <div 
                  className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden relative mb-4 cursor-pointer"
                  onClick={handleImageClick}
                >
                  <img 
                    src={userData.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                  {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 text-sm">
                    Change Image
                  </div> */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
                <p className="text-sm text-gray-500">Click to upload a new image</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (max 5MB)</p>
              </div>
              
              {/* Profile Form */}
              <div className="md:w-2/3">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-xl border border-[#d8cdc6] focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-xl border border-[#d8cdc6] focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-xl border border-[#d8cdc6] focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Birthday (Optional)</label>
                      <input
                        type="date"
                        name="birthday"
                        value={userData.birthday}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-xl border border-[#d8cdc6] focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <form onSubmit={handleSubmit}>
              {/* Password Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Password</h3>
                <div className="border-b border-[#d8cdc6] pb-6">
                  {isEditingPassword ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          className="w-full px-4 py-2 rounded-xl border border-[#d8cdc6] focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          className="w-full px-4 py-2 rounded-xl border border-[#d8cdc6] focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          className="w-full px-4 py-2 rounded-xl border border-[#d8cdc6] focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition duration-200"
                        >
                          Update Password
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingPassword(false)}
                          className="text-gray-600 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                          type="password"
                          value={userData.password}
                          disabled
                          className="px-4 py-2 rounded-xl border border-[#d8cdc6] bg-gray-50"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsEditingPassword(true)}
                        className="text-orange-500 hover:text-orange-600 font-medium"
                      >
                        Change Password
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Security Question Section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Security Question</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Security Question</label>
                    <select
                      name="securityQuestion"
                      value={userData.securityQuestion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl border border-[#d8cdc6] focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="What was your first pet's name?">What was your first pet's name?</option>
                      <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                      <option value="What city were you born in?">What city were you born in?</option>
                      <option value="What was the name of your first school?">What was the name of your first school?</option>
                      <option value="What is your favorite movie?">What is your favorite movie?</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                    <input
                      type="text"
                      name="securityAnswer"
                      value={userData.securityAnswer}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl border border-[#d8cdc6] focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your answer"
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;