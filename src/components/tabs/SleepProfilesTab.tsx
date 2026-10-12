import { useState } from 'react';

export type ProfileKey = 'cap1' | 'cap2' | 'cap3' | 'adult';

interface SleepProfilesTabProps {
  currentProfileKey: ProfileKey;
  onSelectProfile: (key: ProfileKey) => void;
  wakeTargetTime: string;
  setWakeTargetTime: (val: string) => void;
}

export const PROFILES_DATA = {
  cap1: {
    name: "Bé Cấp 1 (Tiểu Học 6 - 11 Tuổi)",
    curfew: "20:30",
    cards: [
      { icon: "🧸", title: "Nhu Cầu Ngủ", val: "9.5 - 11 Tiếng", desc: "Hormone GH tiết đỉnh cao để phát triển chiều cao" },
      { icon: "🚫", title: "Tắt Màn Hình", val: "Trước 20:00", desc: "Cách ly TV và iPad khỏi phòng ngủ" },
      { icon: "🛏️", title: "Giờ Lên Giường", val: "20:30 - 20:45", desc: "Không thức làm bài khuya" },
      { icon: "🌟", title: "Chu Kỳ Tối Ưu", val: "6.5 Chu Kỳ", desc: "Sáng mai dậy tỉnh táo đến trường" }
    ],
    timeline: [
      { time: "19:45", title: "Đóng sách vở", desc: "Soạn cặp sẵn sàng cho buổi học ngày mai" },
      { time: "20:00", title: "Cắt thiết bị", desc: "Tắt mọi màn hình TV/Điện thoại" },
      { time: "20:15", title: "Vệ sinh cá nhân", desc: "Rửa mặt, đánh răng, thay đồ ngủ rộng rãi" },
      { time: "20:30", title: "Lên giường ấm", desc: "Nghe đọc truyện và chìm vào giấc ngủ" }
    ],
    wakeDefault: "06:30"
  },
  cap2: {
    name: "Học Sinh Cấp 2 (THCS 11 - 15 Tuổi)",
    curfew: "21:45",
    cards: [
      { icon: "📚", title: "Nhu Cầu Ngủ", val: "8.5 - 9.5 Tiếng", desc: "Tái tạo nơ-ron và cảm xúc tuổi dậy thì" },
      { icon: "🚫", title: "Tắt Mạng Xã Hội", val: "Trước 21:15", desc: "Cắt đứt dopamine lướt video ngắn" },
      { icon: "🛏️", title: "Giờ Lên Giường", val: "21:30 - 22:00", desc: "Tránh thức làm bài dồn" },
      { icon: "🌟", title: "Chu Kỳ Tối Ưu", val: "5.5 - 6 Chu Kỳ", desc: "Duy trì khả năng tập trung tiết 1-2" }
    ],
    timeline: [
      { time: "21:00", title: "Dừng học căng thẳng", desc: "Không cố giải đề khó sát giờ ngủ" },
      { time: "21:15", title: "Sạc máy xa giường", desc: "Cắm sạc trên bàn học cách giường 2m" },
      { time: "21:30", title: "Hạ nhiệt não", desc: "Viết 2 việc sáng mai cần làm ra giấy" },
      { time: "21:45", title: "Chốt giấc ngủ", desc: "Bật bài thở 4-7-8 dỗ giấc ngủ sâu" }
    ],
    wakeDefault: "06:00"
  },
  cap3: {
    name: "Học Sinh Cấp 3 (THPT 15 - 18 Tuổi)",
    curfew: "23:00",
    cards: [
      { icon: "🎓", title: "Nhu Cầu Ngủ", val: "7.5 - 8.5 Tiếng", desc: "Bảo vệ trí nhớ dài hạn phục vụ thi cử" },
      { icon: "🚫", title: "Giới Nghiêm Thiết Bị", val: "22:30", desc: "Chốt chặn ánh sáng xanh triệt để" },
      { icon: "🛏️", title: "Chốt Đi Ngủ", val: "22:45 - 23:00", desc: "Bảo vệ hệ thống Glymphatic rửa não" },
      { icon: "🌟", title: "Chu Kỳ Tối Ưu", val: "5 Chu Kỳ Chuẩn", desc: "Tương đương 7.5 giờ phục hồi trí lực" }
    ],
    timeline: [
      { time: "22:15", title: "Đóng bài học tư duy", desc: "Thu gọn bàn học để giải phóng thị giác" },
      { time: "22:30", title: "Giãn cơ cổ vai gáy", desc: "Uống ngụm nước ấm, tắt đèn trần bật đèn vàng" },
      { time: "22:45", title: "Xả lo âu bài thi", desc: "Ghi nhật ký đêm, buông điện thoại hoàn toàn" },
      { time: "23:00", title: "Giới nghiêm chốt", desc: "Bật sóng não Delta và ngủ sâu" }
    ],
    wakeDefault: "06:00"
  },
  adult: {
    name: "Người Đi Làm / Đi Làm Ca Kíp",
    curfew: "23:30",
    cards: [
      { icon: "💼", title: "Nhu Cầu Ngủ", val: "7.0 - 8.0 Tiếng", desc: "Phục hồi căng thẳng và ổn định huyết áp" },
      { icon: "🚫", title: "Tắt Tin Nhắn Công Việc", val: "Sau 21:30", desc: "Chặn thông báo Zalo / Slack / Email công ty" },
      { icon: "🛏️", title: "Giờ Lên Giường", val: "23:00 - 23:30", desc: "Chống mất ngủ kinh niên & kiệt sức (Burnout)" },
      { icon: "🌟", title: "Chu Kỳ Tối Ưu", val: "5 Chu Kỳ Chuẩn", desc: "Tương đương 7.5 giờ sạc đầy năng lượng" }
    ],
    timeline: [
      { time: "21:30", title: "Ngắt kết nối công việc", desc: "Không mở laptop xử lý task đột xuất" },
      { time: "22:15", title: "Tắm nước ấm thư giãn", desc: "Hạ thân nhiệt trung tâm giúp kích thích buồn ngủ" },
      { time: "22:45", title: "Cắt màn hình điện thoại", desc: "Đọc sách giấy hoặc nghe âm thanh sóng não" },
      { time: "23:30", title: "Giới nghiêm tuyệt đối", desc: "Gập máy đi ngủ để nạp lại năng lượng ngày mới" }
    ],
    wakeDefault: "06:30"
  }
};

