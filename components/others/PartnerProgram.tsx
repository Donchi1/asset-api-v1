import React from 'react'
import { ParticleDisplay } from './ParticleDisplay'
import { TradingWidgetScroll } from './TradingWidget'
import Title from '../global/Title'
import Text from '../ui/Text'

interface LevelItem {
  percentage: number
  level: string
  isRepresentative?: boolean
}

const leftLevels: LevelItem[] = [
  { percentage: 10, level: '1st Level' },
  { percentage: 5, level: '2nd Level' },
  { percentage: 2, level: '3rd Level' },
]

const rightLevels: LevelItem[] = [
  { percentage: 20, level: 'for Representatives', isRepresentative: true },
  { percentage: 10, level: 'for Representatives', isRepresentative: true },
  { percentage: 5, level: 'for Representatives', isRepresentative: true },
]

function PercentageItem({ percentage, level, isRepresentative }: LevelItem) {
  return (
    <div className="flex items-center gap-4 mb-6 last:mb-0 ">
      <span className="text-2xl font-bold text-primary-light flex items-start">
        {percentage}
        <span className="text-lg mt-1">%</span>
      </span>
      <span className="text-primary-gray/90 text-sm block">
        {isRepresentative ? (
          <span>{level}</span>
        ) : (
          <span>
            <span className="font-bold">{level.split(' ')[0]}</span> {level.split(' ')[1]}
          </span>
        )}
      </span>
    </div>
  )
}

export default function PartnerProgram() {
  return (
    <section className="relative w-full min-h-[60vh] bg-gradient-to-r from-primary-green via-[#1a3147] to-[#1a1a4f] overflow-hidden">
      <div className="container-size mx-auto  py-20 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between  gap-12">
          <div className="lg:w-1/2">
          <Title className='mb-4'  label='Partners Program' />
            <Text className="max-w-2xl">
              The part of company's income is formed by the production of digital currencies. 
              The trading allows us to get extra quantity of cryptocurrency due to Crypto Trader.
            </Text>
          </div>
          
          <div className="flex gap-4 lg:gap-0 flex-col md:flex-row  lg:w-1/2 ">
            <div className="flex-1  bg-primary-blue/20 shadow-primary/40  p-4 shadow-sm rounded-sm">
              {leftLevels.map((item, index) => (
                <PercentageItem key={index} {...item} />
              ))}
            </div>
            
            <div className="flex-1  bg-primary-green/10 p-4 shadow-sm shadow-primary/40  rounded-sm">
              {rightLevels.map((item, index) => (
                <PercentageItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10">
        <TradingWidgetScroll />
      </div>
    </section>
  )
}

