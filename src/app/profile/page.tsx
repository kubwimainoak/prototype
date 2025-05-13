'use client';

import { useState, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
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
  
  const handleSaveAvailability = () => {
    // Simulate saving
    toast.success("Availability saved successfully", {
      description: `Saved ${selectedTimeSlots.length} time slots across ${new Set(selectedTimeSlots.map(slot => slot.split('-')[0])).size} days.`
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-card/30 to-secondary/20 pb-20">
      <Toaster />
      <div className="mb-4 w-full bg-card p-4">
        <h1 className="text-xl font-bold text-white">Profile</h1>
        <p className="text-xs text-white/80 mt-0.5">Manage your chess player profile</p>
      </div>
      <div className="container mx-auto max-w-6xl px-4">
        
        <Tabs defaultValue="general" className="mb-6">
          <TabsList className="w-full border border-secondary bg-card rounded-md">
            <TabsTrigger 
              value="general"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
            >
              General
            </TabsTrigger>
            <TabsTrigger 
              value="schedule" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger 
              value="subscription" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
            >
              Subscription
            </TabsTrigger>
          </TabsList>
          
          {/* General Tab */}
          <TabsContent value="general" className="mt-4">
            <div className="bg-card rounded-lg shadow-md p-3 mb-3">
              <div className="flex items-center mb-3">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Player Name</h2>
                  <p className="text-xs text-muted-foreground">Current rating: 1782</p>
                  <Button variant="outline" size="sm" className="mt-1">
                    Edit Profile
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-secondary pt-2">
                <h3 className="text-sm font-medium text-primary mb-2">Player Information</h3>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">player@example.com</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">CHESSA ID</p>
                    <p className="text-sm font-medium">SA10076542</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Club</p>
                    <p className="text-sm font-medium">Wanderers Chess Club</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="text-sm font-medium">January 2023</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm font-medium">123 Chess Street, Johannesburg, 2000</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-md p-3">
              <h3 className="text-sm font-medium text-primary mb-2">Statistics</h3>
              
              {/* Overall Stats */}
              <div className="mb-3">
                <h4 className="text-xs font-medium text-primary mb-2">Overall Performance</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Matches Played</p>
                    <p className="text-lg font-semibold">47</p>
                  </div>
                  
                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                    <p className="text-lg font-semibold">68%</p>
                  </div>
                </div>
              </div>

              {/* Tournament Stats */}
              <div className="mb-3">
                <h4 className="text-xs font-medium text-primary mb-2">Tournament Statistics</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Tournaments</p>
                    <p className="text-lg font-semibold">12</p>
                  </div>
                  
                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Tournament Wins</p>
                    <p className="text-lg font-semibold">3</p>
                  </div>

                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Tournament Runner-up</p>
                    <p className="text-lg font-semibold">2</p>
                  </div>

                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Tournament Rating</p>
                    <p className="text-lg font-semibold">1820</p>
                  </div>
                </div>
              </div>

              {/* Game Type Stats */}
              <div className="mb-3">
                <h4 className="text-xs font-medium text-primary mb-2">Game Types</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Round Robin</p>
                    <p className="text-lg font-semibold">8</p>
                  </div>
                  
                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Swiss System</p>
                    <p className="text-lg font-semibold">4</p>
                  </div>

                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Knockout</p>
                    <p className="text-lg font-semibold">3</p>
                  </div>

                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Team Events</p>
                    <p className="text-lg font-semibold">2</p>
                  </div>
                </div>
              </div>

              {/* Match Results */}
              <div>
                <h4 className="text-xs font-medium text-primary mb-2">Match Results</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Wins</p>
                    <p className="text-lg font-semibold">32</p>
                  </div>
                  
                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Losses</p>
                    <p className="text-lg font-semibold">12</p>
                  </div>

                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Draws</p>
                    <p className="text-lg font-semibold">3</p>
                  </div>

                  <div className="p-2 bg-secondary rounded-md">
                    <p className="text-xs text-muted-foreground">Current Streak</p>
                    <p className="text-lg font-semibold">4W</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Schedule Tab with Calendar */}
          <TabsContent value="schedule" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">My Availability</CardTitle>
                <CardDescription>
                  Set your available time slots for match scheduling. Players with matching availability will be suggested to you for quick match booking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-primary mb-2">Weekly Schedule</h3>
                  
                  {/* Calendar week view */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {weekDays.map((day) => (
                      <div 
                        key={day.dateString} 
                        className={`
                          p-2 text-center cursor-pointer rounded-md border border-secondary
                          ${selectedDay === day.dateString 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-card hover:border-primary/50'
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
                      <h3 className="text-sm font-medium text-primary mb-2">
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
                                ? 'bg-primary text-primary-foreground border-primary font-bold' 
                                : 'bg-card border-secondary hover:border-primary/50'
                              }
                            `}
                            onClick={() => toggleTimeSlot(slot)}
                          >
                            {slot}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button variant="gold" onClick={handleSaveAvailability}>
                          Save Availability
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      Select a day to set your available time slots
                    </div>
                  )}
                </div>
                
                <div className="border-t border-secondary pt-4 mt-4">
                  <h3 className="text-sm font-medium text-primary mb-2">Schedule Stats</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-secondary rounded-md">
                      <p className="text-xs text-muted-foreground">Available Time Slots</p>
                      <p className="text-lg font-semibold">{selectedTimeSlots.length}</p>
                    </div>
                    
                    <div className="p-2 bg-secondary rounded-md">
                      <p className="text-xs text-muted-foreground">Available Days</p>
                      <p className="text-lg font-semibold">
                        {new Set(selectedTimeSlots.map(slot => slot.split('-')[0])).size}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="gold" size="sm">View Potential Match Partners</Button>
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
                              <div key={id} className="flex items-center justify-between p-2 border border-secondary rounded-md">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium">Player {id}</h4>
                                    <p className="text-xs text-muted-foreground">Rating: {1500 + id * 100}</p>
                                  </div>
                                </div>
                                <Button variant="gold" size="sm">Book Match</Button>
                              </div>
                            ))
                          ) : (
                            <p className="text-center py-4 text-muted-foreground">
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
          
          {/* Subscription Tab */}
          <TabsContent value="subscription" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">My Subscription</CardTitle>
                <CardDescription>
                  Manage your subscription plan and payment details
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Current Plan Section */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-primary mb-2">Current Plan</h3>
                  <div className="bg-secondary p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">Premium Membership</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">Billed annually</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">R599 / year</div>
                        <p className="text-xs text-[#4CAF50]">Active</p>
                      </div>
                    </div>
                    <div className="flex mt-3 text-xs">
                      <span className="inline-flex items-center text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Renewal: May 15, 2024
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Plan Benefits */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-primary mb-2">Membership Benefits</h3>
                  <ul className="space-y-2">
                    {['Unlimited league entries', 'Priority tournament registration', 'No booking fees for matches', 'Advanced player statistics'].map((benefit, index) => (
                      <li key={index} className="flex text-sm items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Payment Methods */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-primary mb-2">Payment Method</h3>
                  <div className="border border-secondary p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-6 bg-secondary rounded-md flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Visa ending in 4242</h4>
                          <p className="text-xs text-muted-foreground">Expires: 05/25</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Billing History */}
                <div>
                  <h3 className="text-sm font-medium text-primary mb-2">Billing History</h3>
                  <div className="border border-secondary rounded-md divide-y divide-secondary">
                    {[
                      { date: 'May 15, 2023', amount: 'R599.00', status: 'Paid' },
                      { date: 'May 15, 2022', amount: 'R499.00', status: 'Paid' }
                    ].map((invoice, index) => (
                      <div key={index} className="p-3 flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium">{invoice.date}</h4>
                          <p className="text-xs text-muted-foreground">Premium Membership</p>
                        </div>
                        <div className="text-right">
                          <h4 className="text-sm font-medium">{invoice.amount}</h4>
                          <p className="text-xs text-[#4CAF50]">{invoice.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 border-t border-secondary pt-6">
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" onClick={() => toast.success("Your invoice has been emailed to you", { description: "A copy of your latest invoice has been sent to your email address." })}>
                      Email Invoice
                    </Button>
                    <Button variant="gold" size="sm">
                      Upgrade Plan
                    </Button>
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
      <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-card/30 to-secondary/20 pb-20 flex justify-center items-center">
        <div className="text-primary text-lg font-medium">Loading profile...</div>
      </div>
    }>
      <ProfilePageContent />
    </Suspense>
  );
} 