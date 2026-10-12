import { useState } from 'react';

interface NightMascotProps {
  onPet: () => void;
}

interface FloatingItem {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export function NightMascot({ onPet }: NightMascotProps) {
  const [floaters, setFloaters] = useState<FloatingItem[]>([]);

  const handlePet = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const emojis = ['💖', '✨', '🐾', '🌸', '⭐', '💤'];
    const newId = Date.now() + Math.random();
    const item: FloatingItem = {
      id: newId,
      x,
      y,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };

    setFloaters((prev) => [...prev, item]);
    onPet();

    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== newId));
    }, 1000);
  };

  return (
    <div
      onClick={handlePet}
      className="relative cursor-pointer select-none group flex flex-col items-center"
      title="Chạm để nựng bé mèo Miu (+1 Điểm Kỷ Luật)!"
    >
      <div className="relative w-36 h-36 flex items-center justify-center animate-cat-breathe">
        {/* Floating Zzz */}
        <div className="absolute -top-3 right-2 text-sm font-black font-mono text-pink-300 animate-zzz-1 pointer-events-none">
          z
        </div>
        <div className="absolute -top-6 right-5 text-base font-black font-mono text-purple-300 animate-zzz-2 pointer-events-none">
          Z
        </div>

        {/* Cute Sleepy Cat Body */}
        <div className="w-28 h-24 bg-gradient-to-tr from-indigo-500 to-pink-400 rounded-[45px] relative shadow-xl flex items-center justify-center border-2 border-white/20 transition-transform group-hover:scale-105">
          {/* Ears */}
          <div className="absolute -top-4 left-3 w-6 h-6 bg-pink-400 rounded-tl-xl transform -rotate-12 border-t border-l border-white/40" />
          <div className="absolute -top-4 right-3 w-6 h-6 bg-indigo-500 rounded-tr-xl transform rotate-12 border-t border-r border-white/40" />

          {/* Sleeping Eyes and Nose */}
          <div className="flex items-center gap-4 mt-1">
            <span className="text-slate-900 font-black text-lg select-none">∪</span>
            <div className="w-2 h-1.5 bg-pink-200 rounded-full" />
            <span className="text-slate-900 font-black text-lg select-none">∪</span>
          </div>

          {/* Cheeks */}
          <div className="absolute bottom-5 left-4 w-3.5 h-2 bg-rose-400/80 rounded-full blur-[1px]" />
          <div className="absolute bottom-5 right-4 w-3.5 h-2 bg-rose-400/80 rounded-full blur-[1px]" />

          {/* Tail */}
          <div className="absolute -bottom-2 -left-4 w-7 h-3 bg-indigo-600 rounded-full animate-tail" />
        </div>
      </div>

      <div className="text-[10px] text-center text-pink-300/80 font-bold mt-1 group-hover:text-pink-200 transition">
        🐾 Chạm Miu (+1 Thả Tim)
      </div>

      {/* Floating flying hearts container */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {floaters.map((f) => (
          <div
            key={f.id}
            className="flying-heart text-2xl select-none"
            style={{ left: `${f.x}px`, top: `${f.y - 20}px` }}
          >
            {f.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
