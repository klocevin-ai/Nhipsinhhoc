import { useState } from 'react';
import { Volume2, VolumeX, ShieldAlert, Bell, Lock, Sparkles, Check, Play, Square } from 'lucide-react';
import { soundEngine, AlarmType } from '../../lib/soundEngine';

export type UnlockMethod = 'math' | 'pledge' | 'breath' | 'emergency';

interface LockAndAlarmTabProps {
  onTriggerInstantLock: (reason: string) => void;
  selectedUnlockMethod: UnlockMethod;
  setSelectedUnlockMethod: (method: UnlockMethod) => void;
  bedtimeAlarmTime: string;
  setBedtimeAlarmTime: (time: string) => void;
  isBedtimeAlarmEnabled: boolean;
  setIsBedtimeAlarmEnabled: (val: boolean) => void;
  wakeAlarmTime: string;
  setWakeAlarmTime: (time: string) => void;
  isWakeAlarmEnabled: boolean;
  setIsWakeAlarmEnabled: (val: boolean) => void;
  chosenAlarmSound: AlarmType;
  setChosenAlarmSound: (sound: AlarmType) => void;
  alarmVolume: number;
  setAlarmVolume: (vol: number) => void;
}

export function LockAndAlarmTab({
  onTriggerInstantLock,
  selectedUnlockMethod,
  setSelectedUnlockMethod,
  bedtimeAlarmTime,
  setBedtimeAlarmTime,
  isBedtimeAlarmEnabled,
  setIsBedtimeAlarmEnabled,
  wakeAlarmTime,
  setWakeAlarmTime,
  isWakeAlarmEnabled,
  setIsWakeAlarmEnabled,
  chosenAlarmSound,
  setChosenAlarmSound,
  alarmVolume,
  setAlarmVolume,
}: LockAndAlarmTabProps) {
  const [testingSound, setTestingSound] = useState<AlarmType | null>(null);
  const [quickTimerMin, setQuickTimerMin] = useState<number | null>(null);

  const alarmOptions: {
    id: AlarmType;
    name: string;
    vibe: string;
    desc: string;
    tag: string;
    color: string;
  }[] = [
    {
      id: 'siren',
      name: 'Còi Báo Động Khẩn Cấp',
      vibe: 'Cảnh báo gắt',
      desc: 'Còi hú quét tần số liên tục, chấm dứt triệt để thói quen nằm chần chừ lướt điện thoại.',
      tag: 'CƯỠNG CHẾ',
      color: 'border-rose-500/60 bg-rose-950/20 text-rose-300',
    },
    {
      id: 'tibetan',
      name: 'Chuông Xoay Tây Tạng',
      vibe: 'Ngân vang thanh tịnh',
      desc: 'Hài âm đồng đa tầng số 216Hz - 432Hz giúp làm chậm nhịp tim và đưa sóng não về trạng thái thiền.',
      tag: 'AN TỊNH',
      color: 'border-amber-500/60 bg-amber-950/20 text-amber-300',
    },
    {
      id: 'zen',
      name: 'Chuông Gió Zen',
      vibe: 'Trong trẻo êm ái',
      desc: 'Giai điệu chuông gió ngũ cung nhẹ nhàng nhắc nhở đã đến lúc khép lại mọi bài vở công việc.',
      tag: 'THƯ THÁI',
      color: 'border-teal-500/60 bg-teal-950/20 text-teal-300',
    },
    {
      id: 'digital',
      name: 'Chuông Bíp Kỹ Thuật Số',
      vibe: 'Điện tử kinh điển',
      desc: 'Nhịp bíp đôi dứt khoát 1400Hz của đồng hồ số chuẩn xác, báo hiệu mốc giờ đã chạm.',
      tag: 'CHUẨN XÁC',
      color: 'border-cyan-500/60 bg-cyan-950/20 text-cyan-300',
    },
    {
      id: 'temple',
      name: 'Đại Hồng Chung Cổ Kính',
      vibe: 'Trầm hùng tĩnh mịch',
      desc: 'Tiếng chuông chùa vang xa ngân dài buông bỏ mọi tạp niệm lo toan ban ngày.',
      tag: 'SÂU THẲM',
      color: 'border-purple-500/60 bg-purple-950/20 text-purple-300',
    },
  ];

  const handleTestSound = (type: AlarmType) => {
    if (testingSound === type) {
      soundEngine.stopAlarm();
      setTestingSound(null);
    } else {
      soundEngine.playAlarm(type, alarmVolume);
      setTestingSound(type);
    }
  };

  const handleStartQuickTimer = (mins: number) => {
    setQuickTimerMin(mins);
    alert(`⏳ Đã đặt hẹn giờ: Màn hình sẽ tự động khóa cứng sau ${mins} phút!`);
    setTimeout(() => {
      onTriggerInstantLock(`Đã hết thời gian hẹn giờ làm việc ${mins} phút! Hãy đi ngủ ngay.`);
    }, mins * 60 * 1000);
  };

  return (
    <div className="space-y-6 animate-fade-rise">
      {/* 1. Header Hero Panel */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950/70 via-purple-950/70 to-indigo-950/70 border-2 border-rose-500/30 p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 liquid-glass">
        <div className="space-y-2 text-center sm:text-left z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono">
            🛡️ Enforced Lockout & Audio Chimes
          </span>
          <h1
            className="text-2xl sm:text-3xl font-black text-white"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Hệ Thống Khóa Màn Hình & Chuông Báo Giờ Ngủ
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
            Thiết lập phong tỏa toàn diện màn hình khi đến giờ ngủ, kích hoạt còi cảnh báo cưỡng chế hoặc chuông chuông ngân an tịnh buộc bạn phải buông máy lên giường.
          </p>
        </div>

        {/* Instant Lock Big Button */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => onTriggerInstantLock('Khóa màn hình theo lệnh chủ động của người dùng')}
            className="px-6 py-4 rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-sm sm:text-base shadow-2xl btn-bouncy flex items-center gap-3 border border-white/20 cursor-pointer"
          >
            <Lock className="w-5 h-5 animate-pulse" />
            <span>Khóa Màn Hình Ngay Bây Giờ</span>
          </button>
          <span className="text-[10px] text-rose-300/80 font-mono">
            Phong tỏa toàn màn hình ngay lập tức
          </span>
        </div>
      </div>

      {/* 2. Main Grid: Lock Control & Alarm Bells */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Lock Modes & Quick Timers (7 cols) */}
        <div className="lg:col-span-7 bg-[#0b1124]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 liquid-glass">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Cơ Chế Khóa Cưỡng Chế & Điều Kiện Mở Khóa</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Lockout Protocol</span>
          </div>

          {/* Quick Timers Bar */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase block">
              1. Hẹn Giờ Khóa Nhanh (Quick Countdown):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 15, 30, 45].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleStartQuickTimer(mins)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition btn-bouncy cursor-pointer flex flex-col items-center ${
                    quickTimerMin === mins
                      ? 'border-pink-500 bg-pink-950/50 text-pink-300'
                      : 'border-slate-800 bg-[#060914] text-slate-300 hover:border-pink-500/50'
                  }`}
                >
                  <span>{mins} Phút</span>
                  <span className="text-[9px] text-slate-500 font-normal">Tự khóa</span>
                </button>
              ))}
            </div>
          </div>

          {/* Choose Unlock Method */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-slate-300 uppercase block">
              2. Chọn Nhiệm Vụ Bắt Buộc Để Được Mở Khóa (Unlock Mission):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                {
                  id: 'math',
                  name: 'Nhiệm Vụ Toán Học',
                  desc: 'Giải đúng 1 bài toán cộng trừ để kích hoạt vỏ não tỉnh táo nhận biết hành vi.',
                  icon: '📐',
                },
                {
                  id: 'pledge',
                  name: 'Chép Lời Cam Kết Kỷ Luật',
                  desc: 'Gõ chính xác lời hứa tắt máy đi ngủ để khắc sâu nhận thức kỷ luật bản thân.',
                  icon: '✍️',
                },
                {
                  id: 'breath',
                  name: 'Hoàn Thành Chu Kỳ Thở 4-7-8',
                  desc: 'Buộc hoàn thành 1 nhịp thở sâu sinh học để hạ nhịp tim trước khi tắt màn hình.',
                  icon: '🫧',
                },
                {
                  id: 'emergency',
                  name: 'Mở Khẩn Cấp Kèm Lý Do',
                  desc: 'Yêu cầu nhập lý do thực sự quan trọng và bị trừ 5 điểm kỷ luật vào hệ thống.',
                  icon: '🚨',
                },
              ].map((m) => {
                const isSelected = selectedUnlockMethod === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedUnlockMethod(m.id as UnlockMethod)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                      isSelected
                        ? 'border-pink-500/80 bg-pink-950/30 shadow-md shadow-pink-500/10'
                        : 'border-slate-800 bg-[#060914] hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span>{m.icon}</span>
                        <span>{m.name}</span>
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-pink-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guidelines Box */}
          <div className="p-4 rounded-2xl bg-[#060914] border border-slate-800 text-xs space-y-1.5 text-slate-300">
            <div className="flex items-center gap-2 font-bold text-pink-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lời Khuyên Sinh Học:</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Màn hình khóa không sinh ra để gây khó chịu, mà là rào cản nhận thức (cognitive friction) giúp bạn cắt đứt trạng thái lướt máy vô thức (doomscrolling) vào đêm khuya.
            </p>
          </div>
        </div>

        {/* Right Column: Alarm Bells & Scheduler (5 cols) */}
        <div className="lg:col-span-5 bg-[#0b1124]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 liquid-glass">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span>Chuông Báo & Âm Lượng</span>
            </h3>
            <span className="text-[11px] font-mono text-cyan-400 font-bold">Audio Engine</span>
          </div>

          {/* Volume Controller */}
          <div className="p-3.5 bg-[#060914] rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> Âm Lượng Chuông Báo:
              </span>
              <span className="font-mono text-cyan-300 font-bold">
                {Math.round(alarmVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={alarmVolume}
              onChange={(e) => {
                const vol = parseFloat(e.target.value);
                setAlarmVolume(vol);
                soundEngine.setVolume(vol);
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* 5 Alarm Soundcards with Preview Button */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-300 uppercase block">
              Chọn & Nghe Thử 5 Loại Chuông Báo:
            </label>
            <div className="space-y-2">
              {alarmOptions.map((opt) => {
                const isSelected = chosenAlarmSound === opt.id;
                const isPlayingThis = testingSound === opt.id;

                return (
                  <div
                    key={opt.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? opt.color
                        : 'border-slate-800 bg-[#060914] text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => setChosenAlarmSound(opt.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{opt.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-white/10">
                          {opt.tag}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{opt.desc}</p>
                    </div>

                    <button
                      onClick={() => handleTestSound(opt.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition btn-bouncy cursor-pointer flex items-center gap-1 shrink-0 ${
                        isPlayingThis
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                      title={isPlayingThis ? 'Dừng chuông thử' : 'Phát thử âm thanh này'}
                    >
                      {isPlayingThis ? (
                        <>
                          <Square className="w-3 h-3 fill-white" /> Dừng
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-white" /> Thử
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scheduled Alarms: Bedtime & Morning */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase block">
              Đặt Mốc Nhắc Giờ Ngủ & Giờ Dậy:
            </span>

            {/* Bedtime Alarm */}
            <div className="p-3 bg-[#060914] rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-200 block">Chuông Báo Đi Ngủ:</span>
                <span className="text-[10px] text-slate-400">Nhắc nhở tắt máy và dọn giường</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={bedtimeAlarmTime}
                  onChange={(e) => setBedtimeAlarmTime(e.target.value)}
                  className="bg-[#0b1124] border border-slate-700 text-pink-300 font-mono font-bold text-xs rounded-lg px-2 py-1 outline-none"
                />
                <input
                  type="checkbox"
                  checked={isBedtimeAlarmEnabled}
                  onChange={(e) => setIsBedtimeAlarmEnabled(e.target.checked)}
                  className="w-4 h-4 accent-pink-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Wake Up Alarm */}
            <div className="p-3 bg-[#060914] rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-200 block">Chuông Báo Thức Sáng Mai:</span>
                <span className="text-[10px] text-slate-400">Đánh thức theo chu kỳ đã tính</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={wakeAlarmTime}
                  onChange={(e) => setWakeAlarmTime(e.target.value)}
                  className="bg-[#0b1124] border border-slate-700 text-cyan-300 font-mono font-bold text-xs rounded-lg px-2 py-1 outline-none"
                />
                <input
                  type="checkbox"
                  checked={isWakeAlarmEnabled}
                  onChange={(e) => setIsWakeAlarmEnabled(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
