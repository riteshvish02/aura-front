import React, { useState, useEffect } from 'react';
import { Calendar, Users, FileText, Download, AlertTriangle, CheckCircle, XCircle, Clock, Filter, Send } from 'lucide-react';

const DailyAttendancePage = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [defaultersData, setDefaultersData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Filter states for History tab
  const [historyFilters, setHistoryFilters] = useState({
    date: '',
    month: '',
    class: ''
  });

  // Mock data - replace with actual API calls
  const classes = [
    { id: 'cs-101', name: 'Computer Science 101' },
    { id: 'cs-102', name: 'Data Structures' },
    { id: 'cs-103', name: 'Algorithms' },
    { id: 'cs-104', name: 'Database Systems' }
  ];

  const mockTodayAttendance = [
    { id: 1, name: 'John Doe', rollNo: 'CS2025001', status: 'present', lastSeen: '09:15 AM' },
    { id: 2, name: 'Jane Smith', rollNo: 'CS2025002', status: 'absent', lastSeen: 'N/A' },
    { id: 3, name: 'Mike Johnson', rollNo: 'CS2025003', status: 'proxy', lastSeen: '09:10 AM' },
    { id: 4, name: 'Sarah Wilson', rollNo: 'CS2025004', status: 'present', lastSeen: '09:20 AM' },
    { id: 5, name: 'David Brown', rollNo: 'CS2025005', status: 'absent', lastSeen: 'N/A' }
  ];

  const mockHistoryData = [
    { id: 1, date: '2025-09-21', class: 'CS-101', present: 18, absent: 7, total: 25 },
    { id: 2, date: '2025-09-20', class: 'CS-102', present: 22, absent: 3, total: 25 },
    { id: 3, date: '2025-09-19', class: 'CS-103', present: 20, absent: 5, total: 25 }
  ];

  const mockDefaulters = [
    { id: 1, name: 'Alex Kumar', rollNo: 'CS2025010', attendance: 65, totalClasses: 20, present: 13 },
    { id: 2, name: 'Emma Davis', rollNo: 'CS2025011', attendance: 70, totalClasses: 20, present: 14 },
    { id: 3, name: 'Ryan Miller', rollNo: 'CS2025012', attendance: 60, totalClasses: 20, present: 12 }
  ];

  useEffect(() => {
    // Initialize data
    setAttendanceData(mockTodayAttendance);
    setHistoryData(mockHistoryData);
    setDefaultersData(mockDefaulters);
  }, []);

  // Toggle attendance status
  const toggleAttendance = (studentId) => {
    setAttendanceData(prev => prev.map(student => {
      if (student.id === studentId) {
        const newStatus = student.status === 'present' ? 'absent' : 'present';
        return { ...student, status: newStatus };
      }
      return student;
    }));
  };

  // Get status icon and color
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'present':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', text: 'Present' };
      case 'absent':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', text: 'Absent' };
      case 'proxy':
        return { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-100', text: 'Proxy' };
      default:
        return { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100', text: 'Unknown' };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Export functionality
  const handleExport = (format) => {
    console.log(`Exporting attendance data in ${format} format`);
    // Implement actual export logic here
  };

  // Send warning to defaulter
  const sendWarning = (studentId) => {
    console.log(`Sending warning to student ${studentId}`);
    // Implement warning logic here
  };

  // Tab content components
  const TodayTab = () => (
    <div className="space-y-6">
      {/* Class Selector */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <label htmlFor="classSelect" className="block text-sm font-medium text-gray-700 mb-2">
          Select Class
        </label>
        <select
          id="classSelect"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
        >
          <option value="">Choose a class...</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>
      </div>

      {/* Attendance Table */}
      {selectedClass && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Today's Attendance</h3>
            <p className="text-sm text-gray-600">
              {attendanceData.filter(s => s.status === 'present').length} present, 
              {attendanceData.filter(s => s.status === 'absent').length} absent, 
              {attendanceData.filter(s => s.status === 'proxy').length} proxy
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Seen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.map((student) => {
                  const statusDisplay = getStatusDisplay(student.status);
                  const StatusIcon = statusDisplay.icon;
                  
                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{student.rollNo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDisplay.bg} ${statusDisplay.color}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusDisplay.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.lastSeen}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => toggleAttendance(student.id)}
                          className="bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Mark {student.status === 'present' ? 'Absent' : 'Present'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const HistoryTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={historyFilters.date}
              onChange={(e) => setHistoryFilters(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <input
              type="month"
              value={historyFilters.month}
              onChange={(e) => setHistoryFilters(prev => ({ ...prev, month: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              value={historyFilters.class}
              onChange={(e) => setHistoryFilters(prev => ({ ...prev, class: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            >
              <option value="">All Classes</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end space-x-2">
            <button
              onClick={() => handleExport('pdf')}
              className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-1" />
              PDF
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-1" />
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Attendance History</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historyData.map((record) => {
                const percentage = Math.round((record.present / record.total) * 100);
                return (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(record.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.class}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      {record.present}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                      {record.absent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {record.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        percentage >= 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {percentage}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const DefaultersTab = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Attendance Defaulters</h3>
            <p className="text-sm text-gray-600">Students with less than 75% attendance</p>
          </div>
        </div>

        {defaultersData.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Great! No Defaulters</h3>
            <p className="text-gray-500">All students have attendance above 75%</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Present/Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {defaultersData.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{student.rollNo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.present}/{student.totalClasses}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.attendance >= 75 ? 'bg-green-100 text-green-800' : 
                        student.attendance >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {student.attendance}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => sendWarning(student.id)}
                        className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Send Warning
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <Users className="w-8 h-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Daily Attendance</h1>
              <p className="text-gray-300 mt-1">Track and manage student attendance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'today', label: 'Today', icon: Calendar },
              { id: 'history', label: 'History', icon: FileText },
              { id: 'defaulters', label: 'Defaulters', icon: AlertTriangle }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === id
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'today' && <TodayTab />}
        {activeTab === 'history' && <HistoryTab />}
        {activeTab === 'defaulters' && <DefaultersTab />}
      </div>
    </div>
  );
};

export default DailyAttendancePage;