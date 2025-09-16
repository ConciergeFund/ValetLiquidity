import { X } from 'lucide-react';

interface GetInTouchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetInTouchPopup({ isOpen, onClose }: GetInTouchPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#E1DED7] z-50">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-50 hover:opacity-70 transition-opacity"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Desktop layout */}
      <div className="hidden md:flex min-h-screen p-16 flex-col">
        {/* Main title - aligned right */}
        <div className="text-right">
          <div className="inline-block">
            <h2 className="text-[12rem] text-black">
              Get <span className="font-[Ogg] italic">in</span> touch
            </h2>
            <div className="h-[2px] bg-black mt-2"></div>
          </div>
        </div>

        {/* Social section - moved higher */}
        <div className="text-right mt-32">
          <h3 className="text-[4rem] mb-8">
            <span className="font-[Ogg] italic">Our</span> Socials
          </h3>
          <a 
            href="https://twitter.com/ValetLiq" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl hover:opacity-70 transition-opacity"
          >
            𝕏 @ValetLiq
          </a>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden min-h-screen p-8 flex flex-col">
        {/* Title */}
        <div className="mt-16">
          <h2 className="text-4xl text-[#1C2436] font-['Aeonik_Pro'] font-light">
            Get <span className="font-[Ogg] italic">in</span> touch
          </h2>
          <div className="h-[1px] bg-[#1C2436] mt-2"></div>
        </div>

        {/* Social section */}
        <div className="mt-16">
          <h3 className="text-2xl text-[#1C2436] mb-4">
            <span className="font-[Ogg] italic">Our</span> Socials
          </h3>
          <a 
            href="https://twitter.com/ValetLiq" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xl text-[#1C2436] hover:opacity-70 transition-opacity"
          >
            𝕏 @ValetLiq
          </a>
        </div>
      </div>
    </div>
  );
} 