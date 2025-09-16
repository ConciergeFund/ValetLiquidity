import React, { useState, useEffect, useRef } from 'react';
import { Toaster } from 'sonner';
import { TalkToValetPopup } from './components/TalkToValetPopup';
import { Menu, X } from 'lucide-react';

function App() {
  const [isTalkToValetOpen, setIsTalkToValetOpen] = useState(false);
  // Force new deployment trigger
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    document.title = 'Valet Liquidity';
    const scrollContainer = scrollContainerRef.current;

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    const animateScroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += velocityRef.current;
        velocityRef.current *= 0.95; // Friction to slow down

        if (Math.abs(velocityRef.current) > 0.1) {
          animationFrameIdRef.current = requestAnimationFrame(animateScroll);
        } else {
          animationFrameIdRef.current = null;
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth >= 768 && scrollContainer) {
        e.preventDefault();
        // Adjust the multiplier for scroll sensitivity
        velocityRef.current += e.deltaY * 0.2;
        
        if (animationFrameIdRef.current === null) {
          animationFrameIdRef.current = requestAnimationFrame(animateScroll);
        }
      }
    };
    
    const handleScroll = () => {
      // Only calculate active section for horizontal scroll on desktop
      if (window.innerWidth < 768) return;

      const container = scrollContainerRef.current;
      if (container) {
        const sections = Array.from(container.children) as HTMLElement[];
        const scrollCenter = container.scrollLeft + container.clientWidth / 2;

        let closestSectionIndex = 0;
        let smallestDistance = Infinity;

        sections.forEach((section, index) => {
          const sectionCenter = section.offsetLeft + section.clientWidth / 2;
          const distance = Math.abs(scrollCenter - sectionCenter);

          if (distance < smallestDistance) {
            smallestDistance = distance;
            closestSectionIndex = index;
          }
        });
        
        setActiveSection(closestSectionIndex);
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (index: number) => {
    const section = sectionRefs.current[index];
    if (section) {
      if (isDesktop) {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
          scrollContainer.scrollTo({
            left: section.offsetLeft,
            behavior: 'smooth',
          });
        }
      } else {
        const yOffset = -72; // Header height
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    scrollToSection(index);
    setIsMobileMenuOpen(false);
  };

  const handleTalkToValet = () => {
    setIsTalkToValetOpen(true);
  };

  const socialsBackground = isDesktop
    ? { background: 'linear-gradient(to right, #6D61F1, #000000 20%)' }
    : { background: 'linear-gradient(to bottom, #000000, #6D61F1)' };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col md:flex-row md:overflow-hidden overflow-x-hidden">
      <Toaster />
      <TalkToValetPopup 
        isOpen={isTalkToValetOpen} 
        onClose={() => setIsTalkToValetOpen(false)} 
      />

      {/* --- Mobile Header --- */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-black to-[#6D61F1] p-4 flex justify-end items-center">
        <button onClick={() => setIsMobileMenuOpen(true)}>
          <span className="text-white font-sans font-bold text-4xl">VALET</span>
        </button>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-8">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2"
          >
            <X className="h-10 w-10 text-white" />
          </button>
          <nav className="flex flex-col items-center space-y-6 text-3xl font-light">
            <a href="#" onClick={(e) => handleNavClick(e, 1)} className="block hover:underline">about us</a>
            <a href="#" onClick={(e) => handleNavClick(e, 3)} className="block hover:underline">tge</a>
            <a href="#" onClick={(e) => handleNavClick(e, 5)} className="block hover:underline">market making</a>
          </nav>
          <div className="flex space-x-6">
            <a href="https://x.com/valettrading?s=11&t=Tks3QWPT9aEFyTAqGHszTA" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <img src="/X.svg" alt="X social icon" className="h-6 w-6" />
            </a>
            <a href="https://t.me/ymedoteth" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <img src="/telegram.svg" alt="Telegram social icon" className="h-6 w-6" />
            </a>
          </div>
        </div>
      )}

      <button 
        onClick={handleTalkToValet}
        className={`hidden md:block absolute top-8 right-8 bg-gradient-to-r from-black to-[#6D61F1] text-white pl-24 pr-8 py-5 hover:opacity-90 transition-opacity shadow-lg text-2xl font-sans font-light ${isTalkToValetOpen ? 'z-0' : 'z-50'}`}
      >
        Talk <span className="font-ogg italic">to</span> VALET
      </button>

      {/* --- Desktop Sidebar --- */}
      <div className="hidden md:flex w-[300px] bg-gradient-to-b from-[#6D61F1] to-black flex-shrink-0 flex-col p-8 fixed h-full">
        <div className="h-32 flex items-center justify-center">
          <span className="text-white font-sans font-bold text-7xl tracking-tighter">VALET</span>
        </div>
        <div className="mt-auto mb-16">
          <nav className="space-y-4 text-2xl font-light">
            <a href="#" onClick={(e) => handleNavClick(e, 1)} className="block hover:underline">about us</a>
            <a href="#" onClick={(e) => handleNavClick(e, 3)} className="block hover:underline">tge</a>
            <a href="#" onClick={(e) => handleNavClick(e, 5)} className="block hover:underline">market making</a>
          </nav>
          <div className="flex flex-col space-y-4 mt-8">
            <a href="https://x.com/valettrading?s=11&t=Tks3QWPT9aEFyTAqGHszTA" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <img src="/X.svg" alt="X social icon" className="h-6 w-6" />
            </a>
            <a href="https://t.me/ymedoteth" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <img src="/telegram.svg" alt="Telegram social icon" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <main ref={scrollContainerRef} className="relative pt-[4.5rem] md:pt-0 flex-grow flex flex-col md:flex-row md:flex-nowrap md:overflow-x-auto md:ml-[300px]" style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
        
        <section ref={el => (sectionRefs.current[0] = el)} className={`w-full min-h-screen md:w-screen md:h-screen md:flex-shrink-0 flex flex-col items-start justify-center p-8 md:p-24 md:transition-opacity md:duration-700 ${activeSection === 0 ? 'opacity-100' : 'opacity-100 md:opacity-20'}`}>
          <div className="text-left">
            <p className="font-aeonik-light text-2xl md:text-4xl tracking-wider">
              PERSONAL <br />
              TGE ASSISTANT <br />
              & MARKET MAKER
            </p>
            <h1 className="text-9xl md:text-[500px] font-bold font-sans tracking-tighter leading-none mt-8 md:mt-48">
              VALET
            </h1>
          </div>
        </section>

        <section ref={el => (sectionRefs.current[1] = el)} className={`w-full min-h-screen md:w-screen md:h-screen md:flex-shrink-0 flex flex-col md:transition-opacity md:duration-700 ${activeSection === 1 ? 'opacity-100' : 'opacity-100 md:opacity-20'}`}>
          <div className="p-8 md:px-24 md:pt-24">
            <h2 className="text-6xl sm:text-8xl md:text-[240px] font-bold font-sans tracking-tighter leading-none text-[#6D61F1]">
              EXPLORE VALET
            </h2>
          </div>
          <div className="bg-gradient-to-r from-black to-[#6D61F1] flex-grow p-8 md:px-24 md:py-16 flex items-start">
            <div className="max-w-4xl">
              <p className="text-lg md:text-2xl font-sans font-light text-gray-300">
                Valet is a specialized market-making firm providing tailored liquidity solutions for projects, large token holders, team members, and influencers across various decentralized exchanges.
              </p>
            </div>
          </div>
        </section>

        <section ref={el => (sectionRefs.current[2] = el)} className={`w-full min-h-screen md:w-auto md:h-screen md:flex-shrink-0 flex flex-col justify-center p-8 md:p-24 md:pr-96 md:transition-opacity md:duration-700 ${activeSection === 2 ? 'opacity-100' : 'opacity-100 md:opacity-20'}`}>
          <div className="w-full flex flex-col items-center">
            <h2 className="text-5xl text-center font-aeonik-bold tracking-tighter leading-none text-[#4C4C4C] order-1 mb-8 md:order-3 md:text-[280px] md:text-left md:self-end md:mb-0 md:whitespace-nowrap">
              Success & Track Record
            </h2>
            <p className="font-aeonik-light text-sm text-center text-white order-3 mt-8 md:order-2 md:text-3xl md:my-16 md:text-left">
              Work with all the most popular blockchains.
            </p>
            <div className="w-full grid grid-cols-1 divide-y divide-[#443C96] order-2 md:grid-cols-5 md:divide-y-0 md:gap-16 md:text-center md:order-1">
              <div className="flex flex-col items-center text-center py-6 md:py-0">
                <p className="text-6xl md:text-9xl font-aeonik-bold bg-clip-text text-transparent bg-gradient-to-b from-[#443C96] to-[#6D61F1]">100+</p>
                <p className="text-xs md:text-2xl text-gray-400 mt-2 md:mt-4 tracking-widest font-sans">CLIENTS</p>
              </div>
              <div className="relative flex flex-col items-center text-center py-6 md:py-0">
                <div className="hidden md:block absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#443C96] to-[#6D61F1]"></div>
                <p className="text-6xl md:text-9xl font-aeonik-bold bg-clip-text text-transparent bg-gradient-to-b from-[#443C96] to-[#6D61F1]">2+</p>
                <p className="text-xs md:text-2xl text-gray-400 mt-2 md:mt-4 tracking-widest font-sans">YEARS IN MARKET</p>
              </div>
              <div className="relative flex flex-col items-center text-center py-6 md:py-0">
                <div className="hidden md:block absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#443C96] to-[#6D61F1]"></div>
                <p className="text-6xl md:text-9xl font-aeonik-bold bg-clip-text text-transparent bg-gradient-to-b from-[#443C96] to-[#6D61F1]">15M$+</p>
                <p className="text-xs md:text-2xl text-gray-400 mt-2 md:mt-4 tracking-widest font-sans">IN OPERATION</p>
              </div>
              <div className="relative flex flex-col items-center text-center py-6 md:py-0">
                <div className="hidden md:block absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#443C96] to-[#6D61F1]"></div>
                <p className="text-6xl md:text-9xl font-aeonik-bold bg-clip-text text-transparent bg-gradient-to-b from-[#443C96] to-[#6D61F1]">13</p>
                <p className="text-xs md:text-2xl text-gray-400 mt-2 md:mt-4 tracking-widest font-sans">FULL-TIME EMPLOYEES</p>
              </div>
              <div className="relative flex flex-col items-center text-center py-6 md:py-0">
                <div className="hidden md:block absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#443C96] to-[#6D61F1]"></div>
                <p className="text-6xl md:text-9xl font-aeonik-bold bg-clip-text text-transparent bg-gradient-to-b from-[#443C96] to-[#6D61F1]">13</p>
                <p className="text-xs md:text-2xl text-gray-400 mt-2 md:mt-4 tracking-widest font-sans">FULL-TIME EMPLOYEES</p>
              </div>
            </div>
          </div>
        </section>

        <section ref={el => (sectionRefs.current[3] = el)} className={`w-full min-h-screen md:w-screen md:h-screen md:flex-shrink-0 flex flex-col justify-center p-8 md:p-24 md:transition-opacity md:duration-700 ${activeSection === 3 ? 'opacity-100' : 'opacity-100 md:opacity-20'}`} style={{ background: 'linear-gradient(180deg, #000000 50%, #6D61F1 100%)' }}>
          <div className="flex flex-col justify-between h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center items-center md:py-24 border-b border-[#6D61F1] pb-8 md:border-none md:pb-24">
                <p className="font-aeonik-light text-base md:text-xl text-gray-300 max-w-lg">
                  Additionally, we protect your project from sniping attacks and help distribute tokens effectively, creating a professional wallet map to clearly showcase your project's token allocation.
                </p>
              </div>
              <div className="relative md:pl-8 flex justify-center items-center pt-8 md:pt-0 md:py-24">
                <div className="hidden md:block absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#443C96] to-[#6D61F1]"></div>
                <p className="font-aeonik-light text-base md:text-xl text-gray-300 max-w-lg">
                  Our services include developing secure and efficient smart contracts, offering expert guidance on tokenomics, and accumulating supply to maintain control and support a stable launch.
                </p>
              </div>
            </div>
            <h2 className="text-6xl sm:text-8xl md:text-[150px] font-aeonik-bold tracking-tighter leading-none text-black text-center mt-24 md:mt-0">
              TGE Assistance
            </h2>
          </div>
        </section>

        <section ref={el => (sectionRefs.current[4] = el)} className={`w-full min-h-screen md:w-screen md:h-screen md:flex-shrink-0 flex items-center justify-center p-8 md:p-24 md:transition-opacity md:duration-700 ${activeSection === 4 ? 'opacity-100' : 'opacity-100 md:opacity-20'}`}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 items-center">
            <div className="md:col-span-3">
              <h2 className="font-aeonik-bold title-letter-spacing text-7xl md:text-[150px] lg:text-[180px] xl:text-[220px] 2xl:text-[240px] leading-none bg-clip-text text-transparent bg-gradient-to-b from-[#443C96] to-[#6D61F1]">
                Services<br />Overview
              </h2>
              <div className="w-full h-px bg-gradient-to-r from-[#443C96] to-[#6D61F1] my-8 md:hidden" />
            </div>
            <div className="relative md:col-span-2 space-y-6 md:pl-16 max-w-lg">
              <div className="hidden md:block absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#443C96] to-[#6D61F1]"></div>
              <p className="font-aeonik-light text-base md:text-lg text-gray-300">
                At <span className="font-aeonik-bold bg-clip-text text-transparent bg-gradient-to-b from-[#443C96] to-[#6D61F1]">VALET</span>, we provide a full range of market-making services designed to optimize your token's market presence and support sustained growth.
              </p>
              <p className="font-aeonik-light text-base md:text-lg text-gray-300">
                Our services include 16-hour and 24/7 market support, combining human traders and algorithmic systems to deliver strategy-driven execution tailored to your project's narrative and objectives. We ensure healthy chart structure, reduce volatility, and support natural liquidity dynamics in alignment with your marketing efforts.
              </p>
              <p className="font-aeonik-light text-base md:text-lg text-gray-300">
                We also handle discreet supply exits through proprietary methods, execute OTCs via clean wallet rotations, and assist top holders and team members in offloading supply without negative impact on market perception or chart structure.
              </p>
            </div>
          </div>
        </section>

        <section ref={el => (sectionRefs.current[5] = el)} className={`w-full min-h-screen md:w-screen md:h-screen md:flex-shrink-0 flex items-center justify-center p-8 md:p-24 md:transition-opacity md:duration-700 ${activeSection === 5 ? 'opacity-100' : 'opacity-100 md:opacity-20'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h2 className="font-aeonik-bold title-letter-spacing text-7xl md:text-[140px] lg:text-[160px] xl:text-[180px] 2xl:text-[200px] leading-none bg-clip-text text-transparent bg-gradient-to-b from-[#443C96] to-[#6D61F1]">
                MARKET<br />MAKING
              </h2>
              <div className="mt-4">
                <div className="h-1 bg-gradient-to-r from-[#443C96] to-[#6D61F1]"></div>
                <p className="font-aeonik-light text-xl md:text-3xl text-white pt-4">
                  Token Support Services
                </p>
              </div>
            </div>
            <div className="grid grid-rows-3 gap-4 md:gap-8 max-w-4xl">
              <div className="p-8 md:p-12 bg-gradient-to-r from-[#000000] to-[#6D61F1]">
                <h3 className="font-aeonik-regular text-base md:text-xl text-white mb-2">16-Hour Chart Support (Human + Bot Hybrid)</h3>
                <p className="text-xs md:text-sm text-white font-aeonik-light">
                  Coordinated trading desk and algorithmic support operating 16 hours a day to maintain price stability, protect liquidity, and react to market dynamics in real time. This includes an exclusive strategy developed by a professional trader, executed by a hybrid system of algorithms and human operators. The strategy is closely aligned with the project's marketing approach and long-term objectives.
                </p>
              </div>
              <div className="p-8 md:p-12 bg-gradient-to-r from-[#6D61F1] to-[#000000]">
                <h3 className="font-aeonik-regular text-base md:text-xl text-white mb-2">24/7 Full Coverage Market Making</h3>
                <p className="text-xs md:text-sm text-white font-aeonik-light">
                  Round-the-clock support via seamless rotation between professional traders and AI-driven bots. Built around a full-time execution strategy designed to maintain levels, trade within defined ranges, and stimulate organic market growth — all in alignment with the project's narrative and positioning.
                </p>
              </div>
              <div className="p-8 md:p-12 bg-gradient-to-r from-[#000000] to-[#6D61F1]">
                <h3 className="font-aeonik-regular text-base md:text-xl text-white mb-2">Soft Supply Liquidation</h3>
                <p className="text-xs md:text-sm text-white font-aeonik-light">
                  Advanced, proprietary liquidation methods designed to offload token supply without creating visible market impact or triggering red candles on DEX charts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section ref={el => (sectionRefs.current[6] = el)} className={`w-full min-h-screen md:w-screen md:h-screen md:flex-shrink-0 flex flex-col justify-start md:justify-center p-8 md:p-24 md:transition-opacity md:duration-700 ${activeSection === 6 ? 'opacity-100' : 'opacity-100 md:opacity-20'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-0 mb-4 md:mb-8 order-3 md:order-1">
            <div className="p-6 md:p-12 bg-gradient-to-r from-black to-[#6D61F1] md:bg-gradient-to-r md:from-[#6D61F1] md:to-[#000000]">
              <h3 className="font-aeonik-regular text-lg md:text-xl text-white mb-2">Solana-Based Launch Structuring</h3>
              <p className="text-sm md:text-base text-white font-aeonik-light">
                We design and execute advanced pre-launch strategies tailored to the Solana ecosystem — including bundling before bonding curves, wallet orchestration, and narrative-aligned execution to ensure strong entry momentum in hyper-fast environments.
              </p>
            </div>
            <div className="p-6 md:p-12 bg-gradient-to-r from-[#6D61F1] to-black md:bg-gradient-to-r md:from-[#6D61F1] md:to-[#000000]">
              <h3 className="font-aeonik-regular text-lg md:text-xl text-white mb-2">Ethereum Liquidity Setup</h3>
              <p className="text-sm md:text-base text-white font-aeonik-light">
                We apply structured accumulation and wallet-based distribution strategies optimized for Ethereum's gas and visibility constraints — including pre-curve positioning, timing of entries, and wallet setup to balance stealth and credibility.
              </p>
            </div>
            <div className="p-6 md:p-12 bg-gradient-to-r from-black to-[#6D61F1] md:bg-gradient-to-r md:from-[#6D61F1] md:to-[#000000]">
              <h3 className="font-aeonik-regular text-lg md:text-xl text-white mb-2">CTO via Clean Wallet Rotation</h3>
              <p className="text-sm md:text-base text-white font-aeonik-light">
                Coordinated Token Offering executed as a bundled supply sale from one wallet and simultaneous purchases from several newly created clean wallets. This prevents wallet labeling and maintains a decentralized on-chain appearance.
              </p>
            </div>
            <div className="p-6 md:p-12 bg-gradient-to-r from-[#6D61F1] to-black md:bg-gradient-to-r md:from-[#000000] md:to-[#6D61F1]">
              <h3 className="font-aeonik-regular text-lg md:text-xl text-white mb-2">Solana Supply Consolidation</h3>
              <p className="text-sm md:text-base text-white font-aeonik-light">
                Solana-native accumulation strategies that absorb circulating supply through decentralized purchases and staged entry. Designed to shake out early liquidity participants and establish a credible holder base via wallet diversity and movement psychology.
              </p>
            </div>
            <div className="p-6 md:p-12 bg-gradient-to-r from-black to-[#6D61F1] md:bg-gradient-to-r md:from-[#000000] md:to-[#6D61F1]">
              <h3 className="font-aeonik-regular text-lg md:text-xl text-white mb-2">Ethereum Supply Consolidation</h3>
              <p className="text-sm md:text-base text-white font-aeonik-light">
                Execution across DEXs and wallets to naturally absorb supply over time on Ethereum. Uses clean transaction flows and behavioral triggers to reset market expectations, decentralize supply, and prime for long-term holding patterns.
              </p>
            </div>
            <div className="p-6 md:p-12 bg-gradient-to-r from-[#6D61F1] to-black md:bg-gradient-to-r md:from-[#000000] md:to-[#6D61F1]">
              <h3 className="font-aeonik-regular text-lg md:text-xl text-white mb-2">Insider Activity Masking</h3>
              <p className="text-sm md:text-base text-white font-aeonik-light">
                We hide wallets from tagging systems and Bubble Maps, keeping your team's presence invisible and maintaining a clean, trustable on-chain narrative.
              </p>
            </div>
          </div>
          <div className="mt-4 order-2 md:order-2">
            <p className="font-aeonik-light text-2xl md:text-5xl pb-4 text-white md:bg-clip-text md:text-transparent md:bg-gradient-to-b from-[#443C96] to-[#6D61F1]">
              Supply Engineering
            </p>
            <div className="h-0.5 bg-gradient-to-r from-[#6D61F1] to-transparent my-4 md:hidden"></div>
            <div className="hidden md:block h-1 bg-gradient-to-r from-[#443C96] to-[#6D61F1]"></div>
          </div>
          <h2 className="font-aeonik-bold title-letter-spacing text-6xl sm:text-7xl md:text-[120px] leading-none bg-clip-text text-transparent bg-gradient-to-b from-[#443C96] to-[#6D61F1] mt-4 order-1 md:order-3">
            LAUNCH<br className="md:hidden" /> MECHANICS
          </h2>
        </section>

        <section ref={el => (sectionRefs.current[7] = el)} className={`w-full min-h-screen md:w-screen md:h-screen md:flex-shrink-0 flex flex-col justify-center items-start md:items-end p-8 md:p-24 md:transition-opacity md:duration-700 ${activeSection === 7 ? 'opacity-100' : 'opacity-100 md:opacity-20'} bg-gradient-to-b from-[#6D61F1] to-black md:bg-gradient-to-r md:from-black md:to-[#6D61F1]`}>
          <div className="w-full max-w-7xl">
            <h2 className="font-aeonik-bold text-6xl md:text-[150px] tracking-tighter leading-none text-black text-left md:text-right">
              ADDITIONAL
            </h2>
            <div className="border-t-4 md:border-t-8 border-black my-4"></div>
            <p className="font-aeonik-light text-2xl md:text-5xl text-black text-left">
              Services
            </p>
          </div>

          <div className="w-full md:w-11/12 mx-auto mt-12 bg-black p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-8 bg-gradient-to-r from-black to-[#6D61F1] md:bg-gradient-to-r md:from-[#6D61F1] md:to-[#000000]">
                <h3 className="font-aeonik-bold text-xl text-white mb-2">Smart Contract Development</h3>
                <p className="font-aeonik-light text-sm text-gray-300">
                  Design and deployment of secure, gas-efficient smart contracts tailored to your token and ecosystem mechanics.
                </p>
              </div>
              <div className="p-8 bg-gradient-to-r from-[#6D61F1] to-black md:bg-gradient-to-r md:from-[#6D61F1] md:to-[#000000]">
                <h3 className="font-aeonik-bold text-xl text-white mb-2">Tokenomics Design & Advisory</h3>
                <p className="font-aeonik-light text-sm text-gray-300">
                  Consultation on sustainable and narrative-driven tokenomics, aligning both protocol incentives and investor expectations.
                </p>
              </div>
              <div className="p-8 bg-gradient-to-r from-black to-[#6D61F1] md:bg-gradient-to-r md:from-[#6D61F1] md:to-[#000000]">
                <h3 className="font-aeonik-bold text-xl text-white mb-2">Positioning, Social Media & Marketing Support</h3>
                <p className="font-aeonik-light text-sm text-gray-300">
                  End-to-end guidance on how your project presents itself, including social tone, storytelling, and growth tactics.
                </p>
              </div>
              <div className="p-8 bg-gradient-to-r from-[#6D61F1] to-black md:bg-gradient-to-r md:from-[#6D61F1] md:to-[#000000]">
                <h3 className="font-aeonik-bold text-xl text-white mb-2">KOL & Influencer Engagement</h3>
                <p className="font-aeonik-light text-sm text-gray-300">
                  Connection to trusted Key Opinion Leaders across ecosystems to amplify awareness and bring early traction.
                </p>
              </div>
              <div className="md:col-span-2 p-8 bg-gradient-to-b from-[#000000] to-[#6D61F1] text-center">
                <h3 className="font-aeonik-bold text-xl text-white mb-2">Top Holder Supply Offloading</h3>
                <p className="font-aeonik-light text-sm text-gray-300">
                  Targeted execution strategies for offloading supply from top holders or team wallets in a controlled and non-disruptive manner. Designed to preserve market confidence and protect price structure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={el => (sectionRefs.current[8] = el)}
          className={`w-full md:w-[25vw] md:h-screen md:flex-shrink-0 relative pt-8 px-8 pb-32 md:p-24`}
          style={socialsBackground}
        >
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl font-aeonik-light text-purple-300 mb-8">
              Our Socials
            </h3>
            <div className="flex items-center justify-center space-x-6">
              <a href="https://x.com/valettrading?s=11&t=Tks3QWPT9aEFyTAqGHszTA" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <div className="w-10 h-10 x-icon"></div>
              </a>
              <div className="w-px h-10 bg-purple-300 opacity-50"></div>
              <a href="https://t.me/ymedoteth" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <div className="w-10 h-10 telegram-icon"></div>
              </a>
            </div>
          </div>
        </section>
       </main>
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-black">
        <button
            onClick={handleTalkToValet}
            className="w-full bg-gradient-to-r from-[#6D61F1] to-black text-white px-4 py-4 text-lg font-light rounded-md"
        >
            Talk <span className="font-ogg italic">to</span> VALET
        </button>
      </div>
     </div>
   );
 }
 
 export default App;