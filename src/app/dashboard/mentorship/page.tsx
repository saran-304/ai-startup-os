'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/providers/auth-provider';
import { MessageSquare, Calendar, Star, GraduationCap, Plus, Search, Clock } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  rating: number;
  sessions: number;
  bio: string;
  available: boolean;
}

interface Session {
  id: string;
  mentorId: string;
  mentorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export default function MentorshipPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'mentors' | 'sessions' | 'questions'>('mentors');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookSession, setShowBookSession] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      avatar: 'SJ',
      expertise: ['Product Strategy', 'Fundraising', 'Team Building'],
      rating: 4.9,
      sessions: 234,
      bio: 'Former VP of Product at Google, now angel investor and startup advisor. 15+ years in tech.',
      available: true,
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'MC',
      expertise: ['Growth Marketing', 'B2B Sales', 'Customer Success'],
      rating: 4.8,
      sessions: 189,
      bio: 'Growth lead at 3 unicorns. Specialized in early-stage go-to-market strategies.',
      available: true,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      avatar: 'ER',
      expertise: ['Design Thinking', 'UX Research', 'Product Design'],
      rating: 4.9,
      sessions: 156,
      bio: 'Design Director at Meta. Expert in building user-centric products at scale.',
      available: false,
    },
  ];

  const sessions: Session[] = [
    {
      id: '1',
      mentorId: '1',
      mentorName: 'Dr. Sarah Johnson',
      date: '2024-02-15',
      time: '10:00 AM',
      status: 'scheduled',
    },
    {
      id: '2',
      mentorId: '2',
      mentorName: 'Michael Chen',
      date: '2024-02-10',
      time: '2:00 PM',
      status: 'completed',
    },
  ];

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mentorship</h1>
        <p className="text-muted-foreground">
          Connect with experienced mentors to accelerate your startup journey
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === 'mentors' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('mentors')}
        >
          Find Mentors
        </Button>
        <Button
          variant={activeTab === 'sessions' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('sessions')}
        >
          My Sessions
        </Button>
        <Button
          variant={activeTab === 'questions' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('questions')}
        >
          Ask Questions
        </Button>
      </div>

      {activeTab === 'mentors' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mentors by name or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {mentor.avatar}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{mentor.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {mentor.rating}
                        <span>•</span>
                        <span>{mentor.sessions} sessions</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((exp) => (
                        <span
                          key={exp}
                          className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          mentor.available ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                      <span className="text-xs text-muted-foreground">
                        {mentor.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                    <Button
                      className="w-full"
                      disabled={!mentor.available}
                      onClick={() => {
                        setSelectedMentor(mentor);
                        setShowBookSession(true);
                      }}
                    >
                      {mentor.available ? 'Book Session' : 'Not Available'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{session.mentorName}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {session.date}
                        <Clock className="h-4 w-4" />
                        {session.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : session.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'questions' && (
        <Card>
          <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
            <CardDescription>
              Get answers from our community of mentors and founders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Your Question</Label>
                <textarea
                  id="question"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="What would you like to ask our mentors? Be specific about your challenge..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <select
                  id="topic"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select a topic</option>
                  <option value="fundraising">Fundraising</option>
                  <option value="product">Product Strategy</option>
                  <option value="marketing">Marketing</option>
                  <option value="hiring">Hiring & Team</option>
                  <option value="sales">Sales</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <Button className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Submit Question
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Book Session Dialog */}
      {showBookSession && selectedMentor && (
        <Card>
          <CardHeader>
            <CardTitle>Book Session with {selectedMentor.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Select Time</Label>
                <select
                  id="time"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select a time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="agenda">Session Agenda</Label>
                <textarea
                  id="agenda"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="What would you like to discuss in this session?"
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Confirm Booking</Button>
                <Button variant="outline" onClick={() => setShowBookSession(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
