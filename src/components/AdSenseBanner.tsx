import React from 'react';
import { Sparkles } from 'lucide-react';

interface AdSenseBannerProps {
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0B132B]/80 backdrop-blur-xl p-5 sm:p-7 shadow-sm dark:shadow-[0_0_25px_rgba(0,0,0,0.5)]">
        {/* Dynamic Blue & Purple Neon Ambient Background Gradient */}
        <div
          className="absolute inset-0 opacity-15 dark:opacity-20 pointer-events-none transition-all duration-500"
          style={{
            background:
              'linear-gradient(135deg, var(--accent-color) 0%, #8B5CF6 50%, #06B6D4 100%)',
          }}
        />

        {/* Subtle Tech Circuit / Grid Lines Motif */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
          aria-hidden="true"
        />

        {/* Top Header: Small AD label & Google AdSense indicator */}
        <div className="flex items-center justify-between mb-4 relative z-10 text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-accent font-mono text-[10px] shadow-xs">
            AD
          </span>
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Sparkles className="w-3 h-3 text-accent" /> Google AdSense Placeholder
          </span>
        </div>

        {/* Main Banner Container */}
        <div className="relative z-10 w-full h-24 sm:h-28 rounded-xl border border-dashed border-slate-300 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-900/60 flex flex-col items-center justify-center p-3 text-center transition-all hover:border-accent/60">
          <p className="text-sm sm:text-base font-display font-bold text-slate-900 dark:text-white tracking-wide flex items-center gap-2">
            <span>Advertisement Space</span>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-500">·</span>
            <span className="text-accent drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]">
              Your Ad Here
            </span>
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
            Responsive Leaderboard & In-Feed Display Unit
          </p>
        </div>
      </div>
    </div>
  );
};
