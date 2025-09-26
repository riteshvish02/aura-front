import React, { useState, useEffect } from 'react';
import { 
  MicIcon, 
  MicOffIcon, 
  PlayIcon, 
  PauseIcon, 
  VolumeXIcon, 
  Volume2Icon,
  MessageSquareIcon,
  SettingsIcon,
  HelpCircleIcon,
  RotateCcwIcon
} from 'lucide-react';
import Sidebar from './Sidebar';

const VoiceBot = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState([
    {
      type: 'bot',
      message: 'Hello! I\'m your AURA Voice Assistant. You can ask me about your attendance, assignments, or any academic queries. How can I help you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [volume, setVolume] = useState(80);
  const [voiceSettings, setVoiceSettings] = useState({
    voice: 'female',
    speed: 'normal',
    language: 'english'
  });

  // Mock responses for demo
  const mockResponses = [
    "Your current attendance is 85%. You need 3 more classes to reach the required 75% minimum.",
    "You have 2 pending assignments: Math Assignment due tomorrow and Physics Lab report due this Friday.",
    "Your next class is Computer Science at 2:00 PM in Room 301.",
    "Based on your current grades, you're performing well. Keep up the good work!",
    "The library is open from 8 AM to 8 PM. You can access digital resources 24/7 through the student portal."
  ];

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('Listening...');
    
    // Mock listening process
    setTimeout(() => {
      const mockTranscripts = [
        "What is my attendance percentage?",
        "Do I have any pending assignments?",
        "When is my next class?",
        "How am I performing academically?",
        "What are the library timings?"
      ];
      const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
      setTranscript(randomTranscript);
      
      // Add user message to conversation
      const newUserMessage = {
        type: 'user',
        message: randomTranscript,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setConversationHistory(prev => [...prev, newUserMessage]);
      setIsListening(false);
      
      // Generate bot response
      setTimeout(() => {
        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        setResponse(randomResponse);
        setIsSpeaking(true);
        
        const newBotMessage = {
          type: 'bot',
          message: randomResponse,
          timestamp: new Date().toLocaleTimeString()
        };
        
        setConversationHistory(prev => [...prev, newBotMessage]);
        
        // Stop speaking after 3 seconds
        setTimeout(() => {
          setIsSpeaking(false);
          setResponse('');
        }, 3000);
      }, 1000);
    }, 2000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setTranscript('');
  };

  const clearConversation = () => {
    setConversationHistory([
      {
        type: 'bot',
        message: 'Hello! I\'m your AURA Voice Assistant. You can ask me about your attendance, assignments, or any academic queries. How can I help you today?',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setTranscript('');
    setResponse('');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                  <MicIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">AURA Voice Assistant</h1>
                  <p className="text-gray-600 mt-1">Speak naturally to get answers about your academics</p>
                </div>
              </div>
              <div className="w-24 h-1 bg-black rounded-full mx-auto"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Voice Control Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                {/* Voice Visualizer Section */}
                <div className="text-center mb-8">
                  <div className={`mx-auto w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                    isListening ? 'bg-red-100 animate-pulse border-4 border-red-200' : 
                    isSpeaking ? 'bg-blue-100 animate-pulse border-4 border-blue-200' : 
                    'bg-gray-100 border-4 border-gray-200'
                  }`}>
                    {isListening ? (
                      <MicIcon className="w-20 h-20 text-red-600" />
                    ) : isSpeaking ? (
                      <Volume2Icon className="w-20 h-20 text-blue-600" />
                    ) : (
                      <MicOffIcon className="w-20 h-20 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-xl font-semibold text-gray-900 mb-2">
                      {isListening ? '🎤 Listening...' : 
                       isSpeaking ? '🔊 Speaking...' : 
                       '✨ Ready to listen'}
                    </p>
                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                      {isListening ? 'Speak clearly into your microphone for best results' :
                       isSpeaking ? 'Playing your personalized response...' :
                       'Tap the microphone button below to start your conversation'}
                    </p>
                  </div>
                </div>

                {/* Current Transcript/Response */}
                {(transcript || response) && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transcript ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {transcript ? (
                          <MicIcon className="w-4 h-4 text-green-600" />
                        ) : (
                          <MessageSquareIcon className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {transcript ? 'You said:' : 'AURA responds:'}
                        </p>
                        <p className="text-gray-900">{transcript || response}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Control Buttons */}
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={isListening ? handleStopListening : handleStartListening}
                    disabled={isSpeaking}
                    className={`flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-300' 
                        : 'bg-white hover:bg-gray-50 text-black border-2 border-black shadow-gray-300'
                    } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                  >
                    {isListening ? (
                      <MicOffIcon className="w-8 h-8" />
                    ) : (
                      <MicIcon className="w-8 h-8" />
                    )}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-black hover:bg-gray-800 text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    {isMuted ? (
                      <VolumeXIcon className="w-6 h-6" />
                    ) : (
                      <Volume2Icon className="w-6 h-6" />
                    )}
                  </button>

                  <button
                    onClick={clearConversation}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-black hover:bg-gray-800 text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <RotateCcwIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Enhanced Volume Control */}
                <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <VolumeXIcon className="w-5 h-5 text-gray-500" />
                    <div className="flex-1 relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="w-full h-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #e5e7eb ${volume}%, #e5e7eb 100%)`
                        }}
                      />
                    </div>
                    <Volume2Icon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-center bg-white px-2 py-1 rounded-md shadow-sm">
                      {volume}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation History & Settings */}
            <div className="space-y-6">
              {/* Enhanced Conversation History */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <MessageSquareIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Conversation History</h3>
                  </div>
                  <button
                    onClick={clearConversation}
                    className="px-3 py-1 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {conversationHistory.map((item, index) => (
                    <div key={index} className={`flex gap-3 ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs rounded-xl p-4 shadow-sm ${
                        item.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                          : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 border border-gray-200'
                      }`}>
                        <div className="flex items-start gap-2 mb-2">
                          {item.type === 'user' ? (
                            <MicIcon className="w-4 h-4 mt-0.5 opacity-80" />
                          ) : (
                            <Volume2Icon className="w-4 h-4 mt-0.5 text-blue-600" />
                          )}
                          <p className="text-sm font-medium">
                            {item.type === 'user' ? 'You' : 'AURA'}
                          </p>
                        </div>
                        <p className="text-sm leading-relaxed">{item.message}</p>
                        <p className={`text-xs mt-2 ${item.type === 'user' ? 'opacity-80' : 'text-gray-500'}`}>
                          {item.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Voice Settings */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <SettingsIcon className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Voice Settings</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Voice Type</label>
                    <select 
                      value={voiceSettings.voice}
                      onChange={(e) => setVoiceSettings({...voiceSettings, voice: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gradient-to-r from-gray-50 to-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="female">👩 Female Voice</option>
                      <option value="male">👨 Male Voice</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Speech Speed</label>
                    <select 
                      value={voiceSettings.speed}
                      onChange={(e) => setVoiceSettings({...voiceSettings, speed: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gradient-to-r from-gray-50 to-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="slow">🐢 Slow</option>
                      <option value="normal">⚡ Normal</option>
                      <option value="fast">🚀 Fast</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Language</label>
                    <select 
                      value={voiceSettings.language}
                      onChange={(e) => setVoiceSettings({...voiceSettings, language: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gradient-to-r from-gray-50 to-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="english">🇺🇸 English</option>
                      <option value="hindi">🇮🇳 Hindi</option>
                      <option value="marathi">🇮🇳 Marathi</option>
                      <option value="gujarati">🇮🇳 Gujarati</option>
                      <option value="punjabi">🇮🇳 Punjabi</option>
                      <option value="tamil">🇮🇳 Tamil</option>
                      <option value="telugu">🇮🇳 Telugu</option>
                      <option value="kannada">🇮🇳 Kannada</option>
                      <option value="malayalam">🇮🇳 Malayalam</option>
                      <option value="bengali">🇮🇳 Bengali</option>
                      <option value="assamese">🇮🇳 Assamese</option>
                      <option value="odia">🇮🇳 Odia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Enhanced Help Section */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg border border-blue-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircleIcon className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Quick Tips</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm text-gray-700">Ask about your attendance percentage</p>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm text-gray-700">Check pending assignments</p>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <p className="text-sm text-gray-700">Get your class schedule</p>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <p className="text-sm text-gray-700">Inquire about grades and performance</p>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <p className="text-sm text-gray-700">Ask for college information</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceBot;