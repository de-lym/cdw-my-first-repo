  // ---------------------------------------------------------------
  // 1. UI WIRING -- runs immediately, does not depend on Firebase.
  //    This is intentionally separate from the Firebase code below,
  //    so the whole page still works (tabs, drag, composing) even
  //    if the Firebase scripts can't load (e.g. blocked network,
  //    sandboxed preview, ad blocker).
  // ---------------------------------------------------------------
  const tabWrite = document.getElementById("tab-write");
  const tabAssemble = document.getElementById("tab-assemble");
  const panelWrite = document.getElementById("panel-write");
  const panelAssemble = document.getElementById("panel-assemble");
  const dreamWall = document.getElementById("dream-wall");

  tabWrite.addEventListener("click", () => {
    tabWrite.classList.add("active");
    tabAssemble.classList.remove("active");
    panelWrite.classList.add("active");
    panelAssemble.classList.remove("active");
    dreamWall.style.display = "";
  });
  tabAssemble.addEventListener("click", () => {
    tabAssemble.classList.add("active");
    tabWrite.classList.remove("active");
    panelAssemble.classList.add("active");
    panelWrite.classList.remove("active");
    dreamWall.style.display = "none";
    generatePool(); // fresh set of words each time the composer is opened
  });

  let selectedMood = null;
  document.querySelectorAll("#mood-chips .patch").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#mood-chips .patch").forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
      selectedMood = chip.dataset.mood;
    });
  });

  // Fallback fragments -- used to fill out the pool until enough dreams have
  // been written (and to pad it out afterwards, so the pool never feels thin).
  const FALLBACK_WORD_BANK = [
    "I", "a child", "my grandmother", "a stranger", "someone I used to know",
    "was flying", "was running", "disappeared", "opened a door", "followed a shadow", "forgot how to speak",
    "in the ocean", "inside a forest", "on the moon", "inside my old school", "in an endless hallway", "somewhere underwater",
    "carrying a broken clock", "holding wildflowers", "chasing falling stars", "glowing faintly", "wrapped in fog",
    "and then", "but", "until", "again", "somehow", "slowly", "without warning", "like a memory", "half awake"
  ];
  const VARIANTS = ["patch--a", "patch--b", "patch--c"];
  const POOL_COUNT = 14;
  const POOL_COLS = 4;

  let poolTiles = [];
  let composition = [];
  let idCounter = 0;

  // ---------------------------------------------------------------
  // Word source for "Piece it together" -- built from the dream texts
  // people have actually written in "Write it down" (this session's own
  // submissions, plus whatever the live Dream Wall has loaded from
  // Firestore). Falls back to FALLBACK_WORD_BANK to pad the pool when
  // there isn't much written yet.
  // ---------------------------------------------------------------
  let localWrittenTexts = [];   // texts submitted this session, kept even if the save itself fails
  let firestoreWrittenTexts = []; // texts pulled from the live Dream Wall

  function tokenizeToWords(text) {
    return (text || "")
      .split(/[^A-Za-z']+/)
      .map(w => w.trim())
      .filter(w => w.length >= 3);
  }

  function collectedWrittenWords() {
    const words = [];
    [...localWrittenTexts, ...firestoreWrittenTexts].forEach(t => words.push(...tokenizeToWords(t)));
    const seen = new Set();
    const unique = [];
    words.forEach(w => {
      const key = w.toLowerCase();
      if (!seen.has(key)) { seen.add(key); unique.push(w); }
    });
    return unique;
  }

  // words from real dreams first, padded out with the fallback bank so the
  // pool always has enough fragments to fill POOL_COUNT
  function currentWordBank() {
    const seen = new Set();
    const combined = [];
    function addAll(arr) {
      arr.forEach(w => {
        const key = w.toLowerCase();
        if (!seen.has(key)) { seen.add(key); combined.push(w); }
      });
    }
    addAll(collectedWrittenWords());
    addAll(FALLBACK_WORD_BANK);
    return combined;
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function generatePool() {
    const words = shuffle(currentWordBank()).slice(0, POOL_COUNT);
    const rows = Math.ceil(POOL_COUNT / POOL_COLS);
    poolTiles = words.map((word, i) => {
      const col = i % POOL_COLS;
      const row = Math.floor(i / POOL_COLS);
      const cellW = 100 / POOL_COLS;
      const cellH = 100 / rows;
      const jitterX = (Math.random() * 0.3 + 0.06) * cellW;
      const jitterY = (Math.random() * 0.3 + 0.1) * cellH;
      return {
        id: idCounter++,
        word,
        left: col * cellW + jitterX,
        top: row * cellH + jitterY,
        variant: VARIANTS[i % VARIANTS.length]
      };
    });
    renderPool();
  }

  function renderPool() {
    const pool = document.getElementById("pool");
    pool.innerHTML = "";
    const EDGE_PAD = 8; // px kept clear from the pool's inner edge
    const poolRect = pool.getBoundingClientRect();

    poolTiles.forEach(tile => {
      const el = document.createElement("div");
      el.className = "patch " + tile.variant + " pool-patch";
      el.textContent = tile.word;
      el.dataset.id = tile.id;
      // start off top-left so we can measure its real rendered size
      el.style.left = "0px";
      el.style.top = "0px";
      pool.appendChild(el);

      const tileW = el.offsetWidth;
      const tileH = el.offsetHeight;
      const maxLeftPx = Math.max(EDGE_PAD, poolRect.width - tileW - EDGE_PAD);
      const maxTopPx = Math.max(EDGE_PAD, poolRect.height - tileH - EDGE_PAD);
      const desiredLeftPx = (tile.left / 100) * poolRect.width;
      const desiredTopPx = (tile.top / 100) * poolRect.height;

      el.style.left = Math.min(Math.max(EDGE_PAD, desiredLeftPx), maxLeftPx) + "px";
      el.style.top = Math.min(Math.max(EDGE_PAD, desiredTopPx), maxTopPx) + "px";

      attachDrag(el, tile);
    });
  }

  document.getElementById("refresh-pool").addEventListener("click", generatePool);

  function addWordToComposition(tile) {
    composition.push(tile.word);
    poolTiles = poolTiles.filter(t => t.id !== tile.id);
    renderPool();
    renderComposition();
  }

  // Is the point over the composition drop zone (or its label)?
  function isOverDropZone(x, y) {
    const target = document.elementFromPoint(x, y);
    return !!(target && target.closest && target.closest("#composition, .composition-wrap"));
  }

  function attachDrag(el, tile) {
    const DRAG_THRESHOLD = 6; // px of movement before we treat this as a drag, not a tap

    el.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      const startX = e.clientX, startY = e.clientY;
      let dragging = false;
      let ghost = null;

      function startGhost(x, y) {
        ghost = el.cloneNode(true);
        ghost.classList.add("drag-ghost");
        ghost.style.left = (x - el.offsetWidth / 2) + "px";
        ghost.style.top = (y - el.offsetHeight / 2) + "px";
        ghost.style.width = el.offsetWidth + "px";
        document.body.appendChild(ghost);
        el.style.opacity = "0.25";
      }

      function onMove(ev) {
        const dx = ev.clientX - startX, dy = ev.clientY - startY;
        if (!dragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
          dragging = true;
          startGhost(ev.clientX, ev.clientY);
        }
        if (dragging) {
          ghost.style.left = (ev.clientX - el.offsetWidth / 2) + "px";
          ghost.style.top = (ev.clientY - el.offsetHeight / 2) + "px";
          document.getElementById("composition")
            .classList.toggle("drop-hover", isOverDropZone(ev.clientX, ev.clientY));
        }
      }

      function onUp(ev) {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        document.getElementById("composition").classList.remove("drop-hover");

        if (dragging) {
          ghost.remove();
          if (isOverDropZone(ev.clientX, ev.clientY)) {
            addWordToComposition(tile);
          } else {
            el.style.opacity = "1";
          }
        } else {
          // No real drag happened -- treat it as a tap: add the word directly.
          addWordToComposition(tile);
        }
      }

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    });
  }

  function renderComposition() {
    const comp = document.getElementById("composition");
    const saveBtn = document.getElementById("submit-assemble");
    comp.innerHTML = "";

    if (composition.length === 0) {
      comp.innerHTML = '<span class="placeholder">Tap or drag fragments here to build your sentence...</span>';
      saveBtn.disabled = true;
      return;
    }

    composition.forEach((word, i) => {
      const el = document.createElement("div");
      el.className = "patch " + VARIANTS[i % VARIANTS.length];
      el.textContent = word;
      el.title = "Click to remove";
      el.addEventListener("click", () => {
        composition.splice(i, 1);
        renderComposition();
      });
      comp.appendChild(el);
    });
    saveBtn.disabled = false;
  }

  generatePool();
  renderComposition();

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------------------------------------------------------------
  // 2. FIREBASE -- loaded separately and defensively. If this block
  //    fails for any reason, everything above still works; only
  //    saving/the live wall will be unavailable.
  //    Replace firebaseConfig with your own project's config
  //    (Project settings -> General -> Your apps -> SDK setup).
  // ---------------------------------------------------------------
  const firebaseConfig = {
    apiKey: "AIzaSyB3Mzv_pDlBc7BMAy5TNZNoar-hTM06HPk",
    authDomain: "cdw-delym-engagecomp.firebaseapp.com",
    projectId: "cdw-delym-engagecomp",
    storageBucket: "cdw-delym-engagecomp.firebasestorage.app",
    messagingSenderId: "216800929839",
    appId: "1:216800929839:web:9159d2e6bbd8742e7cbeda",
    measurementId: "G-H9NGYTXJP5"
  };

  let dreamsRef = null;
  let fsAddDoc, fsServerTimestamp, fsQuery, fsOrderBy, fsLimit, fsOnSnapshot;

  async function initFirebase() {
    try {
      const appMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
      const fsMod = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

      fsAddDoc = fsMod.addDoc;
      fsServerTimestamp = fsMod.serverTimestamp;
      fsQuery = fsMod.query;
      fsOrderBy = fsMod.orderBy;
      fsLimit = fsMod.limit;
      fsOnSnapshot = fsMod.onSnapshot;

      const app = appMod.initializeApp(firebaseConfig);
      const db = fsMod.getFirestore(app);
      dreamsRef = fsMod.collection(db, "dreams");

      startDreamWall();
    } catch (err) {
      console.error("Firebase failed to load:", err);
      document.getElementById("feed").innerHTML =
        '<p class="feed-empty">Dream wall unavailable right now -- open this file in a browser with network access, and add your Firebase config near the top of the script, to activate saving and the live wall.</p>';
    }
  }

  document.getElementById("submit-write").addEventListener("click", async () => {
    const title = document.getElementById("dream-title").value.trim();
    const text = document.getElementById("dream-text").value.trim();
    const statusEl = document.getElementById("status-write");

    if (!text) {
      statusEl.textContent = "Write a few words about your dream first.";
      return;
    }

    // "Piece it together" draws its words from what's actually been written
    // here -- capture it right away, whether or not Firebase ends up saving.
    localWrittenTexts.push(text);

    if (!dreamsRef) {
      statusEl.textContent = "Saved for this session -- connect Firebase above to add it to the shared wall.";
      document.getElementById("dream-title").value = "";
      document.getElementById("dream-text").value = "";
      document.querySelectorAll("#mood-chips .patch").forEach(c => c.classList.remove("selected"));
      selectedMood = null;
      return;
    }
    statusEl.textContent = "Saving...";

    try {
      await fsAddDoc(dreamsRef, {
        type: "written",
        title: title || null,
        text,
        mood: selectedMood || null,
        createdAt: fsServerTimestamp()
      });
      statusEl.textContent = "Dream saved. Thank you for sharing.";
      document.getElementById("dream-title").value = "";
      document.getElementById("dream-text").value = "";
      document.querySelectorAll("#mood-chips .patch").forEach(c => c.classList.remove("selected"));
      selectedMood = null;
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Something went wrong. Please try again.";
    }
  });

  // ---------------------------------------------------------------
  // Assembled-dream reveal popup -- shows the composed words one by
  // one, animating in, when "Save my dream" is pressed.
  // ---------------------------------------------------------------
  const revealOverlay = document.getElementById("dream-reveal");
  const revealWordsEl = document.getElementById("reveal-words");
  const revealStatusEl = document.getElementById("reveal-status");
  const REVEAL_STAGGER_MS = 220;

  function showDreamReveal(words) {
    revealWordsEl.innerHTML = "";
    revealStatusEl.textContent = "";
    words.forEach((word, i) => {
      const el = document.createElement("div");
      el.className = "patch " + VARIANTS[i % VARIANTS.length] + " reveal-word";
      el.textContent = word;
      el.style.animationDelay = (i * REVEAL_STAGGER_MS) + "ms";
      revealWordsEl.appendChild(el);
    });
    revealOverlay.classList.add("open");
    revealOverlay.setAttribute("aria-hidden", "false");
  }

  function hideDreamReveal() {
    revealOverlay.classList.remove("open");
    revealOverlay.setAttribute("aria-hidden", "true");
  }

  document.getElementById("reveal-close").addEventListener("click", hideDreamReveal);
  revealOverlay.addEventListener("click", (e) => {
    if (e.target === revealOverlay) hideDreamReveal();
  });

  // ---------------------------------------------------------------
  // Assembled-dreams list popup -- keeps assembled entries out of the
  // main write-it-down feed; they're only shown when this button/popup
  // is opened on request.
  // ---------------------------------------------------------------
  let latestAssembledEntries = [];
  const assembledListOverlay = document.getElementById("assembled-list-overlay");
  const assembledListEl = document.getElementById("assembled-list");

  function renderAssembledList(entries) {
    if (entries.length === 0) {
      assembledListEl.innerHTML = '<p class="feed-empty">No assembled dreams yet.</p>';
      return;
    }
    assembledListEl.innerHTML = entries.map(e => `
      <div class="feed-item">
        <div class="meta">Assembled dream</div>
        <div>${escapeHtml(e.text || "")}</div>
      </div>
    `).join("");
  }

  function showAssembledList() {
    renderAssembledList(latestAssembledEntries);
    assembledListOverlay.classList.add("open");
    assembledListOverlay.setAttribute("aria-hidden", "false");
  }

  function hideAssembledList() {
    assembledListOverlay.classList.remove("open");
    assembledListOverlay.setAttribute("aria-hidden", "true");
  }

  document.getElementById("btn-assembled-dreams").addEventListener("click", showAssembledList);
  document.getElementById("assembled-list-close").addEventListener("click", hideAssembledList);
  assembledListOverlay.addEventListener("click", (e) => {
    if (e.target === assembledListOverlay) hideAssembledList();
  });

  document.getElementById("submit-assemble").addEventListener("click", async () => {
    const statusEl = document.getElementById("status-assemble");
    if (composition.length === 0) return;

    // animate the words appearing one by one right away, independent of save state
    showDreamReveal(composition);

    if (!dreamsRef) {
      revealStatusEl.textContent = "Firebase isn't connected -- this dream stays on your screen only.";
      latestAssembledEntries = [{ text: composition.join(" ") }, ...latestAssembledEntries];
      composition = [];
      renderComposition();
      return;
    }

    const sentence = composition.join(" ");
    statusEl.textContent = "Saving...";
    revealStatusEl.textContent = "Saving...";
    try {
      await fsAddDoc(dreamsRef, {
        type: "assembled",
        words: composition,
        text: sentence,
        createdAt: fsServerTimestamp()
      });
      statusEl.textContent = "Dream saved. Thank you for sharing.";
      revealStatusEl.textContent = "Saved to the dream wall.";
      composition = [];
      renderComposition();
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Something went wrong. Please try again.";
      revealStatusEl.textContent = "Something went wrong saving this one.";
    }
  });

  function startDreamWall() {
    const MOODS = ["Happy", "Strange", "Scary", "Peaceful", "Confusing"];
    const wallQuery = fsQuery(dreamsRef, fsOrderBy("createdAt", "desc"), fsLimit(20));

    fsOnSnapshot(wallQuery, (snapshot) => {
      const entries = snapshot.docs.map(doc => doc.data());
      renderMoodBars(entries, MOODS);
      renderFeed(entries.filter(e => e.type === "written"));

      latestAssembledEntries = entries.filter(e => e.type === "assembled");
      if (assembledListOverlay.classList.contains("open")) renderAssembledList(latestAssembledEntries);

      // keep the composer's word pool current with what's been written
      firestoreWrittenTexts = entries.filter(e => e.type === "written").map(e => e.text || "");
    }, (err) => {
      console.error("Dream wall failed to load:", err);
      document.getElementById("feed").innerHTML =
        '<p class="feed-empty">Connect your Firebase config above to activate the dream wall.</p>';
    });
  }

  function renderMoodBars(entries, MOODS) {
    const counts = {};
    MOODS.forEach(m => counts[m] = 0);
    entries.forEach(e => { if (e.mood && counts[e.mood] !== undefined) counts[e.mood]++; });
    const max = Math.max(1, ...Object.values(counts));

    const container = document.getElementById("mood-bars");
    container.innerHTML = MOODS.map(mood => `
      <div class="mood-bar-row">
        <div class="mood-bar-label">${mood}</div>
        <div class="mood-bar-track">
          <div class="mood-bar-fill" style="width:${(counts[mood] / max) * 100}%"></div>
        </div>
        <div class="mood-bar-count">${counts[mood]}</div>
      </div>
    `).join("");
  }

  function renderFeed(entries) {
    const feed = document.getElementById("feed");
    if (entries.length === 0) {
      feed.innerHTML = '<p class="feed-empty">No dreams yet -- be the first to add one above.</p>';
      return;
    }
    feed.innerHTML = entries.map(e => {
      const label = e.type === "written" ? (e.title || "Untitled dream") : "Assembled dream";
      const moodTag = e.mood ? " - " + e.mood : "";
      return `
        <div class="feed-item">
          <div class="meta">${label}${moodTag}</div>
          <div>${escapeHtml(e.text || "")}</div>
        </div>
      `;
    }).join("");
  }

  initFirebase();