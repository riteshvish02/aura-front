import React, { useState } from 'react';
import { Send, AlertCircle, FileText, Users, Clock, CheckCircle } from 'lucide-react';

const FeedbackSupport = () => {
  // State for forms
  const [engagementForm, setEngagementForm] = useState({
    classStudent: '',
    notes: ''
  });
  
  const [issueForm, setIssueForm] = useState({
    issueType: '',
    description: '',
    file: null
  });

  // Mock data for submitted items
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      type: 'engagement',
      title: 'Class 10A - John Doe Performance',
      description: 'Student showing excellent improvement in mathematics',
      status: 'resolved',
      date: '2024-01-20',
      priority: 'normal'
    },
    {
      id: 2,
      type: 'issue',
      title: 'System Login Problem',
      description: 'Unable to access attendance module',
      status: 'open',
      date: '2024-01-21',
      priority: 'high'
    },
    {
      id: 3,
      type: 'engagement',
      title: 'Class 8B - Sarah Smith Behavior',
      description: 'Needs additional support in group activities',
      status: 'open',
      date: '2024-01-22',
      priority: 'normal'
    },
    {
      id: 4,
      type: 'issue',
      title: 'Attendance Report Error',
      description: 'Monthly attendance report showing incorrect data',
      status: 'resolved',
      date: '2024-01-19',
      priority: 'medium'
    }
  ]);

  // Sample data
  const classStudentOptions = [
    'Class 10A - John Doe',
    'Class 10A - Jane Smith',
    'Class 10B - Mike Johnson',
    'Class 9A - Sarah Wilson',
    'Class 9B - David Brown',
    'Class 8A - Emma Davis',
    'Class 8B - Sarah Smith'
  ];

  const issueTypes = ['System', 'Attendance', 'Other'];

  // Form handlers
  const handleEngagementSubmit = (e) => {
    e.preventDefault();
    if (!engagementForm.classStudent || !engagementForm.notes) {
      alert('Please fill in all fields');
      return;
    }
    
    const newSubmission = {
      id: Date.now(),
      type: 'engagement',
      title: `${engagementForm.classStudent} Performance`,
      description: engagementForm.notes,
      status: 'open',
      date: new Date().toISOString().split('T')[0],
      priority: 'normal'
    };
    
    setSubmissions([newSubmission, ...submissions]);
    setEngagementForm({ classStudent: '', notes: '' });
    alert('Feedback submitted successfully!');
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    if (!issueForm.issueType || !issueForm.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newSubmission = {
      id: Date.now(),
      type: 'issue',
      title: `${issueForm.issueType} Issue`,
      description: issueForm.description,
      status: 'open',
      date: new Date().toISOString().split('T')[0],
      priority: 'medium'
    };
    
    setSubmissions([newSubmission, ...submissions]);
    setIssueForm({ issueType: '', description: '', file: null });
    alert('Issue reported successfully!');
  };

  const toggleStatus = (id) => {
    setSubmissions(submissions.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'open' ? 'resolved' : 'open' }
        : item
    ));
  };

  const getStatusIcon = (status) => {
    return status === 'resolved' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />;
  };

  const getTypeIcon = (type) => {
    return type === 'engagement' ? <Users className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />;
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback & Support</h1>
          <p className="text-gray-600">Submit student feedback or report technical issues</p>
        </div>

        {/* Forms Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Student Engagement Feedback Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Student Engagement Feedback</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Class/Student
                </label>
                <select 
                  value={engagementForm.classStudent}
                  onChange={(e) => setEngagementForm({...engagementForm, classStudent: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black"
                  required
                >
                  <option value="">Choose a student...</option>
                  {classStudentOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes on Performance/Behavior
                </label>
                <textarea
                  value={engagementForm.notes}
                  onChange={(e) => setEngagementForm({...engagementForm, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white text-black"
                  placeholder="Describe the student's performance, behavior, or any observations..."
                  required
                />
              </div>
              
              <button
                type="button"
                onClick={handleEngagementSubmit}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Feedback
              </button>
            </div>
          </div>

          {/* Report Issue Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Report Issue</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Type
                </label>
                <select 
                  value={issueForm.issueType}
                  onChange={(e) => setIssueForm({...issueForm, issueType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-black"
                  required
                >
                  <option value="">Select issue type...</option>
                  {issueTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={issueForm.description}
                  onChange={(e) => setIssueForm({...issueForm, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none bg-white text-black"
                  placeholder="Please describe the issue in detail..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Screenshot/File (Optional)
                </label>
                <input
                  type="file"
                  onChange={(e) => setIssueForm({...issueForm, file: e.target.files[0]})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  accept="image/*,.pdf,.doc,.docx"
                />
              </div>
              
              <button
                type="button"
                onClick={handleIssueSubmit}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Issue
              </button>
            </div>
          </div>
        </div>

        {/* Submitted Items List */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Submitted Feedback & Issues</h2>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {submissions.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getTypeIcon(item.type)}
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {item.type === 'engagement' ? 'Feedback' : 'Issue Report'}
                      </span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      item.status === 'resolved'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    }`}
                  >
                    {getStatusIcon(item.status)}
                    {item.status === 'resolved' ? 'Resolved' : 'Open'}
                  </button>
                </div>
              </div>
            ))}
            
            {submissions.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No submissions yet</h3>
                <p>Your submitted feedback and issues will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSupport;