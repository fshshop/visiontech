// VisionTech Engineering Ltd. - Executive Corporate Interactive Engine
document.addEventListener('DOMContentLoaded', () => {
  syncLiveCMS();
  initRFQApiBridge();
  initHeroVideo();
  initNavDropdowns();
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

  // Persistent Nested Flyout Submenus (Eliminates Hover-Gap Disconnection)
  const flyoutContainers = document.querySelectorAll('.nav-flyout-container');
  flyoutContainers.forEach(container => {
    const menu = container.querySelector('.nav-flyout-menu');
    if (!menu) return;

    let flyoutTimer = null;

    const openFlyout = () => {
      clearTimeout(flyoutTimer);
      container.classList.add('flyout-active');
      menu.classList.remove('hidden');
      menu.style.display = 'block';
    };

    const closeFlyout = () => {
      clearTimeout(flyoutTimer);
      // 320ms grace period ensures cursor moving diagonally never drops hover
      flyoutTimer = setTimeout(() => {
        container.classList.remove('flyout-active');
        menu.classList.add('hidden');
        menu.style.display = '';
      }, 320);
    };

    container.addEventListener('mouseenter', openFlyout);
    container.addEventListener('mouseleave', closeFlyout);

    menu.addEventListener('mouseenter', openFlyout);
    menu.addEventListener('mouseleave', closeFlyout);
  });
}


// Dynamically Synchronize Frontend with CMS Server Data & Persistent LocalStorage
// Dynamically Synchronize Frontend with CMS Edge Data & Persistent LocalStorage
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
    
    // 1. Sync General Branding & Logos
    if (data.general) {
      const g = data.general;
      if (g.siteName) {
        document.querySelectorAll('.site-brand-name').forEach(el => el.textContent = g.siteName);
      }
      if (g.phonePrimary || g.phone) {
        const p = g.phonePrimary || g.phone;
        document.querySelectorAll('.site-phone').forEach(el => el.textContent = p);
        document.querySelectorAll('a[href^="tel:"]').forEach(el => {
          if (el.getAttribute('data-sync') !== 'false') el.href = 'tel:' + p.replace(/[^0-9+]/g, '');
        });
      }
      if (g.emailPrimary || g.email) {
        const em = g.emailPrimary || g.email;
        document.querySelectorAll('.site-email').forEach(el => el.textContent = em);
        document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
          if (el.getAttribute('data-sync') !== 'false') el.href = 'mailto:' + em.split(',')[0].trim();
        });
      }
      if (g.hqAddress) {
        document.querySelectorAll('.site-address, .site-hq-address').forEach(el => el.textContent = g.hqAddress);
      }
      if (g.regInfo) {
        document.querySelectorAll('.site-reg-info').forEach(el => el.textContent = g.regInfo);
      }
      if (g.topNotice) {
        document.querySelectorAll('.site-top-notice').forEach(el => el.textContent = g.topNotice);
      }
      if (g.logoUrl) {
        document.querySelectorAll('img[src*="logo.png"], img[alt*="VisionTech Logo"], img.site-logo').forEach(img => {
          img.src = g.logoUrl;
        });
      }
      if (g.faviconUrl) {
        document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]').forEach(l => {
          l.href = g.faviconUrl;
        });
      }
    }

    // 2. Sync Hero Section Video & Pacing
    if (data.hero) {
      const h = data.hero;
      if (h.videoSpeed) {
        window.currentVideoSpeed = parseFloat(h.videoSpeed);
      }
      const v = document.getElementById('heroBgVideo');
      if (v) {
        if (h.videoUrl) {
          const currentSrc = v.currentSrc || v.src;
          if (!currentSrc.includes(h.videoUrl)) {
            v.src = h.videoUrl;
          }
        }
        if (window.currentVideoSpeed) {
          v.playbackRate = window.currentVideoSpeed;
        }
      }
      if (h.leadText) {
        document.querySelectorAll('.hero-lead-text').forEach(el => el.textContent = h.leadText);
      }
      if (h.badge) {
        document.querySelectorAll('.hero-badge').forEach(el => el.textContent = h.badge);
      }
    }

    // 3. Sync Key Stats
    if (Array.isArray(data.stats) && data.stats.length > 0) {
      const statEls = document.querySelectorAll('.counter-val, [data-target]');
      data.stats.forEach((st, idx) => {
        if (statEls[idx]) {
          statEls[idx].textContent = st.value;
          statEls[idx].setAttribute('data-target', st.value);
        }
      });
    }

    // 4. Sync Who We Are Section
    if (data.whoWeAre) {
      const w = data.whoWeAre;
      const wwaContainer = document.getElementById('who-we-are-content');
      if (wwaContainer) {
        let tagsHtml = '';
        if (Array.isArray(w.capabilities)) {
          tagsHtml = '<div class="flex flex-wrap gap-2 py-1">' +
            w.capabilities.map(cap => `<span class="px-3 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 text-xs font-mono text-amber-300"><i class="fa-solid fa-check text-[10px] mr-1 text-amber-400"></i> ${cap}</span>`).join('') +
            '</div>';
        }
        wwaContainer.innerHTML = `
          <div class="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5">
            <div class="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <i class="fa-solid fa-bolt-lightning text-base"></i>
            </div>
            <p class="text-amber-200 font-semibold text-base sm:text-lg leading-snug">
              ${w.callout || 'VEL is working as EPC contractor in power sector & Industrial area.'}
            </p>
          </div>
          <p class="text-slate-300 leading-relaxed">${w.para1 || ''}</p>
          ${tagsHtml}
          <p class="text-slate-300 leading-relaxed">${w.para2 || ''}</p>
          <p class="text-slate-300 leading-relaxed">${w.para3 || ''}</p>
        `;
      }
    }

    // 5. Sync Our Services Verticals
    if (data.ourServices && data.ourServices.epcVerticals) {
      const epc = data.ourServices.epcVerticals;
      const syncVert = (id, obj) => {
        const el = document.getElementById(id);
        if (el && obj) {
          const h3 = el.querySelector('h3');
          if (h3 && obj.title) h3.textContent = obj.title;
          const p = el.querySelector('p');
          if (p && obj.desc) p.textContent = obj.desc;
          const img = el.querySelector('img');
          if (img && obj.img) img.src = obj.img;
        }
      };
      syncVert('energy-power', epc.energyPower);
      syncVert('industrial-manufacturing', epc.industrialManufacturing);
      syncVert('renewable-energy', epc.renewableEnergy);
      syncVert('infrastructure-transportation', epc.infrastructureTransportation);
    }

    // 6. Sync Leadership Team Cards (about.html & index.html)
    if (data.leadership) {
      const allMembers = [
        ...(data.leadership.board || []),
        ...(data.leadership.management || []),
        ...(data.leadership.advisory || [])
      ];

      allMembers.forEach(m => {
        // Find links or images pointing to this member
        document.querySelectorAll(`a[href*="${m.id}.html"]`).forEach(link => {
          const card = link.closest('.spotlight-card');
          if (card) {
            const nameEl = card.querySelector('h4');
            if (nameEl && m.name) nameEl.textContent = m.name;
            const imgEl = card.querySelector('img');
            if (imgEl && m.img) imgEl.src = m.img;
            const bioEl = card.querySelector('p');
            if (bioEl && m.shortBio) bioEl.textContent = m.shortBio;
          }
        });
      });
    }

    // 7. Sync Projects (Completed & Running)
    if (data.projects && !Array.isArray(data.projects)) {
      if (Array.isArray(data.projects.completed)) {
        const compCards = document.querySelectorAll('#completed-projects .project-card');
        data.projects.completed.forEach((proj, idx) => {
          const card = compCards[idx];
          if (card && proj) {
            const titleEl = card.querySelector('h3, h4');
            if (titleEl && proj.title) titleEl.textContent = proj.title;
            const imgEl = card.querySelector('img');
            if (imgEl && proj.img) imgEl.src = proj.img;
            const scopeEl = card.querySelector('p');
            if (scopeEl && proj.scope) scopeEl.textContent = proj.scope;
          }
        });
      }
      if (Array.isArray(data.projects.running)) {
        const runCards = document.querySelectorAll('#running-projects .project-card');
        data.projects.running.forEach((proj, idx) => {
          const card = runCards[idx];
          if (card && proj) {
            const titleEl = card.querySelector('h3, h4');
            if (titleEl && proj.title) titleEl.textContent = proj.title;
            const imgEl = card.querySelector('img');
            if (imgEl && proj.img) imgEl.src = proj.img;
            const scopeEl = card.querySelector('p');
            if (scopeEl && proj.scope) scopeEl.textContent = proj.scope;
          }
        });
      }
    }

  } catch(e) {
    // Static fallback continues smoothly
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
