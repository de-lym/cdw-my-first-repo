
const letterContent = {
  d: {
    title: 'home.txt',
    html: `
      <p class="window-label">home</p>
      <p>Dreaming · Dong Eun Lim · 2026.</p>
      <p>This project began with the visual aesthetic of Dreamcore, an internet aesthetic characterized by surreal, nostalgic, and liminal imagery that evokes the ambiguous feeling of dreams. Inspired by the Dreamcore aesthetic, the project expands beyond visual style to investigate dreams as a subject through interactive media and data visualization.</p>
      <p>The website combines creative coding, data visualization, and user participation to present multiple perspectives on dreaming. It includes interactive 2D and 3D shape explorations created with p5.js, data visualizations built with D3.js that illustrate sleep stages and dream theories, a geographic visualization of average sleeping hours across different countries using Mapbox, and a collaborative "Build Your Dream" page where anonymous visitor submissions are collected through Firebase and transformed into an evolving word puzzle.</p>
      <p>Rather than presenting dreams as a single narrative, the project creates a digital space where scientific research, psychological theories, personal experiences, and abstract visual forms coexist. Through interaction and exploration, visitors are invited to navigate the fluid boundaries between reality, memory, imagination, and dreams.</p>
    `,
  },

  r: {
    title: 'motivation.txt',
    html: `
      <p class="window-label">motivation</p>
      <p>Dreams are deeply personal experiences, yet they have also been studied through psychology, neuroscience, and cultural interpretation for centuries. While Dreamcore initially attracted me through its distinctive visual language, I became interested in the broader question of how dreams can be represented beyond images alone.</p>
      <p>This project explores the intersection of subjective experience and objective data. By combining interactive visualizations with information about sleep, dream theories, and global sleeping habits, I aim to connect emotional, scientific, and social perspectives on dreaming. At the same time, the anonymous dream submission feature allows visitors to contribute their own experiences, transforming the website into a continuously evolving collective archive.</p>
      <p>Ultimately, the project investigates how interactive technology and data visualization can communicate concepts that are often intangible and difficult to describe. It invites users to explore dreams not only as individual memories, but also as shared human experiences that exist between imagination, research, and digital interaction.</p>
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

  // Build Your Dream — the word-composer / dream archive project, behind the 'p' bubble.
  // It's a full standalone page (own fonts, its own :root color variables like --ink and
  // --sky-top which collide by name with this site's, its own #goo SVG filter, its own
  // Firebase wiring). Rather than merge that CSS/JS into the host page and risk those
  // collisions, it's loaded in an iframe — dream-composer.html/.css/.js, served alongside
  // index.html — so it stays fully sandboxed and behaves exactly as it does standalone.
  m: {
    title: 'build-your-dream.html',
    html: `
      <div class="dream-embed">
        <iframe src="dream-composer.html" title="Build Your Dream" loading="lazy"></iframe>
      </div>
    `,
  },

  // Dream data chart (D3.js) - content behind the '0' bubble
  i: {
    title: 'data-chart.txt',
    html: `
      <p class="window-label">Dreaming Trajectory</p>
      <p>Using recorded sleep session in the DREAM archive, aligned to its own onset and overlaid. 
      x coordinates present the overall duration of sleep, while y coordinates present the level of sleep from wake to N3, deep sleep.
      As you rest on one, <span class="accents"><strong>it lifts out of the noise and glows</strong></span>, tracing individual dream-depth journey, 
      along with every moment it recalled a dream and the subject behind the session. [source by DREAM database, Monash Bridges]</p><br>
      <div class="legend">
        <span><span class="sw" style="background:var(--cool);"></span>wake</span>
        <span><span class="sw" style="background:var(--mid);"></span>REM</span>
        <span><span class="sw" style="background:var(--warm);"></span>N1</span>
        <span><span class="sw" style="background:var(--warmer);"></span>N2</span>
        <span><span class="sw" style="background:var(--accents);"></span>N3, deep</span>
      </div>
      <svg id="chart"></svg>
      <div class="statusbar"><span id="status-left"></span></div>
      <div id="tip"></div>
    `,
  },

  // Dream Theory network diagram (D3.js, force layout + 3D-ish rotation) — content behind the 'g' bubble.
  // Everything the diagram needs — its own color variables, its own layout rules — lives inside
  // ".network-diagram" below, so it can't be affected by (or accidentally affect) the rest of the
  // site's stylesheet. That's also what makes the white background easy: these CSS variables are
  // scoped to this popup only, so flipping them here doesn't touch anything else on the page.
  n: {
    title: 'actor network diagram.txt',
    html: `
      <div class="network-diagram">

        <!-- ── markup: header (title + legend + hint), the force-diagram canvas, and the
             floating info card that appears on hover. initNetworkDiagram() in script.js
             fills the #legend / #line-legend / svg contents in and drives everything. ── -->
        <div class="nd-stage">
          <header>
            <div class="header-text">
              <h1>A Relational Structure of Dream Theory</h1>
              <p>An interactive diagram that visualizes  how dream theory was founded, contested, and carried into art, therapy, and science from the temple incubation to activation-synthesis.</p>
            </div>
            <div class="header-right">
              <div id="legend-panel">
                <div class="legend-group">
                  <div class="legend-group-title">Category</div>
                  <div id="legend" class="legend-row-wrap"></div>
                </div>
                <div class="legend-group">
                  <div class="legend-group-title">Connection</div>
                  <div id="line-legend" class="legend-row-wrap"></div>
                </div>
              </div>
              <div id="hint">drag a label to rotate · drag canvas to pan · scroll / pinch to zoom · click a box to focus · double-click canvas to reset</div>
            </div>
          </header>

          <svg></svg>

          <div id="cursor-card">
            <div class="eyebrow" id="card-cat"></div>
            <h2 id="card-label"></h2>
            <p id="card-desc"></p>
          </div>
        </div>
      </div>
    `,
  },

  // Nightfall sleep map (Mapbox GL) — content behind the last 'e' bubble.
  // Same isolation strategy as the 'g' network diagram: everything the map
  // needs — its own color variables, its own layout rules — lives inside
  // ".nightfall-embed" in the stylesheet, so it can't be affected by (or
  // accidentally affect) the rest of the site. That scoping is also what
  // makes it easy to force this one popup's background to white while
  // leaving the rest of the page untouched, and to keep Nightfall's own
  // accent color codes as-is even though the neutrals had to flip for
  // contrast on white. initNightfallMap() in this file fills in the map.
  g: {
    title: 'nightfall.map',
    html: `
      <div class="nightfall-embed">
        <div class="nf-stage">
          <header>
            <p class="nf-eyebrow">Digital Object 4 — Geospatial Structures</p>
            <h1 class="nf-title">Nightfall<span class="nf-dim">.</span></h1>
            <p class="nf-sub">A world atlas of how long people sleep, and when they go to bed.</p>
          </header>

          <div class="nf-map-panel">
            <div id="sleep-map"></div>
            <div class="nf-legend">
              <div class="nf-legend-title">Avg. time in bed / night</div>
              <div class="nf-legend-bar" aria-hidden="true"></div>
              <div class="nf-legend-labels">
                <span>5h 52m<br><em>Japan</em></span>
                <span>7h 27m<br><em>New Zealand</em></span>
              </div>
              <div class="nf-legend-note">Grey = no comparable data</div>
            </div>
            <div class="nf-map-caption">Hover or tap a country to see its average time in bed and typical bedtime.</div>
          </div>

          <div class="nf-writeup">
            <p>Each country is shaded by its average nightly time in bed, drawn from a 48-market sleep-tracking study. Warm amber marks the least rest, cool violet marks the most, and boundaries unmatched to the dataset stay unlit.</p>
          </div>
        </div>
      </div>
    `,
  },

  // Gallery — parked for now, not wired to a bubble. To bring it back:
  // 1. pick a free key below (e.g. 'e3') and uncomment this block under that key
  // 2. add a new <button class="bubble" data-letter="e3" ...> in index.html
  // 3. optionally give it its own entry in DEFAULT_SIZES below (it'll
  //    otherwise fall back to DEFAULT: 360x320, which is what it was sized for)
  //
  // e3: {
  //   title: 'gallery.jpg',
  //   html: `
  //     <p class="window-label">gallery</p>
  //       <div class="gallery-grid">
  //         <div class="gallery-item">memory lane</div>
  //         <div class="gallery-item">strange clouds</div>
  //         <div class="gallery-item">private pool</div>
  //         <div class="gallery-item">tree-lined street</div>
  //       </div>
  //   `,
  // },
};

// default popup footprint per content key — canvas popups start larger
const DEFAULT_SIZES = {
  e: { width: 420, height: 640 },
  a: { width: 420, height: 640 },
  g: { width: 870, height: 640 },
  g: { width: 760, height: 640 },
  m: { width: 480, height: 680 },
  DEFAULT: { width: 360, height: 320 },
};

// lines shown by the pool.exe demo when its button is pressed
// const dreamMessages = [
//   "the pool remembers what you forgot.",
//   "you've been here before.",
//   "still water, static sky.",
//   "float a little longer.",
//   "the surface hasn't decided what it is yet.",
// ];

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

    // checking on the user interaction
    if (pointerActive) {
      spot.target.position.x += (pointer.x * 2.4 - spot.target.position.x) * 0.05;
      spot.target.position.z += (-pointer.y * 2.4 - spot.target.position.z) * 0.05;
    }

    // gradual change of the light intensity
    pulseLight.intensity += (1.6 - pulseLight.intensity) * 0.03;

    // updates every active pulse effect -> allows multiple animations to play simultaneously
    for (let i = pulses.length - 1; i >= 0; i--) {

      // tracks how far along each pulse is
      const pulse = pulses[i];
      pulse.t += 0.05;

      // creates an easing effect to make the pulse grow and shrink naturally
      const eased = Math.sin(Math.min(pulse.t, 1) * Math.PI);

      // changes the pulse's size and adjusts the brightness of the pulse
      pulse.mesh.scale.setScalar(1 + eased * 0.6);
      pulse.mesh.material.emissiveIntensity = 0.35 + eased * 1.2;

      // detects when the animation isn complete
      if (pulse.t >= 1) {
        pulse.mesh.scale.setScalar(1);
        pulse.mesh.material.emissiveIntensity = 0.35;
        pulses.splice(i, 1);
      }
    }

    // updates OrbitControls and draws teh updated scene
    controls.update();
    renderer.render(scene, camera);
  }

  // begins the animation loop
  animate();

  // updates the renderer when the container sized changes
  container._resize = function () {
    const size = containerSize(container);

    // adjusts the camera aspect ratio
    camera.aspect = size.w / size.h;
    camera.updateProjectionMatrix();
    renderer.setSize(size.w, size.h);
  };

  // cleans up the entire Three.js scene to prevent memory leaks
  container._dispose = function () {
    // stops future animation frames
    running = false;
    if (rafId) cancelAnimationFrame(rafId);

    // removes moust event handlers 
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

    // removes the renderer from the webpage
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}

