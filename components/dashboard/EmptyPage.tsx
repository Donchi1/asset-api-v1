import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

type EmptyPageType = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  showButton?: boolean
}

export const EmptyPage: React.FC<EmptyPageType> = ({ text, onClick, showButton = true }) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col gap-4 mt-6'>
        <Image
          src={`/images/box.png`}
          alt="No wallet"
          width={100}
          height={100}
          className="w-[150px]"
        />
        <p className='text-primary-light text-center'>
          {text}
        </p>
        {showButton && <div className='text-center'>

          <Button onClick={onClick} className='text-primary-blue hover:bg-primary '>Add Wallet</Button>
        </div>}
      </div>
    </div>
  )
}




