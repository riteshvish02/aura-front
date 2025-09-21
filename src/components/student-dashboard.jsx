
import { useEffect, useState } from "react";
import axios from "../utils/Axios";
import { useSelector } from "react-redux";
import { BarChartIcon, BookIcon, Calendar1Icon, QrCodeIcon, XCircleIcon, CheckCircleIcon, LogOutIcon } from "lucide-react";
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
  // Attendance from Redux or API
  const attendanceFromStore = useSelector((state) => state.User.attendance || []);
  // Try to get attendance from Redux if available
  const student = useSelector((state) => state.User.user);

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
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar (reuse same style as SubjectsDashboard) */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 ">
            <div className="bg-white  border-b border-border px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h1 className="text-lg font-semibold text-black">Ritesh Vishwakarma</h1>
                            <p className="text-xs text-gray-500 mt-0.5">Roll Number: 123456</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link to={`/scanner`}>
                            <Button
                              size="sm"
                              className="h-8 px-3 text-xs font-medium bg-black hover:bg-black/90 text-white"
                            >
                              <QrCodeIcon className="w-3 h-3 mr-1.5" />
                              Scan QR
                            </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 text-xs text-black hover:text-black hover:bg-gray-100 "
                            >
                              <LogOutIcon className="w-3 h-3 mr-1.5" />
                              Logout
                            </Button>
                          </div>
                        </div>
                      </div>
          <h2 className="text-lg font-semibold mb-2 mt-3 ml-3">{todayName} Schedule</h2>
          <div className="mb-4 flex gap-6 ml-3">
            <span className="text-sm text-black font-medium">Total Classes: {totalClasses}</span>
            <span className="text-sm text-black font-medium">Remaining: {remainingClasses}</span>
          </div>
          {infoMsg && (
            <div className="mb-2 text-xs text-gray-500">{infoMsg}</div>
          )}
          <div className="grid grid-cols-1 gap-3 ml-3">
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : todaySchedule.length === 0 ? (
              <div className="text-gray-500">No classes scheduled for today.</div>
            ) : (
              todaySchedule.map((cls, idx) => {
                // Try different keys for class ID
                const classId = cls.sessionId;
                // Show only the correct status indicator for each class
                let statusBadge = null;
                if (cls.status === "Cancelled") {
                  statusBadge = (
                    <span className="flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-500">
                      <XCircleIcon className="w-5 h-5 text-gray-400 mr-1" /> Cancelled
                    </span>
                  );
                } else if (cls.status === "Held") {
                  statusBadge = (
                    <span className="flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-1" /> Held
                    </span>
                  );
                } else {
                  statusBadge = (
                    <span className="flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                      <XCircleIcon className="w-5 h-5 text-yellow-500 mr-1" /> Not Held
                    </span>
                  );
                }
                // Show Attended badge if student attended this session
                const attended = attendedSessionIds.map(id => id?.toString()).includes(classId?.toString());
                // Debug log for matching
                console.log(`DEBUG: Attended check for class ${idx+1}: sessionId=${classId?.toString()}, attendedSessionIds=`, attendedSessionIds.map(id => id?.toString()));
                return (
                  <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 border border-border rounded-lg px-4 py-3">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <span className="font-bold text-lg text-indigo-700 mr-2">{cls.subjectName}</span>
                      <span className="ml-0 md:ml-3 text-xs text-gray-500">{cls.time}</span>
                      {cls.teacherName && (
                        <span className="ml-0 md:ml-3 text-xs text-gray-400">Teacher: {cls.teacherName}</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0 items-center">
                      {statusBadge}
                      {attended && (
                        <span className="flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 ml-2">
                          <CheckCircleIcon className="w-5 h-5 text-blue-500 mr-1" /> Attended
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
