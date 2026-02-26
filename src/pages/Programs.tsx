import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Check, Clock, FileText, Upload, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Programs() {
  const steps = [
    {
      id: 1,
      title: 'Pre-Screening',
      status: 'completed',
      date: 'Oct 24, 2025',
      desc: 'Initial eligibility check completed successfully.',
    },
    {
      id: 2,
      title: 'Document Submission',
      status: 'current',
      date: 'Pending',
      desc: 'Upload required identification and income verification documents.',
    },
    {
      id: 3,
      title: 'Agency Review',
      status: 'upcoming',
      date: 'Est. 2 weeks',
      desc: 'Housing authority reviews your application.',
    },
    {
      id: 4,
      title: 'Approval & Placement',
      status: 'upcoming',
      date: '-',
      desc: 'Receive voucher or housing assignment.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Program Navigator</h1>
          <p className="text-gray-600">Track your application status and manage your housing benefits.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Timeline */}
          <div className="md:col-span-2 space-y-8">
            <GlassCard className="p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Application Timeline
              </h2>
              
              <div className="relative pl-8 border-l-2 border-gray-200 space-y-10">
                {steps.map((step, index) => (
                  <div key={step.id} className="relative">
                    {/* Timeline Dot */}
                    <div
                      className={cn(
                        "absolute -left-[41px] w-5 h-5 rounded-full border-4 border-white shadow-sm flex items-center justify-center",
                        step.status === 'completed' ? "bg-primary" :
                        step.status === 'current' ? "bg-secondary ring-4 ring-secondary/20" : "bg-gray-300"
                      )}
                    >
                      {step.status === 'completed' && <Check className="w-3 h-3 text-white" />}
                    </div>

                    <div className={cn(
                      "transition-opacity",
                      step.status === 'upcoming' ? "opacity-50" : "opacity-100"
                    )}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-900">{step.title}</h3>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {step.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{step.desc}</p>
                      
                      {step.status === 'current' && (
                        <div className="mt-4 bg-primary/5 border border-primary/10 rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-primary mb-3">Action Required</h4>
                          <Button size="sm" className="w-full sm:w-auto">
                            <Upload className="w-4 h-4 mr-2" /> Upload Documents
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Caseworker</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                  SJ
                </div>
                <div>
                  <div className="font-medium text-sm">Sarah Jenkins</div>
                  <div className="text-xs text-gray-500">Housing Specialist</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">Contact Caseworker</Button>
            </GlassCard>

            <GlassCard className="p-6 bg-secondary/10 border-secondary/20">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-primary hover:underline flex items-center justify-between">
                  Download Application PDF <ChevronRight className="w-3 h-3" />
                </a></li>
                <li><a href="#" className="text-primary hover:underline flex items-center justify-between">
                  Income Limits Chart 2026 <ChevronRight className="w-3 h-3" />
                </a></li>
                <li><a href="#" className="text-primary hover:underline flex items-center justify-between">
                  FAQ & Support <ChevronRight className="w-3 h-3" />
                </a></li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
