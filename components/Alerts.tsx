
import React from 'react';
import { ShieldAlert, AlertCircle, MapPinOff, Clock, Trash2 } from 'lucide-react';
import { Worker } from '../types';

interface AlertsProps {
  workers: Worker[];
}

const Alerts: React.FC<AlertsProps> = ({ workers }) => {
  const idleWorkers = workers.filter(w => w.status === 'idle');
  const criticalBattery = workers.filter(w => w.batteryLevel && w.batteryLevel < 20);

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Security & Alerts</h2>
          <p className="text-slate-500 font-medium mt-1">Operational anomalies and safety notifications requiring attention.</p>
        </div>
        <button className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2">
          <Trash2 size={20} />
          Clear All Logs
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
           <div className="flex items-center gap-4 mb-8">
              <div className="bg-amber-50 text-amber-600 p-3 rounded-2xl">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Idle Personnel</h3>
                <p className="text-sm font-medium text-slate-500">Workers stationary for more than 30 minutes.</p>
              </div>
           </div>
           
           <div className="space-y-4">
              {idleWorkers.map(w => (
                <div key={w.id} className="flex items-center justify-between p-5 bg-amber-50/30 rounded-3xl border border-amber-100/50">
                  <div className="flex items-center gap-4">
                    <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-amber-600 shadow-sm">{w.name.charAt(0)}</div>
                    <div>
                      <p className="font-bold text-slate-900">{w.name}</p>
                      <p className="text-xs font-medium text-slate-500">Stationary since 45 mins</p>
                    </div>
                  </div>
                  <button className="bg-white text-slate-700 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-all">Nudge User</button>
                </div>
              ))}
              {idleWorkers.length === 0 && <p className="text-center py-10 text-slate-400 font-medium italic">No idle workers detected.</p>}
           </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
           <div className="flex items-center gap-4 mb-8">
              <div className="bg-rose-50 text-rose-600 p-3 rounded-2xl">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Critical Alerts</h3>
                <p className="text-sm font-medium text-slate-500">Severe operational or hardware failures.</p>
              </div>
           </div>
           
           <div className="space-y-4">
              {criticalBattery.map(w => (
                <div key={w.id} className="flex items-center justify-between p-5 bg-rose-50/30 rounded-3xl border border-rose-100/50">
                  <div className="flex items-center gap-4">
                    <div className="bg-rose-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-md"><AlertCircle size={20} /></div>
                    <div>
                      <p className="font-bold text-slate-900">{w.name}</p>
                      <p className="text-xs font-bold text-rose-600 uppercase tracking-widest">LOW BATTERY: {Math.round(w.batteryLevel || 0)}%</p>
                    </div>
                  </div>
                  <button className="bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all">Contact Now</button>
                </div>
              ))}
              <div className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 opacity-60">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-200 text-slate-500 w-10 h-10 rounded-xl flex items-center justify-center"><MapPinOff size={20} /></div>
                  <div>
                    <p className="font-bold text-slate-900">Geofence Breach - Unit #092</p>
                    <p className="text-xs font-medium text-slate-500">Sector Delta - 10:45 AM (Resolved)</p>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
