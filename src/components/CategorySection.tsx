import React from 'react';
import { Smartphone, Gamepad2, Apple, Flame, ArrowRight } from 'lucide-react';

export interface CategoryItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  glowColor: string;
}

interface CategorySectionProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: CategoryItem[] = [
    {
      id: 'android-apps',
      title: 'Android Apps',
      icon: <Smartphone className="w-6 h-6" />,
      iconColor: 'text-emerald-400',
      glowColor: 'rgba(52, 211, 153, 0.35)',
    },
    {
      id: 'android-games',
      title: 'Android Games',
      icon: <Gamepad2 className="w-6 h-6" />,
      iconColor: 'text-purple-400',
      glowColor: 'rgba(192, 132, 252, 0.35)',
    },
    {
      id: 'iphone-apps',
      title: 'iPhone Apps',
      icon: <Apple className="w-6 h-6" />,
      iconColor: 'text-cyan-400',
      glowColor: 'rgba(34, 211, 238, 0.35)',
    },
    {
      id: 'iphone-games',
      title: 'iPhone Games',
      icon: <Flame className="w-6 h-6" />,
      iconColor: 'text-amber-400',
      glowColor: 'rgba(251, 191, 36, 0.35)',
    },
  ];

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-30">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`group relative p-5 rounded-2xl text-left transition-all duration-300 flex items-center justify-between backdrop-blur-xl border ${
                isSelected
                  ? 'bg-slate-900/95 border-accent shadow-[0_0_25px_rgba(var(--accent-rgb),0.5)] ring-2 ring-accent'
                  : 'bg-[#0B132B]/85 hover:bg-[#0F1A3A]/90 border-slate-800/90 hover:border-accent/70 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.35)] hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Large recognizable icon with subtle specific accent and neon glow */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10 transition-transform duration-200 group-hover:scale-105 ${cat.iconColor}`}
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    boxShadow: `0 0 15px ${cat.glowColor}`,
                  }}
                >
                  {cat.icon}
                </div>

                {/* Category Title */}
                <div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-accent transition-colors">
                    {cat.title}
                  </h3>
                </div>
              </div>

              {/* Circular Arrow Button */}
              <div
                className={`w-9 h-9 rounded-full border border-slate-700/80 flex items-center justify-center text-slate-400 transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_12px_rgba(var(--accent-rgb),0.5)] ${
                  isSelected ? 'bg-accent border-accent text-white shadow-[0_0_12px_rgba(var(--accent-rgb),0.6)]' : 'bg-slate-800/60'
                }`}
              >
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
