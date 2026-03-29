/* ============================================================
   PRINCE HAMMOND — PORTFOLIO · JavaScript
   JSON-driven content, theme switching, cursor glow, calendar,
   todo, scroll effects, contact form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ─────────────────────────────────────────────────────────
     THEME SYSTEM
     ───────────────────────────────────────────────────────── */
  const THEME_KEY = 'portfolio_theme';
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themePicker = document.getElementById('theme-picker');

  function applyTheme(name) {
    if (!name) return;
    html.setAttribute('data-theme', name);
    localStorage.setItem(THEME_KEY, name);

    // Update picker active state if it exists
    if (themePicker) {
      themePicker.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === name);
      });
    }
  }

  // Restore saved theme immediately
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);

  // Toggle picker open/close
  if (themeToggle && themePicker) {
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      themePicker.classList.toggle('open');
    });

    // Pick a theme
    themePicker.querySelectorAll('.theme-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyTheme(btn.getAttribute('data-theme'));
        themePicker.classList.remove('open');
      });
    });

    // Close picker on outside click
    document.addEventListener('click', () => themePicker.classList.remove('open'));
    themePicker.addEventListener('click', (e) => e.stopPropagation());
  }

  /* ─────────────────────────────────────────────────────────
     GLASS MODE TOGGLE
     ───────────────────────────────────────────────────────── */
  const GLASS_KEY = 'portfolio_glass';
  const glassToggle = document.getElementById('glass-toggle');

  function applyGlass(on) {
    document.body.classList.toggle('glass-mode', on);
    if (glassToggle) {
      glassToggle.classList.toggle('active', on);
    }
    localStorage.setItem(GLASS_KEY, on ? '1' : '0');
  }

  // Restore saved preference
  const isGlass = localStorage.getItem(GLASS_KEY) === '1';
  applyGlass(isGlass);

  if (glassToggle) {
    glassToggle.addEventListener('click', () => {
      const currentlyOn = document.body.classList.contains('glass-mode');
      applyGlass(!currentlyOn);
    });
  }
  /* ─────────────────────────────────────────────────────────
     CURSOR GLOW
     ───────────────────────────────────────────────────────── */
  const glow = document.getElementById('cursor-glow');

  if (glow && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, gx = 0, gy = 0;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    (function tick() {
      gx += (mx - gx) * 0.1;
      gy += (my - gy) * 0.1;
      glow.style.left = gx + 'px';
      glow.style.top = gy + 'px';
      requestAnimationFrame(tick);
    })();
  } else if (glow) {
    glow.style.display = 'none';
  }

  /* ─────────────────────────────────────────────────────────
     NAVBAR SCROLL + ACTIVE PAGE
     ───────────────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  // Set active link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  function onScroll() {
    // Navbar scrolled class
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    // Hero name scroll zoom effect
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
      const scrollY = window.scrollY;
      const threshold = 600;
      if (scrollY <= threshold) {
        const p = scrollY / threshold;
        const scale = 1 + (p * 2.5); // Zoom IN (get bigger) as we scroll down
        const bgZoom = 150 + (p * 100);
        const opacity = 1 - (p * 1.2);

        heroName.style.transform = `scale(${scale})`;
        heroName.style.backgroundSize = `${bgZoom}%`;
        heroName.style.opacity = Math.max(0, parseFloat(opacity.toFixed(2)));
      } else {
        heroName.style.opacity = 0;
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─────────────────────────────────────────────────────────
     MOBILE MENU
     ───────────────────────────────────────────────────────── */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinksUl = document.getElementById('nav-links');

  if (menuBtn && navLinksUl) {
    menuBtn.addEventListener('click', () => navLinksUl.classList.toggle('open'));
    navLinksUl.querySelectorAll('.nav-link').forEach((l) =>
      l.addEventListener('click', () => navLinksUl.classList.remove('open'))
    );
  }

  /* ─────────────────────────────────────────────────────────
     HERO PARTICLES
     ───────────────────────────────────────────────────────── */
  const particlesEl = document.getElementById('particles');

  if (particlesEl) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = (Math.random() * 6) + 's';
      p.style.animationDuration = (4 + Math.random() * 4) + 's';
      particlesEl.appendChild(p);
    }
  }

  /* ─────────────────────────────────────────────────────────
     WELCOME GREETING — 7 LANGUAGES
     ───────────────────────────────────────────────────────── */
  const welcomeEl = document.getElementById('hero-welcome');
  const welcomeGreetings = [
    { text: 'Welcome', lang: 'English' },
    { text: 'Akwaaba', lang: 'Twi' },
    { text: '\u6B22\u8FCE', lang: 'Chinese' },
    { text: 'Bienvenue', lang: 'French' },
    { text: 'Bienvenido', lang: 'Spanish' },
    { text: '\u0645\u0631\u062D\u0628\u0627\u064B', lang: 'Arabic' },
    { text: '\u0E22\u0E34\u0E19\u0E14\u0E35\u0E15\u0E49\u0E2D\u0E19\u0E23\u0E31\u0E1A', lang: 'Thai' },
    { text: '\u3088\u3046\u3053\u305D', lang: 'Japanese' },
    { text: '\uD658\uC601\uD569\uB2C8\uB2E4', lang: 'Korean' },
    { text: 'Willkommen', lang: 'German' },
    { text: 'Benvenuto', lang: 'Italian' },
    { text: 'Bem-vindo', lang: 'Portuguese' },
    { text: '\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C', lang: 'Russian' },
    { text: '\u0938\u094D\u0935\u093E\u0917\u0924 \u0939\u0948', lang: 'Hindi' },
    { text: 'Ho\u015F geldiniz', lang: 'Turkish' },
    { text: 'Ch\u00E0o m\u1E93ng', lang: 'Vietnamese' },
    { text: 'Witamy', lang: 'Polish' },
    { text: 'Welkom', lang: 'Dutch' },
    { text: 'Karibu', lang: 'Swahili' },
    { text: '\u039A\u03B1\u03BB\u03CE\u03C2 \u03AE\u03C1\u03B8\u03B1\u03C4\u03B5', lang: 'Greek' },
    { text: '\u05D1\u05E8\u05D5\u05DA \u05D4\u05D1\u05D0', lang: 'Hebrew' },
    { text: 'V\u00E4lkommen', lang: 'Swedish' },
    { text: 'Velkommen', lang: 'Norwegian' },
    { text: 'Tervetuloa', lang: 'Finnish' },
    { text: 'V\u00EDtejte', lang: 'Czech' },
    { text: '\u00DCdv\u00F6z\u00F6lj\u00FCk', lang: 'Hungarian' },
    { text: 'Bine a\u021Bi venit', lang: 'Romanian' },
    { text: 'Selamat datang', lang: 'Indonesian' },
    { text: 'Selamat datang', lang: 'Malay' },
    { text: 'Maligayang pagdating', lang: 'Filipino' },
    { text: '\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u062F', lang: 'Persian' },
    { text: '\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u062F', lang: 'Urdu' },
    { text: 'Ek\u0027abo', lang: 'Yoruba' },
    { text: 'Nn\u1ECD\u1ECD', lang: 'Igbo' },
    { text: '\u12A5\u1297\u12CB\u1295 \u1210\u1205\u1293 \u1218\u1221', lang: 'Amharic' },
    { text: '\u0BB5\u0BB0\u0BB5\u0BC7\u0BB1\u0BCD\u0BAA\u0BC1', lang: 'Tamil' },
    { text: '\u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02', lang: 'Telugu' },
    { text: '\u0938\u094D\u0935\u093E\u0917\u0924 \u0906\u0939\u0947', lang: 'Marathi' },
    { text: '\u0A1C\u0A40 \u0A06\u0A07\u0A06\u0A32 \u0A28\u0A42', lang: 'Punjabi' },
    { text: '\u041B\u0430\u0441\u043A\u0430\u0432\u043E \u043F\u0440\u043E\u0441\u0438\u043C\u043E', lang: 'Ukrainian' },
    { text: 'Barka da zuwa', lang: 'Hausa' },
    { text: 'Dobredo\u0161li', lang: 'Slovenian' },
    { text: 'Bon bini', lang: 'Papiamento' },
    { text: 'Kia Ora', lang: 'Maori' },
    { text: 'Aloha', lang: 'Hawaiian' }
  ];

  if (welcomeEl) {
    let welcomeIdx = 0;

    function showWelcome() {
      const { text, lang } = welcomeGreetings[welcomeIdx];
      welcomeEl.innerHTML = '<span class="welcome-text">' + text + '</span> <span class="welcome-lang">' + lang + '</span>';
      welcomeEl.classList.remove('fade-out');
      welcomeEl.classList.add('fade-in');

      setTimeout(function () {
        welcomeEl.classList.remove('fade-in');
        welcomeEl.classList.add('fade-out');
      }, 2000);

      setTimeout(function () {
        welcomeIdx = (welcomeIdx + 1) % welcomeGreetings.length;
        showWelcome();
      }, 2500);
    }

    showWelcome();
  }  /* ─────────────────────────────────────────────────────────
     TYPED TAGLINE
     ───────────────────────────────────────────────────────── */
  const typedEl = document.getElementById('typed-tagline');
  const phrases = [
    'CS Student & Aspiring Developer',
    'Full-Stack Enthusiast',
    'Open-Source Contributor',
    'Lifelong Learner'
  ];

  if (typedEl) {
    let phraseIdx = 0, charIdx = 0, deleting = false;

    function typeLoop() {
      const current = phrases[phraseIdx];
      if (!deleting) {
        typedEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
          setTimeout(() => { deleting = true; typeLoop(); }, 2000);
          return;
        }
      } else {
        typedEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 65);
    }

    typeLoop();
  }

  /* ─────────────────────────────────────────────────────────
     SCROLL-REVEAL
     ───────────────────────────────────────────────────────── */
  const revealSelector =
    '.section-header, .project-card, .blog-card, .glass-card, .planner-container, .contact-container, .about-container';

  function initReveal() {
    document.querySelectorAll(revealSelector).forEach((el) => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
  }

  initReveal();

  /* ─────────────────────────────────────────────────────────
     STAT COUNTER ANIMATION
     ───────────────────────────────────────────────────────── */
  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach((el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      const dur = 1400, start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
  }

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
    }, { threshold: 0.3 }).observe(heroStats);
  }

  /* ─────────────────────────────────────────────────────────
     JSON DATA LOADER
     ───────────────────────────────────────────────────────── */

  /* Utility: safe fetch with inline fallback */
  async function loadJSON(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(res.status);
      return await res.json();
    } catch {
      return null;
    }
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  /* ── Load profile.json → populate About, Contact, Stats ── */
  async function loadProfile() {
    const profile = await loadJSON('data/profile.json');
    if (!profile) return;

    // About section
    const bioEl = document.getElementById('about-bio');
    if (bioEl) bioEl.textContent = profile.bio;

    const eduEl = document.getElementById('about-education');
    if (eduEl) eduEl.textContent = profile.education;

    const locEl = document.getElementById('about-location');
    if (locEl) locEl.textContent = profile.location;

    // Skills
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid && profile.skills) {
      skillsGrid.innerHTML = profile.skills
        .map((s) => `<span class="skill-chip">${escapeHtml(s)}</span>`)
        .join('');
    }

    // Interests
    const interestsList = document.getElementById('interests-list');
    if (interestsList && profile.interests) {
      interestsList.innerHTML = profile.interests
        .map((i) => `<span class="interest-tag">${i.icon} ${escapeHtml(i.name)}</span>`)
        .join('');
    }

    // Contact info
    const cEmail = document.getElementById('c-email');
    const cLocation = document.getElementById('c-location');
    const cLinkedin = document.getElementById('c-linkedin');
    const cGithub = document.getElementById('c-github');
    if (cEmail) cEmail.textContent = profile.email;
    if (cLocation) cLocation.textContent = profile.location;
    if (cLinkedin) cLinkedin.textContent = profile.linkedin;
    if (cGithub) cGithub.textContent = profile.github;

    // Stats
    const statsContainer = document.getElementById('hero-stats');
    if (statsContainer && profile.stats) {
      statsContainer.innerHTML = `
        <div class="stat"><span class="stat-number" data-target="${profile.stats.projects}">0</span><span class="stat-label">Projects</span></div>
        <div class="stat"><span class="stat-number" data-target="${profile.stats.blogPosts}">0</span><span class="stat-label">Blog Posts</span></div>
        <div class="stat"><span class="stat-number" data-target="${profile.stats.languages}">0</span><span class="stat-label">Languages</span></div>
      `;
    }

    // New: Education History
    const eduTimeline = document.getElementById('education-timeline');
    if (eduTimeline && profile.education_history) {
      eduTimeline.innerHTML = profile.education_history.map(item => `
        <div class="timeline-item">
          <h4>${escapeHtml(item.school)}</h4>
          <p>${escapeHtml(item.level)}</p>
        </div>
      `).join('');
    }

    // New: Leadership Roles
    const leadershipList = document.getElementById('leadership-list');
    if (leadershipList && profile.leadership_roles) {
      const roleIcons = {
        "Dispensary Prefect": "🏥",
        "Drama Club Vice President": "🎭",
        "Red Cross President": "❤️"
      };
      leadershipList.innerHTML = profile.leadership_roles.map(item => `
        <div class="leadership-item">
          <div class="leadership-icon">${roleIcons[item.role] || '✨'}</div>
          <div>
            <h4>${escapeHtml(item.role)}</h4>
            <span>${escapeHtml(item.context)}</span>
          </div>
        </div>
      `).join('');
    }
  }

  /* ── Load projects.json → render cards ── */
  let projectsData = [];

  async function loadProjects() {
    const data = await loadJSON('data/projects.json');
    if (!data) {
      // Inline fallback so the page still works offline / via file://
      projectsData = fallbackProjects();
    } else {
      projectsData = data;
    }
    renderProjects('all');
  }

  function fallbackProjects() {
    return [
      { icon: '🌐', title: 'DevConnect', desc: 'Social platform for devs.', tags: ['React', 'Node.js'], category: 'web', github: '#', demo: '#' },
      { icon: '🤖', title: 'SentimentScope', desc: 'Tweet sentiment analysis.', tags: ['Python', 'TensorFlow'], category: 'ml', github: '#', demo: '#' },
      { icon: '📝', title: 'MarkdownLive', desc: 'Real-time Markdown editor.', tags: ['TypeScript', 'Vite'], category: 'tools', github: '#', demo: '#' },
    ];
  }

  function renderProjects(filter) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    const items = filter === 'all' ? projectsData : projectsData.filter((p) => p.category === filter);
    grid.innerHTML = '';
    items.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.style.animationDelay = `${i * 0.08}s`;

      const hasLinks = p.github !== '#' || p.demo !== '#';

      card.innerHTML = `
        <div class="project-icon">${p.icon}</div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.desc)}</p>
        <div class="project-tags">${p.tags.map((t) => `<span class="project-tag">${escapeHtml(t)}</span>`).join('')}</div>
        ${hasLinks ? `
        <div class="project-links">
          ${p.github !== '#' ? `<a href="${p.github}">&#x1F4C2; Source</a>` : ''}
          ${p.demo !== '#' ? `<a href="${p.demo}">&#x1F680; Demo</a>` : ''}
        </div>` : ''}
      `;
      grid.appendChild(card);
    });
    initReveal();
  }

  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });

  /* ── Load blog.json → render cards ── */
  async function loadBlog() {
    let posts = await loadJSON('data/blog.json');
    if (!posts) {
      posts = [
        { title: 'Understanding Big-O', excerpt: 'Beginner-friendly guide.', date: 'Mar 20, 2026', category: 'Algorithms', gradient: 'linear-gradient(135deg,#667eea,#764ba2)' },
        { title: 'REST API in 48 Hours', excerpt: 'Hackathon lessons.', date: 'Mar 12, 2026', category: 'Backend', gradient: 'linear-gradient(135deg,#f093fb,#f5576c)' },
      ];
    }
    const grid = document.getElementById('blog-grid');
    if (!grid) return;
    grid.innerHTML = '';
    posts.forEach((post) => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.innerHTML = `
        <div class="blog-thumb" style="background:${post.gradient}">
          <span class="blog-category">${escapeHtml(post.category)}</span>
        </div>
        <div class="blog-body">
          <span class="blog-meta">${escapeHtml(post.date)}</span>
          <h3>${escapeHtml(post.title)}</h3>
          <p>${escapeHtml(post.excerpt)}</p>
          ${post.date !== 'Coming Soon' ? `<a href="#" class="blog-read-more">Read more &rarr;</a>` : ''}
        </div>
      `;
      grid.appendChild(card);
    });
    initReveal();
  }

  /* ── Bootstrap data loading ── */
  loadProfile();
  loadProjects();
  loadBlog();

  /* ─────────────────────────────────────────────────────────
     CALENDAR
     ───────────────────────────────────────────────────────── */
  const calDays = document.getElementById('cal-days');
  const calMonthYear = document.getElementById('cal-month-year');
  const calPrev = document.getElementById('cal-prev');
  const calNext = document.getElementById('cal-next');

  const today = new Date();
  let calYear = today.getFullYear();
  let calMonth = today.getMonth();
  let selectedDate = new Date(today);

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const STORAGE_KEY = 'portfolio_todos';

  function loadTodos() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
  function saveTodos(d) { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }
  let todosData = loadTodos();

  function dateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function datesWithTodos() {
    const s = new Set();
    for (const k of Object.keys(todosData)) {
      if (todosData[k] && todosData[k].length) s.add(k);
    }
    return s;
  }

  function renderCalendar() {
    if (!calDays || !calMonthYear) return;
    calMonthYear.textContent = `${MONTHS[calMonth]} ${calYear}`;

    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const prevMonthDays = new Date(calYear, calMonth, 0).getDate();
    const hasTodos = datesWithTodos();

    calDays.innerHTML = '';

    for (let i = firstDay - 1; i >= 0; i--) {
      const el = document.createElement('div');
      el.className = 'cal-day other-month';
      el.textContent = prevMonthDays - i;
      calDays.appendChild(el);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const el = document.createElement('div');
      el.className = 'cal-day';
      el.textContent = d;

      const thisDate = new Date(calYear, calMonth, d);

      if (d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear()) {
        el.classList.add('today');
      }
      if (d === selectedDate.getDate() && calMonth === selectedDate.getMonth() && calYear === selectedDate.getFullYear()) {
        el.classList.add('selected');
      }
      if (hasTodos.has(dateKey(thisDate))) {
        el.insertAdjacentHTML('beforeend', '<span class="dot-indicator"></span>');
      }

      el.addEventListener('click', () => {
        selectedDate = new Date(calYear, calMonth, d);
        renderCalendar();
        renderTodos();
      });

      calDays.appendChild(el);
    }

    const totalCells = firstDay + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const el = document.createElement('div');
      el.className = 'cal-day other-month';
      el.textContent = i;
      calDays.appendChild(el);
    }
  }

  if (calPrev) calPrev.addEventListener('click', () => { calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderCalendar(); });
  if (calNext) calNext.addEventListener('click', () => { calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderCalendar(); });

  renderCalendar();

  /* ─────────────────────────────────────────────────────────
     STREAK TRACKER LOGIC
     ───────────────────────────────────────────────────────── */
  const STREAK_KEY = 'portfolio_streak';
  const STREAK_DATE_KEY = 'portfolio_streak_last_date';
  const streakCountEl = document.getElementById('streak-count');

  function getStreak() {
    return parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
  }

  function updateStreak() {
    const todayStr = dateKey(new Date());
    const lastDate = localStorage.getItem(STREAK_DATE_KEY);
    let streak = getStreak();

    // Check if any task is done today
    const keys = Object.keys(todosData);
    const hasDoneToday = keys.some(k => k === todayStr && todosData[k].some(t => t.done));

    if (!hasDoneToday) {
      // Check if we lost the streak (if today is > 1 day after last update)
      if (lastDate) {
        const last = new Date(lastDate);
        const diff = (new Date(todayStr) - last) / (1000 * 60 * 60 * 24);
        if (diff > 1) {
          localStorage.setItem(STREAK_KEY, '0');
        }
      }
      renderStreak();
      return;
    }

    if (todayStr === lastDate) {
      renderStreak();
      return;
    }

    if (!lastDate) {
      streak = 1;
    } else {
      const last = new Date(lastDate);
      const diff = (new Date(todayStr) - last) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
      } else if (diff > 1) {
        streak = 1;
      }
    }

    localStorage.setItem(STREAK_KEY, streak.toString());
    localStorage.setItem(STREAK_DATE_KEY, todayStr);
    renderStreak();
  }

  function renderStreak() {
    if (streakCountEl) {
      streakCountEl.textContent = getStreak();
      const tracker = document.getElementById('streak-tracker');
      if (tracker) {
        tracker.style.display = 'flex';
      }
    }
  }

  // Initial update
  updateStreak();

  /* ─────────────────────────────────────────────────────────
     TODO LIST
     ───────────────────────────────────────────────────────── */
  const todoList = document.getElementById('todo-list');
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoPrio = document.getElementById('todo-priority');
  const todoCount = document.getElementById('todo-count');
  const todoTitle = document.getElementById('todo-date-title');

  function renderTodos() {
    if (!todoList) return;
    const key = dateKey(selectedDate);
    const items = todosData[key] || [];

    if (todoTitle) {
      const isToday = selectedDate.toDateString() === today.toDateString();
      todoTitle.textContent = isToday ? 'Tasks for Today' : `Tasks for ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}`;
    }

    if (todoCount) {
      const pending = items.filter((t) => !t.done).length;
      todoCount.textContent = `${pending} task${pending !== 1 ? 's' : ''}`;
    }

    todoList.innerHTML = '';
    if (!items.length) {
      todoList.innerHTML = '<li class="todo-empty">No tasks yet — add one above!</li>';
      return;
    }

    items.forEach((task, idx) => {
      const li = document.createElement('li');
      li.className = 'todo-item' + (task.done ? ' completed' : '');
      li.innerHTML = `
        <button class="todo-check" data-idx="${idx}">${task.done ? '✓' : ''}</button>
        <span class="todo-text">${escapeHtml(task.text)}</span>
        <span class="todo-priority ${task.priority}">${task.priority}</span>
        <button class="todo-delete" data-idx="${idx}">&times;</button>
      `;
      todoList.appendChild(li);
    });
  }

  if (todoForm) {
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = todoInput.value.trim();
      if (!text) return;
      const key = dateKey(selectedDate);
      if (!todosData[key]) todosData[key] = [];
      todosData[key].push({ text, priority: todoPrio.value, done: false });
      saveTodos(todosData);
      todoInput.value = '';
      renderTodos();
      renderCalendar();
    });
  }

  if (todoList) {
    todoList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-idx]');
      if (!btn) return;
      const key = dateKey(selectedDate);
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      if (btn.classList.contains('todo-check')) {
        todosData[key][idx].done = !todosData[key][idx].done;
      } else if (btn.classList.contains('todo-delete')) {
        todosData[key].splice(idx, 1);
        if (!todosData[key].length) delete todosData[key];
      }
      saveTodos(todosData);
      renderTodos();
      renderCalendar();
      if (typeof updateStreak === 'function') updateStreak();
    });
  }

  renderTodos();

  /* ─────────────────────────────────────────────────────────
     CONTACT FORM (demo)
     ───────────────────────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formSuccess) {
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 4000);
      }
      contactForm.reset();
    });
  }
});
