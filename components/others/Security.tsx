import Image from 'next/image'
import React from 'react'


const imgLinks = [
    "/images/secure_logo_3.png",
    "/images/secure_logo_2.png",
    "/images/secure_logo_4.png",
    "/images/secure_logo_06.png",
    "/images/secure_logo_5.png",
    "/images/secure_logo_012.png"

]

function Security() {
    return (
        <div>
            <div className='flex gap-2'>
                {imgLinks.map(each => (
                    <Image key={each} width={300}
                        alt='security'
                        height={400} src={each}
                        className='border border-primary/30 p-1 rounded-[8px] w-[70px]'
                    />
                ))}


            </div>
        </div>
    )
}

export default Security