import { useState, useEffect, useCallback } from 'react';
import Starfield from './components/Starfield';
import Balloons from './components/Balloons';
import NavBar from './components/NavBar';
import WishPage from './pages/WishPage';
import LetterPage from './pages/LetterPage';
import GalleryPage from './pages/GalleryPage';
import VideoPage from './pages/VideoPage';
import SongPage from './pages/SongPage';
import GiftPage from './pages/GiftPage';

const TOTAL_PAGES = 6;
const PAGES = [
  WishPage,
  LetterPage,
  GalleryPage,
  VideoPage,
  SongPage,
  GiftPage,
];

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const goNext = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 0));
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, TOTAL_PAGES - 1)));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const CurrentPage = PAGES[currentPage];

  return (
    <div className="relative min-h-screen overflow-hidden bg-night-gradient">
      {/* Ambient background layers */}
      <Starfield count={70} />
      <Balloons count={10} />

      {/* Soft radial glows */}
      <div className="pointer-events-none fixed left-[-10%] top-[-10%] z-0 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] z-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />

      {/* Page content with keyed remount for transition */}
      <main key={currentPage} className="relative z-20">
        <CurrentPage />
      </main>

      <NavBar
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPrev={goPrev}
        onNext={goNext}
        onGoToPage={goToPage}
      />
    </div>
  );
}

export default App;
