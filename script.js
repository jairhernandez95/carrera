// ---- mobile menu ----
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
    menuToggle.textContent = '☰';
  }));

  // ---- marigold petal field ----
  const petalField = document.getElementById('petalField');
  const PETAL_COUNT = 22;
  for (let i = 0; i < PETAL_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 8;
    const delay = Math.random() * 12;
    const drift = (Math.random() * 120 - 60) + 'px';
    const size = 6 + Math.random() * 7;
    const colors = ['#f4b942', '#f2701d', '#e63969'];
    p.style.left = left + 'vw';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.background = colors[i % colors.length];
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = '-' + delay + 's';
    p.style.setProperty('--drift', drift);
    petalField.appendChild(p);
  }

  // ---- countdown to first kit pickup (Oct 31, 2026 9:00 AM, America/Tijuana ~ UTC-7) ----
  const target = new Date('2026-10-31T09:00:00-07:00').getTime();
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  const doneEl = document.getElementById('countdown-done');
  const gridEl = document.getElementById('countdown');

  function pad(n){ return String(n).padStart(2,'0'); }

  function tick(){
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0){
      gridEl.style.display = 'none';
      doneEl.style.display = 'block';
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff / (1000*60*60)) % 24);
    const m = Math.floor((diff / (1000*60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    daysEl.textContent = pad(d);
    hoursEl.textContent = pad(h);
    minsEl.textContent = pad(m);
    secsEl.textContent = pad(s);
  }
  tick();
  const timer = setInterval(tick, 1000);

  // ---- illustrative capacity bar (static, honest placeholder) ----
  const capFill = document.getElementById('capFill');
  const capCount = document.getElementById('capCount');
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      capFill.style.width = '62%';
      capCount.textContent = 'Cupo de referencia · consulta disponibilidad real al inscribirte';
    }, 400);
  });

  // ---- copy link ----
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('https://bit.ly/carreradiademuertos');
      copyBtn.textContent = '¡Copiado!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = 'Copiar';
        copyBtn.classList.remove('copied');
      }, 1800);
    } catch (e) {
      copyBtn.textContent = 'bit.ly/carreradiademuertos';
    }
  });

  // ---- scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
