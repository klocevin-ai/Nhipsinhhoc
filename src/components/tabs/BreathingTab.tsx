import { useState, useEffect, useRef } from 'react';

export function BreathingTab() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [counter, setCounter] = useState(4);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isBreathing) {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase('idle');
      setCounter(4);
      return;
    }

    let currentPhase: 'inhale' | 'hold' | 'exhale' = 'inhale';
    let currentCount = 4;
    setPhase('inhale');
    setCounter(4);

    timerRef.current = setInterval(() => {
      currentCount -= 1;
      if (currentCount <= 0) {
        if (currentPhase === 'inhale') {
          currentPhase = 'hold';
          currentCount = 7;
        } else if (currentPhase === 'hold') {
          currentPhase = 'exhale';
          currentCount = 8;
        } else {
          currentPhase = 'inhale';
          currentCount = 4;
        }
      }
      setPhase(currentPhase);
      setCounter(currentCount);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isBreathing]);

  const getStatusLabel = () => {
    switch (phase) {
      case 'inhale':
        return 'Hít Vào';
      case 'hold':
        return 'Nín Thở';
      case 'exhale':
        return 'Thở Chậm';
      default:
        return 'Sẵn Sàng';
    }
  };

  const getScaleClass = () => {
    if (phase === 'inhale' || phase === 'hold') return 'scale-125';
    return 'scale-100';
  };

  return (
    <div className="bg-[#0b1124]/90 backdrop-blur-md p-8 rounded-3xl border border-teal-500/30 max-w-lg mx-auto text-center space-y-6 shadow-2xl liquid-glass animate-fade-rise">
      <div className="space-y-1">
        <h2
          className="text-2xl font-black text-white flex items-center justify-center gap-2"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <span>🫧</span> Vòng Tròn Thở Sinh Học 4-7-8
        </h2>
        <p className="text-xs text-slate-400">
          Kích hoạt hệ thần kinh phó giao cảm, giảm nhịp tim và đưa não vào giấc ngủ
        </p>
      </div>

      <div className="py-6 flex items-center justify-center">
        <div
          className={`w-44 h-44 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-teal-400 flex flex-col items-center justify-center text-white shadow-2xl shadow-teal-500/20 transition-all duration-1000 transform ${getScaleClass()}`}
        >
          <span className="text-xs uppercase font-extrabold tracking-wider">{getStatusLabel()}</span>
          <span className="text-4xl font-mono font-black mt-1">{counter}</span>
        </div>
      </div>

      <button
        onClick={() => setIsBreathing(!isBreathing)}
        className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-xs rounded-2xl shadow-lg btn-bouncy cursor-pointer transition hover:opacity-95"
      >
        {isBreathing ? 'Dừng Thở' : 'Bắt Đầu Thở (2 Phút)'}
      </button>
    </div>
  );
}