// wires up canvases for popups that need them, and keeps them in sync with resizing

// initializes the DREAM sleep-trajectory chart inside the 'o' (data-chart) popup
function initDreamChart(popup) {
  // dream_trajectories.js
  // DREAM archive sleep-trajectory chart — loads raw session records from CSV via d3.csv,
  // derives one trajectory per (Set ID, Subject ID) session, then draws + wires up interaction.
  // requires D3 v7 (loaded in HTML) and #chart svg / #tip elements to be present in the DOM
  
  const CSV_PATH = "Data_records.csv";
  
  // "Last sleep stage" strings -> depth index used by the y-scale / stageNames below
  const STAGE_INDEX = { "W": 0, "REM": 1, "N1": 2, "N2": 3, "N3/NREM3/NREM4": 4 };
  
  function parseClockSeconds(hms) {
    const [h, m, s] = hms.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  }
  
  // Groups raw CSV rows into one trajectory per session (Set ID + Subject ID),
  // dropping individual readings with an unusable stage or missing awakening time,
  // and keeping only sessions left with 2+ readings to actually draw a line.
  function buildData(rows) {
    const groups = d3.group(rows, d => `${d["Set ID"]}_${d["Subject ID"]}`);
    const sessions = [];
  
    groups.forEach((group, id) => {
      const usable = group.filter(r =>
        Object.prototype.hasOwnProperty.call(STAGE_INDEX, r["Last sleep stage"]) &&
        r["Time of awakening"] && r["Time of awakening"].includes(":")
      );
      if (usable.length < 2) return;
  
      const times = usable.map(r => parseClockSeconds(r["Time of awakening"]));
      const base = d3.min(times);
  
      const pts = usable
        .map((r, i) => ({
          t: Math.round(((times[i] - base) / 60) * 10) / 10,
          stage: STAGE_INDEX[r["Last sleep stage"]],
          exp: r["Experience"] === "Experience"
        }))
        .sort((a, b) => a.t - b.t);
  
      const first = usable[0];
      const session = { id, pts };
      if (first["Subject age"]) session.age = +first["Subject age"];
      if (first["Subject sex"]) session.sex = first["Subject sex"];
      if (first["Subject healthy"]) session.healthy = first["Subject healthy"] === "TRUE";
  
      sessions.push(session);
    });
  
    return sessions;
  }
  
  d3.csv(CSV_PATH).then(rows => {
    const DATA = buildData(rows);
    renderChart(DATA);
  }).catch(err => {
    console.error("Failed to load / parse", CSV_PATH, err);
  });
  
  function renderChart(DATA) {
  
    const stageNames = ["WAKE","REM","N1","N2","N3"];
    // depth index -> color token, echoes the starfield's stage palette
    const depthColor = {0:"--cool", 1:"--mid", 2:"--warm", 3:"--warmer", 4:"--accents"};
  
    const margin = {top: 18, right: 26, bottom: 34, left: 54};
    const width = 940;
    const height = 380;
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
  
    const svg = d3.select(popup).select("#chart")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");
  
    // shared glow filter, applied only to the active (hovered) line, cheap since it's one element at a time
    const defs = svg.append("defs");
    const filter = defs.append("filter").attr("id","lineGlow").attr("x","-40%").attr("y","-40%").attr("width","180%").attr("height","180%");
    filter.append("feGaussianBlur").attr("stdDeviation", 2.6).attr("result","blur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in","blur");
    feMerge.append("feMergeNode").attr("in","SourceGraphic");
  
    // each session gets its own horizontal gradient, stopping at every stage reading's color,
    // so a hovered line can trace its depth journey left to right
    function gradId(id){ return "grad-" + id.replace(/[^a-zA-Z0-9_-]/g, "_"); }
  
    // deepest stage reached in a session stands in for its "resting" color
    function dominantStageColor(d){
      const deepest = d3.max(d.pts, p => p.stage);
      return `var(${depthColor[deepest]})`;
    }
  
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  
    const maxT = d3.max(DATA, d => d3.max(d.pts, p => p.t));
  
    const x = d3.scaleSqrt().domain([0, maxT]).range([0, innerW]);
    const y = d3.scaleLinear().domain([0, 4]).range([16, innerH - 16]);
  
    g.append("g").selectAll("line.stagegrid")
      .data(stageNames)
      .join("line")
      .attr("class","stagegrid")
      .attr("x1", 0).attr("x2", innerW)
      .attr("y1",(d,i)=>y(i)).attr("y2",(d,i)=>y(i));
  
    g.append("g").selectAll("text.stage-label")
      .data(stageNames)
      .join("text")
      .attr("class","stage-label")
      .attr("x", -8)
      .attr("y", (d,i)=>y(i)+3)
      .attr("text-anchor","end")
      .text(d=>d);
  
    const xAxis = d3.axisBottom(x).ticks(6).tickFormat(d => d + "m");
  
    g.append("g")
      .attr("class","axis")
      .attr("transform", `translate(0,${innerH})`)
      .call(xAxis);
  
    g.append("text")
      .attr("class","axis-title")
      .attr("x", innerW)
      .attr("y", innerH + 30)
      .attr("text-anchor","end")
      .text("TIME SINCE SLEEP ONSET →");
  
    const line = d3.line()
      .x(d => x(d.t))
      .y(d => y(d.stage))
      .curve(d3.curveMonotoneX);
  
    const gradDefs = defs.selectAll("linearGradient.traj-grad")
      .data(DATA)
      .join("linearGradient")
      .attr("class","traj-grad")
      .attr("id", d => gradId(d.id))
      .attr("gradientUnits","userSpaceOnUse")
      .attr("x1", d => x(d.pts[0].t))
      .attr("x2", d => x(d.pts[d.pts.length-1].t))
      .attr("y1", 0)
      .attr("y2", 0);
  
    gradDefs.each(function(d){
      const x0 = x(d.pts[0].t), x1 = x(d.pts[d.pts.length-1].t);
      const span = (x1 - x0) || 1;
      d3.select(this).selectAll("stop")
        .data(d.pts)
        .join("stop")
        .attr("offset", p => ((x(p.t) - x0) / span))
        .attr("stop-color", p => `var(${depthColor[p.stage]})`);
    });
  
    const trajGroup = g.append("g").attr("class","trajectories");
  
    const paths = trajGroup.selectAll("path.traj-path")
      .data(DATA)
      .join("path")
      .attr("class","traj-path")
      .attr("d", d => line(d.pts))
      .attr("data-id", d => d.id)
      .style("stroke", d => dominantStageColor(d));
  
    const dotGroup = g.append("g").attr("class","dots");
  
    const dotsets = dotGroup.selectAll("g.dotset")
      .data(DATA)
      .join("g")
      .attr("class","dotset")
      .attr("data-id", d => d.id);
  
    dotsets.each(function(d){
      const gg = d3.select(this);
      const recalled = d.pts.filter(p=>p.exp);
      gg.selectAll("circle.dot-halo")
        .data(recalled)
        .join("circle")
        .attr("class","dot-halo")
        .attr("cx", p=>x(p.t)).attr("cy", p=>y(p.stage))
        .attr("r", 4)
        .attr("fill", p => `var(${depthColor[p.stage]})`);
      gg.selectAll("circle.dot-core")
        .data(recalled)
        .join("circle")
        .attr("class","dot-core")
        .attr("cx", p=>x(p.t)).attr("cy", p=>y(p.stage))
        .attr("r", 1.3)
        .attr("fill", p => `var(${depthColor[p.stage]})`);
    });
  
    const tip = d3.select(popup).select("#tip");
  
    const hitGroup = g.append("g").attr("class","hits");
    hitGroup.selectAll("path.hit")
      .data(DATA)
      .join("path")
      .attr("class","hit")
      .attr("d", d => line(d.pts))
      .on("mouseenter", function(event, d){
        paths.classed("dimmed", p => p.id !== d.id);
        paths.classed("active", p => p.id === d.id);
        paths.filter(p => p.id === d.id).style("stroke", `url(#${gradId(d.id)})`);
        dotsets.classed("dimmed", p => p.id !== d.id);
        dotsets.classed("active", p => p.id === d.id);
        const recalled = d.pts.filter(p=>p.exp).length;
        const total = d.pts.length;
        const subjectLine = d.age
          ? `${d.age}yo ${d.sex ? d.sex.toLowerCase() : "subject"}${d.healthy === false ? " · clinical group" : ""}`
          : "subject info n/a";
        tip.style("display","block").html(
          `<div class="t-id">session ${d.id}</div>
          ${subjectLine}<br>
          duration: ${Math.round(d.pts[d.pts.length-1].t)} min<br>
          stage readings: ${total}<br>
          dream recalled: ${recalled}/${total}`
        );
      })
      .on("mousemove", function(event){
        tip.style("left", (event.clientX + 14) + "px").style("top", (event.clientY + 14) + "px");
      })
      .on("mouseleave", function(event, d){
        paths.classed("dimmed", false).classed("active", false);
        paths.filter(p => p.id === d.id).style("stroke", dominantStageColor(d));
        dotsets.classed("dimmed", false).classed("active", false);
        tip.style("display","none");
      });
  
    // status bar reflects the actual loaded/derived dataset rather than a hardcoded count
    const totalTransitions = d3.sum(DATA, d => d.pts.length - 1);
    d3.select(popup).select("#status-left")
      .text(`${DATA.length} trajectories · ${totalTransitions.toLocaleString()} staged transitions`);
  }
  
}

