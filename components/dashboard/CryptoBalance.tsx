import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { CryptoBalance } from '@/types/crypto'
import { formatUSD } from '@/lib/utilFunc/converter'
import { Banknote, Landmark } from 'lucide-react'
import { useRouter } from 'next/navigation'
import moment from 'moment'


interface CryptoBalanceTableProps {
  balances: CryptoBalance[]
}

export function CryptoBalanceTable({ balances }: CryptoBalanceTableProps) {
  const router = useRouter()


  return (
  
      
    <Table>
      <TableHeader>
        <TableRow className="border-gray-800 ">
          <TableHead className="text-gray-400">Coin</TableHead>
          <TableHead className="text-gray-400">Total</TableHead>
          <TableHead className="text-gray-400">Available Amount</TableHead>
          <TableHead className="text-gray-400">Last Funded</TableHead>
          <TableHead className="text-gray-400">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {balances?.map((balance) => (
          <TableRow key={balance?.symbol} className="border-gray-800">
            <TableCell className="font-medium ">
              <div className="flex items-center gap-2">
                <Image
                  src={`/images/${balance?.coin}.png`}
                  alt={balance?.coin}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold">{balance?.coin}</div>
                  <div className="text-sm text-gray-400">{balance?.symbol}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div>{balance?.total}</div>
              <div className="text-sm text-gray-400">{formatUSD(balance?.totalUsd || 0)}</div>
            </TableCell>
            <TableCell>
              <div>{balance?.available}</div>
              <div className="text-sm text-gray-400">{formatUSD(balance?.availableUsd || 0)}</div>
            </TableCell>
            <TableCell>
              <div>{moment(balance?.lastFunded.toDate() as Date).format("ll")}</div>

            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button onClick={() => router.push("/dashboard/deposit")} title='Deposit' variant="outline" size="sm" className="text-green-500 border-green-500 hover:bg-green-500/10">
                  
                  <Landmark />
                </Button>
                <Button onClick={() => router.push("/dashboard/withdrawal")} title='Withdrawal' variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500/10">
                  <Banknote />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
 
  )
}

