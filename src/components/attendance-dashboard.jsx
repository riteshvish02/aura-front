// AttendanceDashboard.jsx
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { CheckCircleIcon, ClockIcon, CalendarIcon, QRCodeIcon } from "./icons"

export default function AttendanceDashboard({ studentId, onScanQR, onLogout }) {
  const attendanceRecords = [
    { date: "2024-01-15", subject: "Mathematics", status: "present", time: "09:00 AM" },
    { date: "2024-01-15", subject: "Physics", status: "present", time: "11:00 AM" },
    { date: "2024-01-14", subject: "Chemistry", status: "absent", time: "10:00 AM" },
    { date: "2024-01-14", subject: "English", status: "present", time: "02:00 PM" },
  ]

  const stats = {
    totalClasses: 24,
    attended: 20,
    percentage: 83.3,
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Welcome</h1>
            <p className="text-sm text-muted-foreground">ID: {studentId}</p>
          </div>
          <Button variant="ghost" onClick={onLogout} className="text-muted-foreground">
            Logout
          </Button>
        </div>

        {/* Quick Scan Button */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <Button
              onClick={onScanQR}
              variant="secondary"
              className="w-full h-14 text-base font-medium bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <QRCodeIcon className="w-6 h-6 mr-3" />
              Scan QR for Attendance
            </Button>
          </CardContent>
        </Card>

        {/* Attendance Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Attendance Overview</CardTitle>
            <CardDescription>Your attendance statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{stats.totalClasses}</div>
                <div className="text-xs text-muted-foreground">Total Classes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.attended}</div>
                <div className="text-xs text-muted-foreground">Attended</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.percentage}%</div>
                <div className="text-xs text-muted-foreground">Percentage</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Attendance</CardTitle>
            <CardDescription>Last 4 classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendanceRecords.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      record.status === "present" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {record.status === "present" ? (
                      <CheckCircleIcon className="w-4 h-4" />
                    ) : (
                      <ClockIcon className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{record.subject}</div>
                    <div className="text-xs text-muted-foreground flex items-center space-x-1">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{record.date}</span>
                      <span>•</span>
                      <span>{record.time}</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    record.status === "present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {record.status === "present" ? "Present" : "Absent"}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}