type CandleProps = {
  className?: string;
  lit?: boolean;
};

export default function Candle({ className = '', lit = true }: CandleProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Flame */}
      {lit && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full">
          <div
            className="animate-candle-flicker"
            style={{ transformOrigin: 'bottom center' }}
          >
            <svg width="14" height="26" viewBox="0 0 14 26" fill="none">
              <defs>
                <radialGradient id="flame-outer" cx="50%" cy="70%" r="60%">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="flame-inner" cx="50%" cy="75%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="7" cy="16" rx="7" ry="10" fill="url(#flame-outer)" />
              <ellipse cx="7" cy="18" rx="3.5" ry="6" fill="url(#flame-inner)" />
              <circle cx="7" cy="21" r="2" fill="#ffffff" opacity="0.9" />
            </svg>
          </div>
        </div>
      )}
      {/* Wick */}
      <div className="absolute left-1/2 top-0 h-2 w-0.5 -translate-x-1/2 -translate-y-1 bg-night-700" />
      {/* Candle body */}
      <div className="relative h-16 w-5 rounded-sm bg-gradient-to-b from-rose-400 to-rose-500 shadow-lg">
        <div className="absolute left-0 top-0 h-full w-1/3 rounded-l-sm bg-white/15" />
        <div className="absolute left-1/2 top-0 h-1 w-full -translate-x-1/2 rounded-t-sm bg-rose-300" />
      </div>
    </div>
  );
}
