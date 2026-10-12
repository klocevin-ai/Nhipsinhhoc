/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { VideoBackground } from './components/VideoBackground';
import { NightHUD } from './components/NightHUD';
import { CinematicControls } from './components/CinematicControls';
import { ScreenSentinelTab } from './components/tabs/ScreenSentinelTab';
import { SleepProfilesTab, ProfileKey } from './components/tabs/SleepProfilesTab';
import { DirectionsTab } from './components/tabs/DirectionsTab';
import { JournalTab } from './components/tabs/JournalTab';
import { BreathingTab } from './components/tabs/BreathingTab';
import { BinauralBeatsTab } from './components/tabs/BinauralBeatsTab';
import { LockAndAlarmTab, UnlockMethod } from './components/tabs/LockAndAlarmTab';
import { Hero } from './components/Hero';
import { HardcoreLockoutModal } from './components/modals/HardcoreLockoutModal';
import { MissionAlarmModal } from './components/modals/MissionAlarmModal';
import { PostureModal } from './components/modals/PostureModal';
import { soundEngine, AlarmType } from './lib/soundEngine';

type ActiveTab =
  | 'screen-sentinel'
  | 'lock-alarm'
  | 'sleep-calc'
  | 'directions'
  | 'journal'
  | 'breath-lab'
  | 'binaural'
  | 'hero';

