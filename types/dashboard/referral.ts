export interface ReferralStats {
    totalReferrals: number
    unpaidReferrals:  number,
    totalCommission: number
    refAmount: number
  }
  
  export interface ReferralLinkType {
    url: string
    upline: string | null
  }
  
  export interface UserWallet {
    balance: number
    currency: string
  }
  