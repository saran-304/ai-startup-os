import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Brain, Target, Users, Rocket } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AI Startup OS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Zap className="h-4 w-4" />
            <span>Powered by Ghost Protocol™</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            From Idea to Company
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The AI-powered operating system that remembers everything about your startup and helps you
            build faster with intelligent insights.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Start Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Build</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            One platform for idea validation, planning, team building, and fundraising
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Brain className="h-6 w-6" />}
            title="Ghost Protocol™"
            description="AI that remembers everything about your startup - ideas, pivots, conversations, and decisions"
          />
          <FeatureCard
            icon={<Target className="h-6 w-6" />}
            title="Idea Validation"
            description="AI-powered analysis to validate your startup idea before you build"
          />
          <FeatureCard
            icon={<Users className="h-6 w-6" />}
            title="Co-founder Matching"
            description="Find the perfect co-founder based on skills, vision, and compatibility"
          />
          <FeatureCard
            icon={<Rocket className="h-6 w-6" />}
            title="Startup Roadmap"
            description="AI-generated roadmaps with milestones, tasks, and progress tracking"
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Investor Readiness"
            description="Get your startup ready for fundraising with AI-powered insights"
          />
          <FeatureCard
            icon={<Brain className="h-6 w-6" />}
            title="24/7 AI Assistant"
            description="Get answers to your startup questions anytime, with full context awareness"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Startup?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of founders using AI Startup OS to build their dreams
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="gap-2">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 AI Startup OS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
