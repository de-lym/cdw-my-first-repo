
const letterContent = {
  h: {
    title: 'home.txt',
    html: `
      <p class="window-label">home</p>
      <p>Homepage · Dong Eun Lim · 2026.</p>
      <p>This page explores various digital canvases and interactive experiences.</p>
    `,
  },
  o: {
    title: 'origin.txt',
    html: `
      <p class="window-label">origin</p>
      <p>Inspired by the Dreamcore aesthetics, which is a visual style characterized by a blend of nostalgic and surreal elements that emerged in the early 2020s focusing on visuals inspired by dreams and the subconscious.</p>
    `,
  },
  m: {
    title: 'motivation.txt',
    html: `
      <p class="window-label">motivation</p>
      <p>to be updated</p>
    `,
  },

  // 2D spatial canvases (p5.js) — content behind the '3' bubble
  e: {
    title: 'canvas-2d.p5',
    html: `
      <p class="window-label">2d spatial canvas</p>
      <p>Two studies in flat depth, built in p5.js — a still composition and a slow, drifting one.</p>
      <div class="canvas-block">
        <p class="canvas-caption">study 01 — static constellation</p>
        <div class="p5-container" data-sketch="static"></div>
      </div>
      <div class="canvas-block">
        <p class="canvas-caption">study 02 — drifting particles · click to disturb them</p>
        <div class="p5-container" data-sketch="animated"></div>
      </div>
    `,
  },
  p: {
    title: 'project.txt',
    html: `
      <p class="window-label">abstract</p>
      <p>Lorem ipsum drifts like fog through empty corridors. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
    `,
  },

  // 3D spatial canvases (three.js) — content behind the '@' bubble
  a: {
    title: 'canvas-3d.three',
    html: `
      <p class="window-label">3d spatial canvas</p>
      <p>Two orbiting fragments, built in three.js — drag inside a canvas to rotate the camera.</p>
      <div class="canvas-block">
        <p class="canvas-caption">study 01 — floating primitives, orbit camera</p>
        <div class="three-container" data-sketch="orbit"></div>
      </div>
      <div class="canvas-block">
        <p class="canvas-caption">study 02 — material, light &amp; fog · click a satellite to pulse it</p>
        <div class="three-container" data-sketch="atmosphere"></div>
      </div>
    `,
  },
  g: {
    title: 'gallery.txt',
    html: `
      <p class="window-label">gallery</p>
      <div class="gallery-grid">
        <div class="gallery-item">memory lane</div>
        <div class="gallery-item">strange clouds</div>
        <div class="gallery-item">private pool</div>
        <div class="gallery-item">tree-lined street</div>
      </div>
    `,
  },
  e2: {
    title: 'pool.exe',
    html: `
      <p class="window-label">interactive demo</p>
      <p>Press the button. Something might happen.</p>
      <button type="button" class="pool-btn">enter the pool →</button>
      <p class="pool-output"></p>
    `,
  },
};

// default popup footprint per content key — canvas popups start larger
const DEFAULT_SIZES = {
  e: { width: 420, height: 640 },
  a: { width: 420, height: 640 },
  g: { width: 360, height: 380 },
  e2: { width: 360, height: 300 },
  DEFAULT: { width: 360, height: 320 },
};

// variables to manage popup windows
let popupCount = 0;
let topZ = 50;

// brings a popup to the front and gives it focus
function focusPopup(popup) {
  topZ += 1;
  popup.style.zIndex = topZ;
  document.querySelectorAll('.popup-window').forEach(function (win) {
    win.classList.remove('focused');
  });
  popup.classList.add('focused');
}

