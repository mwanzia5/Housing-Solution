import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { MapPin, Filter, DollarSign, Users, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const HOUSING_DATA = [
  {
    id: 1,
    title: 'Greenwood Social Housing',
    location: 'Downtown District',
    rent: 450,
    type: 'Apartment',
    beds: 2,
    baths: 1,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    subsidized: true,
    tags: ['Section 8', 'Family'],
  },
  {
    id: 2,
    title: 'Sunrise Community Homes',
    location: 'Westside Gardens',
    rent: 600,
    type: 'Townhouse',
    beds: 3,
    baths: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    subsidized: true,
    tags: ['Low Income', 'Accessible'],
  },
  {
    id: 3,
    title: 'Oakwood Senior Living',
    location: 'North Hills',
    rent: 350,
    type: 'Studio',
    beds: 1,
    baths: 1,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop',
    subsidized: true,
    tags: ['Senior', 'Utility Included'],
  },
  {
    id: 4,
    title: 'Metro Affordable Units',
    location: 'City Center',
    rent: 550,
    type: 'Apartment',
    beds: 2,
    baths: 1,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop',
    subsidized: false,
    tags: ['Workforce Housing'],
  },
  {
    id: 5,
    title: 'Riverview Cooperative',
    location: 'East River',
    rent: 400,
    type: 'Apartment',
    beds: 2,
    baths: 1,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
    subsidized: true,
    tags: ['Co-op', 'Family'],
  },
  {
    id: 6,
    title: 'Highland Park Homes',
    location: 'Highland Park',
    rent: 700,
    type: 'Single Family',
    beds: 4,
    baths: 2,
    image: 'https://images.unsplash.com/photo-1600596542815-2495db9dc2c3?q=80&w=2070&auto=format&fit=crop',
    subsidized: false,
    tags: ['Large Family'],
  },
];

export default function Housing() {
  const [filters, setFilters] = useState({
    maxRent: 1000,
    type: 'All',
    subsidized: false,
  });

  const filteredHousing = HOUSING_DATA.filter((house) => {
    return (
      house.rent <= filters.maxRent &&
      (filters.type === 'All' || house.type === filters.type) &&
      (!filters.subsidized || house.subsidized)
    );
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-80 shrink-0 space-y-6">
          <GlassCard className="sticky top-24 p-6">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <Filter className="w-5 h-5" />
              <h2 className="font-semibold text-lg">Filters</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Monthly Rent: ${filters.maxRent}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={filters.maxRent}
                  onChange={(e) => setFilters({ ...filters, maxRent: parseInt(e.target.value) })}
                  className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Housing Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-gray-300 bg-white/50 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Studio">Studio</option>
                  <option value="Single Family">Single Family</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="subsidized"
                  checked={filters.subsidized}
                  onChange={(e) => setFilters({ ...filters, subsidized: e.target.checked })}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="subsidized" className="text-sm font-medium text-gray-700">
                  Government Subsidized Only
                </label>
              </div>

              <Button className="w-full mt-4">Apply Filters</Button>
            </div>
          </GlassCard>
        </aside>

        {/* Listings Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Available Housing</h1>
            <span className="text-gray-500 text-sm">{filteredHousing.length} units found</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredHousing.map((house) => (
              <motion.div
                key={house.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-0 overflow-hidden h-full flex flex-col group" hoverEffect>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={house.image}
                      alt={house.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {house.subsidized && (
                      <div className="absolute top-3 left-3 bg-secondary text-primary-900 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Subsidized
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      ${house.rent}/mo
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{house.title}</h3>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {house.location}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5 bg-gray-100/50 p-2 rounded-lg">
                        <Users className="w-4 h-4 text-primary" />
                        {house.beds} Beds
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-100/50 p-2 rounded-lg">
                        <Users className="w-4 h-4 text-primary" />
                        {house.baths} Baths
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
                      <Button className="flex-1">Apply Now</Button>
                      <Button variant="outline" className="px-3">Details</Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
