import { cn } from '@/lib/utils'
import React from 'react'

function Text({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <p className={cn("text-primary-gray/90 text-lg tracking-wide leading-relaxed ", className)}>
            {children}
        </p>
    )
}

export default Text