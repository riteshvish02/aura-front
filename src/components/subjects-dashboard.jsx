import { Button } from "@/components/ui/button"
import { BookIcon, BarChartIcon, CalendarIcon, LogOutIcon, QrCodeIcon } from "./icons"
import { Calendar1Icon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar";

const mockSubjects = [
  { id: "1", name: "Data Structures", code: "CS201", totalClasses: 45, attendedClasses: 38, attendancePercentage: 84 },
  {
    id: "2",
    name: "Database Management",
    code: "CS202",
    totalClasses: 40,
    attendedClasses: 35,
    attendancePercentage: 88,
  },
  {
    id: "3",
    name: "Computer Networks",
    code: "CS203",
    totalClasses: 42,
    attendedClasses: 30,
    attendancePercentage: 71,
  },
  {
    id: "4",
    name: "Software Engineering",
    code: "CS204",
    totalClasses: 38,
    attendedClasses: 36,
    attendancePercentage: 95,
  },
  {
    id: "5",
    name: "Operating Systems",
    code: "CS205",
    totalClasses: 44,
    attendedClasses: 40,
    attendancePercentage: 91,
  },
]

export default function SubjectsDashboard() {
  const location = useLocation();
  const getAttendanceColor = (percentage) => {
    if (percentage >= 85) return "text-emerald-600"
    if (percentage >= 75) return "text-amber-600"
    return "text-red-500"
  }

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 85) return "Excellent"
    if (percentage >= 75) return "Good"
    return "Needs Improvement"
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Sidebar */}
      <div className="flex">
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

          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Subjects</p>
                    <p className="text-2xl font-bold text-black">{mockSubjects.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BookIcon className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Overall Attendance</p>
                    <p className="text-2xl font-bold text-black">
                      {Math.round(
                        mockSubjects.reduce((acc, sub) => acc + sub.attendancePercentage, 0) / mockSubjects.length,
                      )}
                      %
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Classes Attended</p>
                    <p className="text-2xl font-bold text-black">
                      {mockSubjects.reduce((acc, sub) => acc + sub.attendedClasses, 0)}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChartIcon className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects Section */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-black">Subjects</h2>
                  <p className="text-sm text-gray-500">{mockSubjects.length} subjects</p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {mockSubjects.map((subject) => (
                    <Link
                      to={`/analytics/2`}
                      key={subject.id}
                      className="block p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                            <BookIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-black">{subject.name}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">{subject.code}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Attendance</p>
                            <p className={`text-lg font-bold ${getAttendanceColor(subject.attendancePercentage)}`}>
                              {subject.attendancePercentage}%
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Classes</p>
                            <p className="text-lg font-bold text-black">
                              {subject.attendedClasses}/{subject.totalClasses}
                            </p>
                          </div>
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <BarChartIcon className="w-4 h-4 text-gray-600" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}