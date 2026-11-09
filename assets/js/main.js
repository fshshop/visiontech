// VisionTech Engineering Ltd. - Executive Corporate Interactive Engine
document.addEventListener('DOMContentLoaded', () => {
  syncLiveCMS();
  initRFQApiBridge();
  initHeroVideo();
  initNavDropdowns();
  initCustomCursor();
  initMobileMenu();
  initStickyHeader();
  initScrollSectionRise();
  initCounters();
  initProjectFilters();
  initQuoteModal();
  initProjectQuickView();
  initContactForms();
  initBackToTop();
  initServiceTabs();
});

// Hero Background Video Autoplay Safety (for local file:/// and web protocols)
window.currentVideoSpeed = 0.85;

function initHeroVideo() {
  const video = document.getElementById('heroBgVideo');
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  // Ultra-calm engineering playback speed (0.15x) so fast-forward timelapse moves gracefully
  const TARGET_SPEED = window.currentVideoSpeed || 0.85;
  const applyRate = () => {
    try {
      if (video.playbackRate !== TARGET_SPEED) {
        video.playbackRate = TARGET_SPEED;
      }
    } catch(e) {}
  };

  applyRate();
  ['loadstart', 'loadedmetadata', 'loadeddata', 'canplay', 'play', 'playing', 'timeupdate', 'seeked'].forEach(evt => {
    video.addEventListener(evt, applyRate);
  });

  // Continuous lock interval to prevent browser reset on loop
  setInterval(applyRate, 150);

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      video.muted = true;
      applyRate();
      video.play();
    });
  }
}

// Mobile Navigation
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  const links = document.querySelectorAll('#mobileMenu a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });
}

// Sticky Header with Dynamic Glassmorphism & Permanent Elevation
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('is-stuck');
    } else {
      header.classList.remove('is-stuck');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Animated Stat Counters
function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  let animated = false;
  const runCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2200;
      const step = target / (duration / 25);
      let current = 0;

      const updateCount = () => {
        current += step;
        if (current < target) {
          counter.innerText = Math.ceil(current).toLocaleString();
          setTimeout(updateCount, 25);
        } else {
          counter.innerText = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
        }
      };
      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounters();
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.getElementById('statsSection') || counters[0];
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// Project Portfolio Filtering
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.classList.add('block');
        } else {
          card.classList.add('hidden');
          card.classList.remove('block');
        }
      });
    });
  });
}

// Service Showcase Tabs
function initServiceTabs() {
  const tabBtns = document.querySelectorAll('.service-tab-btn');
  const tabPanes = document.querySelectorAll('.service-tab-pane');

  if (!tabBtns.length || !tabPanes.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      tabBtns.forEach(b => {
        b.classList.remove('bg-amber-500/10', 'text-amber-400', 'border-amber-500');
        b.classList.add('text-slate-400', 'border-slate-800');
      });
      btn.classList.add('bg-amber-500/10', 'text-amber-400', 'border-amber-500');
      btn.classList.remove('text-slate-400', 'border-slate-800');

      tabPanes.forEach(pane => {
        if (pane.id === target) {
          pane.classList.remove('hidden');
        } else {
          pane.classList.add('hidden');
        }
      });
    });
  });
}

// Project Quick View Modal
function initProjectQuickView() {
  const modal = document.getElementById('projectModal');
  const openBtns = document.querySelectorAll('.open-project-modal');
  const closeBtns = document.querySelectorAll('.close-project-modal');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title');
      const client = btn.getAttribute('data-client');
      const value = btn.getAttribute('data-value');
      const scope = btn.getAttribute('data-scope');
      const img = btn.getAttribute('data-img');

      const modalTitle = document.getElementById('modalProjectTitle');
      const modalClient = document.getElementById('modalProjectClient');
      const modalValue = document.getElementById('modalProjectValue');
      const modalScope = document.getElementById('modalProjectScope');
      const modalImg = document.getElementById('modalProjectImg');

      if (modalTitle) modalTitle.innerText = title;
      if (modalClient) modalClient.innerText = client;
      if (modalValue) modalValue.innerText = value;
      if (modalScope) modalScope.innerText = scope;
      if (modalImg && img) modalImg.src = img;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
}

// RFQ Quotation Modal
function initQuoteModal() {
  const modal = document.getElementById('quoteModal');
  const openBtns = document.querySelectorAll('.open-quote-modal');
  const closeBtns = document.querySelectorAll('.close-quote-modal');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
}

