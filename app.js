// ==========================================================================
// PETUALANGAN PINTAR 3D — ENGINE PERJALANAN PETUALANGAN MAJU (3D RUNNER)
// Sensasi Petualangan Berjalan Maju, Jelas, & Ramah Anak Balita (Usia 3-5 Tahun)
// 1. Roblox Obby | 2. Tekken Cilik | 3. Baby Bus | 4. Balapan Mobil | 5. Mobile Legend Hero
// ==========================================================================

(function() {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. DATA PEMBELAJARAN
  // ------------------------------------------------------------------------
  const ALPHABET_DATA = [
    { id: 'A', name: 'A', word: 'Apel', emoji: '🍎', color: 0xFF5252, hint: 'A seperti Apel merah yang manis!' },
    { id: 'B', name: 'B', word: 'Bola', emoji: '⚽', color: 0x448AFF, hint: 'B seperti Bola bundar yang membal!' },
    { id: 'C', name: 'C', word: 'Ceri', emoji: '🍒', color: 0xE040FB, hint: 'C seperti Ceri manis berwarna merah!' },
    { id: 'D', name: 'D', word: 'Domba', emoji: '🐑', color: 0x69F0AE, hint: 'D seperti Domba berbulu putih!' },
    { id: 'E', name: 'E', word: 'Elang', emoji: '🦅', color: 0xFFD740, hint: 'E seperti Elang yang terbang tinggi!' },
    { id: 'F', name: 'F', word: 'Flamingo', emoji: '🦩', color: 0xFF4081, hint: 'F seperti Flamingo anggun!' },
    { id: 'G', name: 'G', word: 'Gajah', emoji: '🐘', color: 0x7C4DFF, hint: 'G seperti Gajah yang bertubuh besar!' },
    { id: 'H', name: 'H', word: 'Harimau', emoji: '🐯', color: 0xFF6E40, hint: 'H seperti Harimau yang gagah!' },
    { id: 'I', name: 'I', word: 'Ikan', emoji: '🐟', color: 0x18FFFF, hint: 'I seperti Ikan berenang di air!' },
    { id: 'J', name: 'J', word: 'Jerapah', emoji: '🦒', color: 0xFFAB40, hint: 'J seperti Jerapah berleher tinggi!' },
    { id: 'K', name: 'K', word: 'Kelinci', emoji: '🐰', color: 0xEEFF41, hint: 'K seperti Kelinci suka melompat!' },
    { id: 'L', name: 'L', word: 'Lumba-lumba', emoji: '🐬', color: 0x40C4FF, hint: 'L seperti Lumba-lumba ceria!' },
    { id: 'M', name: 'M', word: 'Monyet', emoji: '🐵', color: 0xB388FF, hint: 'M seperti Monyet yang suka pisang!' },
    { id: 'N', name: 'N', word: 'Nanas', emoji: '🍍', color: 0xFFD180, hint: 'N seperti Nanas segar manis!' },
    { id: 'O', name: 'O', word: 'Onta', emoji: '🐪', color: 0xFF9E80, hint: 'O seperti Onta kuat di gurun!' },
    { id: 'P', name: 'P', word: 'Panda', emoji: '🐼', color: 0xB0BEC5, hint: 'P seperti Panda suka makan bambu!' },
    { id: 'Q', name: 'Q', word: 'Quran', emoji: '📖', color: 0x64FFDA, hint: 'Q seperti Quran kitab suci yang mulia!' },
    { id: 'R', name: 'R', word: 'Rusa', emoji: '🦌', color: 0xFF8A80, hint: 'R seperti Rusa bertanduk indah!' },
    { id: 'S', name: 'S', word: 'Sapi', emoji: '🐮', color: 0x82B1FF, hint: 'S seperti Sapi penghasil susu sehat!' },
    { id: 'T', name: 'T', word: 'Tupai', emoji: '🐿️', color: 0xCCFF90, hint: 'T seperti Tupai lincah di pohon!' },
    { id: 'U', name: 'U', word: 'Udang', emoji: '🦐', color: 0xFF80AB, hint: 'U seperti Udang berenang di laut!' },
    { id: 'V', name: 'V', word: 'Vas Bunga', emoji: '🏺', color: 0xB39DDB, hint: 'V seperti Vas bunga yang cantik!' },
    { id: 'W', name: 'W', word: 'Wortel', emoji: '🥕', color: 0xFFAB91, hint: 'W seperti Wortel sehat untuk mata!' },
    { id: 'X', name: 'X', word: 'Xilofon', emoji: '🎵', color: 0x80D8FF, hint: 'X seperti Xilofon alat musik berdawai!' },
    { id: 'Y', name: 'Y', word: 'Yoyo', emoji: '🪀', color: 0xA7FFEB, hint: 'Y seperti Yoyo mainan berputar!' },
    { id: 'Z', name: 'Z', word: 'Zebra', emoji: '🦓', color: 0xCFD8DC, hint: 'Z seperti Zebra bergaris hitam putih!' }
  ];

  const NUMBERS_DATA = [
    { id: 1, name: 'Satu', number: '1', emoji: '🍎', objectName: 'Apel', color: 0xFF5252, hint: 'Ada satu apel merah segar!' },
    { id: 2, name: 'Dua', number: '2', emoji: '⭐', objectName: 'Bintang', color: 0xFFD740, hint: 'Ada dua bintang berkelap-kelip!' },
    { id: 3, name: 'Tiga', number: '3', emoji: '🎈', objectName: 'Balon', color: 0x448AFF, hint: 'Ada tiga balon warna-warni terbang!' },
    { id: 4, name: 'Empat', number: '4', emoji: '🌸', objectName: 'Bunga', color: 0xFF4081, hint: 'Ada empat bunga mekar yang harum!' },
    { id: 5, name: 'Lima', number: '5', emoji: '🍓', objectName: 'Stroberi', color: 0xE040FB, hint: 'Ada lima buah stroberi manis!' },
    { id: 6, name: 'Enam', number: '6', emoji: '🧁', objectName: 'Kue', color: 0x69F0AE, hint: 'Ada enam kue lezat!' },
    { id: 7, name: 'Tujuh', number: '7', emoji: '🚗', objectName: 'Mobil', color: 0x40C4FF, hint: 'Ada tujuh mobil melaju ceria!' },
    { id: 8, name: 'Delapan', number: '8', emoji: '🦋', objectName: 'Kupu-kupu', color: 0xFF6E40, hint: 'Ada delapan kupu-kupu menari!' },
    { id: 9, name: 'Sembilan', number: '9', emoji: '🐥', objectName: 'Anak Bebek', color: 0xEEFF41, hint: 'Ada sembilan anak bebek lucu!' },
    { id: 10, name: 'Sepuluh', number: '10', emoji: '🍭', objectName: 'Permen', color: 0x18FFFF, hint: 'Ada sepuluh permen warna-warni!' }
  ];

  const HIJAIYAH_DATA = [
    { id: 'alif', arabic: 'ا', name: 'Alif', audioFile: 'alif.mp3', color: 0xFF5252, hint: 'Ini huruf Alif. Tegak lurus seperti tongkat!' },
    { id: 'ba', arabic: 'ب', name: 'Ba', audioFile: 'ba.mp3', color: 0x448AFF, hint: 'Ini huruf Ba. Seperti perahu dengan satu titik di bawah!' },
    { id: 'ta', arabic: 'ت', name: 'Ta', audioFile: 'ta.mp3', color: 0x69F0AE, hint: 'Ini huruf Ta. Seperti mangkuk dengan dua titik di atas!' },
    { id: 'tsa', arabic: 'ث', name: 'Tsa', audioFile: 'tsa.mp3', color: 0xFFD740, hint: 'Ini huruf Tsa. Memiliki tiga titik di atas!' },
    { id: 'jim', arabic: 'ج', name: 'Jim', audioFile: 'jim.mp3', color: 0xE040FB, hint: 'Ini huruf Jim. Memiliki titik di tengah perutnya!' },
    { id: 'ha_pedas', arabic: 'ح', name: 'Ha', audioFile: 'ha.mp3', color: 0x40C4FF, hint: 'Ini huruf Ha. Bentuknya bersih tanpa titik!' },
    { id: 'kha', arabic: 'خ', name: 'Kha', audioFile: 'kha.mp3', color: 0xFF6E40, hint: 'Ini huruf Kha. Ada satu titik di atas kepalanya!' },
    { id: 'dal', arabic: 'د', name: 'Dal', audioFile: 'dal.mp3', color: 0x7C4DFF, hint: 'Ini huruf Dal. Melengkung ramah tanpa titik!' },
    { id: 'dzal', arabic: 'ذ', name: 'Dzal', audioFile: 'dzal.mp3', color: 0x18FFFF, hint: 'Ini huruf Dzal. Memiliki satu titik di atasnya!' },
    { id: 'ra', arabic: 'ر', name: 'Ra', audioFile: 'ra.mp3', color: 0xFF4081, hint: 'Ini huruf Ra. Melengkung anggun ke bawah!' },
    { id: 'zai', arabic: 'ز', name: 'Zai', audioFile: 'zai.mp3', color: 0xEEFF41, hint: 'Ini huruf Zai. Memiliki satu titik di atasnya!' },
    { id: 'sin', arabic: 'س', name: 'Sin', audioFile: 'sin.mp3', color: 0x64FFDA, hint: 'Ini huruf Sin. Mempunyai gigi-gigi kecil yang rapi!' },
    { id: 'syin', arabic: 'ش', name: 'Syin', audioFile: 'syin.mp3', color: 0xFFAB40, hint: 'Ini huruf Syin. Memiliki tiga titik di atas giginya!' },
    { id: 'shad', arabic: 'ص', name: 'Shad', audioFile: 'shad.mp3', color: 0xB388FF, hint: 'Ini huruf Shad. Memiliki lingkaran kepala dan lengkungan mangkuk!' },
    { id: 'dhad', arabic: 'ض', name: 'Dhad', audioFile: 'dhad.mp3', color: 0xFF8A80, hint: 'Ini huruf Dhad. Huruf Shad dengan satu titik di atas!' },
    { id: 'tha', arabic: 'ط', name: 'Tha', audioFile: 'tha.mp3', color: 0x82B1FF, hint: 'Ini huruf Tha. Memiliki garis tegak di punggungnya!' },
    { id: 'zha', arabic: 'ظ', name: 'Zha', audioFile: 'zha.mp3', color: 0xCCFF90, hint: 'Ini huruf Zha. Huruf Tha dengan satu titik di atas!' },
    { id: 'ain', arabic: 'ع', name: 'Ain', audioFile: 'ain.mp3', color: 0xFF80AB, hint: 'Ini huruf Ain. Bentuknya melengkung elok ke kiri!' },
    { id: 'ghain', arabic: 'غ', name: 'Ghain', audioFile: 'ghain.mp3', color: 0xB39DDB, hint: 'Ini huruf Ghain. Memiliki satu titik di atas lengkungannya!' },
    { id: 'fa', arabic: 'ف', name: 'Fa', audioFile: 'fa.mp3', color: 0x80D8FF, hint: 'Ini huruf Fa. Memiliki kepala bulat dengan satu titik!' },
    { id: 'qaf', arabic: 'ق', name: 'Qaf', audioFile: 'qaf.mp3', color: 0xFFAB91, hint: 'Ini huruf Qaf. Memiliki dua titik di atasnya!' },
    { id: 'kaf', arabic: 'ك', name: 'Kaf', audioFile: 'kaf.mp3', color: 0xA7FFEB, hint: 'Ini huruf Kaf. Memiliki tanda kecil di dalamnya!' },
    { id: 'lam', arabic: 'ل', name: 'Lam', audioFile: 'lam.mp3', color: 0xFFD180, hint: 'Ini huruf Lam. Berbentuk seperti gagang payung!' },
    { id: 'mim', arabic: 'م', name: 'Mim', audioFile: 'mim.mp3', color: 0xCFD8DC, hint: 'Ini huruf Mim. Memiliki bulatan kecil dan ekor ke bawah!' },
    { id: 'nun', arabic: 'ن', name: 'Nun', audioFile: 'nun.mp3', color: 0x80CBC4, hint: 'Ini huruf Nun. Mangkuk bulat dengan satu titik di tengah!' },
    { id: 'wau', arabic: 'و', name: 'Wau', audioFile: 'wau.mp3', color: 0xFFCC80, hint: 'Ini huruf Wau. Kepala bulat meliuk ke bawah!' },
    { id: 'ha_bulat', arabic: 'هـ', name: 'Ha', audioFile: 'ha_big.mp3', color: 0xBCAAA4, hint: 'Ini huruf Ha besar. Bulat dan ramah!' },
    { id: 'ya', arabic: 'ي', name: 'Ya', audioFile: 'ya.mp3', color: 0x90CAF9, hint: 'Ini huruf Ya. Seperti bebek anggun berenang dengan dua titik di bawah!' }
  ];

  // ------------------------------------------------------------------------
  // 2. SISTEM AUDIO ENGINE (VOICE & SFX SYNTHESIZER)
  // ------------------------------------------------------------------------
  class SoundSystem {
    constructor() {
      this.audioCtx = null;
      this.synth = window.speechSynthesis || null;
      this.idVoice = null;
      this.lastSpokenText = '';
      this.volume = 1.0;
      this.unlocked = false;
      this.initSpeech();
    }

    unlock() {
      if (this.unlocked) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
          if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
        }
        if (this.synth) this.synth.speak(new SpeechSynthesisUtterance(''));
        this.unlocked = true;
      } catch (e) {}
    }

    initSpeech() {
      if (!this.synth) return;
      const load = () => {
        try {
          const voices = this.synth.getVoices() || [];
          this.idVoice = voices.find(v => v.lang && (v.lang.includes('id') || v.lang.includes('ID'))) || null;
        } catch (e) {}
      };
      load();
      if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = load;
      }
    }

    speak(text, onEnd = null, saveAsRepeat = true) {
      if (!text) {
        if (onEnd) setTimeout(onEnd, 300);
        return;
      }
      if (saveAsRepeat) this.lastSpokenText = text;
      if (!this.synth) {
        if (onEnd) setTimeout(onEnd, 1200);
        return;
      }

      try { this.synth.cancel(); } catch (e) {}

      try {
        const utter = new SpeechSynthesisUtterance(text);
        if (this.idVoice) utter.voice = this.idVoice;
        utter.lang = 'id-ID';
        utter.rate = 0.90;
        utter.pitch = 1.25;
        utter.volume = this.volume;
        utter.onend = () => { if (onEnd) onEnd(); };
        utter.onerror = () => { if (onEnd) onEnd(); };
        this.synth.speak(utter);
      } catch (err) {
        if (onEnd) onEnd();
      }
    }

    repeatLast() {
      if (this.lastSpokenText) {
        this.playTapTone();
        setTimeout(() => this.speak(this.lastSpokenText, null, false), 150);
      }
    }

    _getCtx() {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.audioCtx = new AudioContext();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    }

    playCoinTone() {
      const ctx = this._getCtx();
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, t);
        osc.frequency.setValueAtTime(1318.51, t + 0.08);
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
      } catch (e) {}
    }

    playGatePassTone() {
      const ctx = this._getCtx();
      if (!ctx) return;
      try {
        const chords = [523.25, 659.25, 783.99, 1046.50];
        chords.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = ctx.currentTime + idx * 0.07;
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.28, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.35);
        });
      } catch (e) {}
    }

    playSteerSlide() {
      const ctx = this._getCtx();
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(560, t + 0.09);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
      } catch (e) {}
    }

    playJumpSound() {
      const ctx = this._getCtx();
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = ctx.currentTime;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, t);
        osc.frequency.exponentialRampToValueAtTime(640, t + 0.2);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      } catch (e) {}
    }

    playHornSound(versionKey) {
      const ctx = this._getCtx();
      if (!ctx) return;
      try {
        const t = ctx.currentTime;
        if (versionKey === 'babybus') {
          // Klakson Bus Telolet
          [587.33, 739.99, 880.00].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const st = t + idx * 0.14;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, st);
            gain.gain.setValueAtTime(0.25, st);
            gain.gain.exponentialRampToValueAtTime(0.001, st + 0.18);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(st);
            osc.stop(st + 0.18);
          });
        } else {
          // Klakson Mobil Bip Bip
          [0, 0.16].forEach(offset => {
            const o1 = ctx.createOscillator();
            const o2 = ctx.createOscillator();
            const g = ctx.createGain();
            o1.type = 'triangle'; o2.type = 'sawtooth';
            o1.frequency.setValueAtTime(440, t + offset);
            o2.frequency.setValueAtTime(554.37, t + offset);
            g.gain.setValueAtTime(0.22, t + offset);
            g.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.14);
            o1.connect(g); o2.connect(g); g.connect(ctx.destination);
            o1.start(t + offset); o2.start(t + offset);
            o1.stop(t + offset + 0.14); o2.stop(t + offset + 0.14);
          });
        }
      } catch (e) {}
    }

    playBounceGentle() {
      const ctx = this._getCtx();
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, t);
        osc.frequency.linearRampToValueAtTime(260, t + 0.2);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      } catch (e) {}
    }

    playTapTone() {
      const ctx = this._getCtx();
      if (!ctx) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, t);
        osc.frequency.exponentialRampToValueAtTime(560, t + 0.08);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.09);
      } catch (e) {}
    }
  }

  const sound = new SoundSystem();

  // ------------------------------------------------------------------------
  // 3. ENGINE 3D PERJALANAN MAJU (RUNNER WITH 3 LANES & MOVING WORLD)
  // ------------------------------------------------------------------------
  class Runner3DEngine {
    constructor(container, onTargetPassed = null, onCoinCollected = null) {
      this.container = container;
      this.onTargetPassed = onTargetPassed;
      this.onCoinCollected = onCoinCollected;

      this.scene = null;
      this.camera = null;
      this.renderer = null;

      // Jalur: Kiri (-1.8), Tengah (0), Kanan (1.8)
      this.lanePositions = [-1.8, 0, 1.8];
      this.currentLane = 1; // Mulai di tengah
      this.targetX = 0;

      // Kecepatan Lintasan Maju
      this.speed = 0.22;
      this.isJumping = false;
      this.jumpTime = 0;

      // Karakter Player
      this.playerGroup = null;
      this.currentVersion = 'roblox';

      // Elemen Lintasan Berulang (Scenery & Road Segments)
      this.roadSegments = [];
      this.sceneryProps = [];
      this.coins = [];
      this.gates = [];

      this.confettiParticles = [];
      this.animTime = 0;

      if (window.THREE) {
        this.init();
      }
    }

    init() {
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x38bdf8); // Langit biru cerah
      this.scene.fog = new THREE.Fog(0x38bdf8, 30, 70); // Efek kabut horizon

      // Kamera Third-Person Mengikuti dari Belakang Atas
      this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      this.camera.position.set(0, 3.4, 6.2);
      this.camera.lookAt(0, 1.3, -4.0);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.container.appendChild(this.renderer.domElement);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x38bdf8, 0.85);
      this.scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xfffaed, 0.95);
      dirLight.position.set(5, 14, 8);
      dirLight.castShadow = true;
      this.scene.add(dirLight);

      this.buildInfiniteRoad();
      this.buildSceneryTrees();
      this.buildPlayerModels();
      this.createCelebrationParticles();
      this.setupTouchGestures();

      window.addEventListener('resize', () => this.onResize());
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    // Bangun Jalan Raya 3 Jalur yang Bergerak Maju Tiada Henti
    buildInfiniteRoad() {
      this.roadGroup = new THREE.Group();

      // Buat 4 Segmen Jalan Panjang untuk Looping
      for (let i = 0; i < 4; i++) {
        const segGroup = new THREE.Group();
        segGroup.position.z = -i * 20;

        // Aspal Jalan (Lebar 6.2)
        const roadGeo = new THREE.PlaneGeometry(6.2, 20);
        const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
        const road = new THREE.Mesh(roadGeo, roadMat);
        road.rotation.x = -Math.PI / 2;
        segGroup.add(road);

        // Pinggiran Trotoar Rumput Hijau
        const curbL = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.25, 20), new THREE.MeshStandardMaterial({ color: 0x22c55e }));
        curbL.position.set(-3.7, 0.12, 0);
        const curbR = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.25, 20), new THREE.MeshStandardMaterial({ color: 0x22c55e }));
        curbR.position.set(3.7, 0.12, 0);
        segGroup.add(curbL, curbR);

        // Marka Garis Putus-putus Pemisah 3 Jalur
        [-0.9, 0.9].forEach(posX => {
          for (let m = -8; m < 10; m += 4) {
            const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 2.0), new THREE.MeshBasicMaterial({ color: 0xffffff }));
            dash.rotation.x = -Math.PI / 2;
            dash.position.set(posX, 0.01, m);
            segGroup.add(dash);
          }
        });

        this.roadGroup.add(segGroup);
        this.roadSegments.push(segGroup);
      }

      this.scene.add(this.roadGroup);
    }

    // Pohon Kartun & Awan di Samping Kiri Kanan Jalan
    buildSceneryTrees() {
      this.sceneryGroup = new THREE.Group();
      const treeMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.6 });
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x854d0e });

      for (let i = 0; i < 16; i++) {
        const treeL = new THREE.Group();
        const treeR = new THREE.Group();
        const z = -i * 5;

        const trunkGeo = new THREE.CylinderGeometry(0.18, 0.22, 1.0, 8);
        const foliageGeo = new THREE.ConeGeometry(0.9, 1.8, 8);

        // Kiri
        const trL = new THREE.Mesh(trunkGeo, trunkMat); trL.position.y = 0.5;
        const folL = new THREE.Mesh(foliageGeo, treeMat); folL.position.y = 1.6;
        treeL.add(trL, folL);
        treeL.position.set(-5.5 - Math.random() * 2, 0, z);

        // Kanan
        const trR = new THREE.Mesh(trunkGeo, trunkMat); trR.position.y = 0.5;
        const folR = new THREE.Mesh(foliageGeo, treeMat); folR.position.y = 1.6;
        treeR.add(trR, folR);
        treeR.position.set(5.5 + Math.random() * 2, 0, z);

        this.sceneryGroup.add(treeL, treeR);
        this.sceneryProps.push(treeL, treeR);
      }
      this.scene.add(this.sceneryGroup);
    }

    // Bangun 5 Model Pemain Sesuai Versi Game
    buildPlayerModels() {
      this.playerGroup = new THREE.Group();
      this.playerGroup.position.set(0, 0.5, 2.0);

      // 1. Model Roblox Avatar Balok
      this.mRoblox = new THREE.Group();
      const rBody = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.8, 0.4), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
      rBody.position.y = 0.75;
      const rHead = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
      rHead.position.set(0, 1.45, 0);
      this.mRoblox.add(rBody, rHead);

      const rLegGeo = new THREE.BoxGeometry(0.32, 0.7, 0.32);
      this.rLegL = new THREE.Mesh(rLegGeo, new THREE.MeshStandardMaterial({ color: 0x16a34a }));
      this.rLegL.position.set(-0.18, 0.0, 0);
      this.rLegR = new THREE.Mesh(rLegGeo, new THREE.MeshStandardMaterial({ color: 0x16a34a }));
      this.rLegR.position.set(0.18, 0.0, 0);
      this.mRoblox.add(this.rLegL, this.rLegR);

      // 2. Model Tekken Karateka Cilik
      this.mTekken = new THREE.Group();
      const tBody = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.8, 14), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      tBody.position.y = 0.75;
      const tHead = new THREE.Mesh(new THREE.SphereGeometry(0.42, 14, 14), new THREE.MeshStandardMaterial({ color: 0xffd1b3 }));
      tHead.position.set(0, 1.45, 0);
      const tBelt = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.08, 8, 16), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
      tBelt.rotation.x = Math.PI / 2; tBelt.position.y = 0.65;
      this.mTekken.add(tBody, tHead, tBelt);

      // 3. Model Bus Sekolah Kuning Baby Bus
      this.mBabyBus = new THREE.Group();
      const bBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.85, 2.2), new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 }));
      bBody.position.y = 0.65;
      const bWindow = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.32, 1.8), new THREE.MeshStandardMaterial({ color: 0xbae6fd }));
      bWindow.position.set(0, 0.85, 0);
      this.mBabyBus.add(bBody, bWindow);

      // 4. Model Mobil Balap Sport Merah
      this.mRacing = new THREE.Group();
      const carB = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.45, 2.2), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2, metalness: 0.2 }));
      carB.position.y = 0.35;
      const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 1.1), new THREE.MeshStandardMaterial({ color: 0x38bdf8 }));
      cabin.position.set(0, 0.7, -0.15);
      this.mRacing.add(carB, cabin);

      // 5. Model Mobile Legend Hero Penyihir
      this.mMoba = new THREE.Group();
      const mBody = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.8, 14), new THREE.MeshStandardMaterial({ color: 0x8b5cf6 }));
      mBody.position.y = 0.75;
      const mHead = new THREE.Mesh(new THREE.SphereGeometry(0.4, 14, 14), new THREE.MeshStandardMaterial({ color: 0xffe4e6 }));
      mHead.position.set(0, 1.45, 0);
      const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.3, 8), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
      staff.position.set(0.6, 0.9, 0);
      const starGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.2, 0), new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7 }));
      starGem.position.set(0.6, 1.6, 0);
      this.mMoba.add(mBody, mHead, staff, starGem);

      this.playerGroup.add(this.mRoblox, this.mTekken, this.mBabyBus, this.mRacing, this.mMoba);
      this.scene.add(this.playerGroup);

      this.switchPlayerVersion(this.currentVersion);
    }

    switchPlayerVersion(verKey) {
      this.currentVersion = verKey;
      if (this.mRoblox) this.mRoblox.visible = (verKey === 'roblox');
      if (this.mTekken) this.mTekken.visible = (verKey === 'tekken');
      if (this.mBabyBus) this.mBabyBus.visible = (verKey === 'babybus');
      if (this.mRacing) this.mRacing.visible = (verKey === 'racing');
      if (this.mMoba) this.mMoba.visible = (verKey === 'moba');
    }

    // Buat Koin Emas di Sepanjang Jalan Perjalanan
    spawnCoins() {
      this.clearCoins();
      for (let i = 0; i < 6; i++) {
        const lane = Math.floor(Math.random() * 3);
        const coin = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.24, 0),
          new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xf59e0b, emissiveIntensity: 0.3, roughness: 0.1 })
        );
        coin.position.set(this.lanePositions[lane], 0.7, -12 - i * 6);
        this.scene.add(coin);
        this.coins.push(coin);
      }
    }

    clearCoins() {
      this.coins.forEach(c => this.scene.remove(c));
      this.coins = [];
    }

    // Tampilkan 3 Gerbang Huruf/Angka di Ujung Lintasan (Target Mission)
    spawnGates(options, correctIndex, isArabic = false) {
      this.clearGates();
      this.gatesPassed = false;

      // 3 Gerbang di 3 Jalur: Kiri (0), Tengah (1), Kanan (2)
      for (let i = 0; i < 3; i++) {
        const item = options[i];
        if (!item) continue;

        const gateGroup = new THREE.Group();
        gateGroup.position.set(this.lanePositions[i], 0, -42); // Jarak awal di depan jalan

        const isCorrect = (i === correctIndex);

        // Tiang Lengkung Pelangi Kartun
        const archMat = new THREE.MeshStandardMaterial({
          color: isCorrect ? 0x22c55e : item.color || 0x38bdf8,
          roughness: 0.3
        });
        const arch = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.14, 12, 24, Math.PI), archMat);
        arch.position.y = 1.6;
        gateGroup.add(arch);

        // Balok Kartu Karakter Huruf/Angka di Atas Gerbang
        const labelText = isArabic ? item.arabic : (item.number || item.name);
        const subLabel = isArabic ? item.name : (item.word || '');
        const texture = this.createGateTexture(labelText, subLabel, isCorrect, isArabic);

        const signBoard = new THREE.Mesh(
          new THREE.BoxGeometry(1.4, 1.4, 0.15),
          [
            new THREE.MeshStandardMaterial({ color: item.color || 0xffffff }),
            new THREE.MeshStandardMaterial({ color: item.color || 0xffffff }),
            new THREE.MeshStandardMaterial({ color: item.color || 0xffffff }),
            new THREE.MeshStandardMaterial({ color: item.color || 0xffffff }),
            new THREE.MeshStandardMaterial({ map: texture }), // Depan
            new THREE.MeshStandardMaterial({ map: texture })
          ]
        );
        signBoard.position.y = 1.8;
        gateGroup.add(signBoard);

        // Jika gerbang target: tambahkan Bintang Emas di atasnya
        if (isCorrect) {
          const starTop = new THREE.Mesh(
            new THREE.DodecahedronGeometry(0.35, 0),
            new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffaa00, emissiveIntensity: 0.5 })
          );
          starTop.position.y = 2.9;
          gateGroup.add(starTop);
        }

        gateGroup.userData = {
          lane: i,
          isCorrect: isCorrect,
          item: item
        };

        this.scene.add(gateGroup);
        this.gates.push(gateGroup);
      }
    }

    clearGates() {
      this.gates.forEach(g => this.scene.remove(g));
      this.gates = [];
    }

    createGateTexture(mainText, subText, isCorrect, isArabic) {
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 256;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = isCorrect ? '#f0fdf4' : '#ffffff';
      ctx.fillRect(0, 0, 256, 256);

      ctx.lineWidth = 14;
      ctx.strokeStyle = isCorrect ? '#22c55e' : '#38bdf8';
      ctx.strokeRect(7, 7, 242, 242);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isCorrect ? '#15803d' : '#0369a1';

      if (isArabic) {
        ctx.font = 'bold 120px "Amiri", serif';
        ctx.fillText(mainText, 128, 115);
      } else {
        ctx.font = 'bold 120px "Fredoka", sans-serif';
        ctx.fillText(mainText, 128, 110);
      }

      if (subText) {
        ctx.font = 'bold 28px "Fredoka", sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText(subText.toUpperCase(), 128, 205);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    // Kendali Geser Jalur Kiri & Kanan
    steerLeft() {
      if (this.currentLane > 0) {
        this.currentLane--;
        this.targetX = this.lanePositions[this.currentLane];
        sound.playSteerSlide();
      }
    }

    steerRight() {
      if (this.currentLane < 2) {
        this.currentLane++;
        this.targetX = this.lanePositions[this.currentLane];
        sound.playSteerSlide();
      }
    }

    jumpAction() {
      if (this.isJumping) return;
      this.isJumping = true;
      this.jumpTime = 0;
      sound.playJumpSound();
    }

    // Gesture Swipe di Layar HP
    setupTouchGestures() {
      let touchStartX = 0;
      let touchStartY = 0;

      this.container.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      this.container.addEventListener('touchend', (e) => {
        if (e.changedTouches.length > 0) {
          const diffX = e.changedTouches[0].clientX - touchStartX;
          const diffY = e.changedTouches[0].clientY - touchStartY;

          // Swipe Horizontal (Geser Jalur)
          if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) this.steerLeft();
            else this.steerRight();
          }
          // Swipe Vertikal Atas (Lompat)
          else if (diffY < -50) {
            this.jumpAction();
          }
        }
      }, { passive: true });
    }

    createCelebrationParticles() {
      this.confettiGroup = new THREE.Group();
      const colors = [0xff4081, 0x00e676, 0xffd700, 0x00b0ff, 0xff9100, 0xe040fb];
      for (let i = 0; i < 70; i++) {
        const p = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), new THREE.MeshBasicMaterial({ color: colors[i % colors.length], side: THREE.DoubleSide }));
        p.visible = false;
        p.userData = { velocity: new THREE.Vector3(), rotSpeed: new THREE.Vector3(), active: false };
        this.confettiGroup.add(p);
        this.confettiParticles.push(p);
      }
      this.scene.add(this.confettiGroup);
    }

    triggerCelebration() {
      sound.playGatePassTone();
      this.confettiParticles.forEach((p) => {
        p.visible = true;
        p.userData.active = true;
        p.position.set(this.targetX + (Math.random() - 0.5) * 2, 1.8, 1.5);
        const angle = Math.random() * Math.PI * 2;
        p.userData.velocity.set(Math.cos(angle) * (Math.random() * 3), 4.0 + Math.random() * 4.0, Math.sin(angle) * (Math.random() * 3));
        p.userData.rotSpeed.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
      });
    }

    onResize() {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    // Loop Animasi Perjalanan Maju Tiada Henti
    animate() {
      requestAnimationFrame(this.animate);
      const delta = 0.016;
      this.animTime += delta;

      // 1. Gerakkan Segmen Jalan Maju (Looping Jalan Raya)
      this.roadSegments.forEach(seg => {
        seg.position.z += this.speed;
        if (seg.position.z > 15) {
          seg.position.z -= 80; // Pindahkan ke horizon depan
        }
      });

      // 2. Gerakkan Pohon-pohon Samping Jalan
      this.sceneryProps.forEach(prop => {
        prop.position.z += this.speed;
        if (prop.position.z > 10) {
          prop.position.z -= 80;
        }
      });

      // 3. Gerakkan Koin Emas & Deteksi Ambil Koin
      for (let i = this.coins.length - 1; i >= 0; i--) {
        const coin = this.coins[i];
        coin.position.z += this.speed;
        coin.rotation.y += 0.05;

        // Cek tabrakan dengan player
        if (Math.abs(coin.position.z - this.playerGroup.position.z) < 1.0) {
          if (Math.abs(coin.position.x - this.playerGroup.position.x) < 0.8) {
            sound.playCoinTone();
            this.scene.remove(coin);
            this.coins.splice(i, 1);
            if (this.onCoinCollected) this.onCoinCollected();
          }
        }
        else if (coin.position.z > 10) {
          this.scene.remove(coin);
          this.coins.splice(i, 1);
        }
      }

      // 4. Gerakkan Gerbang Misi Menuju Player
      if (this.gates.length > 0 && !this.gatesPassed) {
        this.gates.forEach(g => {
          g.position.z += this.speed;
        });

        const firstGate = this.gates[0];
        // Cek saat gerbang mencapai posisi pemain (z ≈ 2.0)
        if (firstGate.position.z >= 1.6 && firstGate.position.z <= 2.6) {
          this.gatesPassed = true;
          // Cari gerbang di jalur pemain
          const chosenGate = this.gates.find(g => g.userData.lane === this.currentLane);
          if (chosenGate) {
            if (chosenGate.userData.isCorrect) {
              this.triggerCelebration();
              if (this.onTargetPassed) this.onTargetPassed(true, chosenGate.userData.item);
            } else {
              sound.playBounceGentle();
              if (this.onTargetPassed) this.onTargetPassed(false, chosenGate.userData.item);
            }
          }
        }
      }

      // 5. Pergerakan Halus Pemain (Smooth Lane Lerp & Jump)
      if (this.playerGroup) {
        this.playerGroup.position.x += (this.targetX - this.playerGroup.position.x) * 0.2;

        if (this.isJumping) {
          this.jumpTime += 0.08;
          this.playerGroup.position.y = 0.5 + Math.sin(this.jumpTime * Math.PI) * 1.4;
          if (this.jumpTime >= 1.0) {
            this.isJumping = false;
            this.playerGroup.position.y = 0.5;
          }
        }

        // Animasi kaki berlari untuk Roblox
        if (this.currentVersion === 'roblox' && this.rLegL) {
          this.rLegL.rotation.x = Math.sin(this.animTime * 14) * 0.6;
          this.rLegR.rotation.x = -Math.sin(this.animTime * 14) * 0.6;
        }
      }

      // 6. Update Konfeti
      this.confettiParticles.forEach(p => {
        if (p.userData.active) {
          p.position.addScaledVector(p.userData.velocity, delta);
          p.rotation.x += p.userData.rotSpeed.x * delta;
          p.rotation.y += p.userData.rotSpeed.y * delta;
          p.userData.velocity.y -= 9.8 * delta * 0.55;
          if (p.position.y < -0.2) {
            p.userData.active = false;
            p.visible = false;
          }
        }
      });

      this.renderer.render(this.scene, this.camera);
    }
  }

  // ------------------------------------------------------------------------
  // 4. LOGIKA APLIKASI PERJALANAN (PETUALANGAN PINTAR APP)
  // ------------------------------------------------------------------------
  class PetualanganPintarApp {
    constructor() {
      this.runnerEngine = null;
      this.currentMode = 'alphabet'; // 'alphabet', 'numbers', 'hijaiyah'
      this.currentGameVersion = localStorage.getItem('pp_version') || 'roblox';
      this.currentProfile = localStorage.getItem('pp_profile') || 'profileA';

      this.itemIndex = 0;
      this.coinScore = 0;
      this.progressInJourney = 1; // 1 s/d 5 pos
      this.totalPos = 5;

      this.init();
    }

    init() {
      const container = document.getElementById('canvas-container');
      if (window.THREE && container) {
        this.runnerEngine = new Runner3DEngine(
          container,
          (isCorrect, item) => this.handleGatePass(isCorrect, item),
          () => this.handleCoinPickup()
        );
      }

      this.bindDOMEvents();
      this.setupParentGate();
      this.applyGameVersion(this.currentGameVersion, false);
    }

    bindDOMEvents() {
      document.getElementById('btn-home')?.addEventListener('click', () => {
        sound.playTapTone();
        this.openHomeMenu();
      });

      document.getElementById('btn-repeat-sound')?.addEventListener('click', () => {
        sound.repeatLast();
      });

      document.getElementById('btn-open-versions')?.addEventListener('click', () => {
        sound.playTapTone();
        document.getElementById('versions-modal')?.classList.remove('hidden');
      });

      document.getElementById('btn-close-versions-modal')?.addEventListener('click', () => {
        document.getElementById('versions-modal')?.classList.add('hidden');
      });

      // Kontrol Kemudi Kiri & Kanan
      document.getElementById('btn-steer-left')?.addEventListener('click', () => {
        this.runnerEngine?.steerLeft();
      });

      document.getElementById('btn-steer-right')?.addEventListener('click', () => {
        this.runnerEngine?.steerRight();
      });

      // Tombol Aksi Lompat & Klakson
      document.getElementById('btn-action-jump')?.addEventListener('click', () => {
        this.runnerEngine?.jumpAction();
      });

      document.getElementById('btn-horn')?.addEventListener('click', () => {
        sound.playHornSound(this.currentGameVersion);
      });

      // Pilihan Materi Menu Beranda
      document.getElementById('btn-mode-alphabet')?.addEventListener('click', () => {
        this.startAdventure('alphabet');
      });

      document.getElementById('btn-mode-numbers')?.addEventListener('click', () => {
        this.startAdventure('numbers');
      });

      document.getElementById('btn-mode-hijaiyah')?.addEventListener('click', () => {
        this.startAdventure('hijaiyah');
      });
    }

    openHomeMenu() {
      document.getElementById('home-menu-layer')?.classList.remove('hidden');
      sound.speak("Halo adik pintar! Ayo pilih petualangan belajarmu!");
    }

    startAdventure(modeKey) {
      this.currentMode = modeKey;
      this.itemIndex = 0;
      this.progressInJourney = 1;
      document.getElementById('home-menu-layer')?.classList.add('hidden');

      const modeNames = {
        alphabet: "Petualangan Huruf Alfabet!",
        numbers: "Petualangan Dunia Angka!",
        hijaiyah: "Petualangan Huruf Hijaiyah!"
      };

      sound.speak(`Yeay! Kita mulai ${modeNames[modeKey]}! Ayo jalan maju!`, () => {
        this.presentNextMission();
      });
    }

    presentNextMission() {
      let dataList = ALPHABET_DATA;
      if (this.currentMode === 'numbers') dataList = NUMBERS_DATA;
      if (this.currentMode === 'hijaiyah') dataList = HIJAIYAH_DATA;

      const currentItem = dataList[this.itemIndex % dataList.length];
      const isArabic = (this.currentMode === 'hijaiyah');

      // Update Banner Misi Atas
      const badgeEl = document.getElementById('target-badge');
      const titleEl = document.getElementById('mission-title');
      const subEl = document.getElementById('mission-sub');

      if (badgeEl) {
        if (isArabic) {
          badgeEl.innerText = currentItem.arabic;
          badgeEl.classList.add('arabic-badge');
        } else {
          badgeEl.innerText = currentItem.number || currentItem.name;
          badgeEl.classList.remove('arabic-badge');
        }
      }

      if (titleEl) {
        if (this.currentMode === 'numbers') {
          titleEl.innerText = `Ayo Cari Angka ${currentItem.name}!`;
        } else if (this.currentMode === 'hijaiyah') {
          titleEl.innerText = `Ayo Cari Huruf ${currentItem.name}!`;
        } else {
          titleEl.innerText = `Ayo Cari Huruf ${currentItem.name}!`;
        }
      }

      if (subEl) {
        subEl.innerText = currentItem.hint || 'Geser jalan ke arah gerbang yang benar';
      }

      // Update Progress Bar Perjalanan (Pos 1 s/d 5)
      const fillPercent = Math.min(100, (this.progressInJourney / this.totalPos) * 100);
      const fillEl = document.getElementById('journey-progress-fill');
      if (fillEl) fillEl.style.width = `${fillPercent}%`;

      // Buat 3 Pilihan Gerbang di 3 Jalur (1 Target Benar, 2 Pengecoh)
      const options = [currentItem];
      const pool = dataList.filter(it => it.id !== currentItem.id);
      this.shuffle(pool);
      options.push(pool[0], pool[1]);

      // Acak posisi gerbang di 3 jalur
      this.shuffle(options);
      const correctIdx = options.findIndex(it => it.id === currentItem.id);

      // Munculkan Koin & Gerbang di Lintasan 3D
      this.runnerEngine?.spawnCoins();
      this.runnerEngine?.spawnGates(options, correctIdx, isArabic);

      // Suara Instruksi Perjalanan yang Sangat Jelas
      let voicePrompt = `Ayo jalan maju! Cari gerbang ${currentItem.name}!`;
      if (this.currentMode === 'alphabet') {
        voicePrompt = `Ayo, kita cari huruf ${currentItem.name}! ${currentItem.name} seperti ${currentItem.word}! Geser jalan ke huruf ${currentItem.name}!`;
      } else if (this.currentMode === 'numbers') {
        voicePrompt = `Ayo cari angka ${currentItem.name}! Geser jalan ke angka ${currentItem.number}!`;
      } else if (this.currentMode === 'hijaiyah') {
        voicePrompt = `Dengarkan baik-baik. Ayo cari huruf ${currentItem.name}! Geser jalan ke huruf ${currentItem.name}!`;
      }

      sound.speak(voicePrompt);
    }

    handleGatePass(isCorrect, item) {
      if (isCorrect) {
        this.progressInJourney++;
        this.itemIndex++;

        const praises = [
          "Wah hebat sekali! Tepat sasaran!",
          "Pintar sekali adik hebat!",
          "Luar biasa! Kamu berhasil melewati gerbangnya!",
          "Yeay! Benar sekali, ayo kita lanjutkan perjalanan!"
        ];
        const praise = praises[Math.floor(Math.random() * praises.length)];

        sound.speak(`${praise}`, () => {
          setTimeout(() => {
            if (this.progressInJourney > this.totalPos) {
              // Selesai 1 Putaran Perjalanan (Finish Trophy)
              sound.speak("Horeee! Kamu sampai di garis finish! Kamu juara satu!", () => {
                this.progressInJourney = 1;
                setTimeout(() => this.presentNextMission(), 1500);
              });
            } else {
              this.presentNextMission();
            }
          }, 1200);
        });
      } else {
        // Jika belum tepat
        sound.speak("Yuk coba lagi! Geser ke jalur gerbang yang benar ya!");
        setTimeout(() => {
          // Ulangi gerbang agar anak bisa melewati yang tepat
          this.presentNextMission();
        }, 1500);
      }
    }

    handleCoinPickup() {
      this.coinScore += 10;
      const coinEl = document.getElementById('coin-score');
      if (coinEl) coinEl.innerText = this.coinScore;
    }

    applyGameVersion(versionKey, playAnnouncement = true) {
      this.currentGameVersion = versionKey;
      localStorage.setItem('pp_version', versionKey);

      const titles = {
        roblox: 'Roblox Obby',
        tekken: 'Tekken Cilik',
        babybus: 'Baby Bus',
        racing: 'Balapan Mobil',
        moba: 'Mobile Legend'
      };

      const titleEl = document.getElementById('current-version-title');
      if (titleEl) titleEl.innerText = titles[versionKey] || 'Pilih Game';

      // Update Aksi Tombol Kanan
      const actionIcon = document.getElementById('action-btn-icon');
      const actionLbl = document.getElementById('action-btn-label');
      if (actionIcon && actionLbl) {
        if (versionKey === 'racing') {
          actionIcon.innerText = '⚡'; actionLbl.innerText = 'GAS NGEBUT!';
        } else if (versionKey === 'tekken') {
          actionIcon.innerText = '👊'; actionLbl.innerText = 'PUKUL!';
        } else if (versionKey === 'moba') {
          actionIcon.innerText = '🔮'; actionLbl.innerText = 'TEMBAK!';
        } else {
          actionIcon.innerText = '🦘'; actionLbl.innerText = 'LOMPAT!';
        }
      }

      this.runnerEngine?.switchPlayerVersion(versionKey);

      if (playAnnouncement) {
        const intros = {
          roblox: "Selamat datang di Roblox Obby! Ayo berlari dan lompat di jalan pelangi!",
          tekken: "Selamat datang di Tekken Cilik! Ayo berlari dan lewati rintangan!",
          babybus: "Selamat datang di Baby Bus! Ayo kendarai bus sekolahmu!",
          racing: "Selamat datang di Balapan Mobil! Ayo tancap gas di lintasan balap!",
          moba: "Selamat datang di Mobile Legend Hero! Ayo meluncur dan temukan sasarannya!"
        };
        sound.speak(intros[versionKey] || "Ayo melaju!");
      }
    }

    setupParentGate() {
      const btn = document.getElementById('btn-parent-settings');
      const modal = document.getElementById('parent-modal');
      const closeBtn = document.getElementById('btn-close-parent-modal');
      const promptEl = document.getElementById('gate-prompt');
      const inputEl = document.getElementById('gate-answer');
      const submitBtn = document.getElementById('btn-gate-submit');
      const gateStep = document.getElementById('parent-gate-step');
      const settingsStep = document.getElementById('parent-settings-step');

      let n1 = 0, n2 = 0;
      const genMath = () => {
        n1 = Math.floor(Math.random() * 5) + 3;
        n2 = Math.floor(Math.random() * 5) + 2;
        if (promptEl) promptEl.innerText = `Berapa ${n1} + ${n2}?`;
        if (inputEl) inputEl.value = '';
      };

      btn?.addEventListener('click', () => {
        sound.playTapTone();
        genMath();
        gateStep?.classList.remove('hidden');
        settingsStep?.classList.add('hidden');
        modal?.classList.remove('hidden');
      });

      closeBtn?.addEventListener('click', () => modal?.classList.add('hidden'));

      submitBtn?.addEventListener('click', () => {
        if (parseInt(inputEl?.value.trim(), 10) === (n1 + n2)) {
          gateStep?.classList.add('hidden');
          settingsStep?.classList.remove('hidden');
        } else {
          alert('Jawaban belum tepat. Silakan coba kembali.');
          genMath();
        }
      });
    }

    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  }

  window.PP_SOUND = sound;
  window.PetualanganPintarApp = PetualanganPintarApp;

  function boot() {
    if (!window.gameApp) {
      window.gameApp = new PetualanganPintarApp();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
