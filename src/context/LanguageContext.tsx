import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export const translations: Translations = {
  // Navigation & Branding
  brandName: { en: 'HOUSNI APK', ar: 'HOUSNI APK' },
  navAndroid: { en: 'Android', ar: 'أندرويد' },
  navPC: { en: 'PC', ar: 'حاسوب' },
  navGames: { en: 'Games', ar: 'الألعاب' },
  navApps: { en: 'Apps', ar: 'التطبيقات' },
  navContact: { en: 'Contact Us', ar: 'اتصل بنا' },
  navPrivacy: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  navTerms: { en: 'Terms of Service', ar: 'شروط الاستخدام' },
  installApp: { en: 'Install App', ar: 'تثبيت التطبيق' },
  searchPlaceholder: { en: 'Search apps and games...', ar: 'ابحث عن التطبيقات والألعاب...' },
  clearSearch: { en: 'Clear search', ar: 'مسح البحث' },
  quickMatches: { en: 'Quick Matches', ar: 'اقتراحات سريعة' },
  viewAllResults: { en: 'View all results in store for', ar: 'عرض جميع النتائج في المتجر لـ' },
  results: { en: 'results', ar: 'نتائج' },

  // Hero Section
  heroTitle: { en: 'HOUSNI APK', ar: 'HOUSNI APK' },
  heroSubtitle: {
    en: 'Discover and download verified applications and games for Android and PC.',
    ar: 'اكتشف وحمّل تطبيقات وألعاب الهاتف والحاسوب الموثوقة والآمنة.',
  },
  catAndroidAppsTitle: { en: 'Android Apps', ar: 'تطبيقات أندرويد' },
  catAndroidAppsSub: { en: 'Free Apps & Tools', ar: 'تطبيقات وأدوات مجانية' },
  catAndroidGamesTitle: { en: 'Android Games', ar: 'ألعاب أندرويد' },
  catAndroidGamesSub: { en: 'Action, Puzzle & RPG', ar: 'أكشن، ألغاز واستراتيجيا' },
  catPCAppsTitle: { en: 'PC Software', ar: 'برامج الحاسوب' },
  catPCAppsSub: { en: 'Desktop Utilities & Tools', ar: 'برامج وأدوات سطح المكتب' },
  catPCGamesTitle: { en: 'PC Games', ar: 'ألعاب الحاسوب' },
  catPCGamesSub: { en: 'Action, Shooter & RPG', ar: 'أكشن، إطلاق نار واستراتيجيا' },

  // Editor's Choice
  editorsChoiceBadge: { en: "Editor's Choice", ar: 'اختيار المحرر' },
  verifiedSafe: { en: 'Verified Safe APK', ar: 'حزمة APK آمنة ومفحوصة' },
  viewAndDownload: { en: 'View & Download App', ar: 'استعراض وتحميل التطبيق' },
  appDetails: { en: 'App Details', ar: 'تفاصيل التطبيق' },

  // Homepage Sections
  secRecentlyUpdated: { en: 'RECENTLY UPDATED', ar: 'تم تحديثها مؤخراً' },
  secPopularGames: { en: 'POPULAR GAMES', ar: 'ألعاب شائعة ومختارة' },
  secTrendingApps: { en: 'TRENDING APPS', ar: 'تطبيقات رائجة وعالمية' },
  secLatestApps: { en: 'LATEST APPLICATIONS', ar: 'أحدث الإضافات' },
  secFeaturedGames: { en: 'FEATURED GAMES', ar: 'ألعاب مميزة' },

  // Card Controls
  viewDetails: { en: 'View Details', ar: 'عرض التفاصيل' },
  verifiedBadge: { en: 'Verified', ar: 'موثوق' },
  downloadApk: { en: 'Download APK', ar: 'تحميل ملف APK' },

  // App Detail Page
  backToStore: { en: 'Back', ar: 'رجوع' },
  aboutApp: { en: 'About', ar: 'حول' },
  screenshotsTitle: { en: 'Application Preview & Screenshots', ar: 'معاينة ولقطات الشاشة' },
  clickToEnlarge: { en: 'Click to enlarge', ar: 'اضغط للتكبير' },
  packageDetailsTitle: { en: 'Package Details & Specifications', ar: 'المواصفات وتفاصيل الحزمة' },
  latestVersion: { en: 'Latest Version', ar: 'أحدث إصدار' },
  downloadSize: { en: 'Download Size', ar: 'حجم الملف' },
  androidReq: { en: 'Android Requirement', ar: 'نظام التشغيل المطلوب' },
  packageId: { en: 'Package Identifier', ar: 'معرّف الحزمة' },
  license: { en: 'Software License', ar: 'ترخيص البرنامج' },
  lastRelease: { en: 'Last Release Date', ar: 'تاريخ آخر تحديث' },
  readyToInstall: { en: 'Ready to install', ar: 'جاهز لتثبيت' },
  downloadApkBtn: { en: 'Download APK', ar: 'تحميل ملف APK' },
  securityReportBtn: { en: 'Verified Safe • Security Report', ar: 'آمن ومفحوص • تقرير الأمان' },
  showLess: { en: 'Show Less', ar: 'عرض أقل' },
  readMore: { en: 'Read Full Description', ar: 'قراءة الوصف الكامل' },

  // Download Page & Security Check
  downloadGateway: { en: 'Secure Download Gateway', ar: 'بوابة التحميل الآمن' },
  preparingDownload: { en: 'Preparing Your Download for', ar: 'جاري تجهيز التحميل لـ' },
  step1: { en: '1. Security Check', ar: '1. فحص الأمان' },
  step2: { en: '2. Link Prep', ar: '2. تجهيز الرابط' },
  step3: { en: '3. Download APK', ar: '3. تنزيل الحزمة' },
  smartSecurityTitle: { en: 'Smart Security & Anti-Bot Verification', ar: 'فحص الأمان وتأكيد التحميل' },
  smartSecuritySub: { en: 'Instant malware and cryptographic signature verification', ar: 'فحص فوري للبصمة الرقمية ومكافحة الفيروسات' },
  verifyButton: { en: 'Verify & Prepare Download', ar: 'تأكيد الأمان وتجهيز الرابط' },
  verifiedSuccessTitle: { en: 'Security Verification Passed', ar: 'تم فحص الحزمة وتأكيد الأمان بنجاح' },
  verifiedSuccessSub: { en: 'Package is 100% clean and ready for direct download', ar: 'الحزمة آمنة 100% وجاهزة للتنزيل المباشر' },
  downloadReady: { en: 'Official Download Ready', ar: 'الرابط الرسمي جاهز' },
  downloadNow: { en: 'Download APK Now', ar: 'تحميل ملف APK الآن' },
  downloadStarted: { en: 'Your download has started. If it does not start automatically, click the button above again.', ar: 'بدأ التنزيل الآن. إذا لم يبدأ تلقائياً، اضغط على الزر أعلاه مرة أخرى.' },

  // Social Community
  socialTitle: { en: 'Follow Our Official Social Media Channels', ar: 'تابع حساباتنا على مواقع التواصل الاجتماعي' },
  socialSubtitle: {
    en: 'Join our community for daily APK updates, exclusive app releases, and direct support.',
    ar: 'انضم إلينا للحصول على أحدث التحديثات، واقتراح تطبيقات وألعاب جديدة، والاستفادة من الدعم المباشر.',
  },
  socialThanks: { en: 'Thank you for your support', ar: 'شكراً لدعمكم المتواصل' },

  // Security Audit Modal
  auditModalTitle: { en: 'Security Audit & Safety Report', ar: 'تقرير فحص الأمان والحماية' },
  auditPackageAudit: { en: 'Package security audit for:', ar: 'فحص أمان الحزمة:' },
  auditCryptoTitle: { en: 'Cryptographic Signature Verification', ar: 'مطابقة التوقيع الرقمي (Cryptographic Signature)' },
  auditCryptoDesc: {
    en: 'Package is signed with the developer certificate and verified against official repository hashes.',
    ar: 'الحزمة موقعة بنفس شهادة المطور المعتمدة لدى المستودع الرسمي ومطابقة بنسبة 100%.',
  },
  auditCleanTitle: { en: 'Clean of Malware & Hidden Adware', ar: 'خالٍ من البرمجيات الخبيثة والإعلانات (Clean of Malware)' },
  auditCleanDesc: {
    en: 'APK contains zero trojans, spyware, deceptive installers, or background adware.',
    ar: 'لا يحتوي ملف APK على أي برمجيات تجسس أو إعلانات خفية أو أكواد مشبوهة.',
  },
  auditTrackersTitle: { en: 'Privacy & Telemetry Scan (0 Trackers)', ar: 'فحص التتبّع والخصوصية (0 Trackers Found)' },
  auditTrackersDesc: {
    en: 'Built directly from open source code without third-party invasive telemetry trackers.',
    ar: 'التطبيق مفتوح المصدر ومبني من الكود المصدري الأصلي دون إدراج حزم تتبع خارجية.',
  },
  auditDirectTitle: { en: 'Direct Official Download Link', ar: 'رابط التنزيل المباشر الرسمي' },
  auditDirectDesc: {
    en: 'File is delivered directly from verified servers without third-party download managers.',
    ar: 'الملف يتم سحبه وتنزيله مباشرة بدون أي تطبيقات وسيطة أو برامج تثبيت طرف ثالث.',
  },
  auditClose: { en: 'Close Report', ar: 'إغلاق التقرير' },

  // Smart Security Check
  secScanReady: { en: 'Ready for security verification', ar: 'جاهز للفحص الأمني' },
  secScanReading: { en: 'Reading package manifest & digital fingerprint...', ar: 'جاري قراءة الحزمة وفحص البصمة الرقمية...' },
  secScanMatching: { en: 'Matching cryptographic signature & anti-malware...', ar: 'مطابقة توقيع المطور الرسمي وفحص مكافحة الفيروسات...' },
  secScanVerifying: { en: 'Verifying code integrity & zero trackers...', ar: 'التحقق من سلامة الأكواد وخلوها من برامج التتبع...' },
  secScanComplete: { en: 'Verification complete! Package is 100% secure.', ar: 'اكتمل الفحص بنجاح! الحزمة آمنة 100%' },
  secScanVerifiedHeading: { en: 'Security Verification Passed', ar: 'تم التحقق وتأكيد الأمان بنجاح' },
  secScanVerifiedSub: { en: 'Package is verified and ready for direct download', ar: 'الحزمة آمنة وموثوقة • جاهزة للتنزيل المباشر' },
  secScanBoxHeading: { en: 'Package Security & Bot Protection', ar: 'فحص أمان الحزمة وتأكيد الهوية البشرية' },
  secScanBtn: { en: 'Verify & Download APK', ar: 'تأكيد الأمان والتحميل المباشر' },
  secScanNotice: { en: 'Instant, fast verification with zero annoying popups', ar: 'فحص فوري مجاني وسريع بدون إعلانات منبثقة أو نوافذ مزعجة' },

  // Category Page
  catComingSoon: { en: 'iOS Catalog Coming Soon', ar: 'كتالوج iOS قريباً' },
  catComingSoonDesc: {
    en: 'APK installation packages are built exclusively for Android devices and cannot be installed on iOS. We are currently architecting a verified catalog for iPhone applications and games.',
    ar: 'حزم APK مخصصة لأجهزة أندرويد ولا تعمل على نظام iOS. نعمل حالياً على إعداد كتالوج خاص بأجهزة آيفون والألعاب.',
  },
  catExploreAndroidApps: { en: 'Explore Android Apps', ar: 'تصفح تطبيقات أندرويد' },
  catExploreAndroidGames: { en: 'Explore Android Games', ar: 'تصفح ألعاب أندرويد' },
  catSearchWithin: { en: 'Search within', ar: 'ابحث داخل' },
  catSortBy: { en: 'Sort:', ar: 'الترتيب:' },
  catSortLatest: { en: 'Latest Updated', ar: 'الأحدث تحديثاً' },
  catSortPopular: { en: 'Popularity & Completeness', ar: 'الأكثر شهرة واكتمالاً' },
  catSortName: { en: 'Alphabetical (A-Z)', ar: 'أبجدياً (A-Z)' },
  catSortSize: { en: 'File Size (Largest)', ar: 'حجم الملف (الأكبر)' },
  catAvailablePackages: { en: 'Available Packages', ar: 'الحزم المتوفرة' },
  catLoadMore: { en: 'Load More', ar: 'تحميل المزيد' },
  catLoadingMore: { en: 'Loading More Packages...', ar: 'جاري تحميل المزيد...' },
  catNoAppsFound: { en: 'No applications found', ar: 'لم يتم العثور على تطبيقات' },
  catNoAppsSub: { en: 'Try adjusting your search query or selecting a different category filter.', ar: 'جرب تعديل كلمات البحث أو اختيار فلتر تصنيف آخر.' },

  // Footer
  footerDesc: {
    en: 'Premium gaming and application discovery platform for verified Android and iPhone software packages.',
    ar: 'منصة لاكتشاف وتحميل أفضل وأحدث تطبيقات وألعاب الأندرويد والآيفون الموثوقة.',
  },
  footerRights: { en: 'All Rights Reserved.', ar: 'جميع الحقوق محفوظة.' },

  // Language switcher
  langEn: { en: 'English', ar: 'English' },
  langAr: { en: 'العربية', ar: 'العربية' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to English as requested
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('housni_language');
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    localStorage.setItem('housni_language', language);
    // Preserve layout structure and avoid inverting banner or page elements
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key].en;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
