'use client';

import { usePathname } from 'next/navigation';
import MobileBottomNav from './MobileBottomNav';

export default function NavbarFooterWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/' || pathname === '/register';

  return (
    <>
      <main className="flex-1 pb-20">{children}</main>
      {!isLoginPage && <MobileBottomNav />}
    </>
  );
} 