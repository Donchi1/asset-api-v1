import { Button } from "@/components/ui/button"
import { HistoryType, UserDataType } from "@/types/table"
import { ColumnDef } from "@tanstack/react-table"
import { clsx, type ClassValue } from "clsx"
import { ArrowUpDown, Edit, Trash } from "lucide-react"
import moment from "moment"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import handleStatus from "./utilFunc/handleStatus"
import { deleteDoc, doc, DocumentData } from "firebase/firestore"
import { ReferralStats } from "@/types/dashboard/referral"
import formatCurrency, { getDaysDifference } from "./utilFunc/converter"
import { toast } from "@/hooks/use-toast"
import { db } from "@/db/firebaseConfig"
import Link from "next/link"
import { InvestmentPlan, InvestmentType } from "@/types/plan"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getWalletSymbol = (type: "ethereum" | "tether" | "bitcoin") => {
  if (type === "ethereum") return "eth"
  if (type === "tether") return "usdt"
  if (type === "bitcoin") return "btc"

}

const handleDelete = async (id: string, cols:string) => {
  try {
    await deleteDoc(doc(db, cols, id))
    toast({ description: "Item Successfully deleted", variant: "success" })
  } catch (error: any) {
    toast({ description: error?.message, variant: "destructive" })
  }
}




export const columns: ColumnDef<HistoryType>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      return (
        <div>
          <Image
            src={`/images/${row.getValue("coin")}.png`}
            alt="icon"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>

      )
    },
  },
  {
    accessorKey: "coin",
    header: "Coins"
  },
  {
    accessorKey: "symbol",
    header: "Symbol"
  },
  {
    accessorKey: "type",
    header: "Type"
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span>{formatCurrency(row.getValue("amount"))}</span>
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as any
      const formatedDate = moment(date?.toDate() as Date).format("ll")
      return <span>{formatedDate}</span>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => handleStatus(row.getValue("status"))
  },

]

export const referralLinkInfo = (currentUser: DocumentData | null | undefined) => `https://asset-api.info/?ref=${currentUser?.refuser.refcode}`

export const referralStats = (currentUser: DocumentData | null | undefined): ReferralStats => ({
  totalReferrals: currentUser?.refuser?.referred?.length,
  unpaidReferrals: currentUser?.refuser?.unpaidref?.length,
  totalCommission: currentUser?.refuser?.referred?.length * Number(currentUser?.refuser?.refamount),
  refAmount: Number(currentUser?.refuser?.refamount)
})



