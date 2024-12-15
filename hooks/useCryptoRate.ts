import { useState, useEffect, useCallback } from "react";
import { fetchCryptoRates } from "@/lib/utilFunc/api";
import { CryptoBalance, CryptoRate, TotalAsset } from "@/types/crypto";

export function useCryptoRates(initialBalances: CryptoBalance[]) {
  const [balances, setBalances] = useState<CryptoBalance[]>([]);
  const [rates, setRates] = useState<CryptoRate[]>([]);


  
  useEffect(() => {
    setBalances(initialBalances)
  },[initialBalances])
 
  const fetchRates = useCallback(async () => {
    try {
      const fetchedRates = await fetchCryptoRates();
      setRates(fetchedRates);

      setBalances((prevBalances) =>
        prevBalances.map((balance) => {
          const rate = fetchedRates?.find(
            (r:any) => r.symbol.toLowerCase() === balance.symbol.toLowerCase()
          );
          if (rate) {
            const totalAmount = parseFloat(balance.total.split(" ")[0]);
            return {
              ...balance,
              totalUsd: totalAmount * rate.current_price,
              availableUsd: parseFloat(totalAmount.toString()) * rate.current_price,
            };
          }
          return balance;
        })
      );
    } catch (error) {
      console.error("Failed to fetch rates:", error);
    }
  }, []);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, [fetchRates]);


  return { balances, rates };
}
