import { Outlet, Link, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

export default function AppLayout() {
  const location = useLocation();

  const navLinks = [{ to: '/', label: 'Ingredientes' }];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--kusuriya-bg)' }}>
      {/* ── Header ── */}
      <header
        className="border-b-2"
        style={{
          backgroundColor: 'var(--kusuriya-imperial-purple)',
          borderColor: 'var(--kusuriya-gold)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
            {/* Mortar-and-pestle decorative glyph */}
            <span
              className="text-2xl select-none"
              style={{ color: 'var(--kusuriya-gold)' }}
              aria-hidden
            >
              ⚗
            </span>
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                fontSize: '1.15rem',
                letterSpacing: '0.08em',
                color: '#E8E2D2',
              }}
            >
              Kusuriya
            </span>
            <span
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: '0.75rem',
                color: 'var(--kusuriya-gold)',
                marginTop: '2px',
              }}
            >
              薬屋
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex gap-1">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className="px-4 py-1.5 rounded text-sm font-medium transition-all duration-300"
                  style={{
                    fontFamily: "'Noto Serif JP', serif",
                    color: active ? 'var(--kusuriya-gold)' : '#E8E2D2',
                    backgroundColor: active ? 'rgba(192,154,91,0.15)' : 'transparent',
                    border: active ? '1px solid var(--kusuriya-gold)' : '1px solid transparent',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ── Decorative divider ── */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(to right, transparent, var(--kusuriya-gold), transparent)',
          opacity: 0.5,
        }}
      />

      {/* ── Main content ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer
        className="border-t text-center py-3 text-xs"
        style={{
          borderColor: 'var(--kusuriya-border)',
          color: 'var(--kusuriya-muted-foreground, #7A7060)',
          fontFamily: "'Noto Serif JP', serif",
        }}
      >
        薬屋のひとりごと — Hitorigoto no Kusuriya
      </footer>

      <Toaster position="top-right" richColors />
    </div>
  );
}