/* ────────────────────────────────────────────────────────────
   Dream Theory network diagram (D3.js) — content behind the 'g' bubble

   High-level trajectory of this function, top to bottom:
     1. data      — the nodes (theorists/concepts/schools/etc.) and edges
                     (how they relate) as two little CSV tables.
     2. layout    — a physics simulation (d3-force) runs 500 ticks *once*,
                     up front, to settle every node into a good x/y/z spot.
                     That layout is then frozen (x0, y0, z0) — nothing keeps
                     simulating while you interact with it.
     3. draw      — one <g class="node-box"> per node, one <path class="link">
                     per edge, plus a per-category legend built from the
                     same color table used to fill the boxes.
     4. camera    — dragging a label doesn't move that node, it spins the
                     *whole frozen layout* around its center (a fake 3D
                     rotation), and scroll/drag-canvas do an ordinary D3
                     zoom/pan. render() re-projects every node/link from
                     its frozen 3D position into current 2D screen space
                     any time the camera changes.
     5. interact  — hovering a box highlights it and its direct connections
                     and shows the floating description card; clicking one
                     flies the camera to center on it.
     6. resize    — a ResizeObserver watches this popup's body so the
                     diagram re-centers itself whenever the window is
                     dragged to a new size (instead of only listening to
                     the browser window, which wouldn't fire for that).

   Everything below is scoped to `popup` — every DOM query goes through
   `popup.querySelector(...)` / `d3.select(popup).select(...)` rather than
   the bare document, and every id that gets referenced via `url(#id)`
   (SVG markers + gradients, which — unlike querySelector — are NOT
   automatically scoped to a subtree) is namespaced with a random `uid`.
   That's what lets more than one of these popups be open at once without
   them fighting over the same ids.
   ──────────────────────────────────────────────────────────── */
