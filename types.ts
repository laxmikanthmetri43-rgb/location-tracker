
export type WorkerStatus = 'working' | 'idle' | 'offline';

export interface Worker {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timestamp: number;
  status: WorkerStatus;
  loginTime?: string;
  logoutTime?: string;
  workingHours?: number;
  batteryLevel?: number;
}

export type ViewType = 'dashboard' | 'map' | 'list' | 'attendance' | 'alerts' | 'settings';
