import React, { useState, useEffect } from 'react';
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
import Papa from 'papaparse';
import trafficCsv from '../data/city_traffic_flow.csv?raw';
import crowdCsv from '../data/signaling_crowd_density.csv?raw';

export default function TrafficChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Parse CSVs
    const trafficParsed = Papa.parse(trafficCsv, { header: true, skipEmptyLines: true }).data;
    const crowdParsed = Papa.parse(crowdCsv, { header: true, skipEmptyLines: true }).data;

    // Aggregate Traffic by Timestamp (sum Vehicle_Count)
    const trafficByTime = {};
    trafficParsed.forEach(row => {
      // row: Timestamp, Vehicle_Count
      const time = row.Timestamp.split(' ')[1]; // Extract HH:mm
      if (!time) return;
      if (!trafficByTime[time]) trafficByTime[time] = 0;
      trafficByTime[time] += parseInt(row.Vehicle_Count || 0, 10);
    });

    // Aggregate Crowd by Timestamp (sum User_Count)
    const crowdByTime = {};
    crowdParsed.forEach(row => {
      // row: Timestamp, User_Count
      const time = row.Timestamp.split(' ')[1]; // Extract HH:mm
      if (!time) return;
      if (!crowdByTime[time]) crowdByTime[time] = 0;
      crowdByTime[time] += parseInt(row.User_Count || 0, 10);
    });

    // Merge and sort
    const merged = Object.keys(trafficByTime).map(time => ({
      time,
      traffic: trafficByTime[time],
      crowd: crowdByTime[time] || 0
    })).sort((a, b) => a.time.localeCompare(b.time));

    setChartData(merged);
  }, []);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(17, 25, 40, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area yAxisId="left" type="monotone" dataKey="traffic" name="車流量 (輛/區間)" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
          <Area yAxisId="right" type="monotone" dataKey="crowd" name="人潮數量 (人)" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCrowd)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
