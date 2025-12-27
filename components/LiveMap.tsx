
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Worker } from '../types';
import { format } from 'date-fns';

interface LiveMapProps {
  workers: Worker[];
  selectedWorkerId: string | null;
  onClearSelection: () => void;
}

const LiveMap: React.FC<LiveMapProps> = ({ workers, selectedWorkerId, onClearSelection }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([20.5937, 78.9629], 5);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    workers.forEach(worker => {
      const statusColor = 
        worker.status === 'working' ? '#10b981' : 
        worker.status === 'idle' ? '#f59e0b' : '#94a3b8';
      
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div style="position: relative;">
            <div style="background-color: ${statusColor}; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.2);"></div>
            ${worker.status === 'working' ? `<div style="position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; border-radius: 50%; border: 2px solid ${statusColor}; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
          </div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });

      const formattedTime = format(new Date(worker.timestamp * 1000), 'hh:mm:ss a');
      const popupContent = `
        <div style="min-width: 200px; padding: 12px; font-family: 'Inter', sans-serif;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <div style="width: 32px; height: 32px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #64748b;">${worker.name.charAt(0)}</div>
            <div>
              <h4 style="margin: 0; font-weight: 800; color: #1e293b; font-size: 14px;">${worker.name}</h4>
              <span style="font-size: 10px; font-weight: 900; color: ${statusColor}; text-transform: uppercase; letter-spacing: 0.05em;">${worker.status}</span>
            </div>
          </div>
          <div style="background: #f8fafc; border-radius: 12px; padding: 10px; font-size: 11px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: bold;">LAST PING</span>
              <span style="color: #475569; font-weight: 800;">${formattedTime}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #94a3b8; font-weight: bold;">BATTERY</span>
              <span style="color: ${worker.batteryLevel && worker.batteryLevel < 20 ? '#ef4444' : '#10b981'}; font-weight: 800;">${Math.round(worker.batteryLevel || 0)}%</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #94a3b8; font-weight: bold;">COORD</span>
              <span style="color: #475569; font-weight: 800;">${worker.latitude.toFixed(3)}, ${worker.longitude.toFixed(3)}</span>
            </div>
          </div>
          <button style="width: 100%; margin-top: 12px; background: #4f46e5; color: white; border: none; padding: 8px; border-radius: 8px; font-weight: bold; font-size: 11px; cursor: pointer;">View History</button>
        </div>
      `;

      if (markersRef.current[worker.id]) {
        markersRef.current[worker.id].setLatLng([worker.latitude, worker.longitude]);
        markersRef.current[worker.id].getPopup()?.setContent(popupContent);
        markersRef.current[worker.id].setIcon(customIcon);
      } else {
        const marker = L.marker([worker.latitude, worker.longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup(popupContent, { 
            closeButton: false, 
            className: 'premium-popup',
            offset: [0, -10]
          });
        markersRef.current[worker.id] = marker;
      }
    });

    if (selectedWorkerId && markersRef.current[selectedWorkerId]) {
      const marker = markersRef.current[selectedWorkerId];
      map.setView(marker.getLatLng(), 15, { animate: true });
      marker.openPopup();
      onClearSelection();
    }
  }, [workers, selectedWorkerId]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative">
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        .leaflet-popup-content-wrapper { border-radius: 20px; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); border: 1px solid #f1f5f9; }
        .leaflet-popup-tip { display: none; }
      `}</style>
      <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
         <div className="bg-white/90 backdrop-blur-md border border-white p-4 rounded-3xl shadow-xl space-y-3">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Map Legend</h4>
            <div className="space-y-2">
               <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
                  <span className="text-xs font-bold text-slate-600">On-Duty / Working</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-200" />
                  <span className="text-xs font-bold text-slate-600">Idle / Stationary</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-sm shadow-slate-200" />
                  <span className="text-xs font-bold text-slate-600">Offline / No Feed</span>
               </div>
            </div>
         </div>
      </div>
      <div ref={mapContainerRef} className="flex-1 z-0 grayscale-[0.2] contrast-[1.1]" />
    </div>
  );
};

export default LiveMap;
