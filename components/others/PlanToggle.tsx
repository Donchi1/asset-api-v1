"use client"

import { PlanType } from "@/types/plan"


interface PlanToggleProps {
  selectedPlan: PlanType
  onChange: (plan: PlanType) => void
}

export function PlanToggle({ selectedPlan, onChange }: PlanToggleProps) {
  return (
    <div className="relative flex rounded-full  bg-navy-800 p-1 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
      <div
        className={`${selectedPlan === "STANDARD"? "translate-x-0": "translate-x-[95%]"} w-[50%] transition-all ease-linear absolute inset-y-1 rounded-full bg-primary`}
      />
      <button
        onClick={() => onChange('STANDARD')}
        className={`relative z-10 rounded-full px-8 py-2  text-sm font-medium transition-colors ${
          selectedPlan === 'STANDARD' ? 'text-primary-blue' : 'text-primary-light'
        }`}
      >
        STANDARD PLANS
      </button>
      <button
        onClick={() => onChange('ULTIMATE')}
        className={`relative z-10 rounded-full px-8 py-2 text-sm font-medium transition-colors ${
          selectedPlan === 'ULTIMATE' ? 'text-primary-blue' : 'text-primary-light'
        }`}
      >
        ULTIMATE PLANS
      </button>
    </div>
  )
}

