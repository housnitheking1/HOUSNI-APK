import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  HardDrive,
  Calendar,
  Layers,
  FileCheck,
  Smartphone,
  ChevronDown,
  ChevronUp,
  X,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { FDroidApp } from '../types.ts';
import { getAppDetails, formatFileSize, formatDate } from '../services/fdroidService.ts';
import { ScreenshotsGallery } from '../components/ScreenshotsGallery.tsx';
import { SecurityAuditModal } from '../components/SecurityAuditModal.tsx';
import { SocialFollowSection } from '../components/SocialFollowSection.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

export const AppDetailPage: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  const [app, setApp] = useState<FDroidApp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!packageId) return;

    let isMounted = true;
    async function loadApp() {
      setLoading(true);
      setError('');
      try {
        const data = await getAppDetails(packageId!);
        if (isMounted) {
          if (data) {
            setApp(data);
          } else {
            setError('Application package not found in catalog.');
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError('Failed to load application details. Please try again.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadApp();
    return () => {
      isMounted = false;
    };
  }, [packageId]);

  const handleDownloadClick = () => {
    if (!app) return;
    navigate(`/download/${encodeURIComponent(app.id)}`);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 animate-pulse">
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 mx-auto flex items-center justify-center">
          <Smartphone className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-display font-black text-slate-900 dark:text-white">
          Application Not Found
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          {error || "The application you requested could not be located in our verified catalog."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-accent bg-accent-hover transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store Home</span>
        </Link>
      </div>
    );
  }

  const primaryCategory = app.categories && app.categories.length > 0 ? app.categories[0] : 'Utility';
  const descText = app.description || app.summary || '';
  const isDescLong = descText.length > 500;

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-accent transition-colors cursor-pointer"
          >
            <ArrowLeft className={`w-4 h-4 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            <span>{t('backToStore')}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-accent">HOUSNI APK</Link>
            <span>/</span>
            <Link
              to={app.isGame ? '/category/android-games' : '/category/android-apps'}
              className="hover:text-accent"
            >
              {app.isGame ? t('catAndroidGamesTitle') : t('catAndroidAppsTitle')}
            </Link>
            <span>/</span>
            <span className="text-accent truncate max-w-[140px] sm:max-w-xs">{app.name}</span>
          </div>
        </div>

        {/* ==================================================
            A. APP HEADER
            ================================================== */}
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B132B]/85 backdrop-blur-xl shadow-md dark:shadow-[0_0_35px_rgba(0,0,0,0.5)]">
          {/* Neon backdrop glow */}
          <div
            className="absolute top-0 right-0 w-72 h-72 blur-3xl opacity-15 pointer-events-none rounded-full"
            style={{ backgroundColor: 'var(--accent-color)' }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-6">
              {/* Large Icon */}
              <div className="w-20 h-20 sm:w-26 sm:h-26 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 shrink-0 flex items-center justify-center shadow-md">
                {app.iconUrl ? (
                  <img
                    src={app.iconUrl}
                    alt={`${app.name} icon`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="font-display font-black text-accent text-3xl sm:text-4xl">
                    {app.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Title & Category Details */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-lg bg-accent-light border border-accent/25">
                    {primaryCategory}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSecurityModal(true)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors cursor-pointer"
                    title="Click to view security audit report"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t('securityReportBtn')}</span>
                  </button>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                  {app.name}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>Version {app.versionName || '1.0'}</span>
                  <span>•</span>
                  <span>{formatFileSize(app.size)}</span>
                  <span>•</span>
                  <span>Updated {formatDate(app.lastUpdated)}</span>
                </div>
              </div>
            </div>

            {/* Quick Header Download Action */}
            <div className="w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={handleDownloadClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-accent bg-accent-hover transition-all duration-200 shadow-md hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.6)] flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{t('downloadApkBtn')} ({formatFileSize(app.size)})</span>
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================
            B. INTERACTIVE SCREENSHOTS GALLERY
            ================================================== */}
        <ScreenshotsGallery screenshots={app.screenshots || []} appName={app.name} />

        {/* ==================================================
            C. DESCRIPTION
            ================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0B132B]/70 backdrop-blur-xl space-y-4">
          <h2 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white">
            {t('aboutApp')} {app.name}
          </h2>

          <div
            className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 whitespace-pre-line ${
              !showFullDesc && isDescLong ? 'line-clamp-6' : ''
            }`}
          >
            {descText || 'Verified Android package with secure download.'}
          </div>

          {isDescLong && (
            <button
              type="button"
              onClick={() => setShowFullDesc((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline pt-2 cursor-pointer"
            >
              <span>{showFullDesc ? t('showLess') : t('readMore')}</span>
              {showFullDesc ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* ==================================================
            D. APPLICATION INFORMATION
            ================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0B132B]/70 backdrop-blur-xl space-y-5">
          <h2 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white">
            {t('packageDetailsTitle')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">{t('latestVersion')}</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                v{app.versionName || '1.0'} ({app.versionCode || 1})
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">{t('downloadSize')}</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {formatFileSize(app.size)}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">{t('androidReq')}</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Android 6.0 or higher
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">{t('packageId')}</span>
              <p className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate" title={app.id}>
                {app.id}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">{t('license')}</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate" title={app.license}>
                {app.license || 'Open Source Software'}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">{t('lastRelease')}</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {formatDate(app.lastUpdated)}
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================
            E. DOWNLOAD SECTION (Near Bottom, Clearly Separated)
            ================================================== */}
        <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl border-2 border-accent/40 bg-gradient-to-br from-white via-accent-light/10 to-accent-light/30 dark:from-[#0B132B] dark:via-[#0E1B3E] dark:to-[#070B14] shadow-xl text-center sm:text-left space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowSecurityModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-bold hover:underline cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('securityReportBtn')}</span>
              </button>
              <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                {t('readyToInstall')} {app.name}?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
                Click below to start the verified security check and download the official <span className="font-mono text-slate-800 dark:text-slate-200">{app.apkName}</span> package.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-bold text-white bg-accent bg-accent-hover transition-all duration-200 shadow-lg hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.6)] flex items-center justify-center gap-2.5 active:scale-95 shrink-0 cursor-pointer"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>{t('downloadApkBtn')} ({formatFileSize(app.size)})</span>
            </button>
          </div>
        </div>

        {/* Social Media Accounts Section */}
        <SocialFollowSection />
      </div>

      {/* Security Audit Report Modal */}
      <SecurityAuditModal
        app={app}
        isOpen={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
      />
    </div>
  );
};
