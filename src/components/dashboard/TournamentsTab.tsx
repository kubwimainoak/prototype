'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

// Mock tournament data
const tournaments = [
  {
    id: 1,
    name: "Johannesburg Open Championship",
    description: "Official CHESSA rated tournament with multiple sections based on rating.",
    venue: "Sandton Convention Centre",
    start_date: "2023-10-15",
    end_date: "2023-10-17",
    registration_close: "2023-10-10",
    sections: [
      { name: "Open Section", rating_min: 1800, rating_max: null, entry_fee: 350 },
      { name: "A Section", rating_min: 1500, rating_max: 1799, entry_fee: 300 },
      { name: "B Section", rating_min: 1200, rating_max: 1499, entry_fee: 250 },
      { name: "C Section", rating_min: 0, rating_max: 1199, entry_fee: 200 },
    ],
    status: "upcoming"
  },
  {
    id: 2,
    name: "Junior Chess Championship",
    description: "Tournament for players under 18 with age categories and rating sections.",
    venue: "Pretoria High School",
    start_date: "2023-09-23",
    end_date: "2023-09-24",
    registration_close: "2023-09-18",
    sections: [
      { name: "Under 18", rating_min: null, rating_max: null, entry_fee: 150 },
      { name: "Under 14", rating_min: null, rating_max: null, entry_fee: 120 },
      { name: "Under 10", rating_min: null, rating_max: null, entry_fee: 100 },
    ],
    status: "upcoming"
  },
  {
    id: 3,
    name: "Wanderers Rapid Tournament",
    description: "One-day rapid tournament with 15-minute games plus 10-second increment.",
    venue: "Wanderers Club",
    start_date: "2023-08-12",
    end_date: "2023-08-12",
    registration_close: "2023-08-10",
    sections: [
      { name: "Open Section", rating_min: null, rating_max: null, entry_fee: 180 },
    ],
    status: "active"
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

export default function TournamentsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter functions
  const upcomingTournaments = tournaments.filter(tournament => tournament.status === "upcoming");
  const activeTournaments = tournaments.filter(tournament => tournament.status === "active");
  const completedTournaments = tournaments.filter(tournament => tournament.status === "completed" || tournament.status === "archived");
  
  // Filter by search query within the filtered by status tournaments
  const filterBySearch = (tournamentsList: typeof tournaments) => {
    if (!searchQuery) return tournamentsList;
    
    return tournamentsList.filter(tournament => 
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.venue.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Tournament details modal
  const TournamentDetailsModal = ({ tournament }: { tournament: typeof tournaments[0] }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="gold" size="sm">
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">{tournament.name}</DialogTitle>
            <DialogDescription className="text-muted-foreground">{tournament.description}</DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="info" className="mt-4">
            <TabsList className="w-full border border-secondary bg-card rounded-md">
              <TabsTrigger 
                value="info"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                Information
              </TabsTrigger>
              <TabsTrigger 
                value="sections" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                Sections
              </TabsTrigger>
              <TabsTrigger 
                value="schedule" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                Schedule
              </TabsTrigger>
            </TabsList>
            
            {/* Information Tab */}
            <TabsContent value="info" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-primary">Venue</h3>
                  <p className="text-sm">{tournament.venue}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-primary">Dates</h3>
                  <p className="text-sm">{formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-primary">Registration Closes</h3>
                  <p className={`text-sm ${isRegistrationOpen(tournament.registration_close) ? '' : 'text-[#E53935]'}`}>
                    {formatDate(tournament.registration_close)}
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-primary">Status</h3>
                  <p className={`text-sm ${
                    tournament.status === 'active' ? 'text-[#4CAF50]' : 
                    tournament.status === 'upcoming' ? 'text-[#FFC107]' : 
                    'text-[#E53935]'
                  }`}>
                    {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-primary">Additional Information</h3>
                <p className="text-sm">Please bring your own chess equipment and clock if possible. Refreshments will be available at the venue.</p>
                <p className="text-sm mt-2">Tournament Director: John Williams (Contact: +27 12 345 6789)</p>
              </div>
            </TabsContent>
            
            {/* Sections Tab */}
            <TabsContent value="sections" className="mt-4">
              <div className="space-y-3">
                {tournament.sections.map((section, index) => (
                  <div key={index} className="p-3 border border-secondary rounded-md">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-primary">{section.name}</h3>
                      <span className="text-sm font-medium">R{section.entry_fee}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {section.rating_min && `Rating ${section.rating_min}${section.rating_max ? '-' + section.rating_max : '+'}`}
                      {!section.rating_min && 'No rating restriction'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">6 rounds, Swiss system</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Schedule Tab */}
            <TabsContent value="schedule" className="mt-4">
              <div className="space-y-2">
                {/* Create a mock schedule based on start and end dates */}
                <div className="p-2 border-b border-secondary">
                  <p className="font-medium text-primary">{formatDate(tournament.start_date)}</p>
                  <div className="ml-4 mt-1 space-y-1">
                    <p className="text-sm text-muted-foreground">08:30 - Registration</p>
                    <p className="text-sm text-muted-foreground">09:00 - Round 1</p>
                    <p className="text-sm text-muted-foreground">14:00 - Round 2</p>
                  </div>
                </div>
                
                {tournament.start_date !== tournament.end_date && (
                  <>
                    <div className="p-2 border-b border-secondary">
                      {/* If multi-day event, show middle day */}
                      <p className="font-medium text-primary">{formatDate(new Date(tournament.start_date).toISOString().split('T')[0])}</p>
                      <div className="ml-4 mt-1 space-y-1">
                        <p className="text-sm text-muted-foreground">09:00 - Round 3</p>
                        <p className="text-sm text-muted-foreground">14:00 - Round 4</p>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <p className="font-medium text-primary">{formatDate(tournament.end_date)}</p>
                      <div className="ml-4 mt-1 space-y-1">
                        <p className="text-sm text-muted-foreground">09:00 - Round 5</p>
                        <p className="text-sm text-muted-foreground">14:00 - Round 6</p>
                        <p className="text-sm text-muted-foreground">18:00 - Prize Giving</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            {isRegistrationOpen(tournament.registration_close) && (
              <Button variant="gold" size="sm" asChild>
                <Link href={`/tournaments/${tournament.id}/register`}>
                  Register Now
                </Link>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tournaments..."
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
      <Tabs defaultValue="upcoming" className="mb-6">
        <TabsList className="w-full border border-secondary bg-card rounded-md">
          <TabsTrigger 
            value="upcoming"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Upcoming ({upcomingTournaments.length})
          </TabsTrigger>
          <TabsTrigger 
            value="active" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Active ({activeTournaments.length})
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Completed ({completedTournaments.length})
          </TabsTrigger>
        </TabsList>
        
        {/* Upcoming Tournaments */}
        <TabsContent value="upcoming" className="mt-4">
          <div className="space-y-4">
            {filterBySearch(upcomingTournaments).length > 0 ? (
              filterBySearch(upcomingTournaments).map(tournament => (
                <Card key={tournament.id} className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-whitefont-bold">{tournament.name}</CardTitle>
                    <CardDescription className="text-sm text-white">{tournament.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-primary">Venue:</span> {tournament.venue}
                      </div>
                      <div>
                        <span className="font-medium text-primary">Dates:</span> {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
                      </div>
                      <div>
                        <span className="font-medium text-primary">Registration:</span> {isRegistrationOpen(tournament.registration_close) ? 'Open' : 'Closed'}
                      </div>
                      <div>
                        <span className="font-medium text-primary">Sections:</span> {tournament.sections.length}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-end">
                    <TournamentDetailsModal tournament={tournament} />
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="text-center py-4 text-sm text-muted-foreground">No upcoming tournaments found.</p>
            )}
          </div>
        </TabsContent>
        
        {/* Active Tournaments */}
        <TabsContent value="active" className="mt-4">
          <div className="space-y-4">
            {filterBySearch(activeTournaments).length > 0 ? (
              filterBySearch(activeTournaments).map(tournament => (
                <Card key={tournament.id} className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">{tournament.name}</CardTitle>
                    <CardDescription className="text-sm">{tournament.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-primary">Venue:</span> {tournament.venue}
                      </div>
                      <div>
                        <span className="font-medium text-primary">Dates:</span> {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
                      </div>
                      <div>
                        <span className="font-medium text-primary">Registration:</span> {isRegistrationOpen(tournament.registration_close) ? 'Open' : 'Closed'}
                      </div>
                      <div>
                        <span className="font-medium text-primary">Sections:</span> {tournament.sections.length}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-end">
                    <TournamentDetailsModal tournament={tournament} />
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="text-center py-4 text-sm text-muted-foreground">No active tournaments found.</p>
            )}
          </div>
        </TabsContent>
        
        {/* Completed Tournaments */}
        <TabsContent value="completed" className="mt-4">
          <div className="space-y-4">
            {filterBySearch(completedTournaments).length > 0 ? (
              filterBySearch(completedTournaments).map(tournament => (
                <Card key={tournament.id} className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">{tournament.name}</CardTitle>
                    <CardDescription className="text-sm">{tournament.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-primary">Venue:</span> {tournament.venue}
                      </div>
                      <div>
                        <span className="font-medium text-primary">Dates:</span> {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
                      </div>
                      <div>
                        <span className="font-medium text-primary">Registration:</span> {isRegistrationOpen(tournament.registration_close) ? 'Open' : 'Closed'}
                      </div>
                      <div>
                        <span className="font-medium text-primary">Sections:</span> {tournament.sections.length}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-end">
                    <TournamentDetailsModal tournament={tournament} />
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="text-center py-4 text-sm text-muted-foreground">No completed tournaments found.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}