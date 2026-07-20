'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/auth-provider';
import { TrendingUp, AlertTriangle, CheckCircle, Target, DollarSign, Users, BarChart3, FileText, Sparkles, Loader2 } from 'lucide-react';

interface ReadinessScore {
  category: string;
  score: number;
  status: 'ready' | 'needs_work' | 'critical';
  items: string[];
}

export default function InvestorsPage() {
  const { user } = useAuth();
  const [analyzing, setAnalyzing] = useState(false);
  const [readinessScores, setReadinessScores] = useState<ReadinessScore[]>([
    {
      category: 'Pitch Deck',
      score: 85,
      status: 'ready',
      items: ['Problem statement clear', 'Solution compelling', 'Market size defined', 'Team section complete'],
    },
    {
      category: 'Financial Projections',
      score: 60,
      status: 'needs_work',
      items: ['Revenue model defined', 'Unit economics calculated', 'Growth assumptions reasonable', 'Cash flow projections'],
    },
    {
      category: 'Market Validation',
      score: 75,
      status: 'needs_work',
      items: ['Customer interviews completed', 'Pilot program running', 'Traction metrics tracked', 'Competitive analysis done'],
    },
    {
      category: 'Team Composition',
      score: 90,
      status: 'ready',
      items: ['Founder experience relevant', 'Technical co-founder onboard', 'Advisory board formed', 'Key hires planned'],
    },
  ]);

  const overallScore = Math.round(
    readinessScores.reduce((acc, curr) => acc + curr.score, 0) / readinessScores.length
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'text-green-500 bg-green-50 dark:bg-green-950';
      case 'needs_work':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'critical':
        return 'text-red-500 bg-red-50 dark:bg-red-950';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-5 w-5" />;
      case 'needs_work':
        return <AlertTriangle className="h-5 w-5" />;
      case 'critical':
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const analyzeReadiness = async () => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Investor Readiness</h1>
          <p className="text-muted-foreground">
            Assess your startup's readiness for fundraising
          </p>
        </div>
        <Button onClick={analyzeReadiness} disabled={analyzing}>
          {analyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              AI Analysis
            </>
          )}
        </Button>
      </div>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Readiness Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${overallScore * 3.52} 352`}
                  className="text-primary"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{overallScore}%</span>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {overallScore >= 80 ? 'Ready for Fundraising' : overallScore >= 60 ? 'Almost Ready' : 'Needs Work'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {overallScore >= 80
                    ? 'Your startup is well-positioned for investor meetings. Focus on refining your pitch and preparing for due diligence.'
                    : overallScore >= 60
                    ? 'You have a solid foundation but need to address key areas before fundraising.'
                    : 'Significant gaps exist. Focus on building traction and validating your market before approaching investors.'}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm">Ready ({readinessScores.filter((r) => r.status === 'ready').length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="text-sm">
                    Needs Work ({readinessScores.filter((r) => r.status === 'needs_work').length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm">Critical ({readinessScores.filter((r) => r.status === 'critical').length})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Scores */}
      <div className="grid gap-4 md:grid-cols-2">
        {readinessScores.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category.category}</CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(category.status)}
                  <span className={`text-sm font-medium ${getStatusColor(category.status)}`}>
                    {category.score}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${category.score}%` }}
                  />
                </div>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg border">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Refine Financial Projections</h3>
                <p className="text-sm text-muted-foreground">
                  Update your unit economics and ensure growth assumptions are backed by data. Consider running sensitivity analysis.
                </p>
              </div>
              <Button size="sm">View Details</Button>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg border">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Expand Market Validation</h3>
                <p className="text-sm text-muted-foreground">
                  Complete 20+ customer interviews and document key insights. Launch a pilot program to demonstrate traction.
                </p>
              </div>
              <Button size="sm">View Details</Button>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg border">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Prepare Due Diligence Materials</h3>
                <p className="text-sm text-muted-foreground">
                  Organize legal documents, financial statements, and cap table. Create a data room for investor access.
                </p>
              </div>
              <Button size="sm">View Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Target Raise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.5M</div>
            <p className="text-xs text-muted-foreground">Seed Round</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              MRR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12K</div>
            <p className="text-xs text-muted-foreground">+15% MoM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,340</div>
            <p className="text-xs text-muted-foreground">+8% WoW</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Investor Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
