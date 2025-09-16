import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface TalkToValetPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  organization: string;
  email: string;
  telegram: string;
}

export function TalkToValetPopup({ isOpen, onClose }: TalkToValetPopupProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    organization: '',
    email: '',
    telegram: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent body scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.valet.trading/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result === true) {
        toast.success('Message sent successfully!', {
          position: 'top-center',
          duration: 3000,
          className: 'bg-[#1C2436] text-[#E1DED7]'
        });
        // Reset form
        setFormData({
          name: '',
          organization: '',
          email: '',
          telegram: ''
        });
        // Close popup after short delay
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.', {
        position: 'top-center',
        duration: 3000,
        className: 'bg-[#1C2436] text-[#E1DED7]'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#E1DED7] z-50 overflow-hidden">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-50 hover:opacity-70 transition-opacity"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Desktop layout */}
      <div className="hidden md:flex h-screen p-16 flex-col">
        {/* Title */}
        <div className="text-left mb-16 lg:mb-24">
          <h2 className="text-7xl lg:text-[12rem] text-[#1C2436] leading-tight">
            Talk <span className="font-[Ogg] italic">to</span> Valet
          </h2>
          <div className="h-[2px] bg-[#1C2436] mt-2 w-full"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 lg:gap-16 max-w-3xl mb-32">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="name"
            className="w-full bg-transparent text-[#1C2436] text-2xl lg:text-[2.5rem] font-light pb-4 focus:outline-none border-b border-[#1C2436] placeholder:text-[#1C2436]/60"
            required
          />
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="organization"
            className="w-full bg-transparent text-[#1C2436] text-2xl lg:text-[2.5rem] font-light pb-4 focus:outline-none border-b border-[#1C2436] placeholder:text-[#1C2436]/60"
            required
          />
          <input
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            placeholder="telegram username"
            className="w-full bg-transparent text-[#1C2436] text-2xl lg:text-[2.5rem] font-light pb-4 focus:outline-none border-b border-[#1C2436] placeholder:text-[#1C2436]/60"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email (optional)"
            className="w-full bg-transparent text-[#1C2436] text-2xl lg:text-[2.5rem] font-light pb-4 focus:outline-none border-b border-[#1C2436] border-opacity-50 placeholder:text-[#1C2436]/40"
          />
        </form>

        {/* Send button */}
        <button 
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="fixed bottom-0 right-0 bg-[#1C2436] text-[#E1DED7] px-12 lg:px-16 py-6 lg:py-8 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <span className="text-3xl lg:text-[4rem] font-[Ogg] italic">
            {isSubmitting ? 'Sending...' : 'Send'}
          </span>
        </button>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden h-screen p-8 flex flex-col">
        {/* Title */}
        <div className="mt-16 mb-12">
          <h2 className="text-4xl text-[#1C2436] font-['Aeonik_Pro'] font-light">
            Talk <span className="font-[Ogg] italic">to</span> Valet
          </h2>
          <div className="h-[1px] bg-[#1C2436] mt-2"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 mb-24">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="name"
            className="w-full bg-transparent text-[#1C2436] text-xl font-light pb-4 focus:outline-none border-b border-[#1C2436] placeholder:text-[#1C2436]/60"
            required
          />
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="organization"
            className="w-full bg-transparent text-[#1C2436] text-xl font-light pb-4 focus:outline-none border-b border-[#1C2436] placeholder:text-[#1C2436]/60"
            required
          />
          <input
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            placeholder="telegram username"
            className="w-full bg-transparent text-[#1C2436] text-xl font-light pb-4 focus:outline-none border-b border-[#1C2436] placeholder:text-[#1C2436]/60"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email (optional)"
            className="w-full bg-transparent text-[#1C2436] text-xl font-light pb-4 focus:outline-none border-b border-[#1C2436] border-opacity-50 placeholder:text-[#1C2436]/40"
          />
        </form>

        {/* Send button */}
        <button 
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="fixed bottom-0 right-0 bg-[#1C2436] text-[#E1DED7] px-8 py-4 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <span className="text-2xl font-[Ogg] italic">
            {isSubmitting ? 'Sending...' : 'Send'}
          </span>
        </button>
      </div>
    </div>
  );
} 