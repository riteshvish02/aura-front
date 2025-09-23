import React, { useState, useEffect } from 'react';
import { Users, Search, UserCheck, Clock, Calendar } from 'lucide-react';
import axios from '../../utils/Axios';
import StudentDetailModal from './StudentDetailModal'; // Import the modal component

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalStudents, setTotalStudents] = useState(0);
  
  // Modal state
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    // Filter students based on search term
    const filtered = students.filter(student => 
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('userToken');
      const response = await axios.get('/api/v1/student/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data?.SuccessResponse?.data) {
        const { students: studentData, total } = response.data.SuccessResponse.data;
        setStudents(studentData || []);
        setFilteredStudents(studentData || []);
        setTotalStudents(total || 0);
      } else {
        setError('Failed to fetch students');
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(err.response?.data?.ErrorResponse?.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle student card click
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Users className="w-16 h-16 mx-auto mb-2" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Students</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchStudents}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Users className="w-8 h-8 mr-3" />
                Student List
              </h1>
              <p className="text-gray-300 mt-1">
                Total Students: {totalStudents}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students by name, roll number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{totalStudents}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Showing Results</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{filteredStudents.length}</p>
              </div>
              <Search className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Students</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {students.filter(s => s.isActive !== false).length}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Students Grid */}
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No students found' : 'No students available'}
            </h3>
            <p className="text-gray-500">
              {searchTerm 
                ? 'Try adjusting your search criteria' 
                : 'Students will appear here once they are registered'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, index) => (
              <div 
                key={student._id || index} 
                className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-blue-300"
                onClick={() => handleStudentClick(student)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-semibold">
                      {student.name?.charAt(0)?.toUpperCase() || 'S'}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">
                        {student.name || 'N/A'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Roll: {student.rollNo || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.isActive !== false 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {student.isActive !== false ? 'Active' : 'Inactive'}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Joined: {formatDate(student.createdAt)}</span>
                  </div>
                  
                  {student.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="w-4 h-4 mr-2">📧</span>
                      <span className="truncate">{student.email}</span>
                    </div>
                  )}
                  
                  {student.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="w-4 h-4 mr-2">📱</span>
                      <span>{student.phone}</span>
                    </div>
                  )}

                  {student.course && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="w-4 h-4 mr-2">📚</span>
                      <span>{student.course}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Last updated: {formatDate(student.updatedAt)}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>ID: {student._id?.slice(-6) || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Click indicator */}
                <div className="mt-3 text-center">
                  <span className="text-xs text-blue-600 font-medium">Click to view details</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      <StudentDetailModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default StudentList;