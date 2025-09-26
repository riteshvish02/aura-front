import { BookIcon, BarChartIcon, Calendar1Icon, QrCodeIcon, BookOpenIcon, MessageCircleIcon, SettingsIcon, UserIcon, MicIcon, MessageSquareIcon } from "lucide-react";
import { CalendarIcon } from "./icons";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="w-64 bg-white border-r border-border min-h-screen">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-[14px]">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <CalendarIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-black">AURA</span>
        </div>
      </div>
      <nav className="p-3 space-y-2">
        {/* Main Dashboard */}
        <div className="mb-4">
          <Link
            to="/student-dashboard"
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/student-dashboard' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
          >
            <Calendar1Icon className="w-4 h-4" />
            Dashboard
          </Link>
        </div>

        {/* Academic Section */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Academic</p>
          <div className="space-y-1">
            <Link
              to="/subject-dashboard"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/subject-dashboard' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
            >
              <BookIcon className="w-4 h-4" />
              Subjects
            </Link>
            <Link
              to="/daily-attendance"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/daily-attendance' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
            >
              <BarChartIcon className="w-4 h-4" />
              Daily Attendance
            </Link>
            <Link
              to="/assignments-resources"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/assignments-resources' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
            >
              <BookOpenIcon className="w-4 h-4" />
              Assignment & Resource
            </Link>
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Tools</p>
          <div className="space-y-1">
            <Link
              to="/scanner"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/scanner' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
            >
              <QrCodeIcon className="w-4 h-4" />
              Quick Scan
            </Link>
            <Link
              to="/voice-bot"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/voice-bot' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
            >
              <MicIcon className="w-4 h-4" />
              Voice Bot
            </Link>
            <Link
              to="/chat-bot"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/chat-bot' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
            >
              <MessageSquareIcon className="w-4 h-4" />
              Chat Bot
            </Link>
          </div>
        </div>

        {/* Support & Settings */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Support</p>
          <div className="space-y-1">
            <Link
              to="/feedback-support"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/feedback-support' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
            >
              <MessageCircleIcon className="w-4 h-4" />
              Feedback & Support
            </Link>
            <Link
              to="/settings"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${location.pathname === '/settings' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 transition-all duration-300'}`}
            >
              <UserIcon className="w-4 h-4" />
              Profile
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}