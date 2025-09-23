import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../utils/Axios';
import QRCode from 'react-qr-code';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);

const TodaySchedule = () => {
  const [todayClasses, setTodayClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrClass, setQrClass] = useState(null);
  const teacher = useSelector((state) => state.User.user);

  const istNow = dayjs().tz('Asia/Kolkata');
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[istNow.day()];

  const [meta, setMeta] = useState({ sectionId: '', branchId: '', yearId: '', teacherId: '' });

  useEffect(() => {
    axios.get('/api/v1/teacher-admin/teacher-schedule')
      .then(res => {
        const schedule = res.data.schedule || [];
        let sectionId = '', branchId = '', yearId = '', teacherId = '';
        if (res.data.meta) {
          sectionId = res.data.meta.sectionId;
          branchId = res.data.meta.branchId;
          yearId = res.data.meta.yearId;
          teacherId = res.data.meta.teacherId;
        }
        const todaySchedule = schedule.find(day => day.day === todayName);
        if (todaySchedule && todaySchedule.classes.length > 0) {
          teacherId = todaySchedule.classes[0].teacherId || teacherId;
        }
        setMeta({ sectionId, branchId, yearId, teacherId });
        setTodayClasses(todaySchedule ? todaySchedule.classes : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch today\'s schedule');
        setLoading(false);
      });
  }, [todayName]);

  const getCurrentTime = () => {
    return dayjs().tz('Asia/Kolkata').format('hh:mm A');
  };

  const isClassActive = (startTime, endTime) => {
    const currentTime = dayjs().tz('Asia/Kolkata');
    const classStart = dayjs(startTime, 'hh:mm A');
    const classEnd = dayjs(endTime, 'hh:mm A');
    return currentTime.isAfter(classStart) && currentTime.isBefore(classEnd);
  };

  const isClassUpcoming = (startTime) => {
    const currentTime = dayjs().tz('Asia/Kolkata');
    const classStart = dayjs(startTime, 'hh:mm A');
    const timeDiff = classStart.diff(currentTime, 'minute');
    return timeDiff > 0 && timeDiff <= 30;
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
          <div style={{ fontSize: '18px', color: '#000000', fontWeight: '500' }}>Loading schedule...</div>
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
          maxWidth: '400px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <div style={{ fontSize: '20px', fontWeight: '600', color: '#000000', marginBottom: '8px' }}>Error</div>
          <div style={{ fontSize: '16px', color: '#666666' }}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: '#ffffff', 
      minHeight: '100vh', 
      padding: '32px 24px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
    }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: '700', 
              color: '#000000', 
              margin: '0 0 8px 0',
              letterSpacing: '-0.5px'
            }}>
              Today's Schedule
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ 
                fontSize: '18px', 
                color: '#666666', 
                fontWeight: '500',
                padding: '8px 16px',
                background: '#f8f9fa',
                borderRadius: '12px',
                border: '1px solid #e9ecef'
              }}>
                📅 {todayName}, {istNow.format('MMMM DD, YYYY')}
              </span>
              <span style={{ 
                fontSize: '16px', 
                color: '#666666',
                padding: '8px 16px',
                background: '#f8f9fa',
                borderRadius: '12px',
                border: '1px solid #e9ecef'
              }}>
                🕐 Current Time: {getCurrentTime()}
              </span>
            </div>
          </div>
          <div style={{ 
            padding: '16px 24px',
            background: '#000000',
            color: '#ffffff',
            borderRadius: '16px',
            fontWeight: '600',
            fontSize: '16px',
            textAlign: 'center',
            minWidth: '200px'
          }}>
            <div style={{ fontSize: '14px', opacity: '0.8', marginBottom: '4px' }}>Teacher Dashboard</div>
            <div>{teacher?.name || 'Welcome Teacher'}</div>
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {todayClasses.length === 0 ? (
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
              No Classes Today
            </div>
            <div style={{ fontSize: '16px', color: '#666666' }}>
              Enjoy your day off! Check back tomorrow for your schedule.
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
            {todayClasses.map((cls, idx) => {
              const isActive = isClassActive(cls.startTime, cls.endTime);
              const isUpcoming = isClassUpcoming(cls.startTime);
              
              return (
                <div 
                  key={idx} 
                  style={{ 
                    background: '#ffffff', 
                    borderRadius: '20px', 
                    border: isActive ? '3px solid #000000' : isUpcoming ? '2px solid #666666' : '2px solid #f0f0f0',
                    padding: '32px',
                    boxShadow: isActive ? '0 12px 40px rgba(0,0,0,0.15)' : '0 8px 32px rgba(0,0,0,0.06)',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Status Badge */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: '#000000',
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      🔴 LIVE
                    </div>
                  )}
                  {isUpcoming && !isActive && (
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: '#666666',
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      ⏰ SOON
                    </div>
                  )}

                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: '#000000', 
                      marginBottom: '8px',
                      letterSpacing: '-0.3px'
                    }}>
                      📖 {cls.subjectName || cls.subject}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        fontSize: '16px', 
                        color: '#666666',
                        fontWeight: '500'
                      }}>
                        <span style={{ marginRight: '8px' }}>🕐</span>
                        {cls.startTime} - {cls.endTime}
                        <span style={{ 
                          marginLeft: '12px',
                          padding: '4px 8px',
                          background: '#f8f9fa',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#000000'
                        }}>
                          Period {idx + 1}
                        </span>
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        fontSize: '16px', 
                        color: '#666666',
                        fontWeight: '500'
                      }}>
                        <span style={{ marginRight: '8px' }}>👨‍🏫</span>
                        {cls.teacherName || 'You'}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <button
                      style={{ 
                        background: '#000000', 
                        color: '#ffffff', 
                        border: 'none', 
                        padding: '16px 32px', 
                        borderRadius: '12px', 
                        fontWeight: '600',
                        fontSize: '16px',
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                        flex: '1',
                        minWidth: '140px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = '#333333';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = '#000000';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                      }}
                      onClick={async () => {
                        setQrClass(cls);
                        try {
                          const classDateISTMidnight = dayjs().tz('Asia/Kolkata').startOf('day').toDate();
                          console.log('QR GENERATION: Sending date for attendance:', classDateISTMidnight.toISOString());
                          await axios.post('/api/v1/teacher-admin/mark-qr-generated', {
                            date: classDateISTMidnight,
                            period: idx + 1,
                            subject: cls.subjectName || cls.subject,
                            teacher: teacher?._id,
                            section: teacher?.section || meta.sectionId,
                            branch: teacher?.branch || meta.branchId,
                            year: teacher?.year || meta.yearId
                          });
                        } catch (err) {
                          console.error('Failed to mark QR generated', err);
                        }
                      }}
                    >
                      <span>📱</span> Generate QR
                    </button>
                    
                    <button 
                      style={{ 
                        background: '#ffffff', 
                        color: '#000000', 
                        border: '2px solid #000000', 
                        padding: '16px 32px', 
                        borderRadius: '12px', 
                        fontWeight: '600',
                        fontSize: '16px',
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease',
                        flex: '1',
                        minWidth: '140px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = '#000000';
                        e.target.style.color = '#ffffff';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = '#ffffff';
                        e.target.style.color = '#000000';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <span>❌</span> Cancel Class
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Enhanced QR Modal */}
      {qrClass && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(8px)',
          padding: '20px'
        }}>
          <div style={{ 
            background: '#ffffff', 
            padding: '48px', 
            borderRadius: '24px', 
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)', 
            textAlign: 'center', 
            minWidth: '400px', 
            maxWidth: '90vw',
            border: '1px solid #f0f0f0',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {/* Close button */}
            <button
              onClick={() => setQrClass(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#f0f0f0';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              ✕
            </button>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ 
                marginBottom: '8px', 
                fontSize: '28px', 
                fontWeight: '700', 
                color: '#000000', 
                letterSpacing: '-0.5px' 
              }}>
                📱 QR Code Generated
              </h2>
              <div style={{ 
                fontSize: '18px', 
                color: '#666666', 
                fontWeight: '500',
                marginBottom: '16px'
              }}>
                {qrClass.subjectName || qrClass.subject}
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '24px',
                flexWrap: 'wrap',
                fontSize: '14px',
                color: '#666666'
              }}>
                <span>🕐 {qrClass.startTime} - {qrClass.endTime}</span>
                <span>📅 {dayjs().tz('Asia/Kolkata').format('MMM DD, YYYY')}</span>
                <span>📍 Period {todayClasses.findIndex(c => c === qrClass) + 1}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
              <div style={{ 
                background: '#ffffff', 
                padding: '32px', 
                borderRadius: '20px', 
                border: '3px solid #000000',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                display: 'inline-block'
              }}>
                <QRCode
                  value={JSON.stringify({
                    subject: qrClass.subject,
                    startTime: qrClass.startTime,
                    endTime: qrClass.endTime,
                    teacher: qrClass.teacherName || 'You',
                    date: dayjs().tz('Asia/Kolkata').format('YYYY-MM-DD'),
                    period: todayClasses.findIndex(c => c === qrClass) + 1
                  })}
                  size={280}
                  style={{ display: 'block' }}
                />
              </div>
            </div>

            <div style={{ 
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '16px',
              marginBottom: '32px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{ fontSize: '14px', color: '#666666', marginBottom: '8px', fontWeight: '500' }}>
                📋 Instructions for Students:
              </div>
              <div style={{ fontSize: '14px', color: '#000000', textAlign: 'left' }}>
                1. Open your attendance app<br/>
                2. Tap "Scan QR Code"<br/>
                3. Point camera at this QR code<br/>
                4. Your attendance will be marked automatically
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                style={{ 
                  background: '#ffffff', 
                  color: '#000000', 
                  border: '2px solid #000000', 
                  padding: '16px 32px', 
                  borderRadius: '12px', 
                  fontWeight: '600', 
                  fontSize: '16px', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: '120px'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#f0f0f0';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#ffffff';
                }}
                onClick={() => setQrClass(null)}
              >
                Close
              </button>
              
              <button
                style={{ 
                  background: '#000000', 
                  color: '#ffffff', 
                  border: 'none', 
                  padding: '16px 32px', 
                  borderRadius: '12px', 
                  fontWeight: '600', 
                  fontSize: '16px', 
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  minWidth: '120px'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#333333';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#000000';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                }}
                onClick={() => {
                  const qrData = JSON.stringify({
                    subject: qrClass.subject,
                    startTime: qrClass.startTime,
                    endTime: qrClass.endTime,
                    teacher: qrClass.teacherName || 'You',
                    date: dayjs().tz('Asia/Kolkata').format('YYYY-MM-DD'),
                    period: todayClasses.findIndex(c => c === qrClass) + 1
                  });
                  
                  if (navigator.share) {
                    navigator.share({
                      title: `QR Code for ${qrClass.subjectName || qrClass.subject}`,
                      text: `Scan this QR for attendance: ${qrClass.subjectName || qrClass.subject} (${qrClass.startTime} - ${qrClass.endTime})`,
                      url: window.location.href
                    });
                  } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(qrData).then(() => {
                      alert('QR data copied to clipboard!');
                    }).catch(() => {
                      window.prompt('Copy QR data:', qrData);
                    });
                  }
                }}
              >
                📤 Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;