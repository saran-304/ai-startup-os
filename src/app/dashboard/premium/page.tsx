'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/auth-provider';
import { Crown, Check, Sparkles, Zap, Shield, HeadphonesIcon, CreditCard, Loader2 } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular: boolean;
}

export default function PremiumPage() {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const isPremium = userData?.isPremium || false;

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      features: [
        'Basic AI Chat (50 messages/month)',
        'Idea Validation (3/month)',
        'Business Model Canvas (1/month)',
        'Community Access',
        'Basic Learning Resources',
      ],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      period: 'month',
      features: [
        'Unlimited AI Chat',
        'Unlimited Idea Validation',
        'Unlimited Business Canvas',
        'Startup Roadmap Generation',
        'Ghost Protocol (1000 memories)',
        'Priority Support',
        'Advanced Analytics',
        'Mentorship (2 sessions/month)',
        'Investor Readiness Analysis',
        'Premium Learning Courses',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      period: 'month',
      features: [
        'Everything in Pro',
        'Unlimited Ghost Protocol',
        'Dedicated AI Model',
        'Custom Integrations',
        'Team Collaboration',
        'API Access',
        '24/7 Priority Support',
        'Custom Training',
        'White-label Option',
      ],
      popular: false,
    },
  ];

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free') return;
    
    setLoading(true);
    // Simulate subscription process
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Premium Plans</h1>
        <p className="text-muted-foreground">
          Unlock the full power of AI Startup OS
        </p>
      </div>

      {isPremium && (
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Crown className="h-6 w-6 text-purple-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">You are a Premium Member</h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy all the benefits of your Pro plan. Your next billing date is Feb 15, 2024.
                </p>
              </div>
              <Button variant="outline">Manage Subscription</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>
                {plan.price === 0 ? 'Free forever' : `$${plan.price}/${plan.period}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full"
                variant={plan.popular ? 'default' : 'outline'}
                disabled={loading || (isPremium && plan.id !== 'free')}
                onClick={() => handleSubscribe(plan.id)}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : isPremium && plan.id !== 'free' ? (
                  'Current Plan'
                ) : plan.id === 'free' ? (
                  'Downgrade'
                ) : (
                  'Upgrade'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Highlights */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI with full context awareness
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Instant responses and real-time analysis
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold">Secure</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security and privacy
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <HeadphonesIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Premium support whenever you need it
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Can I cancel my subscription anytime?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">What payment methods do you accept?</h3>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Is there a free trial?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, we offer a 14-day free trial for the Pro plan. No credit card required to start.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Can I change my plan later?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely! You can upgrade or downgrade your plan at any time from your account settings.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Sales */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Need Enterprise Solutions?</h3>
              <p className="text-sm text-muted-foreground">
                Contact our sales team for custom pricing and features for your organization.
              </p>
            </div>
            <Button>
              <CreditCard className="h-4 w-4 mr-2" />
              Contact Sales
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
