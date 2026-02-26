import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';
import { Plus, Download, Check, X, MoreHorizontal, Building, ImagePlus } from 'lucide-react';
import { useAuth } from '@/context/Authcontext';
import { uploadHousingImage } from '@/lib/upload';

const stats = [
  { label: 'Total Units', value: '124', icon: Building, color: 'text-primary' },
  { label: 'Occupied', value: '118', icon: Building, color: 'text-accent' },
  { label: 'Vacant', value: '6', icon: Building, color: 'text-[var(--warning)]' },
  { label: 'Pending Apps', value: '42', icon: Building, color: 'text-purple-600' },
];

const applications = [
  { name: 'Sarah Jenkins', unit: 'Apt 4B', income: 'Low (Tier 1)', date: 'Oct 24', status: 'Pending' },
  { name: 'Michael Chen', unit: 'Unit 12', income: 'Very Low', date: 'Oct 23', status: 'Reviewing' },
  { name: 'David Miller', unit: 'Apt 4B', income: 'Low (Tier 2)', date: 'Oct 22', status: 'Waitlist' },
  { name: 'Emma Wilson', unit: 'Townhouse 3', income: 'Moderate', date: 'Oct 21', status: 'Approved' },
  { name: 'Robert Fox', unit: 'Unit 8A', income: 'Low (Tier 1)', date: 'Oct 20', status: 'Rejected' },
];

function statusVariant(status: string): 'success' | 'danger' | 'warning' | 'neutral' {
  if (status === 'Approved') return 'success';
  if (status === 'Rejected') return 'danger';
  if (status === 'Waitlist') return 'warning';
  return 'neutral';
}

export default function ProviderDashboard() {
  const [showNewUnitModal, setShowNewUnitModal] = useState(false);
  const [unitImage, setUnitImage] = useState<File | null>(null);
  const [unitImagePreview, setUnitImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const applicationsRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToApplications = () => {
    applicationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);
    if (file) {
      setUnitImage(file);
      setUnitImagePreview(URL.createObjectURL(file));
    } else {
      setUnitImage(null);
      if (unitImagePreview) URL.revokeObjectURL(unitImagePreview);
      setUnitImagePreview(null);
    }
  };

  const handlePostUnitSubmit = async () => {
    setUploadError(null);
    const providerId = user?.id ?? 'provider';
    if (unitImage) {
      try {
        await uploadHousingImage(unitImage, providerId);
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : 'Image upload failed');
        return;
      }
    }
    setShowNewUnitModal(false);
    setUnitImage(null);
    if (unitImagePreview) URL.revokeObjectURL(unitImagePreview);
    setUnitImagePreview(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
            Housing Provider Portal
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Manage properties, listings, and tenant applications.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
          <Button onClick={() => setShowNewUnitModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Post New Unit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)]">{stat.label}</p>
              <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
            </div>
            <div className="w-11 h-11 rounded-[var(--radius)] bg-[#f8fafc] flex items-center justify-center">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2" ref={applicationsRef}>
          <Card className="p-0 overflow-hidden">
            <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="font-semibold text-lg text-[var(--text-primary)]">
                Recent Applications
              </h3>
              <Select wrapperClassName="w-full sm:w-48" defaultValue="">
                <option value="">All Properties</option>
                <option>Greenwood Social</option>
                <option>Sunrise Homes</option>
              </Select>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Unit Applied</TableHead>
                    <TableHead>Income Level</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-[var(--text-primary)]">
                        {app.name}
                      </TableCell>
                      <TableCell className="text-[var(--text-secondary)]">{app.unit}</TableCell>
                      <TableCell className="text-[var(--text-secondary)]">{app.income}</TableCell>
                      <TableCell className="text-[var(--text-secondary)]">{app.date}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(app.status)}>{app.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            className="p-2 rounded-[var(--radius)] hover:bg-[var(--accent-soft)] text-accent transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-2 rounded-[var(--radius)] hover:bg-red-50 text-[var(--danger)] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-2 rounded-[var(--radius)] hover:bg-[#f1f5f9] text-[var(--text-secondary)] transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 text-center">
              <Button variant="ghost" size="sm">
                View All Applications
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-primary text-white">
            <h3 className="font-semibold text-lg mb-2">Priority Alert</h3>
            <p className="text-white/90 text-sm mb-4">
              5 units in &quot;Sunrise Homes&quot; have been vacant for 30+ days. Please review
              waitlist matches.
            </p>
            <Button size="sm" className="bg-white text-primary hover:bg-white/90" onClick={scrollToApplications}>
              Review Vacancies
            </Button>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">Compliance Checklist</h3>
            <div className="space-y-3">
              {[
                { label: 'Safety Inspection', due: 'Due in 5 days', urgent: true },
                { label: 'Tenant Income Verification', due: 'Due in 12 days', urgent: false },
                { label: 'Quarterly Report', due: 'Due in 20 days', urgent: false },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-[var(--radius)] hover:bg-[#f8fafc] transition-colors cursor-pointer"
                >
                  <div
                    className={`w-2 h-2 mt-2 rounded-full shrink-0 ${
                      item.urgent ? 'bg-[var(--danger)]' : 'bg-accent'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{item.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal
        open={showNewUnitModal}
        onClose={() => setShowNewUnitModal(false)}
        title="Post New Unit"
        maxWidth="lg"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 bg-primary rounded-full" />
            <div className="h-2 flex-1 bg-primary rounded-full" />
            <div className="h-2 flex-1 bg-[var(--border)] rounded-full" />
            <span className="text-xs font-medium text-[var(--text-secondary)] ml-2">
              Step 2 of 3
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Unit image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="unit-image"
            />
            <label
              htmlFor="unit-image"
              className="flex flex-col items-center justify-center w-full h-28 rounded-[var(--radius)] bg-[#f8fafc] cursor-pointer hover:bg-[#f1f5f9] transition-colors"
            >
              {unitImagePreview ? (
                <img src={unitImagePreview} alt="Preview" className="h-full w-full object-cover rounded-[var(--radius)]" />
              ) : (
                <>
                  <ImagePlus className="w-8 h-8 text-[var(--text-secondary)] mb-2" />
                  <span className="text-sm text-[var(--text-secondary)]">Click to upload image</span>
                </>
              )}
            </label>
            {uploadError && <p className="mt-2 text-sm text-[var(--danger)]">{uploadError}</p>}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Select label="Property Name">
              <option>Greenwood Social Housing</option>
              <option>Sunrise Community Homes</option>
            </Select>
            <Input label="Unit Number" placeholder="e.g. 4B" />
            <Input label="Monthly Rent (KSh)" type="number" placeholder="0" />
            <Select label="Unit Type">
              <option>1 Bedroom</option>
              <option>2 Bedroom</option>
              <option>3 Bedroom</option>
              <option>Studio</option>
            </Select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowNewUnitModal(false)}>
              Cancel
            </Button>
            <Button onClick={handlePostUnitSubmit}>Next Step</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
