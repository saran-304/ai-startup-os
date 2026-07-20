'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/providers/auth-provider';
import { Users, MessageSquare, Heart, Share2, Plus, Clock } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

export default function CommunityPage() {
  const { user, userData } = useAuth();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Sarah Chen',
      authorAvatar: 'SC',
      content: 'Just completed our first 10 customer interviews! The feedback has been incredibly valuable. Key insight: 80% of users are willing to pay for the premium features we were hesitant to build.',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago',
      tags: ['validation', 'customers'],
    },
    {
      id: '2',
      author: 'Alex Kumar',
      authorAvatar: 'AK',
      content: 'Looking for co-founders for a B2B SaaS in the HR tech space. I have 5 years of industry experience and a working MVP. DM if interested!',
      likes: 15,
      comments: 12,
      timestamp: '5 hours ago',
      tags: ['co-founder', 'hiring'],
    },
    {
      id: '3',
      author: 'Maria Rodriguez',
      authorAvatar: 'MR',
      content: 'Finally closed our pre-seed round! $1.2M to build the future of remote team collaboration. Thanks to everyone who supported us on this journey.',
      likes: 89,
      comments: 34,
      timestamp: '1 day ago',
      tags: ['funding', 'milestone'],
    },
  ]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', tags: '' });

  const handleCreatePost = () => {
    if (!newPost.content.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: userData?.displayName || 'Anonymous',
      authorAvatar: (userData?.displayName || 'A').substring(0, 2).toUpperCase(),
      content: newPost.content,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      tags: newPost.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    setPosts([post, ...posts]);
    setNewPost({ content: '', tags: '' });
    setShowCreatePost(false);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground">
            Connect with founders, share experiences, and grow together
          </p>
        </div>
        <Button onClick={() => setShowCreatePost(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Create Post */}
      {showCreatePost && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">What's on your mind?</Label>
                <textarea
                  id="content"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Share your startup journey, ask questions, or celebrate milestones..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  placeholder="e.g., validation, funding, milestone"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreatePost}>Post</Button>
                <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    {post.authorAvatar}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{post.author}</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.timestamp}
                      </span>
                    </div>
                    <p className="text-sm">{post.content}</p>
                    {post.tags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className="h-4 w-4" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Founders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Posts This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+23% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Co-founder Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
