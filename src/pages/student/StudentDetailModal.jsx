import React, { useState, useEffect } from 'react';
import { 
  X, Users, Mail, Phone, BookOpen, Calendar, Clock, 
  TrendingUp, Award, Target, BarChart3, User, 
  GraduationCap, MapPin, Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StudentDetailModal = ({ student, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [progressData, setProgressData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    if (student) {
      // Generate sample progress data - replace with actual API call
      setProgressData([
        { subject: 'Mathematics', completed: 85, total: 100, grade: 'A' },
        { subject: 'Physics', completed: 72, total: 100, grade: 'B+' },
        { subject: 'Chemistry', completed: 90, total: 100, grade: 'A+' },
        { subject: 'Biology', completed: 68, total: 100, grade: 'B' },
        { subject: 'English', completed: 88, total: 100, grade: 'A' },
      ]);

      setPerformanceData([
        { name: 'Excellent', value: 35, color: '#10B981' },
        { name: 'Good', value: 40, color: '#3B82F6' },
        { name: 'Average', value: 20, color: '#F59E0B' },
        { name: 'Needs Improvement', value: 5, color: '#EF4444' },
      ]);
    }
  }, [student]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateOverallProgress = () => {
    if (progressData.length === 0) return 0;
    const total = progressData.reduce((acc, item) => acc + item.completed, 0);
    return Math.round(total / progressData.length);
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'text-green-600 bg-green-100';
      case 'A': return 'text-green-600 bg-green-100';
      case 'B+': return 'text-blue-600 bg-blue-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C+': return 'text-yellow-600 bg-yellow-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                {student.name?.charAt(0)?.toUpperCase() || 'S'}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">{student.name || 'N/A'}</h2>
                <p className="text-black opacity-80">Roll No: {student.rollNo || 'N/A'}</p>
                <div className="flex items-center mt-1">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.isActive !== false 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {student.isActive !== false ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 flex-shrink-0">
          <div className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'progress'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Progress & Analytics
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{calculateOverallProgress()}%</p>
                  <p className="text-sm text-blue-800">Overall Progress</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">A</p>
                  <p className="text-sm text-green-800">Average Grade</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">5</p>
                  <p className="text-sm text-purple-800">Subjects</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <Star className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-600">92</p>
                  <p className="text-sm text-orange-800">Attendance %</p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{student.email || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{student.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Course</p>
                      <p className="font-medium">{student.course || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Joined Date</p>
                      <p className="font-medium">{formatDate(student.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-green-800">Completed Chemistry Assignment</p>
                      <p className="text-sm text-green-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-blue-800">Attended Physics Lab</p>
                      <p className="text-sm text-blue-600">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-purple-800">Submitted Math Project</p>
                      <p className="text-sm text-purple-600">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              {/* Subject Progress Bar Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Subject Progress
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#000000" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Subject Details */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Details</h3>
                  <div className="space-y-3">
                    {progressData.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 text-gray-400 mr-3" />
                          <div>
                            <p className="font-medium">{subject.subject}</p>
                            <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${subject.completed}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(subject.grade)}`}>
                            {subject.grade}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">{subject.completed}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Distribution */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Distribution</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {performanceData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Student ID: {student._id?.slice(-8) || 'N/A'} | Last updated: {formatDate(student.updatedAt)}
            </p>
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;