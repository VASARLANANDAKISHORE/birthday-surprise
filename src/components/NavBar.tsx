import { ChevronLeft, ChevronRight } from 'lucide-react';

type NavBarProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onGoToPage: (page: number) => void;
};

const PAGE_LABELS = ['Wish', 'Letter', 'Gallery', 'Video', 'Song', 'Gift'];

export default function NavBar({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onGoToPage,
}: NavBarProps) {
  return (
    <>
      {/* Top progress dots */}
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-5">
        <div className="glass-card flex items-center gap-2 rounded-full px-4 py-2.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className="group relative flex items-center"
              title={PAGE_LABELS[i]}
            >
              <button
                onClick={() => onGoToPage(i)}
                className="cursor-pointer transition-all duration-300"
                aria-label={`Go to ${PAGE_LABELS[i]}`}
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    i === currentPage
                      ? 'h-2.5 w-8 bg-gold-400 shadow-glow'
                      : i < currentPage
                        ? 'h-2.5 w-2.5 bg-rose-400'
                        : 'h-2.5 w-2.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom navigation arrows */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-4 pb-6 sm:px-8">
        <button
          onClick={onPrev}
          disabled={currentPage === 0}
          className={`group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
            currentPage === 0
              ? 'cursor-not-allowed opacity-30'
              : 'glass-card text-white hover:bg-white/15 hover:scale-105 active:scale-95'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <span className="font-display text-sm tracking-widest text-white/60">
          {String(currentPage + 1).padStart(2, '0')}{' '}
          <span className="text-white/30">/</span>{' '}
          {String(totalPages).padStart(2, '0')}
        </span>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages - 1}
          className={`group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
            currentPage === totalPages - 1
              ? 'cursor-not-allowed opacity-30'
              : 'bg-gold-gradient text-night-900 shadow-glow hover:scale-105 hover:shadow-glow-lg active:scale-95'
          }`}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </>
  );
}