// makes a popup draggable by its header bar
function makeDraggable(popup, handle) {
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;

  // mouse down on the handle starts dragging
  handle.addEventListener('mousedown', function (e) {
    if (e.target.closest('.close-btn')) return;

    dragging = true;
    focusPopup(popup);

    startX = e.clientX;
    startY = e.clientY;
    originX = popup.offsetLeft;
    originY = popup.offsetTop;

    e.preventDefault();
  });

  // mouse move moves the popup if dragging
  window.addEventListener('mousemove', function (e) {
    if (!dragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    popup.style.left = `${originX + dx}px`;
    popup.style.top = `${originY + dy}px`;
  });

  // mouse up stops dragging
  window.addEventListener('mouseup', function () {
    dragging = false;
  });
}

// adds 8 drag handles (sides + corners) so the popup can be scaled like a real window
function makeResizable(popup) {
  const MIN_WIDTH = 260;
  const MIN_HEIGHT = 180;
  const directions = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

  // create a handle for each direction and add event listeners for resizing
  directions.forEach(function (dir) {
    const handle = document.createElement('div');
    handle.className = 'resize-handle resize-' + dir;
    popup.appendChild(handle);

    // mouse down on a handle starts resizing
    handle.addEventListener('mousedown', function (e) {
      e.stopPropagation();
      e.preventDefault();
      focusPopup(popup);
      popup.classList.add('resizing');

      // store the initial mouse position and popup dimensions
      const startX = e.clientX;
      const startY = e.clientY;
      const rect = popup.getBoundingClientRect();
      const startWidth = rect.width;
      const startHeight = rect.height;
      const startLeft = popup.offsetLeft;
      const startTop = popup.offsetTop;

      // mouse move resizes the popup based on the handle direction
      function onMove(ev) {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;

        // calculate new dimensions and position based on the handle direction
        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;

        // adjust width and height based on the handle direction
        if (dir.indexOf('e') !== -1) {
          newWidth = Math.max(MIN_WIDTH, startWidth + dx);
        }
        if (dir.indexOf('w') !== -1) {
          newWidth = Math.max(MIN_WIDTH, startWidth - dx);
          newLeft = startLeft + (startWidth - newWidth);
        }
        if (dir.indexOf('s') !== -1) {
          newHeight = Math.max(MIN_HEIGHT, startHeight + dy);
        }
        if (dir.indexOf('n') !== -1) {
          newHeight = Math.max(MIN_HEIGHT, startHeight - dy);
          newTop = startTop + (startHeight - newHeight);
        }

        // apply the new dimensions and position to the popup
        popup.style.width = `${newWidth}px`;
        popup.style.height = `${newHeight}px`;
        popup.style.left = `${Math.max(0, newLeft)}px`;
        popup.style.top = `${Math.max(0, newTop)}px`;
      }

      // mouse up stops resizing and removes the event listeners
      function onUp() {
        popup.classList.remove('resizing');
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      }

      // add event listeners for mouse move and mouse up
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    });
  });
}

/* ────────────────────────────────────────────────────────────
   2D spatial canvases (p5.js) — content behind the '3' bubble
   ──────────────────────────────────────────────────────────── */

// returns a width and height for a canvas based on the container's size
function containerSize(container) {
  const w = Math.max(120, container.clientWidth || 300);
  const h = Math.max(120, Math.round(w * 0.68));
  return { w, h };
}

// study 01 — a still, primitive composition
function initP5Static(container) {
  new p5(function (p) {
    p.setup = function () {
      const { w, h } = containerSize(container);
      const c = p.createCanvas(w, h);
      c.parent(container);
      p.noLoop();
    };

    // draws a static composition of simple shapes with a grid background
    p.draw = function () {
      p.background('#f5efe6');

      p.noStroke();
      p.fill('#c9a7e0');
      p.ellipse(p.width * 0.32, p.height * 0.42, p.width * 0.4);

      p.fill('#a8c8e8');
      p.rectMode(p.CENTER);
      p.rect(p.width * 0.68, p.height * 0.6, p.width * 0.3, p.width * 0.3, 14);

      p.fill('#f5d4c8');
      p.triangle(
        p.width * 0.5, p.height * 0.12,
        p.width * 0.32, p.height * 0.48,
        p.width * 0.68, p.height * 0.48
      );

      p.noFill();
      p.stroke('#2a2040');
      p.strokeWeight(1);
      p.circle(p.width * 0.5, p.height * 0.52, p.width * 0.78);

      p.noStroke();
      p.fill('#2a2040');
      for (let i = 0; i < 8; i++) {
        const a = (p.TWO_PI / 8) * i;
        const x = p.width * 0.5 + Math.cos(a) * p.width * 0.39;
        const y = p.height * 0.52 + Math.sin(a) * p.width * 0.39;
        p.circle(x, y, 4);
      }
    };

    // resize the canvas when the container is resized
    container._resize = function () {
      const { w, h } = containerSize(container);
      p.resizeCanvas(w, h);
      p.redraw();
    };

    // dispose of the p5 instance when the popup is closed
    container._dispose = function () {
      p.remove();
    };
  });
}

// study 02 — slow drifting particles that respond to clicks:
// a click sends nearby particles scattering, sparks a small burst
function initP5Animated(container) {
  new p5(function (p) {
    let particles = [];
    let bursts = [];

    // seeds the ambient particles with random positions, sizes, and speeds
    function seedParticles() {
      particles = [];
      const count = Math.max(24, Math.round((p.width * p.height) / 9000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: p.random(p.width),
          y: p.random(p.height),
          r: p.random(2, 6),
          speed: p.random(0.15, 0.6),
          drift: p.random(-0.3, 0.3),
          vx: 0,
          vy: 0,
        });
      }
    }

    // spawns a burst of small particles at the given (x, y) position
    function spawnBurst(x, y) {
      const count = Math.round(p.random(10, 16));
      for (let i = 0; i < count; i++) {
        const angle = p.random(p.TWO_PI);
        const speed = p.random(0.6, 2.4);
        bursts.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: p.random(2, 5),
          life: 50,
          maxLife: 50,
        });
      }
    }

    // nearby particles are repelled by a click, with a force that falls off with distance
    function repelAmbient(x, y) {
      particles.forEach(function (pt) {
        const dx = pt.x - x;
        const dy = pt.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 150) {
          const force = (1 - dist / 150) * 3.6;
          pt.vx += (dx / dist) * force;
          pt.vy += (dy / dist) * force;
        }
      });
    }

    // p5.js setup and draw functions
    p.setup = function () {
      const { w, h } = containerSize(container);
      const c = p.createCanvas(w, h);
      c.parent(container);
      p.colorMode(p.RGB, 255, 255, 255, 255);
      p.textFont('monospace');
      p.textAlign(p.CENTER, p.CENTER);
      seedParticles();
    };

    // draws the ambient particles and any active bursts, updating their positions each frame
    p.draw = function () {
      p.noStroke();
      p.fill(245, 239, 230, 55);
      p.rect(0, 0, p.width, p.height);

      // ambient drift, gently kicked by nearby clicks
      particles.forEach(function (pt) {
        pt.vx *= 0.92;
        pt.vy *= 0.92;
        pt.x += pt.drift + pt.vx;
        pt.y -= pt.speed - pt.vy;
        if (pt.y < -10) pt.y = p.height + 10;
        if (pt.x < -10) pt.x = p.width + 10;
        if (pt.x > p.width + 10) pt.x = -10;

        p.fill(180, 150, 210, 160);
        p.circle(pt.x, pt.y, pt.r * 2);
      });

      // spark burst from the click itself
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.95;
        b.vy *= 0.95;
        b.life -= 1;
        const alpha = p.map(b.life, 0, b.maxLife, 0, 210);
        p.fill(139, 111, 168, alpha);
        p.circle(b.x, b.y, b.r * 2);
        if (b.life <= 0) bursts.splice(i, 1);
      }
    };

    // mouse click spawns a burst and repels nearby ambient particles
    p.mousePressed = function () {
      if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) return;
      spawnBurst(p.mouseX, p.mouseY);
      repelAmbient(p.mouseX, p.mouseY);
    };

    // resize the canvas when the container is resized
    container._resize = function () {
      const { w, h } = containerSize(container);
      p.resizeCanvas(w, h);
      seedParticles();
    };

    // dispose of the p5 instance when the popup is closed
    container._dispose = function () {
      p.remove();
    };
  });
}

