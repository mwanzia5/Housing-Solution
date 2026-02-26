import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { MapPin, TrendingUp, AlertTriangle, Users, Clock } from 'lucide-react';

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

const CHART_COLORS = ['#0F2A43', '#1FA97A', '#475569', '#F59E0B', '#94a3b8'];

const tooltipStyle = {
  backgroundColor: 'var(--surface)',
  borderRadius: '12px',
  border: '1px solid var(--border)',
  boxShadow: '0 8px 30px rgba(15,23,42,0.06)',
  padding: '12px 16px',
};

export default function AdminDashboard() {
  const kpis = [
    {
      label: 'Total Applicants',
      value: '12,450',
      change: '+12%',
      icon: Users,
      changePositive: true,
    },
    {
      label: 'Housing Shortage',
      value: '2,340',
      change: '+5%',
      icon: AlertTriangle,
      changePositive: false,
    },
    {
      label: 'Placement Rate',
      value: '68%',
      change: '+2.4%',
      icon: TrendingUp,
      changePositive: true,
    },
    {
      label: 'Avg Wait Time',
      value: '42 Days',
      change: '-3 Days',
      icon: Clock,
      changePositive: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
            System Analytics
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Overview of housing demand, supply, and program performance.
          </p>
        </div>
        <div className="flex gap-3">
          <Select className="w-40">
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Year to Date</option>
          </Select>
          <Button variant="outline">Download Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((stat, i) => (
          <Card key={i} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-11 h-11 rounded-[12px] bg-[#f8fafc] flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-[999px] ${
                  stat.changePositive ? 'bg-[var(--accent-soft)] text-accent' : 'bg-red-50 text-[var(--danger)]'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-[var(--text-primary)]">{stat.value}</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-6">
            Demand vs. Unit Availability
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DEMAND_DATA}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F2A43" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0F2A43" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1FA97A" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1FA97A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="applicants"
                  stroke="#0F2A43"
                  strokeWidth={2}
                  fill="url(#colorApps)"
                  name="Applicants"
                />
                <Area
                  type="monotone"
                  dataKey="units"
                  stroke="#1FA97A"
                  strokeWidth={2}
                  fill="url(#colorUnits)"
                  name="New Units"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-6">
            Applicant Income Distribution
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INCOME_DATA} layout="vertical" margin={{ left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={90}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={28}>
                  {INCOME_DATA.map((_, index) => (
                    <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h3 className="font-semibold text-lg text-[var(--text-primary)]">
                Regional Demand Heatmap
              </h3>
              <Button variant="ghost" size="sm">
                <MapPin className="w-4 h-4 mr-2" /> View Map
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {LOCATION_DATA.map((loc, i) => (
                <div
                  key={i}
                  className="relative p-4 rounded-[16px] border border-[var(--border)] bg-[#f8fafc] hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-shadow"
                >
                  <h4 className="font-semibold text-[var(--text-primary)]">{loc.name}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Waitlist: {(loc.value * 120).toLocaleString()}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${loc.value * 2}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-primary">{loc.value}%</span>
                  </div>
                </div>
              ))}
              <div className="p-4 rounded-[16px] bg-red-50 border border-red-200 flex flex-col justify-center items-center text-center">
                <AlertTriangle className="w-8 h-8 text-[var(--danger)] mb-2" />
                <h4 className="font-semibold text-red-900">Critical Shortage</h4>
                <p className="text-xs text-red-700 mt-1">
                  Downtown District requires 400+ units immediately.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-6">
            Waitlist Composition
          </h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={LOCATION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {LOCATION_DATA.map((_, index) => (
                    <Cell
                      key={index}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="block text-2xl font-semibold text-[var(--text-primary)]">
                  4.2k
                </span>
                <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wide">
                  Total
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {LOCATION_DATA.slice(0, 3).map((loc, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: CHART_COLORS[i] }}
                  />
                  <span className="text-[var(--text-secondary)]">{loc.name}</span>
                </div>
                <span className="font-semibold text-[var(--text-primary)]">{loc.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
