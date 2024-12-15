"use client"
import React from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import Title from '../global/Title'

interface Metric {
  value: number
  suffix: string
  title: string
  description: string
  prefix?: string
}

export default function Statistics() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const metrics: Metric[] = [
    {
      value: 5.4,
      suffix: 'M+',
      title: 'Total Users',
      description: 'The total number of registered users on the platform.'
    },
    {
      value: 80,
      suffix: 'K',
      title: 'Active Accounts',
      prefix: '',
      description: 'The total active user functional accounts.'
    },
    {
      value: 100,
      suffix: 'K',
      title: 'Engagement',
      description: "The level of user engagement with our content and features."
    },
    {
      value: 100,
      suffix: 'M+',
      title: 'Total Payout',
      prefix: '$',
      description: 'The total payout for all our active users'
    }
  ]

  return (
    <section className=" py-16 bg-primary-blue">
     <div className='container-size'>

      <div className="max-w-7xl mx-auto">
        <Title  label='Our Statistics'  
        className="text-4xl mb-16 text-center lg:text-start" />
          


        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center text-3xl md:text-5xl font-bold text-primary-light">
                {metric.prefix && <span>{metric.prefix}</span>}
                {inView ? (
                  <CountUp
                    end={metric.value}
                    decimals={metric.value % 1 !== 0 ? 1 : 0}
                    duration={2.5}
                  />
                ) : (
                  <span>0</span>
                )}
                <span className="text-primary">{metric.suffix}</span>
              </div>
              <h3 className="text-xl font-semibold text-primary-gray mt-4 mb-2">
                {metric.title}
              </h3>
              <p className="text-primary-gray/70 text-sm leading-relaxed max-w-[300px] mx-auto">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
     </div>
    </section>
  )
}