// AJAX Form Handlers with Executive Toasts
function initContactForms() {
  const forms = document.querySelectorAll('form.ajax-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type=\"submit\"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class=\"fa-solid fa-circle-notch fa-spin mr-2\"></i> Transmitting to Engineering Desk...';
      }

      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        const quoteModal = document.getElementById('quoteModal');
        if (quoteModal) {
          quoteModal.classList.add('hidden');
          quoteModal.classList.remove('flex');
        }

        showExecutiveToast('Inquiry Transmitted Successfully', 'Your project specifications have reached VisionTech Engineering Ltd. Chief Engineering Office. Our team will contact you within 24 business hours.');
      }, 1200);
    });
  });
}

// Executive Toast Notification
function showExecutiveToast(title, message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 right-6 z-50 max-w-md p-5 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl text-white transform transition-all duration-300 translate-y-4 opacity-0 flex items-start gap-4';
  toast.innerHTML = `
    <div class=\"w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-lg border border-amber-500/30\">
      <i class=\"fa-solid fa-shield-check\"></i>
    </div>
    <div class=\"space-y-1\">
      <h4 class=\"font-bold text-amber-400 text-sm\">${title}</h4>
      <p class=\"text-xs text-slate-300 leading-relaxed\">${message}</p>
    </div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 50);

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

// Back to Top Button
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('hidden');
    } else {
      btn.classList.add('hidden');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========================================================
// COMPACT ENGINEERING CROSSHAIR & BUTTON HAMMER ENGINE
// No Outer Circles & Interactive Hammer Strike Animation
// ========================================================
function initCustomCursor() {
  if (window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches) {
    return;
  }

  if (document.getElementById('engCursorWrap')) {
    return;
  }

  document.body.classList.add('has-eng-cursor');

  const wrap = document.createElement('div');
  wrap.className = 'eng-crosshair-wrap';
  wrap.id = 'engCursorWrap';

  // Compact 24x24 SVG Crosshair (No circles!) + Construction Hammer (36x36)
  wrap.innerHTML = `
    <!-- 1. Sleek Compact Crosshair (24x24) -->
    <div class="eng-reticle-box" id="engReticleBox">
      <svg class="eng-crosshair-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="50%" stop-color="#fbbf24"/>
            <stop offset="100%" stop-color="#f59e0b"/>
          </linearGradient>
        </defs>

        <!-- North Arm -->
        <g id="engArmN">
          <line x1="12" y1="9" x2="12" y2="1" stroke="rgba(255, 255, 255, 0.95)" stroke-width="1" stroke-linecap="round"/>
          <line x1="10.5" y1="6" x2="13.5" y2="6" stroke="#fbbf24" stroke-width="0.8"/>
          <line x1="10" y1="3" x2="14" y2="3" stroke="#fbbf24" stroke-width="0.8"/>
        </g>

        <!-- South Arm -->
        <g id="engArmS">
          <line x1="12" y1="15" x2="12" y2="23" stroke="rgba(255, 255, 255, 0.95)" stroke-width="1" stroke-linecap="round"/>
          <line x1="10.5" y1="18" x2="13.5" y2="18" stroke="#fbbf24" stroke-width="0.8"/>
          <line x1="10" y1="21" x2="14" y2="21" stroke="#fbbf24" stroke-width="0.8"/>
        </g>

        <!-- West Arm -->
        <g id="engArmW">
          <line x1="9" y1="12" x2="1" y2="12" stroke="rgba(255, 255, 255, 0.95)" stroke-width="1" stroke-linecap="round"/>
          <line x1="6" y1="10.5" x2="6" y2="13.5" stroke="#fbbf24" stroke-width="0.8"/>
          <line x1="3" y1="10" x2="3" y2="14" stroke="#fbbf24" stroke-width="0.8"/>
        </g>

        <!-- East Arm -->
        <g id="engArmE">
          <line x1="15" y1="12" x2="23" y2="12" stroke="rgba(255, 255, 255, 0.95)" stroke-width="1" stroke-linecap="round"/>
          <line x1="18" y1="10.5" x2="18" y2="13.5" stroke="#fbbf24" stroke-width="0.8"/>
          <line x1="21" y1="10" x2="21" y2="14" stroke="#fbbf24" stroke-width="0.8"/>
        </g>

        <!-- Center Golden Bead -->
        <g id="engCenterDot">
          <circle cx="12" cy="12" r="1.6" fill="url(#chGold)"/>
          <circle cx="12" cy="12" r="0.6" fill="#ffffff"/>
        </g>
      </svg>
    </div>

    <!-- 2. Construction Hammer (Strikes down repeatedly on buttons) -->
    <div class="eng-hammer-box" id="engHammerBox">
      <svg viewBox="0 0 36 36" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hSteel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="40%" stop-color="#cbd5e1"/>
            <stop offset="80%" stop-color="#64748b"/>
            <stop offset="100%" stop-color="#334155"/>
          </linearGradient>
          <linearGradient id="hGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="50%" stop-color="#fbbf24"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
          <linearGradient id="hWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d97706"/>
            <stop offset="40%" stop-color="#92400e"/>
            <stop offset="100%" stop-color="#451a03"/>
          </linearGradient>
        </defs>

        <!-- Handle (wooden grip) -->
        <path d="M12 14 L28 30 A 2 2 0 0 1 25 33 L9 17 Z" fill="url(#hWood)" stroke="#1e1b4b" stroke-width="0.5"/>
        <line x1="20" y1="23" x2="23" y2="26" stroke="#fde68a" stroke-width="0.8" opacity="0.6"/>
        <line x1="23" y1="26" x2="26" y2="29" stroke="#fde68a" stroke-width="0.8" opacity="0.6"/>

        <!-- Gold Collar Mount -->
        <rect x="8" y="13" width="5" height="5" rx="1" fill="url(#hGold)" stroke="#78350f" stroke-width="0.4" transform="rotate(-45 10.5 15.5)"/>

        <!-- Heavy Steel Hammer Head -->
        <polygon points="5,7 15,3 18,10 8,14" fill="url(#hSteel)" stroke="#0f172a" stroke-width="0.6"/>
        <!-- Golden Impact Striking Face -->
        <polygon points="3,8 5,7 8,14 6,15" fill="url(#hGold)" stroke="#78350f" stroke-width="0.5"/>
        <!-- Back Claw / Peen -->
        <polygon points="15,3 21,2 20,6 18,10" fill="#475569" stroke="#0f172a" stroke-width="0.5"/>
      </svg>

      <!-- Impact Flash Sparks -->
      <div class="hammer-sparks">
        <span class="spark s1"></span>
        <span class="spark s2"></span>
        <span class="spark s3"></span>
        <span class="spark s4"></span>
      </div>
    </div>
  `;

  document.body.appendChild(wrap);

  const centerDot = document.getElementById('engCenterDot');
  const armN = document.getElementById('engArmN');
  const armS = document.getElementById('engArmS');
  const armW = document.getElementById('engArmW');
  const armE = document.getElementById('engArmE');

  let isVisible = false;

  // Ultra-fast 1:1 Instant Hardware Tracking (Zero Latency / Zero Lag)
  window.addEventListener('mousemove', (e) => {
    wrap.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    if (!isVisible) {
      isVisible = true;
      wrap.classList.add('active');
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    wrap.classList.remove('active');
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    wrap.classList.add('active');
  });

  // Dynamic Hover Delegation: Switches to Hammer when over any button or link
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (!target) return;

    const btnTarget = target.closest('a, button, input[type="submit"], input[type="button"], select, [role="button"], .filter-pill, .btn-shimmer, .service-tab-btn, .tab-btn');
    if (btnTarget) {
      wrap.classList.add('hover-button');
      return;
    }

    const textTarget = target.closest('input[type="text"], input[type="email"], input[type="tel"], textarea');
    if (textTarget) {
      wrap.style.opacity = '0.15';
      return;
    }

    wrap.classList.remove('hover-button');
    wrap.style.opacity = '';
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const target = e.target;
    if (!target) return;
    if (target.closest('input[type="text"], input[type="email"], input[type="tel"], textarea')) {
      wrap.style.opacity = '';
    }
  }, { passive: true });

  // Continuous optical breathing loop (independent of movement)
  function renderLoop(now) {
    if (!wrap.classList.contains('hover-button')) {
      const breathe = Math.sin(now * 0.003) * 1.2;
      const dotPulse = 1 + Math.sin(now * 0.004) * 0.15;

      if (armN) armN.setAttribute('transform', `translate(0, ${-breathe})`);
      if (armS) armS.setAttribute('transform', `translate(0, ${breathe})`);
      if (armW) armW.setAttribute('transform', `translate(${-breathe}, 0)`);
      if (armE) armE.setAttribute('transform', `translate(${breathe}, 0)`);
      if (centerDot) centerDot.setAttribute('transform', `scale(${dotPulse})`);
    }

    requestAnimationFrame(renderLoop);
  }

  requestAnimationFrame(renderLoop);
}

// Smooth Section Rise-Up on Scroll (Repeatable Two-Way Scroll Reveal)
function initScrollSectionRise() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const sections = Array.from(document.querySelectorAll('body > section, main section, footer'));
  if (!sections.length) return;

  sections.forEach((sec, index) => {
    sec.classList.add('scroll-rise-section');
    if (index === 0) {
      sec.classList.add('is-revealed');
    }
  });

  let ticking = false;

  const updateSectionVisibility = () => {
    const vh = window.innerHeight;
    const scrollY = window.scrollY;
    const enterTrigger = vh * 0.88; // Triggers when top reaches inside viewport
    const exitBuffer = 80; // 80px off-screen buffer before resetting

    sections.forEach((sec, idx) => {
      // Keep hero revealed when at top of page
      if (idx === 0 && scrollY <= 150) {
        sec.classList.add('is-revealed');
        return;
      }

      const rect = sec.getBoundingClientRect();
      const isInView = rect.top <= enterTrigger && rect.bottom >= (vh * 0.08);
      const isCompletelyOffScreen = rect.bottom < -exitBuffer || rect.top > (vh + exitBuffer);

      if (isInView) {
        sec.classList.add('is-revealed');
      } else if (isCompletelyOffScreen) {
        // Reset off-screen so when scrolled back (up or down), it animates again!
        sec.classList.remove('is-revealed');
      }
    });

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateSectionVisibility);
      ticking = true;
    }
  };

  // Run on scroll and resize with passive listener for max 60/120fps smoothness
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial check on load
  updateSectionVisibility();

  // Reveal target section immediately when jumping via anchor links
  window.addEventListener('hashchange', () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.classList.add('is-revealed');
      }
    }
  });
}


// Persistent Desktop Navigation Dropdowns (Eliminates Hover-Gap Closure)
function initNavDropdowns() {
  const dropdownGroups = document.querySelectorAll('header .group');
  dropdownGroups.forEach(group => {
    const menu = group.querySelector('.absolute');
    if (!menu) return;

    let closeTimer = null;

    const openMenu = () => {
      clearTimeout(closeTimer);
      group.classList.add('is-open');
    };

    const closeMenu = () => {
      clearTimeout(closeTimer);
      // 220ms grace period so moving cursor into submenu never flickers or drops
      closeTimer = setTimeout(() => {
        group.classList.remove('is-open');
      }, 220);
    };

    group.addEventListener('mouseenter', openMenu);
    group.addEventListener('mouseleave', closeMenu);

    group.addEventListener('focusin', openMenu);
    group.addEventListener('focusout', closeMenu);
  });
}


// Dynamically Synchronize Frontend with CMS Server Data & Persistent LocalStorage
async function syncLiveCMS() {
  try {
    let data = null;
    try {
      const res = await fetch('/api/content?t=' + Date.now());
      if (res.ok) {
        data = await res.json();
      }
    } catch(e) {}

    // Check localStorage fallback so local edits persist immediately across site
    const local = localStorage.getItem('vt_live_sitedata');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        data = Object.assign(data || {}, parsed);
      } catch(e) {}
    }

    if (!data) return;
    
    // 1. Sync General Branding & Logo
    if (data.general) {
      if (data.general.siteName) {
        document.querySelectorAll('.site-brand-name').forEach(el => el.textContent = data.general.siteName);
      }
      if (data.general.phone) {
        document.querySelectorAll('.site-phone').forEach(el => el.textContent = data.general.phone);
      }
      if (data.general.email) {
        document.querySelectorAll('.site-email').forEach(el => el.textContent = data.general.email);
      }
      if (data.general.hqAddress) {
        document.querySelectorAll('.site-address').forEach(el => el.textContent = data.general.hqAddress);
      }
      if (data.general.logoUrl) {
        document.querySelectorAll('img[src*="logo.png"], img[alt*="VisionTech Logo"], img.site-logo').forEach(img => {
          img.src = data.general.logoUrl;
        });
      }
    }

    // 2. Sync Hero Section Video & Pacing
    if (data.hero) {
      if (data.hero.videoSpeed) {
        window.currentVideoSpeed = parseFloat(data.hero.videoSpeed);
      }
      const v = document.getElementById('heroBgVideo');
      if (v) {
        if (data.hero.videoUrl && !v.querySelector('source[src="' + data.hero.videoUrl + '"]')) {
          v.src = data.hero.videoUrl;
        }
        if (window.currentVideoSpeed) {
          v.playbackRate = window.currentVideoSpeed;
        }
      }
      if (data.hero.leadText) {
        const leadEl = document.querySelector('.hero-lead-text');
        if (leadEl) leadEl.textContent = data.hero.leadText;
      }
    }
  } catch(e) {
    // Offline / Static fallback continues smoothly
  }
}

// Intercept RFQ modal form submissions to store in CMS
function initRFQApiBridge() {
  const forms = document.querySelectorAll('#quoteModal form, #contactForm');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      const formData = new FormData(form);
      const payload = {};
      formData.forEach((val, key) => payload[key] = val);
      try {
        await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch(err) {}
    });
  });
}
