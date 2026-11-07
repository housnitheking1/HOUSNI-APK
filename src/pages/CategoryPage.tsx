import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Smartphone,
  Gamepad2,
  Monitor,
  RefreshCw,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { FDroidApp } from '../types.ts';
import { AppCard } from '../components/AppCard.tsx';
import { searchApps } from '../services/fdroidService.ts';
import { getPcApps, getPcGames } from '../services/pcService.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface CategoryConfig {
  id: string;
  title: string;
  platform: 'android' | 'pc';
  type: 'apps' | 'games';
  description: string;
  icon: React.ReactNode;
  iconColor: string;
}

const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  'android-apps': {
    id: 'android-apps',
    title: 'Android Applications',
    platform: 'android',
    type: 'apps',
    description: 'Explore verified Android software packages, productivity utilities, and everyday tools.',
    icon: <Smartphone className="w-6 h-6" />,
    iconColor: 'text-emerald-400',
  },
  'android-games': {
    id: 'android-games',
    title: 'Android Games',
    platform: 'android',
    type: 'games',
    description: 'Discover indie games, strategy titles, puzzles, and arcade favorites built for Android.',
    icon: <Gamepad2 className="w-6 h-6" />,
    iconColor: 'text-purple-400',
  },
  'pc-apps': {
    id: 'pc-apps',
    title: 'PC Software & Applications',
    platform: 'pc',
    type: 'apps',
    description: 'Explore verified desktop software, utilities, creative studios, and tools for Windows PC.',
    icon: <Monitor className="w-6 h-6" />,
    iconColor: 'text-cyan-400',
  },
  'pc-games': {
    id: 'pc-games',
    title: 'PC Games',
    platform: 'pc',
    type: 'games',
    description: 'Discover top free-to-play PC gaming titles, MMOs, shooters, strategy, and RPGs for Windows PC.',
    icon: <Flame className="w-6 h-6" />,
    iconColor: 'text-amber-400',
  },
};

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  const config = categoryId && CATEGORY_CONFIGS[categoryId]
    ? CATEGORY_CONFIGS[categoryId]
    : CATEGORY_CONFIGS['android-apps'];

  const isPcApps = config.id === 'pc-apps';
  const isPcGames = config.id === 'pc-games';

  const [apps, setApps] = useState<FDroidApp[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'name' | 'size'>('latest');

  const androidAppCategories = [
    'All',
    'Internet',
    'Multimedia',
    'System',
    'Security',
    'Science & Education',
    'Reading',
    'Writing',
    'Development',
    'Graphics',
  ];

  const androidGameCategories = [
    'All',
    'Puzzle Game',
    'Action Game',
    'Strategy Game',
    'Casual Game',
    'Board Game',
    'Card Game',
    'Role-Playing Game',
    'Sport Game',
  ];

  const pcAppCategories = [
    'All',
    'Multimedia',
    'Graphics',
    'Development',
    'System',
    'Utilities',
  ];

  const pcGameCategories = [
    'All',
    'Shooter',
    'Action Game',
    'Role-Playing Game',
    'Strategy',
    'MMO',
  ];

  const filterOptions = isPcApps
    ? pcAppCategories
    : isPcGames
    ? pcGameCategories
    : config.type === 'games'
    ? androidGameCategories
    : androidAppCategories;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveFilter('All');
    setSearchQuery('');
  }, [categoryId]);

  useEffect(() => {
    let isMounted = true;
    async function loadCategoryApps() {
      setLoading(true);
      try {
        if (isPcApps) {
          const res = await getPcApps({
            search: searchQuery,
            category: activeFilter,
            page: 1,
            limit: 24,
          });
          if (isMounted) {
            setApps(res.apps);
            setTotal(res.total);
            setPage(1);
            setTotalPages(res.totalPages);
          }
        } else if (isPcGames) {
          const res = await getPcGames({
            search: searchQuery,
            category: activeFilter,
            page: 1,
            limit: 24,
          });
          if (isMounted) {
            setApps(res.apps);
            setTotal(res.total);
            setPage(1);
            setTotalPages(res.totalPages);
          }
        } else {
          // Android apps or Android games
          let catParam: string | undefined = undefined;
          if (activeFilter !== 'All') {
            catParam = activeFilter;
          } else if (config.type === 'games') {
            catParam = 'games';
          } else {
            catParam = 'apps';
          }

          const res = await searchApps({
            search: searchQuery,
            category: catParam,
            sort: sortBy,
            page: 1,
            limit: 24,
          });

          if (isMounted) {
            setApps(res.apps);
            setTotal(res.total);
            setPage(1);
            setTotalPages(res.totalPages);
          }
        }
      } catch (err) {
        console.error('Error loading category apps:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCategoryApps();
    return () => {
      isMounted = false;
    };
  }, [categoryId, config.id, config.type, isPcApps, isPcGames, searchQuery, activeFilter, sortBy]);

  const handleLoadMore = async () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      if (isPcApps) {
        const res = await getPcApps({
          search: searchQuery,
          category: activeFilter,
          page: nextPage,
          limit: 24,
        });
        setApps((prev) => [...prev, ...res.apps]);
        setPage(nextPage);
      } else if (isPcGames) {
        const res = await getPcGames({
          search: searchQuery,
          category: activeFilter,
          page: nextPage,
          limit: 24,
        });
        setApps((prev) => [...prev, ...res.apps]);
        setPage(nextPage);
      } else {
        let catParam: string | undefined = undefined;
        if (activeFilter !== 'All') {
          catParam = activeFilter;
        } else if (config.type === 'games') {
          catParam = 'games';
        } else {
          catParam = 'apps';
        }

        const res = await searchApps({
          search: searchQuery,
          category: catParam,
          sort: sortBy,
          page: nextPage,
          limit: 24,
        });

        setApps((prev) => [...prev, ...res.apps]);
        setPage(nextPage);
      }
    } catch (err) {
      console.error('Error loading more apps:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-accent transition-colors"
          >
            <ArrowLeft className={`w-4 h-4 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            <span>{t('backToStore')}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>HOUSNI APK</span>
            <span>/</span>
            <span className="text-accent">{config.title}</span>
          </div>
        </div>

        {/* Category Header Banner */}
        <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0B132B]/80 backdrop-blur-xl shadow-md dark:shadow-[0_0_35px_rgba(0,0,0,0.5)]">
          {/* Subtle neon gradient behind title */}
          <div
            className="absolute top-0 right-0 w-80 h-80 blur-3xl opacity-15 pointer-events-none rounded-full"
            style={{ backgroundColor: 'var(--accent-color)' }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10 shadow-xs ${config.iconColor}`}
                style={{ backgroundColor: 'rgba(15, 23, 42, 0.08)' }}
              >
                {config.icon}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-md bg-accent-light border border-accent/20">
                  {config.platform === 'android' ? 'Android Ecosystem' : 'PC Windows Ecosystem'}
                </span>
                <h1 className="text-2xl sm:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight">
                  {config.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  {config.description}
                </p>
              </div>
            </div>

            <div className="self-start md:self-center px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-left shrink-0">
              <span className="text-[11px] text-slate-500 font-medium block">{t('catAvailablePackages')}</span>
              <span className="text-lg font-display font-black text-slate-900 dark:text-white">
                {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Real search, filters, sorting & 3-column square cards grid */}
        <div className="space-y-6">
          {/* Search and Filters Bar */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0B132B]/80 backdrop-blur-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`${t('catSearchWithin')} ${config.title}...`}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent"
                />
              </div>

              {/* Sort selector (Android only) */}
              {!isPcApps && !isPcGames && (
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                  <label htmlFor="sort-dropdown" className="text-xs text-slate-500 font-medium">{t('catSortBy')}</label>
                  <select
                    id="sort-dropdown"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-accent"
                  >
                    <option value="latest">{t('catSortLatest')}</option>
                    <option value="popular">{t('catSortPopular')}</option>
                    <option value="name">{t('catSortName')}</option>
                    <option value="size">{t('catSortSize')}</option>
                  </select>
                </div>
              )}
            </div>

            {/* Sub-Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {filterOptions.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-accent text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Applications Grid: 3 cards per row on desktop */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 animate-pulse p-4"
                />
              ))}
            </div>
          ) : apps.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
              {apps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
              <Search className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('catNoAppsFound')}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {t('catNoAppsSub')}
              </p>
            </div>
          )}

          {/* Load More Pagination */}
          {page < totalPages && (
            <div className="text-center pt-8">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-accent bg-accent-hover transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)] active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loadingMore ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{t('catLoadingMore')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('catLoadMore')} ({total - apps.length})</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
