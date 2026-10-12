import { useState, useEffect } from 'react';
import { soundEngine } from '../../lib/soundEngine';

export function BinauralBeatsTab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<'delta' | 'theta' | 'pink' | 'serenity'>('delta');

  useEffect(() => {
    setIsPlaying(soundEngine.getIsPlaying());
  }, []);

  const handleToggle = () => {
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      soundEngine.play(selectedPreset);
      setIsPlaying(true);
    }
  };

  const handleSelectPreset = (preset: 'delta' | 'theta' | 'pink' | 'serenity') => {
    setSelectedPreset(preset);
    if (isPlaying) {
      soundEngine.play(preset);
    }
  };

  return (
    <div className="bg-[#0b1124]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 max-w-4xl mx-auto liquid-glass animate-fade-rise">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-[11px] rounded-full font-bold uppercase tracking-wider font-mono">
            Neurological Soundscape Engine
          </span>
          <h2
            className="text-xl sm:text-2xl font-black text-white mt-1"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Phòng Thu Sóng Não Trị Liệu
          </h2>
          <p className="text-xs text-slate-400">
            Tự tổng hợp âm thanh hai tai trực tiếp qua Web Audio API đưa sóng não về pha ngủ sâu.
          </p>
        </div>
        <button
          onClick={handleToggle}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs rounded-2xl shadow-lg btn-bouncy cursor-pointer flex items-center justify-center gap-1.5"
        >
          <i className={`fa-solid ${isPlaying ? 'fa-stop' : 'fa-play'}`} />
          {isPlaying ? 'Dừng Âm Thanh' : 'Bật Âm Thanh'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Preset Delta */}
        <div
          onClick={() => handleSelectPreset('delta')}
          className={`p-5 rounded-2xl cursor-pointer transition space-y-1.5 ${
            selectedPreset === 'delta'
              ? 'border-2 border-pink-500 bg-pink-950/30 shadow-lg'
              : 'border border-slate-800 bg-[#060914] hover:border-pink-500/40'
          }`}
        >
          <div className="flex justify-between items-center">
            <strong className="text-sm text-pink-300">Sóng Delta (2.5 Hz)</strong>
            <span className="text-[9px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded font-mono font-bold">
              Ngủ Sâu
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Kích hoạt tái tạo mô và xả độc tố amyloid-beta qua dịch não tủy trong giấc ngủ sâu NREM.
          </p>
        </div>

        {/* Preset Theta */}
        <div
          onClick={() => handleSelectPreset('theta')}
          className={`p-5 rounded-2xl cursor-pointer transition space-y-1.5 ${
            selectedPreset === 'theta'
              ? 'border-2 border-purple-500 bg-purple-950/30 shadow-lg'
              : 'border border-slate-800 bg-[#060914] hover:border-purple-500/40'
          }`}
        >
          <div className="flex justify-between items-center">
            <strong className="text-sm text-purple-300">Sóng Theta (5.0 Hz)</strong>
            <span className="text-[9px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono font-bold">
              Mơ Màng
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Chuyển tiếp từ trạng thái căng thẳng học tập ban ngày sang trạng thái mơ màng thư giãn.
          </p>
        </div>

        {/* Preset Pink Noise */}
        <div
          onClick={() => handleSelectPreset('pink')}
          className={`p-5 rounded-2xl cursor-pointer transition space-y-1.5 ${
            selectedPreset === 'pink'
              ? 'border-2 border-teal-500 bg-teal-950/30 shadow-lg'
              : 'border border-slate-800 bg-[#060914] hover:border-teal-500/40'
          }`}
        >
          <div className="flex justify-between items-center">
            <strong className="text-sm text-teal-300">Tiếng Ồn Hồng</strong>
            <span className="text-[9px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-mono font-bold">
              Lọc Ồn
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Cân bằng dải âm lượng nền, triệt tiêu tiếng xe cộ rền rĩ và tiếng quạt gió giật cục.
          </p>
        </div>
      </div>

      <div className="p-4 bg-[#060914] rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
        <span className="text-slate-400 flex items-center">
          <i className="fa-solid fa-headphones text-cyan-400 mr-2" />
          <strong>Lưu ý:</strong> Hãy đeo tai nghe để hiệu ứng lệch tần số hai tai phát huy tác dụng tốt nhất.
        </span>
        <span
          className={`font-mono font-bold text-xs ${
            isPlaying ? 'text-pink-300 animate-pulse' : 'text-slate-500'
          }`}
        >
          {isPlaying ? `Đang phát: ${selectedPreset.toUpperCase()}` : 'Đang tắt'}
        </span>
      </div>
    </div>
  );
}
