import { X, Compass, Feather, Shield } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBeginJourney: () => void;
}

export function AboutModal({ isOpen, onClose, onBeginJourney }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-rise">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl liquid-glass-modal p-6 sm:p-10 border border-white/15 text-white shadow-2xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-baseline gap-3">
            <h2
              className="text-3xl sm:text-4xl tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Tuyên Ngôn Velorah
            </h2>
            <span className="text-xs uppercase tracking-widest text-[hsl(240,4%,66%)] font-mono">
              Cuộc Nổi Dậy Trong Tĩnh Lặng
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lead Quote */}
        <div className="p-6 rounded-2xl liquid-glass border border-white/10 text-center space-y-3">
          <blockquote
            className="text-2xl sm:text-3xl font-normal leading-snug text-white"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            “Tiếng ồn luôn rẻ mạt. Tĩnh lặng là sự xa xỉ không thể tái tạo duy nhất của tâm trí con người hiện đại.”
          </blockquote>
          <p className="text-xs uppercase tracking-widest text-[hsl(240,4%,66%)] font-mono">
            — Quỹ Velorah, 2026
          </p>
        </div>

        {/* Narrative */}
        <div className="space-y-4 text-sm text-[hsl(240,4%,66%)] leading-relaxed">
          <p>
            Chúng ta đang sống trong một thế giới thu lợi từ sự phân mảnh tâm trí của chính mình. Mọi ứng dụng đều tranh giành từng giây võng mạc bằng những chấm đỏ thông báo, vòng quay dopamine và dòng tin gây hoảng loạn. Phần mềm từng được xem là chiếc xe đạp cho trí óc; thay vào đó, nó đã trở thành những biển hiệu đèn neon nhấp nháy ngay trong không gian riêng tư.
          </p>
          <p>
            Velorah là lời tuyên bố đối trọng. Chúng tôi là tập thể độc lập gồm các nhà thiết kế kiểu chữ, nghệ sĩ thị giác và kỹ sư hệ thống làm việc giữa Kyoto, Zürich và vùng Tây Bắc Thái Bình Dương.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Compass className="w-4 h-4 text-cyan-300" />
            </div>
            <h3
              className="text-lg text-white font-medium"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Tinh Giản Tuyệt Đối
            </h3>
            <p className="text-xs text-[hsl(240,4%,66%)] leading-relaxed">
              Mọi tính năng đều phải chứng minh lý do xứng đáng tồn tại. Nếu nó tạo ra xao nhãng hoặc kích thích gây nghiện, chúng tôi sẽ triệt tiêu.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Feather className="w-4 h-4 text-pink-300" />
            </div>
            <h3
              className="text-lg text-white font-medium"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Nghệ Thuật Chữ Xúc Cảm
            </h3>
            <p className="text-xs text-[hsl(240,4%,66%)] leading-relaxed">
              Giao diện số hoàn toàn có thể đem lại sự an tĩnh như vườn sỏi thiền định, chất liệu giấy mộc và tiếng mưa rơi trên ô kính tối màu.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Shield className="w-4 h-4 text-emerald-300" />
            </div>
            <h3
              className="text-lg text-white font-medium"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Chủ Quyền Tâm Trí
            </h3>
            <p className="text-xs text-[hsl(240,4%,66%)] leading-relaxed">
              Không theo dõi hành vi. Không thuật toán giam giữ thời gian. Không bán dữ liệu. Nhận thức và tư duy của bạn là vùng thánh địa bất khả xâm phạm.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-[hsl(240,4%,66%)]">
            Kiến tạo cho những ai làm việc trong những khoảng lặng sâu thẳm.
          </div>
          <button
            onClick={() => {
              onClose();
              onBeginJourney();
            }}
            className="liquid-glass rounded-full px-6 py-2.5 text-xs text-white hover:scale-[1.03] transition cursor-pointer"
          >
            Bước Vào Thánh Đường
          </button>
        </div>
      </div>
    </div>
  );
}
