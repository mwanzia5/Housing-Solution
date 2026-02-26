import React from 'react';
import { Card } from '@/components/ui/Card';
import { AuthForm } from '@/components/AuthForm';
import { useSearchParams } from 'react-router-dom';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get('mode') === 'signup' ? 'signup' : 'login') as 'login' | 'signup';

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <Card className="w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <img src="/habitat.png" alt="HabitatLink" className="h-12 w-auto object-contain" />
        </div>
        <h1 className="text-xl font-semibold text-[var(--text-primary)] text-center mb-2">
          {mode === 'login' ? 'Log in' : 'Create an account'}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] text-center mb-6">
          {mode === 'login'
            ? 'Sign in to manage your housing applications.'
            : 'Join HabitatLink to find affordable housing.'}
        </p>
        <AuthForm mode={mode} />
      </Card>
    </div>
  );
}
