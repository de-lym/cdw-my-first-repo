const dreamMessages = [
  'The water is warm. You don\'t remember getting in.',
  'A voice on the intercom says: "Please proceed to the nearest exit."',
  'The clock reads 3:47 PM. It has always read 3:47 PM.',
  'You find a note in your pocket. It\'s in your handwriting.',
  'The clouds look back at you.',
  'Everything here is slightly too quiet.',
  'You were supposed to leave hours ago.',
  'The hallway goes on forever. The carpet is soft.',
  'Someone waved from a window. You waved back.',
  'This place exists only when you\'re not looking for it.',
];

const letterContent = {
  h: {
    title: 'home.txt',
    html: `
      <p class="window-label">home</p>
      <p>Cloud Landing — a project archive suspended between waking and sleep. Dong Eun Lim · 2026.</p>
      <p>This page holds fragments of places that feel familiar but never existed.</p>
    `,
  },
  o: {
    title: 'origin.txt',
    html: `
      <p class="window-label">origin</p>
      <p>Inspired by liminal photography, strange clouds, and the quiet unease of half-remembered afternoons.</p>
      <p>Advisor: Advisor Name</p>
    `,
  },
  m: {
    title: 'motivation.txt',
    html: `
      <p class="window-label">motivation</p>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. The air smelled like chlorine and cut grass.</p>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
    `,
  },
  e: {
    title: 'methodology.txt',
    html: `
      <p class="window-label">methodology</p>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
    `,
  },
  p: {
    title: 'project.txt',
    html: `
      <p class="window-label">abstract</p>
      <p>Lorem ipsum drifts like fog through empty corridors. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
    `,
  },
  a: {
    title: 'about.txt',
    html: `
      <p class="window-label">about</p>
      <p>Computational Design Practices · Project Archive · Volume One.</p>
      <p>A collection of soft surreal spaces — suburbs, pools, and tree-lined streets that exist only in memory.</p>
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

let popupCount = 0;
let topZ = 50;

function focusPopup(popup) {
  topZ += 1;
  popup.style.zIndex = topZ;
  document.querySelectorAll('.popup-window').forEach(function (win) {
    win.classList.remove('focused');
  });
  popup.classList.add('focused');
}

function makeDraggable(popup, handle) {
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;

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

  window.addEventListener('mousemove', function (e) {
    if (!dragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    popup.style.left = `${originX + dx}px`;
    popup.style.top = `${originY + dy}px`;
  });

  window.addEventListener('mouseup', function () {
    dragging = false;
  });
}

function openPopup(key, anchorRect) {
  const content = letterContent[key];
  if (!content) return;

  const layer = document.getElementById('popupLayer');
  popupCount += 1;

  const offset = ((popupCount - 1) % 5) * 24;
  const popup = document.createElement('div');
  popup.className = 'popup-window';

  const left = anchorRect
    ? Math.min(anchorRect.left + offset, window.innerWidth - 380)
    : 48 + offset;
  const top = anchorRect
    ? Math.min(anchorRect.top + offset, window.innerHeight - 200)
    : 80 + offset;

  popup.style.left = `${Math.max(16, left)}px`;
  popup.style.top = `${Math.max(16, top)}px`;

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

  requestAnimationFrame(function () {
    popup.classList.add('open');
    focusPopup(popup);
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
