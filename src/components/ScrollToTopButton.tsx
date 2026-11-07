import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={language === 'ar' ? 'الرجوع إلى أعلى الصفحة' : 'Scroll back to top'}
      title={language === 'ar' ? 'الرجوع للأعلى' : 'Scroll to top'}
      className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-accent text-white shadow-xl hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.6)] border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md cursor-pointer animate-in fade-in zoom-in-75"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
};
