'use client';

import { useState } from 'react';
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

// TypeScript interfaces
interface DivisionDetail {
  name: string;
  rating_range: string;
  players: number;
}

interface LeaderboardEntry {
  rank: number;
  player: string;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  rating: number;
}

interface League {
  id: number;
  name: string;
  description: string;
  divisions: number;
  players: number;
  status: string;
  registration_open: boolean;
  start_date: string;
  end_date: string;
  registration_close: string;
  match_schedule: string;
  venue: string;
  format: string;
  entry_fee: number;
  prizes: string;
  division_details: DivisionDetail[];
  leaderboard: LeaderboardEntry[];
}

// Mock league data
const leagues: League[] = [
  {
    id: 1,
    name: "Wanderers Chess Club League",
    description: "Weekly casual matches for club members with automated division assignments.",
    divisions: 4,
    players: 48,
    status: "active",
    registration_open: true,
    start_date: "2023-06-01",
    end_date: "2023-12-15",
    registration_close: "2023-06-15",
    match_schedule: "Wednesdays, 18:00-21:00",
    venue: "Wanderers Club, Illovo",
    format: "Round robin within divisions, promotion/relegation between seasons",
    entry_fee: 250,
    prizes: "Trophies and chess equipment for division winners",
    division_details: [
      { name: "Division 1", rating_range: "1800+", players: 8 },
      { name: "Division 2", rating_range: "1500-1799", players: 12 },
      { name: "Division 3", rating_range: "1200-1499", players: 16 },
      { name: "Division 4", rating_range: "0-1199", players: 12 }
    ],
    leaderboard: [
      { rank: 1, player: "Magnus Johnson", points: 7.5, wins: 7, draws: 1, losses: 0, rating: 2145 },
      { rank: 2, player: "Anna Smithson", points: 6.0, wins: 5, draws: 2, losses: 1, rating: 1985 },
      { rank: 3, player: "David Kasparov", points: 5.5, wins: 5, draws: 1, losses: 2, rating: 1920 },
      { rank: 4, player: "Sarah Knight", points: 4.5, wins: 4, draws: 1, losses: 3, rating: 1876 },
      { rank: 5, player: "James Fischer", points: 4.0, wins: 4, draws: 0, losses: 4, rating: 1850 }
    ]
  },
  {
    id: 2,
    name: "Johannesburg City League",
    description: "Competitive regional league with matches played across the city.",
    divisions: 6,
    players: 72,
    status: "active",
    registration_open: true,
    start_date: "2023-07-15",
    end_date: "2023-11-30",
    registration_close: "2023-07-10",
    match_schedule: "Saturdays, 10:00-14:00",
    venue: "Various venues across Johannesburg",
    format: "Team-based competition with 4 players per team",
    entry_fee: 600,
    prizes: "R10,000 prize fund distributed among top teams",
    division_details: [
      { name: "Premier Division", rating_range: "Team average 1700+", players: 12 },
      { name: "Division 1", rating_range: "Team average 1500-1699", players: 12 },
      { name: "Division 2", rating_range: "Team average 1300-1499", players: 12 },
      { name: "Division 3", rating_range: "Team average 1100-1299", players: 12 },
      { name: "Division 4", rating_range: "Team average 900-1099", players: 12 },
      { name: "Division 5", rating_range: "Team average 0-899", players: 12 }
    ],
    leaderboard: [
      { rank: 1, player: "Polokwane Chess Club", points: 15.0, wins: 5, draws: 0, losses: 0, rating: 1850 },
      { rank: 2, player: "Sandton Masters", points: 12.0, wins: 4, draws: 0, losses: 1, rating: 1790 },
      { rank: 3, player: "Soweto Knights", points: 9.0, wins: 3, draws: 0, losses: 2, rating: 1740 },
      { rank: 4, player: "Pretoria Rooks", points: 6.0, wins: 2, draws: 0, losses: 3, rating: 1710 },
      { rank: 5, player: "Johannesburg Central", points: 3.0, wins: 1, draws: 0, losses: 4, rating: 1680 }
    ]
  },
  {
    id: 3,
    name: "Beginners Friendly League",
    description: "Perfect for new players looking to gain experience in a supportive environment.",
    divisions: 2,
    players: 24,
    status: "active",
    registration_open: true,
    start_date: "2023-08-05",
    end_date: "2023-10-28",
    registration_close: "2023-08-01",
    match_schedule: "Sundays, 14:00-17:00",
    venue: "Sandton Chess Club",
    format: "Swiss system with coaching after games",
    entry_fee: 150,
    prizes: "Certificates and chess books for all participants",
    division_details: [
      { name: "Newcomers", rating_range: "Unrated or <900", players: 12 },
      { name: "Improvers", rating_range: "900-1200", players: 12 }
    ],
    leaderboard: [
      { rank: 1, player: "Emma Williams", points: 5.5, wins: 5, draws: 1, losses: 0, rating: 950 },
      { rank: 2, player: "Thabo Ndlovu", points: 5.0, wins: 5, draws: 0, losses: 1, rating: 920 },
      { rank: 3, player: "Jack Taylor", points: 4.0, wins: 4, draws: 0, losses: 2, rating: 880 },
      { rank: 4, player: "Lucy Chen", points: 3.5, wins: 3, draws: 1, losses: 2, rating: 910 },
      { rank: 5, player: "Oscar Pretorius", points: 3.0, wins: 3, draws: 0, losses: 3, rating: 875 }
    ]
  },
  {
    id: 4,
    name: "Masters Challenge",
    description: "High-level competition for experienced players rated 1800+.",
    divisions: 1,
    players: 16,
    status: "active",
    registration_open: false,
    start_date: "2023-05-20",
    end_date: "2023-12-10",
    registration_close: "2023-05-15",
    match_schedule: "Monthly weekend events",
    venue: "Pretoria Chess Centre",
    format: "Double round robin with classical time controls",
    entry_fee: 400,
    prizes: "R15,000 prize fund plus qualification spots for national championship",
    division_details: [
      { name: "Masters", rating_range: "1800+", players: 16 }
    ],
    leaderboard: [
      { rank: 1, player: "Sipho Nkosi", points: 9.0, wins: 9, draws: 0, losses: 0, rating: 2310 },
      { rank: 2, player: "Elizabeth van der Merwe", points: 7.5, wins: 7, draws: 1, losses: 1, rating: 2250 },
      { rank: 3, player: "Robert Clark", points: 6.0, wins: 6, draws: 0, losses: 3, rating: 2180 },
      { rank: 4, player: "Nadia Patel", points: 5.5, wins: 5, draws: 1, losses: 3, rating: 2150 },
      { rank: 5, player: "Trevor Mbeki", points: 5.0, wins: 5, draws: 0, losses: 4, rating: 2100 }
    ]
  },
  {
    id: 5,
    name: "University Chess Championship",
    description: "Inter-university competition across multiple campuses.",
    divisions: 3,
    players: 36,
    status: "upcoming",
    registration_open: true,
    start_date: "2023-09-15",
    end_date: "2023-11-15",
    registration_close: "2023-09-10",
    match_schedule: "Bi-weekly matches, arranged between teams",
    venue: "Rotating between university campuses",
    format: "Team-based competition with 3 players per team",
    entry_fee: 300,
    prizes: "Trophy and chess equipment for winning university",
    division_details: [
      { name: "Premier Division", rating_range: "Open", players: 12 },
      { name: "First Division", rating_range: "Open", players: 12 },
      { name: "Women's Division", rating_range: "Open (women only)", players: 12 }
    ],
    leaderboard: []
  }
];

