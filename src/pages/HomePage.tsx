import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  TrendingUp,
  Sparkles,
  Flame,
  ArrowRight,
  Mountain,
  Search,
  Clock,
} from 'lucide-react';
import { HeroSection } from '../components/HeroSection.tsx';
import { AppCard } from '../components/AppCard.tsx';
import { AdSenseBanner } from '../components/AdSenseBanner.tsx';
import { ContactSection } from '../components/ContactSection.tsx';
import { EditorsChoiceBanner } from '../components/EditorsChoiceBanner.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { getFeaturedApps, searchApps, FeaturedAppsData } from '../services/fdroidService.ts';
import { FDroidApp } from '../types.ts';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredData, setFeaturedData] = useState<FeaturedAppsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Search state when visitor types in the hero search bar
  const [searchResults, setSearchResults] = useState<FDroidApp[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const data = await getFeaturedApps();
        if (isMounted) setFeaturedData(data);
      } catch (err) {
        console.error('Failed to load featured apps:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    let isMounted = true;
    setIsSearching(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await searchApps({
          search: searchQuery,
          limit: 12,
        });
        if (isMounted) {
          setSearchResults(res.apps);
          setIsSearching(false);
        }
      } catch (err) {
        console.error('Search error:', err);
        if (isMounted) setIsSearching(false);
      }
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  const sections = [
    {
      id: 'recently-updated',
      title: t('secRecentlyUpdated'),
      categoryPath: '/category/android-apps',
      icon: <Clock className="w-5 h-5" />,
      iconColor: 'text-cyan-400',
      glowColor: 'rgba(34, 211, 238, 0.4)',
      apps: featuredData?.recentlyUpdated || [],
    },
    {
      id: 'popular-games',
      title: t('secPopularGames'),
      categoryPath: '/category/android-games',
      icon: <Trophy className="w-5 h-5" />,
      iconColor: 'text-amber-400',
      glowColor: 'rgba(251, 191, 36, 0.4)',
      apps: featuredData?.popularGames || [],
    },
    {
      id: 'trending-apps',
      title: t('secTrendingApps'),
      categoryPath: '/category/android-apps',
      icon: <TrendingUp className="w-5 h-5" />,
      iconColor: 'text-accent',
      glowColor: 'rgba(var(--accent-rgb), 0.45)',
      apps: featuredData?.trendingApps || [],
    },
    {
      id: 'latest-applications',
      title: t('secLatestApps'),
      categoryPath: '/category/android-apps',
      icon: <Sparkles className="w-5 h-5" />,
      iconColor: 'text-emerald-400',
      glowColor: 'rgba(52, 211, 153, 0.4)',
      apps: featuredData?.latestApplications || [],
    },
    {
      id: 'featured-games',
      title: t('secFeaturedGames'),
      categoryPath: '/category/android-games',
      icon: <Flame className="w-5 h-5" />,
      iconColor: 'text-rose-400',
      glowColor: 'rgba(251, 113, 133, 0.4)',
      apps: featuredData?.featuredGames || [],
    },
  ];

  return (
    <div className="space-y-12">
      {/* 1. Cinematic Hero Section with Mountain Background, Search Bar & Category Cards */}
      <div id="home">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* 2. Responsive Ad Placement */}
      <AdSenseBanner />

      {/* 3. Editor's Choice Featured Showcase Banner */}
      {!searchQuery.trim() && (
        <EditorsChoiceBanner
          apps={featuredData?.trendingApps || featuredData?.latestApplications || []}
        />
      )}

      {/* 3. If visitor is searching on homepage: Show Search Results Section */}
      {searchQuery.trim() ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 dark:text-white">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSearching ? 'Searching...' : `Found ${searchResults.length} matching packages`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(`/category/android-apps?search=${encodeURIComponent(searchQuery)}`)}
              className="text-xs font-bold text-accent hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {searchResults.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          ) : !isSearching ? (
            <div className="p-12 text-center rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
              <Search className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-900 dark:text-white">No results found</p>
              <p className="text-xs text-slate-500">Try another search term or browse our categories.</p>
            </div>
          ) : null}
        </div>
      ) : (
        /* 4. Default Curated Home Sections (Clean HOUSNI APK Presentation) */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 space-y-5">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/10 ${section.iconColor}`}
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.08)',
                      boxShadow: `0 0 10px ${section.glowColor}`,
                    }}
                  >
                    {section.icon}
                  </div>
                  <h2 className="text-lg sm:text-xl font-display font-extrabold tracking-wide text-slate-900 dark:text-white uppercase">
                    {section.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(section.categoryPath)}
                  className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-accent hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <span>See All</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Grid of 4 to 8 AppCards */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-44 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 animate-pulse p-4"
                    />
                  ))}
                </div>
              ) : section.apps && section.apps.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {section.apps.slice(0, 8).map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white/90 dark:bg-[#0B132B]/70 backdrop-blur-xl min-h-[160px] flex items-center justify-center p-6 text-center">
                  <div className="text-center space-y-2">
                    <Mountain className="w-6 h-6 text-accent mx-auto" />
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Loading Packages...
                    </p>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      )}

      {/* 5. Contact Section */}
      <ContactSection />
    </div>
  );
};
