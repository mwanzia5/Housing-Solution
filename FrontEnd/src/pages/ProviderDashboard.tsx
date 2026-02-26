import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Plus, Users, FileText, Download, Check, X, MoreHorizontal, Building } from 'lucide-react';

export default function ProviderDashboard() {
  const [showNewUnitModal, setShowNewUnitModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Housing Provider Portal</h1>
          <p className="text-gray-600">Manage properties, listings, and tenant applications.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export Report</Button>
          <Button onClick={() => setShowNewUnitModal(true)}><Plus className="w-4 h-4 mr-2" /> Post New Unit</Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Units', value: '124', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Occupied', value: '118', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Vacant', value: '6', color: 'text-secondary-700', bg: 'bg-secondary/10' },
          { label: 'Pending Apps', value: '42', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <GlassCard key={i} className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center`}>
              <Building className={`w-5 h-5 ${stat.color}`} />
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Applicants Table */}
        <div className="lg:col-span-2">
          <GlassCard className="p-0 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-900">Recent Applications</h3>
              <div className="flex gap-2">
                <select className="text-sm border-gray-200 rounded-lg p-2 bg-white/50">
                  <option>All Properties</option>
                  <option>Greenwood Social</option>
                  <option>Sunrise Homes</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Applicant</th>
                    <th className="px-6 py-4">Unit Applied</th>
                    <th className="px-6 py-4">Income Level</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Sarah Jenkins', unit: 'Apt 4B', income: 'Low (Tier 1)', date: 'Oct 24', status: 'Pending' },
                    { name: 'Michael Chen', unit: 'Unit 12', income: 'Very Low', date: 'Oct 23', status: 'Reviewing' },
                    { name: 'David Miller', unit: 'Apt 4B', income: 'Low (Tier 2)', date: 'Oct 22', status: 'Waitlist' },
                    { name: 'Emma Wilson', unit: 'Townhouse 3', income: 'Moderate', date: 'Oct 21', status: 'Approved' },
                    { name: 'Robert Fox', unit: 'Unit 8A', income: 'Low (Tier 1)', date: 'Oct 20', status: 'Rejected' },
                  ].map((app, i) => (
                    <tr key={i} className="hover:bg-white/40 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{app.name}</td>
                      <td className="px-6 py-4 text-gray-600">{app.unit}</td>
                      <td className="px-6 py-4 text-gray-600">{app.income}</td>
                      <td className="px-6 py-4 text-gray-500">{app.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                          app.status === 'Waitlist' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-green-100 text-green-600 rounded"><Check className="w-4 h-4" /></button>
                          <button className="p-1 hover:bg-red-100 text-red-600 rounded"><X className="w-4 h-4" /></button>
                          <button className="p-1 hover:bg-gray-100 text-gray-500 rounded"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-100 text-center">
              <Button variant="ghost" size="sm">View All Applications</Button>
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions / Notifications */}
        <div className="space-y-6">
          <GlassCard className="p-6 bg-primary text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Priority Alert</h3>
              <p className="text-primary-100 text-sm mb-4">5 units in "Sunrise Homes" have been vacant for 30+ days. Please review waitlist matches.</p>
              <Button size="sm" className="bg-white text-primary hover:bg-primary-50 border-none">Review Vacancies</Button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Compliance Checklist</h3>
            <div className="space-y-3">
              {[
                { label: 'Safety Inspection', due: 'Due in 5 days', urgent: true },
                { label: 'Tenant Income Verification', due: 'Due in 12 days', urgent: false },
                { label: 'Quarterly Report', due: 'Due in 20 days', urgent: false },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors cursor-pointer">
                  <div className={`w-2 h-2 mt-2 rounded-full ${item.urgent ? 'bg-red-500' : 'bg-green-500'}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* New Unit Modal (Simulated) */}
      {showNewUnitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <GlassCard className="w-full max-w-2xl p-8 bg-white/95">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Post New Unit</h2>
              <button onClick={() => setShowNewUnitModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-6">
              {/* Wizard Steps */}
              <div className="flex items-center gap-2 mb-8">
                <div className="h-2 flex-1 bg-primary rounded-full" />
                <div className="h-2 flex-1 bg-primary rounded-full" />
                <div className="h-2 flex-1 bg-gray-200 rounded-full" />
                <span className="text-xs font-medium text-gray-500 ml-2">Step 2 of 3</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Property Name</label>
                  <select className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-primary/50 outline-none">
                    <option>Greenwood Social Housing</option>
                    <option>Sunrise Community Homes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Unit Number</label>
                  <input type="text" placeholder="e.g. 4B" className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Monthly Rent ($)</label>
                  <input type="number" placeholder="0.00" className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Unit Type</label>
                  <select className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-primary/50 outline-none">
                    <option>1 Bedroom</option>
                    <option>2 Bedroom</option>
                    <option>3 Bedroom</option>
                    <option>Studio</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowNewUnitModal(false)}>Cancel</Button>
                <Button onClick={() => setShowNewUnitModal(false)}>Next Step</Button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
