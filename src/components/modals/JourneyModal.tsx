import { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Download, Copy, Check, Sparkles, Feather, Clock, Waves } from 'lucide-react';
import { soundEngine } from '../../lib/soundEngine';

interface JourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSoundMode: 'serenity' | 'ocean' | 'rain' | 'theta';
  setActiveSoundMode: (mode: 'serenity' | 'ocean' | 'rain' | 'theta') => void;
}

export function JourneyModal({ isOpen, onClose, activeSoundMode, setActiveSoundMode }: JourneyModalProps) {
  const [activeTab, setActiveTab] = useState<'timer' | 'journal' | 'sound'>('timer');

  // Timer states
  const [timerDuration, setTimerDuration] = useState(25 * 60); // 25 min default
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [intention, setIntention] = useState('Chế tác điều gì đó thuần khiết và trường tồn');

  // Soundscape
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Thought notes
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem('velorah_journey_note_vi') ||
      'Tại nơi chốn tĩnh lặng này, mọi luồng suy nghĩ tìm về trật tự nguyên bản.\n\nNhững ý tưởng từng hỗn loạn nay tự kết tinh thành những khối hình học mạch lạc và thanh khiết.';
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  // Persist notes
  const handleNoteChange = (text: string) => {
    setNotes(text);
    localStorage.setItem('velorah_journey_note_vi', text);
  };

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadNotes = () => {
    const blob = new Blob([notes], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `velorah-suy-nghi-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetTimer = (mins: number) => {
    setIsTimerRunning(false);
    setTimerDuration(mins * 60);
    setTimeLeft(mins * 60);
  };

  const toggleModalSound = () => {
    if (isAudioActive) {
      soundEngine.stop();
      setIsAudioActive(false);
    } else {
      soundEngine.play(activeSoundMode);
      setIsAudioActive(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

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
              Thánh Đường Tĩnh Lặng
            </h2>
            <span className="text-xs uppercase tracking-widest text-[hsl(240,4%,66%)] font-mono">
              Miền Đất Cho Tâm Trí Thảnh Thơi
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

        {/* Tab switchers */}
        <div className="flex items-center gap-2 mt-6 p-1 rounded-2xl bg-white/5 border border-white/10 max-w-md">
          <button
            onClick={() => setActiveTab('timer')}
            className={`flex-1 py-2 text-xs font-medium rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'timer'
                ? 'bg-white/20 text-white shadow-sm'
                : 'text-[hsl(240,4%,66%)] hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Tập Trung Sâu
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`flex-1 py-2 text-xs font-medium rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'journal'
                ? 'bg-white/20 text-white shadow-sm'
                : 'text-[hsl(240,4%,66%)] hover:text-white'
            }`}
          >
            <Feather className="w-3.5 h-3.5" />
            Vườn Ý Niệm
          </button>
          <button
            onClick={() => setActiveTab('sound')}
            className={`flex-1 py-2 text-xs font-medium rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'sound'
                ? 'bg-white/20 text-white shadow-sm'
                : 'text-[hsl(240,4%,66%)] hover:text-white'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            Âm Sắc Không Gian
          </button>
        </div>

        {/* Tab 1: Deep Focus Timer */}
        {activeTab === 'timer' && (
          <div className="mt-8 flex flex-col items-center text-center space-y-6">
            <div className="w-full max-w-md">
              <input
                type="text"
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                placeholder="Nhập mục tiêu trọng tâm duy nhất của bạn..."
                className="w-full text-center bg-transparent border-b border-white/20 py-2 text-base sm:text-lg text-white placeholder-white/40 focus:outline-none focus:border-white transition"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              />
            </div>

            {/* Circular focus display */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-white/15 flex flex-col items-center justify-center liquid-glass shadow-2xl">
              <div
                className={`absolute inset-0 rounded-full border-2 border-white/20 transition-all duration-1000 ${
                  isTimerRunning ? 'scale-105 opacity-80 animate-pulse' : 'scale-100 opacity-40'
                }`}
              />

              <div
                className="text-6xl sm:text-7xl font-light tracking-tight text-white font-mono"
              >
                {formatTime(timeLeft)}
              </div>

              <div className="text-xs uppercase tracking-widest text-[hsl(240,4%,66%)] mt-2">
                {isTimerRunning ? 'Dòng Chảy Đang Hoạt Động' : 'Đang Chờ Khởi Động'}
              </div>
            </div>

            {/* Timer controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="liquid-glass rounded-full px-8 py-3.5 text-sm text-white font-medium hover:scale-[1.03] transition flex items-center gap-2 cursor-pointer shadow-lg"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-4 h-4" /> Tạm Dừng
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Bắt Đầu Tập Trung
                  </>
                )}
              </button>

              <button
                onClick={() => resetTimer(timerDuration / 60)}
                className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
                title="Khởi tạo lại phiên"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={toggleModalSound}
                className={`p-3.5 rounded-full transition cursor-pointer ${
                  isAudioActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                }`}
                title="Bật/Tắt tần số âm thanh nền"
              >
                {isAudioActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-2 text-xs pt-2">
              <span className="text-[hsl(240,4%,66%)]">Mốc thời gian:</span>
              {[
                { label: '15p Khởi Động', mins: 15 },
                { label: '25p Dòng Chảy', mins: 25 },
                { label: '50p Tập Trung Sâu', mins: 50 },
                { label: '90p Trác Tuyệt', mins: 90 },
              ].map((preset) => (
                <button
                  key={preset.mins}
                  onClick={() => resetTimer(preset.mins)}
                  className={`px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                    timerDuration === preset.mins * 60
                      ? 'border-white/50 bg-white/15 text-white'
                      : 'border-white/10 text-[hsl(240,4%,66%)] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Thought Canvas */}
        {activeTab === 'journal' && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-[hsl(240,4%,66%)]">
              <span>Ghi chép thuần khiết không xao nhãng. Lưu trữ riêng tư trên thiết bị của bạn.</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyNotes}
                  className="flex items-center gap-1 hover:text-white transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>
                <button
                  onClick={handleDownloadNotes}
                  className="flex items-center gap-1 hover:text-white transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải tệp .md</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl liquid-glass border border-white/10">
              <textarea
                value={notes}
                onChange={(e) => handleNoteChange(e.target.value)}
                rows={10}
                className="w-full bg-transparent text-white/90 text-base leading-relaxed placeholder-white/30 focus:outline-none resize-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
                placeholder="Hãy để những dòng suy tưởng tuôn trào tự nhiên không phán xét..."
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[hsl(240,4%,66%)] pt-1">
              <span>{notes.trim().split(/\s+/).filter(Boolean).length} từ</span>
              <span>Đã tự động lưu trên máy</span>
            </div>
          </div>
        )}

        {/* Tab 3: Sound of Silence */}
        {activeTab === 'sound' && (
          <div className="mt-6 space-y-6">
            <p className="text-sm text-[hsl(240,4%,66%)] leading-relaxed">
              Tổng hợp thuật toán sóng âm thanh trực tiếp. Không vòng lặp tẻ nhạt, không đoạn đứt quãng—chỉ có sự tĩnh lặng thuần khiết.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: 'serenity',
                  title: 'Sóng 432 Hz Pythagorean',
                  desc: 'Tần số gốc điều hòa theo tỷ lệ hài âm tự nhiên. Làm dịu nhịp tim và giảm tải căng thẳng thị giác.',
                },
                {
                  id: 'theta',
                  title: 'Xung Não Theta 6 Hz',
                  desc: 'Xung hai tai đưa não bộ vào trạng thái hoàng hôn của trực giác sáng tạo bất ngờ và thư giãn sâu.',
                },
                {
                  id: 'ocean',
                  title: 'Thủy Triều Biển Vũ Trụ',
                  desc: 'Nhịp sóng 7 giây mô phỏng dòng hải lưu đại dương vỗ về những vách đá hoa cương lạnh lẽo.',
                },
                {
                  id: 'rain',
                  title: 'Mưa Rơi Mái Đá',
                  desc: 'Âm hưởng mưa rào êm dịu che chở, triệt tiêu tiếng ồn đột ngột xao nhãng của phố thị bên ngoài.',
                },
              ].map((snd) => {
                const isSelected = activeSoundMode === snd.id;
                return (
                  <div
                    key={snd.id}
                    onClick={() => {
                      setActiveSoundMode(snd.id as 'serenity' | 'ocean' | 'rain' | 'theta');
                      soundEngine.play(snd.id as 'serenity' | 'ocean' | 'rain' | 'theta');
                      setIsAudioActive(true);
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-white/50 bg-white/15 shadow-lg'
                        : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4
                        className="text-lg text-white font-medium"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {snd.title}
                      </h4>
                      {isSelected && isAudioActive && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[hsl(240,4%,66%)] leading-relaxed">{snd.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl liquid-glass border border-white/10">
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span className="text-xs text-white">Thuật toán xử lý thuần phía trình duyệt (0 theo dõi, 0 độ trễ)</span>
              </div>
              <button
                onClick={toggleModalSound}
                className="liquid-glass rounded-full px-5 py-2 text-xs text-white hover:scale-[1.03] transition cursor-pointer"
              >
                {isAudioActive ? 'Dừng Âm Thanh' : 'Phát Tần Số Đã Chọn'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
