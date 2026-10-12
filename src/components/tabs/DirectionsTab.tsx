import { useState, useEffect } from 'react';

interface DirectionsTabProps {
  onPlanSaved: () => void;
}

export function DirectionsTab({ onPlanSaved }: DirectionsTabProps) {
  const [goal1, setGoal1] = useState('');
  const [goal2, setGoal2] = useState('');
  const [goal3, setGoal3] = useState('');
  const [savedTime, setSavedTime] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('bp_directions_plan');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setGoal1(data.goal1 !== 'Chưa thiết lập' ? data.goal1 : '');
        setGoal2(data.goal2 !== 'Chưa thiết lập' ? data.goal2 : '');
        setGoal3(data.goal3 !== 'Chưa thiết lập' ? data.goal3 : '');
        setSavedTime(data.date || null);
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSave = () => {
    if (!goal1.trim() && !goal2.trim() && !goal3.trim()) {
      alert('Hãy điền ít nhất 1 mục tiêu ưu tiên cho sáng mai nhé!');
      return;
    }

    const directionsData = {
      goal1: goal1.trim() || 'Chưa thiết lập',
      goal2: goal2.trim() || 'Chưa thiết lập',
      goal3: goal3.trim() || 'Chưa thiết lập',
      date: new Date().toLocaleDateString('vi-VN'),
    };

    localStorage.setItem('bp_directions_plan', JSON.stringify(directionsData));
    setSavedTime(directionsData.date);
    onPlanSaved();
    alert('🎯 Đã chốt phương hướng ngày mai! Tâm trí đã có kim chỉ nam rõ ràng. Hãy gập máy đi ngủ ngon!');
  };

  return (
    <div className="bg-[#0b1124]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 liquid-glass animate-fade-rise">
      <div className="border-b border-slate-800 pb-4">
        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-[11px] rounded-full font-bold uppercase tracking-wider font-mono">
          Strategic Action Plan & Core Objectives
        </span>
        <h2
          className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <span>🧭</span> Phương Hướng Kỷ Luật & Kế Hoạch Ngày Mới
        </h2>
        <p className="text-xs text-slate-400">
          Định hình tư duy, thiết lập 3 mũi nhọn ưu tiên để thức dậy tràn đầy động lực thay vì uể oải.
        </p>
      </div>

      {/* 3 Golden Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-[#060914] rounded-2xl border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold font-mono">
            01
          </div>
          <strong className="text-slate-200 block text-sm">Quy Tắc Buổi Sáng Sớm (Eat That Frog)</strong>
          <p className="text-slate-400 leading-relaxed">
            Giải quyết việc khó nhất, đòi hỏi tư duy logic cao nhất ngay trong 2 tiếng đầu tiên sau khi thức dậy. Không kiểm tra mạng xã hội khi vừa mở mắt.
          </p>
        </div>

        <div className="p-4 bg-[#060914] rounded-2xl border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold font-mono">
            02
          </div>
          <strong className="text-slate-200 block text-sm">Giới Hạn Năng Lượng Nhận Thức</strong>
          <p className="text-slate-400 leading-relaxed">
            Mỗi ngày não chỉ có khoảng 4-5 tiếng tập trung sâu (Deep Work). Đừng dồn bài vở vào ban đêm vì hiệu suất não lúc đó chỉ còn dưới 30%.
          </p>
        </div>

        <div className="p-4 bg-[#060914] rounded-2xl border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-sm font-bold font-mono">
            03
          </div>
          <strong className="text-slate-200 block text-sm">Chặn Đứng Trì Hoãn Lúc 21:00</strong>
          <p className="text-slate-400 leading-relaxed">
            Thiết lập ranh giới cứng: Sau 21:30 không nhận thêm bài tập mới hay công việc phát sinh. Mọi tồn đọng dời vào danh sách sáng mai.
          </p>
        </div>
      </div>

      {/* Action items form */}
      <div className="p-6 bg-[#060914] rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <i className="fa-solid fa-bullseye" /> 3 Mục Tiêu Đột Phá Ngày Mai (Action Items)
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">
            {savedTime ? `Đã chốt ngày ${savedTime}` : 'Ưu tiên theo ma trận Eisenhower'}
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 font-mono font-bold text-[11px] shrink-0">
              ƯU TIÊN 1
            </span>
            <input
              type="text"
              value={goal1}
              onChange={(e) => setGoal1(e.target.value)}
              placeholder="Việc quan trọng nhất định phải xong trước 10:00 sáng mai..."
              className="flex-1 bg-[#0b1124] border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 font-mono font-bold text-[11px] shrink-0">
              ƯU TIÊN 2
            </span>
            <input
              type="text"
              value={goal2}
              onChange={(e) => setGoal2(e.target.value)}
              placeholder="Bài tập / Nhiệm vụ cần hoàn thành vào buổi chiều..."
              className="flex-1 bg-[#0b1124] border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-mono font-bold text-[11px] shrink-0">
              ƯU TIÊN 3
            </span>
            <input
              type="text"
              value={goal3}
              onChange={(e) => setGoal3(e.target.value)}
              placeholder="Thói quen tích cực (đọc sách 15p, tập thể dục nhẹ, uống đủ nước)..."
              className="flex-1 bg-[#0b1124] border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-gradient-to-r from-amber-600 via-pink-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg transition btn-bouncy flex items-center justify-center gap-2 cursor-pointer"
        >
          <i className="fa-solid fa-flag-checkered" /> Xác Nhận Phương Hướng & Khóa Kế Hoạch (+3 Điểm Kỷ Luật)
        </button>
      </div>
    </div>
  );
}
