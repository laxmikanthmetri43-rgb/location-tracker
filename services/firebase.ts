
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Worker, WorkerStatus } from '../types';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

let app;
let database: any;

try {
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
  }
} catch (e) {
  console.error("Firebase init failed", e);
}

export const subscribeToWorkers = (callback: (workers: Worker[]) => void) => {
  if (!database) {
    return subscribeMockWorkers(callback);
  }

  const workersRef = ref(database, 'laborers');
  const listener = onValue(workersRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const workerList: Worker[] = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      callback(workerList);
    } else {
      callback([]);
    }
  });

  return () => off(workersRef, 'value', listener);
};

const subscribeMockWorkers = (callback: (workers: Worker[]) => void) => {
  const statuses: WorkerStatus[] = ['working', 'idle', 'offline'];
  
  const generateMockData = (): Worker[] => [
    { id: '1', name: 'Ramesh Kumar', latitude: 12.9716, longitude: 77.5946, timestamp: Date.now() / 1000, status: 'working', batteryLevel: 88, loginTime: '08:30 AM', workingHours: 6.5 },
    { id: '2', name: 'Suresh Singh', latitude: 28.6139, longitude: 77.2090, timestamp: Date.now() / 1000 - 3600, status: 'offline', batteryLevel: 12, loginTime: '09:00 AM', logoutTime: '05:00 PM', workingHours: 8.0 },
    { id: '3', name: 'Amit Patel', latitude: 19.0760, longitude: 72.8777, timestamp: Date.now() / 1000 - 10, status: 'working', batteryLevel: 45, loginTime: '08:45 AM', workingHours: 6.2 },
    { id: '4', name: 'Priya Sharma', latitude: 22.5726, longitude: 88.3639, timestamp: Date.now() / 1000 - 500, status: 'idle', batteryLevel: 92, loginTime: '09:15 AM', workingHours: 5.8 },
    { id: '5', name: 'Vikram Reddy', latitude: 17.3850, longitude: 78.4867, timestamp: Date.now() / 1000 - 86400, status: 'offline', batteryLevel: 0, loginTime: 'Prev Day', workingHours: 0 },
  ];

  callback(generateMockData());

  const interval = setInterval(() => {
    const baseData = generateMockData();
    const updated = baseData.map(w => {
      // Small jitter for movement
      const newLat = w.status === 'working' ? w.latitude + (Math.random() - 0.5) * 0.005 : w.latitude;
      const newLng = w.status === 'working' ? w.longitude + (Math.random() - 0.5) * 0.005 : w.longitude;
      
      return {
        ...w,
        latitude: newLat,
        longitude: newLng,
        timestamp: Date.now() / 1000,
        batteryLevel: Math.max(0, (w.batteryLevel || 100) - 0.01)
      };
    });
    callback(updated);
  }, 3000);

  return () => clearInterval(interval);
};
