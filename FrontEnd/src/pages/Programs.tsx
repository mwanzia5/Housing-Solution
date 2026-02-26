import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check, Clock, FileText, Upload, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default function Programs() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[var(--text-primary)] tracking-tight mb-2">
          Program Navigator
        </h1>
        <p className="text-[var(--text-secondary)]">
          Track your application status and manage your housing benefits.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Application Timeline
            </h2>
            <div className="relative pl-8 space-y-8">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  <div
                    className={cn(
                      'absolute -left-[41px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm bg-[var(--surface)]',
                      step.status === 'completed' && 'bg-accent',
                      step.status === 'current' && 'bg-primary ring-4 ring-primary/10',
                      step.status === 'upcoming' && 'bg-[var(--border)]'
                    )}
                  >
                    {step.status === 'completed' && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div
                    className={cn(
                      'transition-opacity',
                      step.status === 'upcoming' && 'opacity-60'
                    )}
                  >
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <h3 className="font-semibold text-[var(--text-primary)]">{step.title}</h3>
                      <Badge variant="neutral">{step.date}</Badge>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-3">{step.desc}</p>
                    {step.status === 'current' && (
                      <div className="mt-4 p-4 rounded-[var(--radius)] bg-[#f8fafc]">
                        <h4 className="text-sm font-semibold text-primary mb-3">Action Required</h4>
                        <Button size="sm">
                          <Upload className="w-4 h-4 mr-2" /> Upload Documents
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Your Caseworker</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] font-semibold text-sm">
                SJ
              </div>
              <div>
                <div className="font-medium text-sm text-[var(--text-primary)]">Sarah Jenkins</div>
                <div className="text-xs text-[var(--text-secondary)]">Housing Specialist</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Contact Caseworker
            </Button>
          </Card>
          <Card className="p-6 bg-[var(--accent-soft)]/50">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Quick actions
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-primary hover:text-accent flex items-center justify-between py-2 rounded-[var(--radius)] px-2 -mx-2 hover:bg-white/50 transition-colors"
                >
                  Download Application PDF <ChevronRight className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary hover:text-accent flex items-center justify-between py-2 rounded-[var(--radius)] px-2 -mx-2 hover:bg-white/50 transition-colors"
                >
                  Income Limits Chart 2026 <ChevronRight className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary hover:text-accent flex items-center justify-between py-2 rounded-[var(--radius)] px-2 -mx-2 hover:bg-white/50 transition-colors"
                >
                  FAQ & Support <ChevronRight className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
