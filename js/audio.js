// Sistem Suara Edukasi Ramah Anak (Voice-First Engine)
// Mendukung Web Speech API Bahasa Indonesia + Web Audio Synthesizer + Fallback Rekaman Hijaiyah

class SoundSystem {
  constructor() {
    this.audioCtx = null;
    this.synth = window.speechSynthesis || null;
    this.idVoice = null;
    this.lastSpokenText = '';
    this.isMuted = false;
    this.volume = 1.0;
    this.audioCache = new Map();
    this.isPlaying = false;
    this.unlocked = false;

    this.initSpeech();
  }

  // Buka kunci Web Audio & Speech saat sentuhan pertama di HP
  unlock() {
    if (this.unlocked) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
      }
      if (this.synth) {
        const dummyUtter = new SpeechSynthesisUtterance('');
        this.synth.speak(dummyUtter);
      }
      this.unlocked = true;
      console.log('Audio System Unlocked for Mobile');
    } catch (e) {
      console.warn('Audio unlock warning:', e);
    }
  }

  initSpeech() {
    if (!this.synth) {
      console.warn('Web Speech API tidak didukung di browser ini.');
      return;
    }

    const loadVoices = () => {
      const voices = this.synth.getVoices();
      // Cari suara bahasa Indonesia
      this.idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID')) || null;
      if (this.idVoice) {
        console.log('Suara Bahasa Indonesia terdeteksi:', this.idVoice.name);
      } else {
        console.log('Suara khusus id-ID tidak ditemukan, menggunakan suara default perangkat.');
      }
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  // Ucapkan teks dengan intonasi hangat & ramah balita
  speak(text, onEnd = null, saveAsRepeat = true) {
    if (this.isMuted || !text) {
      if (onEnd) setTimeout(onEnd, 300);
      return;
    }

    if (saveAsRepeat) {
      this.lastSpokenText = text;
    }

    if (!this.synth) {
      console.log('[Voice Fallback Text]:', text);
      if (onEnd) setTimeout(onEnd, 1500);
      return;
    }

    // Hentikan suara yang sedang berjalan agar tidak bertumpuk
    this.synth.cancel();

    // Buat utterance baru
    const utterance = new SpeechSynthesisUtterance(text);
    if (this.idVoice) {
      utterance.voice = this.idVoice;
    }
    utterance.lang = 'id-ID';
    utterance.rate = 0.88; // Sedikit lebih lambat agar jelas untuk anak 3-5 tahun
    utterance.pitch = 1.25; // Ceria dan bersahabat
    utterance.volume = this.volume;

    utterance.onend = () => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech error:', e);
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    this.isPlaying = true;
    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesize failed:', err);
      if (onEnd) onEnd();
    }
  }

  // Ulangi instruksi terakhir (Tombol Pengeras Suara)
  repeatLast() {
    if (this.lastSpokenText) {
      this.playTapTone();
      setTimeout(() => {
        this.speak(this.lastSpokenText, null, false);
      }, 150);
    }
  }

  // Putar audio rekaman (misal untuk Hijaiyah makhraj asli)
  playAudioFile(filePath, fallbackText, onEnd = null) {
    if (this.isMuted) {
      if (onEnd) setTimeout(onEnd, 300);
      return;
    }

    this.lastSpokenText = fallbackText;

    // Coba putar file rekaman audio lokal
    const audio = new Audio(filePath);
    audio.volume = this.volume;

    let played = false;
    audio.oncanplaythrough = () => {
      if (!played) {
        played = true;
        this.synth?.cancel();
        audio.play().then(() => {
          audio.onended = () => {
            if (onEnd) onEnd();
          };
        }).catch(err => {
          // Jika gagal autoplay atau file tidak ada, gunakan voice synthesis
          console.log(`Audio file ${filePath} tidak bisa dimainkan, beralih ke suara ramah anak.`);
          this.speak(fallbackText, onEnd, false);
        });
      }
    };

    audio.onerror = () => {
      // File belum disediakan atau offline -> Fallback ke Web Speech
      this.speak(fallbackText, onEnd, false);
    };

    // Timeout safety jika audio menggantung
    setTimeout(() => {
      if (!played) {
        this.speak(fallbackText, onEnd, false);
      }
    }, 400);
  }

  // ================= WEB AUDIO SYNTHESIZER SFX ================= //

  _getAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Efek Ketukan Sentuh Empuk (Pop / Bubble)
  playTapTone(pitchMultiplier = 1.0) {
    if (this.isMuted) return;
    const ctx = this._getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320 * pitchMultiplier, t);
      osc.frequency.exponentialRampToValueAtTime(540 * pitchMultiplier, t + 0.08);

      gain.gain.setValueAtTime(0.25 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.1);
    } catch (e) {}
  }

  // Efek Sentuh Buah / Bintang Saat Menghitung (Nada Melodi Naik)
  playCountTone(countIndex = 1) {
    if (this.isMuted) return;
    const ctx = this._getAudioContext();
    if (!ctx) return;

    // Skala nada pentatonik ceria C-D-E-G-A-C
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
    const freq = notes[(countIndex - 1) % notes.length];

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.3 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.35);
    } catch (e) {}
  }

  // Efek Kemenangan Ceria (Chime Fanfare Ramah Anak)
  playSuccessFanfare() {
    if (this.isMuted) return;
    const ctx = this._getAudioContext();
    if (!ctx) return;

    const chords = [
      { f: 523.25, t: 0.00 }, // C5
      { f: 659.25, t: 0.10 }, // E5
      { f: 783.99, t: 0.20 }, // G5
      { f: 1046.50, t: 0.32 } // C6
    ];

    try {
      chords.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + note.t;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, start);

        gain.gain.setValueAtTime(0.28 * this.volume, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch (e) {}
  }

  // Efek Petunjuk Lembut (Bukan Nada Salah/Buzzer)
  playGentleHintTone() {
    if (this.isMuted) return;
    const ctx = this._getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.linearRampToValueAtTime(392, t + 0.25);

      gain.gain.setValueAtTime(0.2 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.3);
    } catch (e) {}
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.synth) {
      this.synth.cancel();
    }
    return this.isMuted;
  }
}

export const sound = new SoundSystem();

