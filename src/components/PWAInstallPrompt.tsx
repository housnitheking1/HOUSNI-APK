import React, { useState, useEffect } from 'react';
import { Download, Sparkles, X, Share, PlusSquare, Smartphone, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';

export const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if previously dismissed in session
    const dismissed = sessionStorage.getItem('housni_pwa_dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Delay prompt appearance slightly for smooth UX
    const timer = setTimeout(() => {
      if (!isInstalled && (isInstallable || isIOS)) {
        setShowBanner(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isInstallable, isInstalled, isIOS]);

  const handleDismiss = () => {
    setShowBanner(false);
    setIsDismissed(true);
    sessionStorage.setItem('housni_pwa_dismissed', 'true');
  };

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }
    const success = await install();
    if (success) {
      setShowBanner(false);
    }
  };

  if (isInstalled || isDismissed || !showBanner) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom App Installation Banner */}
      <aside
        aria-label="Install HOUSNI APK Application"
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-xl border border-slate-200 dark:border-accent/40 rounded-2xl p-3.5 shadow-2xl dark:shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
      >
        <div className="flex items-center gap-3">
          {/* App Icon */}
          <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700/80 p-1 flex items-center justify-center shrink-0 shadow-inner">
            <img
              src="https://i.ibb.co/xK7V7yXt/mountain.webp"
              alt="HOUSNI APK"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs sm:text-sm font-display font-black text-slate-900 dark:text-white truncate">
                تطبيق HOUSNI APK
              </h4>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-accent-light text-accent border border-accent/20">
                PWA
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
              تثبيت التطبيق على الشاشة الرئيسية وتصفح سريع
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-accent bg-accent-hover transition-all duration-200 shadow-md hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)] flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تثبيت</span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss install banner"
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* iOS Safari Guided Installation Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-accent flex items-center justify-center mx-auto border border-slate-200 dark:border-slate-700">
              <Smartphone className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                تثبيت على iPhone / iPad
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                اتبع الخطوات البسيطة التالية لإضافة التطبيق لشاشتك الرئيسية:
              </p>
            </div>

            <div className="text-left text-xs space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-accent text-white font-bold flex items-center justify-center text-[11px] shrink-0">
                  1
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  اضغط على زر المشاركة <strong>Share</strong> <Share className="w-3.5 h-3.5 inline mx-1 text-accent" /> أسفل متصفح Safari.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-accent text-white font-bold flex items-center justify-center text-[11px] shrink-0">
                  2
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  اختر <strong>إضافة إلى الصفحة الرئيسية (Add to Home Screen)</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-accent" />.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-[11px] shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  اضغط على <strong>Add</strong> وسيظهر التطبيق فوراً بهاتفك!
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              حسناً، فهمت
            </button>
          </div>
        </div>
      )}
    </>
  );
};
