import React from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { MudraCategory } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory?: MudraCategory | 'All';
  selectedCategory?: MudraCategory | 'All';
  onCategoryChange: (category: MudraCategory | 'All') => void;
  totalFiltered: number;
  totalCount: number;
  onRandomMudra: () => void;
  activeTag: string | null;
  onClearTag: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  selectedCategory,
  onCategoryChange,
  totalFiltered,
  totalCount,
  onRandomMudra,
  activeTag,
  onClearTag,
}) => {
  const currentCategory = activeCategory || selectedCategory || 'All';
  const quickKeywords = ['Lotus', 'Moon', 'Forest', 'Peacock', 'Shiva', 'Blessing', 'Separation'];

  return (
    <header className="relative border-b border-parchment-border bg-[#FDFBF7]/90 backdrop-blur-md sticky top-0 z-30 transition-all">
      {/* Top Banner / Archival Metadata */}
      <div className="border-b border-parchment-border/60 bg-[#F5EFE6] px-4 py-1.5 text-center text-[11px] font-mono tracking-widest text-ink-muted flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-alta inline-block" />
          <span className="font-semibold text-ink-primary">CORPUS CLASSIQUE</span>
          <span className="hidden sm:inline">· BHARATANATYAM HASTA VINIYOGA DICTIONARY</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline">TREATISE: ABHINAYA DARPANA (अभिनयदर्पण)</span>
          <span className="text-alta font-semibold">24 CANONICAL MUDRAS</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Brand Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-alta text-white font-medium">
                Vol. I · 3D Archive
              </span>
              <span className="text-xs font-mono text-ink-muted">
                Est. Natyashastra Tradition
              </span>
            </div>

            <div className="flex items-baseline gap-4 flex-wrap">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-ink-primary">
                Mudrika
              </h1>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-devanagari font-bold text-alta">
                मुद्रिका
              </span>
            </div>

            <p className="mt-2 text-sm sm:text-base text-ink-secondary max-w-2xl font-serif italic">
              An archival 3D digital dictionary of classical Bharatanatyam hastas — preserving bodily geometry, poetic viniyogas, and canonical Sanskrit shlokas.
            </p>
          </div>

          {/* Quick Stats & Discovery Action */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={onRandomMudra}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F3EFEA] hover:bg-[#EAE4DC] border border-parchment-border text-ink-primary text-xs font-mono tracking-wider transition-all duration-200 hover:border-alta/40 shadow-sm"
              title="Inspect a random hasta"
            >
              <Sparkles className="w-3.5 h-3.5 text-alta" />
              <span>DISCOVER RANDOM</span>
            </button>
          </div>
        </div>

        {/* Search & Active Tag Area */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by Sanskrit name, Devanagari, English meaning, or Viniyoga keyword (e.g. Flag, Moon, Lotus)..."
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#F3EFEA] focus:bg-white border border-parchment-border focus:border-alta focus:ring-1 focus:ring-alta outline-none text-sm text-ink-primary placeholder:text-ink-muted/70 transition-all shadow-sm font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-primary p-0.5 rounded-full"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Match Counter Badge */}
            <div className="flex items-center justify-between sm:justify-center px-4 py-3 rounded-xl bg-[#F3EFEA] border border-parchment-border font-mono text-xs text-ink-secondary whitespace-nowrap shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-alta font-bold text-sm">{totalFiltered}</span>
                <span className="text-ink-muted">of</span>
                <span>{totalCount} Mudras</span>
              </div>
            </div>
          </div>

          {/* Category Filter Strip & Quick Keywords */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mr-1">
                Classification:
              </span>

              <button
                type="button"
                onClick={() => onCategoryChange('All')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border cursor-pointer ${
                  currentCategory === 'All'
                    ? 'bg-ink-primary text-white border-ink-primary shadow-sm'
                    : 'bg-[#F3EFEA] hover:bg-[#EAE4DC] text-ink-secondary border-parchment-border'
                }`}
              >
                All ({totalCount})
              </button>

              <button
                type="button"
                onClick={() => onCategoryChange('Asamyukta')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border cursor-pointer ${
                  currentCategory === 'Asamyukta'
                    ? 'bg-alta text-white border-alta shadow-alta-glow'
                    : 'bg-[#F3EFEA] hover:bg-[#EAE4DC] text-ink-secondary border-parchment-border'
                }`}
              >
                Asamyukta (Single Hand)
              </button>

              <button
                type="button"
                onClick={() => onCategoryChange('Samyukta')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border cursor-pointer ${
                  currentCategory === 'Samyukta'
                    ? 'bg-alta text-white border-alta shadow-alta-glow'
                    : 'bg-[#F3EFEA] hover:bg-[#EAE4DC] text-ink-secondary border-parchment-border'
                }`}
              >
                Samyukta (Combined Hand)
              </button>
            </div>

            {/* Quick Topic Chips */}
            <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto text-xs">
              <span className="text-[10px] font-mono text-ink-light uppercase">Theme:</span>
              {quickKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => onSearchChange(kw)}
                  className="px-2 py-0.5 rounded text-[11px] font-sans text-ink-muted hover:text-alta hover:bg-parchment-hover transition-colors"
                >
                  #{kw}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tag Notice if user clicked a Viniyoga pill */}
          {activeTag && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-alta/10 border border-alta/20 text-xs text-alta font-mono">
              <span>FILTERED BY THEME: <strong>"{activeTag}"</strong></span>
              <button
                onClick={onClearTag}
                className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-alta hover:text-white transition-colors text-[10px] uppercase"
              >
                Clear Tag <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
