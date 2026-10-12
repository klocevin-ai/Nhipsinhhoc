import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundEngine } from '../lib/soundEngine';

interface NightHUDProps {
  disciplineScore: number;
  sessionTimeStr: string;
  onOpenHero?: () => void;
}

export function NightHUD({ disciplineScore, sessionTimeStr, onOpenHero }: NightHUDProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    setIsAudioPlaying(soundEngine.getIsPlaying());
  }, []);

  const toggleSound = () => {
    if (isAudioPlaying) {
      soundEngine.stop();
      setIsAudioPlaying(false);
    } else {
      soundEngine.play('delta');
      setIsAudioPlaying(true);
    }
  };

  return (
    <header className="bg-night-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 text-xs sticky top-0 z-30 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={onOpenHero}>
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-[1.5px] shadow-lg shadow-pink-500/20">
            <div className="w-full h-full bg-[#060914] rounded-[14px] flex items-center justify-center text-pink-400 text-sm">
              <i className="fa-solid fa-cat" />
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <span
                className="font-extrabold text-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Bedtime Procrastination
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold ml-1 font-mono">
                PRO SUITE
              </span>
            </div>
            <span className="text-[10px] text-slate-400 hidden sm:block">
              Nhật Ký & Phương Hướng Kỷ Luật Giấc Ngủ
            </span>
          </div>
        </div>

        {/* HUD Counters */}
        <div className="flex items-center gap-2 sm:gap-4 text-slate-400">
          {/* Discipline Score */}
          <div className="flex items-center gap-1.5 text-xs bg-[#0b1124] px-3 py-1.5 rounded-full border border-slate-800 shadow-sm">
            <i className="fa-solid fa-heart text-pink-400 animate-pulse" />
            <span className="hidden sm:inline text-slate-300">Kỷ Luật:</span>
            <span className="font-mono font-bold text-pink-300">{disciplineScore}%</span>
          </div>

          {/* Session Timer */}
          <div className="flex items-center gap-1.5 text-xs bg-[#0b1124] px-3 py-1.5 rounded-full border border-slate-800 shadow-sm">
            <i className="fa-solid fa-clock text-cyan-400" />
            <span className="hidden sm:inline text-slate-400">Dán Mắt:</span>
            <span className="font-mono text-cyan-300 font-bold">{sessionTimeStr}</span>
          </div>

          {/* Quick Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border transition cursor-pointer ${
              isAudioPlaying
                ? 'bg-purple-900/40 border-purple-500/50 text-purple-300'
                : 'bg-[#0b1124] border-slate-800 text-slate-400 hover:text-white'
            }`}
            title={isAudioPlaying ? 'Dừng âm thanh sóng não' : 'Bật sóng não Delta 2.5Hz'}
          >
            {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Intro button */}
          {onOpenHero && (
            <button
              onClick={onOpenHero}
              className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2.5 py-1 rounded-full bg-white/5 border border-white/10 transition cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>Châm Ngôn</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
