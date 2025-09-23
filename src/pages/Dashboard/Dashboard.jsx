import React from 'react';
import { Bell, Users, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const notifications = [
    { type: "request", message: "Student John Doe requested meeting for project guidance", time: "10 min ago" },
    { type: "alert", message: "Room-205 projector needs maintenance", time: "1 hour ago" },
    { type: "request", message: "Assignment submission deadline extended by 2 days", time: "2 hours ago" },
    { type: "alert", message: "New course material uploaded to portal", time: "3 hours ago" },
    { type: "request", message: "Student Sarah requested grade review", time: "5 hours ago" }
  ];

  return (
    <div className="min-h-screen bg-white">
    

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Today's Attendance */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Today's Attendance</p>
                <p className="text-3xl font-bold text-green-600 mt-2">87%</p>
                <p className="text-xs text-gray-500 mt-1">142/163 students</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Classes Scheduled */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Classes Today</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">4</p>
                <p className="text-xs text-gray-500 mt-1">2 completed, 2 pending</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Free Periods */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Next Free Period</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">12:00</p>
                <p className="text-xs text-gray-500 mt-1">1 hour break</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          {/* Pending Feedback */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Issues</p>
                <p className="text-3xl font-bold text-red-600 mt-2">7</p>
                <p className="text-xs text-gray-500 mt-1">5 feedback, 2 requests</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Notifications Section - Full Width */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Recent Notifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0">
                  {notification.type === 'request' ? (
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 leading-relaxed">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;