import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Smartphone, Gamepad2, ShoppingBag, Flame, ArrowRight, Sparkles, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.tsx';
import { searchApps } from '../services/fdroidService.ts';
import { FDroidApp } from '../types.ts';

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  icon: React.ReactNode;
  iconColor: string;
  glowColor: string;
}

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory?: string | null;
  onSelectCategory?: (categoryId: string | null) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}) => {
  const { t } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState<FDroidApp[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setAutocompleteResults([]);
      setShowDropdown(false);
      return;
    }

    let isMounted = true;
    const timeout = setTimeout(async () => {
      try {
        const res = await searchApps({ search: searchQuery.trim(), limit: 5 });
        if (isMounted) {
          setAutocompleteResults(res.apps || []);
          setShowDropdown(true);
        }
      } catch (e) {
        console.warn('Autocomplete fetch failed:', e);
      }
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories: CategoryItem[] = [
    {
      id: 'android-apps',
      title: t('catAndroidAppsTitle'),
      subtitle: t('catAndroidAppsSub'),
      badge: 'APK',
      icon: <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />,
      iconColor: 'text-emerald-400',
      glowColor: 'rgba(52, 211, 153, 0.4)',
    },
    {
      id: 'android-games',
      title: t('catAndroidGamesTitle'),
      subtitle: t('catAndroidGamesSub'),
      badge: 'Games',
      icon: <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />,
      iconColor: 'text-purple-400',
      glowColor: 'rgba(192, 132, 252, 0.4)',
    },
    {
      id: 'pc-apps',
      title: t('catPCAppsTitle'),
      subtitle: t('catPCAppsSub'),
      badge: 'PC',
      icon: <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />,
      iconColor: 'text-cyan-400',
      glowColor: 'rgba(34, 211, 238, 0.4)',
    },
    {
      id: 'pc-games',
      title: t('catPCGamesTitle'),
      subtitle: t('catPCGamesSub'),
      badge: 'PC Games',
      icon: <Flame className="w-4 h-4 sm:w-5 sm:h-5" />,
      iconColor: 'text-amber-400',
      glowColor: 'rgba(251, 191, 36, 0.4)',
    },
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-12 sm:pb-16 transition-colors">
      {/* 1. Cinematic Mountain Landscape Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_mountain_landscape_1793874360238.jpg"
          alt="Cinematic neon mountain landscape"
          className="w-full h-full object-cover object-center scale-105"
        />

        {/* Dynamic Neon Color Overlay (shifts mountain lighting to selected accent color) */}
        <div
          className="absolute inset-0 mix-blend-color opacity-70 pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: 'var(--accent-color)' }}
        />

        {/* Dynamic Neon Rim Lighting Radial Glow over mountain ridge */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background:
              'radial-gradient(ellipse 85% 55% at 50% 25%, rgba(var(--accent-rgb), 0.38) 0%, rgba(var(--accent-rgb), 0.12) 45%, transparent 75%)',
          }}
        />

        {/* Atmospheric mist fading cleanly into the page content below */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/70 to-transparent dark:from-[#070B14] dark:via-[#070B14]/70 dark:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent dark:from-[#070B14]/85 dark:via-transparent dark:to-transparent pointer-events-none" />
      </div>

      {/* 2. Floating Application Icons around the Mountains */}
      <div className="absolute inset-0 pointer-events-none z-10 max-w-6xl mx-auto overflow-hidden hidden sm:block">
        {/* Android Icon (Left Upper) */}
        <div className="absolute top-[12%] left-[8%] animate-float">
          <div className="w-11 h-11 rounded-2xl glass-card border border-slate-200/80 dark:border-accent/40 flex items-center justify-center text-emerald-500 dark:text-emerald-400 shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] dark:shadow-[0_0_20px_rgba(var(--accent-rgb),0.35)] backdrop-blur-md">
            <Smartphone className="w-5 h-5 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
        </div>

        {/* PC / Monitor Icon (Right Upper) */}
        <div className="absolute top-[10%] right-[10%] animate-float-delayed">
          <div className="w-11 h-11 rounded-2xl glass-card border border-slate-200/80 dark:border-accent/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] dark:shadow-[0_0_20px_rgba(var(--accent-rgb),0.35)] backdrop-blur-md">
            <Monitor className="w-5 h-5 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
          </div>
        </div>

        {/* Google Play Style Icon (Left Mid) */}
        <div className="absolute top-[32%] left-[5%] animate-float-reverse">
          <div className="w-10 h-10 rounded-2xl glass-card border border-slate-200/80 dark:border-accent/40 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] dark:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] backdrop-blur-md">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a1.94 1.94 0 0 1-.61-.926V2.74c.15-.34.37-.66.609-.926zm11.603 11.606l2.124 2.123-11.89 6.866 9.766-8.989zm0-2.84L5.446 1.591l11.89 6.866-2.124 2.123zm1.42 1.42l3.447 1.99a1.69 1.69 0 0 1 0 2.934l-3.447 1.99-1.841-1.841 1.841-1.841z" />
            </svg>
          </div>
        </div>

        {/* Gaming Controller Icon (Right Mid) */}
        <div className="absolute top-[30%] right-[6%] animate-float">
          <div className="w-11 h-11 rounded-2xl glass-card border border-slate-200/80 dark:border-accent/40 flex items-center justify-center text-purple-500 dark:text-purple-400 shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] dark:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] backdrop-blur-md">
            <Gamepad2 className="w-5 h-5 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          </div>
        </div>

        {/* App Store / Discovery Bag Icon (Lower Left) */}
        <div className="absolute top-[48%] left-[10%] animate-float-delayed">
          <div className="w-9 h-9 rounded-2xl glass-card border border-slate-200/80 dark:border-accent/40 flex items-center justify-center text-cyan-500 dark:text-cyan-400 shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)] dark:shadow-[0_0_15px_rgba(var(--accent-rgb),0.35)] backdrop-blur-md">
            <ShoppingBag className="w-4 h-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          </div>
        </div>
      </div>

      {/* 3. Hero Content: HOUSNI APK, Subtitle, Search Bar, and Category Cards docked together on the banner */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Brand Name "HOUSNI APK" Large, Centered and Visually Dominant */}
        <div className="relative mb-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-slate-900 dark:text-white neon-text-glow select-none">
            HOUSNI <span className="text-accent">APK</span>
          </h1>
          {/* Subtle Ambient Behind Title */}
          <div
            className="absolute -inset-x-8 -inset-y-4 -z-10 blur-2xl opacity-30 dark:opacity-40 rounded-full transition-colors duration-500"
            style={{
              background: 'radial-gradient(circle, var(--accent-color) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Short Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-200 max-w-xl mx-auto font-normal leading-relaxed text-balance drop-shadow-xs mb-6">
          {t('heroSubtitle')}
        </p>

        {/* Modern Glowing Search Bar */}
        <div className="w-full max-w-2xl relative mb-6">
          <div
            className={`relative flex items-center w-full rounded-2xl glass-card transition-all duration-300 ${
              isFocused
                ? 'border-accent shadow-[0_0_30px_rgba(var(--accent-rgb),0.35)] dark:shadow-[0_0_30px_rgba(var(--accent-rgb),0.55)] ring-2 ring-accent'
                : 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 shadow-md dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
            }`}
          >
            {/* Search Icon with Dynamic Neon Accent */}
            <div className="pl-5 flex items-center pointer-events-none text-slate-400">
              <Search
                className={`w-5 h-5 transition-colors duration-200 ${
                  isFocused ? 'text-accent drop-shadow-[0_0_8px_var(--accent-color)]' : 'text-slate-400'
                }`}
              />
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={t('searchPlaceholder')}
              aria-label={t('searchPlaceholder')}
              className="w-full py-3.5 sm:py-4 pl-3.5 pr-12 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 bg-transparent rounded-2xl focus:outline-none"
            />

            {/* Clear Button */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                aria-label={t('clearSearch')}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown Popover */}
          {showDropdown && autocompleteResults.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-2 z-50 bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-2xl border border-slate-200 dark:border-accent/40 rounded-2xl shadow-2xl overflow-hidden text-left p-2 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span>{t('quickMatches')}</span>
                </span>
                <span className="text-accent">{autocompleteResults.length} {t('results')}</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-72 overflow-y-auto">
                {autocompleteResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate(`/app/${encodeURIComponent(item.id)}`);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer group text-left"
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 shrink-0 flex items-center justify-center shadow-xs">
                      {item.iconUrl ? (
                        <img src={item.iconUrl} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-bold text-accent text-sm">{item.name.charAt(0)}</span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {item.categories && item.categories[0] ? item.categories[0] : 'Utility'} • v{item.versionName || '1.0'}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                ))}
              </div>

              <div className="p-2 border-t border-slate-100 dark:border-slate-800 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowDropdown(false);
                    navigate(`/category/android-apps?search=${encodeURIComponent(searchQuery)}`);
                  }}
                  className="w-full py-2 text-center text-xs font-bold text-accent hover:underline flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>{t('viewAllResults')} "{searchQuery}"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4. Category Cards in ONE SINGLE HORIZONTAL ROW on desktop, compact and sleek */}
        <div className="w-full max-w-5xl px-2 sm:px-0">
          <div className="flex md:grid md:grid-cols-4 gap-2 sm:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-none snap-x">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    navigate(`/category/${cat.id}`);
                    if (onSelectCategory) onSelectCategory(cat.id);
                  }}
                  className={`group relative shrink-0 w-[240px] sm:w-[260px] md:w-auto snap-start p-2.5 sm:p-3 rounded-2xl text-left transition-all duration-300 flex items-center justify-between backdrop-blur-xl border cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900/95 border-accent shadow-[0_0_20px_rgba(var(--accent-rgb),0.35)] ring-2 ring-accent'
                      : 'bg-white/95 dark:bg-[#0B132B]/85 hover:bg-slate-50 dark:hover:bg-[#0F1A3A]/90 border-slate-200 dark:border-slate-700/80 hover:border-accent/70 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.35)] hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10 transition-transform duration-200 group-hover:scale-105 ${cat.iconColor}`}
                      style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.06)',
                        boxShadow: `0 0 10px ${cat.glowColor}`,
                      }}
                    >
                      {cat.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs sm:text-sm font-display font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors truncate">
                          {cat.title}
                        </h3>
                        {cat.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-accent-light text-accent border border-accent/20 uppercase shrink-0">
                            {cat.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate leading-tight mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-400 shrink-0 ml-1.5 transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white ${
                      isSelected
                        ? 'bg-accent border-accent text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800/60'
                    }`}
                  >
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
