
import React from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  AlertTriangle, 
  Power, 
  Battery, 
  ArrowUpRight,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { Worker } from '../types';

interface DashboardProps {
  workers: Worker[];
  onWorkerClick: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ workers, onWorkerClick }) => {
  const working = workers.filter(w => w.status === 'working').length;
  const idle = workers.filter(w => w.status === 'idle').length;
  const offline = workers.filter(w => w.status === 'offline').length;

  const stats = [
    { label: 'Total On Duty', value: workers.length, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Currently Active', value: working, icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Idle / Break', value: idle, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Device Offline', value: offline, icon: Power, color: 'text-slate-600', bg: 'bg-slate-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Workforce Pulse</h2>
          <p className="text-slate-500 font-medium mt-1">Real-time oversight of all field units and field personnel.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm text-sm font-bold text-slate-700">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
            LIVE FEED
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2">
            Export Analytics
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex items-start justify-between">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon size={26} />
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center text-xs font-bold text-emerald-600">
                <TrendingUp size={14} className="mr-1" />
                +8.2% from avg
              </div>
              <span className="text-[10px] font-bold text-slate-400">UPDATING NOW</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900">Active Field Units</h3>
              <p className="text-sm font-medium text-slate-500">Personnel currently contributing to operations.</p>
            </div>
            <button className="text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all">View All Units</button>
          </div>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                  <th className="px-8 py-5">Personnel</th>
                  <th className="px-8 py-5">Current Status</th>
                  <th className="px-8 py-5">Daily Hours</th>
                  <th className="px-8 py-5">Battery</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {workers.slice(0, 6).map((worker) => (
                  <tr key={worker.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-500 shadow-inner group-hover:bg-white group-hover:shadow-md transition-all">
                          {worker.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-slate-900">{worker.name}</p>
                          <p className="text-xs font-medium text-slate-400">ID: {worker.id.padStart(4, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`
                          px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5
                          ${worker.status === 'working' ? 'bg-emerald-50 text-emerald-700' : 
                            worker.status === 'idle' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'}
                        `}>
                          <span className={`w-1.5 h-1.5 rounded-full ${worker.status === 'working' ? 'bg-emerald-500' : 
                            worker.status === 'idle' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                          {worker.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-700">{worker.workingHours} hrs</p>
                      <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="bg-indigo-600 h-full rounded-full transition-all duration-1000" 
                          style={{ width: `${(worker.workingHours || 0) * 10}%` }} 
                        />
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-500">
                        <Battery size={16} className={worker.batteryLevel && worker.batteryLevel < 20 ? 'text-rose-500' : ''} />
                        {Math.round(worker.batteryLevel || 0)}%
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => onWorkerClick(worker.id)}
                        className="bg-white border border-slate-200 p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50 transition-all"
                      >
                        <ArrowUpRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-1000" />
             <div className="relative">
                <h3 className="text-xl font-black mb-6">Security & Compliance</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-3xl border border-white/10">
                    <div className="bg-amber-500/20 text-amber-500 p-2.5 rounded-xl">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">2 Geofence Breaches</p>
                      <p className="text-xs text-slate-400 mt-1">Personnel detected outside assigned zone in Sector B.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-3xl border border-white/10">
                    <div className="bg-emerald-500/20 text-emerald-500 p-2.5 rounded-xl">
                      <UserCheck size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Health Check Passed</p>
                      <p className="text-xs text-slate-400 mt-1">All active units reporting normal biometric and status data.</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-10 bg-white text-slate-900 py-4 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-slate-100 transition-colors shadow-xl active:scale-95">
                  Run Full Audit
                </button>
             </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6">Unit Distribution</h3>
            <div className="space-y-6">
              {[
                { label: 'North Sector', count: 12, color: 'bg-indigo-600' },
                { label: 'Central Depot', count: 8, color: 'bg-emerald-500' },
                { label: 'Outreach Unit', count: 4, color: 'bg-amber-500' }
              ].map((loc, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    <span>{loc.label}</span>
                    <span className="text-slate-900">{loc.count} Units</span>
                  </div>
                  <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden">
                    <div className={`${loc.color} h-full rounded-full`} style={{ width: `${(loc.count / 24) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
