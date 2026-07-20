'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/providers/auth-provider';
import { AIService } from '@/services/ai-service';
import { GhostProtocol } from '@/services/ghost-protocol';
import { Kanban, Sparkles, Loader2, Target, Clock, CheckCircle, Plus, Calendar } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
}

export default function RoadmapPage() {
  const { user } = useAuth();
  const [idea, setIdea] = useState('');
  const [timeline, setTimeline] = useState('6 months');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<{ milestones: Milestone[] } | null>(null);

  const handleGenerate = async () => {
    if (!idea.trim() || !user) return;

    try {
      setLoading(true);
      const aiService = new AIService(
        user.uid,
        process.env.NEXT_PUBLIC_AI_API_KEY || '',
        process.env.AI_MODEL || 'gemini-pro'
      );

      const generatedRoadmap = await aiService.generateRoadmap(idea, timeline);
      
      // Convert to milestone format
      const milestones = generatedRoadmap.milestones.map((m: any, index: number) => ({
        id: `milestone-${index}`,
        title: m.title,
        description: m.description,
        deadline: m.deadline,
        priority: m.priority,
        status: 'pending' as const,
      }));

      setRoadmap({ milestones });

      // Store as memory
      const ghostProtocol = new GhostProtocol(user.uid);
      await ghostProtocol.addMemory('roadmap', `Startup Roadmap for: ${idea}`, {
        type: 'startup_roadmap',
        timeline,
        milestones,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error generating roadmap:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMilestoneStatus = (milestoneId: string, status: Milestone['status']) => {
    if (!roadmap) return;
    setRoadmap({
      milestones: roadmap.milestones.map((m) => (m.id === milestoneId ? { ...m, status } : m)),
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-950';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'low':
        return 'text-green-500 bg-green-50 dark:bg-green-950';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-950';
    }
  };

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'pending':
        return <Target className="h-5 w-5 text-gray-400" />;
    }
  };

  const completedCount = roadmap?.milestones.filter((m) => m.status === 'completed').length || 0;
  const totalCount = roadmap?.milestones.length || 0;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Startup Roadmap</h1>
        <p className="text-muted-foreground">
          Plan your journey from idea to company with AI-generated milestones
        </p>
      </div>

      {!roadmap ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Kanban className="h-5 w-5 text-primary" />
              Generate Startup Roadmap
            </CardTitle>
            <CardDescription>
              Enter your startup idea and timeline to get a personalized roadmap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idea">Your Startup Idea</Label>
                <textarea
                  id="idea"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe your startup idea..."
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline</Label>
                <select
                  id="timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  disabled={loading}
                >
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="12 months">12 months</option>
                  <option value="18 months">18 months</option>
                  <option value="24 months">24 months</option>
                </select>
              </div>
              <Button onClick={handleGenerate} disabled={loading || !idea.trim()} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Roadmap
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Roadmap Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-secondary">
                    <div
                      className="h-3 rounded-full bg-primary transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-500">{completedCount}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-500">
                      {roadmap.milestones.filter((m) => m.status === 'in_progress').length}
                    </div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-400">
                      {roadmap.milestones.filter((m) => m.status === 'pending').length}
                    </div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <div className="space-y-4">
            {roadmap.milestones.map((milestone, index) => (
              <Card key={milestone.id} className={milestone.status === 'completed' ? 'opacity-60' : ''}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{getStatusIcon(milestone.status)}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{milestone.title}</h3>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            milestone.priority
                          )}`}
                        >
                          {milestone.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {milestone.deadline}
                        </div>
                      </div>
                      {milestone.status !== 'completed' && (
                        <div className="flex gap-2">
                          {milestone.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateMilestoneStatus(milestone.id, 'in_progress')}
                            >
                              Start
                            </Button>
                          )}
                          {milestone.status === 'in_progress' && (
                            <Button
                              size="sm"
                              onClick={() => updateMilestoneStatus(milestone.id, 'completed')}
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setRoadmap(null)}>
                  Generate New Roadmap
                </Button>
                <Button variant="outline">
                  Export Roadmap
                </Button>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Milestone
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