// Helper to format dates in a more readable way
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Calculate if registration is still open
function isRegistrationOpen(closeDate: string) {
  const today = new Date();
  const close = new Date(closeDate);
  return today <= close;
}

export default function LeaguesTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openLeagueId, setOpenLeagueId] = useState<number | null>(null);
  
  // Filter functions
  const activeLeagues = leagues.filter(league => league.status === "active");
  const upcomingLeagues = leagues.filter(league => league.status === "upcoming");
  const completedLeagues = leagues.filter(league => league.status === "completed" || league.status === "archived");
  
  // Filter by search query within the filtered by status leagues
  const filterBySearch = (leaguesList: League[]) => {
    if (!searchQuery) return leaguesList;
    
    return leaguesList.filter(league => 
      league.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      league.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Handle joining a league
  const handleJoinLeague = (league: League) => {
    // Close the modal
    setOpenLeagueId(null);
    
    // Show success toast
    toast.success(`Joined ${league.name}`, {
      description: `You've successfully joined the league. Your division will be assigned based on your rating.`
    });
  };
  
  // League details modal
  const LeagueDetailsModal = ({ league }: { league: League }) => {
    return (
      <Dialog open={openLeagueId === league.id} onOpenChange={(open) => {
        if (!open) setOpenLeagueId(null);
        else setOpenLeagueId(league.id);
      }}>
        <DialogTrigger asChild>
          <Button variant="gold" size="sm">
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto p-2 sm:p-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">{league.name}</DialogTitle>
            <DialogDescription className="text-muted-foreground">{league.description}</DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="info" className="mt-4">
            <TabsList className="w-full border border-secondary bg-card rounded-md">
              <TabsTrigger
                value="info"
                className=" sm:text-[10px] xs:text-[8px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                Information
              </TabsTrigger>
              <TabsTrigger 
                value="divisions" 
                className=" sm:text-[10px] xs:text-[8px]  data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                Divisions
              </TabsTrigger>
              <TabsTrigger 
                value="schedule" 
                className=" sm:text-[10px] xs:text-[8px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                Schedule
              </TabsTrigger>
              <TabsTrigger 
                value="leaderboard" 
                className="sm:text-[10px] xs:text-[8px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                Leaderboard
              </TabsTrigger>
            </TabsList>
            
            {/* Information Tab */}
            <TabsContent value="info" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-primary">Venue</h3>
                  <p className="text-sm">{league.venue}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-primary">Dates</h3>
                  <p className="text-sm">{formatDate(league.start_date)} - {formatDate(league.end_date)}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-primary">Registration Closes</h3>
                  <p className={`text-sm ${isRegistrationOpen(league.registration_close) ? '' : 'text-[#E53935]'}`}>
                    {formatDate(league.registration_close)}
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-primary">Status</h3>
                  <p className={`text-sm ${
                    league.status === 'active' ? 'text-[#4CAF50]' : 
                    league.status === 'upcoming' ? 'text-[#FFC107]' : 
                    'text-[#E53935]'
                  }`}>
                    {league.status.charAt(0).toUpperCase() + league.status.slice(1)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-primary">Format</h3>
                <p className="text-sm">{league.format}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-primary">Match Schedule</h3>
                <p className="text-sm">{league.match_schedule}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-primary">Entry Fee</h3>
                <p className="text-sm">R{league.entry_fee}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-primary">Prizes</h3>
                <p className="text-sm">{league.prizes}</p>
              </div>
            </TabsContent>
            
            {/* Divisions Tab */}
            <TabsContent value="divisions" className="mt-4">
              <div className="space-y-3">
                {league.division_details.map((division, index) => (
                  <div key={index} className="p-3 border border-secondary rounded-md">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-primary">{division.name}</h3>
                      <span className="text-sm font-medium">{division.players} players</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Rating range: {division.rating_range}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Schedule Tab */}
            <TabsContent value="schedule" className="mt-4">
              <div className="space-y-3">
                <div className="p-3 border border-secondary rounded-md">
                  <h3 className="font-medium text-primary">League Period</h3>
                  <p className="text-sm mt-1">{formatDate(league.start_date)} - {formatDate(league.end_date)}</p>
                </div>
                
                <div className="p-3 border border-secondary rounded-md">
                  <h3 className="font-medium text-primary">Registration</h3>
                  <p className="text-sm mt-1">
                    Closes on {formatDate(league.registration_close)}
                    {isRegistrationOpen(league.registration_close) 
                      ? " (Open)" 
                      : " (Closed)"}
                  </p>
                </div>
                
                <div className="p-3 border border-secondary rounded-md">
                  <h3 className="font-medium text-primary">Match Days</h3>
                  <p className="text-sm mt-1">{league.match_schedule}</p>
                </div>
                
                <div className="p-3 border border-secondary rounded-md">
                  <h3 className="font-medium text-primary">Additional Information</h3>
                  <p className="text-sm mt-1">Players are responsible for arranging their matches within the scheduled timeframes. All results must be submitted via the app or to the league coordinator.</p>
                </div>
              </div>
            </TabsContent>
            
            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="mt-4">
              {league.leaderboard ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-secondary">
                        <th className="py-2 px-2 text-left text-xs font-medium text-primary">Rank</th>
                        <th className="py-2 px-2 text-left text-xs font-medium text-primary">Player</th>
                        <th className="py-2 px-2 text-right text-xs font-medium text-primary">Points</th>
                        <th className="py-2 px-2 text-right text-xs font-medium text-primary hidden sm:table-cell">W</th>
                        <th className="py-2 px-2 text-right text-xs font-medium text-primary hidden sm:table-cell">D</th>
                        <th className="py-2 px-2 text-right text-xs font-medium text-primary hidden sm:table-cell">L</th>
                        <th className="py-2 px-2 text-right text-xs font-medium text-primary">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {league.leaderboard.map((player) => (
                        <tr key={player.rank} className="border-b border-secondary/50 hover:bg-secondary/20">
                          <td className="py-2 px-2 text-left text-sm font-medium">{player.rank}</td>
                          <td className="py-2 px-2 text-left text-sm">{player.player}</td>
                          <td className="py-2 px-2 text-right text-sm font-medium">{player.points}</td>
                          <td className="py-2 px-2 text-right text-sm hidden sm:table-cell">{player.wins}</td>
                          <td className="py-2 px-2 text-right text-sm hidden sm:table-cell">{player.draws}</td>
                          <td className="py-2 px-2 text-right text-sm hidden sm:table-cell">{player.losses}</td>
                          <td className="py-2 px-2 text-right text-sm">{player.rating}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center py-4 text-sm text-muted-foreground">No leaderboard data available yet.</p>
              )}
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            {league.registration_open ? (
              <Button 
                variant="gold" 
                onClick={() => handleJoinLeague(league)}
              >
                Join League
              </Button>
            ) : (
              <Button variant="outline" disabled>
                Registration Closed
              </Button>
            )}
            <Button variant="gold" size="sm" asChild>
              <Link href={`/leagues/${league.id}`}>
                Full Details
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  // League card component - to avoid duplication
  const LeagueCard = ({ league }: { league: League }) =>
    <Card key={league.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-white font-semibold">{league.name}</CardTitle>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            league.status === 'active' ? 'bg-[#4CAF50]/20 text-[#4CAF50]' : 
            league.status === 'upcoming' ? 'bg-[#FFC107]/20 text-[#FFC107]' : 
            'bg-[#E53935]/20 text-[#E53935]'
          }`}>
            {league.status.charAt(0).toUpperCase() + league.status.slice(1)}
          </span>
        </div>
        <CardDescription className="text-sm text-white">{league.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-3 text-xs">
          <div>
            <span className="text-muted-foreground">Divisions:</span> 
            <span className="font-medium ml-1">{league.divisions}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Players:</span> 
            <span className="font-medium ml-1">{league.players}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Period:</span> 
            <span className="font-medium ml-1">{formatDate(league.start_date)} - {formatDate(league.end_date)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <div className="flex gap-2">
          <LeagueDetailsModal league={league} />
        </div>
      </CardFooter>
    </Card>

  return (
    <div>
      <Toaster />
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search leagues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-secondary bg-card rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <div className="absolute right-3 top-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <Tabs defaultValue="active" className="mb-6">
        <TabsList className="w-full border border-secondary bg-card rounded-md">
          <TabsTrigger 
            value="active"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Active ({activeLeagues.length})
          </TabsTrigger>
          <TabsTrigger 
            value="upcoming" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Upcoming ({upcomingLeagues.length})
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Completed ({completedLeagues.length})
          </TabsTrigger>
        </TabsList>
        
        {/* Active Leagues */}
        <TabsContent value="active" className="mt-4">
          <div className="space-y-4">
            {filterBySearch(activeLeagues).length > 0 ? (
              filterBySearch(activeLeagues).map(league => (
                <LeagueCard key={league.id} league={league} />
              ))
            ) : (
              <p className="text-center py-4 text-sm text-muted-foreground">No active leagues found.</p>
            )}
          </div>
        </TabsContent>
        
        {/* Upcoming Leagues */}
        <TabsContent value="upcoming" className="mt-4">
          <div className="space-y-4">
            {filterBySearch(upcomingLeagues).length > 0 ? (
              filterBySearch(upcomingLeagues).map(league => (
                <LeagueCard key={league.id} league={league} />
              ))
            ) : (
              <p className="text-center py-4 text-sm text-muted-foreground">No upcoming leagues found.</p>
            )}
          </div>
        </TabsContent>
        
        {/* Completed Leagues */}
        <TabsContent value="completed" className="mt-4">
          <div className="space-y-4">
            {filterBySearch(completedLeagues).length > 0 ? (
              filterBySearch(completedLeagues).map(league => (
                <LeagueCard key={league.id} league={league} />
              ))
            ) : (
              <p className="text-center py-4 text-sm text-muted-foreground">No completed leagues found.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 