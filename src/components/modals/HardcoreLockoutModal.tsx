import { useState, useEffect } from 'react';
import { Lock, Volume2, VolumeX, ShieldAlert, Sparkles, Check, ArrowRight } from 'lucide-react';
import { UnlockMethod } from '../tabs/LockAndAlarmTab';

interface HardcoreLockoutModalProps {
  isOpen: boolean;
  reason: string;
  unlockMethod: UnlockMethod;
  isAlarmRinging: boolean;
  onToggleAlarmSound: () => void;
  onSuccessUnlock: () => void;
  onEmergencyPenaltyUnlock: () => void;
}

export function HardcoreLockoutModal({
  isOpen,
  reason,
  unlockMethod,
  isAlarmRinging,
  onToggleAlarmSound,
  onSuccessUnlock,
  onEmergencyPenaltyUnlock,
}: HardcoreLockoutModalProps) {
  // Clock state
  const [clockTime, setClockTime] = useState<string>('00:00:00');
  const [clockDate, setClockDate] = useState<string>('');

  // Math mission
  const [mathA, setMathA] = useState(15);
  const [mathB, setMathB] = useState(18);
  const [mathAnswer, setMathAnswer] = useState('');

  // Pledge mission
  const targetPledge = 'Tôi cam kết tắt máy đi ngủ để bảo vệ sức khỏe và tương lai của chính mình';
  const [pledgeInput, setPledgeInput] = useState('');

  // Breath mission
  const [breathPhase, setBreathPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [breathCounter, setBreathCounter] = useState(4);
  const [breathCompleted, setBreathCompleted] = useState(false);

  // Tab inside modal if user wants to switch mission
  const [activeMission, setActiveMission] = useState<UnlockMethod>(unlockMethod);

  useEffect(() => {
    setActiveMission(unlockMethod);
  }, [unlockMethod]);

  // Clock ticker
  useEffect(() => {
    if (!isOpen) return;
    const updateTime = () => {
      const now = new Date();
      setClockTime(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(
          now.getSeconds()
        ).padStart(2, '0')}`
      );
      setClockDate(now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Math quiz generator
  useEffect(() => {
    if (isOpen) {
      setMathA(Math.floor(Math.random() * 20) + 11);
      setMathB(Math.floor(Math.random() * 15) + 12);
      setMathAnswer('');
      setPledgeInput('');
      setBreathPhase('idle');
      setBreathCounter(4);
      setBreathCompleted(false);
    }
  }, [isOpen, activeMission]);

  // Breath cycle runner
  const startBreathCycle = () => {
    setBreathPhase('inhale');
    setBreathCounter(4);
    let count = 4;
    let ph: 'inhale' | 'hold' | 'exhale' = 'inhale';

    const bTimer = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        if (ph === 'inhale') {
          ph = 'hold';
          count = 7;
        } else if (ph === 'hold') {
          ph = 'exhale';
          count = 8;
        } else {
          clearInterval(bTimer);
          setBreathCompleted(true);
          setBreathPhase('idle');
          return;
        }
      }
      setBreathPhase(ph);
      setBreathCounter(count);
    }, 1000);
  };

  if (!isOpen) return null;

  const handleVerifyMath = () => {
    if (parseInt(mathAnswer.trim()) === mathA + mathB) {
      onSuccessUnlock();
    } else {
      alert('❌ Đáp số chưa đúng, hãy tính cẩn thận lại nào!');
    }
  };

  const handleVerifyPledge = () => {
    if (pledgeInput.trim() === targetPledge) {
      onSuccessUnlock();
    } else {
      alert('❌ Chưa khớp hoàn toàn! Hãy gõ chính xác từng từ trong lời cam kết.');
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/95 flex flex-col items-center justify-between p-6 sm:p-10 text-center animate-fade-rise overflow-y-auto">
      {/* Top Warning Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between border-b border-rose-500/30 pb-3">
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span>GIỚI NGHIÊM KỶ LUẬT ĐANG KÍCH HOẠT</span>
        </div>
        <button
          onClick={onToggleAlarmSound}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
        >
          {isAlarmRinging ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Tắt Chuông Báo</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>Bật Lại Chuông</span>
            </>
          )}
        </button>
      </div>

      {/* Center Giant Cinematic Clock & Lock Status */}
      <div className="my-auto py-6 max-w-xl w-full space-y-6">
        <div className="space-y-1">
          <div
            className="text-6xl sm:text-8xl font-black font-mono tracking-tight text-white drop-shadow-2xl"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {clockTime}
          </div>
          <p className="text-xs sm:text-sm text-slate-400 capitalize">{clockDate}</p>
        </div>

        <div className="space-y-2">
          <h2
            className="text-2xl sm:text-3xl font-normal text-white"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Màn Hình Đang Bị Phong Tỏa Hoàn Toàn
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            {reason || 'Hệ thống đã khóa máy do chạm giới nghiêm. Giờ ngủ sinh học quý giá nhất đã bắt đầu.'}
          </p>
        </div>

        {/* Mission Switcher Tabs */}
        <div className="flex justify-center gap-1.5 bg-[#0b1124] p-1 rounded-2xl border border-slate-800 max-w-md mx-auto">
          {[
            { id: 'math', label: 'Giải Toán' },
            { id: 'pledge', label: 'Chép Phạt' },
            { id: 'breath', label: 'Thở 4-7-8' },
            { id: 'emergency', label: 'Khẩn Cấp' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMission(tab.id as UnlockMethod)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                activeMission === tab.id
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mission 1: Math */}
        {activeMission === 'math' && (
          <div className="p-5 bg-[#0b1124] border border-rose-500/40 rounded-3xl max-w-md mx-auto space-y-3 shadow-2xl">
            <span className="text-xs text-rose-300 font-bold block uppercase">
              Giải Nhanh Phép Tính Để Tắt Máy:
            </span>
            <div className="text-3xl font-mono font-black text-pink-400">
              {mathA} + {mathB} = ?
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={mathAnswer}
                onChange={(e) => setMathAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerifyMath()}
                placeholder="Nhập kết quả..."
                className="w-full bg-[#060914] border border-slate-700 rounded-xl px-4 py-2 text-center font-mono text-white text-base focus:border-rose-500 outline-none"
              />
              <button
                onClick={handleVerifyMath}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl btn-bouncy cursor-pointer"
              >
                Mở Khóa
              </button>
            </div>
          </div>
        )}

        {/* Mission 2: Pledge */}
        {activeMission === 'pledge' && (
          <div className="p-5 bg-[#0b1124] border border-rose-500/40 rounded-3xl max-w-md mx-auto space-y-3 shadow-2xl text-left">
            <span className="text-xs text-rose-300 font-bold block uppercase text-center">
              Gõ Chính Xác Từng Từ Cam Kết:
            </span>
            <div className="p-3 bg-[#060914] rounded-xl text-xs text-amber-300 font-semibold italic border border-slate-800">
              "{targetPledge}"
            </div>
            <textarea
              rows={2}
              value={pledgeInput}
              onChange={(e) => setPledgeInput(e.target.value)}
              placeholder="Gõ lại câu trên vào đây..."
              className="w-full bg-[#060914] border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-rose-500 outline-none resize-none"
            />
            <button
              onClick={handleVerifyPledge}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl btn-bouncy cursor-pointer"
            >
              Xác Nhận Cam Kết & Mở Máy Đi Ngủ
            </button>
          </div>
        )}

        {/* Mission 3: Breathing */}
        {activeMission === 'breath' && (
          <div className="p-5 bg-[#0b1124] border border-rose-500/40 rounded-3xl max-w-md mx-auto space-y-4 shadow-2xl">
            <span className="text-xs text-teal-300 font-bold block uppercase">
              Thực Hiện 1 Chu Kỳ Thở 4-7-8 Để Hạ Nhịp Tim:
            </span>

            {breathPhase === 'idle' && !breathCompleted && (
              <button
                onClick={startBreathCycle}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-xs rounded-2xl btn-bouncy cursor-pointer"
              >
                Bắt Đầu Hít Thở (19 Giây)
              </button>
            )}

            {breathPhase !== 'idle' && (
              <div className="py-2 space-y-2">
                <div className="text-xs text-white uppercase tracking-wider font-extrabold font-mono">
                  {breathPhase === 'inhale' ? 'HÍT VÀO' : breathPhase === 'hold' ? 'NÍN THỞ' : 'THỞ CHẬM'}
                </div>
                <div className="text-4xl font-black font-mono text-teal-300 animate-pulse">
                  {breathCounter}s
                </div>
              </div>
            )}

            {breathCompleted && (
              <div className="space-y-2 animate-fade-rise">
                <div className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <Check className="w-4 h-4" /> Đã hoàn thành nhịp thở!
                </div>
                <button
                  onClick={onSuccessUnlock}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl btn-bouncy cursor-pointer"
                >
                  Mở Khóa Để Gập Máy Đi Ngủ
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mission 4: Emergency */}
        {activeMission === 'emergency' && (
          <div className="p-5 bg-[#0b1124] border border-slate-800 rounded-3xl max-w-md mx-auto space-y-3 shadow-2xl">
            <span className="text-xs text-rose-400 font-bold block uppercase">
              Mở Khóa Ngoại Lệ Khẩn Cấp (-5 Điểm Kỷ Luật):
            </span>
            <p className="text-[11px] text-slate-400">
              Chỉ dùng khi có việc đột xuất tối khẩn (gia đình, y tế, công việc quan trọng).
            </p>
            <button
              onClick={onEmergencyPenaltyUnlock}
              className="w-full py-2.5 bg-slate-800 hover:bg-rose-950 text-rose-300 border border-slate-700 text-xs font-bold rounded-xl btn-bouncy cursor-pointer"
            >
              Nhập Lý Do & Chấp Nhận Phạt Kỷ Luật
            </button>
          </div>
        )}
      </div>

      {/* Bottom Footer Quote */}
      <div className="text-xs text-slate-500 font-mono">
        Bedtime Procrastination Suite • Giấc ngủ là nền tảng của mọi thắng lợi ngày mai
      </div>
    </div>
  );
}
