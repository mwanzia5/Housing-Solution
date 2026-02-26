import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { MapPin, TrendingUp, AlertTriangle, Users } from 'lucide-react';

const INCOME_DATA = [
  { name: 'Very Low', value: 4500 },
  { name: 'Low', value: 3200 },
  { name: 'Moderate', value: 2100 },
  { name: 'Above', value: 800 },
];

const DEMAND_DATA = [
  { name: 'Jan', applicants: 120, units: 40 },
  { name: 'Feb', applicants: 150, units: 35 },
  { name: 'Mar', applicants: 180, units: 50 },
  { name: 'Apr', applicants: 220, units: 45 },
  { name: 'May', applicants: 250, units: 60 },
  { name: 'Jun', applicants: 300, units: 55 },
];

const LOCATION_DATA = [
  { name: 'Downtown', value: 35 },
  { name: 'Westside', value: 25 },
  { name: 'North Hills', value: 20 },
  { name: 'East River', value: 15 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#1B5E20', '#FBC02D', '#6D8B3D', '#FF8A65', '#90A4AE'];

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">System Analytics</h1>
          <p className="text-gray-600">Overview of housing demand, supply, and program performance.</p>
        </div>
        <div className="flex gap-2">
          <select className="p-2 rounded-lg border border-gray-200 bg-white/50 text-sm">
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Year to Date</option>
          </select>
          <Button variant="outline">Download Report</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Applicants', value: '12,450', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Housing Shortage', value: '2,340', change: '+5%', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Placement Rate', value: '68%', change: '+2.4%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Avg Wait Time', value: '42 Days', change: '-3 Days', icon: ClockIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <GlassCard key={i} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Demand vs Supply Chart */}
        <GlassCard className="p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-6">Demand vs. Unit Availability</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DEMAND_DATA}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#1B5E20" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FBC02D" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#FBC02D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="applicants" stroke="#1B5E20" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" name="Applicants" />
                <Area type="monotone" dataKey="units" stroke="#FBC02D" strokeWidth={3} fillOpacity={1} fill="url(#colorUnits)" name="New Units" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Income Distribution */}
        <GlassCard className="p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-6">Applicant Income Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INCOME_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E0E0E0" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                  {INCOME_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Heatmap Simulation (Table) */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-900">Regional Demand Heatmap</h3>
              <Button variant="ghost" size="sm"><MapPin className="w-4 h-4 mr-2" /> View Map</Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {LOCATION_DATA.map((loc, i) => (
                <div key={i} className="relative p-4 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-900">{loc.name}</h4>
                    <p className="text-sm text-gray-500">Waitlist: {loc.value * 120}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${loc.value * 2}%` }} />
                      </div>
                      <span className="text-xs font-bold text-primary">{loc.value}%</span>
                    </div>
                  </div>
                  {/* Heatmap color overlay simulation */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-50" />
                </div>
              ))}
              
              {/* Alert Card */}
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex flex-col justify-center items-center text-center">
                <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
                <h4 className="font-bold text-red-900">Critical Shortage</h4>
                <p className="text-xs text-red-700">Downtown District requires 400+ units immediately.</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Waitlist Tracker */}
        <GlassCard className="p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-6">Waitlist Composition</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={LOCATION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {LOCATION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="block text-3xl font-bold text-gray-900">4.2k</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Total</span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {LOCATION_DATA.slice(0, 3).map((loc, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-gray-600">{loc.name}</span>
                </div>
                <span className="font-bold text-gray-900">{loc.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// Helper icon
function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
