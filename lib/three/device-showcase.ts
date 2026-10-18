import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Ana sayfa 3B cihaz vitrini: MacBook + iPhone, ekranlarda gerçek proje görüntüleri.
 * Proje butonlarla seçilir (select); sürükleme çevirir; iki parmak / çift tık / Ctrl+tekerlek yakınlaştırır.
 * React her karede yeniden çizilmez: sahne kendi döngüsünde çalışır, yalnızca proje değişince onProject çağrılır.
 * lowPower (telefon): gerçek gölge kapalı, çözünürlük sınırlı; görünüm neredeyse aynı, yük çok daha az.
 */
export interface ShowcaseOptions {
  canvas: HTMLCanvasElement;
  desktopImages: string[];
  mobileImages: string[];
  onProject: (index: number) => void;
  onReady: () => void;
  onError: () => void;
  onGesture: (kind: 'rotate' | 'zoom') => void;
  reduceMotion: boolean;
  lowPower: boolean;
}

export interface ShowcaseHandle {
  setActive: (visible: boolean) => void;
  select: (index: number) => void;
  destroy: () => void;
}

const VS = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }';

// İki görsel arası yukarıdan aşağı geçiş + yuvarlak köşe + cover kırpma + çentik / Dynamic Island + cam parlaması
const SCREEN_FS = `
  uniform sampler2D a; uniform sampler2D b; uniform float mixv, aspect, radius, imgAspect, notch; varying vec2 vUv;
  float sdRound(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r; }
  void main(){
    vec2 uv = vUv; float s = aspect / imgAspect;
    if (s < 1.0) { uv.x = (uv.x - 0.5) * s + 0.5; } else { uv.y = 1.0 - (1.0 - uv.y) / s; }
    vec3 ca = texture2D(a, uv).rgb; vec3 cb = texture2D(b, uv).rgb;
    float edge = mixv * 1.4 - 0.2;
    float w = smoothstep(edge - 0.2, edge, 1.0 - vUv.y);
    vec3 c = mix(ca, cb, mixv >= 1.0 ? 0.0 : w);
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
    float d = sdRound(p, vec2(aspect, 1.0) * 0.5, radius);
    float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
    if (notch > 0.75) {
      float n = sdRound(p - vec2(0.0, 0.5), vec2(0.075, 0.035), 0.012);
      c = mix(vec3(0.0), c, smoothstep(-0.002, 0.002, n));
    } else if (notch > 0.25) {
      float n = sdRound(p - vec2(0.0, 0.462), vec2(0.075, 0.0115), 0.0115);
      c = mix(vec3(0.0), c, smoothstep(-0.002, 0.002, n));
    }
    float sheen = smoothstep(0.55, 0.0, abs((vUv.x + vUv.y * 0.6) - 0.35)) * 0.05;
    c = c * 0.96 + sheen;
    gl_FragColor = vec4(c, alpha);
    #include <colorspace_fragment>
  }`;

