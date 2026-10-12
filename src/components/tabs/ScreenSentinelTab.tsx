import { NightMascot } from '../NightMascot';

interface ScreenSentinelTabProps {
  openedAt: string;
  liveCounter: string;
  remainingCounter: string;
  limitPercent: number;
  screenLimitMinutes: number;
  onSetLimit: (mins: number) => void;
  onManualEndSession: () => void;
  autoLockOnLimit: boolean;
  setAutoLockOnLimit: (val: boolean) => void;
  autoLockOnCurfew: boolean;
  setAutoLockOnCurfew: (val: boolean) => void;
  curfewTime: string;
  setCurfewTime: (val: string) => void;
  nightShift: number;
  setNightShift: (val: number) => void;
  onRequestMotion: () => void;
  onTriggerTestLock: () => void;
  onPetCat: () => void;
  isUserActive: boolean;
}

export function ScreenSentinelTab({
  openedAt,
  liveCounter,
  remainingCounter,
  limitPercent,
  screenLimitMinutes,
  onSetLimit,
  onManualEndSession,
  autoLockOnLimit,
  setAutoLockOnLimit,
  autoLockOnCurfew,
  setAutoLockOnCurfew,
  curfewTime,
  setCurfewTime,
  nightShift,
  setNightShift,
  onRequestMotion,
  onTriggerTestLock,
  onPetCat,
  isUserActive,
}: ScreenSentinelTabProps) {
  return (
    <div className="space-y-6 animate-fade-rise">
      {/* Top Banner with Mascot */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/70 via-purple-950/60 to-pink-950/70 border-2 border-pink-500/30 p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 liquid-glass">
        <div className="space-y-2 text-center sm:text-left z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
            🐾 Auto Sentinel & Curfew Lock
          </span>
          <h1
            className="text-2xl sm:text-3xl font-black text-white"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Quản Lý Thiết Bị & Khóa Cưỡng Chế Tự Động
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
            Tự động theo dõi thời gian dán mắt, phát hiện tư thế nằm lướt máy và kích hoạt{' '}
            <strong className="text-pink-300 font-semibold">Auto Khóa Toàn Màn Hình</strong> khi hết hạn mức hoặc chạm giờ giới nghiêm ban đêm!
          </p>
        </div>

        {/* Mascot */}
        <NightMascot onPet={onPetCat} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Monitor Card */}
        <div className="lg:col-span-2 bg-[#0b1124]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 liquid-glass">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-stopwatch text-amber-400" /> Giám Sát Thời Gian Cầm Máy Đêm
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tự động tạm dừng tính giờ nếu không tương tác trong 2 phút
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${
                isUserActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-700/30 text-slate-400 border-slate-600/30'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isUserActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                }`}
              />
              {isUserActive ? 'Đang Nhìn Màn Hình' : 'Đang Treo Máy'}
            </span>
          </div>

          {/* 3 Metric cards */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 bg-[#060914] rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Mở Máy Lúc</span>
              <span className="text-lg sm:text-xl font-mono font-bold text-amber-300">{openedAt}</span>
            </div>
            <div className="p-3.5 bg-[#060914] rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Thời Gian Dán Mắt</span>
              <span className="text-lg sm:text-xl font-mono font-bold text-cyan-300">{liveCounter}</span>
            </div>
            <div className="p-3.5 bg-[#060914] rounded-2xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Hạn Mức Còn Lại</span>
              <span className="text-lg sm:text-xl font-mono font-bold text-pink-400">{remainingCounter}</span>
            </div>
          </div>

          {/* Limit progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Mức tiêu thụ hạn mức thiết bị:</span>
              <span className="text-amber-400 font-bold font-mono">{limitPercent}%</span>
            </div>
            <div className="w-full bg-[#060914] h-3 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-1000"
                style={{ width: `${limitPercent}%` }}
              />
            </div>
          </div>

          {/* Limit Buttons */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-slate-300 uppercase">
              1. Chọn Hạn Mức Dùng Máy Tối Đa Đêm Nay:
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {[15, 30, 45, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => onSetLimit(m)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition btn-bouncy cursor-pointer ${
                    screenLimitMinutes === m
                      ? 'border-pink-500/60 bg-pink-950/40 text-pink-300'
                      : 'border-slate-800 bg-[#060914] text-slate-300 hover:border-cyan-500'
                  }`}
                >
                  {m} Phút
                </button>
              ))}
            </div>
          </div>

          {/* End Session Button */}
          <button
            onClick={onManualEndSession}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:opacity-95 text-white font-bold text-xs rounded-2xl shadow-lg transition btn-bouncy flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-power-off" /> Tôi Hoàn Thành & Tắt Màn Hình Ngay (+2 Điểm Kỷ Luật)
          </button>
        </div>

        {/* Right Configuration Card */}
        <div className="bg-[#0b1124]/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between space-y-6 liquid-glass">
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <i className="fa-solid fa-lock text-rose-500" /> Cấu Hình Auto Khóa Thiết Bị
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Tự động phủ đen màn hình khi vi phạm thời gian</p>
            </div>

            {/* Lock on Limit */}
            <div className="p-3 bg-[#060914] rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-200 block">Khóa khi hết hạn mức:</span>
                <span className="text-[10px] text-slate-400">Tự khóa sau {screenLimitMinutes} phút</span>
              </div>
              <input
                type="checkbox"
                checked={autoLockOnLimit}
                onChange={(e) => setAutoLockOnLimit(e.target.checked)}
                className="w-5 h-5 accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Lock on Curfew */}
            <div className="p-3 bg-[#060914] rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">Khóa theo giờ đêm khuya:</span>
                  <span className="text-[10px] text-slate-400">Đến giờ này tự động chặn</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoLockOnCurfew}
                  onChange={(e) => setAutoLockOnCurfew(e.target.checked)}
                  className="w-5 h-5 accent-rose-500 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                <span className="text-[11px] text-pink-300 font-bold">Mốc giờ giới nghiêm:</span>
                <input
                  type="time"
                  value={curfewTime}
                  onChange={(e) => setCurfewTime(e.target.value)}
                  className="bg-[#0b1124] border border-slate-700 text-pink-300 font-mono font-bold text-xs rounded-lg px-2 py-1 outline-none focus:border-pink-500"
                />
              </div>
            </div>

            {/* Night Shift Slider */}
            <div className="p-3 bg-[#060914] rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold">Lọc Vàng Giảm Ánh Sáng Xanh:</span>
                <span className="font-mono text-pink-300 font-bold">{nightShift}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={nightShift}
                onChange={(e) => setNightShift(parseInt(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <button
              onClick={onRequestMotion}
              className="w-full py-2.5 bg-[#111833] hover:bg-slate-800 border border-slate-700 text-pink-300 text-xs font-bold rounded-xl transition btn-bouncy flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-compass" /> Bật Cảm Biến Nghiêng
            </button>
            <button
              onClick={onTriggerTestLock}
              className="w-full py-2.5 bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition shadow-lg btn-bouncy flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-lock" /> Thử Nghiệm Khóa Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
