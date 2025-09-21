
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
  const [qrClass, setQrClass] = useState(null); // class for which QR is shown
  const teacher = useSelector((state) => state.User.user);

  // Get today's day name (e.g., Monday) using IST
  const istNow = dayjs().tz('Asia/Kolkata');
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[istNow.day()];

  const [meta, setMeta] = useState({ sectionId: '', branchId: '', yearId: '', teacherId: '' });
  useEffect(() => {
    axios.get('/api/v1/teacher-admin/teacher-schedule')
      .then(res => {
        const schedule = res.data.schedule || [];
        // Try to extract meta info from first class (if available)
        let sectionId = '', branchId = '', yearId = '', teacherId = '';
        if (res.data.meta) {
          sectionId = res.data.meta.sectionId;
          branchId = res.data.meta.branchId;
          yearId = res.data.meta.yearId;
          teacherId = res.data.meta.teacherId;
        }
        const todaySchedule = schedule.find(day => day.day === todayName);
        if (todaySchedule && todaySchedule.classes.length > 0) {
          // Try to get teacherId from first class
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#212529', margin: 0 }}>Today's Schedule ({todayName})</h1>
        <p style={{ fontSize: '14px', color: '#6c757d', margin: '4px 0 0 0' }}>Teacher Dashboard</p>
      </div>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {todayClasses.length === 0 ? (
          <div style={{ background: '#fff', padding: '48px', textAlign: 'center', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e9ecef' }}>
            <div style={{ fontSize: '18px', color: '#6c757d' }}>No classes scheduled for today.</div>
          </div>
        ) : (
          todayClasses.map((cls, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e9ecef', marginBottom: '20px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#3b5bdb' }}>{cls.subjectName || cls.subject}</div>
                  <div style={{ fontSize: '14px', color: '#6c757d' }}>Time: {cls.startTime} - {cls.endTime}</div>
                  <div style={{ fontSize: '14px', color: '#6c757d' }}>Teacher: {cls.teacherName || 'You'}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    style={{ background: '#007bff', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}
                    onClick={async () => {
                      setQrClass(cls);
                      try {
                        // Always use IST midnight for today
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
                  >Generate QR</button>
                  <button style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>Cancel Class</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* QR Modal */}
      {qrClass && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '40px 32px', borderRadius: '20px', boxShadow: '0 4px 32px rgba(0,0,0,0.18)', textAlign: 'center', minWidth: '340px', maxWidth: '90vw' }}>
            <h2 style={{ marginBottom: '18px', fontSize: '22px', fontWeight: '700', color: '#3b5bdb', letterSpacing: '0.5px' }}>QR Code for {qrClass.subjectName || qrClass.subject}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'inline-block' }}>
                {/* Old method: QR encodes JSON string with class info */}
                <QRCode
                  value={JSON.stringify({
                    subject: qrClass.subject,
                    startTime: qrClass.startTime,
                    endTime: qrClass.endTime,
                    teacher: qrClass.teacherName || 'You',
                    date: dayjs().tz('Asia/Kolkata').format('YYYY-MM-DD'),
                    period: todayClasses.findIndex(c => c === qrClass) + 1 // Add period for backend matching
                  })}
                  size={260}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '28px' }}>
              <button
                style={{ background: '#007bff', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,123,255,0.12)' }}
                onClick={() => setQrClass(null)}
              >Close</button>
              <button
                style={{ background: '#28a745', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '8px', fontWeight: '600', fontSize: '16px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(40,167,69,0.12)' }}
                onClick={() => {
                  // Share QR: try Web Share API, fallback to alert
                  const qrData = qrClass.sessionyId || '';
                  if (navigator.share) {
                    navigator.share({
                      title: `QR for ${qrClass.subject}`,
                      text: `Scan this QR for attendance: ${qrClass.subject} (${qrClass.startTime} - ${qrClass.endTime})`,
                      url: window.location.href
                    });
                  } else {
                    window.prompt('Copy QR sessionId:', qrData);
                  }
                }}
              >Share</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;
