# Petualangan Si Kecil: Dunia Alfabet & Hijaiyah

Game edukasi petualangan interaktif berbasis web HTML5 murni yang dirancang khusus untuk anak usia dini (PAUD / TK, usia 3,5–4,5 tahun) yang belum bisa membaca. Semua instruksi berprinsip **Voice-First** (didukung suara bahasa Indonesia dan audio efek ramah anak).

Dibuat dalam **satu file terintegrasi mandiri (`index.html`)** tanpa ketergantungan framework berat, tanpa server backend, bebas hambatan CORS, dan langsung dapat dimainkan di browser HP Android maupun iPhone.

---

## 🌟 Aturan Utama Permainan (Validasi Jawaban Ketat)

**Pemain WAJIB menjawab pertanyaan dengan benar untuk membuka gerbang dan melanjutkan perjalanan!**

1. **Karakter Berjalan Menuju Rintangan**: Karakter anak petualang lucu melangkah menyusuri alam (hutan, jembatan, gua, sungai, dan istana).
2. **Berhenti di Depan Gerbang Terkunci**: Saat tiba di depan gerbang kayu berpagar, karakter **otomatis berhenti dan tidak bisa bergerak lebih lanjut**.
3. **Pertanyaan Suara Otomatis**: Game menyuarakan instruksi ramah: *"Mana huruf A?"* atau *"Mana huruf Ba?"*.
4. **Pilihan Tombol Huruf Besar**: Anak memilih salah satu dari 3 tombol huruf besar di layar bawah.
5. **Jika Jawaban Benar**:
   - Gembok emas terbuka, daun pintu gerbang terayun terbuka lebar!
   - Suara pujian ceria berkumandang (*"Hebat sekali! Jawabanmu benar!"*).
   - Efek bintang berkilau dan skor bintang bertambah.
   - Karakter bersorak dan melangkah melintasi gerbang menuju rintangan level berikutnya!
6. **Jika Jawaban Salah**:
   - **Karakter TIDAK BOLEH bergerak.**
   - **Gerbang TETAP TERTUTUP.**
   - Putar suara ramah yang lembut: *"Yuk coba lagi ya! Kita cari bersama-sama."*
   - Tidak ada pengurangan nyawa atau hukuman yang menakuti anak. Anak bebas mencoba kembali hingga berhasil.
7. **Bebas Tombol Curang**: Tidak ada tombol "Skip/Lanjut" sembarangan. Validasi murni dikontrol oleh logika JavaScript.

---

## 🗺️ 10 Level Petualangan Awal

### Mode A: Petualangan Alfabet (A–Z)
- **Level 1 — Hutan Alfabet**: Mengenal huruf A, B, C (Apel, Bola, Ceri).
- **Level 2 — Jembatan Huruf**: Mengenal huruf D, E, F (Domba, Elang, Flamingo).
- **Level 3 — Gua Huruf**: Mengenal huruf G, H, I (Gajah, Harimau, Ikan).
- **Level 4 — Sungai Alfabet**: Mengenal huruf J, K, L (Jerapah, Kelinci, Lumba-lumba).
- **Level 5 — Istana Alfabet**: Mengenal M, N, O dan review huruf yang telah dipelajari.

### Mode B: Petualangan Hijaiyah (28 Huruf Baku Alif sampai Ya)
- **Level 6 — Taman Hijaiyah**: Mengenal huruf Alif (ا), Ba (ب), Ta (ت).
- **Level 7 — Jembatan Hijaiyah**: Mengenal huruf Tsa (ث), Jim (ج), Ha (ح).
- **Level 8 — Gua Hijaiyah**: Mengenal huruf Kha (خ), Dal (د), Dzal (ذ).
- **Level 9 — Gunung Hijaiyah**: Mengenal huruf Ra (ر), Zai (ز), Sin (س).
- **Level 10 — Istana Huruf Hijaiyah**: Mengenal huruf Syin (ش) dan review huruf hijaiyah lainnya.

---

## 📱 Cara Menjalankan Game di HP & Laptop

### 1. Menjalankan Langsung di Laptop / Komputer
- Buka folder `gameHtml/petualanganPintar3D/`.
- Klik ganda (*double-click*) file **`index.html`**. Game langsung terbuka di browser (Chrome, Safari, Edge) tanpa perlu koneksi internet atau server lokal.

### 2. Membuka di HP Android & iPhone (Jaringan Wi-Fi Lokal)
1. Hubungkan HP dan laptop ke jaringan Wi-Fi yang sama.
2. Di terminal laptop, jalankan server ringan:
   ```bash
   cd /Users/macbook/Desktop/frelance/gameHtml
   python3 -m http.server 8080
   ```
3. Cek IP lokal laptop Anda (contoh: `192.168.1.15`).
4. Buka Chrome di Android atau Safari di iPhone, lalu akses:
   `http://192.168.1.15:8080/petualanganPintar3D/`
5. Sentuh layar sekali untuk mengaktifkan izin suara di HP (*Audio Autoplay Unlock*).
6. Game dirancang dalam format **Portrait Mobile-First**, sangat nyaman digenggam anak dengan satu atau dua tangan.

---

## 🛠️ Panduan Pengembangan & Kustomisasi

### 1. Cara Menambah Level dan Soal Baru
Buka file `index.html` dan cari array `GAME_LEVELS`. Tambahkan objek level baru:
```javascript
{
  id: 11,
  mode: 'alphabet', // atau 'hijaiyah'
  title: 'Level 11 — Danau Pelangi',
  theme: 'river', // 'forest', 'bridge', 'cave', 'mountain', 'castle'
  questions: [
    { target: 'P', options: ['P', 'Q', 'R'], word: 'Panda', hint: 'P seperti Panda suka makan bambu!' }
  ]
}
```

### 2. Cara Mengganti Suara dengan Rekaman Sendiri (.mp3)
Di dalam class `VoiceSystem`, Anda dapat memanggil pemutar file audio lokal:
```javascript
playAudioRecord(filePath, fallbackText) {
  const audio = new Audio(filePath);
  audio.play().catch(() => this.speak(fallbackText));
}
```
Simpan file rekaman audio makhraj/guru di folder `assets/audio/` dan panggil path filenya pada saat tantangan soal dimuat.

---

## 📋 Daftar Pengujian Sesuai Kriteria

- [x] **Gerbang Terkunci**: Karakter otomatis berhenti saat tiba di depan gerbang kayu.
- [x] **Jawaban Salah**: Pintu gerbang tetap terkunci, karakter tidak bisa bergerak maju, suara ramah meminta mencoba lagi tanpa mengurangi nyawa.
- [x] **Jawaban Benar**: Gembok emas terbuka, daun pintu gerbang terayun terbuka, karakter bersorak dan melangkah melintasi gerbang.
- [x] **Voice-First**: Pertanyaan diucapkan otomatis lewat suara dan tombol pengeras suara (🔊) dapat ditekan kapan saja untuk mengulang suara.
- [x] **Penyimpanan Progres**: Level terakhir dan skor bintang tersimpan di `localStorage`. Tombol *"Lanjutkan Petualangan"* otomatis muncul saat game dibuka kembali.
- [x] **Mobile Portrait**: Tombol huruf berukuran besar di layar bawah, mudah disentuh jempol anak tanpa membuat karakter terhalang.
