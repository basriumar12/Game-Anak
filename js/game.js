// Logika Game Edukasi Ramah Anak: Petualangan Pintar 3D
// Alur Voice-First, Mode Alfabet, Angka, Hijaiyah, Pembelajaran Adaptif & Profil Usia

import { ALPHABET_DATA, NUMBERS_DATA, HIJAIYAH_DATA, ENCOURAGEMENTS, RETRY_PROMPTS } from './data.js';
import { sound } from './audio.js';
import { Scene3DEngine } from './scene3d.js';

class PetualanganPintarApp {
  constructor() {
    this.scene3d = null;

    // Profil & Pengaturan
    this.currentProfile = localStorage.getItem('pp_profile') || 'profileA'; // 'profileA' (3-4 thn), 'profileB' (4-5 thn)
    this.gameMode = 'home'; // 'home', 'alphabet', 'numbers', 'hijaiyah'
    this.currentStep = 'intro'; // 'intro', 'quiz'

    // Indeks Item Saat Ini
    this.alphabetIndex = 0;
    this.numbersIndex = 0;
    this.hijaiyahIndex = 0;

    // State Berhitung Buah
    this.countedFruits = 0;
    this.targetFruitCount = 0;

    // Data Progres Adaptif Lokal (Disimpan aman tanpa data pribadi)
    this.progress = this.loadProgress();

    this.init();
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('pp_progress');
      return saved ? JSON.parse(saved) : { alphabetMastery: {}, numbersMastery: {}, hijaiyahMastery: {} };
    } catch (e) {
      return { alphabetMastery: {}, numbersMastery: {}, hijaiyahMastery: {} };
    }
  }

  saveProgress() {
    try {
      localStorage.setItem('pp_progress', JSON.stringify(this.progress));
    } catch (e) {}
  }

  init() {
    // Inisialisasi Scene 3D
    const canvasContainer = document.getElementById('canvas-container');
    this.scene3d = new Scene3DEngine(canvasContainer, (type) => {
      // Ketika balok 3D disentuh
      if (type === 'mainBlock') {
        sound.playTapTone(1.2);
        sound.repeatLast();
      }
    });

    this.bindDOMEvents();
    this.setupParentGate();
    this.updateProfileBadge();
  }

  bindDOMEvents() {
    // Tombol Layar Pembuka Pertama (Buka Autoplay Audio Mobile)
    const splashOverlay = document.getElementById('splash-overlay');
    const startBtn = document.getElementById('btn-start-game');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        sound.unlock();
        sound.playTapTone();
        splashOverlay.classList.add('hidden');
        this.goHome(true);
      });
    }

    // Tombol Navigasi Utama (Home & Sound Repeat)
    document.getElementById('btn-home').addEventListener('click', () => {
      sound.playTapTone();
      this.goHome();
    });

    document.getElementById('btn-repeat-sound').addEventListener('click', () => {
      sound.repeatLast();
    });

    // 3 Tombol Permainan Raksasa di Beranda
    document.getElementById('btn-mode-alphabet').addEventListener('click', () => {
      this.startAlphabetMode();
    });

    document.getElementById('btn-mode-numbers').addEventListener('click', () => {
      this.startNumbersMode();
    });

    document.getElementById('btn-mode-hijaiyah').addEventListener('click', () => {
      this.startHijaiyahMode();
    });

    // Tombol Maju / Ulangi Materi
    const nextBtn = document.getElementById('btn-next-item');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sound.playTapTone();
        this.advanceCurrentMode();
      });
    }
  }

  // ===================== BERANDA (HOME) ===================== //

  goHome(playWelcomeVoice = false) {
    this.gameMode = 'home';
    this.scene3d.clearInteractiveStage();
    this.scene3d.setWaveAnimation();

    // Tampilkan UI Home, sembunyikan UI Game & Quiz
    document.getElementById('home-menu').classList.remove('hidden');
    document.getElementById('game-hud').classList.add('hidden');
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('btn-next-item').classList.add('hidden');

    const welcomeMsg = "Halo adik pintar! Ayo pilih permainan yang kamu suka!";
    if (playWelcomeVoice) {
      setTimeout(() => {
        sound.speak(welcomeMsg);
        this.scene3d.setTalkAnimation(3000);
      }, 400);
    } else {
      sound.speak(welcomeMsg);
      this.scene3d.setTalkAnimation(2500);
    }
  }

  // ===================== MODE A: PETUALANGAN ALFABET ===================== //

  startAlphabetMode() {
    this.gameMode = 'alphabet';
    sound.playTapTone(1.1);

    document.getElementById('home-menu').classList.add('hidden');
    document.getElementById('game-hud').classList.remove('hidden');

    sound.speak("Yeay! Kita belajar huruf alfabet bersama!", () => {
      this.presentAlphabetItem();
    });
  }

  presentAlphabetItem() {
    const item = ALPHABET_DATA[this.alphabetIndex];
    this.currentStep = 'intro';

    // Tampilkan balok 3D huruf
    this.scene3d.showMainBlock(item.name, item.word, item.color, false);
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('btn-next-item').classList.remove('hidden');

    // Instruksi Suara
    const speechText = `Ini huruf ${item.name}. ${item.hint}`;
    sound.speak(speechText, () => {
      this.scene3d.setTalkAnimation(2200);
      // Berikan jeda sejenak untuk anak melihat, lalu masuk ke tantangan tebak
      setTimeout(() => {
        if (this.gameMode === 'alphabet' && this.currentStep === 'intro') {
          this.promptAlphabetQuiz();
        }
      }, 1800);
    });
  }

  promptAlphabetQuiz() {
    this.currentStep = 'quiz';
    const currentItem = ALPHABET_DATA[this.alphabetIndex];
    document.getElementById('btn-next-item').classList.add('hidden');

    // Buat Pilihan Jawaban Sesuai Profil Usia
    const optionCount = this.currentProfile === 'profileA' ? 2 : 3;
    const options = [currentItem];

    // Ambil pengecoh acak dari data alfabet
    const pool = ALPHABET_DATA.filter(it => it.id !== currentItem.id);
    this.shuffle(pool);
    for (let i = 0; i < optionCount - 1; i++) {
      options.push(pool[i]);
    }
    this.shuffle(options);

    // Render Tombol Pilihan Jawaban
    this.renderChoiceButtons(options, currentItem.id, (isCorrect, selectedBtn) => {
      this.handleAlphabetAnswer(isCorrect, selectedBtn, currentItem);
    });

    // Suara Instruksi Tantangan
    const questionText = `Ayo, mana huruf ${currentItem.name}? Sentuh huruf ${currentItem.name}!`;
    sound.speak(questionText);
    this.scene3d.setTalkAnimation(2000);
  }

  handleAlphabetAnswer(isCorrect, selectedBtn, currentItem) {
    if (isCorrect) {
      sound.playSuccessFanfare();
      this.scene3d.triggerCelebration();

      // Update Mastery
      this.progress.alphabetMastery[currentItem.id] = (this.progress.alphabetMastery[currentItem.id] || 0) + 1;
      this.saveProgress();

      const praise = this.getRandomPraise();
      sound.speak(`${praise} Ini huruf ${currentItem.name}!`, () => {
        setTimeout(() => {
          this.advanceCurrentMode();
        }, 1500);
      });
    } else {
      // Respons Salah: Lembut, Tanpa Hukuman
      sound.playGentleHintTone();
      this.scene3d.setWaveAnimation();

      selectedBtn.classList.add('shake-gentle');
      setTimeout(() => selectedBtn.classList.remove('shake-gentle'), 600);

      const retryPrompt = this.getRandomRetry();
      sound.speak(retryPrompt);

      // Beri petunjuk visual lembut pada tombol yang benar setelah beberapa saat
      setTimeout(() => {
        const correctBtn = document.querySelector(`[data-choice-id="${currentItem.id}"]`);
        if (correctBtn) correctBtn.classList.add('hint-glow');
      }, 1000);
    }
  }

  // ===================== MODE B: DUNIA ANGKA ===================== //

  startNumbersMode() {
    this.gameMode = 'numbers';
    sound.playTapTone(1.1);

    document.getElementById('home-menu').classList.add('hidden');
    document.getElementById('game-hud').classList.remove('hidden');

    sound.speak("Yeay! Kita bermain angka dan berhitung bersama!", () => {
      this.presentNumberCounting();
    });
  }

  presentNumberCounting() {
    const item = NUMBERS_DATA[this.numbersIndex];
    this.currentStep = 'counting';
    this.countedFruits = 0;
    this.targetFruitCount = item.id;

    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('btn-next-item').classList.remove('hidden');

    // Tampilkan Buah / Bintang 3D untuk disentuh dan dihitung
    this.scene3d.showCountingItems(item.id, item.emoji, item.objectName, (index, total) => {
      this.countedFruits++;
      sound.playCountTone(this.countedFruits);

      // Ucapkan angka yang disentuh
      const countWord = NUMBERS_DATA[this.countedFruits - 1]?.name || `${this.countedFruits}`;
      sound.speak(countWord, null, false);

      // Jika seluruh buah sudah selesai dihitung
      if (this.countedFruits >= total) {
        setTimeout(() => {
          sound.playSuccessFanfare();
          this.scene3d.triggerCelebration();
          sound.speak(`Hebat! Ada ${item.name} ${item.objectName}!`, () => {
            setTimeout(() => {
              this.promptNumberQuiz();
            }, 1200);
          });
        }, 800);
      }
    });

    const introText = `Ayo hitung ${item.objectName} bersama-sama! Sentuh buahnya di layar!`;
    sound.speak(introText);
    this.scene3d.setTalkAnimation(2500);
  }

  promptNumberQuiz() {
    this.currentStep = 'quiz';
    const currentItem = NUMBERS_DATA[this.numbersIndex];
    document.getElementById('btn-next-item').classList.add('hidden');

    // Tampilkan balok angka di 3D stage
    this.scene3d.showMainBlock(currentItem.number, currentItem.name, currentItem.color, false);

    const optionCount = this.currentProfile === 'profileA' ? 2 : 3;
    const options = [currentItem];
    const pool = NUMBERS_DATA.filter(it => it.id !== currentItem.id);
    this.shuffle(pool);
    for (let i = 0; i < optionCount - 1; i++) {
      options.push(pool[i]);
    }
    this.shuffle(options);

    this.renderChoiceButtons(options, currentItem.id, (isCorrect, selectedBtn) => {
      this.handleNumberAnswer(isCorrect, selectedBtn, currentItem);
    }, true);

    const questionText = `Ayo, mana angka ${currentItem.name}? Sentuh angka ${currentItem.number}!`;
    sound.speak(questionText);
    this.scene3d.setTalkAnimation(2200);
  }

  handleNumberAnswer(isCorrect, selectedBtn, currentItem) {
    if (isCorrect) {
      sound.playSuccessFanfare();
      this.scene3d.triggerCelebration();

      this.progress.numbersMastery[currentItem.id] = (this.progress.numbersMastery[currentItem.id] || 0) + 1;
      this.saveProgress();

      const praise = this.getRandomPraise();
      sound.speak(`${praise} Ini angka ${currentItem.name}!`, () => {
        setTimeout(() => {
          this.advanceCurrentMode();
        }, 1500);
      });
    } else {
      sound.playGentleHintTone();
      this.scene3d.setWaveAnimation();

      selectedBtn.classList.add('shake-gentle');
      setTimeout(() => selectedBtn.classList.remove('shake-gentle'), 600);

      sound.speak("Yuk, coba lagi! Cari angka " + currentItem.name);
      setTimeout(() => {
        const correctBtn = document.querySelector(`[data-choice-id="${currentItem.id}"]`);
        if (correctBtn) correctBtn.classList.add('hint-glow');
      }, 1000);
    }
  }

  // ===================== MODE C: PETUALANGAN HIJAIYAH ===================== //

  startHijaiyahMode() {
    this.gameMode = 'hijaiyah';
    sound.playTapTone(1.1);

    document.getElementById('home-menu').classList.add('hidden');
    document.getElementById('game-hud').classList.remove('hidden');

    sound.speak("Yeay! Kita belajar mengenal huruf hijaiyah bersama!", () => {
      this.presentHijaiyahItem();
    });
  }

  presentHijaiyahItem() {
    const item = HIJAIYAH_DATA[this.hijaiyahIndex];
    this.currentStep = 'intro';

    // Tampilkan Balok 3D Kaligrafi Hijaiyah
    this.scene3d.showMainBlock(item.arabic, item.name, item.color, true);
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('btn-next-item').classList.remove('hidden');

    // Coba putar audio rekaman lokal (atau fallback ke pengucapan hangat)
    const audioPath = `assets/audio/hijaiyah/${item.audioFile}`;
    const voiceText = `Ini huruf ${item.name}. ${item.hint}. Ayo dengarkan sekali lagi!`;

    sound.playAudioFile(audioPath, voiceText, () => {
      this.scene3d.setTalkAnimation(2000);
      setTimeout(() => {
        if (this.gameMode === 'hijaiyah' && this.currentStep === 'intro') {
          this.promptHijaiyahQuiz();
        }
      }, 1800);
    });
  }

  promptHijaiyahQuiz() {
    this.currentStep = 'quiz';
    const currentItem = HIJAIYAH_DATA[this.hijaiyahIndex];
    document.getElementById('btn-next-item').classList.add('hidden');

    const optionCount = this.currentProfile === 'profileA' ? 2 : 3;
    const options = [currentItem];
    const pool = HIJAIYAH_DATA.filter(it => it.id !== currentItem.id);
    this.shuffle(pool);
    for (let i = 0; i < optionCount - 1; i++) {
      options.push(pool[i]);
    }
    this.shuffle(options);

    this.renderChoiceButtons(options, currentItem.id, (isCorrect, selectedBtn) => {
      this.handleHijaiyahAnswer(isCorrect, selectedBtn, currentItem);
    }, false, true);

    const questionText = `Dengarkan baik-baik ya. Mana huruf ${currentItem.name}?`;
    sound.speak(questionText);
    this.scene3d.setTalkAnimation(2200);
  }

  handleHijaiyahAnswer(isCorrect, selectedBtn, currentItem) {
    if (isCorrect) {
      sound.playSuccessFanfare();
      this.scene3d.triggerCelebration();

      this.progress.hijaiyahMastery[currentItem.id] = (this.progress.hijaiyahMastery[currentItem.id] || 0) + 1;
      this.saveProgress();

      const praise = this.getRandomPraise();
      sound.speak(`${praise} Benar sekali, ini huruf ${currentItem.name}!`, () => {
        setTimeout(() => {
          this.advanceCurrentMode();
        }, 1500);
      });
    } else {
      sound.playGentleHintTone();
      this.scene3d.setWaveAnimation();

      selectedBtn.classList.add('shake-gentle');
      setTimeout(() => selectedBtn.classList.remove('shake-gentle'), 600);

      sound.speak("Yuk, coba lagi! Kita cari huruf " + currentItem.name + " bersama-sama.");
      setTimeout(() => {
        const correctBtn = document.querySelector(`[data-choice-id="${currentItem.id}"]`);
        if (correctBtn) correctBtn.classList.add('hint-glow');
      }, 1000);
    }
  }

  // ===================== UI TOMBOL PILIHAN BESAR ===================== //

  renderChoiceButtons(options, correctId, onSelect, isNumber = false, isArabic = false) {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    container.classList.remove('hidden');

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.setAttribute('data-choice-id', opt.id);

      if (isArabic) {
        btn.innerHTML = `
          <span class="arabic-char">${opt.arabic}</span>
          <span class="sub-label">${opt.name}</span>
        `;
      } else if (isNumber) {
        btn.innerHTML = `
          <span class="main-char">${opt.number}</span>
          <span class="sub-label">${opt.name}</span>
        `;
      } else {
        btn.innerHTML = `
          <span class="main-char">${opt.name}</span>
          <span class="sub-emoji">${opt.emoji}</span>
        `;
      }

      btn.addEventListener('click', () => {
        sound.playTapTone();
        // Hapus glow bila ada
        btn.classList.remove('hint-glow');
        const isCorrect = (opt.id === correctId);
        onSelect(isCorrect, btn);
      });

      container.appendChild(btn);
    });
  }

  // ===================== NAVIGASI MATERI BERIKUTNYA ===================== //

  advanceCurrentMode() {
    if (this.gameMode === 'alphabet') {
      // Batas awal untuk anak usia dini (A-E), tombol dapat berlanjut hingga Z
      const maxLimit = this.currentProfile === 'profileA' ? 10 : ALPHABET_DATA.length;
      this.alphabetIndex = (this.alphabetIndex + 1) % maxLimit;
      this.presentAlphabetItem();
    } else if (this.gameMode === 'numbers') {
      const maxLimit = this.currentProfile === 'profileA' ? 5 : NUMBERS_DATA.length;
      this.numbersIndex = (this.numbersIndex + 1) % maxLimit;
      this.presentNumberCounting();
    } else if (this.gameMode === 'hijaiyah') {
      const maxLimit = this.currentProfile === 'profileA' ? 6 : HIJAIYAH_DATA.length;
      this.hijaiyahIndex = (this.hijaiyahIndex + 1) % maxLimit;
      this.presentHijaiyahItem();
    }
  }

  // ===================== PENGATURAN ORANG TUA (PARENT GATE) ===================== //

  setupParentGate() {
    const btnParentSettings = document.getElementById('btn-parent-settings');
    const parentModal = document.getElementById('parent-modal');
    const closeParentModal = document.getElementById('btn-close-parent-modal');
    const gatePrompt = document.getElementById('gate-prompt');
    const gateInput = document.getElementById('gate-answer');
    const gateSubmit = document.getElementById('btn-gate-submit');
    const gateSection = document.getElementById('parent-gate-step');
    const settingsSection = document.getElementById('parent-settings-step');

    let num1 = 0, num2 = 0;

    const generateMathGate = () => {
      num1 = Math.floor(Math.random() * 5) + 3;
      num2 = Math.floor(Math.random() * 5) + 2;
      gatePrompt.innerText = `Berapa ${num1} + ${num2}?`;
      gateInput.value = '';
    };

    btnParentSettings.addEventListener('click', () => {
      sound.playTapTone();
      generateMathGate();
      gateSection.classList.remove('hidden');
      settingsSection.classList.add('hidden');
      parentModal.classList.remove('hidden');
    });

    closeParentModal.addEventListener('click', () => {
      parentModal.classList.add('hidden');
    });

    gateSubmit.addEventListener('click', () => {
      const ans = parseInt(gateInput.value.trim(), 10);
      if (ans === (num1 + num2)) {
        gateSection.classList.add('hidden');
        settingsSection.classList.remove('hidden');
        this.populateParentDashboard();
      } else {
        sound.playGentleHintTone();
        alert('Jawaban belum tepat. Silakan coba kembali.');
        generateMathGate();
      }
    });

    // Profil Switcher
    const radioA = document.getElementById('profile-radio-a');
    const radioB = document.getElementById('profile-radio-b');

    if (radioA && radioB) {
      if (this.currentProfile === 'profileA') radioA.checked = true;
      else radioB.checked = true;

      radioA.addEventListener('change', () => {
        this.currentProfile = 'profileA';
        localStorage.setItem('pp_profile', 'profileA');
        this.updateProfileBadge();
      });

      radioB.addEventListener('change', () => {
        this.currentProfile = 'profileB';
        localStorage.setItem('pp_profile', 'profileB');
        this.updateProfileBadge();
      });
    }

    // Reset Progress
    const resetBtn = document.getElementById('btn-reset-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Yakin ingin mengulang catatan belajar anak?')) {
          this.progress = { alphabetMastery: {}, numbersMastery: {}, hijaiyahMastery: {} };
          this.saveProgress();
          this.populateParentDashboard();
        }
      });
    }
  }

  updateProfileBadge() {
    const badge = document.getElementById('current-profile-label');
    if (badge) {
      badge.innerText = this.currentProfile === 'profileA' ? 'Profil A: 3–4 Tahun' : 'Profil B: 4–5 Tahun';
    }
  }

  populateParentDashboard() {
    const summaryEl = document.getElementById('parent-progress-summary');
    if (!summaryEl) return;

    const aCount = Object.keys(this.progress.alphabetMastery).length;
    const nCount = Object.keys(this.progress.numbersMastery).length;
    const hCount = Object.keys(this.progress.hijaiyahMastery).length;

    summaryEl.innerHTML = `
      <div class="stat-box">
        <strong>Huruf Dikenal:</strong> ${aCount} dari ${ALPHABET_DATA.length}
      </div>
      <div class="stat-box">
        <strong>Angka Dipelajari:</strong> ${nCount} dari ${NUMBERS_DATA.length}
      </div>
      <div class="stat-box">
        <strong>Hijaiyah Dikenal:</strong> ${hCount} dari ${HIJAIYAH_DATA.length}
      </div>
    `;
  }

  // ===================== HELPER UTILS ===================== //

  getRandomPraise() {
    return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
  }

  getRandomRetry() {
    return RETRY_PROMPTS[Math.floor(Math.random() * RETRY_PROMPTS.length)];
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

// Inisialisasi saat window dimuat
window.addEventListener('DOMContentLoaded', () => {
  window.gameApp = new PetualanganPintarApp();
});