function initNetworkDiagram(popup) {

  // unique-enough per-instance tag, so this popup's <marker>/<linearGradient>
  // ids never collide with another 'g' popup open at the same time
  const uid = 'nd' + Math.random().toString(36).slice(2, 9);

  /* ---- 1. data: load nodes.csv / edges.csv from disk with d3.csv. Fetching
     local files needs the page served over http(s) -- see the catch below
     for what happens if it's opened directly as a file:// URL instead.
     Everything that actually builds the diagram happens in
     buildNetworkDiagram() below, only once both files have arrived. ---- */
  Promise.all([
    d3.csv("nodes.csv"),
    d3.csv("edges.csv")
  ]).then(([nodes, links]) => {
    buildNetworkDiagram(popup, uid, nodes, links);
  }).catch(err => {
    console.error(err);
    const bodyEl = popup.querySelector(".window-body");
    bodyEl.innerHTML =
      '<p style="padding:24px;font-family:sans-serif;line-height:1.6">' +
      'Could not load <code>nodes.csv</code> / <code>edges.csv</code>.<br>' +
      'This page must be served over http(s) rather than opened directly as a file.<br>' +
      'From this folder, run <code>python3 -m http.server 8000</code> and open ' +
      '<code>http://localhost:8000/index.html</code>.</p>';
  });
}

