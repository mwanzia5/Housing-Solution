import React from 'react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ArrowRight, Building2, Users, FileCheck, ShieldCheck, Search, Filter, MapPin, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 bg-gray-50/50 min-h-screen">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden bg-blue-50 border border-blue-100 shadow-sm"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="City Skyline"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-50/90 to-transparent" />
        </div>
        
        <div className="relative z-10 p-8 md:p-12 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome, Kevin!
          </h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Discover affordable housing options available to you based on your income and household size.
          </p>
          <div className="flex gap-3">
            <Link to="/eligibility">
              <Button className="shadow-lg shadow-primary/20">
                Check Eligibility
              </Button>
            </Link>
            <Link to="/housing">
              <Button variant="outline" className="bg-white/50 border-gray-300 hover:bg-white">
                Browse All Listings
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Row */}
      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-1">3</div>
            <div className="text-gray-500 font-medium">Matched Houses</div>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">2 Bedroom</span>
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Verified
            </span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-1">2</div>
            <div className="text-gray-500 font-medium">Govt Programs</div>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">Subsidies</span>
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg">Available</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex items-center gap-4 bg-white relative overflow-hidden">
          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">A</div>
              <span className="text-2xl font-bold text-gray-900">KSh 7,500</span>
            </div>
            <p className="text-xs text-gray-500 leading-tight">
              Based on 30% of your monthly income (KSh 25,000)
            </p>
          </div>
          <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 shadow-md">
             <img 
              src="https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=300&auto=format&fit=crop" 
              alt="Affordability" 
              className="w-full h-full object-cover"
            />
          </div>
        </GlassCard>
      </div>

      {/* Top Matches Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Top Affordable Housing Matches</h2>
          <Button variant="outline" size="sm" className="gap-2 text-gray-600">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>

        {/* Filter Tags */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {['2 Bedroom', 'Own Payment', 'Available'].map((tag, i) => (
            <button key={i} className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors">
              {tag}
            </button>
          ))}
        </div>

        {/* Horizontal Listing Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-0 overflow-hidden flex flex-col md:flex-row group bg-white hover:shadow-lg transition-all duration-300">
            {/* Image Section */}
            <div className="w-full md:w-72 h-48 md:h-auto relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
                alt="Sunset Apartments"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> GreenviewResidences
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Sunset Apartments</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="w-3 h-3 mr-1" /> Nairobi, Kasarani
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock className="w-3 h-3" /> Hotel
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">KSh 70,000 Deposit</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">Prepost</span>
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-100 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Eligible
                  </span>
                </div>
              </div>

              <div className="flex items-end justify-between mt-6 pt-4 border-t border-gray-100">
                <div>
                  <div className="text-2xl font-bold text-gray-900">KSh 6,500<span className="text-sm text-gray-500 font-normal">/m</span></div>
                  <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <CheckCircle className="w-3 h-3" /> Affordable Housing Program
                  </div>
                </div>
                <Link to="/housing">
                  <Button className="bg-[#2A6E6B] hover:bg-[#225a57] text-white px-6">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Government Programs Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Government Housing Programs For You</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Program Card 1 */}
          <GlassCard className="p-4 flex gap-4 bg-white hover:shadow-md transition-shadow">
            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=300&auto=format&fit=crop" 
                alt="Program" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900">Affordable Housing Program</h3>
                <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded border border-green-100">Eligible</span>
              </div>
              <div className="flex items-center text-gray-500 text-xs mt-1 mb-2">
                <MapPin className="w-3 h-3 mr-1" /> Nakuru, Raini Rift
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                Government subsidy program to walk back all deductions step by step, based on actual affordable housing units.
              </p>
              <Link to="/programs">
                <Button size="sm" className="w-full bg-[#2A6E6B] hover:bg-[#225a57]">Apply Now</Button>
              </Link>
            </div>
          </GlassCard>

          {/* Program Card 2 */}
          <GlassCard className="p-4 flex gap-4 bg-white hover:shadow-md transition-shadow">
            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
               <ShieldCheck className="w-10 h-10 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900">Social Housing Initiative</h3>
              </div>
              <div className="space-y-1 mt-2 mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-1 h-1 bg-gray-400 rounded-full" /> KSh 1.1m Cap
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                   <div className="w-1 h-1 bg-gray-400 rounded-full" /> Priority efforts empressum
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                   <div className="w-1 h-1 bg-gray-400 rounded-full" /> Subtebaro rentals
                </div>
              </div>
              <Link to="/programs">
                <Button size="sm" className="w-full bg-[#2A6E6B] hover:bg-[#225a57]">Apply Now</Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
