import { cn } from '@/lib/utils'
import React from 'react'

interface FlexInterface {
    children: React.ReactNode
    className?: string
}

function Flex({children, className}:FlexInterface ) {
  return (
    <div className={cn(`flex items-center lg:flex-row flex-col gap-4 *:flex-1`, className)}>{children}</div>
  )
}

export default Flex