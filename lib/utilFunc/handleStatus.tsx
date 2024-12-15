import { cn } from "../utils"

type StatusType = "success" | "failed" | "pending" 

const statusStyles = {
  success: "border-green-500 text-green-500 bg-green-500/10",
  failed: "border-red-600 text-red-600 bg-red-500/10", 
  pending: "border-yellow-500 text-yellow-500 bg-yellow-500/10",
} as const

const handleStatus = (status: StatusType) => {
  const statusStyle = statusStyles[status] || statusStyles.pending // Fallback to pending if invalid status
  
  return (
    <span className={cn(
      "border rounded-full px-3 py-1.5 font-medium capitalize",
      statusStyle
    )}>
      {status}
    </span>
  )
}

export type { StatusType }



export default handleStatus