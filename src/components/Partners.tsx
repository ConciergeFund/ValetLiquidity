import React from 'react';

interface PartnersProps {
  isMobile?: boolean;
}

export function Partners({ isMobile = false }: PartnersProps) {
  const partners = [
    { name: 'Jupiter', logo: '/partners/jupiter.svg', url: 'https://jup.ag/' },
    { name: 'Orca', logo: '/partners/orca.svg', url: 'https://www.orca.so/' },
    { name: 'Meteora', logo: '/partners/meteora.svg', url: 'https://meteora.ag/' },
    { name: 'Daos.fun', logo: '/partners/daosfun.svg', url: 'https://daos.fun/' },
    { name: 'Uniswap', logo: '/partners/uniswap.svg', url: 'https://uniswap.org/' },
    { name: 'Sushi swap', logo: '/partners/sushiswap.svg', url: 'https://www.sushi.com/' },
    { name: 'dYdX', logo: '/partners/dydx.svg', url: 'https://dydx.exchange/' },
    { name: 'Pancakeswap', logo: '/partners/pancakeswap.svg', url: 'https://pancakeswap.finance/' },
    { name: 'Mexc', logo: '/partners/mexc.svg', url: 'https://www.mexc.com/' },
    { name: 'BingX', logo: '/partners/bingx.svg', url: 'https://bingx.com/' },
    { name: 'KuCoin', logo: '/partners/kucoin.svg', url: 'https://www.kucoin.com/' },
    { name: 'Hyperliquid', logo: '/partners/hyperliquid.svg', url: 'https://hyperliquid.xyz/' }
  ];

  if (isMobile) {
    return (
      <div className="grid grid-cols-3 gap-x-8 gap-y-12">
        {partners.map((partner, index) => (
          <img 
            key={index}
            src={partner.logo} 
            alt={partner.name} 
            className="w-4/5 mx-auto aspect-square object-contain [filter:brightness(0)_invert(89%)_sepia(8%)_saturate(73%)_hue-rotate(314deg)_brightness(97%)_contrast(92%)]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative z-10 mt-60 w-screen bg-[#1C2536] left-[calc(-50vw+50%)] right-[calc(-50vw+50%)]">
      <div className="container mx-auto py-20">
        <h3 className="text-3xl md:text-4xl font-['Aeonik_Pro'] font-light mb-16 ml-0 md:-ml-8 text-[#E5E5E5]">
          / Our <span className="font-[Ogg] italic">partners</span>
        </h3>
        <div className="grid grid-cols-4 gap-x-32 gap-y-24 ml-8">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center"
            >
              <a 
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-24 w-auto object-contain [filter:brightness(0)_invert(88%)_sepia(7%)_saturate(114%)_hue-rotate(7deg)] opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 