// builds the actual diagram once nodes.csv / edges.csv have loaded and been parsed
function buildNetworkDiagram(popup, uid, nodes, links) {

  // CSV values arrive as strings -- convert the numeric columns
  nodes.forEach(d => d.importance = +d.importance);
  links.forEach(d => d.weight = +d.weight);

  /* ---- fill color per category, and which ink (light/dark) reads
     cleanly on top of each fill — independent of the page's own
     light/dark theme, since these are box colors, not backgrounds ---- */
  const colorHex = {
    "Theorist": "#8b58e4",
    "Concept": "#bfb0e8",
    "School": "#5e3582",
    "Application": "#b569b5",
    "Cultural-Historical": "#63587e"
  };
  const textOnColor = {
    "Theorist": "#f5f1ff",
    "Concept": "#241a3d",
    "School": "#f5f1ff",
    "Application": "#f8f2f8",
    "Cultural-Historical": "#f2ede4"
  };

  /* ---- scoped element references: every lookup goes through `popup`
     (or a selection rooted at it) so this instance never touches another
     popup's DOM, even if several 'g' windows are open at once ---- */
  const svg = d3.select(popup).select("svg");
  const bodyEl = popup.querySelector(".window-body");
  const headerEl = popup.querySelector(".network-diagram header");
  let width = bodyEl.clientWidth, height = bodyEl.clientHeight;
  let headerH = headerEl.offsetHeight;

  const defs = svg.append("defs");

  // three arrowheads: neutral (default links), contested (red links), active (hover).
  // Marker ids are IDREFs (`url(#id)`), which — unlike querySelector — resolve against
  // the *whole document*, so they're namespaced with `uid` to stay instance-safe.
  function makeArrow(id, fillColor) {
    const m = defs.append("marker")
      .attr("id", id)
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 9).attr("refY", 5)
      .attr("markerWidth", 7).attr("markerHeight", 7)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("orient", "auto");
    m.append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", fillColor)
      .attr("stroke", "rgba(0,0,0,0.3)")
      .attr("stroke-width", 0.6)
      .attr("stroke-linejoin", "round");
    return m;
  }
  makeArrow(`arrow-default-${uid}`, "#8988a8");
  makeArrow(`arrow-contested-${uid}`, "#a06868");
  // on the light background the old cream hover color would vanish, so the
  // "active" arrow uses the dark ink color instead for visibility
  makeArrow(`arrow-active-${uid}`, "#241f33");
  function markerForType(type) {
    return type === "contested" ? `url(#arrow-contested-${uid})` : `url(#arrow-default-${uid})`;
  }

  const zoomLayer = svg.append("g");
  const scene = zoomLayer.append("g");

  // an invisible full-canvas rect that exists purely to catch background drags/zooms
  // (so panning the empty canvas is a distinct gesture from dragging a node label)
  const bgRect = scene.append("rect")
    .attr("id", "bgrect")
    .attr("x", -20000).attr("y", -20000)
    .attr("width", 40000).attr("height", 40000)
    .attr("fill", "transparent");

  const zoom = d3.zoom()
    .scaleExtent([0.4, 3])
    .filter((event) => event.type !== "mousedown")
    .on("zoom", (event) => zoomLayer.attr("transform", event.transform));
  svg.call(zoom);
  svg.on("dblclick.zoom", null); // free up double-click for our own "reset view" instead

  /* ---- 2. layout: measure each label, then run a physics simulation
     once, up front, and freeze the result ---- */
  const measureCanvas = document.createElement("canvas");
  const measureCtx = measureCanvas.getContext("2d");
  function textWidth(text, font) { measureCtx.font = font; return measureCtx.measureText(text).width; }
  const BOX_FONT = "500 12px Space Mono, monospace";
  const BOX_PAD_X = 18, BOX_H = 32;
  nodes.forEach(d => { d.boxW = Math.max(textWidth(d.label, BOX_FONT) + BOX_PAD_X * 2, 70); d.boxH = BOX_H; });

  // how far apart two overlapping boxes must be pushed before the collision force is satisfied
  const collideRadius = d => Math.sqrt((d.boxW / 2) ** 2 + (d.boxH / 2) ** 2) + 46;
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(l => 160 + (4 - l.weight) * 45).strength(0.45))
    .force("charge", d3.forceManyBody().strength(-650))   // nodes push each other apart
    .force("center", d3.forceCenter(0, 0))
    .force("collision", d3.forceCollide().radius(collideRadius))
    .stop();
  // run the simulation to completion synchronously instead of animating it —
  // we only want the *settled* layout, not the process of settling
  for (let i = 0; i < 500; i++) simulation.tick();
  // freeze the settled x/y as (x0, y0); this is the "real" position the camera rotates around
  nodes.forEach(d => { d.x0 = d.x; d.y0 = d.y; });

  // ---- z-depth from era: rotating the scene moves through chronology ----
  function eraToYear(era) {
    if (/BCE/i.test(era)) { const m = era.match(/(\d+)/); return m ? -parseInt(m[1]) : -1000; }
    if (/Pre-/i.test(era)) return -5000;
    if (/century CE/i.test(era)) { const m = era.match(/(\d+)/); const c = m ? parseInt(m[1]) : 2; return c * 100 - 50; }
    const m = era.match(/(\d{3,4})/);
    return m ? parseInt(m[1]) : 0;
  }
  nodes.forEach(d => d.year = eraToYear(d.era));
  const yearExtent = d3.extent(nodes, d => d.year);
  const zScale = d3.scaleLinear().domain(yearExtent).range([-220, 220]);
  nodes.forEach(d => d.z0 = zScale(d.year));

  /* ---- 3. draw: one <path> per link, one <g> per node ---- */
  const linkSel = scene.append("g").selectAll("path")
    .data(links)
    .join("path")
    .attr("class", d => "link link-" + d.type);

  // one gradient per link (source-category color -> target-category color), used only
  // while that link is the hovered/active one; endpoints are kept in sync every render()
  const linkGrad = defs.selectAll(".link-gradient").data(links).join("linearGradient")
    .attr("class", "link-gradient")
    .attr("id", (d, i) => `grad-link-${uid}-${i}`)
    .attr("gradientUnits", "userSpaceOnUse");
  linkGrad.each(function(d) {
    const g = d3.select(this);
    g.append("stop").attr("offset", "0%").attr("stop-color", colorHex[d.source.category] || "#8988a8");
    g.append("stop").attr("offset", "100%").attr("stop-color", colorHex[d.target.category] || "#8988a8");
  });

  const nodeSel = scene.append("g").selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", "node-box")
    .on("mouseenter", (event, d) => { showCard(d); highlight(d); })
    .on("mousemove", positionCard)
    .on("mouseleave", () => { hideCard(); clearHighlight(); })
    .on("click", (event, d) => flyTo(d))
    .call(d3.drag().on("start", () => hideCard()).on("drag", rotateDrag));

  nodeSel.append("rect")
    .attr("class", "box-glow")
    .attr("x", d => -d.boxW / 2 - 3).attr("y", d => -d.boxH / 2 - 3)
    .attr("width", d => d.boxW + 6).attr("height", d => d.boxH + 6)
    .attr("rx", 7)
    .attr("fill", d => colorHex[d.category]);
  nodeSel.append("rect")
    .attr("class", "box-core")
    .attr("x", d => -d.boxW / 2).attr("y", d => -d.boxH / 2)
    .attr("width", d => d.boxW).attr("height", d => d.boxH)
    .attr("rx", 5)
    .attr("fill", d => colorHex[d.category]);
  nodeSel.append("text").attr("class", "box-label")
    .attr("fill", d => textOnColor[d.category])
    .text(d => d.label);

  /* ---- 4. camera: yaw/pitch rotation of the frozen 3D layout, plus pan/zoom ----
     Grabbing a box and dragging it doesn't move that node — it spins the whole
     structure around its center, using the drag's dx/dy as a turntable control.
     Dragging empty canvas instead pans (see `zoom` above), keeping the two
     gestures clearly separate. */
  let rotY = 0, rotX = 0;   // yaw / pitch, radians
  let panX = 0, panY = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // normalize the perspective strength to the actual size of this layout
  const maxR = d3.max(nodes, d => Math.sqrt(d.x0 ** 2 + d.y0 ** 2 + d.z0 ** 2)) || 1;
  const FOCAL = maxR * 1.9;

  function rotateDrag(event) {
    rotY += event.dx * 0.008;
    rotX = clamp(rotX - event.dy * 0.008, -1.1, 1.1);
    render();
  }
  function panDrag(event) {
    const k = d3.zoomTransform(svg.node()).k;
    panX += event.dx / k;
    panY += event.dy / k;
    render();
  }

  // rotates one node's frozen (x0,y0,z0) by the current yaw/pitch, returning
  // its rotated 2D position plus a perspective scale factor
  function project(d) {
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const x1 = d.x0 * cosY + d.z0 * sinY;
    const z1 = -d.x0 * sinY + d.z0 * cosY;
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const y2 = d.y0 * cosX - z1 * sinX;
    const z2 = d.y0 * sinX + z1 * cosX;
    const persp = clamp(FOCAL / (FOCAL + z2), 0.55, 1.6);
    return { x2: x1, y2, z2, persp };
  }

  // re-projects every node + link into current screen space; called after any
  // camera change (rotate / pan / zoom / resize)
  function render() {
    const cx = width / 2, cy = headerH + (height - headerH) / 2;

    nodes.forEach(d => {
      const p = project(d);
      d.z2 = p.z2;
      d.scaleP = p.persp;
      d.sx = cx + p.x2 * p.persp + panX;
      d.sy = cy + p.y2 * p.persp + panY;
      d.scaledW = d.boxW * p.persp;
      d.scaledH = d.boxH * p.persp;
    });

    // closer nodes draw on top
    nodeSel.sort((a, b) => a.z2 - b.z2);

    nodeSel.attr("transform", d => `translate(${d.sx},${d.sy}) scale(${d.scaleP})`)
      .style("opacity", d => depthOpacity(d.z2));

    linkSel
      .each(edgePositions)
      .style("opacity", d => d.type === "contested" ? null : 0.6 * depthOpacity((d.source.z2 + d.target.z2) / 2));
  }
  // depth only ever dims mildly -- never enough to lose legibility
  function depthOpacity(z) {
    const t = clamp((z + maxR) / (2 * maxR), 0, 1);
    return 0.55 + t * 0.45;
  }

  // point on a rectangle's edge, from its center, along the direction toward (px,py) —
  // this is what makes links stop at a box's border instead of running into its middle
  function boxEdgePoint(d, px, py) {
    const dx = px - d.sx, dy = py - d.sy;
    const hw = (d.scaledW || d.boxW) / 2, hh = (d.scaledH || d.boxH) / 2;
    if (dx === 0 && dy === 0) return { x: d.sx, y: d.sy };
    const scale = Math.min(dx !== 0 ? Math.abs(hw / dx) : Infinity, dy !== 0 ? Math.abs(hh / dy) : Infinity);
    return { x: d.sx + dx * scale, y: d.sy + dy * scale };
  }

  // deterministic bow amount per link -- spreads edges that would otherwise sit
  // right on top of each other (e.g. several links radiating from the same box
  // toward similar directions) into visibly separate curves
  function bowFor(i) {
    const slot = i % 7;                 // 0..6, stable per link
    return (slot - 3) * 9;              // -27 .. +27 px
  }

  // draws one link as a slightly curved path (so parallel/converging links
  // don't visually merge), and swaps in the gradient + bright arrowhead
  // whenever this link touches the currently-hovered node
  let hoveredId = null;
  function edgePositions(d, i) {
    const srcP = boxEdgePoint(d.source, d.target.sx, d.target.sy);
    const tgtP = boxEdgePoint(d.target, d.source.sx, d.source.sy);
    const isActive = hoveredId !== null && (d.source.id === hoveredId || d.target.id === hoveredId);

    const dx = tgtP.x - srcP.x, dy = tgtP.y - srcP.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len, ny = dx / len;   // unit vector perpendicular to the link
    const bow = bowFor(i);
    const mx = (srcP.x + tgtP.x) / 2 + nx * bow;
    const my = (srcP.y + tgtP.y) / 2 + ny * bow;

    d3.select(this)
      .attr("d", `M${srcP.x},${srcP.y} Q${mx},${my} ${tgtP.x},${tgtP.y}`)
      .attr("marker-end", isActive ? `url(#arrow-active-${uid})` : markerForType(d.type))
      .style("stroke", isActive ? `url(#grad-link-${uid}-${i})` : null);
    d3.select(`#grad-link-${uid}-${i}`).attr("x1", srcP.x).attr("y1", srcP.y).attr("x2", tgtP.x).attr("y2", tgtP.y);
  }

  bgRect.call(d3.drag().on("start", () => hideCard()).on("drag", panDrag));
  bgRect.on("dblclick", () => {
    rotY = 0; rotX = 0; panX = 0; panY = 0;
    svg.transition().duration(650).ease(d3.easeCubicInOut).call(zoom.transform, d3.zoomIdentity);
    render();
  });

  // ---- click a label: fly the camera to center on it and zoom in slightly ----
  function flyTo(d) {
    const cx = width / 2, cy = headerH + (height - headerH) / 2;
    const targetK = Math.max(d3.zoomTransform(svg.node()).k, 1.5);
    const tx = cx - d.sx * targetK;
    const ty = cy - d.sy * targetK;
    svg.transition().duration(700).ease(d3.easeCubicInOut)
      .call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(targetK));
  }

  render();

  /* ---- 5. interact: hover highlight + the floating description card ---- */
  function highlight(d) {
    hoveredId = d.id;
    const connected = new Set([d.id]);
    linkSel.classed("link-active", l => {
      const on = l.source.id === d.id || l.target.id === d.id;
      if (on) { connected.add(l.source.id); connected.add(l.target.id); }
      return on;
    });
    linkSel.classed("link-dim", l => !(l.source.id === d.id || l.target.id === d.id));
    linkSel.each(edgePositions);
    nodeSel.classed("node-dim", n => !connected.has(n.id));
    nodeSel.classed("node-hot", n => n.id === d.id);
    nodeSel.classed("node-connected", n => connected.has(n.id) && n.id !== d.id);
  }
  function clearHighlight() {
    hoveredId = null;
    linkSel.classed("link-active", false).classed("link-dim", false);
    linkSel.each(edgePositions);
    nodeSel.classed("node-dim", false).classed("node-hot", false).classed("node-connected", false);
  }

  // ---- legend: categories (fill color) ----
  const legend = d3.select(popup).select("#legend");
  Object.entries(colorHex).forEach(([cat, hex]) => {
    const item = legend.append("div").attr("class", "legend-item");
    item.append("span").attr("class", "swatch").style("background", hex);
    item.append("span").text(cat);
  });

  // ---- legend: line styles (what a connection's line means) ----
  const lineLegendData = [
    { dash: null,      color: "#9a94ad", label: "developed · applied · influenced" },
    { dash: "1.5 3",   color: "#9a94ad", label: "precedes" },
    { dash: "1.5 2.5 4 2.5", color: "#9a94ad", label: "interprets" },
    { dash: "3 3",     color: "#a06868", label: "contested" }
  ];
  const lineLegend = d3.select(popup).select("#line-legend");
  const LINE_ICON_LEN = 18;
  lineLegendData.forEach(item => {
    const row = lineLegend.append("div").attr("class", "legend-item");
    const svgIcon = row.append("svg").attr("class", "line-swatch").attr("width", LINE_ICON_LEN).attr("height", 8)
      .attr("viewBox", `0 0 ${LINE_ICON_LEN} 8`);
    svgIcon.append("line")
      .attr("x1", 1).attr("y1", 4).attr("x2", LINE_ICON_LEN - 1).attr("y2", 4)
      .attr("stroke", item.color).attr("stroke-width", 1.3)
      .attr("stroke-dasharray", item.dash)
      .attr("stroke-linecap", "round");
    row.append("span").text(item.label);
  });

  // ---- cursor-following info card ----
  const cursorCard = popup.querySelector("#cursor-card");
  function showCard(d) {
    popup.querySelector("#card-cat").textContent = d.category + " · " + d.era;
    popup.querySelector("#card-label").textContent = d.label;
    popup.querySelector("#card-desc").textContent = d.description;
    cursorCard.classList.add("visible");
  }
  function positionCard(event) {
    // .popup-window has a CSS `transform` on it (for its open/close scale
    // animation), which makes it the containing block for any
    // position:fixed descendant -- including this card. So "fixed" here
    // is actually relative to the popup's own box, not the real browser
    // viewport. Measure against the popup's own rect instead of
    // window.innerWidth/innerHeight, or the card ends up placed as if the
    // popup were full-screen and can land outside its visible bounds.
    const popupRect = popup.getBoundingClientRect();
    const cardW = cursorCard.offsetWidth, cardH = cursorCard.offsetHeight;
    let x = event.clientX - popupRect.left + 10;
    let y = event.clientY - popupRect.top + 10;
    if (x + cardW > popupRect.width - 12) x = event.clientX - popupRect.left - cardW - 18;
    if (y + cardH > popupRect.height - 12) y = event.clientY - popupRect.top - cardH - 18;
    cursorCard.style.left = x + "px";
    cursorCard.style.top = y + "px";
  }
  function hideCard() { cursorCard.classList.remove("visible"); }

  /* ---- 6. resize: this popup can be dragged/resized by the user, and the
     browser window can change too — a ResizeObserver on the popup's body
     catches both, unlike a plain `window.addEventListener("resize", ...)`
     which would miss the popup being resized while the window stays put ---- */
  const ro = new ResizeObserver(() => {
    width = bodyEl.clientWidth; height = bodyEl.clientHeight;
    headerH = headerEl.offsetHeight;
    render();
  });
  ro.observe(bodyEl);

  // lets attachDynamicCanvases' close-button handler tear this instance down
  // cleanly (stop observing) instead of leaking an observer per popup opened
  popup._canvasCleanup = function () {
    ro.disconnect();
  };
}

