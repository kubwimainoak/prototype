'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    chessaId: '',
    fideId: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful registration
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            <div className="relative w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-[#171e2e] font-bold text-3xl">♞</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="mt-1 text-xs text-muted-foreground">Join Chess League to start playing and competing</p>
        </div>

        <div className="bg-card py-4 px-3 shadow-md rounded-lg border border-secondary max-h-[80vh] overflow-y-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded-md text-xs">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-white bg-secondary/30 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-white bg-secondary/30 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="chessaId" className="block text-sm font-medium text-white">
                CHESSA ID <span className="text-xs text-muted-foreground">(optional)</span>
              </label>
              <div className="mt-1">
                <input
                  id="chessaId"
                  name="chessaId"
                  type="text"
                  value={formData.chessaId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-white bg-secondary/30 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. 123456"
                />
              </div>
            </div>

            <div>
              <label htmlFor="fideId" className="block text-sm font-medium text-white">
                FIDE ID <span className="text-xs text-muted-foreground">(optional)</span>
              </label>
              <div className="mt-1">
                <input
                  id="fideId"
                  name="fideId"
                  type="text"
                  value={formData.fideId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-white bg-secondary/30 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. 8700000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-white bg-secondary/30 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-white bg-secondary/30 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-primary border-secondary rounded bg-secondary/30"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-muted-foreground">
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-primary/80">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-secondary rounded-md shadow-sm bg-secondary/30 text-sm font-medium text-white hover:bg-secondary/50"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-secondary rounded-md shadow-sm bg-secondary/30 text-sm font-medium text-white hover:bg-secondary/50"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account? <Link href="/" className="text-primary hover:text-primary/80">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 