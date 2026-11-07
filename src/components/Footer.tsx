import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import { LegalModalType, NavigationItem } from '../types.ts';

interface FooterProps {
  onNavigate?: (item: NavigationItem) => void;
  onOpenLegal: (type: LegalModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const handleLink = (path: string, item: NavigationItem) => {
    navigate(path);
    if (onNavigate) onNavigate(item);
  };

  const handleContact = () => {
    if (location.pathname !== '/') {
      navigate('/#contact');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    if (onNavigate) onNavigate('contact');
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/70 dark:bg-[#060A13] transition-colors duration-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800/80">
          {/* Left: HOUSNI APK Logo & Brand with short description */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-accent/40 flex items-center justify-center shadow-xs dark:shadow-[0_0_12px_rgba(var(--accent-rgb),0.5)]">
                <img
                  src="https://i.ibb.co/xK7V7yXt/mountain.webp"
                  alt="HOUSNI APK Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-display font-black tracking-tight text-slate-900 dark:text-white">
                HOUSNI <span className="text-accent">APK</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {t('footerDesc')}
            </p>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex items-center flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
            <button
              type="button"
              onClick={() => handleLink('/category/android-apps', 'android')}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              {t('navAndroid')}
            </button>
            <button
              type="button"
              onClick={() => handleLink('/category/pc-apps', 'pc')}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              {t('navPC')}
            </button>
            <button
              type="button"
              onClick={() => handleLink('/category/android-games', 'games')}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              {t('navGames')}
            </button>
            <button
              type="button"
              onClick={() => handleLink('/category/android-apps', 'apps')}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              {t('navApps')}
            </button>
            <button
              type="button"
              onClick={handleContact}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              {t('navContact')}
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              {t('navPrivacy')}
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              {t('navTerms')}
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Small Horizontal Circular Social Icons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 HOUSNI APK. {t('footerRights')}</p>

          <div className="flex items-center gap-3">
            {/* Instagram Small Circular Icon */}
            <a
              href="https://www.instagram.com/im.housni/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram: im.housni"
              title="Instagram"
              className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#DD2A7B] hover:border-[#DD2A7B]/50 hover:shadow-xs transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Facebook Small Circular Icon */}
            <a
              href="https://www.facebook.com/bouemirhousni"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook: bouemirhousni"
              title="Facebook"
              className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#1877F2] hover:border-[#1877F2]/50 hover:shadow-xs transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* TikTok Small Circular Icon */}
            <a
              href="https://www.tiktok.com/@im.housni"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok: @im.housni"
              title="TikTok"
              className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#00f2fe] hover:border-[#00f2fe]/50 hover:shadow-xs transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c0 .87-.13 1.75-.45 2.58-.75 2.05-2.53 3.66-4.63 4.23-1.35.37-2.78.37-4.13.01-2.09-.56-3.87-2.16-4.63-4.21-.32-.83-.46-1.71-.46-2.58 0-.87.14-1.75.46-2.58.76-2.05 2.54-3.65 4.63-4.21 1.05-.28 2.15-.34 3.23-.17v4.13c-.56-.17-1.17-.18-1.74-.03-.78.2-1.44.75-1.77 1.48-.19.42-.26.88-.26 1.34 0 .46.07.92.26 1.34.33.73.99 1.28 1.77 1.48.78.2 1.61.1 2.3-.28.69-.38 1.17-1.07 1.28-1.85.04-.32.05-.64.05-.96V.02h-.57z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
