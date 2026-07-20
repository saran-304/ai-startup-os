'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/providers/auth-provider';
import { AIService } from '@/services/ai-service';
import { GhostProtocol } from '@/services/ghost-protocol';
import { Lightbulb, TrendingUp, AlertTriangle, Target, CheckCircle, Loader2, Sparkles } from 'lucide-react';

export default function IdeaValidationPage() {
  const { user, userData } = useAuth();
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleValidate = async () => {
    if (!idea.trim() || !user) return;

    try {
      setLoading(true);
      const aiService = new AIService(
        user.uid,
        process.env.NEXT_PUBLIC_AI_API_KEY || '',
        process.env.AI_MODEL || 'gemini-pro'
      );

      const validation = await aiService.validateIdea(idea);
      setResult(validation);

      // Store validation as memory
      const ghostProtocol = new GhostProtocol(user.uid);
      await ghostProtocol.addMemory('idea', idea, {
        type: 'idea_validation',
        scores: validation,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error validating idea:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Idea Validation</h1>
        <p className="text-muted-foreground">
          Get AI-powered analysis of your startup idea before you invest time and resources.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Describe Your Idea
          </CardTitle>
          <CardDescription>
            Provide a detailed description of your startup idea for comprehensive analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idea">Your Startup Idea</Label>
              <textarea
                id="idea"
                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe your startup idea in detail. What problem are you solving? Who is your target audience? What makes your solution unique?"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button onClick={handleValidate} disabled={loading || !idea.trim()} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Validate Idea
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-6xl font-bold text-primary">{result.overallScore}</div>
                <div className="flex-1">
                  <div className="h-4 rounded-full bg-secondary">
                    <div
                      className="h-4 rounded-full bg-primary transition-all"
                      style={{ width: `${result.overallScore}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your idea has {getScoreLabel(result.overallScore)} potential
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Problem Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(result.problemScore)}`}>
                  {result.problemScore}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {getScoreLabel(result.problemScore)} problem significance
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Market Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(result.marketScore)}`}>
                  {result.marketScore}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {getScoreLabel(result.marketScore)} market opportunity
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Competition Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(100 - result.competitionScore)}`}>
                  {result.competitionScore}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {result.competitionScore > 70 ? 'High competition' : 'Moderate competition'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Risk Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(100 - result.riskScore)}`}>
                  {result.riskScore}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {result.riskScore > 70 ? 'High risk' : 'Moderate risk'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Opportunity Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(result.opportunityScore)}`}>
                  {result.opportunityScore}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {getScoreLabel(result.opportunityScore)} opportunity
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>{result.analysis}</p>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Actionable steps to improve your idea</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  Generate Business Canvas
                </Button>
                <Button variant="outline" size="sm">
                  Create Roadmap
                </Button>
                <Button variant="outline" size="sm">
                  Save to Ghost Protocol
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
