import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { DownloadIcon, FileTextIcon, BookOpenIcon, CalendarIcon, ClockIcon } from 'lucide-react';

const AssignmentsResources = () => {
  const [activeTab, setActiveTab] = useState('assignments');

  const assignmentsData = [
    {
      id: 1,
      title: "Data Structures Assignment 1",
      subject: "Data Structures",
      subjectCode: "CS201",
      dueDate: "2025-09-30",
      status: "pending",
      description: "Implement Binary Search Tree with insertion, deletion, and traversal operations.",
      submittedDate: null,
      marks: null
    },
    {
      id: 2,
      title: "Database Design Project",
      subject: "Database Management",
      subjectCode: "CS202",
      dueDate: "2025-10-05",
      status: "submitted",
      description: "Design a complete database schema for an e-commerce application.",
      submittedDate: "2025-09-20",
      marks: 85
    },
    {
      id: 3,
      title: "Network Protocol Analysis",
      subject: "Computer Networks",
      subjectCode: "CS203",
      dueDate: "2025-10-10",
      status: "pending",
      description: "Analyze TCP/UDP protocols and create a comparative study report.",
      submittedDate: null,
      marks: null
    },
    {
      id: 4,
      title: "Software Testing Report",
      subject: "Software Engineering",
      subjectCode: "CS204",
      dueDate: "2025-09-25",
      status: "overdue",
      description: "Create comprehensive test cases for a web application.",
      submittedDate: null,
      marks: null
    },
    {
      id: 5,
      title: "OS Process Scheduling",
      subject: "Operating Systems",
      subjectCode: "CS205",
      dueDate: "2025-10-15",
      status: "submitted",
      description: "Implement different process scheduling algorithms and compare their performance.",
      submittedDate: "2025-09-18",
      marks: 92
    }
  ];

  const resourcesData = [
    {
      id: 1,
      title: "Data Structures Handbook",
      subject: "Data Structures",
      subjectCode: "CS201",
      type: "PDF",
      size: "2.5 MB",
      uploadedDate: "2025-09-10",
      category: "Study Material"
    },
    {
      id: 2,
      title: "SQL Query Examples",
      subject: "Database Management",
      subjectCode: "CS202",
      type: "PDF",
      size: "1.2 MB",
      uploadedDate: "2025-09-12",
      category: "Examples"
    },
    {
      id: 3,
      title: "Network Configuration Guide",
      subject: "Computer Networks",
      subjectCode: "CS203",
      type: "DOC",
      size: "3.1 MB",
      uploadedDate: "2025-09-15",
      category: "Tutorial"
    },
    {
      id: 4,
      title: "Software Engineering Best Practices",
      subject: "Software Engineering",
      subjectCode: "CS204",
      type: "PDF",
      size: "4.2 MB",
      uploadedDate: "2025-09-08",
      category: "Reference"
    },
    {
      id: 5,
      title: "Operating System Concepts",
      subject: "Operating Systems",
      subjectCode: "CS205",
      type: "PDF",
      size: "5.8 MB",
      uploadedDate: "2025-09-14",
      category: "Study Material"
    },
    {
      id: 6,
      title: "Code Examples Repository",
      subject: "Data Structures",
      subjectCode: "CS201",
      type: "ZIP",
      size: "1.8 MB",
      uploadedDate: "2025-09-16",
      category: "Code"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Assignment & Resources</h1>
            <p className="text-gray-600">Manage your assignments and access course resources</p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('assignments')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'assignments'
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileTextIcon className="w-4 h-4" />
                    Assignments
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'resources'
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpenIcon className="w-4 h-4" />
                    Resources
                  </div>
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'assignments' && (
                <div className="space-y-4">
                  {assignmentsData.map((assignment) => (
                    <div key={assignment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <BookOpenIcon className="w-4 h-4" />
                              {assignment.subject} ({assignment.subjectCode})
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              Due: {formatDate(assignment.dueDate)}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">{assignment.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                          </span>
                          {assignment.marks && (
                            <span className="text-sm font-semibold text-gray-900">
                              Marks: {assignment.marks}/100
                            </span>
                          )}
                        </div>
                      </div>
                      {assignment.submittedDate && (
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          Submitted on: {formatDate(assignment.submittedDate)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {resourcesData.map((resource) => (
                    <div key={resource.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                          <div className="text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1 mb-1">
                              <BookOpenIcon className="w-4 h-4" />
                              {resource.subject} ({resource.subjectCode})
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {resource.category}
                              </span>
                              <span className="text-xs text-gray-500">{resource.size}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          <CalendarIcon className="w-3 h-3 inline mr-1" />
                          {formatDate(resource.uploadedDate)}
                        </div>
                        <button className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-colors">
                          <DownloadIcon className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsResources;