'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";

// Mock match data
const matches = [
  {
    id: 1,
    opponent: "Daniel Smith",
    opponent_rating: 1856,
    league: "Wanderers Chess Club League",
    division: "Division 1",
    status: "scheduled",
    date: "2023-08-15T18:00:00",
    venue: "Wanderers Club",
    result: null,
    confirmed: false
  },
  {
    id: 2,
    opponent: "Sarah Johnson",
    opponent_rating: 1723,
    league: "Johannesburg City League",
    division: "Division 2",
    status: "pending",
    date: null,
    venue: null,
    result: null,
    confirmed: false
  },
  {
    id: 3,
    opponent: "Michael Brown",
    opponent_rating: 1645,
    league: "Wanderers Chess Club League",
    division: "Division 1",
    status: "pending_confirmation",
    date: "2023-08-18T19:30:00",
    venue: "Sandton Library",
    result: null,
    confirmed: false
  },
  {
    id: 4,
    opponent: "Emma Wilson",
    opponent_rating: 1932,
    league: "Johannesburg City League",
    division: "Division 2",
    status: "completed",
    date: "2023-08-02T17:00:00",
    venue: "City Chess Club",
    result: "0-1",
    confirmed: true
  },
  {
    id: 5,
    opponent: "James Anderson",
    opponent_rating: 1790,
    league: "Wanderers Chess Club League",
    division: "Division 1",
    status: "completed",
    date: "2023-07-28T18:30:00",
    venue: "Wanderers Club",
    result: "1-0",
    confirmed: true
  },
  {
    id: 6,
    opponent: "Olivia Parker",
    opponent_rating: 1677,
    league: "Johannesburg City League",
    division: "Division 2",
    status: "pending_result",
    date: "2023-08-09T19:00:00",
    venue: "Rosebank Mall Chess Corner",
    result: null,
    confirmed: false
  }
];

// Mock venues data
const venues = [
  "Wanderers Club",
  "Sandton Library",
  "City Chess Club",
  "Rosebank Mall Chess Corner"
];

// Mock player availability data
const playerAvailability = {
  "player1": {
    name: "Daniel Smith",
    rating: 1856,
    availableSlots: [
      { day: "Monday", time: "18:00" },
      { day: "Monday", time: "19:00" },
      { day: "Wednesday", time: "18:30" },
      { day: "Friday", time: "19:00" }
    ]
  },
  "player2": {
    name: "Sarah Johnson",
    rating: 1723,
    availableSlots: [
      { day: "Tuesday", time: "17:30" },
      { day: "Thursday", time: "18:00" },
      { day: "Saturday", time: "14:00" }
    ]
  },
  "player3": {
    name: "Michael Brown",
    rating: 1645,
    availableSlots: [
      { day: "Monday", time: "19:30" },
      { day: "Wednesday", time: "18:00" },
      { day: "Friday", time: "17:30" }
    ]
  }
};