// Nightfall sleep map (Mapbox GL) — adapted from the standalone sleep_map.js
// so it can run inside a popup instance instead of a full page: the map
// mounts into this popup's own #sleep-map element (not a page-wide id, so
// multiple popups never collide), a light basemap replaces the original
// dark one to match the forced-white popup background, and a
// ResizeObserver keeps the map sized correctly as the popup is dragged or
// resized — the same job the 'g' network diagram's own observer does.
const NIGHTFALL_TOKEN = 'pk.eyJ1Ijoia2lyc2NoZXJyeSIsImEiOiJjbXJ3eTJyenAwYnhyMnlxMGJqaXI1d2kyIn0.o1RT7N039ClqF6ovbDPnhw';

function initNightfallMap(popup) {
  if (typeof mapboxgl === 'undefined') {
    console.error('Nightfall: mapbox-gl.js is not loaded — add the Mapbox GL <link>/<script> tags to index.html.');
    return;
  }

  const container = popup.querySelector('#sleep-map');
  if (!container) return;

  mapboxgl.accessToken = NIGHTFALL_TOKEN;

  const map = new mapboxgl.Map({
    container: container,
    style: 'mapbox://styles/mapbox/light-v11', // light basemap to sit on the white popup background
    center: [10, 20],
    zoom: 1.0,
    pitch: 0,
    bearing: 0,
    projection: 'mercator'
  });

  map.scrollZoom.disable(); // keep page scroll usable; click the map to re-enable zoom
  map.on('click', () => map.scrollZoom.enable());

  // manual +/- zoom buttons, top-right corner (compass hidden — this map
  // doesn't rotate, so a compass button would just be dead weight)
  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

  map.on('load', () => {
    fetch('sleep_by_country.geojson')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        map.addSource('sleep-data', {
          type: 'geojson',
          data: data,
          generateId: true
        });

        // choropleth fill — same amber -> neutral -> violet ramp as the
        // original, just with a lighter no-data tone to sit on white
        map.addLayer({
          id: 'sleep-fill',
          type: 'fill',
          source: 'sleep-data',
          paint: {
            'fill-color': [
              'case',
              ['==', ['get', 'has_data'], true],
              [
                'interpolate',
                ['linear'],
                ['get', 'sleep_hours'],
                5.8, '#e8a25c',
                6.6, '#cfc9ba',
                7.5, '#7d6bc4'
              ],
              '#dcdaf0'
            ],
            'fill-opacity': [
              'case',
              ['==', ['get', 'has_data'], true], 0.85,
              0.35
            ]
          }
        });

        map.addLayer({
          id: 'sleep-border',
          type: 'line',
          source: 'sleep-data',
          paint: {
            'line-color': '#ffffff',
            'line-width': 0.6,
            'line-opacity': 0.9
          }
        });

        map.addLayer({
          id: 'sleep-highlight',
          type: 'line',
          source: 'sleep-data',
          paint: {
            'line-color': '#1b1f2b',
            'line-width': [
              'case',
              ['boolean', ['feature-state', 'hover'], false], 1.6,
              0
            ]
          }
        });

        let hoveredId = null;

        map.on('mousemove', 'sleep-fill', (e) => {
          if (!e.features.length) return;
          map.getCanvas().style.cursor = 'pointer';
          if (hoveredId !== null) {
            map.setFeatureState({ source: 'sleep-data', id: hoveredId }, { hover: false });
          }
          hoveredId = e.features[0].id;
          map.setFeatureState({ source: 'sleep-data', id: hoveredId }, { hover: true });
        });

        map.on('mouseleave', 'sleep-fill', () => {
          map.getCanvas().style.cursor = '';
          if (hoveredId !== null) {
            map.setFeatureState({ source: 'sleep-data', id: hoveredId }, { hover: false });
          }
          hoveredId = null;
        });

        map.on('click', 'sleep-fill', (e) => {
          const props = e.features[0].properties;
          if (!props.has_data) return;

          const hours = Math.floor(props.sleep_minutes / 60);
          const mins = props.sleep_minutes % 60;

          new mapboxgl.Popup({ offset: 8 })
            .setLngLat(e.lngLat)
            .setHTML(`
              <div class="nf-popup-country">${props.name}</div>
              <div class="nf-popup-row"><span>Time in bed</span><strong>${hours}h ${mins}m</strong></div>
              <div class="nf-popup-row"><span>Typical bedtime</span><strong>${props.bedtime}</strong></div>
            `)
            .addTo(map);
        });
      })
      .catch((error) => {
        console.error('Nightfall: error loading sleep_by_country.geojson:', error);
        container.innerHTML = `<div style="padding:20px;font-family:'Space Mono',monospace;font-size:12px;">
          Could not load sleep_by_country.geojson — make sure it's served alongside index.html.
        </div>`;
      });
  });

  // keeps the map correctly sized as the popup is dragged/resized
  const ro = new ResizeObserver(() => map.resize());
  ro.observe(container);

  // the ResizeObserver above catches the popup itself being resized, but
  // not a case where the popup's CSS size is relative to the browser
  // window (e.g. a vw/vh-based width) — a plain browser resize wouldn't
  // touch the popup's own box in that case, only its content. This
  // listener catches that too, so the map re-fits whichever one moved.
  const handleWindowResize = () => map.resize();
  window.addEventListener('resize', handleWindowResize);

  // lets the popup's close-button handler tear this instance down cleanly
  popup._canvasCleanup = function () {
    ro.disconnect();
    window.removeEventListener('resize', handleWindowResize);
    map.remove();
  };
}

