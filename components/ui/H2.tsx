import { cn } from '@/lib/utils'
import React from 'react'

interface H2Interface {
    children:React.ReactNode
    className?: string
}
function H2({children, className}:H2Interface) {
  return (
    <h2 className={cn("font-bold text-primary-light text-xl", className)}>{children}</h2>        
  )
}

export default H2