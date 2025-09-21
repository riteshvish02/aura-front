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
    <div className="min-h-screen bg-background p-8">
      <div className="px-12 mx-auto space-y-6">
        
        <div className="mb-2">
          <Button
            variant="ghost"
            className="border-gray-200 border-2 hover:bg-black hover:text-white duration-300 transition-all flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="w-4 h-4" /> Back
          </Button>
        </div>
        {/* Header */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl text-left font-semibold">{subject.name}</h1>
            <p className="text-gray-500 text-left">{subject.code} - Analytics Dashboard</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl text-left font-semibold">{subject.attendancePercentage}%</p>
                  <p className="text-sm text-gray-500">Attendance Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <BarChartIcon className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl text-left font-semibold">{subject.attendedClasses}</p>
                  <p className="text-sm text-gray-500">Classes Attended</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUpIcon className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-2xl text-left font-semibold">{subject.totalClasses - subject.attendedClasses}</p>
                  <p className="text-sm text-gray-500">Classes Missed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl text-left font-semibold">{subject.totalClasses}</p>
                  <p className="text-sm text-gray-500">Total Classes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <Button
            className={`${viewType === "chart" ? "bg-black text-white" : "bg-white text-black"} hover:bg-black hover:text-white duration-300 transition-all`}
            variant={viewType === "chart" ? "default" : "outline"}
            onClick={() => setViewType("chart")}
          >
            Chart View
          </Button>

          <Button
            className={`${viewType === "list" ? "bg-black text-white" : "bg-white text-black"} hover:bg-black hover:text-white duration-300 transition-all`}
            variant={viewType === "list" ? "default" : "outline"}
            onClick={() => setViewType("list")}
          >
            List View
          </Button>
        </div>

        {viewType === "chart" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Attendance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance Trend</CardTitle>
                <CardDescription>Your attendance percentage over the weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="attendance" stroke="#000000" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Present vs Absent */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                <CardDescription>Present vs Absent classes by month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="present" fill="#000000" />
                    <Bar dataKey="absent" fill="#6c757d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="text-left">
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Your attendance record for recent classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAttendance.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <CalendarIcon className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{record.date}</p>
                        <p className="text-sm text-gray-500">
                          {record.time !== "-" ? `Marked at ${record.time}` : "No attendance"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        record.status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default SubjectAnalytics;