import { Mail, Heart } from 'lucide-react';
import { BIRTHDAY_NAME, LETTER_TEXT } from '../data/content';

export default function LetterPage() {
  const paragraphs = LETTER_TEXT.split('\n\n');

  return (
    <div className="page-transition relative flex min-h-screen items-center justify-center px-6 py-24">
      <div className="relative z-30 w-full max-w-2xl">
        {/* Envelope flap decoration */}
        <div className="mb-6 flex justify-center animate-fade-in">
          <div className="flex items-center gap-3 rounded-full glass-card px-5 py-2">
            <Mail className="h-4 w-4 text-gold-300" />
            <span className="text-xs font-medium tracking-[0.25em] text-white/80">
              A LETTER FOR YOU
            </span>
          </div>
        </div>

        {/* Letter card */}
        <div
          className="glass-card-solid relative rounded-2xl p-8 shadow-2xl sm:p-12 animate-scale-in"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,253,250,0.97) 0%, rgba(255,247,237,0.97) 100%)',
          }}
        >
          {/* Decorative corner flourishes */}
          <div className="absolute left-4 top-4 h-12 w-12 border-l-2 border-t-2 border-gold-400/40 rounded-tl-lg" />
          <div className="absolute right-4 top-4 h-12 w-12 border-r-2 border-t-2 border-gold-400/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 h-12 w-12 border-b-2 border-l-2 border-gold-400/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 h-12 w-12 border-b-2 border-r-2 border-gold-400/40 rounded-br-lg" />

          <div className="text-center">
            <p className="font-script text-3xl text-rose-500">
              Dear {BIRTHDAY_NAME}
            </p>
            <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          </div>

          <div className="mt-8 space-y-5">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-body text-base leading-[1.8] text-stone-700 sm:text-lg animate-fade-in-up"
                style={{ animationDelay: `${0.3 + i * 0.25}s` }}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-rose-400">
            <Heart className="h-4 w-4 fill-current animate-heartbeat" />
            <span className="text-xs font-medium tracking-widest text-stone-500">
              WITH ALL MY LOVE
            </span>
            <Heart className="h-4 w-4 fill-current animate-heartbeat" />
          </div>
        </div>
      </div>
    </div>
  );
}
