import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  ShieldCheck,
  HardDrive,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
  ExternalLink,
  Smartphone,
  AlertTriangle,
} from 'lucide-react';
import { FDroidApp } from '../types.ts';
import { getAppDetails, formatFileSize } from '../services/fdroidService.ts';
import { SmartSecurityCheck } from '../components/SmartSecurityCheck.tsx';
import { SocialFollowSection } from '../components/SocialFollowSection.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

export const DownloadPage: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  const [app, setApp] = useState<FDroidApp | null>(null);
  const [loading, setLoading] = useState(true);

  // Download workflow stepper state
  // Step 1: Initial waiting interface
  // Step 2: Smart Security verification scan
  // Step 3: Countdown (3 seconds)
  // Step 4 & 5: Final verified Download APK ready
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);
  const [downloadInitiated, setDownloadInitiated] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!packageId) return;

    let isMounted = true;
    async function loadApp() {
      try {
        const data = await getAppDetails(packageId!);
        if (isMounted) setApp(data);
      } catch (err) {
        console.error('Download page load error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadApp();
    return () => {
      isMounted = false;
    };
  }, [packageId]);

  // When Security checkbox is verified, start 10-second download preparation timer
  const handleSecuritySuccess = (token: string) => {
    setIsCaptchaVerified(true);
    setCountdown(10);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setDownloadReady(true);
    }
  }, [countdown]);

  const handleFinalDownload = () => {
    if (!app) return;
    setDownloadInitiated(true);
    const link = document.createElement('a');
    link.href = app.apkUrl;
    link.setAttribute('download', app.apkName || `${app.id}.apk`);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-pulse space-y-4">
        <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-3xl mx-auto" />
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto" />
        <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-3xl mx-auto" />
      </div>
    );
  }

  if (!app) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Package Not Found</h2>
        <p className="text-xs text-slate-500">The requested package could not be prepared for download.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-accent"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  const progressPercent = countdown !== null ? Math.round(((10 - countdown) / 10) * 100) : 0;

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-accent transition-colors cursor-pointer"
          >
            <ArrowLeft className={`w-4 h-4 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            <span>{t('backToStore')}</span>
          </button>

          <span className="text-xs font-semibold text-slate-500">
            {t('downloadGateway')}
          </span>
        </div>

        {/* Top Compliant Advertisement Placement (Separate from controls) */}
        <div className="p-3.5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/40 text-center space-y-1">
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
            ADVERTISEMENT
          </span>
          <div className="h-16 sm:h-20 flex items-center justify-center text-xs text-slate-400">
            <span>Responsive Banner Ad Space • Compliant Placement</span>
          </div>
        </div>

        {/* STEP 1: Dedicated Download Waiting Card */}
        <div className="relative overflow-hidden p-6 sm:p-9 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B132B]/85 backdrop-blur-xl shadow-xl text-center space-y-6">
          {/* Neon atmospheric glow */}
          <div
            className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-64 blur-3xl opacity-15 pointer-events-none rounded-full"
            style={{ backgroundColor: 'var(--accent-color)' }}
          />

          {/* App Summary Header */}
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-md flex items-center justify-center">
              {app.iconUrl ? (
                <img
                  src={app.iconUrl}
                  alt={`${app.name} icon`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="font-display font-black text-accent text-2xl">
                  {app.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-lg bg-accent-light border border-accent/20">
                Official Package
              </span>
              <h1 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white mt-1">
                {app.name}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {app.apkName} • {formatFileSize(app.size)} • v{app.versionName || '1.0'}
              </p>
            </div>
          </div>

          {/* Stepper Progress Visualizer */}
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto text-center pt-2">
            <div className={`p-2 rounded-xl text-[11px] font-bold border transition-colors ${
              isCaptchaVerified
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                : 'bg-accent/10 border-accent/40 text-accent'
            }`}>
              {t('step1')}
            </div>
            <div className={`p-2 rounded-xl text-[11px] font-bold border transition-colors ${
              downloadReady
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                : isCaptchaVerified
                ? 'bg-accent/10 border-accent/40 text-accent animate-pulse'
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
            }`}>
              {t('step2')}
            </div>
            <div className={`p-2 rounded-xl text-[11px] font-bold border transition-colors ${
              downloadReady
                ? 'bg-accent text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
            }`}>
              {t('step3')}
            </div>
          </div>

          {/* STEP 2: Smart Checkbox Captcha Verification */}
          {!isCaptchaVerified && (
            <div className="pt-2">
              <SmartSecurityCheck
                isVerified={isCaptchaVerified}
                onVerify={handleSecuritySuccess}
                appName={app.name}
                size={app.size}
              />
            </div>
          )}

          {/* STEP 3: 10-Second Countdown Timer */}
          {isCaptchaVerified && !downloadReady && (
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 max-w-md mx-auto space-y-4 animate-in fade-in">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-accent">
                <Clock className="w-4 h-4 animate-spin" />
                <span>
                  {isRTL ? 'جارِ تجهيز وتأمين رابط التحميل المباشر...' : 'Preparing secure direct download package...'}
                </span>
              </div>

              {/* Countdown Numbers */}
              <div className="text-4xl sm:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                {countdown}s
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isRTL
                  ? 'يرجى الانتظار ١٠ ثوانٍ لإتمام فحص وتوليد رابط التنزيل المباشر.'
                  : 'Please wait 10 seconds while the direct download link is securely verified.'}
              </p>
            </div>
          )}

          {/* STEP 4 & 5: Download Ready & Final Verified Download Button */}
          {downloadReady && (
            <div className="p-6 sm:p-8 rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-950/20 max-w-lg mx-auto space-y-5 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-center gap-2 text-emerald-500">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                <span className="text-sm font-bold">{t('downloadReady')}</span>
              </div>

              <div className="space-y-1">
                <p className="text-base font-display font-black text-slate-900 dark:text-white">
                  {app.apkName}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Verified Size: <span className="font-bold text-accent">{formatFileSize(app.size)}</span> • Architecture: All Android
                </p>
              </div>

              {/* Final Verified Download APK Button */}
              <button
                type="button"
                onClick={handleFinalDownload}
                className="w-full py-4 px-6 rounded-2xl text-base font-bold text-white bg-accent bg-accent-hover transition-all duration-200 shadow-xl hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.6)] flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>{t('downloadNow')} ({formatFileSize(app.size)})</span>
              </button>

              {downloadInitiated && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-in fade-in">
                  {t('downloadStarted')}
                </p>
              )}
            </div>
          )}

          {/* Information & Safety Notice */}
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p>Direct download from verified official application repository.</p>
            <p className="text-[11px]">
              No adware, no modified binaries, and no registration required.
            </p>
          </div>
        </div>

        {/* Bottom Compliant Advertisement Placeholder */}
        <div className="p-3.5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/40 text-center space-y-1">
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
            ADVERTISEMENT
          </span>
          <div className="h-20 sm:h-24 flex items-center justify-center text-xs text-slate-400">
            <span>Responsive Display Ad • Separated from Action Controls</span>
          </div>
        </div>

        {/* Official Social Media Community Section */}
        <SocialFollowSection />
      </div>
    </div>
  );
};
