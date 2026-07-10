import { useMemo } from 'react';

const BALLOON_COLORS = [
  { fill: '#f43f5e', glow: 'rgba(244,63,94,0.4)' },
  { fill: '#fbbf24', glow: 'rgba(251,191,36,0.4)' },
  { fill: '#a78bfa', glow: 'rgba(167,139,250,0.4)' },
  { fill: '#34d399', glow: 'rgba(52,211,153,0.4)' },
  { fill: '#f9a8d4', glow: 'rgba(249,168,212,0.4)' },
  { fill: '#60a5fa', glow: 'rgba(96,165,250,0.4)' },
];

type BalloonsProps = {
  count?: number;
};

export default function Balloons({ count = 12 }: BalloonsProps) {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const color = BALLOON_COLORS[i % BALLOON_COLORS.length];
        const left = (i / count) * 100 + (Math.random() * 8 - 4);
        const delay = Math.random() * 8;
        const duration = 12 + Math.random() * 10;
        const scale = 0.6 + Math.random() * 0.6;
        return { id: i, left, delay, duration, scale, color };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          style={{
            position: 'absolute',
            left: `${b.left}%`,
            bottom: '-15vh',
            transform: `scale(${b.scale})`,
            animation: `float-up ${b.duration}s ease-in ${b.delay}s infinite`,
          }}
        >
          <svg width="50" height="65" viewBox="0 0 50 65" fill="none">
            <defs>
              <radialGradient id={`balloon-${b.id}`} cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                <stop offset="40%" stopColor={b.color.fill} stopOpacity="1" />
                <stop offset="100%" stopColor={b.color.fill} stopOpacity="0.85" />
              </radialGradient>
            </defs>
            <ellipse
              cx="25"
              cy="25"
              rx="20"
              ry="24"
              fill={`url(#balloon-${b.id})`}
              style={{ filter: `drop-shadow(0 0 8px ${b.color.glow})` }}
            />
            <path d="M25 49 L22 53 L28 53 Z" fill={b.color.fill} opacity="0.7" />
            <path
              d="M25 53 Q22 58 25 62 Q28 66 25 70"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
