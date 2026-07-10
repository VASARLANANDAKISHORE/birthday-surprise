import { useState } from 'react';
import { Cake, Sparkles, Heart } from 'lucide-react';
import Candle from '../components/Candle';
import Confetti from '../components/Confetti';
import { BIRTHDAY_NAME } from '../data/content';

export default function WishPage() {
  const [celebrated, setCelebrated] = useState(false);

  const handleCelebrate = () => {
    setCelebrated(true);
    setTimeout(() => setCelebrated(false), 6000);
  };

  return (
    <div className="page-transition relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      {celebrated && <Confetti count={120} duration={6} />}

      <div className="animate-fade-in-up z-30 flex flex-col items-center">
        <div className="mb-6 flex items-center gap-2 rounded-full glass-card px-5 py-2">
          <Sparkles className="h-4 w-4 text-gold-300" />
          <span className="text-xs font-medium tracking-[0.25em] text-white/80">
            A SPECIAL DAY
          </span>
          <Sparkles className="h-4 w-4 text-gold-300" />
        </div>

        <p className="font-script text-3xl text-rose-300 sm:text-4xl animate-fade-in-up delay-200">
          Happy Birthday
        </p>

        <h1 className="font-display mt-2 text-6xl font-black leading-none shimmer-text sm:text-8xl animate-fade-in-up delay-300">
          {BIRTHDAY_NAME}
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg animate-fade-in-up delay-500">
          Today is all about you — the light you bring, the smiles you share,
          and the wonderful person you are. Let's celebrate!
        </p>

        {/* Candles */}
        <div className="mt-12 flex items-end gap-5 sm:gap-8 animate-scale-in delay-700">
          <Candle className="animate-sway" />
          <Candle className="scale-125 animate-sway" />
          <Candle className="animate-sway" />
        </div>

        {/* Cake icon */}
        <div className="mt-8 animate-bounce-soft">
          <Cake className="h-10 w-10 text-gold-400" strokeWidth={1.5} />
        </div>

        <button
          onClick={handleCelebrate}
          className="mt-10 flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-4 font-semibold text-night-900 shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-glow-lg active:scale-95 animate-pulse-glow animate-fade-in-up delay-1000"
        >
          <Heart className="h-5 w-5 fill-current" />
          Make a Wish
        </button>

        <p className="mt-6 text-sm text-white/40 animate-fade-in delay-1000">
          Close your eyes, make a wish, and tap to celebrate
        </p>
      </div>
    </div>
  );
}
