import React from 'react';
import { Activity, AlertTriangle, CheckCircle, ShieldAlert, Server } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const scanData = [
  { name: 'Mon', critical: 4, high: 10, medium: 15 },
  { name: 'Tue', critical: 3, high: 8, medium: 12 },
  { name: 'Wed', critical: 5, high: 12, medium: 20 },
  { name: 'Thu', critical: 2, high: 9, medium: 14 },
  { name: 'Fri', critical: 6, high: 15, medium: 25 },
  { name: 'Sat', critical: 8, high: 23, medium: 30 },
  { name: 'Sun', critical: 8, high: 23, medium: 30 }, // Using Sun as current
];

const riskData = [
  { name: 'Critical', count: 8, fill: '#ef4444' },
  { name: 'High', count: 23, fill: '#f97316' },
  { name: 'Medium', count: 30, fill: '#eab308' },
  { name: 'Low', count: 45, fill: '#3b82f6' },
];

const Dashboard = () => {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Security Overview</h1>
        <p className="text-gray-400">Enterprise Vulnerability Management Platform</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Assets', value: '127', icon: <Server className="text-brand-400" size={24}/>, color: 'text-brand-400', bg: 'bg-brand-400/10' },
          { label: 'Critical Risks', value: '8', icon: <AlertTriangle className="text-red-500" size={24}/>, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'High Risks', value: '23', icon: <ShieldAlert className="text-orange-500" size={24}/>, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Open Scans', value: '3', icon: <Activity className="text-blue-400" size={24}/>, color: 'text-blue-400', bg: 'bg-blue-400/10' }
        ].map((stat, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg shadow-black/20 flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-6">Vulnerability Trends</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scanData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f3f4f6' }}
                  itemStyle={{ color: '#e5e7eb' }}
                />
                <Area type="monotone" dataKey="critical" stroke="#ef4444" fillOpacity={1} fill="url(#colorCritical)" strokeWidth={2} />
                <Area type="monotone" dataKey="high" stroke="#f97316" fillOpacity={1} fill="url(#colorHigh)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-6">Risk Distribution</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#1f2937'}}
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f3f4f6' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Recent Scans Section */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Scans</h2>
          <button className="bg-brand-500 hover:bg-brand-400 text-gray-950 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
            <Activity size={16} />
            New Scan
          </button>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-800/50 text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">Target</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Findings</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr className="hover:bg-gray-800/20 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-200">192.168.1.50</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                    <CheckCircle size={12} /> Completed
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 border border-red-500/20 text-xs">2 Critical</span>
                    <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 border border-orange-500/20 text-xs">5 High</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400">2 hours ago</td>
              </tr>
              <tr className="hover:bg-gray-800/20 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-200">corp-web-01.internal</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Activity size={12} className="animate-spin" /> In Progress (68%)
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">-</td>
                <td className="px-6 py-4 text-gray-400">Just now</td>
              </tr>
              <tr className="hover:bg-gray-800/20 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-200">10.0.5.12</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                    <CheckCircle size={12} /> Completed
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700 text-xs">0 Findings</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400">Yesterday</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
