interface PostureModalProps {
  isOpen: boolean;
  angle: number;
  onDismiss: () => void;
}

export function PostureModal({ isOpen, angle, onDismiss }: PostureModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-rise">
      <div className="bg-[#0b1124] border-2 border-amber-500 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl liquid-glass">
        <div className="text-5xl animate-pulse">😾🛏️</div>
        <div className="space-y-1">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full font-bold">
            CẢM BIẾN TƯ THẾ
          </span>
          <h3
            className="text-xl font-black text-white"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Bạn Đang Nằm Bấm Máy!
          </h3>
          <p className="text-xs text-slate-300">
            Góc nghiêng (<strong className="text-amber-400 font-mono">{angle}°</strong>) cho thấy bạn đang nằm rọi thẳng màn hình vào mắt. Hãy đặt máy lên bàn học ngay!
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-2xl shadow-lg btn-bouncy cursor-pointer"
        >
          🐾 Đặt Máy Lên Bàn Ngay (+2 Kỷ Luật)
        </button>
      </div>
    </div>
  );
}
