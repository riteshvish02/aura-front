import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, BookOpen, Clock, User, MapPin, GraduationCap, Users } from 'lucide-react';
import axios from '../../utils/Axios';

const TeacherScheduleDashboard = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/v1/teacher-admin/teacher-schedule')
      .then(res => {
        console.log('Fetched schedule:', res.data.schedule);
        // Add classroom info to each class if not present
        const scheduleWithClassrooms = res.data.schedule?.map(day => ({
          ...day,
          classes: day.classes?.map(cls => ({
            ...cls,
            classroom: cls.classroom || getRandomClassroom(),
            studentCount: cls.studentCount || Math.floor(Math.random() * 40) + 15
          }))
        }));
        setSchedule(scheduleWithClassrooms || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch schedule');
        setLoading(false);
      });
  }, []);

  // Function to generate random classroom numbers
  const getRandomClassroom = () => {
    const buildings = ['A', 'B', 'C', 'D'];
    const floors = [1, 2, 3, 4];
    const rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    const building = buildings[Math.floor(Math.random() * buildings.length)];
    const floor = floors[Math.floor(Math.random() * floors.length)];
    const room = rooms[Math.floor(Math.random() * rooms.length)];
    
    return `${building}-${floor}${room.toString().padStart(2, '0')}`;
  };

  // Calculate stats
  const totalClasses = schedule.reduce((total, day) => total + (day.classes?.length || 0), 0);
  const activeDays = schedule.filter(day => day.classes?.length > 0).length;
  const uniqueSubjects = new Set(schedule.flatMap(day => day.classes?.map(cls => cls.subject || cls.subjectName) || [])).size;
  const totalStudents = schedule.reduce((total, day) => {
    return total + (day.classes?.reduce((dayTotal, cls) => dayTotal + (cls.studentCount || 0), 0) || 0);
  }, 0);
  const totalHours = schedule.reduce((total, day) => {
    return total + (day.classes?.reduce((dayTotal, cls) => {
      const start = new Date(`2000-01-01 ${cls.startTime}`);
      const end = new Date(`2000-01-01 ${cls.endTime}`);
      return dayTotal + (end - start) / (1000 * 60 * 60);
    }, 0) || 0);
  }, 0);

  // Get current day
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div style={{ 
        background: '#ffffff', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            border: '4px solid #f3f3f3', 
            borderTop: '4px solid #000000',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <style>
            {`@keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }`}
          </style>
          <div style={{ fontSize: '18px', color: '#000000', fontWeight: '500' }}>Loading your schedule...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        background: '#ffffff', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ 
          background: '#ffffff', 
          padding: '48px', 
          textAlign: 'center', 
          borderRadius: '16px', 
          border: '2px solid #000000',
          maxWidth: '400px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <div style={{ fontSize: '20px', fontWeight: '600', color: '#000000', marginBottom: '8px' }}>Unable to Load Schedule</div>
          <div style={{ fontSize: '16px', color: '#666666' }}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: '#ffffff', 
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        background: '#ffffff', 
        borderBottom: '2px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button style={{ 
                padding: '12px', 
                background: 'transparent', 
                border: '2px solid #f0f0f0',
                borderRadius: '12px', 
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#f0f0f0';
                e.target.style.borderColor = '#000000';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = '#f0f0f0';
              }}>
                <ArrowLeft style={{ width: '20px', height: '20px', color: '#000000' }} />
              </button>
              <div>
                <h1 style={{ 
                  fontSize: '36px', 
                  fontWeight: '700', 
                  color: '#000000', 
                  margin: '0 0 4px 0',
                  letterSpacing: '-0.5px'
                }}>
                  {getGreeting()}! 👋
                </h1>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#666666', 
                  fontWeight: '500',
                  margin: 0
                }}>
                  Today is {getCurrentDay()} • Your Weekly Schedule
                </p>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              background: '#f8f9fa',
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid #e9ecef'
            }}>
              <Calendar style={{ width: '16px', height: '16px', color: '#000000' }} />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#000000' }}>Week View</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '24px', 
          marginBottom: '40px' 
        }}>
          <div style={{ 
            background: '#ffffff', 
            padding: '24px', 
            borderRadius: '16px',
            border: '2px solid #f0f0f0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
            e.currentTarget.style.borderColor = '#000000';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
            e.currentTarget.style.borderColor = '#f0f0f0';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                padding: '12px', 
                background: '#f8f9fa',
                borderRadius: '12px',
                border: '1px solid #e9ecef'
              }}>
                <Calendar style={{ width: '24px', height: '24px', color: '#000000' }} />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#000000' }}>{totalClasses}</div>
                <div style={{ fontSize: '14px', color: '#666666', fontWeight: '500' }}>Total Classes</div>
              </div>
            </div>
          </div>

          <div style={{ 
            background: '#ffffff', 
            padding: '24px', 
            borderRadius: '16px',
            border: '2px solid #f0f0f0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
            e.currentTarget.style.borderColor = '#000000';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
            e.currentTarget.style.borderColor = '#f0f0f0';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                padding: '12px', 
                background: '#f8f9fa',
                borderRadius: '12px',
                border: '1px solid #e9ecef'
              }}>
                <BookOpen style={{ width: '24px', height: '24px', color: '#000000' }} />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#000000' }}>{uniqueSubjects}</div>
                <div style={{ fontSize: '14px', color: '#666666', fontWeight: '500' }}>Subjects</div>
              </div>
            </div>
          </div>

          <div style={{ 
            background: '#ffffff', 
            padding: '24px', 
            borderRadius: '16px',
            border: '2px solid #f0f0f0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
            e.currentTarget.style.borderColor = '#000000';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
            e.currentTarget.style.borderColor = '#f0f0f0';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                padding: '12px', 
                background: '#f8f9fa',
                borderRadius: '12px',
                border: '1px solid #e9ecef'
              }}>
                <Users style={{ width: '24px', height: '24px', color: '#000000' }} />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#000000' }}>{totalStudents}</div>
                <div style={{ fontSize: '14px', color: '#666666', fontWeight: '500' }}>Total Students</div>
              </div>
            </div>
          </div>

          <div style={{ 
            background: '#ffffff', 
            padding: '24px', 
            borderRadius: '16px',
            border: '2px solid #f0f0f0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
            e.currentTarget.style.borderColor = '#000000';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
            e.currentTarget.style.borderColor = '#f0f0f0';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                padding: '12px', 
                background: '#f8f9fa',
                borderRadius: '12px',
                border: '1px solid #e9ecef'
              }}>
                <Clock style={{ width: '24px', height: '24px', color: '#000000' }} />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#000000' }}>{totalHours.toFixed(1)}h</div>
                <div style={{ fontSize: '14px', color: '#666666', fontWeight: '500' }}>Weekly Hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Content */}
        {schedule.length === 0 ? (
          <div style={{ 
            background: '#ffffff', 
            padding: '80px 48px', 
            textAlign: 'center', 
            borderRadius: '20px', 
            border: '2px solid #f0f0f0',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>📚</div>
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#000000', marginBottom: '12px' }}>
              No Schedule Found
            </div>
            <div style={{ fontSize: '16px', color: '#666666' }}>
              Your weekly schedule will appear here once it's available.
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {schedule.map(day => {
              const isToday = day.day === getCurrentDay();
              return (
                <div 
                  key={day.day} 
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: isToday ? '3px solid #000000' : '2px solid #f0f0f0',
                    boxShadow: isToday ? '0 12px 40px rgba(0,0,0,0.12)' : '0 8px 32px rgba(0,0,0,0.04)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Day Header */}
                  <div style={{
                    padding: '24px 32px',
                    borderBottom: '2px solid #f0f0f0',
                    background: isToday ? '#f8f9fa' : '#ffffff'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h2 style={{
                          fontSize: '32px',
                          fontWeight: '700',
                          color: '#000000',
                          margin: 0,
                          letterSpacing: '-0.3px'
                        }}>
                          {day.day}
                        </h2>
                        {isToday && (
                          <span style={{
                            background: '#000000',
                            color: '#ffffff',
                            fontSize: '12px',
                            fontWeight: '700',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            TODAY
                          </span>
                        )}
                      </div>
                      <div style={{ 
                        fontSize: '14px', 
                        color: '#666666', 
                        fontWeight: '500',
                        padding: '8px 16px',
                        background: '#f8f9fa',
                        borderRadius: '12px',
                        border: '1px solid #e9ecef'
                      }}>
                        📅 {day.classes?.length || 0} classes scheduled
                      </div>
                    </div>
                  </div>

                  {/* Classes */}
                  <div style={{ padding: '32px' }}>
                    {!day.classes || day.classes.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                        <div style={{ fontSize: '20px', fontWeight: '600', color: '#000000', marginBottom: '8px' }}>
                          No classes scheduled
                        </div>
                        <div style={{ fontSize: '16px', color: '#666666' }}>
                          Enjoy your free day!
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {day.classes.map((cls, idx) => (
                          <div 
                            key={idx} 
                            style={{
                              background: '#ffffff',
                              padding: '24px',
                              borderRadius: '16px',
                              border: '2px solid #f0f0f0',
                              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                              e.currentTarget.style.borderColor = '#000000';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                              e.currentTarget.style.borderColor = '#f0f0f0';
                            }}
                          >
                            <div style={{ 
                              display: 'grid', 
                              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                              gap: '24px' 
                            }}>
                              {/* Time */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ 
                                  padding: '8px', 
                                  background: '#f8f9fa',
                                  borderRadius: '8px',
                                  border: '1px solid #e9ecef'
                                }}>
                                  <Clock style={{ width: '16px', height: '16px', color: '#000000' }} />
                                </div>
                                <div>
                                  <div style={{ 
                                    fontSize: '10px', 
                                    fontWeight: '600', 
                                    color: '#666666', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.5px', 
                                    marginBottom: '4px' 
                                  }}>
                                    Time
                                  </div>
                                  <div style={{ 
                                    fontSize: '16px', 
                                    fontWeight: '700', 
                                    color: '#000000' 
                                  }}>
                                    {cls.startTime} - {cls.endTime}
                                  </div>
                                </div>
                              </div>

                              {/* Subject */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ 
                                  padding: '8px', 
                                  background: '#f8f9fa',
                                  borderRadius: '8px',
                                  border: '1px solid #e9ecef'
                                }}>
                                  <BookOpen style={{ width: '16px', height: '16px', color: '#000000' }} />
                                </div>
                                <div>
                                  <div style={{ 
                                    fontSize: '10px', 
                                    fontWeight: '600', 
                                    color: '#666666', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.5px', 
                                    marginBottom: '4px' 
                                  }}>
                                    Subject
                                  </div>
                                  <div style={{ 
                                    fontSize: '16px', 
                                    fontWeight: '700', 
                                    color: '#000000' 
                                  }}>
                                    {cls.subjectName || cls.subject}
                                  </div>
                                </div>
                              </div>

                              {/* Classroom */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ 
                                  padding: '8px', 
                                  background: '#f8f9fa',
                                  borderRadius: '8px',
                                  border: '1px solid #e9ecef'
                                }}>
                                  <MapPin style={{ width: '16px', height: '16px', color: '#000000' }} />
                                </div>
                                <div>
                                  <div style={{ 
                                    fontSize: '10px', 
                                    fontWeight: '600', 
                                    color: '#666666', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.5px', 
                                    marginBottom: '4px' 
                                  }}>
                                    Classroom
                                  </div>
                                  <div style={{ 
                                    fontSize: '16px', 
                                    fontWeight: '700', 
                                    color: '#000000' 
                                  }}>
                                    Room {cls.classroom}
                                  </div>
                                </div>
                              </div>

                              {/* Students */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ 
                                  padding: '8px', 
                                  background: '#f8f9fa',
                                  borderRadius: '8px',
                                  border: '1px solid #e9ecef'
                                }}>
                                  <Users style={{ width: '16px', height: '16px', color: '#000000' }} />
                                </div>
                                <div>
                                  <div style={{ 
                                    fontSize: '10px', 
                                    fontWeight: '600', 
                                    color: '#666666', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.5px', 
                                    marginBottom: '4px' 
                                  }}>
                                    Students
                                  </div>
                                  <div style={{ 
                                    fontSize: '16px', 
                                    fontWeight: '700', 
                                    color: '#000000' 
                                  }}>
                                    {cls.studentCount} enrolled
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherScheduleDashboard;