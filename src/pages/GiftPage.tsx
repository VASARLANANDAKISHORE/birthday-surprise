import { useState } from 'react';
import {
  Heart,
  Star,
  Gift,
  Sparkles,
  PartyPopper,
  X,
} from 'lucide-react';
import Confetti from '../components/Confetti';
import { BIRTHDAY_NAME, GIFT_CLOSING_MESSAGE, GIFT_MESSAGES } from '../data/content';

const ICONS: Record<string, typeof Heart> = {
  Heart,
  Star,
  Gift,
  Sparkles,
};

export default function GiftPage() {
  const [opened, setOpened] = useState(false);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpenBox = () => {
    setOpened(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 6000);
  };

  return (
    <div className="page-transition relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      {showConfetti && <Confetti count={150} duration={6} />}

      <div className="relative z-30 w-full max-w-3xl">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-card px-5 py-2">
            <Gift className="h-4 w-4 text-gold-300" />
            <span className="text-xs font-medium tracking-[0.25em] text-white/80">
              YOUR FINAL SURPRISE
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            🎁 A Gift From the Heart
          </h2>
          <p className="mt-3 text-white/60">
            Tap the gift box to unwrap your surprise!
          </p>
        </div>

        {/* Gift box — unopened state */}
        {!opened && (
          <div className="flex flex-col items-center animate-scale-in">
            <button
              onClick={handleOpenBox}
              className="group relative transition-transform hover:scale-105 active:scale-95"
              aria-label="Open gift"
            >
              <div className="animate-bounce-soft">
                <svg width="160" height="180" viewBox="0 0 160 180" fill="none">
                  {/* Box body */}
                  <rect
                    x="20"
                    y="70"
                    width="120"
                    height="100"
                    rx="6"
                    fill="#f43f5e"
                  />
                  <rect
                    x="20"
                    y="70"
                    width="120"
                    height="100"
                    rx="6"
                    fill="url(#boxShine)"
                  />
                  {/* Vertical ribbon */}
                  <rect x="68" y="70" width="24" height="100" fill="#fbbf24" />
                  {/* Horizontal ribbon */}
                  <rect x="20" y="105" width="120" height="20" fill="#fbbf24" />
                  {/* Lid */}
                  <rect
                    x="12"
                    y="58"
                    width="136"
                    height="22"
                    rx="4"
                    fill="#fb7185"
                  />
                  {/* Bow */}
                  <ellipse cx="58" cy="50" rx="22" ry="16" fill="#fbbf24" />
                  <ellipse cx="102" cy="50" rx="22" ry="16" fill="#fbbf24" />
                  <ellipse cx="58" cy="50" rx="12" ry="9" fill="#f59e0b" />
                  <ellipse cx="102" cy="50" rx="12" ry="9" fill="#f59e0b" />
                  <circle cx="80" cy="50" r="9" fill="#d97706" />
                  {/* Glow */}
                  <circle cx="80" cy="100" r="70" fill="url(#glow)" />
                  <defs>
                    <linearGradient
                      id="boxShine"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id="glow">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-4 py-1.5 text-xs font-semibold text-night-900 shadow-glow whitespace-nowrap">
                Tap to open
              </div>
            </button>
          </div>
        )}

        {/* Gifts revealed */}
        {opened && (
          <div className="animate-fade-in-up">
            <div className="mb-8 flex justify-center">
              <PartyPopper className="h-12 w-12 text-gold-400 animate-bounce-soft" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {GIFT_MESSAGES.map((gift, i) => {
                const Icon = ICONS[gift.icon] ?? Heart;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedGift(i)}
                    className="glass-card group flex items-start gap-4 rounded-2xl p-5 text-left transition-all duration-300 hover:scale-[1.03] hover:bg-white/15 hover:shadow-glow animate-scale-in"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gold-gradient text-night-900 shadow-glow transition-transform group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-white">
                        {gift.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/60">
                        {gift.message}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Closing message */}
            <div className="mt-10 animate-fade-in-up delay-500">
              <p className="font-script text-3xl text-rose-300">
                Happy Birthday, {BIRTHDAY_NAME}! 🎉
              </p>
              <p className="mt-2 text-white/60">
                {GIFT_CLOSING_MESSAGE}
              </p>
              <p className="mt-4 text-2xl">💛💛💛</p>
            </div>
          </div>
        )}
      </div>

      {/* Gift detail modal */}
      {selectedGift !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night-900/90 p-6 animate-fade-in"
          onClick={() => setSelectedGift(null)}
        >
          <div
            className="glass-card-solid relative max-w-md rounded-2xl p-8 text-center shadow-2xl animate-scale-in"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,253,250,0.98) 0%, rgba(255,247,237,0.98) 100%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedGift(null)}
              className="absolute right-4 top-4 text-stone-400 transition-colors hover:text-stone-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient text-night-900 shadow-glow">
              {(() => {
                const Icon = ICONS[GIFT_MESSAGES[selectedGift].icon] ?? Heart;
                return <Icon className="h-8 w-8" />;
              })()}
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-800">
              {GIFT_MESSAGES[selectedGift].title}
            </h3>
            <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-gold-400 to-transparent" />
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              {GIFT_MESSAGES[selectedGift].message}
            </p>
            <p className="mt-6 font-script text-xl text-rose-500">
              Just for you, {BIRTHDAY_NAME}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
