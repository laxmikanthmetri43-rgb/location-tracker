
import React from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Users, 
  Settings as SettingsIcon, 
  CalendarCheck, 
  BellRing, 
  LogOut, 
  X,
  Target
} from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Main Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Live Location Map', icon: MapIcon },
    { id: 'list', label: 'Workforce Roster', icon: Users },
    { id: 'attendance', label: 'Time & Attendance', icon: CalendarCheck },
    { id: 'alerts', label: 'Safety Alerts', icon: BellRing },
    { id: 'settings', label: 'Admin Controls', icon: SettingsIcon },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 transition-transform duration-300 lg:static lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex flex-col h-full py-8">
        <div className="px-8 flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-900/50">
              <Target size={24} />
            </div>
            <div>
              <span className="text-xl font-black text-white block leading-tight">Smart</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Workforce</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id as ViewType);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group
                ${currentView === item.id 
                  ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
              `}
            >
              <item.icon size={22} className={currentView === item.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="text-[15px]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 px-6 space-y-4">
          <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Status Monitor</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-300">System Healthy</span>
            </div>
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-5 py-4 text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all font-bold group"
          >
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
