
import React from 'react';
import { Calendar, Download, Search, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Worker } from '../types';

interface AttendanceProps {
  workers: Worker[];
}

const Attendance: React.FC<AttendanceProps> = ({ workers }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Shift Attendance</h2>
          <p className="text-slate-500 font-medium mt-1">Daily records of login/logout activities and total logged hours.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
            <Calendar size={20} className="text-indigo-600" />
            <span className="text-sm font-bold text-slate-700">Oct 24, 2024</span>
          </div>
          <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3 rounded-2xl font-bold transition-all shadow-sm flex items-center gap-2 active:scale-95">
            <Download size={20} className="text-indigo-600" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by ID or Name..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium"
              />
           </div>
           <div className="flex items-center gap-4 text-sm font-bold">
              <span className="text-slate-400">FILTERS:</span>
              <button className="text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-xl">All Units</button>
              <button className="text-slate-500 hover:text-indigo-600 px-4 py-1.5 rounded-xl transition-all">Late Logs</button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                <th className="px-8 py-5">Personnel</th>
                <th className="px-8 py-5">Punch In</th>
                <th className="px-8 py-5">Punch Out</th>
                <th className="px-8 py-5">Logged Hours</th>
                <th className="px-8 py-5">Verification</th>
                <th className="px-8 py-5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {workers.map(worker => (
                <tr key={worker.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                        {worker.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900">{worker.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-bold text-slate-600">{worker.loginTime}</td>
                  <td className="px-8 py-5 font-bold text-slate-600">{worker.logoutTime || '--:--'}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-slate-400" />
                      <span className="font-bold text-slate-900">{worker.workingHours || 0} hrs</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    {worker.workingHours && worker.workingHours > 4 ? (
                       <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                         <CheckCircle2 size={16} /> Verified
                       </div>
                    ) : (
                       <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest">
                         <Clock size={16} /> Pending
                       </div>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 font-bold text-sm">Full View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
