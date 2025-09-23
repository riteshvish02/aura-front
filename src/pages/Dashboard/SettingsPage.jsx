import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Settings, Bell, Save, Check, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.User);
  
  // Profile Settings State
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  // Attendance Method State
  const [attendanceMethod, setAttendanceMethod] = useState('QR');
  
  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    alerts: true,
    reminders: true,
    dailyReports: false,
    weeklyReports: true
  });
  
  // Loading and Success States
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize form data from user
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  // Handle profile data changes
  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle notification toggle
  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (profileData.phone && !/^\+?[\d\s-()]+$/.test(profileData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically dispatch an action to update user profile
      // dispatch(updateUserProfile({ 
      //   ...profileData, 
      //   attendanceMethod, 
      //   notifications 
      // }));
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      console.log('Settings saved:', {
        profile: profileData,
        attendanceMethod,
        notifications
      });
      
    } catch (error) {
      console.error('Error saving settings:', error);
      setErrors({ general: 'Failed to save settings. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center">
            <Settings className="w-8 h-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-gray-300 mt-1">Manage your profile and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <Check className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-green-800">Settings saved successfully!</span>
          </div>
        )}

        {/* General Error */}
        {errors.general && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <X className="w-5 h-5 text-red-600 mr-3" />
            <span className="text-red-800">{errors.general}</span>
          </div>
        )}

        <div className="space-y-8">
          {/* Profile Settings */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-gray-700 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={profileData.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Attendance Method */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Settings className="w-6 h-6 text-gray-700 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Attendance Method</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">Choose your preferred method for student attendance tracking:</p>
              
              {/* QR Code Option */}
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="attendanceMethod"
                  value="QR"
                  checked={attendanceMethod === 'QR'}
                  onChange={(e) => setAttendanceMethod(e.target.value)}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">QR Code Scanning</div>
                  <div className="text-sm text-gray-500">Students scan QR codes to mark attendance</div>
                </div>
              </label>

              {/* Face Recognition Option */}
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="attendanceMethod"
                  value="Face"
                  checked={attendanceMethod === 'Face'}
                  onChange={(e) => setAttendanceMethod(e.target.value)}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Face Recognition</div>
                  <div className="text-sm text-gray-500">Automatic attendance using facial recognition</div>
                </div>
              </label>

              {/* Bluetooth Option */}
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="attendanceMethod"
                  value="Bluetooth"
                  checked={attendanceMethod === 'Bluetooth'}
                  onChange={(e) => setAttendanceMethod(e.target.value)}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Bluetooth Proximity</div>
                  <div className="text-sm text-gray-500">Mark attendance based on Bluetooth proximity</div>
                </div>
              </label>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Bell className="w-6 h-6 text-gray-700 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">Configure your notification settings:</p>
              
              {/* Alerts Toggle */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">System Alerts</div>
                  <div className="text-sm text-gray-500">Receive notifications for important system events</div>
                </div>
                <button
                  onClick={() => handleNotificationToggle('alerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.alerts ? 'bg-black' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.alerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Reminders Toggle */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">Class Reminders</div>
                  <div className="text-sm text-gray-500">Get reminders before your scheduled classes</div>
                </div>
                <button
                  onClick={() => handleNotificationToggle('reminders')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.reminders ? 'bg-black' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.reminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Daily Reports Toggle */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">Daily Reports</div>
                  <div className="text-sm text-gray-500">Receive daily attendance and activity summaries</div>
                </div>
                <button
                  onClick={() => handleNotificationToggle('dailyReports')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.dailyReports ? 'bg-black' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.dailyReports ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Weekly Reports Toggle */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">Weekly Reports</div>
                  <div className="text-sm text-gray-500">Get weekly performance and attendance analytics</div>
                </div>
                <button
                  onClick={() => handleNotificationToggle('weeklyReports')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.weeklyReports ? 'bg-black' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.weeklyReports ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveChanges}
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-medium text-white transition-colors flex items-center ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-gray-800'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;