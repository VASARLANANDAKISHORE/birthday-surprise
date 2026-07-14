import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Film } from 'lucide-react';

export default function VideoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      if (v.paused) {
        await v.play();
        setIsPlaying(true);
      } else {
        v.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error('Video play failed:', err);
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = (Number(e.target.value) / 100) * v.duration;
    setProgress(Number(e.target.value));
  };

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="page-transition relative flex min-h-screen items-center justify-center px-6 py-24">
      <div className="relative z-30 w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass-card px-5 py-2">
            <Film className="h-4 w-4 text-gold-300" />
            <span className="text-xs font-medium tracking-[0.25em] text-white/80">
              A LIVING MEMORY
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Press Play &amp; Smile
          </h2>
          <p className="mt-3 text-white/60">
            Some moments are better in motion — here's one just for you
          </p>
        </div>

        {/* Video container */}
        <div
          className="group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 animate-scale-in"
          onMouseLeave={() => {}}
        >
          <video
            ref={videoRef}
            className="aspect-video w-full bg-black object-cover"
            src="/video.mp4"
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            playsInline
            preload="metadata"
          />

          {/* Center play overlay */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-night-900/40 transition-opacity"
              aria-label="Play video"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient text-night-900 shadow-glow transition-transform hover:scale-110 animate-pulse-glow">
                <Play className="h-9 w-9 fill-current" />
              </span>
            </button>
          )}

          {/* Custom controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-night-900/95 to-transparent p-4 pt-12">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="text-white transition-transform hover:scale-110"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 fill-current" />
                ) : (
                  <Play className="h-6 w-6 fill-current" />
                )}
              </button>

              <span className="text-xs tabular-nums text-white/70">
                {formatTime(videoRef.current?.currentTime ?? 0)}
              </span>

              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={handleSeek}
                className="audio-slider flex-1"
                style={{
                  background: `linear-gradient(to right, #fbbf24 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
                }}
                aria-label="Seek"
              />

              <span className="text-xs tabular-nums text-white/70">
                {formatTime(videoRef.current?.duration ?? 0)}
              </span>

              <button
                onClick={toggleMute}
                className="text-white transition-transform hover:scale-110"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-white/40 animate-fade-in delay-500">
          Tap play to relive the celebration
        </p>
      </div>
    </div>
  );
}
