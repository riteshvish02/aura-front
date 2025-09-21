import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, BookOpen, Clock, User } from 'lucide-react';
import axios from '../../utils/Axios'; // Adjust the import path as necessary
const TeacherScheduleDashboard = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call - replace with your actual axios call
    // axios.get('/api/v1/teacher-admin/teacher-schedule')
    // setTimeout(() => {
    //   // Mock data for demonstration
    //   const mockSchedule = [
    //     {
    //       day: 'Monday',
    //       classes: [
    //         { startTime: '09:00', endTime: '10:30', subject: 'Data Structures', teacherName: 'You' },
    //         { startTime: '11:00', endTime: '12:30', subject: 'Algorithms', teacherName: 'You' }
    //       ]
    //     },
    //     {
    //       day: 'Tuesday', 
    //       classes: [
    //         { startTime: '10:00', endTime: '11:30', subject: 'Database Systems', teacherName: 'You' }
    //       ]
    //     },
    //     {
    //       day: 'Wednesday',
    //       classes: []
    //     },
    //     {
    //       day: 'Thursday',
    //       classes: [
    //         { startTime: '14:00', endTime: '15:30', subject: 'Software Engineering', teacherName: 'You' }
    //       ]
    //     },
    //     {
    //       day: 'Friday',
    //       classes: [
    //         { startTime: '09:00', endTime: '10:30', subject: 'Data Structures', teacherName: 'You' }
    //       ]
    //     }
    //   ];
    //   setSchedule(mockSchedule);
    //   setLoading(false);
    // }, 1000);

    // Uncomment and use your actual API call:
    axios.get('/api/v1/teacher-admin/teacher-schedule')
      .then(res => {
        console.log('Fetched schedule:', res.data.schedule);
        setSchedule(res.data.schedule || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch schedule');
        setLoading(false);
      });
  }, []);

  // Calculate stats
  const totalClasses = schedule.reduce((total, day) => total + day.classes.length, 0);
  const activeDays = schedule.filter(day => day.classes.length > 0).length;
  const uniqueSubjects = new Set(schedule.flatMap(day => day.classes.map(cls => cls.subject))).size;
  const totalHours = schedule.reduce((total, day) => {
    return total + day.classes.reduce((dayTotal, cls) => {
      const start = new Date(`2000-01-01 ${cls.startTime}`);
      const end = new Date(`2000-01-01 ${cls.endTime}`);
      return dayTotal + (end - start) / (1000 * 60 * 60);
    }, 0);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Weekly Class Schedule</h1>
              <p className="text-gray-500 text-sm">Teacher Dashboard</p>
            </div>
          </div>
          
          <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Edit Weekly Schedule
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalClasses}</div>
              <div className="text-sm text-gray-500">Total Classes</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{activeDays}</div>
              <div className="text-sm text-gray-500">Active Days</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <User className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{uniqueSubjects}</div>
              <div className="text-sm text-gray-500">Unique Subjects</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalHours.toFixed(1)}h</div>
              <div className="text-sm text-gray-500">Total Hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Content */}
      <div className="max-w-6xl mx-auto">
        {schedule.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <div className="text-lg text-gray-500">No schedule found.</div>
          </div>
        ) : (
          <div className="space-y-6">
            {schedule.map(day => (
              <div key={day.day} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Day Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">{day.day}</h2>
                </div>

                {/* Classes */}
                <div className="p-6">
                  {day.classes.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No classes scheduled</div>
                  ) : (
                    <div className="space-y-4">
                      {day.classes.map((cls, idx) => (
                        <div 
                          key={idx} 
                          className="bg-gray-50 p-5 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Time */}
                            <div>
                              <div className="text-sm font-medium text-gray-500 mb-1">TIME</div>
                              <div className="text-base font-semibold text-gray-900">
                                {cls.startTime} - {cls.endTime}
                              </div>
                            </div>

                            {/* Subject */}
                            <div>
                              <div className="text-sm font-medium text-gray-500 mb-1">SUBJECT</div>
                              <div className="text-base font-bold text-indigo-700">
                                {cls.subjectName || cls.subject}
                              </div>
                            </div>

                            {/* Teacher */}
                            <div>
                              <div className="text-sm font-medium text-gray-500 mb-1">TEACHER</div>
                              <div className="text-base font-semibold text-gray-900">
                                {cls.teacherName || 'You'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherScheduleDashboard;