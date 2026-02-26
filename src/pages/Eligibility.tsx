import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { CheckCircle, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Eligibility() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | 'eligible' | 'ineligible'>(null);

  const handleCheck = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setResult('eligible');
      setStep(2);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-3">Eligibility Checker</h1>
          <p className="text-gray-600">
            Find out which government housing programs you qualify for in less than 2 minutes.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <GlassCard className="p-8 md:p-10">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleCheck(); }}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Monthly Household Income ($)</label>
                      <input
                        type="number"
                        placeholder="e.g. 2500"
                        className="w-full p-3 rounded-xl border border-gray-300 bg-white/50 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Household Size</label>
                      <select className="w-full p-3 rounded-xl border border-gray-300 bg-white/50 focus:ring-2 focus:ring-primary/50 outline-none transition-all">
                        <option>1 Person</option>
                        <option>2 People</option>
                        <option>3 People</option>
                        <option>4+ People</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Employment Status</label>
                    <select className="w-full p-3 rounded-xl border border-gray-300 bg-white/50 focus:ring-2 focus:ring-primary/50 outline-none transition-all">
                      <option>Employed Full-Time</option>
                      <option>Employed Part-Time</option>
                      <option>Self-Employed</option>
                      <option>Unemployed</option>
                      <option>Retired / Disability</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Current Housing Situation</label>
                    <select className="w-full p-3 rounded-xl border border-gray-300 bg-white/50 focus:ring-2 focus:ring-primary/50 outline-none transition-all">
                      <option>Renting (Market Rate)</option>
                      <option>Living with Family/Friends</option>
                      <option>Temporary Shelter</option>
                      <option>Homeless</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full py-4 text-lg" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                        </>
                      ) : (
                        'Check Eligibility'
                      )}
                    </Button>
                  </div>
                </form>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <GlassCard className="p-8 md:p-10 border-t-4 border-t-secondary">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">You Are Likely Eligible!</h2>
                    <p className="text-gray-600">Based on your inputs, you qualify for the following programs:</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    { name: 'Section 8 Housing Choice Voucher', match: 'High Match' },
                    { name: 'Low-Income Housing Tax Credit (LIHTC)', match: 'Medium Match' },
                    { name: 'Public Housing Program', match: 'Medium Match' },
                  ].map((prog, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-white/50">
                      <span className="font-semibold text-gray-800">{prog.name}</span>
                      <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-md uppercase tracking-wide">
                        {prog.match}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary/10 p-4 rounded-xl mb-8 flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-secondary-700 shrink-0 mt-0.5" />
                  <div className="text-sm text-secondary-900">
                    <strong>Next Steps:</strong> You will need to provide proof of income (pay stubs or tax returns) and identification for all household members.
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1" onClick={() => window.location.href = '/programs'}>
                    Start Application <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Check Again
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
