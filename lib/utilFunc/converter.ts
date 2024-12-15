const FORMTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
})

export default function formatCurrency(currency:number) {
  return FORMTER.format(currency)
}


export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatCrypto(amount: number, decimals: number = 8): string {

  // Format the number to two decimal places and parse it back as a float
  return parseFloat(amount.toFixed(decimals)).toString()
}


export const getDaysDifference = (startDate: Date, endDate: Date) => {
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}




