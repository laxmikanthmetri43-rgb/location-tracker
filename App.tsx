
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LiveMap from './components/LiveMap';
import WorkerList from './components/WorkerList';
import Settings from './components/Settings';
import Attendance from './components/Attendance';
import Alerts from './components/Alerts';
import Login from './components/Login';
import { Worker, ViewType } from './types';
import { subscribeToWorkers } from './services/firebase';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      const unsubscribe = subscribeToWorkers((updatedWorkers) => {
        setWorkers(updatedWorkers);
      });
      return () => unsubscribe();
    }
  }, [isLoggedIn]);

  const handleWorkerSelect = (id: string) => {
    setSelectedWorkerId(id);
    setCurrentView('map');
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard workers={workers} onWorkerClick={handleWorkerSelect} />;
      case 'map':
        return <LiveMap workers={workers} selectedWorkerId={selectedWorkerId} onClearSelection={() => setSelectedWorkerId(null)} />;
      case 'list':
        return <WorkerList workers={workers} onWorkerClick={handleWorkerSelect} />;
      case 'attendance':
        return <Attendance workers={workers} />;
      case 'alerts':
        return <Alerts workers={workers} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard workers={workers} onWorkerClick={handleWorkerSelect} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {!sidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-2xl shadow-2xl hover:bg-indigo-700 transition-all"
        >
          <Menu size={24} />
        </button>
      )}

      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        onLogout={() => setIsLoggedIn(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-[1600px] mx-auto h-full flex flex-col">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
