'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

// Mock announcements for the General tab
const announcements = [
  {
    id: 1,
    title: "App Launch: Welcome to Chess Connect",
    date: "2023-10-10",
    content: "We're excited to announce the launch of Chess Connect, your new platform for organizing and participating in chess tournaments, leagues, and connecting with players.",
    author: "Chess Connect Team"
  },
  {
    id: 2,
    title: "New Tournament Season Starting",
    date: "2023-10-05",
    content: "Registration for the new tournament season is now open. Check the Tournaments tab for more details on upcoming events.",
    author: "Tournament Director"
  },
  {
    id: 3,
    title: "Rating Update",
    date: "2023-09-30",
    content: "All player ratings have been updated based on recent tournament and league results. Check your profile to see your new rating.",
    author: "Ratings Administrator"
  }
];

// Mock forum posts for the Community tab
const forumPosts = [
  {
    id: 1,
    title: "Sicilian Defense Study Group",
    author: {
      name: "Magnus J.",
      avatar: "/avatars/magnus.jpg",
      rating: 2145
    },
    date: "2023-10-09",
    content: "I'm looking to form a study group focusing on the Sicilian Defense. If you're interested in analyzing games, sharing resources, and improving together, please comment below!",
    replies: 8,
    likes: 15
  },
  {
    id: 2,
    title: "Recommended Chess Books for Beginners?",
    author: {
      name: "Emma W.",
      avatar: "/avatars/emma.jpg",
      rating: 950
    },
    date: "2023-10-07",
    content: "I'm fairly new to chess and looking for book recommendations. What books helped you improve when you were just starting out?",
    replies: 12,
    likes: 7
  },
  {
    id: 3,
    title: "Analysis of my recent tournament game",
    author: {
      name: "David K.",
      avatar: "/avatars/david.jpg",
      rating: 1920
    },
    date: "2023-10-06",
    content: "I played an interesting game last weekend that resulted in a tactical middlegame with sacrifices. I'd appreciate some feedback on my play and suggestions for improvement.",
    replies: 5,
    likes: 10
  },
  {
    id: 4,
    title: "Chess Clubs in Johannesburg?",
    author: {
      name: "Sarah K.",
      avatar: "/avatars/sarah.jpg",
      rating: 1876
    },
    date: "2023-10-04",
    content: "I recently moved to Johannesburg and I'm looking for chess clubs in the area. Does anyone have recommendations for active clubs with regular meetups?",
    replies: 6,
    likes: 4
  }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("general");
  
  // Using activeTab in a meaningful way to avoid the ESLint error
  const pageTitle = activeTab === "general" ? "Announcements & News" : "Community Forum";
  
  // Use activeTab for conditional rendering (to resolve the unused variable warning)
  const showNewPostButton = activeTab === "community";
  
  return (
    <div className="container w-full mx-auto pb-20">
       <div className="mb-4 w-full bg-card p-4">
        <h1 className="text-xl font-bold text-white">Chess Connect</h1>
        <p className="text-xs text-white/80 mt-0.5">{pageTitle}</p>
      </div>
      
      <Tabs defaultValue="general" className="mb-6 px-4" onValueChange={setActiveTab}>
        <TabsList className="w-full border border-secondary bg-card rounded-md">
          <TabsTrigger 
            value="general"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            General
          </TabsTrigger>
          <TabsTrigger 
            value="community" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Community
          </TabsTrigger>
        </TabsList>
        
        {/* General Tab - Announcements & News */}
        <TabsContent value="general" className="mt-4">
          <div className="space-y-4">
            {announcements.map(announcement => (
              <Card key={announcement.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm text-white font-semibold">{announcement.title}</CardTitle>
                    <span className="text-xs text-muted-foreground">{announcement.date}</span>
                  </div>
                  <CardDescription className="text-sm">{announcement.author}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Community Tab - Forum */}
        <TabsContent value="community" className="mt-4">
          {/* New Post Button with Modal */}
          {showNewPostButton && (
            <div className="relative mb-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="gold"
                    size="icon"
                    className="fixed bottom-24 right-6 rounded-full shadow-md z-10 h-12 w-12"
                  >
                    <PlusIcon className="h-6 w-6" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-card">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create New Post</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Share your thoughts, questions or analysis with the community.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Input 
                      placeholder="Post title..." 
                      className="bg-secondary/30 border-secondary"
                    />
                    <textarea 
                      placeholder="Share your thoughts, questions, or analysis..." 
                      className="w-full px-3 py-2 text-sm border border-secondary bg-secondary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[150px]" 
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="gold">Post</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
          
          <Accordion type="single" collapsible className="space-y-4">
            {forumPosts.map(post => (
              <AccordionItem 
                key={post.id} 
                value={`post-${post.id}`}
                className="bg-card border border-secondary rounded-md overflow-hidden p-0"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex-1 flex items-start justify-between">
                    <div>
                      <h3 className="text-sm text-white font-semibold text-left">{post.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{post.author.name} • {post.author.rating}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <p className="text-sm mb-4">{post.content}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span>{post.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{post.likes} likes</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="gold" size="sm">Like</Button>
                    <Button variant="gold" size="sm">Reply</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
} 