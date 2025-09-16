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
    <div className="fixed inset-0 bg-black text-white z-50 overflow-hidden">
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
          <h2 className="text-5xl lg:text-7xl font-light text-white mb-2">
            Get a free personal TGE
          </h2>
          <h2 className="text-5xl lg:text-7xl font-light text-white border-b-2 border-purple-400 pb-2 inline-block">
            consultation
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 lg:gap-16 max-w-3xl mb-32">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="name"
            className="w-full bg-transparent text-white text-2xl lg:text-[2.5rem] font-light pb-4 focus:outline-none border-b border-white placeholder:text-gray-400"
            required
          />
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="organization"
            className="w-full bg-transparent text-white text-2xl lg:text-[2.5rem] font-light pb-4 focus:outline-none border-b border-white placeholder:text-gray-400"
            required
          />
          <input
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            placeholder="telegram username"
            className="w-full bg-transparent text-white text-2xl lg:text-[2.5rem] font-light pb-4 focus:outline-none border-b border-white placeholder:text-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email (optional)"
            className="w-full bg-transparent text-white text-2xl lg:text-[2.5rem] font-light pb-4 focus:outline-none border-b border-white border-opacity-50 placeholder:text-gray-500"
          />
        </form>

        {/* Send button */}
        <button 
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="fixed bottom-8 right-16 text-purple-400 hover:opacity-90 transition-opacity disabled:opacity-50 bg-transparent border-none"
        >
          <span className="text-3xl lg:text-[4rem] font-sans font-bold">
            {isSubmitting ? 'Sending...' : 'Send'}
          </span>
        </button>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden h-screen p-8 flex flex-col">
        {/* Title */}
        <div className="mt-16 mb-12">
          <h2 className="text-4xl text-white font-['Aeonik_Pro'] font-light mb-2">
            Get a free personal TGE
          </h2>
          <h2 className="text-4xl text-white font-['Aeonik_Pro'] font-light border-b-2 border-purple-400 pb-2 inline-block">
            consultation
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 mb-24">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="name"
            className="w-full bg-transparent text-white text-xl font-light pb-4 focus:outline-none border-b border-white placeholder:text-gray-400"
            required
          />
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="organization"
            className="w-full bg-transparent text-white text-xl font-light pb-4 focus:outline-none border-b border-white placeholder:text-gray-400"
            required
          />
          <input
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            placeholder="telegram username"
            className="w-full bg-transparent text-white text-xl font-light pb-4 focus:outline-none border-b border-white placeholder:text-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email (optional)"
            className="w-full bg-transparent text-white text-xl font-light pb-4 focus:outline-none border-b border-white border-opacity-50 placeholder:text-gray-500"
          />
        </form>

        {/* Send button */}
        <button 
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="fixed bottom-8 right-8 text-purple-400 hover:opacity-90 transition-opacity disabled:opacity-50 bg-transparent border-none"
        >
          <span className="text-2xl font-sans font-bold">
            {isSubmitting ? 'Sending...' : 'Send'}
          </span>
        </button>
      </div>
    </div>
  );
} 