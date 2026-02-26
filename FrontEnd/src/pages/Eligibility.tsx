import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Eligibility() {
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

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-[var(--text-primary)] tracking-tight mb-2">
            Eligibility Checker
          </h1>
          <p className="text-[var(--text-secondary)]">
            Find out which government housing programs you qualify for in less than 2 minutes.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-8">
                    <form
                      className="space-y-6"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleCheck();
                      }}
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="Monthly Household Income (KSh)"
                          type="number"
                          placeholder="e.g. 25000"
                          required
                        />
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
                      <div className="pt-2">
                        <Button type="submit" className="w-full py-3" loading={loading} disabled={loading}>
                          Check Eligibility
                        </Button>
                      </div>
                    </form>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-8 border-l-4 border-l-accent">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
                        <CheckCircle className="w-7 h-7 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                          You Are Likely Eligible!
                        </h2>
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
                          className="flex items-center justify-between p-4 rounded-[12px] border border-[var(--border)] bg-[#f8fafc]"
                        >
                          <span className="font-medium text-[var(--text-primary)] text-sm">
                            {prog.name}
                          </span>
                          <Badge variant="accent">{prog.match}</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 p-4 rounded-[12px] bg-amber-50 border border-amber-200 mb-6">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-900">
                        <strong>Next Steps:</strong> You will need to provide proof of income (pay
                        stubs or tax returns) and identification for all household members.
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link to="/programs">
                        <Button className="flex-1">
                          Start Application <ArrowRight className="ml-2 w-4 h-4 inline" />
                        </Button>
                      </Link>
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Check Again
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">How it works</h3>
              <ol className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li className="flex gap-2">
                  <span className="font-medium text-primary">1.</span> Enter your household and income
                  details.
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-primary">2.</span> We check against program
                  criteria in real time.
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-primary">3.</span> View eligible programs and
                  start your application.
                </li>
              </ol>
            </Card>
            {step === 2 && result === 'eligible' && (
              <Card className="p-6 bg-[var(--accent-soft)] border-accent/20">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">Eligible units</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Browse housing listings filtered by your eligibility on the Housing page.
                </p>
                <Link to="/housing" className="mt-3 inline-block">
                  <Button variant="outline" size="sm">
                    View Listings
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
