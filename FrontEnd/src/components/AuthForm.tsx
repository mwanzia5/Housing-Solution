import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { auth } from '@/lib/api';
import { Loader2 } from 'lucide-react';

type Mode = 'login' | 'signup';

interface AuthFormProps {
  mode: Mode;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export function AuthForm({ mode, onSuccess, onError }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error: err } = await auth.signUp(email, password, fullName || 'User', 'citizen');
        if (err) throw err;
        onSuccess?.();
      } else {
        const { error: err } = await auth.signIn(email, password);
        if (err) throw err;
        onSuccess?.();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'signup' && (
        <Input
          label="Full name"
          type="text"
          placeholder="Jane Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
        />
      )}
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
      />
      {error && (
        <p className="text-sm text-[var(--danger)]">{error}</p>
      )}
      <Button type="submit" className="w-full" loading={loading} disabled={loading}>
        {mode === 'login' ? 'Log in' : 'Create account'}
      </Button>
    </form>
  );
}
