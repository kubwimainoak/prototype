'use client';

import { useState, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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

function ProfilePageContent() {
  // State for time slots
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  
  // Helper function to get the current week dates
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust to get Monday
    
    const monday = new Date(today.setDate(diff));
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      weekDays.push({
        date: nextDay,
        dayName: nextDay.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: nextDay.getDate(),
        month: nextDay.toLocaleDateString('en-US', { month: 'short' }),
        dateString: nextDay.toISOString().split('T')[0]
      });
    }
    return weekDays;
  };
  
  const weekDays = getCurrentWeekDates();
  
  // Time slots for the day (30-minute intervals from 08:00 to 22:00)
  const timeSlots = [];
  for (let hour = 8; hour < 22; hour++) {
    const hourFormatted = hour.toString().padStart(2, '0');
    timeSlots.push(`${hourFormatted}:00`);
    timeSlots.push(`${hourFormatted}:30`);
  }
  
  // Handle time slot selection
  const toggleTimeSlot = (slot: string) => {
    if (!selectedDay) return;
    
    const timeSlotId = `${selectedDay}-${slot}`;
    if (selectedTimeSlots.includes(timeSlotId)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(ts => ts !== timeSlotId));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, timeSlotId]);
    }
  };
  
  // Check if a time slot is selected
  const isTimeSlotSelected = (slot: string) => {
    if (!selectedDay) return false;
    return selectedTimeSlots.includes(`${selectedDay}-${slot}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1f40]/10 via-[#152B59]/20 to-[#1a3573]/10 pb-20">
      <div className="mb-4 w-full bg-[#152B59] p-4">
        <h1 className="text-xl font-bold text-[#D6AD60]">Profile</h1>
        <p className="text-xs text-[#D6AD60]/80 mt-0.5">Manage your chess player profile</p>
      </div>
      <div className="container mx-auto max-w-6xl px-4">
        
        <Tabs defaultValue="general" className="mb-6">
          <TabsList className="w-full border border-[#152B59]/20 bg-[#152B59]/5 rounded-md">
            <TabsTrigger 
              value="general"
              className="data-[state=active]:bg-white data-[state=active]:text-[#152B59] data-[state=active]:shadow-none"
            >
              General
            </TabsTrigger>
            <TabsTrigger 
              value="schedule" 
              className="data-[state=active]:bg-white data-[state=active]:text-[#152B59] data-[state=active]:shadow-none"
            >
              Schedule
            </TabsTrigger>
          </TabsList>
          
          {/* General Tab */}
          <TabsContent value="general" className="mt-4">
            <div className="bg-white rounded-lg shadow-md p-3 mb-3">
              <div className="flex items-center mb-3">
                <div className="w-16 h-16 bg-[#152B59]/10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#152B59]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#152B59]">Player Name</h2>
                  <p className="text-xs text-[#333333]/80">Current rating: 1782</p>
                  <Button variant="outline" size="sm" className="mt-1">
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-[#152B59]/10 pt-2">
                <h3 className="text-sm font-medium text-[#152B59] mb-2">Player Information</h3>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <p className="text-xs text-[#333333]/60">Email</p>
                    <p className="text-sm font-medium">player@example.com</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-[#333333]/60">CHESSA ID</p>
                    <p className="text-sm font-medium">SA10076542</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-[#333333]/60">Club</p>
                    <p className="text-sm font-medium">Wanderers Chess Club</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-[#333333]/60">Member Since</p>
                    <p className="text-sm font-medium">January 2023</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-[#333333]/60">Address</p>
                    <p className="text-sm font-medium">123 Chess Street, Johannesburg, 2000</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-3">
              <h3 className="text-sm font-medium text-[#152B59] mb-2">Statistics</h3>
              
              {/* Overall Stats */}
              <div className="mb-3">
                <h4 className="text-xs font-medium text-[#152B59] mb-2">Overall Performance</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Matches Played</p>
                    <p className="text-lg font-semibold text-[#152B59]">47</p>
                  </div>
                  
                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Win Rate</p>
                    <p className="text-lg font-semibold text-[#152B59]">68%</p>
                  </div>
                </div>
              </div>

              {/* Tournament Stats */}
              <div className="mb-3">
                <h4 className="text-xs font-medium text-[#152B59] mb-2">Tournament Statistics</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Tournaments</p>
                    <p className="text-lg font-semibold text-[#152B59]">12</p>
                  </div>
                  
                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Tournament Wins</p>
                    <p className="text-lg font-semibold text-[#152B59]">3</p>
                  </div>

                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Tournament Runner-up</p>
                    <p className="text-lg font-semibold text-[#152B59]">2</p>
                  </div>

                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Tournament Rating</p>
                    <p className="text-lg font-semibold text-[#152B59]">1820</p>
                  </div>
                </div>
              </div>

              {/* Game Type Stats */}
              <div className="mb-3">
                <h4 className="text-xs font-medium text-[#152B59] mb-2">Game Types</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Round Robin</p>
                    <p className="text-lg font-semibold text-[#152B59]">8</p>
                  </div>
                  
                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Swiss System</p>
                    <p className="text-lg font-semibold text-[#152B59]">4</p>
                  </div>

                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Knockout</p>
                    <p className="text-lg font-semibold text-[#152B59]">3</p>
                  </div>

                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Team Events</p>
                    <p className="text-lg font-semibold text-[#152B59]">2</p>
                  </div>
                </div>
              </div>

              {/* Match Results */}
              <div>
                <h4 className="text-xs font-medium text-[#152B59] mb-2">Match Results</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Wins</p>
                    <p className="text-lg font-semibold text-[#152B59]">32</p>
                  </div>
                  
                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Losses</p>
                    <p className="text-lg font-semibold text-[#152B59]">12</p>
                  </div>

                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Draws</p>
                    <p className="text-lg font-semibold text-[#152B59]">3</p>
                  </div>

                  <div className="p-2 bg-[#152B59]/5 rounded-md">
                    <p className="text-xs text-[#333333]/60">Current Streak</p>
                    <p className="text-lg font-semibold text-[#152B59]">4W</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Schedule Tab with Calendar */}
          <TabsContent value="schedule" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-[#152B59]">My Availability</CardTitle>
                <CardDescription>
                  Set your available time slots for match scheduling. Players with matching availability will be suggested to you for quick match booking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-[#152B59] mb-2">Weekly Schedule</h3>
                  
                  {/* Calendar week view */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {weekDays.map((day) => (
                      <div 
                        key={day.dateString} 
                        className={`
                          p-2 text-center cursor-pointer rounded-md border
                          ${selectedDay === day.dateString 
                            ? 'bg-[#152B59] text-white border-[#152B59]' 
                            : 'bg-white border-[#152B59]/20 hover:border-[#152B59]/50'
                          }
                        `}
                        onClick={() => setSelectedDay(day.dateString)}
                      >
                        <div className="text-xs font-medium">{day.dayName}</div>
                        <div className="text-sm font-bold">{day.dayNumber}</div>
                        <div className="text-xs">{day.month}</div>
                      </div>
                    ))}
                  </div>
                  
                  {selectedDay ? (
                    <>
                      <h3 className="text-sm font-medium text-[#152B59] mb-2">
                        Select available time slots for {new Date(selectedDay).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </h3>
                      
                      {/* Time slots grid */}
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                        {timeSlots.map((slot) => (
                          <div 
                            key={slot}
                            className={`
                              p-2 text-center rounded-md border text-xs cursor-pointer
                              ${isTimeSlotSelected(slot) 
                                ? 'bg-[#D6AD60] text-[#152B59] border-[#D6AD60] font-bold' 
                                : 'bg-white border-[#152B59]/20 hover:border-[#152B59]/50'
                              }
                            `}
                            onClick={() => toggleTimeSlot(slot)}
                          >
                            {slot}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button variant="navy">
                          Save Availability
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4 text-[#333333]/70">
                      Select a day to set your available time slots
                    </div>
                  )}
                </div>
                
                <div className="border-t border-[#152B59]/10 pt-4 mt-4">
                  <h3 className="text-sm font-medium text-[#152B59] mb-2">Schedule Stats</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-[#152B59]/5 rounded-md">
                      <p className="text-xs text-[#333333]/60">Available Time Slots</p>
                      <p className="text-lg font-semibold text-[#152B59]">{selectedTimeSlots.length}</p>
                    </div>
                    
                    <div className="p-2 bg-[#152B59]/5 rounded-md">
                      <p className="text-xs text-[#333333]/60">Available Days</p>
                      <p className="text-lg font-semibold text-[#152B59]">
                        {new Set(selectedTimeSlots.map(slot => slot.split('-')[0])).size}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="navyOutline" size="sm">View Potential Match Partners</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Potential Match Partners</DialogTitle>
                          <DialogDescription>
                            Players with similar availability to yours
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-3 my-3">
                          {/* Mock player data with matching availability */}
                          {selectedTimeSlots.length > 0 ? (
                            [1, 2, 3].map(id => (
                              <div key={id} className="flex items-center justify-between p-2 border border-[#152B59]/10 rounded-md">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-[#152B59]/10 rounded-full flex items-center justify-center mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#152B59]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">Player {id}</h4>
                                    <p className="text-xs text-[#333333]/60">Rating: {1500 + id * 100}</p>
                                  </div>
                                </div>
                                <Button variant="navy" size="sm">Book Match</Button>
                              </div>
                            ))
                          ) : (
                            <p className="text-center py-4 text-[#333333]/70">
                              Set your availability to see potential match partners
                            </p>
                          )}
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline" size="sm">Close</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0f1f40]/10 via-[#152B59]/20 to-[#1a3573]/10 pb-20 flex justify-center items-center">
        <div className="text-[#152B59] text-lg font-medium">Loading profile...</div>
      </div>
    }>
      <ProfilePageContent />
    </Suspense>
  );
} 