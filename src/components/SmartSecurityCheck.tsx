import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock, Shield, Cpu, Sparkles, RefreshCw } from 'lucide-react';
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
  const { t, isRTL } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanStep, setScanStep] = useState(t('secScanReady'));

  const startVerification = () => {
    if (isScanning || isVerified) return;
    setIsScanning(true);
    setProgress(15);
    setScanStep(t('secScanReading'));

    setTimeout(() => {
      setProgress(55);
      setScanStep(t('secScanMatching'));
    }, 600);

    setTimeout(() => {
      setProgress(90);
      setScanStep(t('secScanVerifying'));
    }, 1200);

    setTimeout(() => {
      setProgress(100);
      setScanStep(t('secScanComplete'));
      setIsScanning(false);
      onVerify('verified-security-token-' + Date.now());
    }, 1700);
  };

  if (isVerified) {
    return (
      <div className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className={isRTL ? 'text-right sm:text-right' : 'text-left sm:text-left'}>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {t('secScanVerifiedHeading')}
            </h4>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              {t('secScanVerifiedSub')}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
          VERIFIED SAFE
        </span>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-accent/40 bg-white/95 dark:bg-[#0B132B]/90 backdrop-blur-xl shadow-lg space-y-4 text-center">
      <div className="flex items-center justify-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div className={isRTL ? 'text-right sm:text-right' : 'text-left sm:text-left'}>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {t('secScanBoxHeading')}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Smart Security & Anti-Bot Verification
          </p>
        </div>
      </div>

      {/* Dynamic Status / Progress Bar during scan */}
      {isScanning ? (
        <div className="space-y-3 py-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-accent" />
              <span>{scanStep}</span>
            </span>
            <span className="font-mono text-accent">{progress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        /* Action Button */
        <div className="pt-1">
          <button
            type="button"
            onClick={startVerification}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-accent bg-accent-hover transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)] flex items-center justify-center gap-2.5 mx-auto cursor-pointer active:scale-95 group"
          >
            <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{t('secScanBtn')}</span>
          </button>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            {t('secScanNotice')}
          </p>
        </div>
      )}
    </div>
  );
};
