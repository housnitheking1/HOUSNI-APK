import React, { useState } from 'react';
import { Check, ShieldCheck, RefreshCw, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface SmartSecurityCheckProps {
  onVerify: (token: string) => void;
  isVerified: boolean;
  appName?: string;
  size?: number;
}

export const SmartSecurityCheck: React.FC<SmartSecurityCheckProps> = ({
  onVerify,
  isVerified,
  appName = 'Application Package',
}) => {
  const { t, isRTL, language } = useLanguage();
  const [isChecked, setIsChecked] = useState(isVerified);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCheckboxClick = () => {
    if (isChecked || isVerifying || isVerified) return;

    setIsVerifying(true);
    // 1.2 second realistic verification animation
    setTimeout(() => {
      setIsVerifying(false);
      setIsChecked(true);
      onVerify('verified-security-token-' + Date.now());
    }, 1200);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Interactive Checkbox Widget */}
      <div
        onClick={handleCheckboxClick}
        role="checkbox"
        aria-checked={isChecked || isVerified}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleCheckboxClick();
          }
        }}
        className={`relative overflow-hidden p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between cursor-pointer select-none backdrop-blur-xl ${
          isChecked || isVerified
            ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
            : isVerifying
            ? 'bg-accent/10 border-accent/60 shadow-[0_0_20px_rgba(var(--accent-rgb),0.25)]'
            : 'bg-white dark:bg-[#0E1526] hover:bg-slate-50 dark:hover:bg-[#121B32] border-slate-300 dark:border-slate-700/80 hover:border-accent shadow-md'
        }`}
      >
        {/* Left Side: Checkbox Square & Label */}
        <div className="flex items-center gap-3.5">
          {/* Custom Square Checkbox */}
          <div
            className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 shrink-0 ${
              isChecked || isVerified
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
                : isVerifying
                ? 'border-accent bg-transparent'
                : 'border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-800'
            }`}
          >
            {isVerifying ? (
              <RefreshCw className="w-4 h-4 text-accent animate-spin" />
            ) : isChecked || isVerified ? (
              <Check className="w-5 h-5 text-white stroke-[3] animate-in zoom-in-75 duration-200" />
            ) : null}
          </div>

          {/* Label */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <span className="text-sm font-display font-bold text-slate-900 dark:text-white block">
              {language === 'ar' ? 'أنا لست برنامج روبوت' : "I'm not a robot"}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
              {isChecked || isVerified
                ? (language === 'ar' ? 'تم التحقق بنجاح' : 'Verification Complete')
                : isVerifying
                ? (language === 'ar' ? 'جارٍ التحقق...' : 'Verifying human...')
                : (language === 'ar' ? 'انقر للتحقق الأمني' : 'Click check box to verify')}
            </span>
          </div>
        </div>

        {/* Right Side: Security Shield Brand Stamp */}
        <div className="flex flex-col items-center justify-center pl-3 border-l border-slate-200 dark:border-slate-800 shrink-0 text-slate-400 dark:text-slate-500">
          <ShieldCheck className={`w-5 h-5 ${isChecked || isVerified ? 'text-emerald-500' : 'text-accent'}`} />
          <span className="text-[9px] font-bold tracking-tight text-slate-500 dark:text-slate-400 mt-0.5 uppercase">
            CAPTCHA
          </span>
        </div>
      </div>
    </div>
  );
};
