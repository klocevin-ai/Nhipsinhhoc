import { useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface StudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWaitlist: () => void;
}

export function StudioModal({ isOpen, onClose, onOpenWaitlist }: StudioModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<number>(0);

  if (!isOpen) return null;

  const products = [
    {
      title: 'Horizon OS',
      subtitle: 'Bức Họa Không Gian Độc Thoại',
      tag: 'Không Gian Tác Nghiệp',
      desc: 'Môi trường số thống nhất xoay quanh sự đơn nhiệm và sự khoáng đạt nhận thức. Xóa bỏ hoàn toàn tình trạng đa cửa sổ phân mảnh bằng chiều sâu không gian, âm thanh định vị và không một thông báo quấy rầy.',
      specs: ['Mã hóa cục bộ trên máy', 'Không thông báo quấy rầy', 'Thang màu thích ứng nhịp sinh học', 'Độ trễ tương tác < 4ms'],
      quote: '“Cảm giác không giống như dùng một hệ điều hành thông thường, mà như bước vào xưởng kiến trúc lúc bình minh.”',
    },
    {
      title: 'Monolith Note',
      subtitle: 'Chữ Viết & Tư Duy Thuần Khiết',
      tag: 'Trình Soạn Thảo Tĩnh Lặng',
      desc: 'Bỏ qua mọi thanh công cụ rườm rà. Monolith đối đãi với từng con chữ như mực thấm trên trang giấy hoa tiên, mang lại vẻ tao nhã phụng sự nhịp đập tự nhiên của tư duy con người.',
      specs: ['Chuẩn Markdown nguyên bản', 'Không thu thập dữ liệu đám mây', 'Liên kết mạng lưới hai chiều', 'Xuất bản LaTeX & PDF tinh xảo'],
      quote: '“Nơi các bản thảo thành hình mà không vương chút lo âu hay phân tâm nào.”',
    },
    {
      title: 'Arc Chronometer',
      subtitle: 'Nghi Thức Tập Trung Sinh Học',
      tag: 'Kiến Trúc Thời Gian',
      desc: 'Khác với các ứng dụng đồng hồ tính điểm gây căng thẳng, Arc định vị làn sóng năng lượng mỗi ngày và đồng bộ phiên tập trung sâu theo nhịp sinh học tự nhiên Ultradian 90 phút.',
      specs: ['Khối 90 phút Ultradian tự nhiên', 'Âm thanh phản hồi hài âm', 'Đồng bộ nhịp thở sinh học', 'Đồng hồ toán học ngoại tuyến'],
      quote: '“Thời gian không còn là áp lực hạn chót mà trở thành cánh đồng thênh thang rộng mở.”',
    },
    {
      title: 'Starlight Reader',
      subtitle: 'Thánh Đường Cho Con Chữ Đọc Sâu',
      tag: 'Trình Đọc Tĩnh Tâm',
      desc: 'Trình đọc sách và tiểu luận tinh tế cho các tác phẩm triết học, trước tác học thuật. Ứng dụng phông chữ có chân quang học với độ tương phản hạt mịn êm dịu cho đôi mắt.',
      specs: ['Hỗ trợ EPUB & Markdown', 'Kerning quang học tinh xảo', 'Chuyển màu hoàng hôn tự động', 'Xuất trích dẫn tức thì'],
      quote: '“Trải nghiệm phần mềm tiệm cận nhất với giấy thô và một tách trà ấm.”',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-rise">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl liquid-glass-modal p-6 sm:p-10 border border-white/15 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-baseline gap-3">
            <h2
              className="text-3xl sm:text-4xl tracking-tight text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Studio Sáng Tạo
            </h2>
            <span className="text-xs uppercase tracking-widest text-[hsl(240,4%,66%)] font-mono">
              Khí Cụ Kỹ Thuật Số Thủ Công
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

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
          {/* Product selector list */}
          <div className="md:col-span-5 space-y-2.5">
            <div className="text-xs uppercase tracking-widest text-[hsl(240,4%,66%)] mb-3">
              Tuyển Tập Công Cụ
            </div>
            {products.map((p, idx) => {
              const isSelected = selectedProduct === idx;
              return (
                <div
                  key={p.title}
                  onClick={() => setSelectedProduct(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-white/50 bg-white/15 shadow-md'
                      : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300">
                      {p.tag}
                    </span>
                    <span className="text-[11px] text-[hsl(240,4%,66%)]">0{idx + 1}</span>
                  </div>
                  <h3
                    className="text-xl text-white mt-1"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-xs text-[hsl(240,4%,66%)] mt-0.5">{p.subtitle}</p>
                </div>
              );
            })}
          </div>

          {/* Active Product Detailed View */}
          <div className="md:col-span-7 p-6 rounded-2xl liquid-glass border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{products[selectedProduct].tag}</span>
              </div>

              <h2
                className="text-3xl sm:text-4xl text-white mt-2"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {products[selectedProduct].title}
              </h2>

              <p className="text-sm text-[hsl(240,4%,66%)] mt-3 leading-relaxed">
                {products[selectedProduct].desc}
              </p>

              {/* Specs pill badges */}
              <div className="mt-6">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-2.5 font-medium">
                  Nguyên Lý Thiết Kế
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {products[selectedProduct].specs.map((spec) => (
                    <div
                      key={spec}
                      className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="mt-6 p-4 rounded-xl bg-white/5 border-l-2 border-white/50 text-xs italic text-[hsl(240,4%,66%)]">
                {products[selectedProduct].quote}
              </div>
            </div>

            {/* CTA inside modal */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[hsl(240,4%,66%)]">Giai Đoạn Thử Nghiệm Riêng Tư</span>
              <button
                onClick={() => {
                  onClose();
                  onOpenWaitlist();
                }}
                className="liquid-glass rounded-full px-5 py-2.5 text-xs text-white font-medium hover:scale-[1.03] transition flex items-center gap-2 cursor-pointer"
              >
                Nhận Lời Mời Truy Cập <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
