import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Maximize, Minimize, Sliders, Waves, Sparkles } from 'lucide-react';
import { soundEngine } from '../lib/soundEngine';

interface CinematicControlsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  showGrain: boolean;
  setShowGrain: (val: boolean | ((prev: boolean) => boolean)) => void;
  showVignette: boolean;
  setShowVignette: (val: boolean | ((prev: boolean) => boolean)) => void;
  aspect239: boolean;
  setAspect239: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeSoundMode: 'serenity' | 'ocean' | 'rain' | 'theta';
  setActiveSoundMode: (mode: 'serenity' | 'ocean' | 'rain' | 'theta') => void;
}

export function CinematicControls({
  videoRef,
  showGrain,
  setShowGrain,
  showVignette,
  setShowVignette,
  aspect239,
  setAspect239,
  activeSoundMode,
  setActiveSoundMode,
}: CinematicControlsProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.35);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlayingVideo(true);
    } else {
      videoRef.current.pause();
      setIsPlayingVideo(false);
    }
  };

  const toggleSound = () => {
    if (isSoundPlaying) {
      soundEngine.stop();
      setIsSoundPlaying(false);
    } else {
      soundEngine.play(activeSoundMode);
      soundEngine.setVolume(soundVolume);
      setIsSoundPlaying(true);
    }
  };

  const handleModeChange = (mode: 'serenity' | 'ocean' | 'rain' | 'theta') => {
    setActiveSoundMode(mode);
    if (isSoundPlaying) {
      soundEngine.play(mode);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setSoundVolume(vol);
    soundEngine.setVolume(vol);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <aside aria-label="Bảng Điều Khiển Điện Ảnh" className="fixed bottom-6 right-6 z-30 flex items-center gap-2 select-none">
      {/* Settings popup panel */}
      {showSettings && (
        <div className="absolute bottom-14 right-0 w-72 p-4 rounded-2xl liquid-glass-modal animate-fade-rise border border-white/10 shadow-2xl space-y-3.5">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs uppercase tracking-wider text-[hsl(240,4%,66%)] font-semibold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              Không Khí Điện Ảnh
            </span>
            <span className="text-[10px] text-white/60 font-mono">24 FPS</span>
          </div>

          {/* Soundscapes */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-[hsl(240,4%,66%)] font-medium flex items-center gap-1">
              <Waves className="w-3 h-3 text-cyan-400" /> Âm Sắc Không Gian:
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                { id: 'serenity', label: 'Sóng 432Hz' },
                { id: 'ocean', label: 'Thủy Triều Biển' },
                { id: 'rain', label: 'Mưa Mái Đá' },
                { id: 'theta', label: 'Xung Não Theta' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleModeChange(m.id as 'serenity' | 'ocean' | 'rain' | 'theta')}
                  className={`px-2.5 py-1.5 rounded-lg text-left transition text-[11px] cursor-pointer ${
                    activeSoundMode === m.id
                      ? 'bg-white/20 text-white font-medium border border-white/30'
                      : 'bg-white/5 text-[hsl(240,4%,66%)] hover:text-white hover:bg-white/10'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Volume slider */}
            <div className="pt-1.5 flex items-center gap-2 text-xs">
              <span className="text-[10px] text-white/50">Âm Lượng</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={soundVolume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <span className="text-[10px] font-mono text-white/70 w-7 text-right">
                {Math.round(soundVolume * 100)}%
              </span>
            </div>
          </div>

          {/* Visual Polish Toggles */}
          <div className="space-y-2 pt-1 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/80 text-[11px]">Hạt Phim Điện Ảnh</span>
              <button
                onClick={() => setShowGrain((prev) => !prev)}
                className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
                  showGrain ? 'bg-white' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full transition-transform ${
                    showGrain ? 'translate-x-4 bg-black' : 'translate-x-0 bg-white/80'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-white/80 text-[11px]">Viền Tối Chiều Sâu</span>
              <button
                onClick={() => setShowVignette((prev) => !prev)}
                className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
                  showVignette ? 'bg-white' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full transition-transform ${
                    showVignette ? 'translate-x-4 bg-black' : 'translate-x-0 bg-white/80'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-white/80 text-[11px]">Khung Hình Cinema 2.39:1</span>
              <button
                onClick={() => setAspect239((prev) => !prev)}
                className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
                  aspect239 ? 'bg-white' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full transition-transform ${
                    aspect239 ? 'translate-x-4 bg-black' : 'translate-x-0 bg-white/80'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Glass Floating Pill */}
      <div className="liquid-glass rounded-full px-3.5 py-2 flex items-center gap-2.5 text-white/80 shadow-2xl border border-white/10">
        {/* Play/Pause Video */}
        <button
          onClick={toggleVideo}
          className="p-1 rounded-full hover:text-white transition cursor-pointer"
          title={isPlayingVideo ? 'Tạm dừng video' : 'Phát tiếp video'}
          aria-label={isPlayingVideo ? 'Tạm dừng video' : 'Phát tiếp video'}
        >
          {isPlayingVideo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <span className="h-3 w-[1px] bg-white/20" />

        {/* Ambient Soundscape Toggle */}
        <button
          onClick={toggleSound}
          className={`p-1 rounded-full transition cursor-pointer flex items-center gap-1 ${
            isSoundPlaying ? 'text-cyan-300' : 'hover:text-white'
          }`}
          title={isSoundPlaying ? 'Tắt âm thanh không gian' : 'Bật âm thanh không gian'}
          aria-label={isSoundPlaying ? 'Tắt âm thanh không gian' : 'Bật âm thanh không gian'}
        >
          {isSoundPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[10px] font-mono tracking-tight text-cyan-300 hidden sm:inline">
                Âm Nền
              </span>
            </>
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </button>

        <span className="h-3 w-[1px] bg-white/20" />

        {/* Cinematic settings button */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`p-1 rounded-full transition cursor-pointer ${
            showSettings ? 'text-white bg-white/20' : 'hover:text-white'
          }`}
          title="Tùy chỉnh không khí & âm thanh"
          aria-label="Tùy chỉnh không khí và âm thanh"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </button>

        <span className="h-3 w-[1px] bg-white/20" />

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-1 rounded-full hover:text-white transition cursor-pointer"
          title={isFullscreen ? 'Thoát toàn màn hình' : 'Mở toàn màn hình'}
          aria-label={isFullscreen ? 'Thoát toàn màn hình' : 'Mở toàn màn hình'}
        >
          {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
        </button>
      </div>
    </aside>
  );
}
