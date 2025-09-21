import { BookIcon, BarChartIcon, Calendar1Icon, QrCodeIcon } from "lucide-react";
import { CalendarIcon } from "./icons";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="w-64 bg-white border-r border-border min-h-screen">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-[14px]">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            {/* Use CalendarIcon or BookIcon based on context if needed */}
            <CalendarIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-black">AttendanceHub</span>
        </div>
      </div>
      <nav className="p-3 space-y-1">
        <Link
          to="/subject-dashboard"
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/subject-dashboard' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
        >
          <BookIcon className="w-4 h-4" />
          Subjects
        </Link>
        <Link
          to="/student-dashboard"
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/student-dashboard' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
        >
          <Calendar1Icon className="w-4 h-4" />
          Dashboard
        </Link>
        <Link
          to="/scanner"
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/scanner' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
        >
          <QrCodeIcon className="w-4 h-4" />
          Quick Scan
        </Link>
        <Link
          to="/daily-attendance"
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/daily-attendance' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
        >
          <BarChartIcon className="w-4 h-4" />
          Daily Attendance
        </Link>
      </nav>
    </div>
  );
}
