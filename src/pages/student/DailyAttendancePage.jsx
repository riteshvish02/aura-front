import React, { useState } from "react";
import { CheckCircleIcon, LogOutIcon, QrCodeIcon, XCircleIcon } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      <div className="flex">
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
          <h1 className="text-2xl font-bold mb-6 mt-5 ml-3">Daily Attendance</h1>
          <div className="mb-6 flex gap-3 ml-3">
            {dailyAttendanceData.map((d) => (
              <button
                key={d.day}
                className={`px-4 py-2 rounded-lg font-medium border ${selectedDay === d.day ? "bg-indigo-600 text-white" : "bg-gray-100 text-black"}`}
                onClick={() => setSelectedDay(d.day)}
              >
                {d.day}
              </button>
            ))}
          </div>
          <div className="max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">{selectedDay} Schedule</h2>
            <div className="space-y-4">
              {todayData.classes.map((cls, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 border border-border rounded-lg px-4 py-3">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-bold text-lg text-indigo-700 mr-2">{cls.subject}</span>
                    <span className="ml-0 md:ml-3 text-xs text-gray-500">{cls.time}</span>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0 items-center">
                    {cls.attended ? (
                      <span className="flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-1" /> Held
                      </span>
                    ) : (
                      <span className="flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                        <XCircleIcon className="w-5 h-5 text-yellow-500 mr-1" /> Not Held
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
  );
}
