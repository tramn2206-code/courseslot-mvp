import Link from 'next/link';
import { ArrowRight, Activity, BellRing, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-indigo-600">CourseSlot.</div>
        <Link href="/dashboard" className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
          Enter Dashboard
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
          Stop refreshing.<br/>
          <span className="text-indigo-600">Start registering.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Monitor your university courses, get notified instantly when seats become available, and register faster.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-200">
            Start Tracking Courses <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24 text-left">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-800">Smart Monitoring</h3>
            <p className="text-slate-600">Our engine checks for open slots automatically.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
              <BellRing size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-800">Instant Notifications</h3>
            <p className="text-slate-600">Get alerted the exact second a student drops a class.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-800">100% Safe</h3>
            <p className="text-slate-600">No passwords required. Just tracking and alerting.</p>
          </div>
        </div>
      </main>
    </div>
  );
}