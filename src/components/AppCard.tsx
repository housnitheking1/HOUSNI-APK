import React from 'react';
import { Download, HardDrive, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FDroidApp } from '../types.ts';
import { formatFileSize } from '../services/fdroidService.ts';

interface AppCardProps {
  app: FDroidApp;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/app/${encodeURIComponent(app.id)}`);
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/download/${encodeURIComponent(app.id)}`);
  };

  const primaryCategory = app.categories && app.categories.length > 0 ? app.categories[0] : 'Utility';

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
      className="group relative flex flex-col justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#0B132B]/80 hover:bg-slate-50 dark:hover:bg-[#0F1A3A]/90 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.35)] cursor-pointer text-left"
    >
      {/* Top Section: Icon, Name & Summary */}
      <div>
        <div className="flex items-start gap-3.5 mb-3">
          {/* App Icon */}
          <div className="w-13 h-13 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 shrink-0 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
            {app.iconUrl ? (
              <img
                src={app.iconUrl}
                alt={`${app.name} icon`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-display font-black text-accent text-lg">
                {app.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Title & Category Badge */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-accent-light text-accent border border-accent/25 truncate max-w-[130px]">
                {primaryCategory}
              </span>
              <span className="inline-flex items-center text-[10px] text-emerald-500 font-medium ml-auto shrink-0" title="Verified Safe Package">
                <ShieldCheck className="w-3 h-3 mr-0.5" />
                Verified
              </span>
            </div>

            <h3 className="text-sm font-display font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors truncate">
              {app.name}
            </h3>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
              {app.versionName ? `Version ${app.versionName}` : 'Latest Version'}
            </p>
          </div>
        </div>

        {/* Short Summary Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4 min-h-[32px]">
          {app.summary || app.description || 'Verified Android package.'}
        </p>
      </div>

      {/* Bottom Section: Details Link & Download Button */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          <HardDrive className="w-3 h-3 text-slate-400" />
          <span>{formatFileSize(app.size)}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* View Details Text Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-accent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Details
          </button>

          {/* Download APK Button */}
          <button
            type="button"
            onClick={handleDownloadClick}
            aria-label={`Download APK for ${app.name}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-accent bg-accent-hover transition-all duration-200 shadow-xs hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] active:scale-95 focus:outline-none"
          >
            <Download className="w-3.5 h-3.5" />
            <span>APK</span>
          </button>
        </div>
      </div>
    </div>
  );
};
