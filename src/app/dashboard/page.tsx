'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/auth-provider';
import {
  Brain,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { userData } = useAuth();

  // Mock data - will be replaced with real data from Firestore
  const stats = {
    healthScore: 72,
    investorReadiness: 65,
    totalMemories: 156,
    completedTasks: 23,
    pendingTasks: 8,
    roadmapProgress: 45,
  };

  const recentActivities = [
    { id: 1, type: 'idea', title: 'Validated new startup idea', time: '2 hours ago' },
    { id: 2, type: 'task', title: 'Completed market research', time: '5 hours ago' },
    { id: 3, type: 'memory', title: 'Added customer interview notes', time: '1 day ago' },
    { id: 4, type: 'roadmap', title: 'Updated Q1 milestones', time: '2 days ago' },
  ];

  const aiInsights = [
    { id: 1, title: 'Your market validation score increased by 15%', type: 'positive' },
    { id: 2, title: 'Consider adding more customer interviews', type: 'suggestion' },
    { id: 3, title: 'Your pitch deck needs work on financial projections', type: 'warning' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {userData?.displayName}. Here's what's happening with your startup.
        </p>
      </div>

      {/* Health Score Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Startup Health</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.healthScore}%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investor Ready</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.investorReadiness}%</div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ghost Memories</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMemories}</div>
            <p className="text-xs text-muted-foreground">Total memories stored</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Done</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedTasks}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingTasks} pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Roadmap Progress */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Startup Roadmap Progress</CardTitle>
            <CardDescription>Your journey from idea to company</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{stats.roadmapProgress}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${stats.roadmapProgress}%` }}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Idea Validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Market Research</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">MVP Development</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Team Building</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Fundraising</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Launch</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Growth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Scaling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Exit</span>
                  </div>
                </div>
              </div>
              <Link href="/dashboard/roadmap">
                <Button variant="outline" className="w-full">
                  View Full Roadmap
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Insights
            </CardTitle>
            <CardDescription>Personalized recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="flex items-start gap-3">
                  {insight.type === 'positive' && (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  )}
                  {insight.type === 'suggestion' && (
                    <Target className="h-5 w-5 text-blue-500 mt-0.5" />
                  )}
                  {insight.type === 'warning' && (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  )}
                  <p className="text-sm">{insight.title}</p>
                </div>
              ))}
              <Link href="/dashboard/chat">
                <Button className="w-full" size="sm">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Ask AI Assistant
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and memories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {activity.type === 'idea' && <Lightbulb className="h-5 w-5 text-primary" />}
                    {activity.type === 'task' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {activity.type === 'memory' && <Brain className="h-5 w-5 text-blue-500" />}
                    {activity.type === 'roadmap' && <Target className="h-5 w-5 text-purple-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Link href="/dashboard/ghost">
                <Button variant="outline" className="w-full">
                  View All Memories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/dashboard/idea-validation">
                <Button variant="ghost" className="w-full justify-start">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Validate New Idea
                </Button>
              </Link>
              <Link href="/dashboard/chat">
                <Button variant="ghost" className="w-full justify-start">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Ask AI Question
                </Button>
              </Link>
              <Link href="/dashboard/tasks">
                <Button variant="ghost" className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Add New Task
                </Button>
              </Link>
              <Link href="/dashboard/canvas">
                <Button variant="ghost" className="w-full justify-start">
                  <Brain className="mr-2 h-4 w-4" />
                  Update Canvas
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
