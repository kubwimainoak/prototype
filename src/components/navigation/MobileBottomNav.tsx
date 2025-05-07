'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export default function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState('leagues');
  
  useEffect(() => {
    // Update the current tab whenever the URL parameters change
    if (pathname === '/dashboard') {
      const tab = searchParams.get('tab') || 'leagues';
      setCurrentTab(tab);
    }
  }, [pathname, searchParams]);
  
  const navItems: NavItem[] = [
    {
      label: 'Leagues',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      path: '/dashboard?tab=leagues',
    },
    {
      label: 'Tournaments',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      path: '/dashboard?tab=tournaments',
    },
    {
      label: 'Matches',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      path: '/dashboard?tab=matches',
    },
    {
      label: 'Profile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      path: '/profile',
    }
  ];

  const getActiveTab = (path: string): string => {
    if (path.includes('?tab=')) {
      return path.split('?tab=')[1];
    }
    return '';
  };
  
  const isActive = (itemPath: string): boolean => {
    if (pathname === '/dashboard') {
      const activeTab = getActiveTab(itemPath);
      return activeTab === currentTab;
    }
    return pathname === itemPath.split('?')[0];
  };

  return (
    <div className="fixed bg-[#152B59] bg-opacity-10 bottom-0 left-0 right-0 border-t border-[#152B59]/20 shadow-lg z-50">
      <nav className="flex justify-around">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center py-3 px-4 ${
              isActive(item.path) 
                ? 'text-[#D6AD60]' 
                : 'text-white'
            }`}
          >
            <div className={isActive(item.path) ? 'text-[#D6AD60]' : 'text-white'}>
              {item.icon}
            </div>
            <span className="mt-1 text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
} 