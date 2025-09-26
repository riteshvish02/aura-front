import { useEffect, useState } from "react";
import axios from "../utils/Axios";
import { useSelector } from "react-redux";
import { BarChartIcon, BookIcon, Calendar1Icon, QrCodeIcon, XCircleIcon, CheckCircleIcon, LogOutIcon, Clock, Target, Coffee, Brain, TrendingUp, Award, Play, Pause, RotateCcw, AlertCircle, Users } from "lucide-react";
import { CalendarIcon } from "./icons";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);


export default function StudentDashboard() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todayName, setTodayName] = useState("");
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [totalClasses, setTotalClasses] = useState(0);
  const [remainingClasses, setRemainingClasses] = useState(0);
  const [infoMsg, setInfoMsg] = useState("");
  const [attendedSessionIds, setAttendedSessionIds] = useState([]);
  
  // Free Time Management States
  const [activeTask, setActiveTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentFreeSlot, setCurrentFreeSlot] = useState(null);
  
  // Attendance from Redux or API
  const attendanceFromStore = useSelector((state) => state.User.attendance || []);
  // Try to get attendance from Redux if available
  const student = useSelector((state) => state.User.user);

  // Free Time Activities Suggestions
  const freeTimeActivities = [
    {
      id: 1,
      title: "Complete Assignment",
      description: "Finish pending Data Structures assignment",
      duration: 30,
      priority: "high",
      category: "academic",
      icon: BookIcon,
      color: "red"
    },
    {
      id: 2,
      title: "Review Notes",
      description: "Go through today's Physics lecture notes",
      duration: 20,
      priority: "medium",
      category: "study",
      icon: Brain,
      color: "blue"
    },
    {
      id: 3,
      title: "Career Planning",
      description: "Research internship opportunities",
      duration: 25,
      priority: "medium",
      category: "career",
      icon: Target,
      color: "green"
    },
    {
      id: 4,
      title: "Skill Development",
      description: "Practice coding problems",
      duration: 45,
      priority: "low",
      category: "skills",
      icon: TrendingUp,
      color: "purple"
    },
    {
      id: 5,
      title: "Group Study",
      description: "Join study group for Mathematics",
      duration: 60,
      priority: "medium",
      category: "collaborative",
      icon: Users,
      color: "orange"
    },
    {
      id: 6,
      title: "Break Time",
      description: "Rest and recharge",
      duration: 15,
      priority: "low",
      category: "wellness",
      icon: Coffee,
      color: "gray"
    }
  ];

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Detect current free time slot
  useEffect(() => {
    if (todaySchedule.length > 0) {
      const now = currentTime.toTimeString().slice(0, 5);
      let freeSlot = null;
      
      for (let i = 0; i < todaySchedule.length - 1; i++) {
        const currentClass = todaySchedule[i];
        const nextClass = todaySchedule[i + 1];
        
        if (currentClass.time && nextClass.time) {
          const currentEndTime = currentClass.time.split(' - ')[1];
          const nextStartTime = nextClass.time.split(' - ')[0];
          
          if (now >= currentEndTime && now < nextStartTime) {
            freeSlot = {
              startTime: currentEndTime,
              endTime: nextStartTime,
              duration: calculateDuration(currentEndTime, nextStartTime)
            };
            break;
          }
        }
      }
      
      setCurrentFreeSlot(freeSlot);
    }
  }, [todaySchedule, currentTime]);

  const calculateDuration = (startTime, endTime) => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const start = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;
    return end - start;
  };

  const handleStartTask = (task) => {
    setActiveTask({ ...task, startTime: new Date() });
  };

  const handleCompleteTask = (taskId) => {
    const task = freeTimeActivities.find(t => t.id === taskId);
    setCompletedTasks([...completedTasks, { ...task, completedAt: new Date() }]);
    setActiveTask(null);
  };

  const handlePauseTask = () => {
    setActiveTask(null);
  };

  const resetDailyProgress = () => {
    setCompletedTasks([]);
    setActiveTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  useEffect(() => {
    const fetchScheduleAndAttendance = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!student || !student._id) {
          setError("Student not logged in.");
          setLoading(false);
          return;
        }
  // Get IST day name
  const istNow = dayjs().tz('Asia/Kolkata');
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayNameIST = dayNames[istNow.day()];
  // Fetch today's schedule
  const res = await axios.get(`/api/v1/student/schedule-today?studentId=${student._id}`);
  setTodayName(todayNameIST);
  setTodaySchedule(res.data.classes);
        setTotalClasses(res.data.classes.length);
        setInfoMsg(res.data.message || "");
        // Calculate remaining classes based on current time
        const now = new Date();
        const left = res.data.classes.filter(cls => {
          if (!cls.time) return false;
          const [start, end] = cls.time.split(' - ');
          // Parse time as HH:mm
          const [startHour, startMin] = start.split(':').map(Number);
          const classStart = new Date(now);
          classStart.setHours(startHour, startMin || 0, 0, 0);
          return classStart > now;
        }).length;
        setRemainingClasses(left);

        // Attendance: extract sessionIds from attendance array (Redux or API)
        let attendedIds = [];
        if (attendanceFromStore.length > 0) {
          attendedIds = attendanceFromStore.map(a => a.schedule);
        } else {
          // Always use IST midnight for today when fetching attendance
          const istMidnight = dayjs().tz('Asia/Kolkata').startOf('day').toDate();
          console.log('DEBUG: istMidnight.toISOString()', istMidnight.toISOString());
          const attRes = await axios.get(`/api/v1/attendance/student-today?studentId=${student._id}&date=${istMidnight.toISOString()}`);
          attendedIds = (attRes.data.SuccessResponse.attendance || attRes.data.SuccessResponse.data || []).map(a => a.schedule);
        }
        console.log('DEBUG: attendedSessionIds:', attendedIds.map(id => id?.toString()));
        if (todaySchedule && todaySchedule.length > 0) {
          todaySchedule.forEach((cls, idx) => {
            console.log(`DEBUG: class ${idx+1} sessionId:`, cls.sessionId?.toString());
          });
        }
        setAttendedSessionIds(attendedIds);
      } catch (err) {
        setError("Failed to fetch schedule or attendance. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchScheduleAndAttendance();
  }, [student]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-black">Ritesh Vishwakarma</h1>
                <p className="text-sm text-gray-500 mt-0.5">Roll Number: 123456</p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/scanner`}>
                  <Button
                    size="sm"
                    className="h-8 px-3 text-xs font-medium bg-black hover:bg-gray-800 text-white"
                  >
                    <QrCodeIcon className="w-3 h-3 mr-1.5" />
                    Scan QR
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-xs text-gray-600 hover:text-black hover:bg-gray-100"
                >
                  <LogOutIcon className="w-3 h-3 mr-1.5" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Classes</p>
                    <p className="text-2xl font-bold text-black">{totalClasses}</p>
                  </div>
                  <BookIcon className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Classes Attended</p>
                    <p className="text-2xl font-bold text-black">{attendedSessionIds.length}</p>
                  </div>
                  <CheckCircleIcon className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Remaining</p>
                    <p className="text-2xl font-bold text-black">{remainingClasses}</p>
                  </div>
                  <Calendar1Icon className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="bg-white rounded-lg border border-gray-200 mb-6">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                  <Calendar1Icon className="w-5 h-5 text-blue-500" />
                  {todayName} Schedule
                </h2>
                {infoMsg && (
                  <p className="text-sm text-gray-500 mt-1">{infoMsg}</p>
                )}
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : error ? (
                  <div className="text-center py-8 text-red-500">{error}</div>
                ) : todaySchedule.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No classes scheduled for today.</div>
                ) : (
                  <div className="space-y-3">
                    {todaySchedule.map((cls, idx) => {
                      const classId = cls.sessionId;
                      let statusBadge = null;
                     if (cls.status === "Cancelled") {
  statusBadge = (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-red-50 text-red-700 border border-red-200">
      <XCircleIcon className="w-3 h-3 mr-1" /> 
      Cancelled
    </span>
  );
} else if (cls.status === "Held") {
  statusBadge = (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-green-50 text-green-700 border border-green-200">
      <CheckCircleIcon className="w-3 h-3 mr-1" /> 
      Held
    </span>
  );
} else {
  statusBadge = (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-gray-100 text-gray-600 border border-gray-200">
      <XCircleIcon className="w-3 h-3 mr-1" /> 
      Not Held
    </span>
  );
}

                      
                      const attended = attendedSessionIds.map(id => id?.toString()).includes(classId?.toString());
                      console.log(`DEBUG: Attended check for class ${idx+1}: sessionId=${classId?.toString()}, attendedSessionIds=`, attendedSessionIds.map(id => id?.toString()));
                      
                      return (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                              <BookIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-black">{cls.subjectName}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{cls.time}</span>
                                {cls.teacherName && (
                                  <span>Teacher: {cls.teacherName}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {statusBadge}
                            {attended && (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-blue-50 text-blue-700 border border-blue-200">
    <CheckCircleIcon className="w-3 h-3 mr-1" /> 
    Attended
  </span>
)}

                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Free Time Management Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Current Free Time Status */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-orange-500" />
                  Free Time Status
                </h3>
                
                {currentFreeSlot ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-green-900">Free Time Available</p>
                      <p className="text-xs text-green-700">
                        {currentFreeSlot.startTime} - {currentFreeSlot.endTime} ({currentFreeSlot.duration} mins)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No free time right now</p>
                    <p className="text-xs text-gray-500">Next break after current class</p>
                  </div>
                )}
              </div>

              {/* Active Task */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Active Task
                </h3>
                
                {activeTask ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-blue-900">{activeTask.title}</h4>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {activeTask.duration}m
                        </span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">{activeTask.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCompleteTask(activeTask.id)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1"
                        >
                          <CheckCircleIcon className="w-3 h-3" />
                          Done
                        </button>
                        <button
                          onClick={handlePauseTask}
                          className="bg-gray-500 hover:bg-gray-600 text-white text-xs py-2 px-3 rounded-md transition-colors"
                        >
                          <Pause className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Play className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No active task</p>
                    <p className="text-xs text-gray-500">Start a productive activity</p>
                  </div>
                )}
              </div>

              {/* Progress Tracker */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  Today's Progress
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tasks Completed</span>
                    <span className="font-semibold text-green-600">{completedTasks.length}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((completedTasks.length / 6) * 100, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Time Used</span>
                    <span className="font-semibold text-blue-600">
                      {completedTasks.reduce((total, task) => total + task.duration, 0)} mins
                    </span>
                  </div>

                  <button
                    onClick={resetDailyProgress}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1 mt-3"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Free Time Activity Suggestions */}
            <div className="bg-white rounded-lg border border-gray-200 mb-6">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                  <Brain className="w-5 h-5 text-green-500" />
                  Suggested Activities for Free Time
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Make the most of your break time with productive activities
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {freeTimeActivities.map((activity) => {
                    const IconComponent = activity.icon;
                    const isCompleted = completedTasks.some(task => task.id === activity.id);
                    
                    return (
                      <div
                        key={activity.id}
                        className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                          isCompleted
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <IconComponent className={`w-4 h-4 text-${activity.color}-600`} />
                            <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getPriorityColor(activity.priority)}`}>
                              {activity.priority.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{activity.duration}m</span>
                        </div>
                        
                        <h4 className="font-medium text-gray-900 mb-1">{activity.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                        
                        <div className="flex gap-2">
                          {isCompleted ? (
                            <div className="flex items-center gap-1 text-green-600 text-sm">
                              <CheckCircleIcon className="w-4 h-4" />
                              Completed
                            </div>
                          ) : (
                            <button
                              onClick={() => handleStartTask(activity)}
                              disabled={activeTask !== null}
                              className="bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white text-sm py-2 px-4 rounded-md transition-colors flex items-center gap-1"
                            >
                              <Play className="w-3 h-3" />
                              Start
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}