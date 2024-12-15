"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { CryptoBalanceTable } from "@/components/dashboard/CryptoBalance"
import { CryptoCard } from "@/components/dashboard/CryptoCard"
import { CryptoConverter } from "@/components/dashboard/CryptoConverter"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { TotalAssetCard } from "@/components/dashboard/TotalAsset"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardHeader } from "@/components/ui/card"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useCryptoRates } from "@/hooks/useCryptoRate"
import { CryptoBalance, TotalAsset } from "@/types/crypto"
import { useRouter } from "next/navigation"
import { ReferralLink } from "@/components/dashboard/ReferrerLink"
import { StatsCards } from "@/components/dashboard/StatCards"
import SubHeader from "@/components/dashboard/SubHeader"
import { referralLinkInfo, referralStats } from "@/lib/utils"
import { useAuthStore } from "@/store/authStore"
import LoadingPage from "@/components/global/LoadingPage"
import useCollectionGroup from "@/hooks/UseCollectionGroup"


export default function Page() {
  const {currentUser} = useAuthStore()
  const [coins, loading] = useCollectionGroup(`coinDatas`) as readonly [CryptoBalance[], boolean, string | null]

 const router = useRouter()
 const { balances, rates } = useCryptoRates(coins);
//
const usdtPrice = rates?.find(each => each.symbol === "usdt")?.current_price || 0
const btcRate = rates?.find(each => each.symbol === "btc")
const btcPrice = btcRate?.current_price || 0
const totalAmount = coins.reduce((acc, {total}) => acc + Number(total), 0)

  const totalAsset : TotalAsset = {
    btcAmount: Number((parseFloat(totalAmount.toString()) * (usdtPrice / btcPrice)).toFixed(8)) || 0,
    usdAmount: totalAmount * usdtPrice,
    lowRange: Number(btcRate?.low_24h) ,
    highRange: Number(btcRate?.high_24h)
  }




  if(loading) return <LoadingPage />

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader label="home" />
        <div className="md:p-6 p-4 dash-gradient !bg-gradient-to-br min-h-screen">
        <SubHeader  />

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mb-6">
            <TotalAssetCard data={totalAsset} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['USDT', 'BTC', 'ETH'].map(symbol => {
            const balance = balances?.find(b => b.symbol === symbol.toLowerCase())
            const rate = rates?.find(r => r.symbol === symbol.toLowerCase())

            if (balance && rate) {
              return (
                <CryptoCard
                  key={symbol}
                  symbol={symbol}
                  name={balance.coin}
                  amount={parseFloat(balance.total.split(' ')[0])}
                  value={Number(balance.total)}
                />
              )
            }
            return null
          })}
        </div>
          </div>

          <Card className='bg-primary-blue/30'>
            <div className="mb-6">
              <div className="flex items-center justify-between gap-4 mr-4">
                <CardHeader>
                  <CardTitle>Asset Summary</CardTitle>
                </CardHeader>

                <Button
                onClick={() => router.push("dashboard/history")}
                  variant="outline"
                  className="text-green-500  hover:text-primary-blue border-gray-700 hover:bg-primary transition-all ease-linear"
                >
                  See More
                </Button>
              </div>
            </div>
            <CryptoBalanceTable balances={balances} />
          </Card>
          <div className="mt-8">
            <CryptoConverter />
          </div>
          <div>
        <ReferralLink data={referralLinkInfo(currentUser)} />
        <StatsCards stats={referralStats(currentUser)} />
      </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
