'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/providers/auth-provider';
import { GhostProtocol } from '@/services/ghost-protocol';
import { GhostMemory, MemoryType } from '@/types';
import {
  Ghost,
  Search,
  Filter,
  Calendar,
  Tag,
  Brain,
  Lightbulb,
  MessageSquare,
  FileText,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  Loader2,
  Plus,
} from 'lucide-react';

const memoryTypeIcons: Record<MemoryType, any> = {
  idea: Lightbulb,
  pivot: TrendingUp,
  customer_interview: Users,
  mentor_advice: Brain,
  investor_meeting: TrendingUp,
  document: FileText,
  roadmap: Target,
  task: CheckCircle,
  conversation: MessageSquare,
  ai_output: Brain,
  milestone: Target,
  product_decision: Lightbulb,
  user_preference: Ghost,
};

const memoryTypeColors: Record<MemoryType, string> = {
  idea: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  pivot: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  customer_interview: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  mentor_advice: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  investor_meeting: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  document: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  roadmap: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  task: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  conversation: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  ai_output: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  milestone: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  product_decision: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  user_preference: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200',
};

export default function GhostProtocolPage() {
  const { user } = useAuth();
  const [memories, setMemories] = useState<GhostMemory[]>([]);
  const [filteredMemories, setFilteredMemories] = useState<GhostMemory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<MemoryType | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    loadMemories();
  }, [user]);

  useEffect(() => {
    filterMemories();
  }, [memories, searchQuery, selectedType, selectedTag]);

  const loadMemories = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const ghostProtocol = new GhostProtocol(user.uid);
      const [allMemories, memorySummary] = await Promise.all([
        ghostProtocol.getAllMemories(),
        ghostProtocol.getMemorySummary(),
      ]);
      setMemories(allMemories);
      setFilteredMemories(allMemories);
      setSummary(memorySummary);
    } catch (error) {
      console.error('Error loading memories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMemories = () => {
    let filtered = memories;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (memory) =>
          memory.content.toLowerCase().includes(query) ||
          memory.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((memory) => memory.type === selectedType);
    }

    if (selectedTag !== 'all') {
      filtered = filtered.filter((memory) =>
        memory.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    setFilteredMemories(filtered);
  };

  const getAllTags = () => {
    const tags = new Set<string>();
    memories.forEach((memory) => memory.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  };

  const getMemoryTypeCount = (type: MemoryType) => {
    return summary?.byType?.[type] || 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Ghost className="h-8 w-8 text-primary" />
            Ghost Protocol
          </h1>
          <p className="text-muted-foreground">
            Your complete startup memory - every idea, decision, and conversation remembered
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Memory
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Memories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.total || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getMemoryTypeCount('idea')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getMemoryTypeCount('conversation')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getMemoryTypeCount('milestone')}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Memories</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by content or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="type">Memory Type</Label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as MemoryType | 'all')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">All Types</option>
                {Object.keys(memoryTypeIcons).map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="tag">Tag</Label>
              <select
                id="tag"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">All Tags</option>
                {getAllTags().map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Memory Timeline */}
      <div className="space-y-4">
        {filteredMemories.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Ghost className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No memories found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || selectedType !== 'all' || selectedTag !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Start adding memories to build your startup timeline'}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredMemories.map((memory) => {
            const Icon = memoryTypeIcons[memory.type];
            return (
              <Card key={memory.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${memoryTypeColors[memory.type]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${memoryTypeColors[memory.type]}`}
                          >
                            {memory.type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(memory.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">{memory.content}</p>
                      {memory.tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <Tag className="h-3 w-3 text-muted-foreground" />
                          {memory.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
