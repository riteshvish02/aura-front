import React from 'react';
import DailyAttendancePage from './pages/student/DailyAttendancePage';
import { Route, Routes } from 'react-router-dom';
import StudentLoginPage from './pages/student/StudentloginPage';
import SubjectsDashboard from './components/subjects-dashboard';
import QRScanner from './components/qr-scanner';
import SubjectAnalytics from './components/subject-analytics';
import AuthPage from './pages/AuthPage';
import TeacherAdminLayout from './components/teacheradmin/TeacherAdminLayout';
import AdminProtected from './components/AdminProtected';
import TeacherScheduleDashboard from './pages/teacher/TeacherScheduleDashboard';
import TodaySchedule from './pages/teacher/TodaySchedule';
import StudentDashboard from './components/student-dashboard';
import Protectedroute from './components/Protectedroute';
import AssignmentsResources from './components/AssignmentsResources';
import FeedbackSupport from './components/FeedbackSupport';
import Settings from './components/Settings';
import Dashboard from './pages/Dashboard/TecherDashboard';
import StudentList from './pages/student/StudentList';
import AssignmentsPage from './pages/teacher/AssignmentsPage';
import SettingsPage from './pages/Dashboard/SettingsPage';
import AdminDailyAttendancePage from './pages/Dashboard/DailyAttendancePage';
import VoiceBot from './components/VoiceBot';
import ChatBot from './components/ChatBot';

const adminPages = [
  // Main Dashboard
  { path: 'dashboard', element: <Dashboard /> },
  
  // Academic Management
  { path: 'schedule', element: <TeacherScheduleDashboard /> },
  { path: 'students', element: <StudentList /> },
  { path: 'assignments', element: <AssignmentsPage /> },
  { path: 'daily-attendance', element: <AdminDailyAttendancePage /> },
  
  // Support & Configuration
  { path: 'feedback', element: <FeedbackSupport /> },
  { path: 'settings', element: <SettingsPage /> },
  
  // Add more admin pages here as needed
];

const App = () => (
  <Routes>
    <Route path='/' element={<StudentLoginPage />} />
    <Route path='/subject-dashboard' element={
      <Protectedroute>
        <SubjectsDashboard />
      </Protectedroute>
    } />

    <Route path='/student-dashboard' element={
      <Protectedroute>
        <StudentDashboard />
      </Protectedroute>
    } />
    <Route path='/daily-attendance' element={
      <Protectedroute>
        <DailyAttendancePage />
      </Protectedroute>
    } />
    <Route path='/scanner' element={
      <Protectedroute>
        <QRScanner />
      </Protectedroute>
    } />
    <Route path='/assignments-resources' element={
      <Protectedroute>
        <AssignmentsResources />
      </Protectedroute>
    } />
    <Route path='/feedback-support' element={
      <Protectedroute>
        <FeedbackSupport />
      </Protectedroute>
    } />
    <Route path='/settings' element={
      <Protectedroute>
        <Settings />
      </Protectedroute>
    } />
    <Route path='/voice-bot' element={
      <Protectedroute>
        <VoiceBot />
      </Protectedroute>
    } />
    <Route path='/chat-bot' element={
      <Protectedroute>
        <ChatBot />
      </Protectedroute>
    } />
    <Route path='/analytics/:subjectId' element={<SubjectAnalytics />} />
    <Route path='/auth' element={<AuthPage />} />
    <Route
      path='/admin'
      element={
        <AdminProtected>
          <TeacherAdminLayout />
        </AdminProtected>
      }
    >
      {adminPages.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      {/* Optionally, set dashboard as default */}
      <Route index element={<Dashboard />} />
      <Route path='today' element={<TodaySchedule />} />
    </Route>
  </Routes>
);

export default App;