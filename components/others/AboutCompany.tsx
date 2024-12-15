import React from 'react'
import Title from '../global/Title'
import { Button } from '../ui/button'
import Text from '../ui/Text'
import Link from 'next/link'

function AboutCompany() {
  return (
    <section className=" py-20 w-full bg-primary-blue/95">
      <div className="container-size   text-primary-green  ">
        <div className='mb-9'>
          <Title label='About Us' className=" text-3xl" />
        </div>
        <div className="flex justify-between flex-col gap-8 md:flex-row">

          <div className="flex-1">
            <img src='/images/about-image.jpg' alt="" className="lg:w-[400px] rounded-sm w-[500px]" />

          </div>
          <div className="flex-1 tracking-wide leading-snug">

            <Text className="mb-4 text-sm">
              Asset-api is a private online cryptocurrency investment company that has been legally registered in united states in 2017. Previously several years we provided lucrative investment services to private clients and have honed our knowledge of how to do business with a small attracted capital. Within that period we have formed our own trading strategy in different markets with the elements of high financial security. The main goal of our work is the safety of funds, and only then following our task is to make high profits.
            </Text>
            <Text className='text-sm'>
              We are the one of few companies which provides an opportunity to earn money on the crypto currency market. Collaboration with us is the guarantee of your stability!
            </Text>
          </div>
        </div>
        <div className='text-right mt-4'>
          <Link href={"/main/about-us"}>
          <Button className='min-w-20 w-40 hover:bg-primary bg-primary text-primary-blue/80 uppercase'>
            More Info
          </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutCompany