import { Input } from "@/components/ui/input"
import { handleCopy } from "@/lib/utilFunc/handleCopy"
import { Copy } from "lucide-react"

interface ReferralLinkProps {
  data: string
}

export function ReferralLink({ data }: ReferralLinkProps) {
  return (
    <div className="mt-12">
      <h2 className="text-lg font-medium mb-4">
        <span className="text-primary-gray">REFERRAL LINK</span>
      </h2>
     <div className="!bg-primary-blue/30 pr-2 rounded-full flex justify-between items-center shadow-sm shadow-primary-gray/20  ">

      <Input 
        value={data}
        readOnly
        className=" w-[90%] !border-none !outline-none focus-visible:ring-0 focus:!border-none text-primary-light"
        />
         <Copy size={18} className="text-primary cursor-pointer" onClick={() => handleCopy(data)} />
        </div>
     
    </div>
  )
}

