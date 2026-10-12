/**
 * Web Audio API procedural soundscape & alarm engine for Bedtime Procrastination Suite
 * Generates organic binaural beats, pink noise, 432Hz calm, and realistic alarms/bells.
 */

export type SoundMode = 'delta' | 'theta' | 'pink' | 'serenity' | 'ocean' | 'rain';
export type AlarmType = 'siren' | 'tibetan' | 'zen' | 'digital' | 'temple';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private activeNodes: AudioNode[] = [];
  private currentMode: SoundMode = 'delta';

  // Alarm specific active nodes
  private alarmNodes: AudioNode[] = [];
  private alarmInterval: NodeJS.Timeout | null = null;
  private activeAlarmType: AlarmType | null = null;
  private isAlarmActive = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime, 0.05);
    }
  }

  public play(mode: SoundMode = 'delta') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.stop();
    this.currentMode = mode;
    this.isPlaying = true;

    if (mode === 'delta') {
      // 2.5 Hz Delta wave binaural beat on 150 Hz carrier (Deep sleep)
      const carrier = 150;
      const beat = 2.5;
      const merger = this.ctx.createChannelMerger(2);
      const oscL = this.ctx.createOscillator();
      const oscR = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      oscL.type = 'sine';
      oscR.type = 'sine';
      oscL.frequency.setValueAtTime(carrier, this.ctx.currentTime);
      oscR.frequency.setValueAtTime(carrier + beat, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      oscL.connect(merger, 0, 0);
      oscR.connect(merger, 0, 1);
      merger.connect(gain);
      gain.connect(this.masterGain);

      oscL.start();
      oscR.start();
      this.activeNodes.push(oscL, oscR, merger, gain);
    } else if (mode === 'theta') {
      // 5.0 Hz Theta wave binaural beat on 180 Hz carrier (Dreamy relaxation)
      const carrier = 180;
      const beat = 5.0;
      const merger = this.ctx.createChannelMerger(2);
      const oscL = this.ctx.createOscillator();
      const oscR = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      oscL.type = 'sine';
      oscR.type = 'sine';
      oscL.frequency.setValueAtTime(carrier, this.ctx.currentTime);
      oscR.frequency.setValueAtTime(carrier + beat, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      oscL.connect(merger, 0, 0);
      oscR.connect(merger, 0, 1);
      merger.connect(gain);
      gain.connect(this.masterGain);

      oscL.start();
      oscR.start();
      this.activeNodes.push(oscL, oscR, merger, gain);
    } else if (mode === 'pink') {
      // Pink noise generator for acoustic filtering
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      noise.connect(gain);
      gain.connect(this.masterGain);
      noise.start();
      this.activeNodes.push(noise, gain);
    } else if (mode === 'serenity') {
      // 432 Hz Pythagorean Serenity Drone
      const freqs = [108, 216, 432];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
        gain.gain.setValueAtTime(0.12 / (idx + 1), this.ctx!.currentTime);
        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();
        this.activeNodes.push(osc, gain);
      });
    } else if (mode === 'ocean' || mode === 'rain') {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= mode === 'ocean' ? 3.0 : 1.8;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = mode === 'ocean' ? 'lowpass' : 'bandpass';
      filter.frequency.setValueAtTime(mode === 'ocean' ? 350 : 800, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start();
      this.activeNodes.push(noise, filter, gain);
    }
  }

  public stop() {
    this.activeNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        if ('disconnect' in node && typeof (node as AudioNode).disconnect === 'function') {
          (node as AudioNode).disconnect();
        }
      } catch {
        // node already stopped
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getMode() {
    return this.currentMode;
  }

  // ====================================================
  // ALARM RINGTONES & CHIMES ENGINE
  // ====================================================

  public playAlarm(type: AlarmType = 'siren', volume: number = 0.6) {
    this.initContext();
    if (!this.ctx) return;
    this.stopAlarm();
    this.isAlarmActive = true;
    this.activeAlarmType = type;

    if (type === 'siren') {
      // Continuous emergency siren with alternating sweep
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);

      // LFO modulation for wailing siren
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(1.5, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(350, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      gain.gain.setValueAtTime(volume * 0.8, this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();

      this.alarmNodes.push(osc, gain, lfo, lfoGain);
    } else if (type === 'digital') {
      // Digital Casio beep pattern: beep-beep-beep every 1 second
      const playBeep = () => {
        if (!this.ctx || !this.isAlarmActive) return;
        const now = this.ctx.currentTime;
        [0, 0.15, 0.3].forEach((offset) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(1400, now + offset);
          gain.gain.setValueAtTime(0, now + offset);
          gain.gain.linearRampToValueAtTime(volume * 0.4, now + offset + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);

          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.09);
        });
      };

      playBeep();
      this.alarmInterval = setInterval(playBeep, 900);
    } else if (type === 'tibetan') {
      // Tibetan singing bowl: metallic shimmering chord with slow decay every 3.5s
      const playBowl = () => {
        if (!this.ctx || !this.isAlarmActive) return;
        const now = this.ctx.currentTime;
        const harmonics = [
          { f: 216, a: 0.5 },
          { f: 432, a: 0.3 },
          { f: 864, a: 0.15 },
          { f: 1296, a: 0.08 },
        ];

        harmonics.forEach(({ f, a }) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f + (Math.random() * 1.5 - 0.75), now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(volume * a, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now);
          osc.stop(now + 3.3);
        });
      };

      playBowl();
      this.alarmInterval = setInterval(playBowl, 3500);
    } else if (type === 'zen') {
      // Sparkling wind chimes: random pentatonic glass pings
      const playChimes = () => {
        if (!this.ctx || !this.isAlarmActive) return;
        const scale = [1046.5, 1174.66, 1318.51, 1567.98, 1760.0, 2093.0];
        const now = this.ctx.currentTime;
        for (let i = 0; i < 4; i++) {
          const offset = Math.random() * 0.8;
          const freq = scale[Math.floor(Math.random() * scale.length)];
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + offset);

          gain.gain.setValueAtTime(0, now + offset);
          gain.gain.linearRampToValueAtTime(volume * 0.35, now + offset + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 1.2);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 1.25);
        }
      };

      playChimes();
      this.alarmInterval = setInterval(playChimes, 1800);
    } else if (type === 'temple') {
      // Deep temple bronze bell with slow reverberant fade
      const playTemple = () => {
        if (!this.ctx || !this.isAlarmActive) return;
        const now = this.ctx.currentTime;
        const freqs = [130, 260, 520, 680];
        freqs.forEach((f, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(f, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(volume * (0.6 / (idx + 1)), now + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now);
          osc.stop(now + 4.6);
        });
      };

      playTemple();
      this.alarmInterval = setInterval(playTemple, 4800);
    }
  }

  public stopAlarm() {
    if (this.alarmInterval) {
      clearInterval(this.alarmInterval);
      this.alarmInterval = null;
    }
    this.alarmNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        if ('disconnect' in node && typeof (node as AudioNode).disconnect === 'function') {
          (node as AudioNode).disconnect();
        }
      } catch {
        // already stopped
      }
    });
    this.alarmNodes = [];
    this.isAlarmActive = false;
    this.activeAlarmType = null;
  }

  public isAlarmRinging(): boolean {
    return this.isAlarmActive;
  }

  public getActiveAlarmType(): AlarmType | null {
    return this.activeAlarmType;
  }

  // Legacy alias for compatibility
  public startSiren() {
    this.playAlarm('siren', 0.8);
  }

  public stopSiren() {
    this.stopAlarm();
  }
}

export const soundEngine = new SoundEngine();
