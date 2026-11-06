import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Smartphone, Apple, Gamepad2, Layers, Download } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';
import { ColorPickerPopover } from './ColorPickerPopover.tsx';
import { LanguageSwitcher } from './LanguageSwitcher.tsx';
import { NavigationItem } from '../types.ts';

interface HeaderProps {
  activeNav?: NavigationItem;
  onNavigate?: (item: NavigationItem) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeNav, onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { id: 'android', label: t('navAndroid'), path: '/category/android-apps', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'iphone', label: t('navIPhone'), path: '/category/iphone-apps', icon: <Apple className="w-4 h-4" /> },
    { id: 'games', label: t('navGames'), path: '/category/android-games', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'apps', label: t('navApps'), path: '/category/android-apps', icon: <Layers className="w-4 h-4" /> },
  ];

  const handleNavClick = (path: string, id: NavigationItem) => {
    navigate(path);
    if (onNavigate) onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    if (onNavigate) onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#contact');
      setTimeout(() => {
        const contactEl = document.getElementById('contact');
        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 dark:bg-[#070B14]/90 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & HOUSNI APK */}
        <a
          href="/"
          onClick={handleHomeClick}
          className="flex items-center gap-2.5 group shrink-0 focus:outline-none"
        >
          {/* Mountain Logo provided by user */}
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-accent/40 flex items-center justify-center shadow-[0_0_15px_rgba(var(--accent-rgb),0.35)] group-hover:scale-105 transition-transform duration-200">
            <img
              src="https://i.ibb.co/xK7V7yXt/mountain.webp"
              alt="HOUSNI APK Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-accent transition-colors">
            HOUSNI <span className="text-accent">APK</span>
          </span>
        </a>

        {/* Center: Desktop Navigation Links (Android, iPhone, Games, Apps) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.path, link.id as NavigationItem)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-accent font-semibold bg-accent-light border border-accent/40 shadow-[0_0_12px_rgba(var(--accent-rgb),0.25)]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Theme Toggle, Color Picker, Install & Hamburger Menu */}
        <div className="flex items-center gap-2 shrink-0">
          {/* In-App PWA Install Button */}
          {!isInstalled && isInstallable && (
            <button
              type="button"
              onClick={install}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-accent bg-accent-hover transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}

          {/* Language Switcher (EN / AR) */}
          <LanguageSwitcher />

          {/* Custom Color Palette Picker */}
          <ColorPickerPopover />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all focus:outline-none hover:border-accent/40 cursor-pointer"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none hover:border-accent/40 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Slide-down Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#070B14]/95 px-4 pt-3 pb-5 space-y-1.5 animate-in slide-in-from-top-2 duration-150 shadow-2xl backdrop-blur-2xl">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.path, link.id as NavigationItem)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-accent font-semibold bg-accent-light border border-accent/40 shadow-[0_0_12px_rgba(var(--accent-rgb),0.25)]'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-accent' : 'text-slate-500 dark:text-slate-400'}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
            <button
              type="button"
              onClick={handleContactClick}
              className="w-full text-left px-3.5 py-2 text-xs font-semibold text-accent hover:underline cursor-pointer"
            >
              Contact Us &rarr;
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
