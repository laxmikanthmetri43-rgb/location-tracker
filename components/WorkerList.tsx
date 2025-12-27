
import React, { useState } from 'react';
// Added missing Users import
import { Search, Filter, MoreVertical, MapPin, Phone, MessageSquare, Users } from 'lucide-react';
import { Worker } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface WorkerListProps {
  workers: Worker[];
  onWorkerClick: (id: string) => void;
}

const WorkerList: React.FC<WorkerListProps> = ({ workers, onWorkerClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWorkers = workers.filter(w => 
    w.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Registered Field Personnel</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 transition-all"
              />
            </div>
            <button className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 sticky top-0 z-10">
            <tr className="text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
              <th className="px-6 py-4">Worker Information</th>
              <th className="px-6 py-4">Current Coordinates</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredWorkers.map((worker) => (
              <tr key={worker.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`
                      h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg
                      ${worker.is_active ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}
                    `}>
                      {worker.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{worker.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin size={12} /> Unit ID: {worker.id.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 font-medium">
                    {worker.latitude.toFixed(6)}, {worker.longitude.toFixed(6)}
                  </code>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDistanceToNow(new Date(worker.timestamp * 1000), { addSuffix: true })}
                </td>
                <td className="px-6 py-4">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-bold
                    ${worker.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}
                  `}>
                    {worker.is_active ? 'ACTIVE' : 'OFFLINE'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Phone size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <MessageSquare size={16} />
                    </button>
                    <button 
                      onClick={() => onWorkerClick(worker.id)}
                      className="ml-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Locate
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredWorkers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <Users size={48} className="text-gray-200" />
                    <p className="text-lg font-medium">No workers found matching your search</p>
                    <button onClick={() => setSearchTerm('')} className="text-blue-600 hover:underline">Clear search filters</button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-500">
        <p>Showing {filteredWorkers.length} of {workers.length} registered personnel</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>Previous</button>
          <button className="px-3 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default WorkerList;
