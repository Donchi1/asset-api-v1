import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { formatUSD } from '@/lib/utilFunc/converter'
import { TotalAsset } from '@/types/crypto'
import { formatCrypto } from '@/lib/utilFunc/converter'
import Image from 'next/image'


interface TotalAssetCardProps {
  data: TotalAsset
}

export function TotalAssetCard({ data }: TotalAssetCardProps) {
  return (
    <Card className="bg-primary-blue/30  ">
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 mb-2">Total Asset</p>
            <h2 className="text-2xl font-bold mb-1">
              {formatCrypto(data.btcAmount)} BTC
            </h2>
            <p className="text-gray-400">
              {formatUSD(data.usdAmount)}
            </p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">↗</span>
                <span>{formatUSD(data.lowRange)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">↘</span>
                <span>{formatUSD(data.highRange)}</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="">
              <Image className='w-[60px] h-[60px]' src={"/images/wallet.png"} alt='wallet' width={50} height={50} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

