import Image from 'next/image'
import React from 'react'

function LoadingPage() {
  return (
    <section className='min-h-screen w-full  main-gradient !bg-gradient-to-br'>
        <div className='flex justify-center items-center h-screen'>
            <Image className='w-[100px] h-[100px] animate-spin' alt='loading' width={300} height={400} src="/images/loading.png" />
        </div>
    </section>
  )
}

export default LoadingPage