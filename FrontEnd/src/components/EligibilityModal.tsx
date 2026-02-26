import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useUI } from '@/context/UIContext';
import { Link } from 'react-router-dom';

export function EligibilityModal() {
  const { eligibilityModalOpen, closeEligibilityModal } = useUI();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | 'eligible' | 'ineligible'>(null);

  const handleCheck = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult('eligible');
      setStep(2);
    }, 1500);
  };

  const handleClose = () => {
    closeEligibilityModal();
    setStep(1);
    setResult(null);
  };

  return (
    <Modal
      open={eligibilityModalOpen}
      onClose={handleClose}
      title="Check eligibility"
      maxWidth="lg"
    >
      <div className="flex justify-center mb-4">
        <img src="/habitat.png" alt="HabitatLink" className="h-10 w-auto object-contain" />
      </div>
      <p className="text-sm text-[var(--text-secondary)] text-center mb-6">
        Find out which government housing programs you qualify for in less than 2 minutes.
      </p>
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.2 }}
          >
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleCheck(); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Monthly Household Income (KSh)" type="number" placeholder="e.g. 25000" required />
                <Select label="Household Size">
                  <option>1 Person</option>
                  <option>2 People</option>
                  <option>3 People</option>
                  <option>4+ People</option>
                </Select>
              </div>
              <Select label="Employment Status">
                <option>Employed Full-Time</option>
                <option>Employed Part-Time</option>
                <option>Self-Employed</option>
                <option>Unemployed</option>
                <option>Retired / Disability</option>
              </Select>
              <Select label="Current Housing Situation">
                <option>Renting (Market Rate)</option>
                <option>Living with Family/Friends</option>
                <option>Temporary Shelter</option>
                <option>Homeless</option>
              </Select>
              <Button type="submit" className="w-full py-3" loading={loading} disabled={loading}>
                Check Eligibility
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
                <CheckCircle className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">You Are Likely Eligible!</h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  Based on your inputs, you qualify for the following programs:
                </p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              {[
                { name: 'Section 8 Housing Choice Voucher', match: 'High Match' },
                { name: 'Low-Income Housing Tax Credit (LIHTC)', match: 'Medium Match' },
                { name: 'Public Housing Program', match: 'Medium Match' },
              ].map((prog, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-[var(--radius)] bg-[#f8fafc]"
                >
                  <span className="font-medium text-[var(--text-primary)] text-sm">{prog.name}</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-[999px] bg-[var(--accent-soft)] text-accent">
                    {prog.match}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 p-4 rounded-[var(--radius)] bg-amber-50 mb-6">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900">
                <strong>Next Steps:</strong> You will need to provide proof of income and identification for all household members.
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/programs" onClick={handleClose}>
                <Button className="flex-1">Start Application <ArrowRight className="ml-2 w-4 h-4 inline" /></Button>
              </Link>
              <Button variant="outline" onClick={() => { setStep(1); setResult(null); }}>
                Check Again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
