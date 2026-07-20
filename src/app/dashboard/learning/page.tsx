'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers/auth-provider';
import { BookOpen, Video, FileText, Search, Clock, Play, CheckCircle, Star, TrendingUp } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  progress: number;
  completed: boolean;
  rating: number;
  lessons: number;
}

interface Article {
  id: string;
  title: string;
  author: string;
  readTime: string;
  category: string;
  read: boolean;
}

export default function LearningPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'courses' | 'videos' | 'articles'>('courses');
  const [searchQuery, setSearchQuery] = useState('');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Startup Fundamentals',
      description: 'Learn the essentials of building a successful startup from idea to launch.',
      instructor: 'Dr. Sarah Johnson',
      duration: '8 hours',
      level: 'beginner',
      category: 'Fundamentals',
      progress: 45,
      completed: false,
      rating: 4.9,
      lessons: 24,
    },
    {
      id: '2',
      title: 'Product-Market Fit',
      description: 'Master the art of finding and validating product-market fit for your startup.',
      instructor: 'Michael Chen',
      duration: '6 hours',
      level: 'intermediate',
      category: 'Product',
      progress: 0,
      completed: false,
      rating: 4.8,
      lessons: 18,
    },
    {
      id: '3',
      title: 'Fundraising Mastery',
      description: 'Complete guide to raising capital for your startup from seed to Series A.',
      instructor: 'Emily Rodriguez',
      duration: '10 hours',
      level: 'advanced',
      category: 'Fundraising',
      progress: 100,
      completed: true,
      rating: 4.9,
      lessons: 32,
    },
  ];

  const articles: Article[] = [
    {
      id: '1',
      title: '10 Mistakes First-Time Founders Make',
      author: 'TechCrunch',
      readTime: '5 min',
      category: 'Advice',
      read: false,
    },
    {
      id: '2',
      title: 'How to Validate Your Startup Idea',
      author: 'Y Combinator',
      readTime: '8 min',
      category: 'Validation',
      read: true,
    },
    {
      id: '3',
      title: 'Building Your MVP on a Budget',
      author: 'Indie Hackers',
      readTime: '12 min',
      category: 'Product',
      read: false,
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Learning Hub</h1>
        <p className="text-muted-foreground">
          Courses, videos, and articles to accelerate your startup journey
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses, videos, and articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === 'courses' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('courses')}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Courses
        </Button>
        <Button
          variant={activeTab === 'videos' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('videos')}
        >
          <Video className="h-4 w-4 mr-2" />
          Videos
        </Button>
        <Button
          variant={activeTab === 'articles' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('articles')}
        >
          <FileText className="h-4 w-4 mr-2" />
          Articles
        </Button>
      </div>

      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-1">{course.instructor}</CardDescription>
                    </div>
                    {course.completed && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {course.category}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{course.lessons} lessons</span>
                      <span className="text-muted-foreground">{course.progress}% complete</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <Button className="w-full">
                    {course.completed ? 'Review Course' : course.progress > 0 ? 'Continue' : 'Start Course'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Video className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Video Library Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  We're curating the best startup videos for you. Check back soon!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'articles' && (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <Card key={article.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{article.title}</h3>
                      {article.read && (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{article.author}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </div>
                      <span>•</span>
                      <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {article.read ? 'Re-read' : 'Read'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Learning Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Courses Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.filter((c) => c.completed).length}</div>
            <p className="text-xs text-muted-foreground">Out of {courses.length} enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Learning Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Articles Read
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.filter((a) => a.read).length}</div>
            <p className="text-xs text-muted-foreground">Out of {articles.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4" />
              Skill Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground">+50 this week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
