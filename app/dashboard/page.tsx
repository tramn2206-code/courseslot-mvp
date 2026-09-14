"use client";
import { useState, useEffect, useRef } from 'react';
import { initialMockCourses, CourseData } from '../../lib/demo-provider';
import { Bell, Play, Pause, ExternalLink, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [courses, setCourses] = useState<CourseData[]>(initialMockCourses);
  const [notifications, setNotifications] = useState<{id: number, msg: string, time: string}[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const notifId = useRef(0);

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(0, -1)); 
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const addNotification = (msg: string) => {
    notifId.current += 1;
    const now = new Date().toLocaleTimeString();
    setNotifications(prev => [{id: notifId.current, msg, time: now}, ...prev]);
    
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("CourseSlot Alert", { body: msg });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("CourseSlot Alert", { body: msg });
          }
        });
      }
    }
  };

  const simulateOpenSlot = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId && c.enrolled > 0) {
        addNotification(`🔥 Slot opened for ${c.courseCode}! Register NOW!`);
        return { ...c, enrolled: c.enrolled - 1, availableSeats: c.availableSeats + 1, status: 'Available' };
      }
      return c;
    }));
  };

  const simulateCourseFull = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        if (c.availableSeats > 0) addNotification(`😔 ${c.courseCode} is full again.`);
        return { ...c, enrolled: c.capacity, availableSeats: 0, status: 'Full' };
      }
      return c;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
        <Link href="/" className="text-2xl font-bold text-indigo-600 mb-8">CourseSlot.</Link>
        <nav className="space-y-2 flex-1">
          <a href="#" className="block p-3 bg-indigo-50 text-indigo-700 font-medium rounded-lg">Dashboard</a>
          <a href="#" className="block p-3 text-slate-600 hover:bg-slate-50 rounded-lg">Watchlist</a>
          <a href="#" className="block p-3 text-slate-600 hover:bg-slate-50 rounded-lg">Settings</a>
        </nav>
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">SV</div>
          <div className="text-sm">
            <p className="font-bold text-slate-800">Student 01</p>
            <p className="text-slate-500">UTH Portal</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 relative">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Watchlist Dashboard</h1>
            <p className="text-slate-500 mt-1">Real-time slot monitoring engine</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isMonitoring ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}
            >
              {isMonitoring ? <><Pause size={18}/> Pause Engine</> : <><Play size={18}/> Resume Engine</>}
            </button>
            <div className="relative">
              <Bell className="text-slate-500" size={24} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Activity size={24}/></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Tracking Status</p>
              <p className="text-xl font-bold text-slate-800">{isMonitoring ? 'Active' : 'Paused'}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><ShieldAlert size={24}/></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Tracked Courses</p>
              <p className="text-xl font-bold text-slate-800">{courses.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center"><CheckCircle2 size={24}/></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Open Slots Found</p>
              <p className="text-xl font-bold text-slate-800">{courses.filter(c => c.availableSeats > 0).length}</p>
            </div>
          </div>
        </div>

        <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
          {notifications.map(n => (
            <div key={n.id} className="bg-indigo-600 text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 shadow-indigo-200/50">
              <Bell size={20} className="text-indigo-200"/>
              <div>
                <p className="font-medium">{n.msg}</p>
                <p className="text-xs text-indigo-300 mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-5 text-sm font-semibold text-slate-600">Course Info</th>
                <th className="p-5 text-sm font-semibold text-slate-600">Status</th>
                <th className="p-5 text-sm font-semibold text-slate-600">Seats (Enrolled/Cap)</th>
                <th className="p-5 text-sm font-semibold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {courses.map(course => (
                <tr key={course.id} className="hover:bg-slate-50 transition">
                  <td className="p-5">
                    <p className="font-bold text-slate-900 text-lg">{course.courseCode}</p>
                    <p className="text-sm text-slate-500">{course.courseName} • Class {course.classCode}</p>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                      course.status === 'Available' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {course.status === 'Available' ? <CheckCircle2 size={14}/> : <AlertCircle size={14}/>}
                      {course.status}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[100px]">
                        <div className={`h-2.5 rounded-full ${course.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{course.enrolled}/{course.capacity}</span>
                    </div>
                    {course.availableSeats > 0 && <p className="text-xs text-green-600 font-bold mt-1">+{course.availableSeats} available</p>}
                  </td>
                  <td className="p-5">
                    {course.status === 'Available' ? (
                      <a href={course.registrationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition shadow-md shadow-indigo-200 hover:-translate-y-0.5">
                        Register Now <ExternalLink size={16} />
                      </a>
                    ) : (
                      <button disabled className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 rounded-lg text-sm font-medium cursor-not-allowed">
                        Monitoring...
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-bold text-indigo-900 text-lg">Demo Engine Controls</h3>
            <span className="px-2 py-1 bg-indigo-200 text-indigo-800 text-xs font-bold rounded">MVP Mode</span>
          </div>
          <p className="text-slate-600 text-sm mb-6 max-w-2xl">
            Use these buttons to simulate what happens when a student drops a class. The monitoring engine will detect the change, trigger a notification, and reveal the registration link.
          </p>
          <div className="flex flex-wrap gap-4">
            {courses.map(course => (
              <div key={course.id} className="flex gap-2">
                 <button 
                  onClick={() => simulateOpenSlot(course.id)}
                  disabled={course.availableSeats > 0}
                  className="px-4 py-2 bg-white border border-indigo-300 text-indigo-700 rounded-lg hover:bg-indigo-50 text-sm font-semibold shadow-sm disabled:opacity-50 transition"
                >
                  Simulate {course.courseCode} Open Slot
                </button>
                <button 
                  onClick={() => simulateCourseFull(course.id)}
                  disabled={course.availableSeats === 0}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium shadow-sm disabled:opacity-50 transition"
                >
                  Set {course.courseCode} Full
                </button>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
