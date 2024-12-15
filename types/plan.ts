import { FieldValue } from "firebase/firestore"

export type PlanType = 'STANDARD' | 'ULTIMATE'
export type BillingPeriod = 'MONTHLY' | 'ANNUALLY'

export interface InvestmentPlan {
  id: string
  name: string
  profitPercentage: number
  minDeposit: number
  maxDeposit: number
  minWithdraw: string
  type: PlanType
  isPopular?: boolean
  isVip?: boolean
}

export interface PlanDisplayProps {
  plan: InvestmentPlan
  billingPeriod: BillingPeriod
  onMakeDeposit: (plan: InvestmentPlan) => void
}


export type InvestmentType =   {
  id: string
  uid: string
  email: string,
  fullname: string,
  plan: string
  amount: string
  desc: string
  date: FieldValue
  startDate: string
  endDate: string
  expProfit: string
  status: "completed"|"inProgress"|"failed"
}
