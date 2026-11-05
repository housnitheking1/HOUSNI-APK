export type ThemeMode = 'light' | 'dark';

export interface AccentColor {
  id: string;
  name: string;
  hex: string;
  hoverHex: string;
  rgb: string;
  lightRgba: string;
  ringRgba: string;
  gradient: string;
}

export const ACCENT_COLORS: AccentColor[] = [
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    hex: '#2563EB',
    hoverHex: '#1D4ED8',
    rgb: '37, 99, 235',
    lightRgba: 'rgba(37, 99, 235, 0.15)',
    ringRgba: 'rgba(37, 99, 235, 0.45)',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
  },
  {
    id: 'purple',
    name: 'Purple',
    hex: '#8B5CF6',
    hoverHex: '#7C3AED',
    rgb: '139, 92, 246',
    lightRgba: 'rgba(139, 92, 246, 0.15)',
    ringRgba: 'rgba(139, 92, 246, 0.45)',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  },
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    hex: '#10B981',
    hoverHex: '#059669',
    rgb: '16, 185, 129',
    lightRgba: 'rgba(16, 185, 129, 0.15)',
    ringRgba: 'rgba(16, 185, 129, 0.45)',
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
  {
    id: 'red',
    name: 'Red',
    hex: '#EF4444',
    hoverHex: '#DC2626',
    rgb: '239, 68, 68',
    lightRgba: 'rgba(239, 68, 68, 0.15)',
    ringRgba: 'rgba(239, 68, 68, 0.45)',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
  },
  {
    id: 'orange',
    name: 'Orange',
    hex: '#F97316',
    hoverHex: '#EA580C',
    rgb: '249, 115, 22',
    lightRgba: 'rgba(249, 115, 22, 0.15)',
    ringRgba: 'rgba(249, 115, 22, 0.45)',
    gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
  },
  {
    id: 'cyan',
    name: 'Cyan',
    hex: '#06B6D4',
    hoverHex: '#0891B2',
    rgb: '6, 182, 212',
    lightRgba: 'rgba(6, 182, 212, 0.15)',
    ringRgba: 'rgba(6, 182, 212, 0.45)',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
  },
  {
    id: 'pink',
    name: 'Pink',
    hex: '#EC4899',
    hoverHex: '#DB2777',
    rgb: '236, 72, 153',
    lightRgba: 'rgba(236, 72, 153, 0.15)',
    ringRgba: 'rgba(236, 72, 153, 0.45)',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
  },
  {
    id: 'gold',
    name: 'Gold',
    hex: '#D97706',
    hoverHex: '#B45309',
    rgb: '217, 119, 6',
    lightRgba: 'rgba(217, 119, 6, 0.15)',
    ringRgba: 'rgba(217, 119, 6, 0.45)',
    gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
  },
  {
    id: 'indigo',
    name: 'Indigo',
    hex: '#6366F1',
    hoverHex: '#4F46E5',
    rgb: '99, 102, 241',
    lightRgba: 'rgba(99, 102, 241, 0.15)',
    ringRgba: 'rgba(99, 102, 241, 0.45)',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
  },
  {
    id: 'teal',
    name: 'Teal',
    hex: '#14B8A6',
    hoverHex: '#0D9488',
    rgb: '20, 184, 166',
    lightRgba: 'rgba(20, 184, 166, 0.15)',
    ringRgba: 'rgba(20, 184, 166, 0.45)',
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
  },
];

export type NavigationItem = 'home' | 'android' | 'iphone' | 'games' | 'apps' | 'contact';

export type LegalModalType = 'about' | 'privacy' | 'terms' | 'disclaimer' | null;

export interface CategoryInfo {
  id: string;
  title: string;
  platform: 'android' | 'iphone';
  type: 'apps' | 'games';
  description: string;
  badge: string;
}

export interface FDroidApp {
  id: string;
  name: string;
  summary: string;
  description: string;
  categories: string[];
  isGame: boolean;
  iconUrl: string | null;
  screenshots: string[];
  license: string;
  sourceCode: string | null;
  added: number;
  lastUpdated: number;
  versionName: string;
  versionCode: number;
  size: number;
  sha256: string;
  apkUrl: string;
  apkName: string;
}

export interface FDroidRepoInfo {
  name: string;
  description: string;
  url: string;
  indexSha256: string;
  signingFingerprint: string;
  totalApps: number;
  totalGames: number;
  lastVerified: string;
  isOfficialVerified?: boolean;
}

export interface FDroidResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  apps: FDroidApp[];
}

