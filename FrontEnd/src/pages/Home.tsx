import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Filter, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/Authcontext';
import { useUI } from '@/context/UIContext';
import { formatKESShort } from '@/lib/format';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Home() {
  const { profile } = useAuth();
  const { openEligibilityModal } = useUI();
  const firstName = profile?.full_name?.split(' ')[0] || 'there';
  const greeting = getGreeting();

  return (
    <div className="space-y-8">
      {/* Hero - extended full-width container; text stays in same position */}
      <div className="w-screen relative left-1/2 -translate-x-1/2">
        <Card className="p-0 overflow-visible rounded-none md:rounded-[var(--radius-lg)] w-full">
          <div className="relative min-h-64 md:min-h-72 overflow-hidden rounded-none md:rounded-[var(--radius-lg)]">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="City Skyline"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
            </div>
            {/* Text block: same max-width and padding as page content so it doesn't move */}
            <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-12">
              <div className="max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--text-primary)] tracking-tight mb-3 break-words">
                  {greeting}, {firstName}.
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6 break-words">
                  Discover affordable housing options available to you based on your income and household size.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={openEligibilityModal} className="shrink-0">Check Eligibility</Button>
                  <Link to="/housing" className="shrink-0">
                    <Button variant="outline">Browse All Listings</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats - row 1: Matched Houses + Govt Programs; row 2: KSh card on its own */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        <Card className="p-3 md:p-6 min-w-0">
          <div className="text-xl md:text-3xl font-semibold text-[var(--text-primary)] mb-0.5 md:mb-1">3</div>
          <div className="text-xs md:text-sm font-medium text-[var(--text-secondary)] truncate">Matched Houses</div>
          <div className="flex gap-1 md:gap-2 mt-2 md:mt-4 flex-wrap">
            <Badge variant="neutral" className="text-xs">2 Bedroom</Badge>
            <Badge variant="success" className="text-xs">
              <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1 inline" /> Verified
            </Badge>
          </div>
        </Card>
        <Card className="p-3 md:p-6 min-w-0">
          <div className="text-xl md:text-3xl font-semibold text-[var(--text-primary)] mb-0.5 md:mb-1">2</div>
          <div className="text-xs md:text-sm font-medium text-[var(--text-secondary)] truncate">Govt Programs</div>
          <div className="flex gap-1 md:gap-2 mt-2 md:mt-4 flex-wrap">
            <Badge variant="neutral" className="text-xs">Subsidies</Badge>
            <Badge variant="success" className="text-xs">Available</Badge>
          </div>
        </Card>
        <Card className="p-3 md:p-6 flex items-center gap-2 md:gap-4 min-w-0 col-span-2 md:col-span-1">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 md:mb-1">
              <span className="text-lg md:text-2xl font-semibold text-[var(--text-primary)]">{formatKESShort(7500)}</span>
            </div>
            <p className="text-xs md:text-sm text-[var(--text-secondary)]">
              Based on 30% of monthly income ({formatKESShort(25000)})
            </p>
          </div>
          <div className="w-12 h-10 md:w-20 md:h-14 rounded-[var(--radius)] overflow-hidden shrink-0 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
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
                    <CheckCircle className="w-3 h-3" /> Hotel
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="neutral">{formatKESShort(70000)} Deposit</Badge>
                  <Badge variant="neutral">Prepost</Badge>
                  <Badge variant="success">
                    <CheckCircle className="w-3 h-3" /> Eligible
                  </Badge>
                </div>
              </div>
              <div className="flex items-end justify-between mt-6 pt-4">
                <div>
                  <span className="text-xl font-semibold text-[var(--text-primary)]">{formatKESShort(6500)}</span>
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
            <div className="w-20 h-20 rounded-[var(--radius)] overflow-hidden shrink-0">
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
            <div className="w-20 h-20 rounded-[var(--radius)] bg-[#f1f5f9] flex items-center justify-center shrink-0">
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
