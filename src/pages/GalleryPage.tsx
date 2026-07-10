import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Heart } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/content';

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    );
  const nextImage = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % GALLERY_IMAGES.length,
    );

  return (
    <div className="page-transition relative min-h-screen px-4 py-24 sm:px-6">
      <div className="relative z-30 mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center animate-fade-in-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-card px-5 py-2">
            <Camera className="h-4 w-4 text-gold-300" />
            <span className="text-xs font-medium tracking-[0.25em] text-white/80">
              PHOTO GALLERY
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Moments Worth Keeping
          </h2>
          <p className="mt-3 text-white/60">
            Tap any photo to view it up close
          </p>
        </div>

        {/* 3-column grid — portrait-friendly with fixed aspect ratio */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="group relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 transition-all duration-500 hover:scale-[1.03] hover:shadow-glow hover:ring-gold-400/40 animate-scale-in"
              style={{
                animationDelay: `${i * 0.1}s`,
                aspectRatio: '3 / 4',
              }}
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay — always partially visible so caption shows */}
              <div className="absolute inset-0 bg-gradient-to-t from-night-900/90 via-night-900/20 to-night-900/20" />

              {/* Emoji badge top-left */}
              <div className="absolute left-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-lg backdrop-blur-sm ring-1 ring-white/20">
                {img.emoji}
              </div>

              {/* Heart icon top-right */}
              <div className="absolute right-2.5 top-2.5 rounded-full bg-black/30 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <p className="font-body text-xs leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] sm:text-sm">
                  {img.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night-900/95 p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-110"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-3 z-10 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-110 sm:left-5"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* Image + caption */}
          <div
            className="flex max-h-[90vh] flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_IMAGES[lightboxIndex].src}
              alt={GALLERY_IMAGES[lightboxIndex].caption}
              className="max-h-[75vh] max-w-[80vw] rounded-2xl object-contain shadow-2xl ring-1 ring-white/10 animate-scale-in"
            />
            <div className="flex max-w-[80vw] items-center gap-3 rounded-2xl glass-card px-5 py-3">
              <span className="text-2xl flex-shrink-0">{GALLERY_IMAGES[lightboxIndex].emoji}</span>
              <Heart className="h-4 w-4 flex-shrink-0 fill-rose-400 text-rose-400 animate-heartbeat" />
              <p className="font-body text-sm leading-snug text-white sm:text-base">
                {GALLERY_IMAGES[lightboxIndex].caption}
              </p>
            </div>
            <p className="text-xs text-white/40">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-3 z-10 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-110 sm:right-5"
            aria-label="Next photo"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}
    </div>
  );
}
