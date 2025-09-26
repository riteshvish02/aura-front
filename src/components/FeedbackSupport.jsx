import React, { useState } from 'react';
import { MessageCircleIcon, StarIcon, SendIcon, CheckCircleIcon, AlertCircleIcon, HelpCircleIcon } from 'lucide-react';
import Sidebar from './Sidebar';

const FeedbackSupport = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmitFeedback = () => {
    // Handle feedback submission logic here
    console.log('Feedback submitted:', { selectedRating, feedbackText, selectedCategory });
    // Reset form
    setSelectedRating(0);
    setFeedbackText('');
    setSelectedCategory('');
  };

  const faqItems = [
    {
      question: "How do I mark my attendance?",
      answer: "You can mark attendance by scanning the QR code provided by your teacher or through the Quick Scan feature in the sidebar."
    },
    {
      question: "Why is my attendance showing as low?",
      answer: "Your attendance percentage is calculated based on total classes held vs classes attended. Make sure to scan the QR code for each class."
    },
    {
      question: "Can I view my attendance history?",
      answer: "Yes, you can view your detailed attendance history in the Daily Attendance section."
    },
    {
      question: "How do I access assignments?",
      answer: "All assignments and resources are available in the Assignment & Resource section in the sidebar."
    }
  ];

  const supportTickets = [
    {
      id: "T001",
      subject: "Cannot scan QR code",
      status: "Open",
      date: "2024-03-15",
      priority: "High"
    },
    {
      id: "T002",
      subject: "Attendance not showing",
      status: "In Progress",
      date: "2024-03-14",
      priority: "Medium"
    },
    {
      id: "T003",
      subject: "Login issues",
      status: "Resolved",
      date: "2024-03-12",
      priority: "Low"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Feedback & Support</h1>
            <p className="text-gray-600">Share your feedback and get help when you need it</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Feedback Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircleIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Submit Feedback</h2>
                  <p className="text-sm text-gray-600">Help us improve your experience</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    <option value="ui">User Interface</option>
                    <option value="functionality">Functionality</option>
                    <option value="performance">Performance</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        className="focus:outline-none"
                      >
                        <StarIcon 
                          className={`w-6 h-6 ${
                            star <= selectedRating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    rows={4}
                    placeholder="Please share your thoughts..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button 
                  onClick={handleSubmitFeedback}
                  className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <SendIcon className="w-4 h-4" />
                  Submit Feedback
                </button>
              </div>
            </div>

            {/* Support Tickets */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <HelpCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
                  <p className="text-sm text-gray-600">Track your support requests</p>
                </div>
              </div>

              <div className="space-y-3">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-900">#{ticket.id}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            ticket.status === 'Open' 
                              ? 'bg-red-100 text-red-700'
                              : ticket.status === 'In Progress'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {ticket.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 mb-1">{ticket.subject}</p>
                        <p className="text-xs text-gray-500">{ticket.date}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        ticket.priority === 'High' 
                          ? 'bg-red-50 text-red-600'
                          : ticket.priority === 'Medium'
                          ? 'bg-yellow-50 text-yellow-600'
                          : 'bg-gray-50 text-gray-600'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
                Create New Ticket
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <MessageCircleIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">Email Support</h3>
                <p className="text-sm text-gray-600">support@aura.com</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">Response Time</h3>
                <p className="text-sm text-gray-600">Within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <AlertCircleIcon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900">Emergency</h3>
                <p className="text-sm text-gray-600">Call IT Help Desk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSupport;