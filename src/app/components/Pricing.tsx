'use client';

// import { useI18n, useCurrentLocale } from '@/i18n/client';
import Button from '@/app/components/ui/Button';
// import { Check } from 'lucide-react';
import { cn } from '@/app/lib/utils';;

interface Plan {
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  button: string;
  popular?: boolean;
  featuresTitle: string;
  features: string[];
}

export default function Pricing() {
  const plans: Plan[] = [
    {
      name: 'Starter',
      price: 29,
      currency: 'USD',
      period: 'month',
      description: 'Perfect for small businesses',
      button: 'Get Started',
      featuresTitle: 'What\'s included:',
      features: [
        'Up to 10,000 contacts',
        'Basic email marketing',
        '1 user account',
        'Basic analytics',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      price: 79,
      currency: 'USD',
      period: 'month',
      description: 'Best for growing businesses',
      button: 'Get Started',
      popular: true,
      featuresTitle: 'Everything in Starter, plus:',
      features: [
        'Up to 50,000 contacts',
        'Advanced email marketing',
        '5 user accounts',
        'Advanced analytics',
        'Priority support',
        'Custom templates'
      ]
    },
    {
      name: 'Enterprise',
      price: 199,
      currency: 'USD',
      period: 'month',
      description: 'For large organizations',
      button: 'Contact Sales',
      featuresTitle: 'Everything in Professional, plus:',
      features: [
        'Unlimited contacts',
        'Custom integrations',
        'Unlimited users',
        'Custom analytics',
        '24/7 phone support',
        'Dedicated account manager'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business. All plans paid annually with 10,000 contacts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                'rounded-xl border bg-white p-8 flex flex-col shadow-sm transition-transform',
                plan.popular && 'border-blue-600 shadow-lg scale-105 bg-blue-50 relative z-10',
                !plan.popular && 'border-gray-200',
              )}
            >
              {plan.popular && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                  MOST POPULAR
                </span>
              )}
              <h3 className="text-xl font-bold mb-2 text-center">{plan.name}</h3>
              <div className="text-center mb-2">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-base text-gray-500 font-medium"> {plan.currency}/<span className="text-sm">{plan.period}</span></span>
              </div>
              <div className="text-center text-gray-500 text-sm mb-6">
                {plan.description}
              </div>
              <Button className="w-full mb-6" variant={plan.popular ? 'primary' : 'outline'}>
                {plan.button}
              </Button>
              <div className="font-semibold mb-2 text-gray-900">{plan.featuresTitle}</div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}