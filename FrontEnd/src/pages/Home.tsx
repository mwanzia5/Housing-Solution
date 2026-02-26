import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  Filter,
  MapPin,
  CheckCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <Card className="p-0 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              alt="City Skyline"
              className="w-full h-64 md:h-72 object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-[var(--surface)]/95 to-transparent" />
          </div>
          <div className="relative z-10 px-6 py-8 md:px-10 md:py-12 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] tracking-tight mb-3">
              Welcome back
            </h1>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-6">
              Discover affordable housing options available to you based on your income and household size.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/eligibility">
                <Button>Check Eligibility</Button>
              </Link>
              <Link to="/housing">
                <Button variant="outline">Browse All Listings</Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-3xl font-semibold text-[var(--text-primary)] mb-1">3</div>
          <div className="text-sm font-medium text-[var(--text-secondary)]">Matched Houses</div>
          <div className="flex gap-2 mt-4 flex-wrap">
            <Badge variant="neutral">2 Bedroom</Badge>
            <Badge variant="success">
              <CheckCircle className="w-3 h-3 mr-1 inline" /> Verified
            </Badge>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-semibold text-[var(--text-primary)] mb-1">2</div>
          <div className="text-sm font-medium text-[var(--text-secondary)]">Govt Programs</div>
          <div className="flex gap-2 mt-4 flex-wrap">
            <Badge variant="neutral">Subsidies</Badge>
            <Badge variant="success">Available</Badge>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-semibold text-[var(--text-primary)]">KSh 7,500</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Based on 30% of monthly income (KSh 25,000)
            </p>
          </div>
          <div className="w-20 h-14 rounded-[12px] overflow-hidden shrink-0 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
            <img
              src="https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=300&auto=format&fit=crop"
              alt="Affordability"
              className="w-full h-full object-cover"
            />
          </div>
        </Card>
      </div>

      {/* Top Matches */}
      <div className="space-y-6">
        <SectionHeader
          title="Top Affordable Housing Matches"
          actions={
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          }
        />
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['2 Bedroom', 'Own Payment', 'Available'].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 rounded-[999px] bg-[var(--accent-soft)] text-[var(--accent)] text-sm font-medium hover:bg-[var(--accent)]/10 transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-0 overflow-hidden flex flex-col md:flex-row hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-shadow">
            <div className="w-full md:w-72 h-48 md:h-auto relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
                alt="Sunset Apartments"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3">
                <Badge variant="success">
                  <CheckCircle className="w-3 h-3" /> Greenview Residences
                </Badge>
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">Sunset Apartments</h3>
                    <div className="flex items-center text-[var(--text-secondary)] text-sm mt-1">
                      <MapPin className="w-3.5 h-3.5 mr-1" /> Nairobi, Kasarani
                    </div>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Hotel
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="neutral">KSh 70,000 Deposit</Badge>
                  <Badge variant="neutral">Prepost</Badge>
                  <Badge variant="success">
                    <CheckCircle className="w-3 h-3" /> Eligible
                  </Badge>
                </div>
              </div>
              <div className="flex items-end justify-between mt-6 pt-4 border-t border-[var(--border)]">
                <div>
                  <span className="text-xl font-semibold text-[var(--text-primary)]">KSh 6,500</span>
                  <span className="text-sm text-[var(--text-secondary)]">/m</span>
                  <div className="text-xs text-[var(--accent)] flex items-center gap-1 mt-1">
                    <CheckCircle className="w-3 h-3" /> Affordable Housing Program
                  </div>
                </div>
                <Link to="/housing">
                  <Button>Apply Now</Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Government Programs */}
      <div className="space-y-6">
        <SectionHeader title="Government Housing Programs For You" />
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-5 flex gap-4 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-shadow">
            <div className="w-20 h-20 rounded-[12px] overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=300&auto=format&fit=crop"
                alt="Program"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-[var(--text-primary)]">Affordable Housing Program</h3>
                <Badge variant="success">Eligible</Badge>
              </div>
              <div className="flex items-center text-[var(--text-secondary)] text-xs mt-1 mb-2">
                <MapPin className="w-3 h-3 mr-1" /> Nakuru, Rift Valley
              </div>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">
                Government subsidy program based on actual affordable housing units.
              </p>
              <Link to="/programs">
                <Button size="sm">Apply Now</Button>
              </Link>
            </div>
          </Card>
          <Card className="p-5 flex gap-4 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-shadow">
            <div className="w-20 h-20 rounded-[12px] bg-[#f1f5f9] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-10 h-10 text-[var(--text-secondary)]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Social Housing Initiative</h3>
              <ul className="space-y-1 text-xs text-[var(--text-secondary)] mb-3">
                <li>• KSh 1.1m Cap</li>
                <li>• Priority efforts</li>
                <li>• Subsidized rentals</li>
              </ul>
              <Link to="/programs">
                <Button size="sm">Apply Now</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
