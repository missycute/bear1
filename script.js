/* ═══════════════════════════════════════════════
   PROFILE.JS — Updated Single Page Logic
═══════════════════════════════════════════════ */

(function initEnter() {
  const clk = document.getElementById('es-clock');

  function tick() {
    const n = new Date();
    clk.textContent =
      String(n.getHours()).padStart(2,'0') + ':' +
      String(n.getMinutes()).padStart(2,'0') + ':' +
      String(n.getSeconds()).padStart(2,'0');
  }

  tick();
  setInterval(tick, 1000);

  const ticker = document.getElementById('es-ticker');
  let tc = 0;

  setInterval(() => {
    tc = (tc + 1) % 11;
    ticker.textContent = '▓'.repeat(tc) + '░'.repeat(10 - tc);
  }, 250);

  const cv = document.getElementById('enter-canvas');
  const ctx = cv.getContext('2d');

  let W, H, pts = [];
  let mx = -9999, my = -9999;

  function resize() {
    W = cv.width = window.innerWidth;
    H = cv.height = window.innerHeight;
    buildPts();
  }

  function buildPts() {
    pts = [];
    const n = Math.floor(W * H / 8000);

    for (let i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.6 + 0.2,
        b: Math.random() > 0.75
      });
    }
  }

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function drawEnter() {
    ctx.clearRect(0, 0, W, H);

    pts.forEach(p => {
      const dx = p.x - mx;
      const dy = p.y - my;
      const d = Math.hypot(dx, dy);

      if (d < 130 && d > 0) {
        p.x += (dx / d) * 0.7;
        p.y += (dy / d) * 0.7;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.b
        ? `rgba(0,212,255,${p.a})`
        : `rgba(0,100,255,${p.a * 0.5})`;
      ctx.fill();
    });

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 95) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 95) * 0.09})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawEnter);
  }

  resize();
  window.addEventListener('resize', resize);
  drawEnter();

  const btn = document.getElementById('enter-btn');
  const loader = document.getElementById('enter-loader');
  const fill = document.getElementById('el-fill');
  const msg = document.getElementById('el-msg');
  const es = document.getElementById('enter-screen');
  const pg = document.getElementById('profile-page');

  const MSGS = [
    'BOOTING SYSTEM...',
    'LOADING ASSETS...',
    'ESTABLISHING LINK...',
    'DECRYPTING PROFILE...',
    'ACCESS GRANTED ✓'
  ];

  btn.addEventListener('click', () => {
    btn.style.display = 'none';
    loader.style.display = 'block';

    let pct = 0;
    let li = -1;

    const iv = setInterval(() => {
      pct += Math.random() * 3.5 + 1;
      if (pct > 100) pct = 100;

      fill.style.width = pct + '%';

      const mi = Math.min(
        Math.floor((pct / 100) * MSGS.length),
        MSGS.length - 1
      );

      if (mi !== li) {
        li = mi;
        msg.textContent = MSGS[mi];
      }

      if (pct >= 100) {
        clearInterval(iv);

        setTimeout(() => {
          es.classList.add('out');
          pg.style.display = 'block';

          setTimeout(() => {
            es.style.display = 'none';
            initProfile();
          }, 950);
        }, 500);
      }
    }, 55);
  });
})();

function initProfile() {
  initBgCanvas();
  initMusic();
}

function initBgCanvas() {
  const cv = document.getElementById('bg-canvas');
  if (!cv) return;

  const ctx = cv.getContext('2d');
  let W, H, pts = [];
  let mx = -9999, my = -9999;

  function resize() {
    W = cv.width = window.innerWidth;
    H = cv.height = window.innerHeight;

    pts = [];
    const n = Math.floor(W * H / 13000);

    for (let i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.5 + 0.1,
        c: Math.random() > 0.5
      });
    }
  }

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    pts.forEach(p => {
      const dx = p.x - mx;
      const dy = p.y - my;
      const d = Math.hypot(dx, dy);

      if (d < 80 && d > 0) {
        p.x += (dx / d) * 0.4;
        p.y += (dy / d) * 0.4;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c
        ? `rgba(0,212,255,${p.a})`
        : `rgba(0,90,255,${p.a * 0.55})`;
      ctx.fill();
    });

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 80) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 80) * 0.055})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
}

