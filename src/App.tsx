import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MUDRAS_DATA } from './data/mudras';
import { Mudra, toDevanagariNumeral, formatMudraName, ThemeMode } from './types';
import { MudraCanvas } from './components/MudraCanvas';
import { MudraCard } from './components/MudraCard';
import {
  Search,
  Sparkles,
  X,
  Compass,
  Scroll,
  Quote,
  Check,
  Share2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

const springTransition = {
  type: 'spring',
  stiffness: 320,
  damping: 26,
  mass: 0.8,
} as const;

export function App() {
  // Theme state persisted in localStorage ('mudrika_theme')
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('mudrika_theme');
      if (saved === 'ratri' || saved === 'parchment') return saved;
    } catch {
      // fallback
    }
    return 'parchment';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'parchment' ? 'ratri' : 'parchment';
      try {
        localStorage.setItem('mudrika_theme', next);
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  useEffect(() => {
    if (theme === 'ratri') {
      document.body.classList.add('theme-ratri');
      document.documentElement.classList.add('dark');
    } else {
      document.body.classList.remove('theme-ratri');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const isRatri = theme === 'ratri';

  // 1. Direct interactive states
  const [selectedMudra, setSelectedMudra] = useState<Mudra | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Asamyukta' | 'Samyukta'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedVerse, setCopiedVerse] = useState<boolean>(false);

  // 2. Direct filtered mudras calculation
  const filteredMudras = MUDRAS_DATA.filter((m) => {
    const matchesCategory = activeCategory === 'All' || m.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.englishMeaning.toLowerCase().includes(q) ||
      m.devanagari.includes(q) ||
      m.viniyogas.some((v) => v.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  // 3. Modal Keyboard navigation (Arrow keys + Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMudra) return;
      if (e.key === 'Escape') {
        setSelectedMudra(null);
      } else if (e.key === 'ArrowRight') {
        handleNextMudra();
      } else if (e.key === 'ArrowLeft') {
        handlePrevMudra();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMudra]);

  // 4. Lock background scroll when modal is active
  useEffect(() => {
    if (selectedMudra) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMudra]);

  const handleNextMudra = () => {
    if (!selectedMudra) return;
    const currIdx = MUDRAS_DATA.findIndex((m) => m.id === selectedMudra.id);
    const nextIdx = (currIdx + 1) % MUDRAS_DATA.length;
    setSelectedMudra(MUDRAS_DATA[nextIdx]);
  };

  const handlePrevMudra = () => {
    if (!selectedMudra) return;
    const currIdx = MUDRAS_DATA.findIndex((m) => m.id === selectedMudra.id);
    const prevIdx = (currIdx - 1 + MUDRAS_DATA.length) % MUDRAS_DATA.length;
    setSelectedMudra(MUDRAS_DATA[prevIdx]);
  };

  const handleCopyVerse = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVerse(true);
    setTimeout(() => setCopiedVerse(false), 2000);
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col overflow-x-hidden touch-pan-y transition-colors duration-300 ${
      isRatri
        ? 'bg-[#0A0A0A] text-[#F9FAFB] selection:bg-[#EF4444] selection:text-white'
        : 'bg-[#F8F5EE] text-[#1C1917] selection:bg-[#B91C1C] selection:text-[#F8F5EE]'
    }`}>
      {/* Main Header / Navigation */}
      <header className={`border-b-[1.5px] sticky top-0 z-30 transition-all ${
        isRatri
          ? 'border-[#262626] bg-[#0A0A0A]/95 backdrop-blur-md'
          : 'border-[#1C1917] bg-[#F8F5EE]/95 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap mb-2">
                <img
                  src="/mudrika-logo.jpg"
                  alt="Mudrika Emblem"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0 select-none"
                />
                <div className="flex items-baseline gap-2.5 sm:gap-3.5 flex-wrap">
                  <span className={`text-3xl sm:text-5xl lg:text-6xl font-devanagari font-black tracking-wide ${
                    isRatri ? 'text-[#F87171]' : 'text-[#B91C1C]'
                  }`}>
                    मुद्रिका
                  </span>
                  <span className={`text-2xl sm:text-4xl lg:text-5xl font-serif italic font-light ${
                    isRatri ? 'text-white/20' : 'text-[#1C1917]/30'
                  }`}>
                    /
                  </span>
                  <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-serif italic font-black tracking-tight ${
                    isRatri ? 'text-[#F9FAFB]' : 'text-[#1C1917]'
                  }`}>
                    Mudrika
                  </h1>
                </div>
              </div>

              <p className={`text-sm sm:text-base font-normal leading-relaxed max-w-2xl mt-2 ${
                isRatri ? 'text-[#9CA3AF]' : 'text-[#57534E]'
              }`}>
                <span className="font-['Playfair_Display'] italic">“The language of twenty-four gestures”</span> — An archival 3D digital dictionary of classical Bharatanatyam mudras preserving bodily knuckle geometry, poetic viniyogas, and canonical Sanskrit verses.
              </p>
            </div>

            {/* Quick Actions: Theme Toggle & Random Discovery */}
            <div className="flex items-center gap-2.5 sm:gap-3 self-start md:self-end flex-wrap">
              {/* Ratri / Dina Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border-2 transition-all cursor-pointer flex items-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                  isRatri
                    ? 'bg-[#121212] text-[#F3F4F6] border-[#262626] shadow-[2px_2px_0px_#EF4444] hover:shadow-[4px_4px_0px_#EF4444]'
                    : 'bg-[#FCFBF7] text-[#1C1917] border-[#1C1917] shadow-[2px_2px_0px_#1C1917] hover:shadow-[4px_4px_0px_#1C1917]'
                }`}
                title={isRatri ? 'Switch to Dina (Parchment) Mode' : 'Switch to Ratri (Night) Mode'}
              >
                {isRatri ? (
                  <span>[ ☼ दिन // DINA ]</span>
                ) : (
                  <span>[ ✦ रात्रि // RATRI ]</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const randomMudra = MUDRAS_DATA[Math.floor(Math.random() * MUDRAS_DATA.length)];
                  setSelectedMudra(randomMudra);
                }}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 border-[1.5px] transition-all cursor-pointer font-['Cormorant_Garamond'] italic text-base tracking-wide font-medium active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                  isRatri
                    ? 'bg-[#991B1B] text-[#F3F4F6] border-[#EF4444] shadow-[3px_3px_0px_#EF4444] hover:shadow-[4px_4px_0px_#EF4444] hover:bg-[#B91C1C]'
                    : 'bg-[#B91C1C] text-[#F8F5EE] border-[#1C1917] shadow-[3px_3px_0px_#1C1917] hover:shadow-[4px_4px_0px_#1C1917]'
                }`}
              >
                <Sparkles className="w-4 h-4 not-italic opacity-90" />
                <span>Discover Random Gesture →</span>
              </button>
            </div>
          </div>

          {/* Search Bar & Counter */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isRatri ? 'text-[#9CA3AF]' : 'text-[#78716C]'
                }`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Sanskrit name (e.g. पताका, Tripatāka), meaning, or Viniyoga (e.g. Flag, Lotus, Moon)..."
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border-[1.5px] text-sm font-mono transition-all focus:outline-none ${
                    isRatri
                      ? 'bg-[#121212] border-[#262626] text-[#F9FAFB] placeholder:text-[#9CA3AF]/60 shadow-[2px_2px_0px_#EF4444] focus:border-[#EF4444]'
                      : 'bg-[#FCFBF7] border-[#1C1917] text-[#1C1917] placeholder:text-[#78716C]/70 shadow-[2px_2px_0px_#1C1917] focus:border-[#B91C1C]'
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded cursor-pointer ${
                      isRatri ? 'text-[#9CA3AF] hover:text-[#F9FAFB]' : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className={`flex items-center justify-between sm:justify-center px-4 py-3 rounded-lg border-[1.5px] font-mono text-xs whitespace-nowrap ${
                isRatri
                  ? 'bg-[#121212] border-[#262626] text-[#F9FAFB] shadow-[2px_2px_0px_#EF4444]'
                  : 'bg-[#FCFBF7] border-[#1C1917] text-[#1C1917] shadow-[2px_2px_0px_#1C1917]'
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className={`font-devanagari font-bold text-sm ${isRatri ? 'text-[#F87171]' : 'text-[#B91C1C]'}`}>
                    {toDevanagariNumeral(filteredMudras.length)}
                  </span>
                  <span className={`font-bold text-xs ${isRatri ? 'text-[#F87171]' : 'text-[#B91C1C]'}`}>
                    ({filteredMudras.length})
                  </span>
                  <span className={isRatri ? 'text-[#9CA3AF]' : 'text-[#78716C]'}>of</span>
                  <span className="font-bold">{MUDRAS_DATA.length} Mudras</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Catalog View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Curated Editorial Prologue Callout */}
        <div className={`mb-10 p-6 sm:p-8 rounded-xl border-[1.5px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
          isRatri
            ? 'bg-[#121212] border-[#262626] shadow-[4px_4px_0px_#EF4444]'
            : 'bg-[#FCFBF7] border-[#1C1917] shadow-[4px_4px_0px_#1C1917]'
        }`}>
          <div className="space-y-2 max-w-3xl">
            <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold ${
              isRatri ? 'text-[#F87171]' : 'text-[#B91C1C]'
            }`}>
              <Compass className="w-3.5 h-3.5" />
              <span>THE ARCHIVAL THREE-DIMENSIONAL ATLAS</span>
              <span className={isRatri ? 'text-white/20' : 'text-[#1C1917]/40'}>•</span>
              <span className={`font-devanagari ${isRatri ? 'text-[#F9FAFB]' : 'text-[#1C1917]'}`}>नाट्यशास्त्र कोशः</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-serif italic font-bold tracking-tight ${
              isRatri ? 'text-[#F9FAFB]' : 'text-[#1C1917]'
            }`}>
              *The Geometry of Sacred Gestures* <span className={`font-serif not-italic font-normal text-xl sm:text-2xl ${
                isRatri ? 'text-[#9CA3AF]' : 'text-[#78716C]'
              }`}>& Spatial Kinematics</span>
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
              isRatri ? 'text-[#9CA3AF]' : 'text-[#78716C]'
            }`}>
              Each hasta represents a sacred semantic glyph in Indian dramaturgy. Select any folio card below or click <span className={`font-serif italic font-bold ${
                isRatri ? 'text-[#F87171]' : 'text-[#1C1917]'
              }`}>“Inspect in 3d”</span> to examine knuckle degrees in 360°, study spatial finger vectors, and explore authentic Sanskrit verses from the *Abhinaya Darpana*.
            </p>
          </div>

          <div className={`flex items-center gap-5 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 text-xs font-mono ${
            isRatri ? 'border-[#262626] text-[#9CA3AF]' : 'border-[#1C1917]/20 text-[#78716C]'
          }`}>
            <div>
              <div className={`text-2xl sm:text-3xl font-devanagari font-black flex items-baseline gap-1 ${
                isRatri ? 'text-[#F9FAFB]' : 'text-[#1C1917]'
              }`}>
                <span>२४</span>
                <span className={`text-sm font-mono font-bold ${isRatri ? 'text-[#9CA3AF]' : 'text-[#78716C]'}`}>/ 24</span>
              </div>
              <div className="uppercase tracking-wider font-bold">असंयुक्त Hastas</div>
            </div>
            <div className={`h-10 w-[1.5px] ${isRatri ? 'bg-[#262626]' : 'bg-[#1C1917]/20'}`} />
            <div>
              <div className={`text-2xl sm:text-3xl font-serif italic font-black ${isRatri ? 'text-[#F9FAFB]' : 'text-[#1C1917]'}`}>Canon</div>
              <div className="uppercase tracking-wider font-bold">Abhinaya Darpana</div>
            </div>
            <div className={`h-10 w-[1.5px] ${isRatri ? 'bg-[#262626]' : 'bg-[#1C1917]/20'}`} />
            <div>
              <div className={`text-2xl sm:text-3xl font-serif italic font-black ${isRatri ? 'text-[#F87171]' : 'text-[#B91C1C]'}`}>360°</div>
              <div className="uppercase tracking-wider font-bold">Rig *&* Kinematics</div>
            </div>
          </div>
        </div>

        {/* Mudra Cards Grid with Framer Motion Layout Morphing */}
        {filteredMudras.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredMudras.map((mudra) => (
              <MudraCard
                key={mudra.id}
                mudra={mudra}
                onSelect={setSelectedMudra}
                onTagClick={setSearchQuery}
                theme={theme}
              />
            ))}
          </div>
        ) : (
          <div className={`text-center py-20 px-4 rounded-2xl border max-w-lg mx-auto ${
            isRatri ? 'bg-[#121212] border-[#262626] shadow-[3px_3px_0px_#EF4444]' : 'bg-[#FCFBF7] border-[#1C1917] shadow-[3px_3px_0px_#1C1917]'
          }`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isRatri ? 'bg-[#EF4444]/15 text-[#F87171]' : 'bg-[#B91C1C]/10 text-[#B91C1C]'
            }`}>
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-serif font-bold mb-2 ${
              isRatri ? 'text-[#F9FAFB]' : 'text-[#1C1917]'
            }`}>
              No Mudras Found
            </h3>
            <p className={`text-xs sm:text-sm mb-6 max-w-sm mx-auto ${
              isRatri ? 'text-[#9CA3AF]' : 'text-[#78716C]'
            }`}>
              No classical mudras matched your query. Reset your search or filters to explore the catalog.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-colors shadow-sm cursor-pointer ${
                isRatri ? 'bg-[#991B1B] text-white hover:bg-[#B91C1C]' : 'bg-[#B91C1C] text-white hover:bg-[#991B1B]'
              }`}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* 3. Deep-Dive 3D Inspector Modal with Neo-Brutalist Archival Aesthetic */}
      <AnimatePresence>
        {selectedMudra && (
          <motion.div
            key="inspector-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 overflow-y-auto touch-pan-y ${
              isRatri ? 'bg-black/85 backdrop-blur-sm' : 'bg-[#1C1917]/75 backdrop-blur-xs'
            }`}
            onClick={() => setSelectedMudra(null)}
          >
            <motion.div
              layoutId={`mudra-card-${selectedMudra.id}`}
              transition={springTransition}
              className={`relative w-[96vw] max-w-6xl rounded-xl border-2 overflow-hidden flex flex-col max-h-[94vh] lg:max-h-[88vh] my-auto ${
                isRatri
                  ? 'bg-[#121212] border-[#262626] shadow-[4px_4px_0px_#EF4444] lg:shadow-[6px_6px_0px_#EF4444]'
                  : 'bg-[#FCFBF7] border-[#1C1917] shadow-[2px_2px_0px_#1C1917] sm:shadow-[4px_4px_0px_#1C1917] lg:shadow-[6px_6px_0px_#1C1917]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Bar */}
              <div className={`flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 border-b-[1.5px] gap-2 ${
                isRatri ? 'bg-[#0A0A0A] border-[#262626]' : 'bg-[#F8F5EE] border-[#1C1917]'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className={`flex h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full border ${
                    isRatri ? 'bg-[#EF4444] border-[#EF4444]' : 'bg-[#B91C1C] border-[#1C1917]'
                  }`} />
                  <div className={`text-[10px] sm:text-xs font-mono tracking-wider font-bold uppercase px-2 sm:px-2.5 py-0.5 border rounded flex items-center gap-1 sm:gap-1.5 ${
                    isRatri
                      ? 'bg-[#121212] border-[#262626] text-[#F9FAFB] shadow-[1px_1px_0px_#EF4444]'
                      : 'bg-[#FCFBF7] border-[#1C1917] text-[#1C1917] shadow-[1px_1px_0px_#1C1917]'
                  }`}>
                    <span className={`font-devanagari font-bold ${isRatri ? 'text-[#F87171]' : 'text-[#B91C1C]'}`}>
                      [ पत्रम् // {toDevanagariNumeral(String(selectedMudra.chapterIndex || 1).padStart(2, '0'))} ]
                    </span>
                    <span className={isRatri ? 'text-white/20' : 'text-[#1C1917]/40'}>•</span>
                    <span>FOLIO // {String(selectedMudra.chapterIndex || 1).padStart(2, '0')}</span>
                  </div>
                  <span className={`font-mono hidden xs:inline ${isRatri ? 'text-white/20' : 'text-[#1C1917]/40'}`}>/</span>
                  <span className={`px-2 sm:px-3 py-0.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider rounded border flex items-center gap-1.5 font-bold ${
                    isRatri
                      ? 'bg-[#121212] border-[#262626] text-[#F9FAFB] shadow-[1px_1px_0px_#EF4444]'
                      : 'bg-[#FCFBF7] border-[#1C1917] text-[#1C1917] shadow-[1px_1px_0px_#1C1917]'
                  }`}>
                    <span className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full border inline-block shadow-xs ${
                      isRatri ? 'bg-[#EF4444] border-[#EF4444]' : 'bg-[#B91C1C] border-[#1C1917]'
                    }`} />
                    <span>असंयुक्त HASTA</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {/* Prev / Next Mudra controls */}
                  <div className={`hidden sm:flex items-center gap-1 border rounded p-0.5 ${
                    isRatri
                      ? 'border-[#262626] bg-[#121212] text-[#F9FAFB] shadow-[1px_1px_0px_#262626]'
                      : 'border-[#1C1917] bg-[#FCFBF7] text-[#1C1917] shadow-[1px_1px_0px_#1C1917]'
                  }`}>
                    <button
                      type="button"
                      onClick={handlePrevMudra}
                      className={`p-1 sm:p-1.5 rounded transition-all cursor-pointer ${
                        isRatri ? 'text-[#F9FAFB] hover:bg-[#991B1B]' : 'text-[#1C1917] hover:bg-[#B91C1C] hover:text-[#F8F5EE]'
                      }`}
                      title="Previous Mudra"
                    >
                      <ChevronLeft className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </button>
                    <span className={`px-1.5 sm:px-2 text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1 ${
                      isRatri ? 'text-[#F9FAFB]' : 'text-[#1C1917]'
                    }`}>
                      <span className={`font-devanagari ${isRatri ? 'text-[#F87171]' : 'text-[#B91C1C]'}`}>
                        {toDevanagariNumeral(MUDRAS_DATA.findIndex((m) => m.id === selectedMudra.id) + 1)}
                      </span>
                      <span className={isRatri ? 'text-white/20' : 'text-[#1C1917]/40'}>/</span>
                      <span>{MUDRAS_DATA.findIndex((m) => m.id === selectedMudra.id) + 1}</span>
                      <span className={isRatri ? 'text-white/20' : 'text-[#1C1917]/40'}>of</span>
                      <span>{MUDRAS_DATA.length}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleNextMudra}
                      className={`p-1 sm:p-1.5 rounded transition-all cursor-pointer ${
                        isRatri ? 'text-[#F9FAFB] hover:bg-[#991B1B]' : 'text-[#1C1917] hover:bg-[#B91C1C] hover:text-[#F8F5EE]'
                      }`}
                      title="Next Mudra"
                    >
                      <ChevronRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </button>
                  </div>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedMudra(null)}
                    className={`p-1 sm:p-1.5 border rounded active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
                      isRatri
                        ? 'bg-[#121212] text-[#F9FAFB] hover:bg-[#991B1B] border-[#262626] shadow-[1px_1px_0px_#EF4444]'
                        : 'bg-[#FCFBF7] text-[#1C1917] hover:bg-[#B91C1C] hover:text-[#F8F5EE] border-[#1C1917] shadow-[1px_1px_0px_#1C1917]'
                    }`}
                    aria-label="Close Inspector Modal"
                  >
                    <X className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Fluid Responsive Stack on Mobile / Split Screen on Desktop */}
              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start w-full overflow-y-auto p-3 sm:p-5 lg:p-7">
                {/* Left Viewport Column */}
                <div className={`w-full h-[320px] sm:h-[400px] lg:h-[480px] lg:col-span-7 relative overflow-hidden rounded-lg border-[1.5px] shrink-0 touch-pan-y ${
                  isRatri
                    ? 'bg-[#0A0A0A] border-[#262626] shadow-[2px_2px_0px_#EF4444] sm:shadow-[3px_3px_0px_#EF4444]'
                    : 'bg-[#F8F5EE] border-[#1C1917] shadow-[2px_2px_0px_#1C1917] sm:shadow-[3px_3px_0px_#1C1917]'
                }`}>
                  <MudraCanvas selectedMudra={selectedMudra} theme={theme} />
                </div>

                {/* Right Metadata Column */}
                <div className="w-full lg:col-span-5 flex flex-col gap-4 overflow-y-auto pr-0 sm:pr-1">
                  <div className="space-y-4 sm:space-y-5">
                    {/* Title & Authentic Devanagari Script Prominently Alongside Italic Latin */}
                    <div>
                      <div className="flex items-baseline gap-2.5 sm:gap-3 flex-wrap mb-1">
                        <span className={`text-2xl sm:text-3xl lg:text-4xl font-devanagari font-black tracking-wide ${
                          isRatri ? 'text-[#F87171]' : 'text-[#B91C1C]'
                        }`}>
                          {selectedMudra.devanagari}
                        </span>
                        <span className={`text-xl sm:text-2xl lg:text-3xl font-serif italic font-light ${
                          isRatri ? 'text-white/20' : 'text-[#1C1917]/30'
                        }`}>/</span>
                        <h2 className={`text-xl sm:text-2xl lg:text-3xl font-['Playfair_Display'] italic font-bold tracking-tight capitalize ${
                          isRatri ? 'text-[#F9FAFB]' : 'text-[#1C1917]'
                        }`}>
                          {formatMudraName(selectedMudra.name)}
                        </h2>
                      </div>
                      <div className="mt-1 flex items-center gap-2 flex-wrap">
                        <span className={`text-xs sm:text-sm font-serif italic px-2 sm:px-2.5 py-0.5 rounded border ${
                          isRatri
                            ? 'bg-[#121212] text-[#F3F4F6] border-[#262626] shadow-[1px_1px_0px_#EF4444]'
                            : 'bg-[#F8F5EE] text-[#1C1917] border-[#1C1917] shadow-[1px_1px_0px_#1C1917]'
                        }`}>
                          “{selectedMudra.englishMeaning}”
                        </span>
                      </div>
                    </div>

                    {/* Sanskrit Shloka Callout Block from Abhinaya Darpana */}
                    <div className={`relative p-3.5 sm:p-5 rounded-lg border-[1.5px] border-l-[4px] sm:border-l-[6px] ${
                      isRatri
                        ? 'bg-[#121212] border-[#262626] border-l-[#EF4444] shadow-[3px_3px_0px_#EF4444]'
                        : 'bg-[#F8F5EE] border-[#1C1917] border-l-[#B91C1C] shadow-[2px_2px_0px_#1C1917] sm:shadow-[3px_3px_0px_#1C1917]'
                    }`}>
                      <Quote className={`absolute top-2.5 right-3 w-6 sm:w-7 h-6 sm:h-7 pointer-events-none ${
                        isRatri ? 'text-[#EF4444]/20' : 'text-[#B91C1C]/20'
                      }`} />
                      <div className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-widest font-bold mb-2 flex items-center justify-between border-b pb-1.5 flex-wrap gap-2 ${
                        isRatri ? 'text-[#9CA3AF] border-[#262626]' : 'text-[#78716C] border-[#1C1917]/20'
                      }`}>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${isRatri ? 'bg-[#EF4444]' : 'bg-[#B91C1C]'}`} />
                          <span className={`font-devanagari text-xs font-bold ${isRatri ? 'text-[#F9FAFB]' : 'text-[#1C1917]'}`}>अभिनयदर्पण श्लोकः</span>
                          <span className={isRatri ? 'text-white/20' : 'text-[#1C1917]/40'}>•</span>
                          <span>ORIGINAL SANSKRIT VERSE</span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyVerse(`${formatMudraName(selectedMudra.name)} (${selectedMudra.devanagari}): ${selectedMudra.verse}`)
                          }
                          className={`flex items-center gap-1 transition-colors cursor-pointer font-mono text-[9px] sm:text-[10px] uppercase font-bold ${
                            isRatri ? 'text-[#9CA3AF] hover:text-[#F87171]' : 'text-[#78716C] hover:text-[#B91C1C]'
                          }`}
                          title="Copy Sanskrit Shloka"
                        >
                          {copiedVerse ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3 h-3" />
                              <span>Copy Verse</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className={`font-devanagari-body text-sm sm:text-base lg:text-lg font-semibold leading-relaxed tracking-wide ${
                        isRatri ? 'text-[#F9FAFB]' : 'text-[#1C1917]'
                      }`}>
                        {selectedMudra.verse}
                      </p>
                    </div>

                    {/* Anatomical Kinematics Box */}
                    <div className={`space-y-1.5 p-3 sm:p-3.5 rounded-lg border-[1.5px] ${
                      isRatri
                        ? 'bg-[#121212] border-[#262626] shadow-[2px_2px_0px_#262626]'
                        : 'bg-[#FCFBF7] border-[#1C1917] shadow-[1.5px_1.5px_0px_#1C1917] sm:shadow-[2px_2px_0px_#1C1917]'
                    }`}>
                      <div className={`flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider font-bold ${
                        isRatri ? 'text-[#F87171]' : 'text-[#B91C1C]'
                      }`}>
                        <Compass className="w-3.5 h-3.5" />
                        <span>Verified Anatomical Definition</span>
                        <span className={isRatri ? 'text-white/20' : 'text-[#1C1917]/40'}>•</span>
                        <span className={`font-devanagari ${isRatri ? 'text-[#F9FAFB]' : 'text-[#1C1917]'}`}>शारीरिक रचना</span>
                      </div>
                      <p className={`text-xs leading-relaxed font-sans ${isRatri ? 'text-[#9CA3AF]' : 'text-[#78716C]'}`}>
                        {selectedMudra.anatomy}
                      </p>
                    </div>

                    {/* Canonical Viniyogas (Dramatic Usages) */}
                    <div className="space-y-3">
                      <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold border-b pb-1.5 ${
                        isRatri ? 'text-[#F9FAFB] border-[#262626]' : 'text-[#1C1917] border-[#1C1917]/20'
                      }`}>
                        <Scroll className={`w-4 h-4 ${isRatri ? 'text-[#EF4444]' : 'text-[#B91C1C]'}`} />
                        <span>Classical Usages (Viniyogas)</span>
                        <span className={`font-serif italic ${isRatri ? 'text-white/30' : 'text-[#1C1917]/40'}`}>& Dramatic Metaphors</span>
                        <span className={`text-[10px] font-mono ${isRatri ? 'text-[#9CA3AF]' : 'text-[#78716C]'}`}>({selectedMudra.viniyogas.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedMudra.viniyogas.map((vini, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setSelectedMudra(null);
                              setSearchQuery(vini);
                            }}
                            className={`px-2.5 py-1 rounded text-xs font-mono font-medium border transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                              isRatri
                                ? 'bg-[#121212] text-[#D1D5DB] border-[#262626] shadow-[1px_1px_0px_#262626] hover:bg-[#991B1B] hover:text-white hover:border-[#EF4444]'
                                : 'bg-[#FCFBF7] text-[#1C1917] border-[#1C1917] shadow-[1px_1px_0px_#1C1917] hover:bg-[#B91C1C] hover:text-[#F8F5EE]'
                            }`}
                            title={`Find all mudras with usage: ${vini}`}
                          >
                            {vini}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Footer Inside Modal: Refined Editorial Action Buttons */}
                    <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
                      isRatri ? 'border-[#262626]' : 'border-[#1C1917]/20'
                    }`}>
                      <button
                        type="button"
                        onClick={handlePrevMudra}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded border-[1.5px] font-serif italic text-sm tracking-wide font-medium hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer ${
                          isRatri
                            ? 'bg-[#121212] text-[#F9FAFB] border-[#262626] shadow-[2.5px_2.5px_0px_#262626] hover:border-[#EF4444]'
                            : 'bg-[#FCFBF7] text-[#1C1917] border-[#1C1917] shadow-[2.5px_2.5px_0px_#1C1917] hover:shadow-[3.5px_3.5px_0px_#1C1917]'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4 not-italic" />
                        <span>Previous Gesture</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleNextMudra}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded border-[1.5px] font-serif italic text-sm tracking-wide font-medium hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer ${
                          isRatri
                            ? 'bg-[#991B1B] text-[#F9FAFB] border-[#EF4444] shadow-[2.5px_2.5px_0px_#EF4444] hover:bg-[#B91C1C]'
                            : 'bg-[#B91C1C] text-[#F8F5EE] border-[#1C1917] shadow-[2.5px_2.5px_0px_#1C1917] hover:shadow-[3.5px_3.5px_0px_#1C1917]'
                        }`}
                      >
                        <span>Next Gesture</span>
                        <ChevronRight className="w-4 h-4 not-italic" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Footer */}
      <footer className={`mt-20 transition-colors ${
        isRatri ? 'border-t border-stone-800 bg-[#0A0A0A]' : 'border-t border-stone-300 bg-[#F8F5EE]'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <img
              src="/mudrika-logo.jpg"
              alt="Mudrika Emblem"
              className="w-5 h-5 object-contain select-none"
            />
            <span className="font-mono text-[11px] sm:text-xs text-stone-500 tracking-wider">
              यतो हस्तस्ततो दृष्टिः • Where the hand goes, the gaze follows
            </span>
          </div>

          <div>
            <span className="font-mono text-[11px] sm:text-xs text-stone-500 tracking-wider text-center sm:text-right block">
              Mudrika // An Interactive 3D Kinetic Archive by Dhimahi Deep
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
