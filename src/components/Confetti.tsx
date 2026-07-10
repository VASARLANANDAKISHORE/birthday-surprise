import { useMemo } from 'react';

const CONFETTI_COLORS = [
  '#fbbf24',
  '#f43f5e',
  '#f9a8d4',
  '#a78bfa',
  '#34d399',
  '#60a5fa',
  '#fb923c',
];

type ConfettiProps = {
  count?: number;
  duration?: number;
};

export default function Confetti({ count = 50, duration = 5 }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * duration;
        const fallDuration = 4 + Math.random() * 4;
        const size = 6 + Math.random() * 8;
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const isCircle = Math.random() > 0.6;
        return { id: i, left, delay, fallDuration, size, color, isCircle };
      }),
    [count, duration],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-10vh',
            width: `${p.size}px`,
            height: `${p.size * (p.isCircle ? 1 : 1.6)}px`,
            backgroundColor: p.color,
            borderRadius: p.isCircle ? '50%' : '2px',
            animation: `confetti-fall ${p.fallDuration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
