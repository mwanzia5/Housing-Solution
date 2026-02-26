import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { MapPin, Filter, CheckCircle, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { formatKESShort } from '@/lib/format';

const HOUSING_DATA = [
  {
    id: 1,
    title: 'Greenwood Social Housing',
    location: 'Downtown District',
    rent: 8500,
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
    rent: 12000,
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
    rent: 6000,
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
    rent: 15000,
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
    rent: 9500,
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
    rent: 22000,
    type: 'Single Family',
    beds: 4,
    baths: 2,
    image: 'https://images.unsplash.com/photo-1600596542815-2495db9dc2c3?q=80&w=2070&auto=format&fit=crop',
    subsidized: false,
    tags: ['Large Family'],
  },
];

type House = (typeof HOUSING_DATA)[number];

export default function Housing() {
  const [filters, setFilters] = useState({
    maxRent: 50000,
    type: 'All',
    subsidized: false,
  });
  const [detailsUnit, setDetailsUnit] = useState<House | null>(null);

  const filteredHousing = HOUSING_DATA.filter(
    (house) =>
      house.rent <= filters.maxRent &&
      (filters.type === 'All' || house.type === filters.type) &&
      (!filters.subsidized || house.subsidized)
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-80 shrink-0">
        <Card className="sticky top-24 p-6">
          <div className="flex items-center gap-2 mb-6 text-primary">
            <Filter className="w-5 h-5" />
            <h2 className="font-semibold text-lg text-[var(--text-primary)]">Filters</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Max Monthly Rent: {formatKESShort(filters.maxRent)}
              </label>
              <input
                type="range"
                min="5000"
                max="100000"
                step="1000"
                value={filters.maxRent}
                onChange={(e) => setFilters({ ...filters, maxRent: parseInt(e.target.value) })}
                className="w-full h-2 rounded-[999px] bg-[var(--border)] appearance-none cursor-pointer accent-accent"
              />
            </div>
            <Select
              label="Housing Type"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="All">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Studio">Studio</option>
              <option value="Single Family">Single Family</option>
            </Select>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="subsidized"
                checked={filters.subsidized}
                onChange={(e) => setFilters({ ...filters, subsidized: e.target.checked })}
                className="w-4 h-4 rounded text-accent focus:ring-accent/40"
              />
              <label htmlFor="subsidized" className="text-sm font-medium text-[var(--text-primary)]">
                Government Subsidized Only
              </label>
            </div>
            <Button className="w-full">Apply Filters</Button>
          </div>
        </Card>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
            Available Housing
          </h1>
          <span className="text-sm text-[var(--text-secondary)]">
            {filteredHousing.length} units found
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {filteredHousing.map((house) => (
            <motion.div
              key={house.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-0 overflow-hidden h-full flex flex-col hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-shadow group">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={house.image}
                    alt={house.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {house.subsidized && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="success">
                        <CheckCircle className="w-3 h-3" /> Subsidized
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-[var(--text-primary)]/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-[var(--radius)] text-sm font-medium">
                    {formatKESShort(house.rent)}/mo
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold text-[var(--text-primary)] line-clamp-1 mb-2">
                    {house.title}
                  </h3>
                  <div className="flex items-center text-[var(--text-secondary)] text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
                    {house.location}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2 bg-[#f8fafc] p-2 rounded-[var(--radius)]">
                      <Users className="w-4 h-4 text-primary" />
                      {house.beds} Beds
                    </div>
                    <div className="flex items-center gap-2 bg-[#f8fafc] p-2 rounded-[var(--radius)]">
                      <Users className="w-4 h-4 text-primary" />
                      {house.baths} Baths
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {house.tags.map((tag) => (
                      <Badge key={tag} variant="neutral">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 flex gap-2">
                    <Link to="/dashboard/citizen" className="flex-1">
                      <Button className="w-full" size="sm">
                        Apply Now
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => setDetailsUnit(house)}>
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal
        open={!!detailsUnit}
        onClose={() => setDetailsUnit(null)}
        title={detailsUnit?.title}
        maxWidth="md"
      >
        {detailsUnit && (
          <div className="space-y-4">
            <div className="rounded-[var(--radius)] overflow-hidden h-48">
              <img src={detailsUnit.image} alt={detailsUnit.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {detailsUnit.location}
            </p>
            <p className="text-lg font-semibold text-[var(--text-primary)]">
              {formatKESShort(detailsUnit.rent)} <span className="text-sm font-normal text-[var(--text-secondary)]">/ month</span>
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              {detailsUnit.type} • {detailsUnit.beds} bed • {detailsUnit.baths} bath
              {detailsUnit.subsidized && ' • Government subsidized'}
            </p>
            <div className="flex flex-wrap gap-2">
              {detailsUnit.tags.map((tag) => (
                <Badge key={tag} variant="neutral">{tag}</Badge>
              ))}
            </div>
            <Link to="/dashboard/citizen" onClick={() => setDetailsUnit(null)}>
              <Button className="w-full">Apply Now</Button>
            </Link>
          </div>
        )}
      </Modal>
    </div>
  );
}
