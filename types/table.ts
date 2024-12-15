import { FieldValue } from "firebase/firestore"

export type HistoryType = {
  coin: "bitcoin" | "ethereum" | "tether"
  amount: string
  status: "pending" | "success" | "failed"
  type: "deposit" | "withdrawal"
  date: FieldValue & { toDate: () => Date }
  symbol: string
  id: string
  uid: string
  icon?: string
}

export type UserDataType = {
  isAdmin: boolean
  occupation: string
  refuser: {
    referred: string[]
    referrer: string
    unpaidref: string[]
    refamount: string
    refcode: string
  }
  verificationCode: string
  verified: boolean
  gender: string
  imgPublicId: string
  state: string
  address: string
  country: string
  uid: string
  mainBalance: string
  postalCode: string
  status: string
  accessCodeProve: string
  date: FieldValue & { toDate: () => Date }
  aboutMe: string
  fullname: string
  phone: string
  username: string
  initialDeposit: string
  disableWithdrawal: boolean
  photo: string
  accessCode: string
  password: string
  interestBalance: string
  city: string
  profit: string
  email: string
  id: string
}
