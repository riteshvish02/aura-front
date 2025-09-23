import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userLogout } from '../../store/actions/useraction';
import { BookOpen, Users, CalendarDays, LogOut, Plus, Settings, List, Edit, BarChart3, CheckCircle, ClipboardList, FileText, MessageCircle, FileTextIcon } from 'lucide-react';

const teacherSidebarItems = [
    { name: 'Dashboard', icon: BookOpen, path: '/admin/dashboard' }, { name: 'Schedule', icon: List, path: '/admin/schedule' }, { name: 'Today', icon: CalendarDays, path: '/admin/today' }, { name: 'Attendance', icon: CalendarDays, path: '/admin/daily-attendance' },   { name: 'Students', icon: Users, path: '/admin/students' }, { 
    name: 'Assignments & Resources', 
    icon: FileTextIcon, 
    path: '/admin/assignments' 
  },
  { 
    name: 'Feedback & Support', 
    icon: MessageCircle, 
    path: '/admin/feedback' 
  }, { name: 'Settings', icon: Settings, path: '/admin/settings' }
];

const TeacherAdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector(state => state.User);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            try {
                dispatch(userLogout());
                toast.success("Logged out successfully");
                navigate('/auth', { replace: true });
            } catch (error) {
                console.error('Logout error:', error);
                toast.error("Error during logout");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-sm border-r border-gray-200 fixed h-full overflow-y-auto">
                <div className="p-4">
                    <div className="flex items-center mb-8">
                        <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-xl font-bold text-gray-900">Teacher Admin</h1>
                    </div>
                    <nav className="space-y-1">
                        {teacherSidebarItems.map((item, index) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className={`flex items-center px-4 py-3 text-md font-medium rounded-md transition-colors ${isActive
                                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-sm font-bold text-gray-600">
                                    Welcome : <span className="font-bold font-medium text-gray-900">
                                        {user?.name || user?.email || 'Teacher'}
                                    </span>
                                </h2>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-red-300 rounded text-red-700 hover:text-gray-900"
                                >
                                    <LogOut className="h-4 w-4 mr-1" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                {/* Page Content */}
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default TeacherAdminLayout;
