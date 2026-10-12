import { useState, useEffect } from 'react';

interface JournalEntry {
  id: number;
  date: string;
  time: string;
  mood: string;
  content: string;
}

interface JournalTabProps {
  onJournalSaved: () => void;
}

export function JournalTab({ onJournalSaved }: JournalTabProps) {
  const [mood, setMood] = useState('');
  const [content, setContent] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const todayStr = new Date().toLocaleDateString('vi-VN');

  const loadEntries = () => {
    const list = JSON.parse(localStorage.getItem('bp_journal_list') || '[]');
    setEntries(list);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleSave = () => {
    if (!content.trim()) {
      alert('Hãy viết vài dòng tâm sự trước khi lưu nhé!');
      return;
    }

    const entry: JournalEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('vi-VN'),
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      mood: mood.trim() || 'Bình thường',
      content: content.trim(),
    };

    const currentList: JournalEntry[] = JSON.parse(localStorage.getItem('bp_journal_list') || '[]');
    currentList.unshift(entry);
    if (currentList.length > 20) currentList.pop();

    localStorage.setItem('bp_journal_list', JSON.stringify(currentList));
    setEntries(currentList);
    setMood('');
    setContent('');
    onJournalSaved();
    alert('💌 Đã lưu bài nhật ký vào bộ nhớ máy! Hãy buông máy đi ngủ thôi.');
  };

  const handleClear = () => {
    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử nhật ký đã lưu không?')) {
      localStorage.removeItem('bp_journal_list');
      setEntries([]);
    }
  };

  return (
    <div className="bg-[#0b1124]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 liquid-glass animate-fade-rise">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 bg-pink-500/20 text-pink-300 text-[11px] rounded-full font-bold uppercase tracking-wider font-mono">
            Cognitive Brain Dump & Archives
          </span>
          <h2
            className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span>📖</span> Nhật Ký Xả Lo Âu & Lịch Sử Đêm
          </h2>
          <p className="text-xs text-slate-400">
            Viết ra mọi áp lực để vỏ não không phải xử lý lặp đi lặp lại trong giấc ngủ.
          </p>
        </div>
        <span className="text-xs text-pink-400 font-mono bg-[#060914] px-3 py-1.5 rounded-xl border border-slate-800">
          {todayStr}
        </span>
      </div>

      {/* Editor card */}
      <div className="p-6 bg-[#060914] rounded-3xl border border-slate-800 space-y-4">
        <span className="text-xs font-bold text-pink-300 uppercase block">1. Viết Cho Đêm Nay:</span>
        <div className="space-y-3">
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Tâm trạng hôm nay (ví dụ: hơi mệt vì bài nhiều, vui vì giải được đề khó)..."
            className="w-full bg-[#0b1124] border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-pink-500 outline-none"
          />
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Viết tất cả những điều bạn còn trăn trở, bận tâm hoặc biết ơn hôm nay..."
            className="w-full bg-[#0b1124] border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-pink-500 outline-none resize-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg transition btn-bouncy flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-floppy-disk" /> Lưu Nhật Ký & Gập Máy (+3 Kỷ Luật)
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-3 bg-[#111833] hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800 text-xs rounded-xl transition btn-bouncy cursor-pointer"
            title="Xóa lịch sử"
          >
            <i className="fa-solid fa-trash-can" />
          </button>
        </div>
      </div>

      {/* History list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <i className="fa-solid fa-clock-rotate-left text-cyan-400" /> Lịch Sử Nhật Ký Gần Đây (Lưu trên máy)
          </span>
          <span className="text-[11px] text-slate-500 font-mono">{entries.length} bài ghi</span>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar">
          {entries.length === 0 ? (
            <div className="p-4 bg-[#060914] rounded-2xl border border-slate-800 text-center text-slate-500 text-xs">
              Chưa có bài nhật ký nào được lưu.
            </div>
          ) : (
            entries.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#060914] rounded-2xl border border-slate-800 space-y-1.5 text-xs"
              >
                <div className="flex justify-between items-center">
                  <span className="text-pink-400 font-bold font-mono">
                    {item.date} ({item.time})
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
                    {item.mood}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{item.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
