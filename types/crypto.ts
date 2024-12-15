import { FieldValue } from "firebase/firestore"

export interface CryptoBalance {
    coin: string
    symbol: string
    total: string
    totalUsd?: number
    availableUsd?: number
    available?: number
    lastFunded: any
  }
  
  export interface CryptoPrice {
    symbol: string
    price: number
    change24h: number
  }
  
  export interface TotalAsset {
    btcAmount: number
    usdAmount: number
    lowRange: number
    highRange: number
  }
  
  export interface CryptoRate {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    price_change_percentage_24h: number,
    low_24h: number
    high_24h: number
  }
  

export type WalletType = {
  uid?: string
  lastFunded: FieldValue & {toDate:() => Date}
  network: string,
  date:FieldValue,
  address: string;
  symbol: string;
  total: string,
  coin: string;
  id?: string
}
  