import { useState, useEffect } from 'react';

interface MissionAlarmModalProps {
  isOpen: boolean;
  onSolve: () => void;
  onSnooze5Min: () => void;
}

export function MissionAlarmModal({
  isOpen,
  onSolve,
  onSnooze5Min,
}: MissionAlarmModalProps) {
  const [numA, setNumA] = useState(12);
  const [numB, setNumB] = useState(15);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (isOpen) {
      const a = Math.floor(Math.random() * 15) + 6;
      const b = Math.floor(Math.random() * 12) + 5;
      setNumA(a);
      setNumB(b);
      setAnswer('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerify = () => {
    const val = parseInt(answer.trim());
    if (val === numA + numB) {
      onSolve();
    } else {
      alert('❌ Đáp số chưa đúng, hãy tính cẩn thận lại nào!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-rise">
      <div className="bg-[#0b1124] border-2 border-rose-500 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl liquid-glass">
        <div className="text-5xl animate-bounce">⏰😾</div>
        <div className="space-y-1">
          <h3
            className="text-xl font-black text-white"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Quá Giờ Quy Định!
          </h3>
          <p className="text-xs text-slate-400">
            Giải nhanh câu hỏi để dập còi hú và tắt máy đi ngủ:
          </p>
        </div>
        <div className="p-4 bg-[#060914] rounded-2xl border border-slate-800 space-y-3">
          <div className="text-3xl font-mono font-black text-pink-400">
            {numA} + {numB} = ?
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              placeholder="Đáp số..."
              className="w-full bg-[#0b1124] border border-slate-700 rounded-xl px-4 py-2.5 text-center font-mono text-white text-base focus:border-pink-500 outline-none"
            />
            <button
              onClick={handleVerify}
              className="px-5 py-2.5 bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs rounded-xl btn-bouncy cursor-pointer"
            >
              Nộp
            </button>
          </div>
        </div>
        <button
          onClick={onSnooze5Min}
          className="text-xs text-slate-500 hover:text-slate-400 transition cursor-pointer"
        >
          Hoãn còi 5 phút (-3 Điểm Kỷ Luật)
        </button>
      </div>
    </div>
  );
}
