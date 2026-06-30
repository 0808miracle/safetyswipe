// Pure Web Audio API Sound Synthesizer (100% Free, Client-side, No assets or keys needed)
let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

let volumePercent = 80;

export function setMute(mute: boolean) {
  isMuted = mute;
  localStorage.setItem('safetySwipeMuted', mute ? 'true' : 'false');
}

export function getMute(): boolean {
  if (isMuted) return true;
  const saved = localStorage.getItem('safetySwipeMuted');
  return saved === 'true';
}

export function setAudioVolume(vol: number) {
  volumePercent = vol;
  localStorage.setItem('safetySwipeVolume', vol.toString());
}

export function getAudioVolume(): number {
  const saved = localStorage.getItem('safetySwipeVolume');
  return saved ? parseInt(saved, 10) : 80;
}

function playTone(freq: number, type: OscillatorType, duration: number, gainStart: number, sweepToFreq?: number) {
  if (getMute()) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    if (sweepToFreq) {
      osc.frequency.exponentialRampToValueAtTime(sweepToFreq, ctx.currentTime + duration);
    }

    const vol = getAudioVolume();
    gainNode.gain.setValueAtTime(gainStart * (vol / 100), ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn("Web Audio failed to initialize or play tone:", e);
  }
}

export const soundEffects = {
  click() {
    playTone(1000, 'sine', 0.05, 0.1);
  },

  correct() {
    // Beautiful upward 2-note harmony
    playTone(523.25, 'sine', 0.15, 0.15); // C5
    setTimeout(() => {
      playTone(659.25, 'sine', 0.25, 0.15); // E5
    }, 80);
  },

  perfect() {
    // Shimmering chime
    playTone(783.99, 'sine', 0.1, 0.2); // G5
    setTimeout(() => {
      playTone(1046.50, 'sine', 0.3, 0.2); // C6
    }, 50);
  },

  incorrect() {
    // Buzz down frequency
    playTone(220, 'sawtooth', 0.4, 0.2, 80);
  },

  timeout() {
    playTone(150, 'sawtooth', 0.5, 0.2, 50);
  },

  tick(isUrgent: boolean) {
    // Percussive woodblock
    playTone(isUrgent ? 1600 : 800, 'triangle', 0.05, 0.08);
  },

  streak(streakNum: number) {
    const base = 440;
    const notes = [0, 2, 4, 7, 9, 12]; // Major pentatonic
    const noteIndex = Math.min(streakNum, notes.length - 1);
    const freq = base * Math.pow(2, notes[noteIndex] / 12);
    playTone(freq, 'sine', 0.3, 0.15, freq * 1.5);
  },

  gameOver() {
    // Melancholic descending melody
    const notes = [392, 349.23, 311.13, 261.63];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playTone(freq, 'sawtooth', 0.4, 0.15, freq - 30);
      }, idx * 250);
    });
  }
};
