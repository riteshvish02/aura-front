import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftIcon, CalendarIcon, BarChartIcon, TrendingUpIcon } from "./icons"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Mock data for charts
const weeklyData = [
  { week: "Week 1", attendance: 85 },
  { week: "Week 2", attendance: 90 },
  { week: "Week 3", attendance: 75 },
  { week: "Week 4", attendance: 95 },
  { week: "Week 5", attendance: 80 },
  { week: "Week 6", attendance: 88 },
  { week: "Week 7", attendance: 92 },
  { week: "Week 8", attendance: 87 },
]

const monthlyData = [
  { month: "Jan", present: 18, absent: 2 },
  { month: "Feb", present: 16, absent: 4 },
  { month: "Mar", present: 19, absent: 1 },
  { month: "Apr", present: 17, absent: 3 },
]

const recentAttendance = [
  { date: "2024-01-15", status: "Present", time: "09:00 AM" },
  { date: "2024-01-12", status: "Present", time: "09:05 AM" },
  { date: "2024-01-10", status: "Absent", time: "-" },
  { date: "2024-01-08", status: "Present", time: "08:58 AM" },
  { date: "2024-01-05", status: "Present", time: "09:02 AM" },
]


function SubjectAnalytics() {
  const [viewType, setViewType] = useState("chart")
  const navigate = useNavigate();
  // Hardcoded subject info
  const subject = {
    name: "Data Structures",
    code: "CS201",
    attendancePercentage: 84,
    attendedClasses: 38,
    totalClasses: 45,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="px-6 py-8 mx-auto space-y-6">
        
        <div className="mb-2">
          <Button
            variant="ghost"
            className="border-gray-200 border bg-white hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="w-4 h-4" /> Back
          </Button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <BarChartIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black">{subject.name}</h1>
              <p className="text-sm text-gray-500">{subject.code} - Analytics Dashboard</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-black">{subject.attendancePercentage}%</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Classes Attended</p>
                <p className="text-2xl font-bold text-black">{subject.attendedClasses}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <BarChartIcon className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Classes Missed</p>
                <p className="text-2xl font-bold text-black">{subject.totalClasses - subject.attendedClasses}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-black">{subject.totalClasses}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <Button
            className={`${
              viewType === "chart" 
                ? "bg-black text-white hover:bg-gray-800" 
                : "bg-white text-black border border-gray-200 hover:bg-black hover:text-white"
            } transition-all duration-300`}
            onClick={() => setViewType("chart")}
          >
            Chart View
          </Button>

          <Button
            className={`${
              viewType === "list" 
                ? "bg-black text-white hover:bg-gray-800" 
                : "bg-white text-black border border-gray-200 hover:bg-black hover:text-white"
            } transition-all duration-300`}
            onClick={() => setViewType("list")}
          >
            List View
          </Button>
        </div>

        {viewType === "chart" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Attendance Trend */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-black">Weekly Attendance Trend</h3>
                <p className="text-sm text-gray-500">Your attendance percentage over the weeks</p>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#000000" 
                      strokeWidth={2}
                      dot={{ fill: '#000000', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#000000' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Present vs Absent */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-black">Monthly Overview</h3>
                <p className="text-sm text-gray-500">Present vs Absent classes by month</p>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Bar dataKey="present" fill="#000000" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="absent" fill="#9ca3af" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-black">Recent Attendance</h3>
              <p className="text-sm text-gray-500">Your attendance record for recent classes</p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {recentAttendance.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-black">{record.date}</p>
                        <p className="text-sm text-gray-500">
                          {record.time !== "-" ? `Marked at ${record.time}` : "No attendance"}
                        </p>
                      </div>
                    </div>
                    <span
               className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-medium tracking-wide transition-colors duration-200
  ${record.status === "Present" 
    ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100" 
    : "bg-gray-100 text-red-600 border border-gray-200 hover:bg-gray-200"
  }`}


                    >
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SubjectAnalytics;