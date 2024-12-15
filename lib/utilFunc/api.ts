"use server"
import axios from 'axios'

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3'

export async function fetchCryptoRates() {
  try {
    const response = await axios.get(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    )
    return response.data
   
  } catch (error: any) {
    console.log(error?.response?.data)
  }

  
}

