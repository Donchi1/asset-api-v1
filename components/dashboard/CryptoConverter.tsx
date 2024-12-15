'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CryptoRate } from '@/types/crypto'
import { fetchCryptoRates } from '@/lib/utilFunc/api'


export function CryptoConverter() {
  const [rates, setRates] = useState<CryptoRate[]>([])
  const [amount, setAmount] = useState<string>('1')
  const [fromCurrency, setFromCurrency] = useState<string>('bitcoin')
  const [toCurrency, setToCurrency] = useState<string>('ethereum')

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const fetchedRates = await fetchCryptoRates()
        setRates(fetchedRates)
      } catch (error) {
        console.log('Failed to fetch rates:', error)
      }
    }
    fetchRates()
    const interval = setInterval(fetchRates, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const fromRate = rates?.find(rate => rate.id === fromCurrency)?.current_price || 0
  const toRate = rates?.find(rate => rate.id === toCurrency)?.current_price || 0
  const convertedAmount = fromRate && toRate ? (parseFloat(amount) * (fromRate / toRate)).toFixed(8) : '0'

  return (
    <Card className="bg-primary-blue/30 text-white">
      <CardHeader>
        <CardTitle>Crypto Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1  text-white hover:border-primary py-3 px-2 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full"
            />
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className=" text-white hover:border-primary py-6 px-2 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-[180px] ">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a2c2c] border-gray-700">
                {rates?.length > 0 && rates.map((rate) => (
                  <SelectItem key={rate.id} value={rate.id} className="text-white">
                    {rate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-4">
            <Input
              type="text"
              value={convertedAmount}
              readOnly
              className="flex-1  text-white hover:border-primary py-3 px-2 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full"
            />
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className=" text-white hover:border-primary py-6 px-2 focus:border-primary transition-colors ease-linear duration-500 outline-none bg-transparent border-gray-700 border rounded-full w-[180px] ">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a2c2c] border-gray-700">
                {rates?.length > 0 && rates.map((rate) => (
                  <SelectItem key={rate.id} value={rate.id} className="text-white">
                    {rate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

