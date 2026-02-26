import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { User, Upload, Home, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export default function CitizenDashboard() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Citizen Dashboard</h1>
          <p className="text-gray-600">Manage your housing profile and applications.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full border border-white/60">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-primary-900">Status: Active Applicant</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Profile & Documents */}
        <div className="space-y-8">
          {/* Profile Card */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary border-2 border-primary/20">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Alex Johnson</h2>
                <p className="text-sm text-gray-500">ID: #8829-1029</p>
              </div>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Household Size</span>
                <span className="font-semibold text-gray-900">3 Members</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Annual Income</span>
                <span className="font-semibold text-gray-900">$32,500</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Current Location</span>
                <span className="font-semibold text-gray-900">Downtown Dist.</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Priority Group</span>
                <span className="font-semibold text-primary">Tier 2 (Family)</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-6">Edit Profile</Button>
          </GlassCard>

          {/* Document Upload */}
          <GlassCard className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Documents
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">ID Verification</span>
                </div>
                <span className="text-xs text-green-700">Verified</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-900">Income Proof</span>
                </div>
                <span className="text-xs text-yellow-700">Reviewing</span>
              </div>
            </div>

            <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center hover:bg-primary/5 transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-gray-900">Upload New Document</p>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
            </div>
          </GlassCard>
        </div>

        {/* Middle/Right Column: Applications & Matches */}
        <div className="md:col-span-2 space-y-8">
          {/* Application Status Tracker */}
          <GlassCard className="p-8">
            <h3 className="font-bold text-lg text-gray-900 mb-6">Active Application Status</h3>
            
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full" />
              <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-primary -translate-y-1/2 rounded-full" />
              
              <div className="relative flex justify-between">
                {[
                  { label: 'Submitted', status: 'completed' },
                  { label: 'Under Review', status: 'current' },
                  { label: 'Waitlist', status: 'upcoming' },
                  { label: 'Approved', status: 'upcoming' },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 ${
                      step.status === 'completed' ? 'bg-primary border-primary text-white' :
                      step.status === 'current' ? 'bg-white border-primary text-primary shadow-lg scale-110' :
                      'bg-white border-gray-200 text-gray-300'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-xs font-bold ${
                      step.status === 'current' ? 'text-primary' : 'text-gray-500'
                    }`}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex gap-3">
              <Clock className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900">Estimated Wait Time: 3-5 Weeks</p>
                <p className="text-xs text-blue-700 mt-1">Your application is currently being reviewed by a housing specialist. We may contact you for additional details.</p>
              </div>
            </div>
          </GlassCard>

          {/* Auto-Matched Housing */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-900">Recommended For You</h3>
              <Button variant="ghost" size="sm">View All Matches</Button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Greenwood Social Housing",
                  match: "98% Match",
                  rent: "$450/mo",
                  loc: "Downtown District",
                  img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
                },
                {
                  title: "Sunrise Community Homes",
                  match: "92% Match",
                  rent: "$600/mo",
                  loc: "Westside Gardens",
                  img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
                }
              ].map((house, i) => (
                <motion.div key={i} whileHover={{ y: -4 }}>
                  <GlassCard className="p-0 overflow-hidden h-full">
                    <div className="h-32 relative">
                      <img src={house.img} alt={house.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-secondary text-primary-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                        {house.match}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 line-clamp-1">{house.title}</h4>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-gray-500 flex items-center gap-1"><Home className="w-3 h-3" /> {house.loc}</span>
                        <span className="font-bold text-primary">{house.rent}</span>
                      </div>
                      <Button size="sm" className="w-full mt-4">Apply Now</Button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
