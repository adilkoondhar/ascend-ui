import React, { useState } from 'react';
import MeetingHistory from './MeetingHistory';
import MeetingDisplay from './MeetingDisplay';

const MeetingMinutesGenerator = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [minutes, setMinutes] = useState('');
  const [transcript, setTranscript] = useState('');
  const [activeTab, setActiveTab] = useState('minutes');
  const [showHistoryView, setShowHistoryView] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // Dummy data for previous meetings
  const [previousMeetings, setPreviousMeetings] = useState([
    {
      id: 1,
      title: "Weekly Sprint Planning",
      date: "March 5, 2025",
      duration: "45 min",
      participants: 6,
      minutes: `# Weekly Sprint Planning Meeting
      
## Date: March 5, 2025
## Participants: Alex, Om, Neilsan, Tiruvelly, Matte, Sukumar

### Key Decisions
1. Sprint goals finalized for March 7-21
2. Team capacity calculated at 80% due to upcoming holiday
3. Website builder tasks prioritized for this sprint

### Action Items
- Om to create Jira tickets for all sprint tasks by EOD
- Neilsan to prepare demo environment for stakeholder review
- Tiruvelly to document acceptance criteria for new features
- All: Update task estimates by tomorrow morning

### Notes
The team reviewed the product backlog and selected items for the upcoming sprint.
Potential blockers were identified and mitigation plans created.
Next sprint planning scheduled for March 19th.`,
      transcript: `[00:00:01] Alex: Let's get started with our sprint planning. First, let's review what we accomplished in the last sprint.

[00:00:10] Om: We completed 90% of our planned story points, with only the advanced search feature carrying over.

[00:00:18] Neilsan: That feature had some unexpected complexity with the filtering mechanism.

[00:00:25] Alex: Understood. Let's include that in this sprint. What else should we prioritize?

[00:00:32] Tiruvelly: The website builder components need attention. We promised delivery by the end of March.

[00:00:40] Matte: I can help with that now that the Corlax app is done.

[00:00:45] Sukumar: Great, I'll share the requirements documentation with you after the meeting.

[00:00:50] Alex: Let's also remember we have the company holiday next Friday, so our capacity is at 80%.

[00:01:00] Om: I'll adjust the sprint goals accordingly and create the tickets by end of day.

[00:01:08] Alex: Perfect. Any other concerns before we finalize the sprint backlog?`
    },
    {
      id: 2,
      title: "Product Roadmap Review",
      date: "March 3, 2025",
      duration: "60 min",
      participants: 4,
      minutes: `# Product Roadmap Review Meeting
      
## Date: March 3, 2025
## Participants: Alex, Sarah, Miguel, Jordan

### Key Decisions
1. Q2 roadmap approved with focus on AI integration features
2. Mobile app development postponed to Q3
3. Performance optimization sprint scheduled for April

### Action Items
- Sarah to finalize resource allocation plan by March 10
- Miguel to prepare technical documentation for AI features
- Jordan to communicate timeline changes to stakeholders
- Alex to coordinate with marketing for Q2 launch plans

### Notes
The team evaluated market feedback and competitive analysis to inform roadmap decisions.
Budget constraints required reprioritization of several initiatives.
Quarterly roadmap review sessions will continue with the next one scheduled for June 1.`,
      transcript: `[00:00:01] Alex: Welcome everyone to our quarterly roadmap review. Today we'll be making decisions that will impact Q2 and beyond.

[00:00:15] Sarah: I've prepared an analysis of our resource utilization and capacity for the next six months.

[00:00:25] Miguel: Based on technical feasibility, we should prioritize the AI integration features now rather than waiting.

[00:00:38] Jordan: Our stakeholders are really pushing for the mobile app. Are we sure we want to delay that?

[00:00:48] Alex: The analytics show that our web traffic is still 82% desktop, so the AI features will have more immediate impact.

[00:01:02] Sarah: We also don't have the mobile development expertise in-house right now. We'd need to hire or contract.

[00:01:12] Miguel: And the AI features are mostly ready for implementation. We've completed the proof of concept.

[00:01:20] Jordan: That makes sense. I'll communicate the updated timeline to the stakeholders with this reasoning.

[00:01:30] Alex: Great. Let's also make sure we include a performance sprint in April - our load times have been increasing.

[00:01:42] Sarah: I'll add that to the resource allocation plan. We should have capacity for it after the main AI features are deployed.`
    },
    {
      id: 3,
      title: "Customer Feedback Session",
      date: "February 28, 2025",
      duration: "30 min",
      participants: 5,
      minutes: `# Customer Feedback Session
      
## Date: February 28, 2025
## Participants: Alex, Jordan, Emma, Customer representatives (2)

### Key Insights
1. Dashboard customization is highly valued but difficult to discover
2. Export functionality needs additional formats
3. Mobile responsiveness issues on Android devices

### Action Items
- Emma to create UX improvement tickets for dashboard discovery
- Jordan to prioritize PDF and CSV export functionality
- Alex to coordinate testing on various Android devices
- Follow-up meeting with customers scheduled for April 15

### Notes
Customer satisfaction score: 8.2/10
Main pain points center around advanced functionality discoverability.
Customers appreciate recent performance improvements.`,
      transcript: `[00:00:01] Jordan: Thank you for joining us today. We're excited to hear your feedback on the latest release.

[00:00:10] Customer 1: Overall, we're very happy with the platform. The dashboard is powerful, but it took us a while to figure out how to customize it.

[00:00:22] Emma: That's valuable feedback. Where specifically did you have trouble?

[00:00:28] Customer 1: The drag-and-drop functionality isn't obvious. We only discovered it by accident.

[00:00:35] Customer 2: And we really need to export reports in PDF format. Right now we can only use Excel.

[00:00:43] Alex: We've been planning to expand the export options. Would CSV be useful as well?

[00:00:50] Customer 2: Definitely. PDF for sharing with executives and CSV for our data team.

[00:01:00] Customer 1: One more thing - the interface doesn't work well on our company Android phones.

[00:01:08] Emma: Can you tell us which models specifically? We test on several devices but might have missed yours.

[00:01:15] Customer 1: Mainly Samsung S22 and Google Pixel devices.

[00:01:20] Jordan: Thank you for this specific feedback. We'll prioritize these items and follow up with you in April to see if they've addressed your concerns.`
    }
  ]);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      // Reset states when a new file is uploaded
      setIsCompleted(false);
      setMinutes('');
      setTranscript('');
    }
  };

  const handleGenerate = () => {
    if (!file) return;
    
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsGenerating(false);
      setIsCompleted(true);
      
      // Mock data for demo
      setMinutes(`# Meeting Summary - Project Status Update
      
## Date: March 7, 2025
## Participants: Alex, Om, Neilsan, Tiruvelly

### Key Decisions
1. Website builder development timeline extended to April 15
2. Datascale AI app needs additional resources to avoid further delays
3. Media channel branding project requires immediate attention

### Action Items
- Om to finalize Nelsa web development documentation by March 15
- Neilsan to provide detailed progress report on Datascale AI app by March 10
- Tiruvelly to schedule risk assessment meeting for Media channel branding project
- Matte to share Corlax iOS app success metrics with the team

### Notes
The team discussed overall project status and identified resource allocation issues.
Progress metrics show 72% overall completion rate across all projects.
Resource utilization needs optimization for better productivity.`);
      
      setTranscript(`[00:00:01] Alex: Good morning everyone. Let's start our project status update meeting.

[00:00:08] Om: I'm happy to report that the Nelsa web development project is complete and ready for final client review.

[00:00:15] Neilsan: For the Datascale AI app, we're at 75% completion but facing some challenges with the machine learning implementation that's causing delays.

[00:00:28] Alex: What resources do you need to get back on track?

[00:00:32] Neilsan: We could use another developer with ML expertise for about two weeks.

[00:00:38] Tiruvelly: The Media channel branding project is at risk. We've completed 68% but client feedback requires significant rework on the visual identity system.

[00:00:52] Alex: Let's schedule a separate meeting to discuss this in detail.

[00:00:58] Matte: Good news on the Corlax iOS app - we've completed development and it's now in the final testing phase.

[00:01:08] Sukumar: The Website builder development is progressing as planned, currently at 50% completion.

[00:01:15] Alex: Great. Let's discuss resource allocation for the at-risk projects...`);
    }, 3000);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleDownload = (content, type) => {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `meeting-${type}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const handleSelectMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setShowHistoryView(false);
    setIsCompleted(true);
    setMinutes(meeting.minutes);
    setTranscript(meeting.transcript);
    setActiveTab('minutes');
  };
  
  const handleBackToHistory = () => {
    setShowHistoryView(true);
    setSelectedMeeting(null);
    setIsCompleted(false);
  };

  const handleDeleteMeeting = (meetingId) => {
    // If a meetingId is provided, it's a previous meeting
    if (meetingId) {
      setPreviousMeetings(previousMeetings.filter(meeting => meeting.id !== meetingId));
      setSelectedMeeting(null);
      setShowHistoryView(true);
    } else {
      // It's the newly generated meeting
      setIsCompleted(false);
      setMinutes('');
      setTranscript('');
    }
  };
  
  const handleUpdateMeeting = (content, type) => {
    if (type === 'minutes') {
      setMinutes(content);
      
      if (selectedMeeting) {
        // Update the selected meeting in the previous meetings array
        const updatedMeetings = previousMeetings.map(meeting => 
          meeting.id === selectedMeeting.id 
            ? { ...meeting, minutes: content } 
            : meeting
        );
        setPreviousMeetings(updatedMeetings);
        setSelectedMeeting({ ...selectedMeeting, minutes: content });
      }
    } else {
      setTranscript(content);
      
      if (selectedMeeting) {
        // Update the selected meeting in the previous meetings array
        const updatedMeetings = previousMeetings.map(meeting => 
          meeting.id === selectedMeeting.id 
            ? { ...meeting, transcript: content } 
            : meeting
        );
        setPreviousMeetings(updatedMeetings);
        setSelectedMeeting({ ...selectedMeeting, transcript: content });
      }
    }
  };

  return (
    <div className="flex flex-col bg-[#ebdfd7] h-full min-h-screen">
      {/* Main container */}
      <div className="px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">Meeting Minutes Generator</h1>
          {!showHistoryView && selectedMeeting && (
            <button 
              onClick={handleBackToHistory}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-xs hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to all meetings</span>
            </button>
          )}
        </div>
        
        {/* Show meeting history if in history view, otherwise show selected meeting details */}
        {showHistoryView ? (
          <>
            {/* Upload and generate section */}
            <div className="bg-[#f2eae5] rounded-2xl p-6 shadow-xs border-none mb-6">
              <div className="flex flex-col space-y-6">
                {/* File upload area */}
                <div className="bg-white rounded-2xl p-4 border border-dashed border-gray-300">
                  {!file ? (
                    <div 
                      className="flex flex-col items-center justify-center py-10 cursor-pointer"
                      onClick={() => document.getElementById('fileInput').click()}
                    >
                      <svg className="w-16 h-16 text-orange-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 011 9.9M9 19l3-3m0 0l3 3m-3-3v12" />
                      </svg>
                      <p className="text-gray-600 mb-2">Drag and drop your meeting recording here</p>
                      <p className="text-gray-400 text-sm mb-4">or</p>
                      <button className="bg-orange-500 text-white py-2 px-4 rounded-full font-medium hover:bg-orange-600 transition-colors duration-300">
                        Browse Files
                      </button>
                      <p className="text-gray-400 text-sm mt-4">Supports MP3, MP4, WAV, M4A (Max 500MB)</p>
                      <input 
                        id="fileInput" 
                        type="file" 
                        className="hidden" 
                        accept=".mp3,.mp4,.wav,.m4a" 
                        onChange={handleFileUpload}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between py-4 px-6">
                      <div className="flex items-center">
                        <div className="bg-orange-100 p-3 rounded-full mr-4">
                          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{fileName}</p>
                          <p className="text-gray-500 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB · {file.type.split('/')[1].toUpperCase()}</p>
                        </div>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => {
                          setFile(null);
                          setFileName('');
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
  
                {/* Generate button */}
                <div className="flex justify-center">
                  <button 
                    className={`flex items-center space-x-2 py-3 px-6 rounded-full font-medium ${
                      file ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    } transition-colors duration-300`}
                    disabled={!file || isGenerating}
                    onClick={handleGenerate}
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Generate Minutes & Transcript</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Display newly generated meeting results above previous meetings */}
            {isCompleted && (
              <MeetingDisplay
                minutes={minutes}
                transcript={transcript}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isNewlyGenerated={true}
                onCopy={handleCopy}
                onDownload={handleDownload}
                onDelete={() => handleDeleteMeeting()}
                onUpdate={handleUpdateMeeting}
              />
            )}
            
            {/* Previous Meetings List - showing below the newly generated meeting */}
            <MeetingHistory 
              meetings={previousMeetings} 
              onSelectMeeting={handleSelectMeeting} 
            />
          </>
        ) : (
          selectedMeeting && (
              <MeetingDisplay
                meeting={selectedMeeting}
                minutes={minutes}
                transcript={transcript}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onCopy={handleCopy}
                onDownload={handleDownload}
                onDelete={() => handleDeleteMeeting(selectedMeeting.id)}
                onUpdate={handleUpdateMeeting}
              />
          )
        )}
      </div>
    </div>
  );
};

export default MeetingMinutesGenerator;