// Helper to format dates in a more readable way
function formatDateAndTime(dateString: string | null) {
  if (!dateString) return "Not scheduled";
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export default function MatchesTab() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedVenue, setSelectedVenue] = useState<string>("");
  
  // Group matches by status
  const upcomingMatches = matches.filter(match => match.status === 'scheduled');
  const pendingMatches = matches.filter(match => ['pending', 'pending_confirmation', 'pending_result'].includes(match.status));
  const completedMatches = matches.filter(match => match.status === 'completed');

  const handleBookMatch = () => {
    // Form validation
    if (!selectedPlayer || !selectedTimeSlot || !selectedVenue) {
      toast.error("Please fill in all fields", {
        description: "Player, time slot, and venue are required to book a match."
      });
      return;
    }
    
    // Close dialog and show success message
    setIsBookingModalOpen(false);
    
    // Get player details for the toast message
    const player = playerAvailability[selectedPlayer as keyof typeof playerAvailability];
    
    // Show success toast
    toast.success("Match booked successfully", {
      description: `Your match with ${player.name} is scheduled for ${selectedTimeSlot} at ${selectedVenue}.`
    });
    
    // Reset form
    setSelectedPlayer("");
    setSelectedTimeSlot("");
    setSelectedVenue("");
  };

  return (
    <div>
      <Toaster />
      {/* Header with Book Match button */}
      <div className="flex justify-between items-center mb-4">
        <div className="hidden sm:block">
          {/* Empty div for alignment on mobile */}
        </div>
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <DialogTrigger asChild>
            <Button variant="gold" size="sm" className="ml-auto">
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Book Match
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book a Match</DialogTitle>
              <DialogDescription>
                Schedule a new match with another player. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="opponent" className="text-right">
                  Opponent
                </Label>
                <Select onValueChange={(value) => setSelectedPlayer(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select opponent" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(playerAvailability).map(([id, player]) => (
                      <SelectItem key={id} value={id}>
                        {player.name} ({player.rating})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPlayer && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="timeSlot" className="text-right">
                    Time Slot
                  </Label>
                  <Select onValueChange={(value) => setSelectedTimeSlot(value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select available time" />
                    </SelectTrigger>
                    <SelectContent>
                      {playerAvailability[selectedPlayer as keyof typeof playerAvailability].availableSlots.map((slot, index) => (
                        <SelectItem key={index} value={`${slot.day} at ${slot.time}`}>
                          {slot.day} at {slot.time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="league" className="text-right">
                  League
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select league" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wanderers">Wanderers Chess Club League</SelectItem>
                    <SelectItem value="jhb">Johannesburg City League</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="division" className="text-right">
                  Division
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="div1">Division 1</SelectItem>
                    <SelectItem value="div2">Division 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="venue" className="text-right">
                  Venue
                </Label>
                <Select onValueChange={(value) => setSelectedVenue(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select venue" />
                  </SelectTrigger>
                  <SelectContent>
                    {venues.map((venue) => (
                      <SelectItem key={venue} value={venue}>
                        {venue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBookingModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="gold" onClick={handleBookMatch}>
                Book Match
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Match Tabs */}
      <Tabs defaultValue="upcoming" className="mb-6">
        <TabsList className="w-full border border-secondary bg-card rounded-md">
          <TabsTrigger 
            value="upcoming"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Upcoming ({upcomingMatches.length})
          </TabsTrigger>
          <TabsTrigger 
            value="pending" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Pending ({pendingMatches.length})
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Completed ({completedMatches.length})
          </TabsTrigger>
        </TabsList>
        
        {/* Upcoming Matches */}
        <TabsContent value="upcoming" className="mt-4">
          {upcomingMatches.length === 0 ? (
            <Card className="text-center">
              <CardContent className="px-3">
                <p className="text-sm">You don&apos;t have any upcoming matches scheduled.</p>
                <Link href="/dashboard" className="mt-2 inline-block text-xs text-primary underline">Find a league to join</Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {upcomingMatches.map((match) => (
                <Card key={match.id}>
                  <CardContent>
                    <div className="flex justify-between items-start mb-1">
                      <div className='gap-1'>
                        <h3 className="font-medium text-white text-sm">{match.opponent}</h3>
                        <p className="text-xs text-muted-foreground">Rating: {match.opponent_rating}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium">{formatDateAndTime(match.date)}</p>
                        <p className="text-xs text-muted-foreground">{match.venue || "Not specified"}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{match.league} - {match.division}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/matches/${match.id}/reschedule`}>
                          Reschedule
                        </Link>
                      </Button>
                      <Button variant="gold" size="sm" asChild>
                        <Link href={`/matches/${match.id}/report`}>
                          Report Result
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Pending Matches */}
        <TabsContent value="pending" className="mt-4">
          {pendingMatches.length === 0 ? (
            <Card className="text-center">
              <CardContent className="px-3">
                <p className="text-sm">You don&apos;t have any matches requiring action.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {pendingMatches.map((match) => (
                <Card key={match.id} className="border-l-4 border-[#FFC107]">
                  <CardContent>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-medium text-white text-sm">
                          Match against {match.opponent}
                        </h3>
                        <p className="text-xs text-white">{match.league} - {match.division}</p>
                      </div>
                      
                      <div>
                        {match.status === 'pending' && (
                          <Button variant="gold" size="sm" asChild>
                            <Link href={`/matches/${match.id}/schedule`}>
                              Schedule
                            </Link>
                          </Button>
                        )}
                        
                        {match.status === 'pending_confirmation' && (
                          <Button variant="gold" size="sm" asChild>
                            <Link href={`/matches/${match.id}/confirm`}>
                              Confirm
                            </Link>
                          </Button>
                        )}
                        
                        {match.status === 'pending_result' && (
                          <Button variant="gold" size="sm" asChild>
                            <Link href={`/matches/${match.id}/confirm-result`}>
                              Confirm Result
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {match.status === 'pending_confirmation' && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        Proposed: {formatDateAndTime(match.date)} at {match.venue}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Completed Matches */}
        <TabsContent value="completed" className="mt-4">
          {completedMatches.length === 0 ? (
            <Card className="text-center">
              <CardContent className="px-3">
                <p className="text-sm">You don&apos;t have any completed matches yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {completedMatches.map((match) => (
                <Card key={match.id}>
                  <CardContent>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-medium text-primary text-sm">{match.opponent}</h3>
                        <p className="text-xs text-muted-foreground">Rating: {match.opponent_rating}</p>
                      </div>
                      <div className="text-right">
                        <span className={`font-medium text-sm ${
                          match.result === '1-0' ? 'text-[#4CAF50]' : 
                          match.result === '0-1' ? 'text-[#E53935]' : 
                          'text-[#FFC107]'
                        }`}>
                          {match.result === '1-0' ? 'Won' : match.result === '0-1' ? 'Lost' : 'Draw'}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{match.league} - {match.division}</p>
                    <p className="text-xs text-muted-foreground">{formatDateAndTime(match.date)} at {match.venue}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}