export default function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Discipline score
  const [disciplineScore, setDisciplineScore] = useState<number>(() => {
    const saved = localStorage.getItem('bp_discipline_score');
    return saved ? parseInt(saved) : 100;
  });

  const updateDiscipline = (delta: number) => {
    setDisciplineScore((prev) => {
      const next = Math.max(0, Math.min(100, prev + delta));
      localStorage.setItem('bp_discipline_score', next.toString());
      return next;
    });
  };

  // Navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('screen-sentinel');

  // Screen session monitor
  const [openedAt, setOpenedAt] = useState<string>('--:--');
  const [sessionStartTime] = useState<number>(() => Date.now());
  const [liveCounter, setLiveCounter] = useState<string>('00:00:00');
  const [remainingCounter, setRemainingCounter] = useState<string>('30:00');
  const [limitPercent, setLimitPercent] = useState<number>(0);
  const [screenLimitMinutes, setScreenLimitMinutes] = useState<number>(30);
  const [isUserActive, setIsUserActive] = useState<boolean>(true);
  const lastActivityTimeRef = useRef<number>(Date.now());

  // Auto-lock configurations
  const [autoLockOnLimit, setAutoLockOnLimit] = useState<boolean>(true);
  const [autoLockOnCurfew, setAutoLockOnCurfew] = useState<boolean>(true);
  const [curfewTime, setCurfewTime] = useState<string>('23:00');
  const [nightShift, setNightShift] = useState<number>(0);

  // Lock and Alarm Tab states
  const [selectedUnlockMethod, setSelectedUnlockMethod] = useState<UnlockMethod>('math');
  const [chosenAlarmSound, setChosenAlarmSound] = useState<AlarmType>('siren');
  const [alarmVolume, setAlarmVolume] = useState<number>(0.65);
  const [bedtimeAlarmTime, setBedtimeAlarmTime] = useState<string>('22:30');
  const [isBedtimeAlarmEnabled, setIsBedtimeAlarmEnabled] = useState<boolean>(true);
  const [wakeAlarmTime, setWakeAlarmTime] = useState<string>('06:00');
  const [isWakeAlarmEnabled, setIsWakeAlarmEnabled] = useState<boolean>(true);

  // 4 Profiles state
  const [currentProfileKey, setCurrentProfileKey] = useState<ProfileKey>('cap3');
  const [wakeTargetTime, setWakeTargetTime] = useState<string>('06:00');

  // Lockout & Alarms state
  const [countdownSec, setCountdownSec] = useState<number>(30);
  const [isCountdownActive, setIsCountdownActive] = useState<boolean>(false);
  const [countdownReason, setCountdownReason] = useState<string>('');
  const [isLockedState, setIsLockedState] = useState<boolean>(false);
  const [lockoutReason, setLockoutReason] = useState<string>('');
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState<boolean>(false);
  const [isStrobeActive, setIsStrobeActive] = useState<boolean>(false);
  const [isAlarmRinging, setIsAlarmRinging] = useState<boolean>(false);

  // Posture detection state
  const [postureAngle, setPostureAngle] = useState<number>(0);
  const [isPostureModalOpen, setIsPostureModalOpen] = useState<boolean>(false);

  // Cinematic controls state
  const [showGrain, setShowGrain] = useState<boolean>(false);
  const [showVignette, setShowVignette] = useState<boolean>(false);
  const [aspect239, setAspect239] = useState<boolean>(false);
  const [activeSoundMode, setActiveSoundMode] = useState<'serenity' | 'ocean' | 'rain' | 'theta'>('serenity');

  // Initialize session time
  useEffect(() => {
    const now = new Date();
    setOpenedAt(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
  }, []);

  // Track user activity to auto-pause timer if idle > 2 minutes
  useEffect(() => {
    const handleActivity = () => {
      lastActivityTimeRef.current = Date.now();
      if (!isUserActive) setIsUserActive(true);
    };

    ['mousemove', 'keydown', 'touchstart', 'scroll'].forEach((evt) => {
      window.addEventListener(evt, handleActivity, { passive: true });
    });

    return () => {
      ['mousemove', 'keydown', 'touchstart', 'scroll'].forEach((evt) => {
        window.removeEventListener(evt, handleActivity);
      });
    };
  }, [isUserActive]);

  // Main tick interval for screen monitor, curfew check, and scheduled alarms
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLockedState) return;

      const nowMs = Date.now();
      if (nowMs - lastActivityTimeRef.current > 120000) {
        setIsUserActive(false);
        return;
      }

      const elapsedMs = nowMs - sessionStartTime;
      const totalSec = Math.floor(elapsedMs / 1000);
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      setLiveCounter(timeStr);

      const limitMs = screenLimitMinutes * 60 * 1000;
      const remainingMs = limitMs - elapsedMs;
      const percent = Math.min(100, Math.floor((elapsedMs / limitMs) * 100));
      setLimitPercent(percent);

      if (remainingMs > 0) {
        const rMin = Math.floor(remainingMs / 60000);
        const rSec = Math.floor((remainingMs % 60000) / 1000);
        setRemainingCounter(`${String(rMin).padStart(2, '0')}:${String(rSec).padStart(2, '0')}`);
      } else {
        setRemainingCounter('00:00 (Hết Hạn)');
      }

      // Check auto lock criteria
      const isLimitExceeded = remainingMs <= 0;
      const now = new Date();
      const curTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const isCurfewHit = autoLockOnCurfew && curTimeStr === curfewTime;
      const isBedtimeAlarmHit = isBedtimeAlarmEnabled && curTimeStr === bedtimeAlarmTime;

      if ((isLimitExceeded && autoLockOnLimit) || isCurfewHit || isBedtimeAlarmHit) {
        if (!isCountdownActive && !isLockedState) {
          triggerAutoLockCountdown(
            isBedtimeAlarmHit
              ? 'Đã đến giờ chuông báo đi ngủ tối nay!'
              : isCurfewHit
              ? 'Đã đến mốc giờ giới nghiêm ban đêm!'
              : 'Đã hết hạn mức sử dụng thiết bị!'
          );
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    sessionStartTime,
    screenLimitMinutes,
    autoLockOnLimit,
    autoLockOnCurfew,
    curfewTime,
    isBedtimeAlarmEnabled,
    bedtimeAlarmTime,
    isCountdownActive,
    isLockedState,
  ]);

  // Auto lock countdown logic
  const triggerAutoLockCountdown = (reason: string) => {
    setIsCountdownActive(true);
    setCountdownReason(reason);
    setCountdownSec(30);
    setIsStrobeActive(true);
    soundEngine.playAlarm(chosenAlarmSound, alarmVolume);
    setIsAlarmRinging(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isCountdownActive && countdownSec > 0) {
      timer = setInterval(() => {
        setCountdownSec((prev) => prev - 1);
      }, 1000);
    } else if (isCountdownActive && countdownSec <= 0) {
      setIsCountdownActive(false);
      triggerHardcoreLockout(countdownReason);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCountdownActive, countdownSec, countdownReason]);

  const dismissCountdownAndSleep = () => {
    setIsCountdownActive(false);
    setIsStrobeActive(false);
    soundEngine.stopAlarm();
    setIsAlarmRinging(false);
    handleManualEndSession();
  };

  const triggerHardcoreLockout = (reason: string) => {
    setIsLockedState(true);
    setLockoutReason(reason);
    setIsStrobeActive(true);
    soundEngine.playAlarm(chosenAlarmSound, alarmVolume);
    setIsAlarmRinging(true);
    updateDiscipline(-5);
  };

  const handleManualEndSession = () => {
    soundEngine.stopAlarm();
    setIsAlarmRinging(false);
    setIsStrobeActive(false);
    updateDiscipline(2);
    alert('👏 Tuyệt vời! Bạn đã chủ động tắt máy đúng giờ. Chúc bạn ngủ thật ngon!');
  };

  const handleEmergencyUnlockWithPenalty = () => {
    const reason = prompt('Nhập lý do thực sự khẩn cấp:');
    if (reason && reason.trim().length >= 8) {
      setIsLockedState(false);
      setIsStrobeActive(false);
      soundEngine.stopAlarm();
      setIsAlarmRinging(false);
      updateDiscipline(-5);
      alert('Đã mở khóa tạm thời. Hệ thống trừ 5 điểm kỷ luật. Hãy hoàn tất công việc nhanh nhé!');
    } else {
      alert('Lý do không hợp lệ. Tiếp tục khóa để bạn đi ngủ!');
    }
  };

  const handleSuccessUnlock = () => {
    setIsLockedState(false);
    setIsStrobeActive(false);
    soundEngine.stopAlarm();
    setIsAlarmRinging(false);
    alert('🎉 Mở khóa thành công! Hãy tắt máy và ngủ thật ngon nhé.');
  };

  const toggleLockScreenAlarmSound = () => {
    if (isAlarmRinging) {
      soundEngine.stopAlarm();
      setIsAlarmRinging(false);
    } else {
      soundEngine.playAlarm(chosenAlarmSound, alarmVolume);
      setIsAlarmRinging(true);
    }
  };

  // Device orientation / Gyroscope posture detection
  const requestMotionPermission = () => {
    const DeviceOrientation = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };
    if (typeof DeviceOrientation !== 'undefined' && typeof DeviceOrientation.requestPermission === 'function') {
      DeviceOrientation.requestPermission().then((state) => {
        if (state === 'granted') startGyro();
      });
    } else {
      startGyro();
    }
  };

  const startGyro = () => {
    window.addEventListener('deviceorientation', (e) => {
      const beta = Math.round(e.beta || 0);
      setPostureAngle(beta);

      const h = new Date().getHours();
      const isNight = h >= 22 || h < 5;

      if (Math.abs(beta) <= 25 && isNight) {
        if (!isPostureModalOpen && !isLockedState) {
          setIsPostureModalOpen(true);
          setIsStrobeActive(true);
          soundEngine.playAlarm('siren', alarmVolume);
        }
      }
    });
    alert('✅ Đã kích hoạt cảm biến góc nghiêng thiết bị!');
  };

  const dismissPostureAlert = () => {
    soundEngine.stopAlarm();
    setIsStrobeActive(false);
    setIsPostureModalOpen(false);
    updateDiscipline(2);
  };

  return (
    <div className="bg-[#060914] text-slate-100 min-h-screen flex flex-col justify-between selection:bg-pink-500 selection:text-white relative">
      {/* 1. Fullscreen Looping Video Background */}
      <VideoBackground
        ref={videoRef}
        showGrain={showGrain}
        showVignette={showVignette}
        aspect239={aspect239}
      />

      {/* 2. Night Shift Amber Filter Overlay */}
      <div
        className="fixed inset-0 z-40 pointer-events-none transition-colors duration-500"
        style={{
          backgroundColor: nightShift === 0 ? 'transparent' : `rgba(255, 140, 50, ${(nightShift / 100) * 0.45})`,
        }}
      />

      {/* 3. Emergency Strobe Overlay */}
      <div
        className={`fixed inset-0 z-40 emergency-strobe pointer-events-none ${
          isStrobeActive ? 'block' : 'hidden'
        }`}
      />

      {/* 4. Auto-lock Countdown Bar (30 seconds) */}
      {isCountdownActive && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-rose-600/95 text-white py-2 px-4 text-center text-xs font-bold shadow-2xl flex items-center justify-between animate-bounce">
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation" />
            <span>
              CẢNH BÁO: Thiết bị sẽ tự động khóa cứng sau:{' '}
              <strong className="font-mono text-amber-300 text-sm">{countdownSec}</strong>s
            </span>
          </span>
          <button
            onClick={dismissCountdownAndSleep}
            className="bg-[#060914] hover:bg-[#0b1124] border border-white/30 text-white px-3 py-1 rounded-xl text-[11px] btn-bouncy cursor-pointer"
          >
            Gập máy đi ngủ ngay
          </button>
        </div>
      )}

      {/* 5. Top Compact HUD */}
      <NightHUD
        disciplineScore={disciplineScore}
        sessionTimeStr={liveCounter}
        onOpenHero={() => setActiveTab('hero')}
      />

      {/* 6. Navigation Tabs */}
      <nav className="bg-[#0b1124]/80 backdrop-blur-md border-b border-slate-800/80 px-2 sm:px-4 py-2 sticky top-[53px] z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          {[
            { id: 'screen-sentinel', icon: 'fa-mobile-screen', label: 'Quản Lý Máy & Sentinel' },
            { id: 'lock-alarm', icon: 'fa-lock', label: 'Khóa Máy & Chuông Báo', iconColor: 'text-rose-400' },
            { id: 'sleep-calc', icon: 'fa-user-clock', label: 'Lịch 4 Nhóm Đối Tượng', iconColor: 'text-cyan-400' },
            { id: 'directions', icon: 'fa-compass', label: 'Phương Hướng & Mục Tiêu', iconColor: 'text-amber-400' },
            { id: 'journal', icon: 'fa-book-journal-whills', label: 'Nhật Ký & Lưu Trữ', iconColor: 'text-pink-400' },
            { id: 'breath-lab', icon: 'fa-lungs', label: 'Thở 4-7-8', iconColor: 'text-teal-400' },
            { id: 'binaural', icon: 'fa-wave-square', label: 'Sóng Não', iconColor: 'text-purple-400' },
            { id: 'hero', icon: 'fa-star', label: 'Châm Ngôn', iconColor: 'text-yellow-300' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 btn-bouncy cursor-pointer ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-pink-500 to-indigo-600 shadow-md shadow-pink-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#111833]'
                }`}
              >
                <i className={`fa-solid ${tab.icon} ${tab.iconColor || ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 7. Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-6 flex-1 w-full space-y-6 z-10">
        {activeTab === 'screen-sentinel' && (
          <ScreenSentinelTab
            openedAt={openedAt}
            liveCounter={liveCounter}
            remainingCounter={remainingCounter}
            limitPercent={limitPercent}
            screenLimitMinutes={screenLimitMinutes}
            onSetLimit={(m) => setScreenLimitMinutes(m)}
            onManualEndSession={handleManualEndSession}
            autoLockOnLimit={autoLockOnLimit}
            setAutoLockOnLimit={setAutoLockOnLimit}
            autoLockOnCurfew={autoLockOnCurfew}
            setAutoLockOnCurfew={setAutoLockOnCurfew}
            curfewTime={curfewTime}
            setCurfewTime={setCurfewTime}
            nightShift={nightShift}
            setNightShift={setNightShift}
            onRequestMotion={requestMotionPermission}
            onTriggerTestLock={() => triggerHardcoreLockout('Kích hoạt khóa thử nghiệm từ người dùng')}
            onPetCat={() => updateDiscipline(1)}
            isUserActive={isUserActive}
          />
        )}

        {activeTab === 'lock-alarm' && (
          <LockAndAlarmTab
            onTriggerInstantLock={(reason) => triggerHardcoreLockout(reason)}
            selectedUnlockMethod={selectedUnlockMethod}
            setSelectedUnlockMethod={setSelectedUnlockMethod}
            bedtimeAlarmTime={bedtimeAlarmTime}
            setBedtimeAlarmTime={setBedtimeAlarmTime}
            isBedtimeAlarmEnabled={isBedtimeAlarmEnabled}
            setIsBedtimeAlarmEnabled={setIsBedtimeAlarmEnabled}
            wakeAlarmTime={wakeAlarmTime}
            setWakeAlarmTime={setWakeAlarmTime}
            isWakeAlarmEnabled={isWakeAlarmEnabled}
            setIsWakeAlarmEnabled={setIsWakeAlarmEnabled}
            chosenAlarmSound={chosenAlarmSound}
            setChosenAlarmSound={setChosenAlarmSound}
            alarmVolume={alarmVolume}
            setAlarmVolume={setAlarmVolume}
          />
        )}

        {activeTab === 'sleep-calc' && (
          <SleepProfilesTab
            currentProfileKey={currentProfileKey}
            onSelectProfile={(k) => {
              setCurrentProfileKey(k);
            }}
            wakeTargetTime={wakeTargetTime}
            setWakeTargetTime={setWakeTargetTime}
          />
        )}

        {activeTab === 'directions' && (
          <DirectionsTab onPlanSaved={() => updateDiscipline(3)} />
        )}

        {activeTab === 'journal' && (
          <JournalTab onJournalSaved={() => updateDiscipline(3)} />
        )}

        {activeTab === 'breath-lab' && <BreathingTab />}

        {activeTab === 'binaural' && <BinauralBeatsTab />}

        {activeTab === 'hero' && (
          <div className="py-12 liquid-glass rounded-3xl p-6">
            <Hero onBeginJourney={() => setActiveTab('lock-alarm')} />
          </div>
        )}
      </main>

      {/* 8. Footer */}
      <footer className="bg-[#060914]/80 border-t border-slate-800/80 py-4 text-center text-xs text-slate-500 z-10 select-none">
        Bedtime Procrastination Suite © 2026 - Tối Ưu Giấc Ngủ & Quản Lý Kỷ Luật Toàn Diện
      </footer>

      {/* 9. Floating Cinematic Atmosphere & Audio Controls */}
      <CinematicControls
        videoRef={videoRef}
        showGrain={showGrain}
        setShowGrain={setShowGrain}
        showVignette={showVignette}
        setShowVignette={setShowVignette}
        aspect239={aspect239}
        setAspect239={setAspect239}
        activeSoundMode={activeSoundMode}
        setActiveSoundMode={setActiveSoundMode}
      />

      {/* 10. Enforced Fullscreen Lockout Screen */}
      <HardcoreLockoutModal
        isOpen={isLockedState}
        reason={lockoutReason}
        unlockMethod={selectedUnlockMethod}
        isAlarmRinging={isAlarmRinging}
        onToggleAlarmSound={toggleLockScreenAlarmSound}
        onSuccessUnlock={handleSuccessUnlock}
        onEmergencyPenaltyUnlock={handleEmergencyUnlockWithPenalty}
      />

      {/* Math Emergency Alarm Modal (secondary fallback) */}
      <MissionAlarmModal
        isOpen={isAlarmModalOpen}
        onSolve={handleSuccessUnlock}
        onSnooze5Min={() => {
          setIsAlarmModalOpen(false);
          updateDiscipline(-3);
        }}
      />

      {/* Posture Alert Modal */}
      <PostureModal
        isOpen={isPostureModalOpen}
        angle={postureAngle}
        onDismiss={dismissPostureAlert}
      />
    </div>
  );
}
