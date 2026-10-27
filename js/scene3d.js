// Engine 3D Interaktif Ramah Anak menggunakan Three.js
// Karakter Pemandu 3D, Balok Huruf Mengapung, Buah Berhitung 3D, dan Efek Bintang Konfeti

export class Scene3DEngine {
  constructor(canvasContainer, onObjectTapped = null) {
    this.container = canvasContainer;
    this.onObjectTapped = onObjectTapped;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.character = null;
    this.mainBlock = null;
    this.interactableObjects = [];
    this.starsParticles = null;
    this.confettiParticles = [];

    // State Animasi Karakter
    this.charState = 'idle'; // 'idle', 'dance', 'wave', 'talk'
    this.animTime = 0;

    // Raycaster untuk deteksi sentuhan layar HP
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbbf2f6); // Langit biru kartun pastel cerah

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 2.5, 7.8);
    this.camera.lookAt(0, 1.2, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 0.9);
    dirLight.position.set(5, 12, 8);
    dirLight.castShadow = true;
    this.scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x90e0ef, 0.4);
    this.scene.add(hemiLight);

    // Bangun Lingkungan Dunia Kartun
    this.createEnvironment();

    // Bangun Karakter Pemandu 3D "Kiki Si Kelinci Ceria"
    this.createBunnyCharacter();

    // Siapkan Partikel Bintang & Konfeti Perayaan
    this.createCelebrationParticles();

    // Event Listener Touch / Click
    this.setupInteractions();

    // Resize Handler
    window.addEventListener('resize', () => this.onResize());

    // Loop Animasi
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  createEnvironment() {
    // Panggung Taman Melingkar
    const stageGeo = new THREE.CylinderGeometry(4.8, 5.2, 0.4, 40);
    const stageMat = new THREE.MeshStandardMaterial({
      color: 0x86efac, // Hijau rumput segar
      roughness: 0.6,
      metalness: 0.1
    });
    const stage = new THREE.Mesh(stageGeo, stageMat);
    stage.position.y = -0.2;
    stage.receiveShadow = true;
    this.scene.add(stage);

    // Pinggiran Panggung Kayu Kartun Ceria
    const rimGeo = new THREE.TorusGeometry(4.8, 0.22, 16, 50);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.3 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0;
    this.scene.add(rim);

    // Awan-awan 3D Mengapung di Langit
    this.clouds = new THREE.Group();
    const createCloud = (x, y, z, scale) => {
      const cloudGroup = new THREE.Group();
      const puffMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
      const puff1 = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), puffMat);
      const puff2 = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 16), puffMat);
      const puff3 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), puffMat);
      puff2.position.set(-0.6, -0.1, 0);
      puff3.position.set(0.6, -0.1, 0);
      cloudGroup.add(puff1, puff2, puff3);
      cloudGroup.position.set(x, y, z);
      cloudGroup.scale.set(scale, scale, scale);
      this.clouds.add(cloudGroup);
    };

    createCloud(-4.2, 3.8, -3, 0.9);
    createCloud(4.0, 4.2, -2.5, 1.1);
    createCloud(0.2, 4.8, -4, 0.8);
    this.scene.add(this.clouds);
  }

  // Karakter 3D Pemandu "Kiki Si Kelinci Ceria"
  createBunnyCharacter() {
    this.character = new THREE.Group();
    this.character.position.set(-2.2, 0.1, 0.5);

    const furMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xff8da1, roughness: 0.5 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1f2937 });
    const whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Tubuh Chubby
    const bodyGeo = new THREE.SphereGeometry(0.85, 32, 32);
    bodyGeo.scale(1, 1.15, 0.95);
    this.charBody = new THREE.Mesh(bodyGeo, furMat);
    this.charBody.position.y = 0.9;
    this.character.add(this.charBody);

    // Perut Pink Lembut
    const bellyGeo = new THREE.SphereGeometry(0.5, 24, 24);
    bellyGeo.scale(0.85, 1.1, 0.4);
    const belly = new THREE.Mesh(bellyGeo, pinkMat);
    belly.position.set(0, 0.85, 0.7);
    this.character.add(belly);

    // Kepala Kelinci
    this.charHead = new THREE.Group();
    this.charHead.position.set(0, 1.95, 0.1);

    const headGeo = new THREE.SphereGeometry(0.72, 32, 32);
    headGeo.scale(1.05, 0.95, 1);
    const headMesh = new THREE.Mesh(headGeo, furMat);
    this.charHead.add(headMesh);

    // Pipi Merona (Blush)
    const blushGeo = new THREE.CircleGeometry(0.12, 16);
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xffa0b0, transparent: true, opacity: 0.7 });
    const blushL = new THREE.Mesh(blushGeo, blushMat);
    blushL.position.set(-0.4, -0.1, 0.68);
    blushL.rotation.y = -0.2;
    const blushR = new THREE.Mesh(blushGeo, blushMat);
    blushR.position.set(0.4, -0.1, 0.68);
    blushR.rotation.y = 0.2;
    this.charHead.add(blushL, blushR);

    // Mata Bulat Lucu & Pantulan Bintang
    this.charEyes = new THREE.Group();
    const createEye = (x) => {
      const eyeGroup = new THREE.Group();
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), eyeMat);
      eye.scale.set(0.9, 1.2, 0.5);
      const twinkle = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), whiteMat);
      twinkle.position.set(0.03, 0.04, 0.09);
      eyeGroup.add(eye, twinkle);
      eyeGroup.position.set(x, 0.08, 0.68);
      return eyeGroup;
    };
    this.eyeL = createEye(-0.24);
    this.eyeR = createEye(0.24);
    this.charEyes.add(this.eyeL, this.eyeR);
    this.charHead.add(this.charEyes);

    // Hidung Pink Kecil
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), pinkMat);
    nose.scale.set(1.2, 0.8, 1);
    nose.position.set(0, -0.05, 0.72);
    this.charHead.add(nose);

    // Telinga Panjang Berkelok Imut
    const createEar = (x, rotZ) => {
      const earGroup = new THREE.Group();
      earGroup.position.set(x, 0.65, 0);
      earGroup.rotation.z = rotZ;

      const earOuterGeo = new THREE.CylinderGeometry(0.18, 0.25, 1.1, 24);
      earOuterGeo.scale(1, 1, 0.5);
      const earOuter = new THREE.Mesh(earOuterGeo, furMat);
      earOuter.position.y = 0.55;

      const earInnerGeo = new THREE.CylinderGeometry(0.11, 0.16, 0.85, 24);
      earInnerGeo.scale(1, 1, 0.4);
      const earInner = new THREE.Mesh(earInnerGeo, pinkMat);
      earInner.position.set(0, 0.55, 0.08);

      earGroup.add(earOuter, earInner);
      return earGroup;
    };

    this.earL = createEar(-0.35, -0.15);
    this.earR = createEar(0.35, 0.15);
    this.charHead.add(this.earL, this.earR);

    this.character.add(this.charHead);

    // Tangan Kelinci
    this.armL = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), furMat);
    this.armL.scale.set(0.7, 1.3, 0.7);
    this.armL.position.set(-0.85, 1.0, 0.2);
    this.armL.rotation.z = 0.35;
    this.character.add(this.armL);

    this.armR = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), furMat);
    this.armR.scale.set(0.7, 1.3, 0.7);
    this.armR.position.set(0.85, 1.0, 0.2);
    this.armR.rotation.z = -0.35;
    this.character.add(this.armR);

    // Kaki Kelinci Gemoy
    const footGeo = new THREE.SphereGeometry(0.28, 16, 16);
    footGeo.scale(0.8, 0.6, 1.4);
    const footL = new THREE.Mesh(footGeo, furMat);
    footL.position.set(-0.45, 0.15, 0.3);
    const footR = new THREE.Mesh(footGeo, furMat);
    footR.position.set(0.45, 0.15, 0.3);
    this.character.add(footL, footR);

    this.scene.add(this.character);
  }

  // Siapkan Partikel Perayaan Bintang & Konfeti 3D
  createCelebrationParticles() {
    this.confettiGroup = new THREE.Group();
    const colors = [0xff4081, 0x00e676, 0xffd700, 0x00b0ff, 0xff9100, 0xe040fb];

    for (let i = 0; i < 70; i++) {
      const geo = Math.random() > 0.4 
        ? new THREE.PlaneGeometry(0.14, 0.14) 
        : new THREE.SphereGeometry(0.08, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        side: THREE.DoubleSide
      });
      const p = new THREE.Mesh(geo, mat);
      p.visible = false;
      p.userData = {
        velocity: new THREE.Vector3(),
        rotSpeed: new THREE.Vector3(),
        active: false
      };
      this.confettiGroup.add(p);
      this.confettiParticles.push(p);
    }
    this.scene.add(this.confettiGroup);
  }

  // Tampilkan Ledakan Bintang / Konfeti Gembira
  triggerCelebration() {
    this.charState = 'dance';
    this.animTime = 0;

    this.confettiParticles.forEach((p, idx) => {
      p.visible = true;
      p.userData.active = true;
      p.position.set(
        (Math.random() - 0.5) * 1.5 + (this.mainBlock ? this.mainBlock.position.x : 0),
        1.8,
        (Math.random() - 0.5) * 1.5 + (this.mainBlock ? this.mainBlock.position.z : 0)
      );

      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 4.5;
      p.userData.velocity.set(
        Math.cos(angle) * (Math.random() * 2),
        speed,
        Math.sin(angle) * (Math.random() * 2)
      );
      p.userData.rotSpeed.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
    });

    // Kembali ke mode santai setelah 3 detik
    setTimeout(() => {
      this.charState = 'idle';
    }, 3200);
  }

  // Set Animasi Karakter Melambai Lembut (Saat butuh petunjuk atau sapaan)
  setWaveAnimation() {
    this.charState = 'wave';
    setTimeout(() => {
      this.charState = 'idle';
    }, 2500);
  }

  // Set Animasi Karakter Berbicara
  setTalkAnimation(duration = 2000) {
    this.charState = 'talk';
    setTimeout(() => {
      if (this.charState === 'talk') this.charState = 'idle';
    }, duration);
  }

  // Bersihkan objek 3D interaktif yang sedang ada di panggung
  clearInteractiveStage() {
    if (this.mainBlock) {
      this.scene.remove(this.mainBlock);
      this.mainBlock = null;
    }
    if (this.interactiveGroup) {
      this.scene.remove(this.interactiveGroup);
      this.interactiveGroup = null;
    }
    this.interactableObjects = [];
  }

  // Tekstur Kanvas Dinamis untuk Huruf / Angka / Hijaiyah
  createCanvasTexture(text, subText = '', bgColor = '#ffffff', textColor = '#1e293b', isArabic = false) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Background bulat sudut melengkung
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 512, 512);

    // Bingkai kartun cerah
    ctx.lineWidth = 24;
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(12, 12, 488, 488);

    // Teks Utama
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (isArabic) {
      ctx.font = 'bold 220px "Amiri", "Traditional Arabic", "Segoe UI", sans-serif';
      ctx.fillText(text, 256, subText ? 230 : 256);
    } else {
      ctx.font = 'bold 240px "Fredoka", "Nunito", "Arial Rounded MT Bold", sans-serif';
      ctx.fillText(text, 256, subText ? 210 : 256);
    }

    // Subteks pendamping (misal: "A P E L" atau "S A T U")
    if (subText) {
      ctx.font = 'bold 54px "Fredoka", "Nunito", sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText(subText.toUpperCase(), 256, 410);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // Tampilkan Balok 3D Huruf / Hijaiyah Mengapung di Panggung
  showMainBlock(mainText, subText, hexColor, isArabic = false) {
    this.clearInteractiveStage();

    const blockGroup = new THREE.Group();
    blockGroup.position.set(1.4, 1.4, 0.4);

    const texture = this.createCanvasTexture(mainText, subText, '#ffffff', `#${hexColor.toString(16).padStart(6, '0')}`, isArabic);

    const materials = [
      new THREE.MeshStandardMaterial({ color: hexColor, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: hexColor, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: hexColor, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: hexColor, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.2 }), // Depan
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.2 })  // Belakang
    ];

    const geometry = new THREE.BoxGeometry(1.9, 1.9, 1.9);
    const cube = new THREE.Mesh(geometry, materials);
    cube.castShadow = true;
    cube.userData = { type: 'mainBlock', text: mainText };

    blockGroup.add(cube);
    this.mainBlock = blockGroup;
    this.mainCubeMesh = cube;
    this.scene.add(blockGroup);
    this.interactableObjects.push(cube);

    // Animasi Balok Muncul Membal (Pop In)
    blockGroup.scale.set(0.01, 0.01, 0.01);
    let s = 0.01;
    const popIn = () => {
      s += 0.09;
      if (s < 1.0) {
        blockGroup.scale.set(s, s, s);
        requestAnimationFrame(popIn);
      } else {
        blockGroup.scale.set(1, 1, 1);
      }
    };
    popIn();
  }

  // Tampilkan Objek Buah / Benda 3D untuk Dihitung (Dunia Angka)
  showCountingItems(count, emoji, objectName, onFruitTapped) {
    this.clearInteractiveStage();

    this.interactiveGroup = new THREE.Group();
    this.interactiveGroup.position.set(1.4, 0.4, 0.5);

    const items = [];
    const radius = Math.min(1.8, 0.7 + count * 0.18);

    for (let i = 0; i < count; i++) {
      const itemGroup = new THREE.Group();
      
      // Letakkan dalam formasi busur atau melingkar di depan anak
      let posX = 0, posY = 0.6, posZ = 0;
      if (count === 1) {
        posX = 0; posY = 1.0;
      } else {
        const angle = (i / (count - 1 || 1) - 0.5) * Math.PI * 0.85;
        posX = Math.sin(angle) * radius * 1.5;
        posZ = Math.cos(angle) * 0.7 - 0.3;
        posY = 0.8 + (i % 2 === 0 ? 0.3 : 0);
      }
      itemGroup.position.set(posX, posY, posZ);

      // Model Apel / Benda 3D Kartun
      const fruitMesh = this.createFruitMesh(emoji);
      fruitMesh.userData = {
        type: 'countingItem',
        index: i + 1,
        total: count,
        tapped: false
      };

      itemGroup.add(fruitMesh);
      this.interactiveGroup.add(itemGroup);
      this.interactableObjects.push(fruitMesh);
      items.push(fruitMesh);
    }

    this.scene.add(this.interactiveGroup);
    this.onFruitTappedCallback = onFruitTapped;
  }

  // Model 3D Buah Apel / Bintang Kartun Ceria
  createFruitMesh(emoji) {
    const group = new THREE.Group();

    if (emoji === '⭐') {
      // Model Bintang 3D
      const starGeo = new THREE.DodecahedronGeometry(0.55, 0);
      const starMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0xffaa00,
        emissiveIntensity: 0.25,
        roughness: 0.2
      });
      const star = new THREE.Mesh(starGeo, starMat);
      group.add(star);
    } else {
      // Model Apel Merah Ranum Lucu
      const appleGeo = new THREE.SphereGeometry(0.55, 24, 24);
      appleGeo.scale(1.05, 0.95, 1.05);
      const appleMat = new THREE.MeshStandardMaterial({
        color: 0xff3b30,
        roughness: 0.25,
        metalness: 0.1
      });
      const apple = new THREE.Mesh(appleGeo, appleMat);
      apple.castShadow = true;
      group.add(apple);

      // Tangkai Cokelat
      const stemGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.35, 12);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.set(0, 0.55, 0);
      stem.rotation.z = -0.15;
      group.add(stem);

      // Daun Hijau Manis
      const leafGeo = new THREE.SphereGeometry(0.18, 12, 12);
      leafGeo.scale(1.2, 0.3, 0.7);
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x34c759 });
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(0.14, 0.62, 0);
      leaf.rotation.z = 0.4;
      group.add(leaf);
    }

    return group;
  }

  // Setup Sentuhan Layar HP (Pointer / Touch Event)
  setupInteractions() {
    const handleTap = (clientX, clientY) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.interactableObjects, true);

      if (intersects.length > 0) {
        let hitObj = intersects[0].object;
        while (hitObj.parent && !hitObj.userData.type && hitObj.parent !== this.scene) {
          hitObj = hitObj.parent;
        }

        // Jika balok utama disentuh
        if (hitObj.userData.type === 'mainBlock' || (hitObj.parent && hitObj.parent.userData.type === 'mainBlock')) {
          this.pulseMainBlock();
          if (this.onObjectTapped) this.onObjectTapped('mainBlock');
        }

        // Jika buah / benda hitung disentuh
        if (hitObj.userData.type === 'countingItem') {
          this.pulseCountingItem(hitObj);
        }
      }
    };

    this.renderer.domElement.addEventListener('pointerdown', (e) => {
      handleTap(e.clientX, e.clientY);
    });
  }

  pulseMainBlock() {
    if (!this.mainBlock) return;
    let frame = 0;
    const origY = this.mainBlock.position.y;
    const animateBounce = () => {
      frame += 0.2;
      this.mainBlock.position.y = origY + Math.sin(frame) * 0.45;
      this.mainBlock.rotation.y += 0.25;
      if (frame < Math.PI) {
        requestAnimationFrame(animateBounce);
      } else {
        this.mainBlock.position.y = origY;
      }
    };
    animateBounce();
  }

  pulseCountingItem(itemMesh) {
    if (itemMesh.userData.tapped) return;
    itemMesh.userData.tapped = true;

    // Pop up animation
    let s = 1.0;
    let up = true;
    const bounce = () => {
      if (up) {
        s += 0.12;
        if (s >= 1.45) up = false;
      } else {
        s -= 0.08;
      }
      itemMesh.scale.set(s, s, s);
      if (s > 1.0 || up) {
        requestAnimationFrame(bounce);
      } else {
        itemMesh.scale.set(1.1, 1.1, 1.1);
      }
    };
    bounce();

    if (this.onFruitTappedCallback) {
      this.onFruitTappedCallback(itemMesh.userData.index, itemMesh.userData.total);
    }
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    // Sesuaikan posisi kamera bila layar HP vertikal (portrait)
    if (width < height) {
      this.camera.position.set(0, 3.2, 9.5);
      if (this.character) this.character.position.set(-1.4, 0.1, -0.4);
      if (this.mainBlock) this.mainBlock.position.set(1.2, 1.6, 0.2);
    } else {
      this.camera.position.set(0, 2.5, 7.8);
      if (this.character) this.character.position.set(-2.2, 0.1, 0.5);
      if (this.mainBlock) this.mainBlock.position.set(1.4, 1.4, 0.4);
    }
    this.camera.lookAt(0, 1.2, 0);

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // Loop Render & Animasi Hidup
  animate(time) {
    requestAnimationFrame(this.animate);
    const delta = 0.016;
    this.animTime += delta;

    // Awan bergerak perlahan
    if (this.clouds) {
      this.clouds.children.forEach((c, idx) => {
        c.position.x += 0.002 * (idx + 1);
        if (c.position.x > 7) c.position.x = -7;
      });
    }

    // Animasi Balok Utama (Mengapung & Berotasi Santai)
    if (this.mainBlock) {
      this.mainBlock.position.y = 1.4 + Math.sin(this.animTime * 2.2) * 0.12;
      this.mainBlock.rotation.y += 0.008;
    }

    // Animasi Buah Berhitung Mengapung Berkelap-Kelip
    if (this.interactiveGroup) {
      this.interactiveGroup.children.forEach((item, idx) => {
        item.position.y += Math.sin(this.animTime * 3 + idx) * 0.003;
        item.rotation.y += 0.015;
      });
    }

    // Animasi Karakter "Kiki Si Kelinci Ceria"
    if (this.character) {
      if (this.charState === 'idle') {
        // Bernapas & Mengayun Tubuh Lembut
        this.charBody.scale.y = 1.15 + Math.sin(this.animTime * 3.5) * 0.04;
        this.charHead.position.y = 1.95 + Math.sin(this.animTime * 3.5) * 0.03;
        this.earL.rotation.z = -0.15 + Math.sin(this.animTime * 2.5) * 0.06;
        this.earR.rotation.z = 0.15 - Math.sin(this.animTime * 2.5) * 0.06;
        this.armL.rotation.x = Math.sin(this.animTime * 3) * 0.1;
        this.armR.rotation.x = -Math.sin(this.animTime * 3) * 0.1;
      } else if (this.charState === 'dance') {
        // Melompat Bahagia & Berputar saat Jawaban Benar
        const jumpY = Math.abs(Math.sin(this.animTime * 9)) * 0.7;
        this.character.position.y = 0.1 + jumpY;
        this.charHead.rotation.y = Math.sin(this.animTime * 12) * 0.25;
        this.earL.rotation.z = -0.3 + Math.sin(this.animTime * 12) * 0.3;
        this.earR.rotation.z = 0.3 - Math.sin(this.animTime * 12) * 0.3;
        this.armL.rotation.z = 1.3 + Math.sin(this.animTime * 14) * 0.4;
        this.armR.rotation.z = -1.3 - Math.sin(this.animTime * 14) * 0.4;
      } else if (this.charState === 'wave') {
        // Melambai Tangan Ceria
        this.armR.rotation.z = -1.6 + Math.sin(this.animTime * 12) * 0.4;
        this.charHead.rotation.z = 0.12 * Math.sin(this.animTime * 4);
      } else if (this.charState === 'talk') {
        // Berbicara (Mengangguk-angguk Ramah)
        this.charHead.rotation.x = Math.abs(Math.sin(this.animTime * 9)) * 0.18;
        this.earL.rotation.z = -0.15 + Math.sin(this.animTime * 6) * 0.1;
        this.earR.rotation.z = 0.15 - Math.sin(this.animTime * 6) * 0.1;
      }
    }

    // Update Konfeti Perayaan
    this.confettiParticles.forEach(p => {
      if (p.userData.active) {
        p.position.addScaledVector(p.userData.velocity, delta);
        p.rotation.x += p.userData.rotSpeed.x * delta;
        p.rotation.y += p.userData.rotSpeed.y * delta;
        p.userData.velocity.y -= 9.8 * delta * 0.55; // Gravitasi perlahan

        if (p.position.y < -0.2) {
          p.userData.active = false;
          p.visible = false;
        }
      }
    });

    this.renderer.render(this.scene, this.camera);
  }
}

