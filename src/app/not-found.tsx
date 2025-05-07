'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

function NotFoundContent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f1f40]/10 via-[#152B59]/20 to-[#1a3573]/10">
      <div className="text-center p-8 max-w-md">
        <div className="mb-6">
          <div className="text-9xl font-bold text-[#152B59]">404</div>
          <h1 className="text-2xl font-bold text-[#152B59] mt-2">Page Not Found</h1>
          <p className="mt-4 text-[#333333]/80">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <Button asChild variant="navy">
            <Link href="/">
              Return to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link href="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0f1f40]/10 via-[#152B59]/20 to-[#1a3573]/10 flex justify-center items-center">
        <div className="text-[#152B59] text-lg font-medium">Loading...</div>
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  );
} 