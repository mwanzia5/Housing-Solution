import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { User, Upload, Home, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const recommendedListings = [
  {
    title: 'Greenwood Social Housing',
    match: '98% Match',
    rent: 'KSh 450/mo',
    loc: 'Downtown District',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Sunrise Community Homes',
    match: '92% Match',
    rent: 'KSh 600/mo',
    loc: 'Westside Gardens',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
  },
];

const applicationSteps = [
  { label: 'Submitted', status: 'completed' },
  { label: 'Under Review', status: 'current' },
  { label: 'Waitlist', status: 'upcoming' },
  { label: 'Approved', status: 'upcoming' },
];

export default function CitizenDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <SectionHeader
          title="Citizen Dashboard"
          subtitle="Manage your housing profile and applications."
        />
        <div className="flex items-center gap-2 px-4 py-2 rounded-[999px] border border-[var(--border)] bg-[var(--surface)]">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-sm font-medium text-[var(--text-primary)]">Active Applicant</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] flex items-center justify-center text-primary border-2 border-primary/10">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Alex Johnson</h2>
                <p className="text-sm text-[var(--text-secondary)]">ID: #8829-1029</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Household Size', value: '3 Members' },
                { label: 'Annual Income', value: 'KSh 32,500' },
                { label: 'Current Location', value: 'Downtown Dist.' },
                { label: 'Priority Group', value: 'Tier 2 (Family)' },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between py-2 border-b border-[var(--border)] last:border-0"
                >
                  <span className="text-[var(--text-secondary)]">{row.label}</span>
                  <span className="font-medium text-[var(--text-primary)]">{row.value}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">
              Edit Profile
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Documents
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 rounded-[12px] border border-[var(--accent-soft)] bg-[var(--accent-soft)]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">ID Verification</span>
                </div>
                <Badge variant="success">Verified</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-[12px] border border-amber-200 bg-amber-50">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-900">Income Proof</span>
                </div>
                <span className="text-xs text-amber-700">Reviewing</span>
              </div>
            </div>
            <div className="border-2 border-dashed border-[var(--border)] rounded-[12px] p-6 text-center hover:bg-[#f8fafc] transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-[var(--text-primary)]">Upload New Document</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">PDF, JPG or PNG (Max 5MB)</p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
              Active Application Status
            </h3>
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-[var(--border)] -translate-y-1/2 rounded-full" />
              <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-primary -translate-y-1/2 rounded-full" />
              <div className="relative flex justify-between">
                {applicationSteps.map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        step.status === 'completed'
                          ? 'bg-primary border-primary text-white'
                          : step.status === 'current'
                            ? 'bg-[var(--surface)] border-primary text-primary shadow-md scale-110'
                            : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {step.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : i + 1}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        step.status === 'current' ? 'text-primary' : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 p-4 rounded-[12px] border border-[var(--border)] bg-[#f8fafc] flex gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  Estimated Wait Time: 3–5 Weeks
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Your application is being reviewed. We may contact you for additional details.
                </p>
              </div>
            </div>
          </Card>

          <div>
            <SectionHeader
              title="Recommended For You"
              actions={
                <Button variant="ghost" size="sm">
                  View All Matches
                </Button>
              }
            />
            {recommendedListings.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {recommendedListings.map((house, i) => (
                  <motion.div key={i} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                    <Card className="p-0 overflow-hidden h-full hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-shadow">
                      <div className="h-32 relative">
                        <img
                          src={house.img}
                          alt={house.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="accent">{house.match}</Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-[var(--text-primary)] line-clamp-1">
                          {house.title}
                        </h4>
                        <div className="flex justify-between items-center mt-2 text-sm">
                          <span className="text-[var(--text-secondary)] flex items-center gap-1">
                            <Home className="w-3.5 h-3.5" /> {house.loc}
                          </span>
                          <span className="font-semibold text-primary">{house.rent}</span>
                        </div>
                        <Button size="sm" className="w-full mt-4">
                          Apply Now
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Home className="w-6 h-6" />}
                title="No recommendations yet"
                description="Complete your profile and eligibility check to see matched listings."
                action={{ label: 'Check Eligibility', onClick: () => {} }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
