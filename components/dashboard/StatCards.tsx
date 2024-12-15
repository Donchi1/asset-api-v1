import { Users2, Trophy, Target } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { ReferralStats } from "@/types/dashboard/referral"
import formatCurrency from '@/lib/utilFunc/converter'

interface StatsCardsProps {
  stats: ReferralStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      <Card className="bg-primary-blue/30">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient main-gradient p-3 rounded-full">
              <Users2 className="h-6 w-6 text-primary/60" />
            </div>
            <div>
              <p className="text-primary-gray">Referrals:</p>
              <p className="text-primary-gray text-2xl font-bold">{stats?.totalReferrals}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-primary-blue/30">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
          <div className="bg-gradient main-gradient p-3 rounded-full">
              <Trophy className="h-6 w-6 text-primary/60" />
            </div>
            <div>
              <p className="text-primary-gray">Ref Amount</p>
              <p className="text-primary-gray text-2xl font-bold">{formatCurrency(stats?.refAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-primary-blue/30">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
          <div className="bg-gradient main-gradient p-3 rounded-full">
              <Trophy className="h-6 w-6 text-primary/60" />
            </div>
            <div>
              <p className="text-primary-gray">Unpaid referrals:</p>
              <p className="text-primary-gray text-2xl font-bold">{stats.unpaidReferrals}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-primary-blue/30">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
          <div className="bg-gradient main-gradient p-3 rounded-full">
              <Target className="h-6 w-6 text-primary/60" />
            </div>
            <div>
              <p className="text-primary-gray">Total referral commission:</p>
              <p className="text-primary-gray text-2xl font-bold">
                {formatCurrency(stats?.totalCommission)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

