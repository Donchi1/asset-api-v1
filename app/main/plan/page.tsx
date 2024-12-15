"use client"

import { useState } from 'react'
import { InvestmentPlan, PlanType } from '@/types/plan'
import { PlanCard } from '@/components/others/PlanCard'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import { PlanToggle } from '@/components/others/PlanToggle'
import { auth } from '@/db/firebaseConfig'
import { useRouter } from 'next/navigation'
import { investmentPlans } from '@/lib/utils'





export default function InvestmentPage() {
  const [selectedPlanType, setSelectedPlanType] = useState<PlanType>('STANDARD')
const router = useRouter()

  const filteredPlans = investmentPlans.filter(plan => plan.type === selectedPlanType)

  const handleMakeDeposit = (plan: InvestmentPlan) => {
    if(auth.currentUser) return router.push(`/dashboard/deposit?plan=${JSON.stringify(plan)}`)
     return router.push("/auth/login")
  }

  return (
    <>
    <Header />
    <div className="min-h-screen main-gradient !bg-gradient-to-br pb-20"> 
      <main className="container-size pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-light ">
            INVESTMENT OFFERS
          </h1>
          <p className="mt-4 text-lg text-primary">Choose your plans</p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8">
         <PlanToggle selectedPlan={selectedPlanType} onChange={(plan) => setSelectedPlanType(plan)} />
          <p className="max-w-2xl text-center text-[17px] leading-snug text-primary-gray">
            You cannot withdraw from your principal balance until at least 5 days has passed from the deposit
            date. However, you can withdraw the profits earned during this period.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {filteredPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onMakeDeposit={handleMakeDeposit}
            />
          ))}
        </div>
      </main>
    </div>
    <Footer />
    </>
  )
}

