'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import LeaguesTab from './LeaguesTab';
import TournamentsTab from './TournamentsTab';
import MatchesTab from './MatchesTab';

type TabType = 'leagues' | 'tournaments' | 'matches';

function DashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabType) || 'leagues';

  // Get the title and subtitle based on active tab
  const getTabHeader = () => {
    switch (activeTab) {
      case 'leagues':
        return {
          title: 'Chess Leagues',
          subtitle: 'Browse and join local leagues'
        };
      case 'tournaments':
        return {
          title: 'Tournaments',
          subtitle: 'Find events to compete in'
        };
      case 'matches':
        return {
          title: 'My Matches',
          subtitle: 'View and manage your games'
        };
      default:
        return {
          title: 'Chess Leagues',
          subtitle: 'Browse and join local leagues'
        };
    }
  };

  const { title, subtitle } = getTabHeader();

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-[#0f1f40]/10 via-[#152B59]/20 to-[#1a3573]/10">
      <div className="mb-4 w-full bg-[#152B59] p-4">
          <h1 className="text-xl font-bold text-[#D6AD60]">{title}</h1>
          <p className="text-xs text-[#D6AD60]/80 mt-0.5">{subtitle}</p>
        </div>
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        

        {/* Tab Content */}
        <div className='pb-4'>
          {activeTab === 'leagues' && <LeaguesTab />}
          {activeTab === 'tournaments' && <TournamentsTab />}
          {activeTab === 'matches' && <MatchesTab />}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-[100vh] bg-gradient-to-br from-[#0f1f40]/10 via-[#152B59]/20 to-[#1a3573]/10">
        <div className="mb-4 w-full bg-[#152B59] p-4">
          <div className="h-7 w-48 bg-[#D6AD60]/20 rounded-md"></div>
          <div className="h-4 w-64 bg-[#D6AD60]/20 rounded-md mt-0.5"></div>
        </div>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="animate-pulse">
            <div className="h-20 bg-white/20 rounded-md mb-4"></div>
            <div className="h-40 bg-white/20 rounded-md mb-4"></div>
            <div className="h-40 bg-white/20 rounded-md"></div>
          </div>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
} 