function initMusic() {
  const eqWrap = document.getElementById('mc-eq');
  const N_EQ = 22;
  const eqBars = [];

  if (eqWrap) {
    for (let i = 0; i < N_EQ; i++) {
      const b = document.createElement('div');
      b.className = 'eqb';
      b.style.height = '3px';
      eqWrap.appendChild(b);
      eqBars.push(b);
    }
  }

  const mc = document.getElementById('music-canvas');
  const mctx = mc ? mc.getContext('2d') : null;
  let vrot = 0;

  window._playing = false;

  function drawViz() {
    if (!mctx) {
      requestAnimationFrame(drawViz);
      return;
    }

    const S = 200;
    const cx = S / 2;
    const cy = S / 2;
    const BR = 66;

    mc.width = S;
    mc.height = S;

    mctx.clearRect(0, 0, S, S);

    const pl = window._playing;

    const g = mctx.createRadialGradient(cx, cy, BR - 5, cx, cy, BR + 26);
    g.addColorStop(0, pl ? 'rgba(0,212,255,.3)' : 'rgba(0,212,255,.06)');
    g.addColorStop(1, 'rgba(0,0,0,0)');

    mctx.beginPath();
    mctx.arc(cx, cy, BR + 26, 0, Math.PI * 2);
    mctx.fillStyle = g;
    mctx.fill();

    const SP = 72;

    for (let i = 0; i < SP; i++) {
      const ang = (i / SP) * Math.PI * 2 + vrot;
      const amp = pl
        ? (Math.sin(Date.now() * 0.005 + i * 0.45) * 0.5 + 0.5) * 28 + 6
        : 4;

      const x1 = cx + Math.cos(ang) * BR;
      const y1 = cy + Math.sin(ang) * BR;
      const x2 = cx + Math.cos(ang) * (BR + amp);
      const y2 = cy + Math.sin(ang) * (BR + amp);

      mctx.beginPath();
      mctx.moveTo(x1, y1);
      mctx.lineTo(x2, y2);
      mctx.strokeStyle = `hsla(${185 + i * 1.6},100%,65%,${pl ? 0.85 : 0.18})`;
      mctx.lineWidth = 1.5;
      mctx.stroke();
    }

    mctx.beginPath();
    mctx.arc(cx, cy, BR, 0, Math.PI * 2);
    mctx.strokeStyle = pl ? 'rgba(0,212,255,.5)' : 'rgba(0,212,255,.13)';
    mctx.lineWidth = 1;
    mctx.stroke();

    if (pl) vrot += 0.009;

    requestAnimationFrame(drawViz);
  }

  drawViz();

  let eqIv = null;

  function startEQ() {
    clearInterval(eqIv);
    eqIv = setInterval(() => {
      eqBars.forEach((b, i) => {
        const h =
          Math.abs(Math.sin(Date.now() * 0.004 + i * 0.65)) * 30 +
          Math.random() * 8 +
          3;
        b.style.height = Math.min(h, 38) + 'px';
      });
    }, 80);
  }

  function stopEQ() {
    clearInterval(eqIv);
    eqBars.forEach(b => b.style.height = '3px');
  }

  const vinyl = document.getElementById('vinyl');
  const bPlay = document.getElementById('btn-play');
  const bPrev = document.getElementById('btn-prev');
  const bNext = document.getElementById('btn-next');
  const bVd = document.getElementById('bvd');
  const bVu = document.getElementById('bvu');
  const vrange = document.getElementById('vrange');
  const vfill = document.getElementById('vfill');
  const vlbl = document.getElementById('vlbl');
  const playI = document.getElementById('play-ico');
  const pausI = document.getElementById('pause-ico');
  const progF = document.getElementById('mc-pf');
  const progH = document.getElementById('mc-ph');
  const tCur = document.getElementById('tc');
  const tTot = document.getElementById('tt');
  const mStat = document.getElementById('mstatus');

  let player;
  let playing = false;
  let vol = 75;
  let progIv = null;

  function fmt(s) {
    return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  }

  function setPlay(v) {
    playing = v;
    window._playing = v;

    if (playI) playI.style.display = v ? 'none' : '';
    if (pausI) pausI.style.display = v ? '' : 'none';

    if (vinyl) {
      if (v) vinyl.classList.add('spin');
      else vinyl.classList.remove('spin');
    }

    if (v) startEQ();
    else stopEQ();

    if (mStat) mStat.textContent = v ? '▶ PLAYING' : '❙❙ PAUSED';

    clearInterval(progIv);

    if (v) {
      progIv = setInterval(() => {
        if (!player || !player.getCurrentTime) return;

        const cur = player.getCurrentTime();
        const tot = player.getDuration() || 213;
        const pct = (cur / tot) * 100;

        if (progF) progF.style.width = pct + '%';
        if (progH) progH.style.left = pct + '%';
        if (tCur) tCur.textContent = fmt(cur);
        if (tTot) tTot.textContent = fmt(tot);
      }, 500);
    }
  }

  function setVol(v) {
    v = Math.max(0, Math.min(100, v));
    vol = v;

    if (vrange) vrange.value = v;
    if (vfill) vfill.style.width = v + '%';
    if (vlbl) vlbl.textContent = v + '%';

    if (player && player.setVolume) player.setVolume(v);
  }

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('yt-player', {
      events: {
        onReady: () => {
          player.setVolume(vol);
        },
        onStateChange: e => {
          setPlay(e.data === YT.PlayerState.PLAYING);
        }
      }
    });
  };

  const yt = document.createElement('script');
  yt.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(yt);

  if (bPlay) {
    bPlay.addEventListener('click', () => {
      if (!player) return;
      if (playing) player.pauseVideo();
      else player.playVideo();
    });
  }

  if (bPrev) {
    bPrev.addEventListener('click', () => {
      if (player && player.seekTo) player.seekTo(0, true);
    });
  }

  if (bNext) {
    bNext.addEventListener('click', () => {
      if (player && player.seekTo) player.seekTo(0, true);
    });
  }

  if (bVd) bVd.addEventListener('click', () => setVol(vol - 10));
  if (bVu) bVu.addEventListener('click', () => setVol(vol + 10));
  if (vrange) vrange.addEventListener('input', () => setVol(parseInt(vrange.value, 10)));

  const pb = document.getElementById('mc-pb');
  if (pb) {
    pb.addEventListener('click', e => {
      if (!player || !player.getDuration) return;
      const r = pb.getBoundingClientRect();
      const pct = (e.clientX - r.left) / r.width;
      player.seekTo(pct * player.getDuration(), true);
    });
  }
}
/* Disable right click, drag, image dragging, text selection shortcuts */

(function () {
  // Disable right click
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // Disable dragging on whole page
  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
  });

  // Disable dropping
  document.addEventListener("drop", function (e) {
    e.preventDefault();
  });

  // Disable common save / view source / dev shortcuts
  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();

    if (
      key === "f12" ||
      (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
      (e.ctrlKey && ["u", "s", "a", "p"].includes(key))
    ) {
      e.preventDefault();
    }
  });

  // Disable selecting images specifically
  document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("draggable", "false");
  });
})();