export const columnHistory: ColumnDef<HistoryType>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      return (
        <div>
          <Image
            src={`/images/${row.getValue("coin")}.png`}
            alt="icon"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>

      )
    },
  },
  {
    accessorKey: "coin",
    header: ({ column }) => {
      return (
        <Button
        className="text-primary-light"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Coin
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
        className="text-primary-light"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fullname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
        className="text-primary-light"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "symbol",
    header: ({ column }) => {
      return (
        <Button
        className="text-primary-light"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Symbol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
        className="text-primary-light"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({row}) => <span>{formatCurrency(row.getValue("amount"))}</span>
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
        className="text-primary-light"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const formatedDate = moment(row.original.date.toDate() as Date).format("ll")
      return <span>{formatedDate}</span>
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
        className="text-primary-light"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    
    accessorKey: "Actions",
    cell: ({ row }) => {
      const uid = row.original.uid;
      const id = row.original.id
      return (
        <div className="flex gap-2">
          <Link href={`/admin/dashboard/transactions/edit/${uid}/${id}`}>
          <Button title='Edit' variant="outline" size="sm" className="text-green-500 border-green-500 hover:bg-green-500/10">
            <Edit />
          </Button>
          </Link>
          <Button onClick={() => handleDelete(row.original.id as string, `transactions/${row.getValue("uid")}`)} title='Delete' variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500/10">
            <Trash />
          </Button>
        </div>
      )
    },
  },

]

export const columnInvestment: ColumnDef<InvestmentType>[] = [

  {
    accessorKey: "plan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plans
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => <span>{formatCurrency(row.getValue("amount"))}</span>
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fullname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => <span>{formatCurrency(row.getValue("amount"))}</span>
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => <span>{formatCurrency(row.getValue("amount"))}</span>
  },
  {
    accessorKey: "desc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          StartDate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) =>  <div>{moment(row.getValue("startDate")).format("ll")}</div>
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          EndDate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) =>  <div>{moment(row.getValue("endDate")).format("ll")}</div>
  },

  {
    accessorKey: "",
    header: "RDays",
    cell: ({ row }) => {
      const sDate = row.getValue("startDate") as Date
      const eDate = row.getValue("endDate") as Date
      return  <div className='uppercase'>{getDaysDifference(new Date(sDate), new Date(eDate))}</div>
    }
  },
  {
    accessorKey: "expProfit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Exp Profit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const uid = row.original.uid;
      const id = row.original.id;
  
      return (
        <div className="flex gap-2">
          <Link href={`/admin/dashboard/investments/edit/${uid}/${id}`}>
          <Button title='Edit' variant="outline" size="sm" className="text-green-500 border-green-500 hover:bg-green-500/10">
            <Edit />
          </Button>
          </Link>
          <Button onClick={() => handleDelete(row.getValue("id") as string, `transactions/${row.getValue("uid")}`)} title='Delete' variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500/10">
            <Trash />
          </Button>
        </div>
      )
    },
  },

]


export const columnUsers: ColumnDef<UserDataType>[] = [
  {
    accessorKey: "photo",
    header: "User",
    cell: ({row}) => {
      return (
        <div className="flex gap-2 items-center  ">
          <Image
            height={100}
            width={100}
            src={row.original.photo}
            alt="pics"
            className="rounded-full size-[10px] object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fullname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "accessCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Access Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          State
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-primary-light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({row}) => {
      return (
        <div className="flex gap-2">
          <Link href={`/admin/dashboard/users/edit/${row.original.id}`}>
          <Button title='Edit' variant="outline" size="sm" className="text-green-500 border-green-500 hover:bg-green-500/10">
            <Edit />
          </Button>
          </Link>
          <Button onClick={() => handleDelete(row.original.id , `users`)} title='Delete' variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-500/10">
            <Trash />
          </Button>
        </div>
      );
    },
  },
];


export const investmentPlans: InvestmentPlan[] = [
  {
    id: 'starter',
    name: 'STARTER PACK',
    profitPercentage: 60,
    minDeposit: 100,
    maxDeposit: 200,
    minWithdraw: "600 - 1000",
    type: 'STANDARD'
  },
  {
    id: 'bronze',
    name: 'BRONZE PACK',
    profitPercentage: 70,
    minDeposit: 500,
    maxDeposit: 600,
    minWithdraw: "2500 - 3000",
    type: 'STANDARD',
    isPopular: true
  },
  {
    id: 'gold',
    name: 'GOLD PACK',
    profitPercentage: 65,
    minDeposit: 300,
    maxDeposit: 400,
    minWithdraw: "1500 - 2000",
    type: 'STANDARD'
  },
  
  {
    id: 'platinum',
    name: 'PLATINUM PACK',
    profitPercentage: 75,
    minDeposit: 700,
    maxDeposit: 900,
    minWithdraw: "3500 - 4500" ,
    type: 'ULTIMATE'
  },
  {
    id: 'vip',
    name: 'VIP PACK',
    profitPercentage: 80,
    minDeposit: 1000,
    maxDeposit: 2000,
    minWithdraw: "5000 - 10000",
    isVip: true,
    type: 'ULTIMATE'
  },
  {
    id: 'global',
    name: 'GLOBAL PACK',
    profitPercentage: 95,
    minDeposit: 3000,
    maxDeposit: 5000,
    minWithdraw: "15000 - 30000",
    type: 'ULTIMATE'
  }
]