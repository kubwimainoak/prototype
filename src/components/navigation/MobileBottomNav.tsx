'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { HomeIcon, Trophy, CalendarDays, User, LayoutGrid } from 'lucide-react';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
}

function MobileBottomNavContent() {
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
      label: 'Home',
      icon: <HomeIcon className="h-6 w-6" />,
      path: '/home',
    },
    {
      label: 'Leagues',
      icon: <LayoutGrid className="h-6 w-6" />,
      path: '/dashboard?tab=leagues',
    },
    {
      label: 'Tournaments',
      icon: <Trophy className="h-6 w-6" />,
      path: '/dashboard?tab=tournaments',
    },
    {
      label: 'Matches',
      icon: <CalendarDays className="h-6 w-6" />,
      path: '/dashboard?tab=matches',
    },
    {
      label: 'Profile',
      icon: <User className="h-6 w-6" />,
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
    <div className="fixed bg-card bottom-0 left-0 right-0 border-t border-secondary shadow-lg z-50">
      <nav className="flex justify-around">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center py-3 px-4 ${
              isActive(item.path) 
                ? 'text-primary' 
                : 'text-foreground'
            }`}
          >
            <div className={isActive(item.path) ? 'text-primary' : 'text-foreground'}>
              {item.icon}
            </div>
            <span className="mt-1 text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function MobileBottomNav() {
  return (
    <Suspense fallback={
      <div className="fixed bg-card bottom-0 left-0 right-0 border-t border-secondary shadow-lg z-50">
        <nav className="flex justify-around">
          {/* Loading placeholders */}
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex flex-col items-center py-3 px-4">
              <div className="w-6 h-6 bg-secondary rounded-md"></div>
              <div className="mt-1 w-12 h-3 bg-secondary rounded-md"></div>
            </div>
          ))}
        </nav>
      </div>
    }>
      <MobileBottomNavContent />
    </Suspense>
  );
} 