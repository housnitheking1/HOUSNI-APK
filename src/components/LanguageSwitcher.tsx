import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
      title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-accent hover:border-accent/40 transition-colors cursor-pointer"
    >
      <Globe className="w-3.5 h-3.5 text-accent" />
      <span className="font-sans uppercase">
        {language === 'en' ? 'AR' : 'EN'}
      </span>
    </button>
  );
};
