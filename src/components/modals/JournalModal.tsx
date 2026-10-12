import { useState } from 'react';
import { X, Clock, ArrowLeft } from 'lucide-react';

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JournalModal({ isOpen, onClose }: JournalModalProps) {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  if (!isOpen) return null;

  const articles = [
    {
      title: 'Kiến Trúc Của Tĩnh Lặng: Vì Sao Phần Mềm Hiện Đại Đang Khiến Chúng Ta Kiệt Sức',
      date: 'Mùa Thu 2026',
      readTime: '6 phút đọc',
      author: 'Evelyn Vane, Kiến Trúc Sư Trưởng',
      excerpt: 'Khi từng điểm ảnh trên màn hình đều gào thét đòi hỏi sự chú ý với bong bóng đỏ và cửa sổ bật lên, tư duy sâu sắc trở thành điều bất khả thi. Đây là lý do phần mềm thế hệ mới cần học lại kỷ luật của sự tĩnh lặng.',
      content: [
        'Hãy nhìn vào màn hình của bạn ngay lúc này. Hãy đếm xem có bao nhiêu yếu tố thị giác đang đòi hỏi phán quyết của bạn: thông báo đỏ chờ đợi, con số tin nhắn chưa đọc mà bạn chưa từng yêu cầu, thanh công cụ nhấp nháy gợi ý các thao tác bạn chưa hề có ý định thực hiện.',
        'Bộ nhớ làm việc (working memory) của con người chỉ có thể xử lý đồng thời từ bốn đến bảy đối tượng. Trong thời kỳ tiền kỹ thuật số, một người nghệ nhân đứng trước khúc gỗ mộc chỉ với một chiếc cưa và một chiếc đục. Khúc gỗ không đưa ra bất kỳ gợi ý nào. Nó không rung chuông. Nó hoàn toàn đón nhận ý niệm của bàn tay con người.',
        'Khi sáng lập Velorah, nguyên tắc thiết kế đầu tiên của chúng tôi là sự tinh giản triệt để: phần mềm không bao giờ được phép lên tiếng trừ khi được con người chạm đến. Một công cụ chân chính phải nằm yên lặng trong tay người thợ. Trong sự tĩnh lặng đó, tâm trí con người mới tự nhiên kết tinh những tư tưởng sâu sắc nhất.',
      ],
    },
    {
      title: 'Ca Ngợi Khoảng Trống: Mỹ Học Ma (間) Của Nhật Bản Trong Thiết Kế Kỹ Thuật Số',
      date: 'Mùa Hè 2026',
      readTime: '5 phút đọc',
      author: 'Kenji Sato, Giám Đốc Thiết Kế',
      excerpt: 'Khoảng trống không phải là sự trống rỗng. Đó là nhịp thở giữa hai nốt nhạc tạo nên giai điệu linh hồn. Những suy tưởng về khoảng không nhận thức trong không gian làm việc hiệu suất cao.',
      content: [
        'Trong kiến trúc truyền thống Nhật Bản, Ma (間) không mô tả sự hư vô, mà là khả năng hiện hữu. Đó là khoảng cách giữa các cột trụ, sự im lặng giữa hai hồi chuông chùa, là lề trắng bao quanh nét mực tàu trên giấy washi.',
        'Thiết kế phần mềm phương Tây từ lâu đã mắc phải chứng sợ khoảng trống (horror vacui). Nếu có 300 điểm ảnh chưa dùng trên màn hình, các nhà quản lý sản phẩm sẽ ngay lập tức nhồi nhét vào đó bảng thống kê, luồng tin gợi ý hay hướng dẫn sử dụng.',
        'Tại Velorah, chúng tôi coi những điểm ảnh trống là thánh địa. Một khoảng lề rộng rãi không phải là diện tích màn hình bị lãng phí; đó là không gian để thị giác được nghỉ ngơi, là mảnh đất cho những phát kiến tiếp theo được hít thở và nảy mầm.',
      ],
    },
    {
      title: 'Vì Sao Chúng Tôi Xây Dựng Trên Nền Sắc Xanh Thẳm Của Đại Dương Đêm',
      date: 'Mùa Xuân 2026',
      readTime: '4 phút đọc',
      author: 'Alain Mercier, Nhà Nghiên Cứu Quang Sắc',
      excerpt: 'Chế độ tối đích thực không phải là màu đen kịt AMOLED #000000. Đó là độ sâu của làn nước đại dương vào thời khắc chạng vạng.',
      content: [
        'Màu đen tuyệt đối (#000000) tạo ra hiện tượng xé rách võng mạc gay gắt khi đặt cạnh phông chữ trắng sáng (#FFFFFF). Độ tương phản quá cực đoan dẫn đến hiện tượng quầng mờ (halation), khiến các nét chữ như bị rung nhòe và nhức mắt trong bóng tối.',
        'Thay vào đó, giao diện của Velorah tồn tại ở dải sắc 201° hue, 100% bão hòa và 13% độ sáng—chính xác là quang độ của đại dương ở độ sâu sáu mươi mét khi ánh hoàng hôn vừa nhường chỗ cho màn đêm.',
        'Ở dải quang phổ này, các tế bào que và nón thị giác chuyển nhẹ nhàng sang nhịp điệu alpha êm dịu. Màn hình không còn như một bóng đèn rọi thẳng vào mắt, mà tựa như một gian phòng tĩnh mịch đón nhận ánh trăng dịu êm.',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-rise">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl liquid-glass-modal p-6 sm:p-10 border border-white/15 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-baseline gap-3">
            {selectedArticle !== null ? (
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-1.5 text-xs text-[hsl(240,4%,66%)] hover:text-white transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Quay lại Tạp Bút
              </button>
            ) : (
              <>
                <h2
                  className="text-3xl sm:text-4xl tracking-tight text-white"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Tạp Bút & Suy Tưởng
                </h2>
                <span className="text-xs uppercase tracking-widest text-[hsl(240,4%,66%)] font-mono">
                  Cô Độc & Phần Mềm
                </span>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article list view */}
        {selectedArticle === null ? (
          <div className="mt-8 space-y-4">
            {articles.map((item, idx) => (
              <div
                key={item.title}
                onClick={() => setSelectedArticle(idx)}
                className="p-6 rounded-2xl liquid-glass border border-white/10 hover:border-white/30 transition-all cursor-pointer group space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-[hsl(240,4%,66%)] font-mono">
                  <span>{item.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.readTime}
                  </span>
                </div>

                <h3
                  className="text-2xl text-white group-hover:text-cyan-200 transition-colors"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[hsl(240,4%,66%)] leading-relaxed">
                  {item.excerpt}
                </p>

                <div className="pt-2 text-xs text-white/80 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Đọc Tiểu Luận →
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Single Article Reader View */
          <div className="mt-6 space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3 text-xs text-[hsl(240,4%,66%)] font-mono">
                <span>{articles[selectedArticle].date}</span>
                <span>•</span>
                <span>{articles[selectedArticle].readTime}</span>
              </div>

              <h1
                className="text-3xl sm:text-4xl text-white leading-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {articles[selectedArticle].title}
              </h1>

              <div className="text-xs text-[hsl(240,4%,66%)] italic">
                Tác giả: {articles[selectedArticle].author}
              </div>
            </div>

            <div className="space-y-4 text-base text-white/90 leading-relaxed font-light">
              {articles[selectedArticle].content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[hsl(240,4%,66%)]">
              <button
                onClick={() => setSelectedArticle(null)}
                className="hover:text-white transition cursor-pointer"
              >
                ← Trở về danh sách bài viết
              </button>
              <span>Velorah Journal © 2026</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