function attachDynamicCanvases(popup, key) {
  let containers = [];

  // loads the DREAM sleep-trajectory chart (D3.js)
  if (key === 'i') {
    initDreamChart(popup);
    return;
  }

  // loads the Dream Theory network diagram (D3.js) — sets its own
  // ResizeObserver/cleanup, so it also returns early like 'o' above
  if (key === 'n') {
    initNetworkDiagram(popup);
    return;
  }

  // loads the Nightfall sleep map (Mapbox GL) — also sets its own
  // ResizeObserver/cleanup, so it returns early too
  if (key === 'g') {
    initNightfallMap(popup);
    return;
  }

  // loads p5.js canvases
  if (key === 'e') {
    containers = Array.from(popup.querySelectorAll('.p5-container'));
    if (containers[0]) initP5Static(containers[0]);
    if (containers[1]) initP5Animated(containers[1]);
    
    // loads Three.js scenes
  } else if (key === 'a') {
    containers = Array.from(popup.querySelectorAll('.three-container'));
    if (containers[0]) initThreeOrbit(containers[0]);
    if (containers[1]) initThreeAtmosphere(containers[1]);
  }

  if (!containers.length) return;

  let frame = null;

  // keeps the canvas correctly sized
  const ro = new ResizeObserver(function () {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(function () {
      containers.forEach(function (c) {
        if (c._resize) c._resize();
      });
    });
  });
  ro.observe(popup);

  // disconnects observers and disposes of canvases
  popup._canvasCleanup = function () {
    ro.disconnect();
    containers.forEach(function (c) {
      if (c._dispose) c._dispose();
    });
  };
}

