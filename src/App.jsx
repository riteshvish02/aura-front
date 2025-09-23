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
import Dashboard from './pages/Dashboard/Dashboard';
import StudentList from './pages/student/StudentList';
import FeedbackSupport from './pages/Dashboard/FeedbackSupport';
import AssignmentsPage from './pages/teacher/AssignmentsPage';
import SettingsPage from './pages/Dashboard/SettingsPage';
import AdminDailyAttendancePage from './pages/Dashboard/DailyAttendancePage';

const adminPages = [
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'schedule', element: <TeacherScheduleDashboard /> },
  { path: 'students', element: <StudentList /> },
  { path: 'assignments', element: <AssignmentsPage /> },
  { path: 'daily-attendance', element: <AdminDailyAttendancePage /> },
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
      <Route index element={<TeacherScheduleDashboard />} />
      <Route path='today' element={<TodaySchedule />} />
    </Route>
  </Routes>
);

export default App;