export function SleepProfilesTab({
  currentProfileKey,
  onSelectProfile,
  wakeTargetTime,
  setWakeTargetTime,
}: SleepProfilesTabProps) {
  const data = PROFILES_DATA[currentProfileKey];

  // Calculate 90-min sleep cycles backward from target wake time (+ 15 min falling asleep latency)
  const calculateCycles = () => {
    const [wH, wM] = (wakeTargetTime || '06:00').split(':').map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(wH, wM, 0, 0);

    return [
      { count: 6, h: 9.0, tag: "Nạp đầy 100% năng lượng", rec: false },
      { count: 5, h: 7.5, tag: "Khuyến nghị chuẩn sinh học", rec: true },
      { count: 4, h: 6.0, tag: "Mức tối thiểu khi bận rộn", rec: false },
    ].map((item) => {
      const totalMins = item.count * 90 + 15;
      const sleepDate = new Date(wakeDate.getTime() - totalMins * 60000);
      const h = String(sleepDate.getHours()).padStart(2, '0');
      const m = String(sleepDate.getMinutes()).padStart(2, '0');
      return { ...item, timeStr: `${h}:${m}` };
    });
  };

  const cycles = calculateCycles();

  return (
    <div className="bg-[#0b1124]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 liquid-glass animate-fade-rise">
      {/* Header and profile selectors */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2
            className="text-xl sm:text-2xl font-black text-white flex items-center gap-2"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span>⏱️</span> Quản Lý Thời Gian & Giấc Ngủ 4 Nhóm Đối Tượng
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Khung giờ sinh học chuẩn hóa cho từng độ tuổi và khối lượng bài vở
          </p>
        </div>

        {/* 4 Profile pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#060914] p-1.5 rounded-2xl border border-slate-800">
          {(['cap1', 'cap2', 'cap3', 'adult'] as ProfileKey[]).map((k) => {
            const labels = {
              cap1: 'Cấp 1',
              cap2: 'Cấp 2',
              cap3: 'Cấp 3',
              adult: 'Người Đi Làm',
            };
            const isSelected = currentProfileKey === k;
            return (
              <button
                key={k}
                onClick={() => onSelectProfile(k)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition btn-bouncy cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {labels[k]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.cards.map((c) => (
          <div
            key={c.title}
            className="p-4 bg-[#060914] rounded-2xl border border-slate-800 space-y-1 text-center sm:text-left"
          >
            <div className="text-2xl">{c.icon}</div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">{c.title}</span>
            <div className="text-base font-bold text-pink-300 font-mono">{c.val}</div>
            <span className="text-[10px] text-slate-500 block leading-tight">{c.desc}</span>
          </div>
        ))}
      </div>

      {/* Timeline Steps */}
      <div className="p-6 bg-[#060914] rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
            <i className="fa-solid fa-timeline" /> Lộ Trình Tối Ưu Năng Lượng & Giới Nghiêm Thiết Bị
          </h3>
          <span className="text-[11px] font-mono text-pink-400 font-bold">
            Giới nghiêm: {data.curfew}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {data.timeline.map((t, idx) => (
            <div key={t.time} className="p-3 bg-[#0b1124] rounded-2xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-pink-400 font-mono font-bold">{t.time}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold font-mono">
                  BƯỚC {idx + 1}
                </span>
              </div>
              <strong className="text-slate-200 block text-xs">{t.title}</strong>
              <p className="text-[11px] text-slate-400 leading-snug">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sleep cycle calculator */}
      <div className="p-5 bg-[#060914] rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <label className="text-xs font-bold text-slate-200 block">⏰ Giờ Cần Dậy Vào Sáng Mai:</label>
            <span className="text-[11px] text-slate-500">
              Hệ thống tính lùi chu kỳ 90 phút + 15 phút dỗ giấc ngủ tự nhiên:
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="time"
              value={wakeTargetTime}
              onChange={(e) => setWakeTargetTime(e.target.value)}
              className="bg-[#0b1124] border border-slate-700 text-pink-300 font-mono font-bold text-lg rounded-2xl px-4 py-2 outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {/* Result grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {cycles.map((item) => (
            <div
              key={item.count}
              className={`p-4 rounded-2xl text-center space-y-1 ${
                item.rec
                  ? 'border-2 border-pink-500 bg-pink-950/20 shadow-lg'
                  : 'border border-slate-800 bg-[#0b1124]'
              }`}
            >
              <span className="text-[11px] font-mono font-bold text-slate-400">
                {item.count} Chu kỳ ({item.h}h)
              </span>
              <div className="text-3xl font-black font-mono text-pink-300">{item.timeStr}</div>
              <span className="text-[10px] text-slate-400 block">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
