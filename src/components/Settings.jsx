import React, { useState } from 'react';
import { 
  SettingsIcon, 
  UserIcon, 
  BellIcon, 
  ShieldIcon, 
  PaletteIcon, 
  DownloadIcon,
  LogOutIcon,
  EditIcon,
  SaveIcon,
  XIcon,
  MoonIcon,
  SunIcon
} from 'lucide-react';
import Sidebar from './Sidebar';

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    attendance: true,
    assignments: true,
    announcements: false,
    email: true
  });

  const [userProfile, setUserProfile] = useState({
    name: 'Student One',
    email: 'student.one@college.edu',
    rollNumber: 'CSE2025001',
    course: 'Computer Science Engineering',
    semester: '4th Semester',
    year: '2nd Year',
    phone: '+91 9876543210',
    address: 'Student Hostel, College Campus',
    dateOfBirth: '2005-03-15',
    bloodGroup: 'B+'
  });

  const [tempProfile, setTempProfile] = useState({ ...userProfile });

  const handleEditToggle = () => {
    if (isEditing) {
      setUserProfile({ ...tempProfile });
    } else {
      setTempProfile({ ...userProfile });
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setTempProfile({ ...userProfile });
    setIsEditing(false);
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleExportData = () => {
    console.log('Exporting data...');
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Profile & Settings</h1>
            <p className="text-gray-600">Manage your student profile and account preferences</p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Student Profile</h2>
                    <p className="text-sm text-gray-600">Update your personal and academic information</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleEditToggle}
                        className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 flex items-center gap-1"
                      >
                        <SaveIcon className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 flex items-center gap-1"
                      >
                        <XIcon className="w-4 h-4" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEditToggle}
                      className="px-3 py-1.5 bg-black text-white text-sm rounded-md hover:bg-gray-800 flex items-center gap-1"
                    >
                      <EditIcon className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                  <input
                    type="text"
                    value={isEditing ? tempProfile.name : userProfile.name}
                    onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={isEditing ? tempProfile.email : userProfile.email}
                    onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                
                {/* Academic Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={userProfile.rollNumber}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <input
                    type="text"
                    value={userProfile.course}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label>
                  <input
                    type="text"
                    value={userProfile.semester}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={userProfile.year}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                  />
                </div>
                
                {/* Contact Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={isEditing ? tempProfile.phone : userProfile.phone}
                    onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={isEditing ? tempProfile.address : userProfile.address}
                    onChange={(e) => setTempProfile({...tempProfile, address: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                
                {/* Additional Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={isEditing ? tempProfile.dateOfBirth : userProfile.dateOfBirth}
                    onChange={(e) => setTempProfile({...tempProfile, dateOfBirth: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <input
                    type="text"
                    value={isEditing ? tempProfile.bloodGroup : userProfile.bloodGroup}
                    onChange={(e) => setTempProfile({...tempProfile, bloodGroup: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BellIcon className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Student Notifications</h2>
                  <p className="text-sm text-gray-600">Manage your academic notification preferences</p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {key === 'attendance' ? 'Attendance Alerts' : 
                         key === 'assignments' ? 'Assignment Due Dates' :
                         key === 'announcements' ? 'College Announcements' : 
                         'Email Notifications'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {key === 'attendance' ? 'Get alerts when attendance falls below 75%' : 
                         key === 'assignments' ? 'Receive reminders for assignment deadlines' :
                         key === 'announcements' ? 'Stay updated with college and department news' : 
                         'Receive important notifications via email'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-black' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <PaletteIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
                  <p className="text-sm text-gray-600">Customize your app appearance</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDarkMode ? <MoonIcon className="w-5 h-5 text-gray-600" /> : <SunIcon className="w-5 h-5 text-gray-600" />}
                  <div>
                    <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                    <p className="text-sm text-gray-500">Switch to dark theme</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDarkMode ? 'bg-black' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <ShieldIcon className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Account Security</h2>
                  <p className="text-sm text-gray-600">Manage your student account security settings</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="text-sm font-medium text-gray-900">Change Login Password</p>
                  <p className="text-sm text-gray-500">Update your student portal password</p>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="text-sm font-medium text-gray-900">Security Questions</p>
                  <p className="text-sm text-gray-500">Set up security questions for account recovery</p>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="text-sm font-medium text-gray-900">Login Activity</p>
                  <p className="text-sm text-gray-500">View recent login activity and devices</p>
                </button>
              </div>
            </div>

            {/* Data & Privacy */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DownloadIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Academic Data & Privacy</h2>
                  <p className="text-sm text-gray-600">Manage your academic data and privacy preferences</p>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleExportData}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900">Download Academic Records</p>
                  <p className="text-sm text-gray-500">Export attendance, grades, and assignment data</p>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="text-sm font-medium text-gray-900">Profile Visibility</p>
                  <p className="text-sm text-gray-500">Control who can view your student profile</p>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="text-sm font-medium text-gray-900">Data Sharing Preferences</p>
                  <p className="text-sm text-gray-500">Manage sharing of academic data with parents/guardians</p>
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Account Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="text-sm font-medium text-gray-900">Request Transcript</p>
                  <p className="text-sm text-gray-500">Request official academic transcript</p>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="text-sm font-medium text-gray-900">Contact Support</p>
                  <p className="text-sm text-gray-500">Get help with your student account</p>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <LogOutIcon className="w-4 h-4" />
                  Sign Out from Student Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;