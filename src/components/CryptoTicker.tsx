import React, { useEffect, useState } from 'react';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: string;
}

export function CryptoTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([
    { symbol: "BTC", name: "BITCOIN", price: "65,890.70" },
    { symbol: "ETH", name: "ETHEREUM", price: "3,590.20" },
    { symbol: "DOGE", name: "DOGECOIN", price: "0.26" },
    { symbol: "DYDX", name: "DYDX", price: "3.76" },
    { symbol: "OP", name: "OPTIMISM", price: "3.45" },
    { symbol: "AAVE", name: "AAVE", price: "150.48" },
    { symbol: "UNI", name: "UNISWAP", price: "11.57" },
  ]);

  return (
    <div className="w-full bg-white py-4 overflow-hidden">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...prices, ...prices].map((crypto, index) => (
          <div key={index} className="flex items-center gap-2 mx-8">
            <span className="text-[#1A181B] text-lg">►</span>
            <span className="text-[#1A181B] font-['Aeonik_Pro'] uppercase">
              {crypto.name} ({crypto.symbol})
            </span>
            <span className="text-[#1A181B] font-['Aeonik_Pro']">
              ${crypto.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 