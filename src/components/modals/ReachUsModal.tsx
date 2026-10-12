import { useState } from 'react';
import { X, Send, CheckCircle2, Shield, Mail, MapPin, Copy, Check } from 'lucide-react';

interface ReachUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReachUsModal({ isOpen, onClose }: ReachUsModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    craft: 'Người Tư Duy Sâu & Sáng Tạo Độc Lập',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    const randomId = `VLR-${Math.floor(1000 + Math.random() * 9000)}-${formData.name.slice(0, 3).toUpperCase()}`;
    setTicketId(randomId);
    setSubmitted(true);

    // Save to localStorage
    const savedInquiries = JSON.parse(localStorage.getItem('velorah_inquiries_vi') || '[]');
    savedInquiries.push({
      ...formData,
      ticketId: randomId,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('velorah_inquiries_vi', JSON.stringify(savedInquiries));
  };

  const copyToken = () => {
    navigator.clipboard.writeText(ticketId);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-rise">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl liquid-glass-modal p-6 sm:p-10 border border-white/15 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-baseline gap-3">
            <h2
              className="text-3xl sm:text-4xl tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Liên Hệ & Đăng Ký
            </h2>
            <span className="text-xs uppercase tracking-widest text-[hsl(240,4%,66%)] font-mono">
              Hội Thoại Studio Riêng Tư
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

        {submitted ? (
          /* Submission success state */
          <div className="py-10 text-center space-y-6 animate-fade-rise">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3
                className="text-3xl text-white font-normal"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Chào Mừng Đến Vòng Tròn Tĩnh Lặng
              </h3>
              <p className="text-xs sm:text-sm text-[hsl(240,4%,66%)] max-w-md mx-auto leading-relaxed">
                Cảm ơn bạn, <strong className="text-white">{formData.name}</strong>. Yêu cầu nhận lời mời trải nghiệm của bạn đã được lưu trữ an toàn trong danh bạ mã hóa của chúng tôi.
              </p>
            </div>

            {/* Token Badge */}
            <div className="p-4 rounded-2xl liquid-glass border border-white/20 max-w-xs mx-auto flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[hsl(240,4%,66%)] block">
                  Mã Lời Mời Riêng
                </span>
                <span className="text-base font-mono font-bold text-white tracking-widest">
                  {ticketId}
                </span>
              </div>
              <button
                onClick={copyToken}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                title="Sao chép mã"
              >
                {copiedToken ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="liquid-glass rounded-full px-8 py-3 text-xs text-white hover:scale-[1.03] transition cursor-pointer"
            >
              Trở Về Không Gian Chính
            </button>
          </div>
        ) : (
          /* Form state */
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <p className="text-xs sm:text-sm text-[hsl(240,4%,66%)] leading-relaxed">
              Chúng tôi không gửi bản tin quảng cáo hàng loạt. Chúng tôi đọc và phản hồi thủ công từng bức thư từ các nhà sáng tạo, nghệ nhân và học giả.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-[hsl(240,4%,66%)] uppercase font-mono tracking-wider">
                  Họ Và Tên *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Nguyễn An Nhiên"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[hsl(240,4%,66%)] uppercase font-mono tracking-wider">
                  Email Trực Tiếp *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tenban@domain.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[hsl(240,4%,66%)] uppercase font-mono tracking-wider">
                Lĩnh Vực Sáng Tạo Chính
              </label>
              <select
                value={formData.craft}
                onChange={(e) => setFormData({ ...formData, craft: e.target.value })}
                className="w-full bg-[#071826] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition cursor-pointer"
              >
                <option value="Người Tư Duy Sâu & Sáng Tạo Độc Lập">Người Tư Duy Sâu & Sáng Tạo Độc Lập</option>
                <option value="Kiến Trúc Sư & Thiết Kế Không Gian">Kiến Trúc Sư & Thiết Kế Không Gian</option>
                <option value="Nhà Văn, Nhà Thơ & Tác Giả Tiểu Luận">Nhà Văn, Nhà Thơ & Tác Giả Tiểu Luận</option>
                <option value="Nghệ Nhân Phần Mềm Độc Lập">Nghệ Nhân Phần Mềm Độc Lập</option>
                <option value="Học Giả Khoa Học & Triết Học">Học Giả Khoa Học & Triết Học</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[hsl(240,4%,66%)] uppercase font-mono tracking-wider">
                Tâm trí bạn đang tìm kiếm không gian như thế nào? (Không bắt buộc)
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Chia sẻ về đam mê sáng tạo, trăn trở về môi trường làm việc hay suy nghĩ của bạn..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/50 transition resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[hsl(240,4%,66%)]">
                <Shield className="w-3.5 h-3.5 text-cyan-300" />
                <span>Cam kết 100% không thư rác. Phản hồi xử lý thủ công.</span>
              </div>

              <button
                type="submit"
                className="liquid-glass rounded-full px-8 py-3 text-xs text-white font-medium hover:scale-[1.03] transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-3.5 h-3.5" /> Gửi Thư Đăng Ký
              </button>
            </div>
          </form>
        )}

        {/* Studio coordinates footer */}
        <div className="mt-8 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[hsl(240,4%,66%)] font-mono">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-white/50" />
            <span>Kyoto • Xưởng Phía Bắc</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-white/50" />
            <span>Zürich • Atelier Limmat</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-white/50" />
            <span>studio@velorah.io</span>
          </div>
        </div>
      </div>
    </div>
  );
}
