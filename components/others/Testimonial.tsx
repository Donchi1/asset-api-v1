"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from 'embla-carousel-autoplay'
import { MoveLeft, MoveRight, Star } from 'lucide-react'
import Title from "../global/Title"
import Text from "../ui/Text"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: string
  name: string
  location: string
  message: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "JASPER BURGERS",
    location: "Netherlands",
    message: "I just received $4,500 on my bitcoin wallet, my first VIP earning. I'll keep on investing. Thank you so much!",
    rating: 4,
    image: "/images/testi.webp"
  },
  {
    id: "2",
    name: "DONALD JOHNSON",
    location: "United States",
    message: "The platform has exceeded my expectations. The returns have been consistently impressive.",
    rating: 5,
    image: "/images/testi-1.jpg"
  },
  {
    id: "3",
    name: "MARCO ROSSI",
    location: "Italy",
    message: "Excellent service and support. The investment process is straightforward and transparent.",
    rating: 4,
    image: "/images/testi-2.jpg"
  }
]

export function CustomerFeedback() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative overflow-hidden bg-primary-blue/95 px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="text-4xl ">
          <Title label="Customer Feedback" />
        </div>

        <div className="mt-16">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="relative flex-[0_0_100%] px-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="flex gap-4  items-center">
                        <div className=" h-[2px] w-52 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                        <img
                          src={testimonial.image}
                          alt=""
                          className="relative z-10 h-24 w-24 rounded-full object-cover"
                        />
                        <div className="w-52 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                      </div>
                    </div>

                    <blockquote className="mt-8 text-center">
                      <Text className="text-sm">
                        {testimonial.message}
                      </Text>
                    </blockquote>

                    <div className="mt-4 text-center">
                      <div className="text-lg font-semibold text-emerald-400">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonial.location}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < testimonial.rating
                              ? "fill-emerald-400 text-emerald-400"
                              : "fill-zinc-700 text-zinc-700"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-4 top-[70%] hidden md:block -translate-y-1/2 transform rounded-full p-2 text-emerald-400 hover:bg-emerald-400/10"
            aria-label="Previous slide"
          >
            <MoveLeft className="h-8 w-8" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-4 top-[70%] hidden md:block -translate-y-1/2 transform rounded-full p-2 text-emerald-400 hover:bg-emerald-400/10"
            aria-label="Next slide"
          >
            <MoveRight className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerFeedback
