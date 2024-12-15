import React from 'react'
import { Button } from '../ui/button'
import { ParticleDisplay } from './ParticleDisplay'
import Link from 'next/link'
import Image from 'next/image'

function HomeHero() {
    const currentUser = false
  return (
    <div>
        
       <ParticleDisplay />

      <section className="xl:h-[90vh] lg:h-[80vh] bg-gradient-to-b from-[#1a472a] via-[#1a3147] to-[#1a1a4f] h-auto w-full pt-12" >
        <div className="container-size " >
          <div className="flex justify-around items-center ">
            <div className="">
              <div className="space-y-8 lg:mb-4 mb-14">
                <h2 className="text-5xl  text-primary-light font-bold ">
                  {' '}
                  Asset-api the way to your future
                  investments.
                </h2>
                <p className="mt-2 text-primary-gray/80 text-lg">
                  The future of investment is here. A platform for launching
                  your stable Cryptocurrency investments.
                </p>
                <div className="home_btn">
                  {currentUser ? (
                    <Link href="/user/dashboard" className="btn_one">
                     <Button className="uppercase hover:scale-105 transition-all ease-linear bg-primary hover:bg-primary/80 text-white" >
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>

                      <Link href="/auth/register" >
                      <Button className="uppercase hover:scale-105 transition-all ease-linear bg-primary hover:bg-primary/80 text-primary-green" >
                        Create Wallet
                      </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className=" mt-8  hidden lg:block">
              <Image width={500} height={500} className="w-[500px] h-[300px]" src='/images/home-hero1.png' alt="logo" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeHero