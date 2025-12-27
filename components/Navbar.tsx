
import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-800 lg:text-xl">Worker Live Tracker Dashboard</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-1.5 border border-transparent focus-within:border-blue-300 focus-within:bg-white transition-all">
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search workers..." 
            className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-48 lg:w-64 outline-none"
          />
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>
          
          <button className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-lg transition-colors group">
            <div className="h-9 w-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
              AD
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-800 leading-none">Admin User</p>
              <p className="text-xs text-gray-500 mt-1">Super Administrator</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