export function mountShowcase(o: ShowcaseOptions): ShowcaseHandle {
  const low = o.lowPower;
  const renderer = new THREE.WebGLRenderer({ canvas: o.canvas, antialias: true, alpha: true, powerPreference: low ? 'default' : 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, low ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = !low;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  scene.environment = envTex;
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);

  // Stüdyo ışığı (renkli ışık yok)
  scene.add(new THREE.HemisphereLight('#ffffff', '#222222', 0.35));
  const keyL = new THREE.DirectionalLight('#ffffff', 2.2);
  keyL.position.set(2.5, 6, 4.5);
  keyL.castShadow = !low;
  keyL.shadow.mapSize.set(2048, 2048);
  keyL.shadow.radius = 6;
  Object.assign(keyL.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 1, far: 20 });
  keyL.shadow.bias = -0.0004;
  scene.add(keyL);
  const rimL = new THREE.DirectionalLight('#ffffff', 1.4);
  rimL.position.set(-4, 3, -5);
  scene.add(rimL);

  const aluminium = new THREE.MeshPhysicalMaterial({ color: '#d7d8dc', metalness: 1, roughness: 0.32, clearcoat: 0.25, clearcoatRoughness: 0.4 });
  const aluDark = new THREE.MeshPhysicalMaterial({ color: '#9fa1a6', metalness: 1, roughness: 0.45 });
  const titanium = new THREE.MeshPhysicalMaterial({ color: '#8e8b86', metalness: 1, roughness: 0.28, clearcoat: 0.4 });
  const glassBlack = new THREE.MeshPhysicalMaterial({ color: '#050505', metalness: 0, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.03 });
  const rubber = new THREE.MeshStandardMaterial({ color: '#111', roughness: 0.9 });

  const loader = new THREE.TextureLoader();
  const n = o.desktopImages.length;
  // Görsel inene kadar ekran siyah değil, koyu gri kalır
  const placeholder = new THREE.DataTexture(new Uint8Array([18, 18, 20, 255]), 1, 1);
  placeholder.needsUpdate = true;
  const desk: THREE.Texture[] = Array.from({ length: n }, () => placeholder);
  const mob: THREE.Texture[] = Array.from({ length: n }, () => placeholder);
  const loaded: boolean[] = Array.from({ length: n }, () => false);
  let disposed = false;
  const load = (src: string) =>
    loader.loadAsync(src).then((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return t;
    });
  const loadPair = async (i: number) => {
    const [d, m] = await Promise.all([load(o.desktopImages[i]!), load(o.mobileImages[i]!)]);
    if (disposed) {
      d.dispose();
      m.dispose();
      return;
    }
    desk[i] = d;
    mob[i] = m;
    loaded[i] = true;
  };

  const screenMat = (t: THREE.Texture, aspect: number, radius: number, imgAspect: number, notch: number) =>
    new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { a: { value: t }, b: { value: t }, mixv: { value: 1 }, aspect: { value: aspect }, radius: { value: radius }, imgAspect: { value: imgAspect }, notch: { value: notch } },
      vertexShader: VS,
      fragmentShader: SCREEN_FS,
    });

  /* MacBook */
  const devices = new THREE.Group();
  scene.add(devices);
  const laptop = new THREE.Group();
  devices.add(laptop);
  const W = 3.3;
  const D = 2.3;
  const base = new THREE.Mesh(new RoundedBoxGeometry(W, 0.075, D, 6, 0.035), aluminium);
  base.castShadow = true;
  base.receiveShadow = true;
  laptop.add(base);

  const kc = document.createElement('canvas');
  kc.width = 1600;
  kc.height = 620;
  const kx = kc.getContext('2d')!;
  kx.fillStyle = '#c9cace';
  kx.fillRect(0, 0, 1600, 620);
  [14, 14, 13, 12, 10].forEach((n, r) => {
    const y = 22 + r * 116;
    const kw = (1600 - 44) / 14;
    let x = 22;
    for (let i = 0; i < n; i++) {
      let w = kw - 10;
      if (r > 1 && (i === 0 || i === n - 1)) w = kw * (r === 4 ? 1.6 : 1.45) - 10;
      if (r === 4 && i === Math.floor(n / 2)) w = kw * 4.6 - 10;
      if (x + w > 1580) w = 1578 - x;
      kx.fillStyle = '#141416';
      kx.beginPath();
      kx.roundRect(x, y, w, 100, 12);
      kx.fill();
      x += w + 10;
      if (x > 1570) break;
    }
  });
  const kt = new THREE.CanvasTexture(kc);
  kt.colorSpace = THREE.SRGBColorSpace;
  kt.anisotropy = 8;
  const kb = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.86, W * 0.86 * (620 / 1600)), new THREE.MeshStandardMaterial({ map: kt, roughness: 0.55, metalness: 0.2 }));
  kb.rotation.x = -Math.PI / 2;
  kb.position.set(0, 0.0385, -0.42);
  laptop.add(kb);
  const tp = new THREE.Mesh(new RoundedBoxGeometry(1.25, 0.004, 0.78, 4, 0.002), new THREE.MeshPhysicalMaterial({ color: '#cfd0d4', metalness: 0.9, roughness: 0.22 }));
  tp.position.set(0, 0.038, 0.62);
  laptop.add(tp);
  const lip = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.012, 0.02), aluDark);
  lip.position.set(0, 0.02, D / 2 - 0.004);
  laptop.add(lip);
  const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, W * 0.84, 24), rubber);
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, 0.05, -D / 2 + 0.03);
  laptop.add(hinge);
  const lid = new THREE.Group();
  lid.position.set(0, 0.05, -D / 2 + 0.03);
  laptop.add(lid);
  const LH = 2.22;
  const lidBack = new THREE.Mesh(new RoundedBoxGeometry(W, LH, 0.045, 6, 0.022), aluminium);
  lidBack.position.set(0, LH / 2, -0.02);
  lidBack.castShadow = true;
  lid.add(lidBack);
  const lidFront = new THREE.Mesh(new RoundedBoxGeometry(W - 0.02, LH - 0.02, 0.01, 4, 0.004), glassBlack);
  lidFront.position.set(0, LH / 2, 0.004);
  lid.add(lidFront);
  const sw = W - 0.16;
  const shh = LH - 0.16;
  const lapMat = screenMat(placeholder, sw / shh, 0.02, 1400 / 933, 1);
  const lapScreen = new THREE.Mesh(new THREE.PlaneGeometry(sw, shh), lapMat);
  lapScreen.position.set(0, LH / 2 + 0.02, 0.011);
  lid.add(lapScreen);

  /* iPhone */
  const phone = new THREE.Group();
  devices.add(phone);
  const PW = 0.98;
  const PH = 2.04;
  const PD = 0.095;
  const frame = new THREE.Mesh(new RoundedBoxGeometry(PW, PH, PD, 10, 0.15), titanium);
  frame.castShadow = true;
  phone.add(frame);
  const front = new THREE.Mesh(new RoundedBoxGeometry(PW - 0.03, PH - 0.03, 0.01, 10, 0.004), glassBlack);
  front.position.z = PD / 2 - 0.002;
  phone.add(front);
  const phMat = screenMat(placeholder, (PW - 0.09) / (PH - 0.09), 0.065, 720 / 1560, 0.5);
  const phScreen = new THREE.Mesh(new THREE.PlaneGeometry(PW - 0.09, PH - 0.09), phMat);
  phScreen.position.z = PD / 2 + 0.0045;
  phone.add(phScreen);
  const btn = (h: number, y: number, side: number) => {
    const m = new THREE.Mesh(new RoundedBoxGeometry(0.02, h, 0.035, 2, 0.008), titanium);
    m.position.set(side * (PW / 2 + 0.006), y, 0);
    phone.add(m);
  };
  btn(0.3, 0.42, 1);
  btn(0.16, 0.55, -1);
  btn(0.16, 0.33, -1);
  btn(0.09, 0.75, -1);

  // temas gölgesi + gerçek gölge
  const sc = document.createElement('canvas');
  sc.width = sc.height = 256;
  const sx = sc.getContext('2d')!;
  const sg = sx.createRadialGradient(128, 128, 0, 128, 128, 128);
  sg.addColorStop(0, 'rgba(0,0,0,0.75)');
  sg.addColorStop(0.55, 'rgba(0,0,0,0.25)');
  sg.addColorStop(1, 'rgba(0,0,0,0)');
  sx.fillStyle = sg;
  sx.fillRect(0, 0, 256, 256);
  const contactTex = new THREE.CanvasTexture(sc);
  const contact = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 4.2), new THREE.MeshBasicMaterial({ map: contactTex, transparent: true, depthWrite: false }));
  contact.rotation.x = -Math.PI / 2;
  contact.position.set(0.4, -0.04, 0.1);
  devices.add(contact);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.35 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.039;
  ground.receiveShadow = true;
  devices.add(ground);

  /* Etkileşim */
  const cv = o.canvas;
  let dragX = 0, velX = 0, dragging = false, lastX = 0, px = 0, py = 0, spx = 0, spy = 0, dragDist = 0;
  let zoom = 1, zoomT = 1;
  const ptrs = new Map<number, { x: number; y: number }>();
  let pinch0 = 0, zoom0 = 1;
  const pinchDist = () => {
    const [a, b] = [...ptrs.values()];
    return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0;
  };
  const onDown = (e: PointerEvent) => {
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    cv.setPointerCapture(e.pointerId);
    if (ptrs.size === 2) {
      dragging = false;
      pinch0 = pinchDist();
      zoom0 = zoomT;
    } else {
      dragging = true;
      lastX = e.clientX;
      dragDist = 0;
    }
  };
  const onMove = (e: PointerEvent) => {
    if (ptrs.has(e.pointerId)) ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size === 2 && pinch0 > 0) {
      zoomT = Math.max(1, Math.min(2.2, zoom0 * (pinchDist() / pinch0)));
      if (Math.abs(zoomT - zoom0) > 0.08) o.onGesture('zoom');
      return;
    }
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    dragDist += Math.abs(dx);
    velX = dx * 0.005;
    dragX = Math.max(-1.1, Math.min(1.1, dragX + velX));
    if (dragDist > 40) o.onGesture('rotate');
  };
  const onHover = (e: PointerEvent) => {
    px = (e.clientX / window.innerWidth) * 2 - 1;
    py = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onUp = (e: PointerEvent) => {
    ptrs.delete(e.pointerId);
    if (ptrs.size < 2) pinch0 = 0;
    if (ptrs.size === 0) dragging = false;
  };
  const onDbl = () => {
    zoomT = zoomT > 1.3 ? 1 : 1.8;
    o.onGesture('zoom');
  };
  // Ctrl/Cmd + tekerlek ya da trackpad sıkıştırma; normal tekerlek sayfayı kaydırır
  const onWheel = (e: WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    zoomT = Math.max(1, Math.min(2.2, zoomT * Math.exp(-e.deltaY * 0.004)));
    o.onGesture('zoom');
  };
  cv.addEventListener('pointerdown', onDown);
  cv.addEventListener('pointermove', onMove);
  cv.addEventListener('pointerup', onUp);
  cv.addEventListener('pointercancel', onUp);
  cv.addEventListener('dblclick', onDbl);
  cv.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('pointermove', onHover);

  /* Proje geçişi */
  let current = 0;
  let requested = 0;
  const show = (i: number, from: number) => {
    for (const [m, arr] of [[lapMat, desk], [phMat, mob]] as const) {
      m.uniforms.a!.value = arr[from];
      m.uniforms.b!.value = arr[i];
      m.uniforms.mixv!.value = from === i ? 1 : 0;
    }
    current = i;
    o.onProject(i);
  };
  // Shader'lar arka planda, sayfayı kilitlemeden derlenir (KHR_parallel_shader_compile); bitene kadar çizim yapılmaz
  let compiled = false;
  const compiling = renderer
    .compileAsync(scene, camera)
    .catch(() => undefined)
    .then(() => {
      compiled = true;
    });
  // İlk proje inince (ve derleme bitince) sahne görünür; diğerleri arkadan sırayla iner
  void Promise.all([loadPair(0), compiling])
    .then(() => {
      if (disposed) return;
      show(0, 0);
      o.onReady();
      return (async () => {
        for (let i = 1; i < n && !disposed; i++) await loadPair(i);
      })();
    })
    .catch(() => o.onError());
  // Yeni geçiş, önceki bitmeden başlamaz (görüntü yarıda bozulmaz); son seçilen proje sırada bekler
  const tryShowRequested = () => {
    if (requested === current || !loaded[requested]) return;
    if (lapMat.uniforms.mixv!.value < 1) return;
    show(requested, current);
  };

  const resize = () => {
    const w = cv.clientWidth;
    const h = cv.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(cv);
  resize();

  const ease = (x: number) => 1 - Math.pow(1 - x, 3);
  const easeIO = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const clock = new THREE.Clock();
  const reduce = o.reduceMotion;
  let openT = reduce ? 1 : 0;
  let camZ: number | null = null;
  let raf = 0;
  let active = false;

  const frameLoop = () => {
    raf = requestAnimationFrame(frameLoop);
    if (!compiled) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    if (loaded[0]) tryShowRequested();

    // Kapak, ilk proje görseli inince yavaşça (~3,2 sn) açılır; ziyaretçi açılışı görür
    if (loaded[0]) openT = Math.min(1, openT + dt * 0.31);
    lid.rotation.x = THREE.MathUtils.lerp(Math.PI / 2 - 0.02, -0.28, easeIO(openT));
    for (const m of [lapMat, phMat]) {
      m.uniforms.mixv!.value = Math.min(1, m.uniforms.mixv!.value + dt * 1.4);
      if (m.uniforms.mixv!.value >= 1) m.uniforms.a!.value = m.uniforms.b!.value;
    }

    if (!dragging) {
      velX *= 0.92;
      dragX += velX;
      dragX *= 0.97;
    }
    spx += (px - spx) * 0.05;
    spy += (py - spy) * 0.05;
    const sway = reduce ? 0 : Math.sin(t * 0.35) * 0.06;
    devices.rotation.y = -0.32 + dragX + spx * 0.1 + sway;
    devices.rotation.x = spy * 0.03;

    // Dar alan (telefon): iPhone laptopun önüne gelir. Kamera mesafesi alanı dolduracak şekilde hesaplanır
    const narrow = camera.aspect < 1.25;
    // Telefonda iPhone laptopun önüne ve sağına gelir; ikisi de büyük ve ekranın içinde kalır
    const phx = narrow ? 1.5 : 2.05;
    const phz = narrow ? 1.3 : 0.85;
    const phry = narrow ? -0.24 : -0.42;
    phone.position.set(phx, (narrow ? 0.98 : 1.02) + (reduce ? 0 : Math.sin(t * 1.1) * 0.03), phz);
    phone.rotation.set(-0.04, phry + (reduce ? 0 : Math.sin(t * 0.7) * 0.03), 0);

    devices.position.set(narrow ? 0.2 : -0.35, narrow ? -0.6 : -0.95, 0);
    zoom += (zoomT - zoom) * 0.12;
    // fov 30°: görünen yükseklik ≈ 0.536·z, genişlik ≈ 0.536·z·aspect → hem yükseklik hem genişlik sığar
    const fitZ = Math.max(narrow ? 6.6 : 6.5, (narrow ? 9.4 : 11.2) / camera.aspect);
    const baseZ = fitZ * (1 + (1 - ease(openT)) * 0.18);
    const targetZ = baseZ / zoom;
    camZ = camZ === null ? targetZ : camZ + (targetZ - camZ) * 0.08;
    const lookX = 0.3;
    camera.position.set(lookX, (narrow ? 2.0 : 1.9) / Math.sqrt(zoom), camZ);
    camera.lookAt(lookX, narrow ? 0.35 : 0.12, 0);

    renderer.render(scene, camera);
  };

  return {
    // Ekran dışındayken çizim durur (pil ve işlemci tasarrufu)
    select(index) {
      requested = Math.max(0, Math.min(n - 1, index));
    },
    setActive(visible) {
      if (visible === active) return;
      active = visible;
      if (visible) {
        clock.getDelta();
        raf = requestAnimationFrame(frameLoop);
      } else cancelAnimationFrame(raf);
    },
    destroy() {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.removeEventListener('pointerdown', onDown);
      cv.removeEventListener('pointermove', onMove);
      cv.removeEventListener('pointerup', onUp);
      cv.removeEventListener('pointercancel', onUp);
      cv.removeEventListener('dblclick', onDbl);
      cv.removeEventListener('wheel', onWheel);
      window.removeEventListener('pointermove', onHover);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
      new Set([...desk, ...mob, placeholder, kt, contactTex, envTex]).forEach((t) => t.dispose());
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
