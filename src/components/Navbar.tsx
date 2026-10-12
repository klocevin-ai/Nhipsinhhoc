import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type NavTab = 'home' | 'studio' | 'about' | 'journal' | 'reach-us';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onBeginJourney: () => void;
}

export function Navbar({ activeTab, onSelectTab, onBeginJourney }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'studio', label: 'Studio' },
    { id: 'about', label: 'Triết Lý' },
    { id: 'journal', label: 'Tạp Bút' },
    { id: 'reach-us', label: 'Liên Hệ' },
  ];

  const handleNavClick = (id: NavTab) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-20 w-full">
      <nav className="relative z-10 flex row justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        {/* Logo: "Velorah®" (® as <sup className="text-xs">), text-3xl tracking-tight, Instrument Serif font, text-foreground */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-3xl tracking-tight text-white cursor-pointer select-none group flex items-baseline transition-opacity hover:opacity-90"
          style={{ fontFamily: "'Instrument Serif', serif" }}
          aria-label="Velorah Trang Chủ"
        >
          <span>Velorah</span>
          <sup className="text-xs ml-0.5 opacity-80 group-hover:opacity-100 transition-opacity">®</sup>
        </button>

        {/* Nav links (hidden on mobile, md:flex): Trang Chủ, Studio, Triết Lý, Tạp Bút, Liên Hệ */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm cursor-pointer transition-colors relative py-1 ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-[hsl(240,4%,66%)] hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/70 rounded-full animate-fade-rise" />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* CTA button: "Khởi Đầu Hành Trình", liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground, hover:scale-[1.03] */}
          <button
            onClick={onBeginJourney}
            className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] cursor-pointer transition-all duration-200 active:scale-[0.98] select-none"
          >
            Khởi Đầu Hành Trình
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden liquid-glass p-2.5 rounded-full text-white/90 hover:text-white hover:scale-[1.05] transition cursor-pointer"
            aria-label="Mở bảng điều hướng"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-24 z-50 p-6 rounded-3xl liquid-glass-modal animate-fade-rise border border-white/10 shadow-2xl">
          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase tracking-widest text-[hsl(240,4%,66%)] font-medium mb-1">
              Menu Điều Hướng
            </div>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-lg py-2 px-3 rounded-xl transition ${
                    isActive
                      ? 'text-white font-semibold bg-white/10'
                      : 'text-[hsl(240,4%,66%)] hover:text-white hover:bg-white/5'
                  }`}
                  style={{ fontFamily: item.id === 'home' ? "'Instrument Serif', serif" : undefined }}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBeginJourney();
                }}
                className="w-full liquid-glass rounded-full py-3 text-center text-sm text-white font-medium"
              >
                Khởi Đầu Hành Trình
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
