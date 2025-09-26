import React, { useState } from "react";
import { CheckCircleIcon, LogOutIcon, QrCodeIcon, XCircleIcon, BookIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const dailyAttendanceData = [
  {
    day: "Monday",
    classes: [
      { subject: "DSA", time: "09:00 - 10:00", attended: true },
      { subject: "Maths", time: "10:15 - 11:15", attended: false },
      { subject: "OS", time: "11:30 - 12:30", attended: true },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { subject: "Maths", time: "09:00 - 10:00", attended: true },
      { subject: "DSA", time: "10:15 - 11:15", attended: true },
      { subject: "OS", time: "11:30 - 12:30", attended: false },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { subject: "OS", time: "09:00 - 10:00", attended: true },
      { subject: "DSA", time: "10:15 - 11:15", attended: false },
      { subject: "Maths", time: "11:30 - 12:30", attended: true },
    ],
  },
  {
    day: "Thursday",
    classes: [
      { subject: "DSA", time: "09:00 - 10:00", attended: true },
      { subject: "Maths", time: "10:15 - 11:15", attended: true },
      { subject: "OS", time: "11:30 - 12:30", attended: false },
    ],
  },
  {
    day: "Friday",
    classes: [
      { subject: "Maths", time: "09:00 - 10:00", attended: false },
      { subject: "DSA", time: "10:15 - 11:15", attended: true },
      { subject: "OS", time: "11:30 - 12:30", attended: true },
    ],
  },
  {
    day: "Saturday",
    classes: [
      { subject: "OS", time: "09:00 - 10:00", attended: true },
      { subject: "DSA", time: "10:15 - 11:15", attended: true },
      { subject: "Maths", time: "11:30 - 12:30", attended: false },
    ],
  },
];

export default function DailyAttendancePage() {
  const [selectedDay, setSelectedDay] = useState("Saturday");
  const todayData = dailyAttendanceData.find((d) => d.day === selectedDay);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
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

          <div className="p-6">
            {/* Page Title */}
            <h1 className="text-2xl font-bold text-black mb-6">Daily Attendance</h1>
            
            {/* Day Selection */}
            <div className="mb-6 flex gap-2 overflow-x-auto">
              {dailyAttendanceData.map((d) => (
                <button
                  key={d.day}
                  className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                    selectedDay === d.day 
                      ? "bg-black text-white" 
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedDay(d.day)}
                >
                  {d.day}
                </button>
              ))}
            </div>
            
            {/* Schedule Container */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-black">{selectedDay} Schedule</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3 max-w-3xl">
                  {todayData.classes.map((cls, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                          <BookIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">{cls.subject}</h3>
                          <p className="text-sm text-gray-500">{cls.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
  {cls.attended ? (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-green-50 text-green-700 border border-green-200">
      <CheckCircleIcon className="w-3 h-3 mr-1" /> 
      Attended
    </span>
  ) : (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-red-50 text-red-700 border border-red-200">
      <XCircleIcon className="w-3 h-3 mr-1" /> 
      Not Attended
    </span>
  )}
</div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}