import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Star, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { FDroidApp } from '../types.ts';
import { formatFileSize } from '../services/fdroidService.ts';

interface EditorsChoiceBannerProps {
  apps: FDroidApp[];
}

export const EditorsChoiceBanner: React.FC<EditorsChoiceBannerProps> = ({ apps }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Pick top apps with rich metadata
  const featuredList = apps && apps.length > 0 ? apps.slice(0, 5) : [];

  // Auto-advance banner every 4.5 seconds unless user hovers or touches
  useEffect(() => {
    if (featuredList.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredList.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [featuredList.length, isPaused]);

  if (featuredList.length === 0) return null;

  const currentApp = featuredList[currentIndex] || featuredList[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length);
  };

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartXRef.current - touchEndX;

      // Threshold of 40px for swipe gesture
      if (diffX > 40) {
        handleNext();
      } else if (diffX < -40) {
        handlePrev();
      }
      touchStartXRef.current = null;
    }
    // Resume auto-slide after brief delay
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <section aria-label="Editor's Choice Top Applications" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden rounded-3xl border-2 border-amber-500/30 dark:border-amber-400/25 bg-gradient-to-r from-amber-500/5 via-slate-900/5 to-accent-light/10 dark:from-[#0d162d] dark:via-[#131f40] dark:to-[#0B132B] p-5 sm:p-8 backdrop-blur-2xl shadow-xl dark:shadow-[0_0_40px_rgba(245,158,11,0.15)] transition-all select-none"
      >
        {/* Glow orb */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-400/20 dark:bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left details (fixed LTR alignment so banner never mirrors on language change) */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            {/* Tag / Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider shadow-xs">
                <Award className="w-3.5 h-3.5" />
                <span>{t('editorsChoiceBadge')}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('verifiedSafe')}</span>
              </span>
            </div>

            {/* App Header */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shrink-0 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                {currentApp.iconUrl ? (
                  <img
                    src={currentApp.iconUrl}
                    alt={currentApp.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-display font-black text-amber-500 text-3xl">
                    {currentApp.name.charAt(0)}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                  {currentApp.name}
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="ml-1 font-bold text-slate-800 dark:text-slate-200">4.9</span>
                  </div>
                  <span>•</span>
                  <span>v{currentApp.versionName || '1.0'}</span>
                  <span>•</span>
                  <span>{formatFileSize(currentApp.size)}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 max-w-xl pt-1">
                  {currentApp.summary || currentApp.description || 'Verified top-tier Android package.'}
                </p>
              </div>
            </div>

            {/* Action button */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate(`/app/${encodeURIComponent(currentApp.id)}`)}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-accent bg-accent-hover transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)] flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{t('viewAndDownload')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right preview screenshot & indicators */}
          <div className="w-full lg:w-auto flex flex-col items-center gap-3 shrink-0">
            {currentApp.screenshots && currentApp.screenshots.length > 0 ? (
              <div
                onClick={() => navigate(`/app/${encodeURIComponent(currentApp.id)}`)}
                className="relative w-48 sm:w-56 h-64 sm:h-76 rounded-2xl overflow-hidden border-2 border-slate-200/80 dark:border-slate-700/80 bg-slate-900 shadow-2xl group cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={currentApp.screenshots[0]}
                  alt={`${currentApp.name} screenshot`}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-[11px] font-semibold text-white flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{t('clickToEnlarge')}</span>
                  </span>
                </div>
              </div>
            ) : null}

            {/* Interactive Dot indicators only (arrow buttons removed per user instruction) */}
            <div className="flex items-center gap-2 pt-1">
              {featuredList.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? 'w-7 bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.6)]'
                      : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
