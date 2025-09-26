import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquareIcon, 
  SendIcon, 
  PlusIcon,
  SettingsIcon,
  TrashIcon,
  BotIcon,
  UserIcon,
  CopyIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  RotateCcwIcon,
  BookOpenIcon,
  GraduationCapIcon,
  ClockIcon
} from 'lucide-react';
import Sidebar from './Sidebar';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m AURA, your AI academic assistant. I can help you with questions about your attendance, assignments, grades, schedules, and general academic guidance. What would you like to know?',
      timestamp: new Date().toLocaleTimeString(),
      suggestions: [
        'Check my attendance',
        'Show pending assignments',
        'What\'s my next class?',
        'How are my grades?'
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: 'Academic Help - Today', messages: 1, active: true }
  ]);
  const [selectedChat, setSelectedChat] = useState(1);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Mock responses based on different query types
  const mockResponses = {
    attendance: [
      "Your current attendance is 87% across all subjects. You're doing great! Math: 92%, Physics: 85%, Chemistry: 90%, Biology: 82%, English: 88%.",
      "You've attended 78 out of 90 classes this semester. You need to maintain at least 75% attendance (68 classes) to be eligible for exams.",
      "Your attendance has improved by 5% this month. Keep up the good work!"
    ],
    assignments: [
      "You have 3 pending assignments: 1) Math calculus problems due tomorrow, 2) Physics lab report due Friday, 3) Chemistry project due next week.",
      "All assignments are up to date! Your last submission was the English essay which received an A grade.",
      "Assignment reminder: Your Computer Science project presentation is scheduled for Monday at 10 AM."
    ],
    grades: [
      "Your current GPA is 8.2/10. Here's your subject-wise performance: Math: A, Physics: B+, Chemistry: A-, Biology: B+, English: A.",
      "You're performing excellently! Your grades have improved by 0.5 points compared to last semester.",
      "Your strongest subjects are Mathematics and English. Consider focusing more on Physics for better overall performance."
    ],
    schedule: [
      "Your next class is Computer Science at 2:00 PM in Room 301 with Prof. Sharma.",
      "Today's schedule: 9 AM - Math (Room 201), 11 AM - Physics Lab (Lab 3), 2 PM - Chemistry (Room 105), 4 PM - English (Room 301).",
      "Tomorrow you have 4 classes starting with Biology at 8 AM. Don't forget to bring your lab notebook!"
    ],
    general: [
      "The library is open from 8 AM to 8 PM. You can access digital resources 24/7 through the student portal.",
      "Exam schedule will be announced next week. Start preparing your study timetable.",
      "Career counseling sessions are available every Tuesday and Thursday from 3-5 PM.",
      "Student support services include academic tutoring, mental health counseling, and career guidance.",
      "The college fest 'TechnoVision 2025' registrations are now open. You can participate in coding competitions, robotics, and cultural events."
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const determineResponseType = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('attendance') || lowerMessage.includes('present') || lowerMessage.includes('absent')) {
      return 'attendance';
    } else if (lowerMessage.includes('assignment') || lowerMessage.includes('homework') || lowerMessage.includes('project')) {
      return 'assignments';
    } else if (lowerMessage.includes('grade') || lowerMessage.includes('marks') || lowerMessage.includes('score') || lowerMessage.includes('gpa')) {
      return 'grades';
    } else if (lowerMessage.includes('schedule') || lowerMessage.includes('class') || lowerMessage.includes('timetable') || lowerMessage.includes('next')) {
      return 'schedule';
    } else {
      return 'general';
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responseType = determineResponseType(inputMessage);
      const responses = mockResponses[responseType];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        message: randomResponse,
        timestamp: new Date().toLocaleTimeString(),
        suggestions: responseType === 'attendance' ? ['Show detailed report', 'Tips to improve attendance'] :
                    responseType === 'assignments' ? ['Assignment calendar', 'Study tips'] :
                    responseType === 'grades' ? ['Study plan', 'Grade analysis'] :
                    responseType === 'schedule' ? ['Tomorrow\'s schedule', 'Weekly timetable'] :
                    ['Ask another question', 'Get study tips', 'Contact support']
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const createNewChat = () => {
    const newChatId = chatHistory.length + 1;
    const newChat = {
      id: newChatId,
      title: `New Chat - ${new Date().toLocaleDateString()}`,
      messages: 0,
      active: false
    };
    
    setChatHistory(prev => [...prev, newChat]);
    setSelectedChat(newChatId);
    setMessages([
      {
        id: 1,
        type: 'bot',
        message: 'Hello! I\'m AURA, your AI academic assistant. How can I help you today?',
        timestamp: new Date().toLocaleTimeString(),
        suggestions: [
          'Check my attendance',
          'Show pending assignments',
          'What\'s my next class?',
          'How are my grades?'
        ]
      }
    ]);
  };

  const deleteChat = (chatId) => {
    if (chatHistory.length > 1) {
      setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
      if (selectedChat === chatId) {
        setSelectedChat(chatHistory[0].id);
      }
    }
  };

  const clearCurrentChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        message: 'Chat cleared! How can I help you?',
        timestamp: new Date().toLocaleTimeString(),
        suggestions: [
          'Check my attendance',
          'Show pending assignments',
          'What\'s my next class?',
          'How are my grades?'
        ]
      }
    ]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Chat History Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={createNewChat}
              className="w-full flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              New Chat
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat === chat.id 
                      ? 'bg-gray-100 border border-gray-300' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{chat.title}</h4>
                    <p className="text-xs text-gray-500">{chat.messages} messages</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <SettingsIcon className="w-4 h-4" />
              Chat Settings
            </button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <MessageSquareIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">AURA Chat Assistant</h1>
                  <p className="text-sm text-gray-500">AI-powered academic support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={clearCurrentChat}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Clear chat"
                >
                  <RotateCcwIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' ? 'bg-black' : 'bg-blue-100'
                  }`}>
                    {message.type === 'user' ? (
                      <UserIcon className="w-4 h-4 text-white" />
                    ) : (
                      <BotIcon className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  
                  <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`rounded-lg p-4 ${
                      message.type === 'user' 
                        ? 'bg-black text-white' 
                        : 'bg-white border border-gray-200'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.message}</p>
                      
                      {message.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                      {message.type === 'bot' && (
                        <div className="flex items-center gap-1">
                          <button className="p-1 text-gray-400 hover:text-green-500 transition-colors">
                            <ThumbsUpIcon className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                            <ThumbsDownIcon className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <CopyIcon className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <BotIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me about your academics, attendance, assignments..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <BookOpenIcon className="w-3 h-3" />
                <span>Academic queries</span>
              </div>
              <div className="flex items-center gap-1">
                <GraduationCapIcon className="w-3 h-3" />
                <span>Study guidance</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-3 h-3" />
                <span>24/7 available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;