/* ────────────────────────────────────────────────────────────
   3D spatial canvases (three.js) — content behind the '@' bubble
   ──────────────────────────────────────────────────────────── */

// study 01 — floating primitives with an orbit camera
function initThreeOrbit(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#dccdec');

  // camera setup
  const { w, h } = containerSize(container);
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
  camera.position.set(3.6, 2.6, 5.6);

  // renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h);
  container.appendChild(renderer.domElement);

  // OrbitControls allow the user to rotate the camera around the scene with mouse drag
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxDistance = 12;

  // lighting setup
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const key = new THREE.DirectionalLight(0xffffff, 1);
  key.position.set(3, 5, 2);
  scene.add(key);

  // create a group of floating primitives
  const group = new THREE.Group();
  const geos = [
    new THREE.IcosahedronGeometry(0.7, 0),
    new THREE.TorusGeometry(0.5, 0.2, 16, 32),
    new THREE.OctahedronGeometry(0.65, 0),
  ];

  // assign a different color to each primitive and position them in a circle
  const colors = [0xc9a7e0, 0xa8c8e8, 0xf5d4c8];
  geos.forEach(function (geo, i) {
    const mat = new THREE.MeshStandardMaterial({ color: colors[i], roughness: 0.4, metalness: 0.15 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set((i - 1) * 1.7, Math.sin(i) * 0.3, 0);
    group.add(mesh);
  });
  scene.add(group);

  // add a ground plane for visual reference
  const groundGeo = new THREE.CircleGeometry(4, 48);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0xf0e8f5, roughness: 0.9 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.1;
  scene.add(ground);

  // animation loop
  let running = true;
  let rafId = null;

  // animate the group of primitives and update the controls
  function animate() {
    if (!running) return;
    rafId = requestAnimationFrame(animate);
    group.rotation.y += 0.004;
    group.children.forEach(function (mesh, i) {
      mesh.position.y = Math.sin(Date.now() * 0.0008 + i) * 0.25;
    });
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // resize the renderer and camera when the container is resized
  container._resize = function () {
    const size = containerSize(container);
    camera.aspect = size.w / size.h;
    camera.updateProjectionMatrix();
    renderer.setSize(size.w, size.h);
  };

  // dispose of the scene and renderer when the popup is closed
  container._dispose = function () {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    controls.dispose();
    renderer.dispose();
    geos.forEach(function (g) { g.dispose(); });
    groundGeo.dispose();
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}

// study 02 — material, lighting & fog study.
// A lit sphere orbited by a ring of glowing satellites under a dramatic
// spotlight (with shadows) and a cool rim light. Move the pointer to swing
// the spotlight, click a satellite (or the sphere) to make it pulse and
// throw its color into the scene's point light.
function initThreeAtmosphere(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#12101f');
  scene.fog = new THREE.FogExp2(0x12101f, 0.13);

  // camera setup
  const { w, h } = containerSize(container);
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
  camera.position.set(0, 1.6, 6.4);

  // renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // OrbitControls allow the user to rotate the camera around the scene with mouse drag
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 3.5;
  controls.maxDistance = 11;

  // ── dramatic lighting: dim ambient fill, a cool rim light from behind,
  //    a hard-edged spotlight that casts shadows, and a warm point light
  //    that reacts to clicks ──
  scene.add(new THREE.AmbientLight(0x8b6fa8, 0.16));

  // directional rim light from behind the scene, giving a subtle glow to the edges of objects
  const rimLight = new THREE.DirectionalLight(0x88aaff, 0.65);
  rimLight.position.set(-4, 3, -4);
  scene.add(rimLight);

  // spotlight from above, casting shadows and highlighting the central sphere
  const spot = new THREE.SpotLight(0xffffff, 3.4, 22, Math.PI / 6, 0.45, 1.4);
  spot.position.set(2.5, 5, 2.5);
  spot.castShadow = true;
  spot.shadow.mapSize.set(1024, 1024);
  scene.add(spot);
  scene.add(spot.target);

  // point light that pulses when a satellite or the sphere is clicked
  const pulseLight = new THREE.PointLight(0xf5d4c8, 1.6, 12);
  pulseLight.position.set(0, 1.2, 2);
  scene.add(pulseLight);

  // ── objects: a central sphere, a thin halo ring, and six orbiting
  //    satellites in the site's accent palette ──
  const sphereGeo = new THREE.SphereGeometry(1, 48, 48);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xa8c8e8, roughness: 0.15, metalness: 0.65,
    emissive: 0x16233a, emissiveIntensity: 0.3,
  });

  // create the central sphere mesh, enable shadows, and add it to the scene
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  scene.add(sphere);

  // create a thin torus ring mesh to orbit around the sphere, and add it to the scene
  const ringGeo = new THREE.TorusGeometry(1.9, 0.035, 16, 100);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xc9a7e0, roughness: 0.3, metalness: 0.5,
    emissive: 0x2a1a40, emissiveIntensity: 0.3,
  });

  // create the ring mesh, rotate it to be horizontal, and add it to the scene
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2.3;
  scene.add(ring);

  // create six small satellite spheres in the accent color palette, each with its own orbit radius, speed, and tilt
  const accentColors = [0xc9a7e0, 0xa8c8e8, 0xf5d4c8, 0xffe49a, 0xa8e6a8, 0xff9a9a];
  const satellites = accentColors.map(function (color, i) {
    const geo = new THREE.SphereGeometry(0.15, 20, 20);
    const mat = new THREE.MeshStandardMaterial({
      color, roughness: 0.3, metalness: 0.2,
      emissive: color, emissiveIntensity: 0.35,
    });

    // create the satellite mesh, enable shadows, and add it to the scene
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.userData.orbitRadius = 2.1 + (i % 3) * 0.5;
    mesh.userData.orbitSpeed = 0.28 + i * 0.05;
    mesh.userData.orbitOffset = i * ((Math.PI * 2) / accentColors.length);
    mesh.userData.orbitTilt = i % 2 === 0 ? 0.4 : -0.5;
    scene.add(mesh);
    return mesh;
  });

  // create a floor plane to receive shadows, positioned below the sphere and satellites
  const floorGeo = new THREE.PlaneGeometry(30, 30);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x1a1730, roughness: 0.95 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.3;
  floor.receiveShadow = true;
  scene.add(floor);

  // ── interaction: pointer swings the spotlight, click pulses an object ──
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const pulses = [];
  let pointerActive = false;

  // read the pointer position and convert it to normalized device coordinates
  function readPointer(evt) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((evt.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((evt.clientY - rect.top) / rect.height) * 2 + 1;
    pointerActive = true;
  }

  // pointer move event handler updates the pointer position
  function onPointerMove(evt) {
    readPointer(evt);
  }

  // pointer down event handler checks for intersections with satellites or the sphere, and triggers a pulse effect
  function onPointerDown(evt) {
    readPointer(evt);
    raycaster.setFromCamera(pointer, camera);

    // check for intersections with satellites and the central sphere
    const hits = raycaster.intersectObjects(satellites.concat([sphere]));
    if (hits.length) {
      const hit = hits[0].object;
      pulses.push({ mesh: hit, t: 0 });
      pulseLight.color.setHex(hit.material.color.getHex());
      pulseLight.intensity = 3.4;
    } else {
      const next = accentColors[Math.floor(Math.random() * accentColors.length)];
      pulseLight.color.setHex(next);
      pulseLight.intensity = 2.4;
    }
  }

  // add event listeners for pointer move and pointer down events on the renderer's DOM element
  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('pointerdown', onPointerDown);

  // allows the animation to be stopped when the pop-up browser closes
  let running = true;
  let rafId = null;

  // creates the main animation loop for the Three.js scene
  function animate() {
    if (!running) return;
    rafId = requestAnimationFrame(animate);

    // get current time into seconds for the consistent animation movements
    const t = Date.now() * 0.001;

    // rotate the sphere slightly every frame and slowly rotates the ring
    sphere.rotation.y += 0.004;
    ring.rotation.z += 0.0015;

    // updates every satellite position to allow them orbit independently
    satellites.forEach(function (mesh) {
      const o = mesh.userData;
      const angle = t * o.orbitSpeed + o.orbitOffset;
      
      // creates realistic orviting movement using sine and cosine
      mesh.position.set(
        Math.cos(angle) * o.orbitRadius,
        Math.sin(angle * 1.3) * o.orbitTilt + 0.3,
        Math.sin(angle) * o.orbitRadius
      );
    });

    if (pointerActive) {
      spot.target.position.x += (pointer.x * 2.4 - spot.target.position.x) * 0.05;
      spot.target.position.z += (-pointer.y * 2.4 - spot.target.position.z) * 0.05;
    }

    pulseLight.intensity += (1.6 - pulseLight.intensity) * 0.03;

    for (let i = pulses.length - 1; i >= 0; i--) {
      const pulse = pulses[i];
      pulse.t += 0.05;
      const eased = Math.sin(Math.min(pulse.t, 1) * Math.PI);
      pulse.mesh.scale.setScalar(1 + eased * 0.6);
      pulse.mesh.material.emissiveIntensity = 0.35 + eased * 1.2;
      if (pulse.t >= 1) {
        pulse.mesh.scale.setScalar(1);
        pulse.mesh.material.emissiveIntensity = 0.35;
        pulses.splice(i, 1);
      }
    }

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  container._resize = function () {
    const size = containerSize(container);
    camera.aspect = size.w / size.h;
    camera.updateProjectionMatrix();
    renderer.setSize(size.w, size.h);
  };

  container._dispose = function () {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    renderer.domElement.removeEventListener('pointermove', onPointerMove);
    renderer.domElement.removeEventListener('pointerdown', onPointerDown);
    controls.dispose();
    renderer.dispose();
    sphereGeo.dispose();
    ringGeo.dispose();
    floorGeo.dispose();
    satellites.forEach(function (mesh) {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}

// wires up canvases for popups that need them, and keeps them in sync with resizing
function attachDynamicCanvases(popup, key) {
  let containers = [];

  if (key === 'e') {
    containers = Array.from(popup.querySelectorAll('.p5-container'));
    if (containers[0]) initP5Static(containers[0]);
    if (containers[1]) initP5Animated(containers[1]);
  } else if (key === 'a') {
    containers = Array.from(popup.querySelectorAll('.three-container'));
    if (containers[0]) initThreeOrbit(containers[0]);
    if (containers[1]) initThreeAtmosphere(containers[1]);
  }

  if (!containers.length) return;

  let frame = null;
  const ro = new ResizeObserver(function () {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(function () {
      containers.forEach(function (c) {
        if (c._resize) c._resize();
      });
    });
  });
  ro.observe(popup);

  popup._canvasCleanup = function () {
    ro.disconnect();
    containers.forEach(function (c) {
      if (c._dispose) c._dispose();
    });
  };
}

/* ──────────────────────────────────────────────────────────── */

function openPopup(key, anchorRect) {
  const content = letterContent[key];
  if (!content) return;

  const layer = document.getElementById('popupLayer');
  popupCount += 1;

  const size = DEFAULT_SIZES[key] || DEFAULT_SIZES.DEFAULT;
  const offset = ((popupCount - 1) % 5) * 24;
  const popup = document.createElement('div');
  popup.className = 'popup-window';

  const left = anchorRect
    ? Math.min(anchorRect.left + offset, window.innerWidth - size.width - 16)
    : 48 + offset;
  const top = anchorRect
    ? Math.min(anchorRect.top + offset, window.innerHeight - size.height - 16)
    : 80 + offset;

  popup.style.left = `${Math.max(16, left)}px`;
  popup.style.top = `${Math.max(16, top)}px`;
  popup.style.width = `${size.width}px`;
  popup.style.height = `${size.height}px`;

  popup.innerHTML = `
    <div class="window-bar">
      <button type="button" class="dot red close-btn" aria-label="Close window"></button>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span class="window-title">${content.title}</span>
    </div>
    <div class="window-body">${content.html}</div>
  `;

  popup.querySelector('.close-btn').addEventListener('click', function () {
    popup.classList.remove('open');
    popup.classList.add('closing');
    if (popup._canvasCleanup) popup._canvasCleanup();
    setTimeout(function () {
      popup.remove();
    }, 240);
  });

  popup.addEventListener('mousedown', function () {
    focusPopup(popup);
  });

  const poolBtn = popup.querySelector('.pool-btn');
  if (poolBtn) {
    poolBtn.addEventListener('click', function () {
      document.body.classList.add('dream-mode');
      const output = popup.querySelector('.pool-output');
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const line = dreamMessages[Math.floor(Math.random() * dreamMessages.length)];
      output.textContent = `[ ${time} ] ${line}`;
    });
  }

  layer.appendChild(popup);
  makeDraggable(popup, popup.querySelector('.window-bar'));
  makeResizable(popup);

  requestAnimationFrame(function () {
    popup.classList.add('open');
    focusPopup(popup);
    attachDynamicCanvases(popup, key);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.bubble').forEach(function (bubble) {
    bubble.addEventListener('click', function () {
      const key = bubble.dataset.letter;
      openPopup(key, bubble.getBoundingClientRect());
    });
  });
});
