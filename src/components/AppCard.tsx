import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FDroidApp } from '../types.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface AppCardProps {
  app: FDroidApp;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleCardClick = () => {
    navigate(`/app/${encodeURIComponent(app.id)}`);
  };

  const primaryCategory = app.categories && app.categories.length > 0 ? app.categories[0] : (app.isGame ? 'Game' : 'App');

  // Choose the visual: icon or screenshot preview
  const displayImage = app.iconUrl || (app.screenshots && app.screenshots.length > 0 ? app.screenshots[0] : null);

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className="group relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#0B132B]/90 hover:border-accent/70 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.35)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between p-3 select-none"
    >
      {/* Background Subtle Artwork / Glow if screenshot exists */}
      {app.screenshots && app.screenshots.length > 0 && (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-25 dark:opacity-20 group-hover:opacity-40 transition-opacity">
          <img
            src={app.screenshots[0]}
            alt=""
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0B132B] dark:via-[#0B132B]/80 dark:to-transparent" />
        </div>
      )}

      {/* Top Bar: Category Pill */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg bg-slate-900/75 dark:bg-slate-950/80 text-white backdrop-blur-md border border-white/10 shadow-xs truncate max-w-[120px]">
          {primaryCategory}
        </span>
        {app.isGame && (
          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
            GAME
          </span>
        )}
      </div>

      {/* Center: Prominent App Icon / Cover Image */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-2">
        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
          {displayImage ? (
            <img
              src={displayImage}
              alt={app.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="font-display font-black text-accent text-3xl">
              {app.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar: Compact Title Only */}
      <div className="relative z-10 w-full p-2 rounded-xl bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-white/10 group-hover:border-accent/40 transition-colors text-center">
        <h3 className="text-xs sm:text-sm font-display font-bold text-slate-900 dark:text-white truncate group-hover:text-accent transition-colors">
          {app.name}
        </h3>
      </div>
    </div>
  );
};
