import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const mockData = [
  { time: '08:00', traffic: 1200, crowd: 800 },
  { time: '09:00', traffic: 2100, crowd: 1500 },
  { time: '10:00', traffic: 1800, crowd: 2300 },
  { time: '11:00', traffic: 1600, crowd: 3100 },
  { time: '12:00', traffic: 2400, crowd: 3800 },
  { time: '13:00', traffic: 2200, crowd: 3400 },
  { time: '14:00', traffic: 1900, crowd: 3000 },
  { time: '15:00', traffic: 2100, crowd: 3500 },
  { time: '16:00', traffic: 2800, crowd: 4200 },
  { time: '17:00', traffic: 3800, crowd: 5600 },
  { time: '18:00', traffic: 4200, crowd: 6800 },
  { time: '19:00', traffic: 3100, crowd: 5100 },
];

export default function TrafficChart() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorCrowd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(17, 25, 40, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area type="monotone" dataKey="traffic" name="車流量 (輛/小時)" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
          <Area type="monotone" dataKey="crowd" name="人潮數量 (人)" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCrowd)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
