
import React from 'react';
import { Save, Shield, Database, Bell, Eye } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid gap-6">
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg">
              <Database size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Database Connection</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Firebase Project ID</label>
              <input type="text" defaultValue="worker-tracker-prod-12" className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">RTDB URL</label>
              <input type="text" defaultValue="https://worker-tracker-prod-12.firebaseio.com" className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
              <Eye size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Map Customization</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Default Zoom Level</label>
              <select className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 outline-none transition-all">
                <option>5 (Country Level)</option>
                <option>10 (City Level)</option>
                <option>15 (Street Level)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Marker Refresh Interval</label>
              <select className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 outline-none transition-all">
                <option>Real-time (Stream)</option>
                <option>Every 30 seconds</option>
                <option>Every 1 minute</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-50 text-red-600 p-2 rounded-lg">
                <Bell size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Alert Thresholds</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-green-600 uppercase">Status: Active</span>
              <div className="w-10 h-5 bg-green-500 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-bold text-gray-800">Stationary Alert</p>
                <p className="text-xs text-gray-500">Notify if a worker is stationary for more than X mins</p>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue="30" className="w-16 px-2 py-1 rounded-lg border border-gray-200 text-center outline-none" />
                <span className="text-sm font-medium text-gray-600">mins</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-bold text-gray-800">Geofence Breach</p>
                <p className="text-xs text-gray-500">Notify if worker leaves assigned district</p>
              </div>
              <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-not-allowed">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-red-50 rounded-2xl border border-red-100 p-6">
           <div className="flex items-start gap-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-xl">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-800">Danger Zone</h3>
                <p className="text-sm text-red-600 mt-1">Permanently delete all tracking logs or reset the system configuration.</p>
                <div className="mt-4 flex gap-3">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-700 transition-colors">Reset Entire System</button>
                  <button className="bg-white text-red-600 border border-red-200 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-50 transition-colors">Clear All Logs</button>
                </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
