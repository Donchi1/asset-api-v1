import { Card, CardContent } from "@/components/ui/card"
import { formatUSD } from "@/lib/utilFunc/converter"
import { formatCrypto } from "@/lib/utilFunc/converter"
import Image from "next/image"

interface CryptoCardProps {
  symbol: string
  name: string
  amount: number
  value: number
}

export function CryptoCard({ symbol, name, amount, value }: CryptoCardProps) {

  return (
    <Card className="bg-primary-blue/30 ">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Image src={`/images/${name}.png`} alt={name} width={32} height={32} />
          <div>
            <p className="font-semibold">{symbol}</p>
            <p className="text-xs text-gray-400">{name}</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-lg font-bold">{formatCrypto(amount, 8)}</p>
          <p className="text-sm text-gray-400">{formatUSD(value)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

