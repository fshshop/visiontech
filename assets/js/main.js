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
// MODERN STYLISH EXECUTIVE CURSOR ENGINE
// Preserves normal responsive system cursor with a sleek gold trailing ring
// ========================================================
function initCustomCursor() {
  if (window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let follower = document.getElementById('stylishCursor');
  if (!follower) {
    follower = document.createElement('div');
    follower.className = 'stylish-cursor-follower';
    follower.id = 'stylishCursor';
    document.body.appendChild(follower);
  }

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;
  let isHovering = false;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      isVisible = true;
      follower.classList.add('is-active');
    }
  }, { passive: true });

  window.addEventListener('mousedown', () => {
    follower.classList.add('is-clicking');
  });

  window.addEventListener('mouseup', () => {
    follower.classList.remove('is-clicking');
  });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    follower.classList.remove('is-active');
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    follower.classList.add('is-active');
  });

  // Dynamic hover delegation for links, buttons & clickable elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (!target) return;
    const isInteractive = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"], select, .btn-shimmer, .service-tab-btn, .filter-pill, .cad-mark, .spotlight-card');
    if (isInteractive) {
      if (!isHovering) {
        isHovering = true;
        follower.classList.add('is-hovering');
      }
    } else {
      if (isHovering) {
        isHovering = false;
        follower.classList.remove('is-hovering');
      }
    }
  }, { passive: true });

  // Ultra-smooth 60/120fps fluid trailing physics loop
  function loop() {
    if (isVisible) {
      // Smooth lerp (linear interpolation)
      followerX += (mouseX - followerX) * 0.22;
      followerY += (mouseY - followerY) * 0.22;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
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
