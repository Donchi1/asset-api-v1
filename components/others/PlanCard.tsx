"use client"

import { InvestmentPlan } from '@/types/plan'
import { Card } from '../ui/card'




 interface PlanDisplayProps {
    plan: InvestmentPlan
    onMakeDeposit: (plan: InvestmentPlan) => void
  }

export function PlanCard({ plan, onMakeDeposit }: PlanDisplayProps) {
  const isPopular = plan.isPopular
  const isVip = plan.isVip

  return (
    <Card
      className={`relative overflow-hidden animate-in rounded-2xl bg-primary-blue/30 fade-in-50 shadow-primary-gray/30 border-0 duration-500 zoom-in  ${
        isPopular || isVip ? 'scale-110' : 'scale-1'
      } p-6`}
    >
      {isPopular || isVip && (
        <div className="absolute -right-12 top-7 rotate-45 bg-primary px-14 py-1 text-xs font-medium text-primary-blue shadow-md">
          {isPopular ? "Popular" : "Vip"}        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
        <div className="mt-2 flex items-baseline">
          <span className="text-4xl font-bold text-primary">{plan.profitPercentage}%</span>
          <span className="ml-1 text-sm text-primary-gray">Of the profits</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm text-primary-gray">Min Deposit</div>
          <div className="text-lg font-semibold text-primary">
            {plan.minDeposit} <span className="text-sm">USD</span>
          </div>
        </div>

        <div>
          <div className="text-sm text-primary-gray">Max Deposit</div>
          <div className="text-lg font-semibold text-primary">
            {plan.maxDeposit} <span className="text-sm">USD</span>
          </div>
        </div>

        <div>
          <div className="text-sm text-primary-gray">Withdraw Amount</div>
          <div className="text-lg font-semibold text-primary">
            {plan.minWithdraw} <span className="text-sm">USD</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onMakeDeposit(plan)}
        className={`mt-6 w-full rounded-lg ${
          isPopular || isVip
            ? 'bg-primary text-primary-blue  shadow-neon-cyan hover:scale-105 transition-all ease-linear'
            : 'bg-transparent hover:text-primary-blue text-primary hover:shadow-none shadow-[0_0px_3px_rgb(0,0,0,0.05)] shadow-primary hover:bg-primary'
        } py-3 text-sm font-medium transition-all`}
      >
        Get Started
      </button>
    </Card>
  )
}