/* ──────────────────────────────────────────────────────────── */

// creates and displays a pop up browser
function openPopup(key, anchorRect) {

  // retrieves the popup data
  const content = letterContent[key];
  if (!content) return;
  
  // tracks numer of popups that are open
  const layer = document.getElementById('popupLayer');
  popupCount += 1;

  const size = DEFAULT_SIZES[key] || DEFAULT_SIZES.DEFAULT;
  const offset = ((popupCount - 1) % 5) * 24;

  // creates the popup element
  const popup = document.createElement('div');
  popup.className = 'popup-window';
  // popup location data
  const left = anchorRect
    ? Math.min(anchorRect.left + offset, window.innerWidth - size.width - 16)
    : 48 + offset;
  const top = anchorRect
    ? Math.min(anchorRect.top + offset, window.innerHeight - size.height - 16)
    : 80 + offset;

  // places the popup near the clicked bubble
  popup.style.left = `${Math.max(16, left)}px`;
  popup.style.top = `${Math.max(16, top)}px`;
  popup.style.width = `${size.width}px`;
  popup.style.height = `${size.height}px`;

  // creates the title bar, buttons, and content
  popup.innerHTML = `
    <div class="window-bar">
      <button type="button" class="dot red close-btn" aria-label="Close window"></button>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span class="window-title">${content.title}</span>
    </div>
    <div class="window-body">${content.html}</div>
  `;

  // closes the popup
  popup.querySelector('.close-btn').addEventListener('click', function () {
    popup.classList.remove('open');
    popup.classList.add('closing');
    if (popup._canvasCleanup) popup._canvasCleanup();
    setTimeout(function () {
      popup.remove();
    }, 240);
  });

  // brings the selected popup to the front
  popup.addEventListener('mousedown', function () {
    focusPopup(popup);
  });

  // adds an interactivve feature inside the popup through pool.exe -> need to revise
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

  // enables dragging and resizing
  layer.appendChild(popup);
  makeDraggable(popup, popup.querySelector('.window-bar'));
  makeResizable(popup);

  // waits until the popup has been added to the page before animating
  // ensures the opening animation and dynamic canvases initialize correctly
  requestAnimationFrame(function () {
    popup.classList.add('open');
    focusPopup(popup);
    attachDynamicCanvases(popup, key);
  });
}

// waits unit the HTML page has finished loading
// ensures all elements exist before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {

  // finds every bubble element
  document.querySelectorAll('.bubble').forEach(function (bubble) {
    // deptect when a bubble is clicked
    bubble.addEventListener('click', function () {
      const key = bubble.dataset.letter;
      // oopens the correct popup and positions it according to the assigned coordinates
      openPopup(key, bubble.getBoundingClientRect());
    });
  });
});
