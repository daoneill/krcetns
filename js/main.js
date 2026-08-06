/* ==========================================================================
   Killester Park Website - Main Interactive JavaScript Module
   Provides client-side interactivity, navigation drawers, filter systems,
   form validation, and dynamic Google Sheet CSV loaders for:
   - Policy Documents (about.html)
   - Staff Members (staff.html)
   - Board of Management Members (board-of-management.html)
   - Parents Association Members (parents-association.html)
   - School News Articles (news.html & index.html)
   - School Calendar Events (news.html & index.html)
   - Photo Gallery Items (news.html)
   ========================================================================== */

// Configurable Google Sheet / Doc Published CSV URLs
const GOOGLE_POLICIES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8PJbUy5vu3mIAwEe-QVuYjSZ4qW0NZoQOjLPefUd2mz7dV_qxCzYxrr-dfpoETdj17i2iB2MF6X6T/pub?gid=0&single=true&output=csv';
const GOOGLE_STAFF_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8PJbUy5vu3mIAwEe-QVuYjSZ4qW0NZoQOjLPefUd2mz7dV_qxCzYxrr-dfpoETdj17i2iB2MF6X6T/pub?gid=2119656166&single=true&output=csv';
const GOOGLE_BOM_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8PJbUy5vu3mIAwEe-QVuYjSZ4qW0NZoQOjLPefUd2mz7dV_qxCzYxrr-dfpoETdj17i2iB2MF6X6T/pub?gid=1920148655&single=true&output=csv';
const GOOGLE_PA_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8PJbUy5vu3mIAwEe-QVuYjSZ4qW0NZoQOjLPefUd2mz7dV_qxCzYxrr-dfpoETdj17i2iB2MF6X6T/pub?gid=498883890&single=true&output=csv';
const GOOGLE_NEWS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8PJbUy5vu3mIAwEe-QVuYjSZ4qW0NZoQOjLPefUd2mz7dV_qxCzYxrr-dfpoETdj17i2iB2MF6X6T/pub?gid=620748775&single=true&output=csv'; // Paste Published News Sheet CSV URL here
const GOOGLE_EVENTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8PJbUy5vu3mIAwEe-QVuYjSZ4qW0NZoQOjLPefUd2mz7dV_qxCzYxrr-dfpoETdj17i2iB2MF6X6T/pub?gid=528651931&single=true&output=csv';
const GOOGLE_GALLERY_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8PJbUy5vu3mIAwEe-QVuYjSZ4qW0NZoQOjLPefUd2mz7dV_qxCzYxrr-dfpoETdj17i2iB2MF6X6T/pub?gid=1776415787&single=true&output=csv'; // Paste Published Gallery Sheet CSV URL here
const GOOGLE_AFTERSCHOOL_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8PJbUy5vu3mIAwEe-QVuYjSZ4qW0NZoQOjLPefUd2mz7dV_qxCzYxrr-dfpoETdj17i2iB2MF6X6T/pub?gid=1290596322&single=true&output=csv';

document.addEventListener('DOMContentLoaded', () => {
  renderCommonComponents();
  initMobileDrawer();
  highlightActiveRoute();
  initAccordions();
  initNewsFilters();
  initFormValidation();
  initLightbox();
  initDynamicPolicies();
  initDynamicStaff();
  initDynamicBOM();
  initDynamicPA();
  initDynamicNews();
  initDynamicEvents();
  initDynamicGallery();
  initDynamicAfterschool();
});

/* --------------------------------------------------------------------------
   Render Shared Header & Footer Components
   -------------------------------------------------------------------------- */
function renderCommonComponents() {
  const headerContainer = document.getElementById('siteHeader');
  if (headerContainer && headerContainer.children.length === 0) {
    headerContainer.innerHTML = `
      <!-- Top Announcement & Contact Bar -->
      <div class="top-bar">
        <div class="top-bar-container">
          <div class="top-info">
            <span class="top-info-item"><i class="fa-solid fa-location-dot"></i> Collins Avenue East, Killester, Dublin 5, D05 F2H1</span>
            <span class="top-info-item"><i class="fa-solid fa-phone"></i> <a href="tel:015241637">01 524 1637</a></span>
            <span class="top-info-item"><i class="fa-solid fa-envelope"></i> <a href="mailto:info@killesterparketns.ie">info@killesterparketns.ie</a></span>
          </div>
        </div>
      </div>

      <!-- Main Header Navigation -->
      <header class="main-header">
        <div class="header-container">
          <a href="index.html" class="brand-logo">
            <img src="images/logo.png" alt="Killester Park Crest Emblem">
            <div class="brand-text">
              <span class="brand-title">Killester Park</span>
              <span class="brand-subtitle">Educate Together National School</span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <ul class="nav-menu">
            <li><a href="index.html" class="nav-link">Home</a></li>
            
            <!-- About Us Dropdown -->
            <li class="nav-item-dropdown">
              <a href="about.html" class="nav-link" id="aboutDropdownLink">
                About Us <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem; margin-left: 4px;"></i>
              </a>
              <ul class="dropdown-menu">
                <li><a href="about.html" class="dropdown-item"><i class="fa-solid fa-school"></i> About Our School</a></li>
                <li><a href="staff.html" class="dropdown-item"><i class="fa-solid fa-chalkboard-user"></i> Our Staff</a></li>
                <li><a href="board-of-management.html" class="dropdown-item"><i class="fa-solid fa-building-columns"></i> Board of Management</a></li>
                <li><a href="parents-association.html" class="dropdown-item"><i class="fa-solid fa-users"></i> Parents Association</a></li>
              </ul>
            </li>

            <!-- School Life Dropdown -->
            <li class="nav-item-dropdown">
              <a href="school-life.html" class="nav-link" id="schoolLifeDropdownLink">
                School Life <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem; margin-left: 4px;"></i>
              </a>
              <ul class="dropdown-menu">
                <li><a href="school-life.html" class="dropdown-item"><i class="fa-solid fa-book-open"></i> School Life & Learning</a></li>
                <li><a href="afterschool-activities.html" class="dropdown-item"><i class="fa-solid fa-shapes"></i> Afterschool Activities</a></li>
              </ul>
            </li>

            <!-- News & Events Dropdown -->
            <li class="nav-item-dropdown">
              <a href="news.html" class="nav-link" id="newsDropdownLink">
                News & Events <i class="fa-solid fa-chevron-down" style="font-size: 0.75rem; margin-left: 4px;"></i>
              </a>
              <ul class="dropdown-menu">
                <li><a href="news.html" class="dropdown-item"><i class="fa-solid fa-newspaper"></i> Latest News</a></li>
                <li><a href="calendar.html" class="dropdown-item"><i class="fa-solid fa-calendar-days"></i> School Calendar</a></li>
                <li><a href="gallery.html" class="dropdown-item"><i class="fa-solid fa-images"></i> Photo Gallery</a></li>
              </ul>
            </li>

            <li><a href="admissions.html" class="nav-link">Admissions</a></li>
            <li><a href="contact.html" class="nav-link">Contact Us</a></li>
          </ul>

          <!-- Mobile Hamburger Toggle -->
          <button class="mobile-toggle" id="mobileToggle" aria-label="Open navigation menu">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>

      <!-- Mobile Drawer -->
      <div class="mobile-drawer" id="mobileDrawer">
        <div class="mobile-drawer-header">
          <div class="brand-logo">
            <img src="images/logo.png" alt="Killester Park Logo" style="width: 36px;">
            <span class="brand-title" style="font-size: 1.05rem;">Killester Park</span>
          </div>
          <button class="close-drawer" id="closeDrawer" aria-label="Close menu">&times;</button>
        </div>
        
        <div class="mobile-nav-body">
          <ul class="mobile-nav-list">
            <li class="mobile-nav-item">
              <a href="index.html" class="mobile-nav-link">Home</a>
            </li>

            <!-- Collapsible About Us -->
            <li class="mobile-nav-item">
              <button class="mobile-nav-toggle" data-target="mobileAboutSubmenu" aria-expanded="false">
                <span>About Us</span>
                <i class="fa-solid fa-chevron-down chevron-icon"></i>
              </button>
              <ul class="mobile-submenu" id="mobileAboutSubmenu">
                <li><a href="about.html" class="mobile-submenu-link"><i class="fa-solid fa-school"></i> About Our School</a></li>
                <li><a href="staff.html" class="mobile-submenu-link"><i class="fa-solid fa-chalkboard-user"></i> Our Staff</a></li>
                <li><a href="board-of-management.html" class="mobile-submenu-link"><i class="fa-solid fa-building-columns"></i> Board of Management</a></li>
                <li><a href="parents-association.html" class="mobile-submenu-link"><i class="fa-solid fa-users"></i> Parents Association</a></li>
              </ul>
            </li>

            <!-- Collapsible School Life -->
            <li class="mobile-nav-item">
              <button class="mobile-nav-toggle" data-target="mobileLifeSubmenu" aria-expanded="false">
                <span>School Life</span>
                <i class="fa-solid fa-chevron-down chevron-icon"></i>
              </button>
              <ul class="mobile-submenu" id="mobileLifeSubmenu">
                <li><a href="school-life.html" class="mobile-submenu-link"><i class="fa-solid fa-book-open"></i> School Life & Learning</a></li>
                <li><a href="afterschool-activities.html" class="mobile-submenu-link"><i class="fa-solid fa-shapes"></i> Afterschool Activities</a></li>
              </ul>
            </li>

            <!-- Collapsible News & Events -->
            <li class="mobile-nav-item">
              <button class="mobile-nav-toggle" data-target="mobileNewsSubmenu" aria-expanded="false">
                <span>News & Events</span>
                <i class="fa-solid fa-chevron-down chevron-icon"></i>
              </button>
              <ul class="mobile-submenu" id="mobileNewsSubmenu">
                <li><a href="news.html" class="mobile-submenu-link"><i class="fa-solid fa-newspaper"></i> Latest News</a></li>
                <li><a href="calendar.html" class="mobile-submenu-link"><i class="fa-solid fa-calendar-days"></i> School Calendar</a></li>
                <li><a href="gallery.html" class="mobile-submenu-link"><i class="fa-solid fa-images"></i> Photo Gallery</a></li>
              </ul>
            </li>

            <li class="mobile-nav-item">
              <a href="admissions.html" class="mobile-nav-link">Admissions</a>
            </li>

            <li class="mobile-nav-item">
              <a href="contact.html" class="mobile-nav-link">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="backdrop" id="backdrop"></div>
    `;
  }

  const footerContainer = document.getElementById('siteFooter');
  if (footerContainer && footerContainer.children.length === 0) {
    footerContainer.innerHTML = `
      <footer class="main-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a href="index.html" class="brand-logo" style="margin-bottom: 1.25rem;">
                <img src="images/logo.png" alt="Killester Park Crest" style="width: 44px;">
                <div class="brand-text">
                  <span class="brand-title" style="color: white;">Killester Park</span>
                  <span class="brand-subtitle" style="color: var(--amber-accent);">Educate Together NS</span>
                </div>
              </a>
              <p style="font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">Killester Park Educate Together National School is an equality-based primary school located in Dublin 5.</p>
            </div>

            <div>
              <h4 class="footer-col-title">About Our School</h4>
              <ul class="footer-links">
                <li><a href="about.html" class="footer-link">About Our School</a></li>
                <li><a href="staff.html" class="footer-link">Our Staff Team</a></li>
                <li><a href="board-of-management.html" class="footer-link">Board of Management</a></li>
                <li><a href="parents-association.html" class="footer-link">Parents Association</a></li>
                <li><a href="admissions.html" class="footer-link">Admissions & Enrollment</a></li>
                <li><a href="contact.html" class="footer-link">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-col-title">School Life</h4>
              <ul class="footer-links">
                <li><a href="school-life.html" class="footer-link">School Schedule</a></li>
                <li><a href="afterschool-activities.html" class="footer-link">Afterschool Activities</a></li>
                <li><a href="about.html#policies" class="footer-link">School Policies</a></li>
                <li><a href="news.html" class="footer-link">Latest News</a></li>
                <li><a href="calendar.html" class="footer-link">School Calendar</a></li>
                <li><a href="gallery.html" class="footer-link">Photo Gallery</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-col-title">Contact Office</h4>
              <div class="footer-contact-item">
                <i class="fa-solid fa-location-dot" style="color: var(--teal-brand); margin-top: 4px;"></i>
                <span>Collins Avenue East, Killester, Dublin 5, D05 F2H1</span>
              </div>
              <div class="footer-contact-item">
                <i class="fa-solid fa-phone" style="color: var(--teal-brand);"></i>
                <a href="tel:015241637" style="color: white;">01 524 1637</a>
              </div>
              <div class="footer-contact-item">
                <i class="fa-solid fa-envelope" style="color: var(--teal-brand);"></i>
                <a href="mailto:info@killesterparketns.ie" style="color: white;">info@killesterparketns.ie</a>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <span>&copy; 2026 Killester Park Educate Together National School. Roll No: 20525B.</span>
            <span>Affiliated with <a href="https://www.educatetogether.ie/" target="_blank" style="color: var(--amber-accent); font-weight: 600;">Educate Together Ireland</a></span>
          </div>
        </div>
      </footer>
    `;
  }
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer Toggle
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('closeDrawer');
  const backdrop = document.getElementById('backdrop');

  if (!toggleBtn || !drawer || !closeBtn || !backdrop) return;

  function openMenu() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });

  // Collapsible Accordion Submenus in Mobile Drawer
  const submenuToggles = drawer.querySelectorAll('.mobile-nav-toggle');
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = toggle.getAttribute('data-target');
      const targetSubmenu = document.getElementById(targetId);

      if (!targetSubmenu) return;

      const isOpen = targetSubmenu.classList.contains('open');

      // Close other open submenus for clean accordion behavior
      drawer.querySelectorAll('.mobile-submenu').forEach(sub => {
        if (sub !== targetSubmenu) sub.classList.remove('open');
      });
      drawer.querySelectorAll('.mobile-nav-toggle').forEach(t => {
        if (t !== toggle) {
          t.classList.remove('open');
          t.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle target submenu
      if (isOpen) {
        targetSubmenu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        targetSubmenu.classList.add('open');
        toggle.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Highlight Active Navigation Link Based on URL
   -------------------------------------------------------------------------- */
function highlightActiveRoute() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .mobile-nav-link, .mobile-submenu-link');

  const aboutRoutes = ['about.html', 'staff.html', 'board-of-management.html', 'parents-association.html'];
  const schoolLifeRoutes = ['school-life.html', 'afterschool-activities.html'];
  const newsRoutes = ['news.html', 'calendar.html', 'gallery.html'];

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const aboutParentNav = document.getElementById('aboutDropdownLink');
  if (aboutParentNav) {
    if (aboutRoutes.includes(currentPath)) {
      aboutParentNav.classList.add('active');
    } else {
      aboutParentNav.classList.remove('active');
    }
  }

  const schoolLifeParentNav = document.getElementById('schoolLifeDropdownLink');
  if (schoolLifeParentNav) {
    if (schoolLifeRoutes.includes(currentPath)) {
      schoolLifeParentNav.classList.add('active');
    } else {
      schoolLifeParentNav.classList.remove('active');
    }
  }

  const newsParentNav = document.getElementById('newsDropdownLink');
  if (newsParentNav) {
    if (newsRoutes.includes(currentPath)) {
      newsParentNav.classList.add('active');
    } else {
      newsParentNav.classList.remove('active');
    }
  }
}

/* --------------------------------------------------------------------------
   Accordion Toggle (For Admissions & FAQs)
   -------------------------------------------------------------------------- */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(other => {
        other.classList.remove('active');
      });

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   News & Gallery Category Filtering & Live Search
   -------------------------------------------------------------------------- */
function initNewsFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('newsSearchInput');
  const items = document.querySelectorAll('[data-category]');

  if (!filterBtns.length && !searchInput) return;

  function filterItems() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

    items.forEach(item => {
      const itemCategory = item.getAttribute('data-category') || 'all';
      const textContent = item.textContent.toLowerCase();

      const matchesCategory = (category === 'all' || itemCategory === category);
      const matchesSearch = (!searchQuery || textContent.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        item.style.display = 'flex';
        item.style.opacity = '1';
      } else {
        item.style.display = 'none';
        item.style.opacity = '0';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterItems();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterItems);
  }
}

/* --------------------------------------------------------------------------
   Interactive Form Validation & Feedback
   -------------------------------------------------------------------------- */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
      }

      setTimeout(() => {
        showToast('Success! Your message has been sent to the school office.', 'success');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 1200);
    });
  });
}

/* --------------------------------------------------------------------------
   Simple Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 2000;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: #0d2137;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    border-left: 4px solid ${type === 'success' ? '#10b981' : '#0d9488'};
    font-weight: 600;
    font-size: 0.95rem;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  toast.innerText = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* --------------------------------------------------------------------------
   Simple Image Lightbox
   -------------------------------------------------------------------------- */
function initLightbox() {
  const galleryItems = document.querySelectorAll('[data-lightbox]');
  if (!galleryItems.length) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = item.getAttribute('href') || item.querySelector('img')?.src;
      const title = item.getAttribute('data-title') || 'School Activity';

      if (!imgSrc) return;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(15, 23, 42, 0.9);
        backdrop-filter: blur(8px);
        z-index: 3000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        cursor: pointer;
      `;

      overlay.innerHTML = `
        <div style="position: relative; max-width: 900px; max-height: 80vh;">
          <img src="${imgSrc}" style="max-width: 100%; max-height: 80vh; border-radius: 16px; box-shadow: 0 25px 50px rgba(0,0,0,0.5);" alt="${title}">
          <p style="color: white; font-size: 1.1rem; text-align: center; margin-top: 1rem; font-weight: 600;">${title}</p>
        </div>
        <span style="position: absolute; top: 2rem; right: 2rem; color: white; font-size: 2rem; cursor: pointer;">&times;</span>
      `;

      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });
}

/* --------------------------------------------------------------------------
   CSV Helper Functions
   -------------------------------------------------------------------------- */
function parseCSVRows(text) {
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentVal.trim());
      if (currentRow.some(val => val !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }

  if (currentVal !== '' || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.some(val => val !== '')) {
      rows.push(currentRow);
    }
  }

  return rows;
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g,
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* --------------------------------------------------------------------------
   1. Dynamic Policy Document Loader (about.html)
   -------------------------------------------------------------------------- */
const DEFAULT_POLICIES = [];

async function initDynamicPolicies() {
  const container = document.getElementById('policyList');
  if (!container) return;

  if (!GOOGLE_POLICIES_CSV_URL || GOOGLE_POLICIES_CSV_URL.trim() === '') {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1.5rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
        <i class="fa-solid fa-file-invoice" style="font-size: 2rem; color: var(--teal-brand); margin-bottom: 0.75rem;"></i>
        <h3 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.15rem; color: var(--text-heading);">Live Policy Google Sheet CSV Not Configured</h3>
      </div>
    `;
    return;
  }

  try {
    const response = await fetch(GOOGLE_POLICIES_CSV_URL);
    if (!response.ok) throw new Error('Could not fetch Google Sheet data');

    const csvText = await response.text();
    const rows = parseCSVRows(csvText);
    const policies = [];

    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i];
      if (cols.length >= 3) {
        const title = cols[0];
        const description = cols[1];
        const url = cols[2];

        if (i === 0 && (title.toLowerCase().includes('title') || title.toLowerCase().includes('policy'))) {
          continue;
        }

        if (title && url) {
          policies.push({ title, description, url });
        }
      }
    }

    if (policies.length > 0) {
      renderPolicyCards(policies, container);
    } else {
      container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p style="color: var(--text-muted);">No policies found in published CSV.</p></div>`;
    }
  } catch (err) {
    console.warn('Fetching Google Policy Sheet failed:', err);
  }
}

function renderPolicyCards(policies, container) {
  container.innerHTML = '';

  policies.forEach(policy => {
    const card = document.createElement('a');
    card.href = policy.url || '#';
    card.target = policy.url && policy.url !== '#' ? '_blank' : '_self';
    card.className = 'policy-card';
    if (policy.url === '#') {
      card.onclick = (e) => {
        e.preventDefault();
        showToast(`Document URL not specified for "${policy.title}"`, 'info');
      };
    }

    card.innerHTML = `
      <div class="policy-icon"><i class="fa-solid fa-file-pdf"></i></div>
      <div class="policy-info">
        <h4 class="policy-name">${escapeHTML(policy.title)}</h4>
        <span class="policy-meta">${escapeHTML(policy.description || 'Official Policy Document')}</span>
      </div>
      <i class="fa-solid fa-arrow-up-right-from-square" style="color: var(--teal-brand); font-size: 0.9rem;"></i>
    `;

    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   2. Dynamic Staff Members Loader (staff.html)
   -------------------------------------------------------------------------- */
const DEFAULT_STAFF_MEMBERS = [];

async function initDynamicStaff() {
  const container = document.getElementById('staffMemberList');
  if (!container) return;

  if (!GOOGLE_STAFF_CSV_URL || GOOGLE_STAFF_CSV_URL.trim() === '') {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p style="color: var(--text-muted);">Staff CSV URL not configured.</p></div>`;
    return;
  }

  try {
    const response = await fetch(GOOGLE_STAFF_CSV_URL);
    if (!response.ok) throw new Error('Could not fetch Staff Google Sheet');

    const csvText = await response.text();
    const rows = parseCSVRows(csvText);
    const members = [];

    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i];
      if (cols.length >= 2) {
        const name = cols[0];
        const role = cols[1];
        const details = cols[2] || '';

        if (i === 0 && (name.toLowerCase().includes('name') || name.toLowerCase().includes('staff'))) {
          continue;
        }

        if (name) {
          members.push({ name, role, details });
        }
      }
    }

    if (members.length > 0) {
      renderMemberCards(members, container, 'staff');
    } else {
      container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p style="color: var(--text-muted);">No staff members found in published CSV.</p></div>`;
    }
  } catch (err) {
    console.warn('Fetching Staff Google Sheet failed:', err);
  }
}

/* --------------------------------------------------------------------------
   3. Dynamic Board of Management Members Loader (board-of-management.html)
   -------------------------------------------------------------------------- */
const DEFAULT_BOM_MEMBERS = [];

async function initDynamicBOM() {
  const container = document.getElementById('bomMemberList');
  if (!container) return;

  if (!GOOGLE_BOM_CSV_URL || GOOGLE_BOM_CSV_URL.trim() === '') {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p style="color: var(--text-muted);">Board of Management CSV URL not configured.</p></div>`;
    return;
  }

  try {
    const response = await fetch(GOOGLE_BOM_CSV_URL);
    if (!response.ok) throw new Error('Could not fetch Board of Management Google Sheet');

    const csvText = await response.text();
    const rows = parseCSVRows(csvText);
    const members = [];

    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i];
      if (cols.length >= 2) {
        const name = cols[0];
        const role = cols[1];
        const details = cols[2] || '';

        if (i === 0 && (name.toLowerCase().includes('name') || name.toLowerCase().includes('member'))) {
          continue;
        }

        if (name) {
          members.push({ name, role, details });
        }
      }
    }

    if (members.length > 0) {
      renderMemberCards(members, container, 'bom');
    } else {
      container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p style="color: var(--text-muted);">No members found in published CSV.</p></div>`;
    }
  } catch (err) {
    console.warn('Fetching BOM Google Sheet failed:', err);
  }
}

/* --------------------------------------------------------------------------
   4. Dynamic Parents Association Committee Loader (parents-association.html)
   -------------------------------------------------------------------------- */
const DEFAULT_PA_MEMBERS = [];

async function initDynamicPA() {
  const container = document.getElementById('paMemberList');
  if (!container) return;

  if (!GOOGLE_PA_CSV_URL || GOOGLE_PA_CSV_URL.trim() === '') {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p style="color: var(--text-muted);">Parents Association CSV URL not configured.</p></div>`;
    return;
  }

  try {
    const response = await fetch(GOOGLE_PA_CSV_URL);
    if (!response.ok) throw new Error('Could not fetch Parents Association Google Sheet');

    const csvText = await response.text();
    const rows = parseCSVRows(csvText);
    const members = [];

    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i];
      if (cols.length >= 2) {
        const name = cols[0];
        const role = cols[1];
        const details = cols[2] || '';

        if (i === 0 && (name.toLowerCase().includes('name') || name.toLowerCase().includes('member'))) {
          continue;
        }

        if (name) {
          members.push({ name, role, details });
        }
      }
    }

    if (members.length > 0) {
      renderMemberCards(members, container, 'pa');
    } else {
      container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p style="color: var(--text-muted);">No members found in published CSV.</p></div>`;
    }
  } catch (err) {
    console.warn('Fetching PA Google Sheet failed:', err);
  }
}

/* Helper function to render member cards */
function renderMemberCards(members, container, type) {
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'info-card';
    card.style.cssText = 'padding: 2rem 1.5rem; text-align: center;';

    let iconClass = 'fa-user';
    let badgeColor = 'var(--teal-brand)';
    let bgColor = 'var(--teal-light)';

    if (type === 'staff') {
      iconClass = 'fa-user-graduate';
      badgeColor = 'var(--teal-brand)';
      bgColor = 'var(--teal-light)';
    } else if (type === 'bom') {
      iconClass = 'fa-building-columns';
      badgeColor = 'var(--primary-navy)';
      bgColor = 'var(--bg-main)';
    } else if (type === 'pa') {
      iconClass = 'fa-people-group';
      badgeColor = 'var(--amber-accent)';
      bgColor = 'var(--amber-light)';
    }

    card.innerHTML = `
      <div style="width: 80px; height: 80px; border-radius: 50%; background: ${bgColor}; color: ${badgeColor}; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.25rem;">
        <i class="fa-solid ${iconClass}"></i>
      </div>
      <h3 class="card-title" style="margin-bottom: 0.25rem;">${escapeHTML(member.name)}</h3>
      <span style="font-weight: 700; color: ${badgeColor}; font-size: 0.9rem; margin-bottom: 0.75rem; display: block;">${escapeHTML(member.role)}</span>
      <p class="card-text" style="font-size: 0.9rem;">${escapeHTML(member.details || '')}</p>
    `;

    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   5. Dynamic News Feed Loader (news.html & index.html)
   -------------------------------------------------------------------------- */
const DEFAULT_NEWS_ITEMS = [
  {
    title: 'Admissions Open for Academic Year 2026/2027',
    category: 'admissions',
    categoryLabel: 'Admissions',
    summary: 'Killester Park ETNS is accepting applications for Junior Infants for the 2026/2027 school year. Apply online through our admissions portal.',
    image: 'images/hero.png',
    link: 'admissions.html'
  },
  {
    title: 'Annual Science & Biodiversity Week Showcase',
    category: 'art',
    categoryLabel: 'Art & Curriculum',
    summary: 'Students presented fantastic experiments and biodiversity projects during our school-wide STEM showcase.',
    image: 'images/hero.png',
    link: 'gallery.html'
  },
  {
    title: 'Active School Sports Day & Community Run',
    category: 'events',
    categoryLabel: 'Events & Sports',
    summary: 'A wonderful day of fun, sportsmanship, and relay races with parents, students, and teachers in Dublin 5.',
    image: 'images/hero.png',
    link: 'calendar.html'
  }
];

async function initDynamicNews() {
  const container = document.getElementById('newsFeedList');
  const homeContainer = document.getElementById('homeNewsFeedList');

  if (!container && !homeContainer) return;

  if (!GOOGLE_NEWS_CSV_URL || GOOGLE_NEWS_CSV_URL.trim() === '') {
    if (container) renderNewsCards(DEFAULT_NEWS_ITEMS, container);
    if (homeContainer) renderNewsCards(DEFAULT_NEWS_ITEMS.slice(0, 3), homeContainer);
    return;
  }

  try {
    const response = await fetch(GOOGLE_NEWS_CSV_URL);
    if (!response.ok) throw new Error('Could not fetch News Google Sheet');

    const csvText = await response.text();
    const rows = parseCSVRows(csvText);
    const newsItems = [];

    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i];
      if (cols.length >= 3) {
        const title = cols[0];
        const category = (cols[1] || 'events').toLowerCase().trim();
        const summary = cols[2];
        const image = cols[3] && cols[3].trim() !== '' ? cols[3].trim() : 'images/hero.png';
        const link = cols[4] && cols[4].trim() !== '' ? cols[4].trim() : '';

        if (i === 0 && (title.toLowerCase().includes('title') || title.toLowerCase().includes('news'))) {
          continue;
        }

        if (title && summary) {
          newsItems.push({
            title,
            category: category.includes('admin') ? 'admissions' : (category.includes('art') ? 'art' : 'events'),
            categoryLabel: cols[1] || 'News',
            summary,
            image,
            link
          });
        }
      }
    }

    if (newsItems.length > 0) {
      if (container) renderNewsCards(newsItems, container);
      if (homeContainer) renderNewsCards(newsItems.slice(0, 3), homeContainer);
    } else {
      if (container) renderNewsCards(DEFAULT_NEWS_ITEMS, container);
      if (homeContainer) renderNewsCards(DEFAULT_NEWS_ITEMS.slice(0, 3), homeContainer);
    }
  } catch (err) {
    console.warn('Fetching News Google Sheet failed, using fallbacks:', err);
    if (container) renderNewsCards(DEFAULT_NEWS_ITEMS, container);
    if (homeContainer) renderNewsCards(DEFAULT_NEWS_ITEMS.slice(0, 3), homeContainer);
  }
}

function renderNewsCards(items, container) {
  container.innerHTML = '';

  items.forEach(item => {
    const article = document.createElement('article');
    article.className = 'info-card';
    article.setAttribute('data-category', item.category);

    const hasLink = item.link && item.link.trim() !== '' && item.link.trim() !== '#';
    const linkBtnHTML = hasLink
      ? `<a href="${escapeHTML(item.link)}" ${item.link.startsWith('http') ? 'target="_blank"' : ''} class="btn btn-outline" style="align-self: flex-start;">Read Details</a>`
      : '';

    article.innerHTML = `
      <div class="card-img-wrapper">
        <span class="card-badge">${escapeHTML(item.categoryLabel)}</span>
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}">
      </div>
      <div class="card-body">
        <h3 class="card-title">${escapeHTML(item.title)}</h3>
        <p class="card-text">${escapeHTML(item.summary)}</p>
        ${linkBtnHTML}
      </div>
    `;

    container.appendChild(article);
  });
}

/* --------------------------------------------------------------------------
   6. Dynamic Calendar / Events Loader (calendar.html & index.html)
   -------------------------------------------------------------------------- */
const DEFAULT_CALENDAR_EVENTS = [
  { day: '01', month: 'SEP', title: 'First Day of Term 1', details: 'School re-opens for all students at 8:30 AM.', color: 'var(--teal-brand)' },
  { day: '27', month: 'OCT', title: 'October Mid-Term Break', details: 'School closed for mid-term break from Oct 27 to Oct 31.', color: 'var(--amber-accent)' },
  { day: '22', month: 'DEC', title: 'Winter Holidays Begin', details: 'School closes at 12:00 PM for winter holidays.', color: 'var(--primary-navy)' },
  { day: '06', month: 'JAN', title: 'Term 2 Begins', details: 'School re-opens for Term 2.', color: 'var(--teal-brand)' },
  { day: '16', month: 'FEB', title: 'February Mid-Term Break', details: 'School closed for February mid-term break.', color: 'var(--amber-accent)' },
  { day: '17', month: 'MAR', title: 'St. Patrick\'s Day Closure', details: 'Public holiday school closure.', color: '#10b981' }
];

async function initDynamicEvents() {
  const container = document.getElementById('calendarEventsList');
  if (!container) return;

  if (!GOOGLE_EVENTS_CSV_URL || GOOGLE_EVENTS_CSV_URL.trim() === '') {
    renderCalendarCards(DEFAULT_CALENDAR_EVENTS, container);
    return;
  }

  try {
    const response = await fetch(GOOGLE_EVENTS_CSV_URL);
    if (!response.ok) throw new Error('Could not fetch Events Google Sheet');

    const csvText = await response.text();
    const rows = parseCSVRows(csvText);
    const events = [];

    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i];
      if (cols.length >= 4) {
        const day = cols[0];
        const month = cols[1];
        const title = cols[2];
        const details = cols[3];
        const color = cols[4] || 'var(--teal-brand)';

        if (i === 0 && (day.toLowerCase().includes('day') || title.toLowerCase().includes('event'))) {
          continue;
        }

        if (day && title) {
          events.push({ day, month, title, details, color });
        }
      }
    }

    if (events.length > 0) {
      renderCalendarCards(events, container);
    } else {
      renderCalendarCards(DEFAULT_CALENDAR_EVENTS, container);
    }
  } catch (err) {
    console.warn('Fetching Events Google Sheet failed, using fallbacks:', err);
    renderCalendarCards(DEFAULT_CALENDAR_EVENTS, container);
  }
}

function renderCalendarCards(events, container) {
  container.innerHTML = '';

  events.forEach(evt => {
    const card = document.createElement('div');
    card.className = 'calendar-card';

    card.innerHTML = `
      <div class="calendar-date" style="background: ${escapeHTML(evt.color || 'var(--teal-brand)')};">
        <span class="date-day">${escapeHTML(evt.day)}</span>
        <span class="date-month">${escapeHTML(evt.month)}</span>
      </div>
      <div>
        <h4 style="font-family: var(--font-heading); font-weight: 700; color: var(--text-heading);">${escapeHTML(evt.title)}</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">${escapeHTML(evt.details)}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   7. Dynamic Photo Gallery Loader (news.html)
   -------------------------------------------------------------------------- */
async function initDynamicGallery() {
  const container = document.getElementById('photoGalleryGrid');
  if (!container || !GOOGLE_GALLERY_CSV_URL) return;

  try {
    const response = await fetch(GOOGLE_GALLERY_CSV_URL);
    if (!response.ok) return;

    const csvText = await response.text();
    const rows = parseCSVRows(csvText);
    const photos = [];

    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i];
      if (cols.length >= 2) {
        const title = cols[0];
        const image = cols[1];

        if (i === 0 && (title.toLowerCase().includes('title') || title.toLowerCase().includes('photo'))) {
          continue;
        }

        if (title && image) {
          photos.push({ title, image });
        }
      }
    }

    if (photos.length > 0) {
      container.innerHTML = '';
      photos.forEach(photo => {
        const item = document.createElement('a');
        item.href = photo.image;
        item.setAttribute('data-lightbox', 'true');
        item.setAttribute('data-title', photo.title);
        item.style.cssText = 'border-radius: 14px; overflow: hidden; height: 180px; box-shadow: var(--shadow-sm); display: block;';

        item.innerHTML = `
          <img src="${escapeHTML(photo.image)}" alt="${escapeHTML(photo.title)}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        `;
        container.appendChild(item);
      });
      initLightbox();
    }
  } catch (err) {
    console.warn('Fetching Gallery Google Sheet failed:', err);
  }
}

/* --------------------------------------------------------------------------
   8. Dynamic Afterschool Activities Loader (afterschool-activities.html)
   -------------------------------------------------------------------------- */
const DEFAULT_AFTERSCHOOL_ACTIVITIES = [];

function renderAfterschoolCards(container, activities) {
  container.innerHTML = '';

  activities.forEach(act => {
    let badgeClass = 'badge-general';
    let catLower = (act.category || '').toLowerCase();
    if (catLower.includes('sport')) badgeClass = 'badge-sports';
    else if (catLower.includes('art') || catLower.includes('craft')) badgeClass = 'badge-art';
    else if (catLower.includes('stem') || catLower.includes('chess') || catLower.includes('code')) badgeClass = 'badge-stem';
    else if (catLower.includes('music') || catLower.includes('drama')) badgeClass = 'badge-music';

    const card = document.createElement('div');
    card.className = 'activity-card';
    card.setAttribute('data-category', act.category || 'General');

    card.innerHTML = `
      <div class="activity-header">
        <span class="activity-category-badge ${badgeClass}">${escapeHTML(act.category || 'General')}</span>
        <h3 class="activity-title">${escapeHTML(act.title)}</h3>
        <div class="activity-age"><i class="fa-solid fa-user-graduate"></i> ${escapeHTML(act.ageGroup || 'All Pupils')}</div>
      </div>
      <div class="activity-body">
        <p class="activity-desc">${escapeHTML(act.description)}</p>
        <ul class="activity-meta-list">
          <li class="activity-meta-item">
            <i class="fa-solid fa-clock"></i>
            <span><strong>When:</strong> ${escapeHTML(act.schedule)}</span>
          </li>
          <li class="activity-meta-item">
            <i class="fa-solid fa-location-dot"></i>
            <span><strong>Where:</strong> ${escapeHTML(act.location || 'School Premises')}</span>
          </li>
          <li class="activity-meta-item">
            <i class="fa-solid fa-user-tie"></i>
            <span><strong>Provider:</strong> ${escapeHTML(act.contactName || 'Activity Facilitator')}</span>
          </li>
        </ul>
      </div>
      <div class="activity-footer">
        <span class="fee-tag">${escapeHTML(act.fee || 'Contact Provider')}</span>
        <div style="display: flex; gap: 0.4rem;">
          ${act.contactEmail ? `<a href="mailto:${escapeHTML(act.contactEmail)}" class="contact-btn" title="Email Provider"><i class="fa-solid fa-envelope"></i> Email</a>` : ''}
          ${act.contactPhone ? `<a href="tel:${escapeHTML(act.contactPhone.replace(/\s+/g, ''))}" class="contact-btn" style="background: var(--primary-navy);" title="Call Provider"><i class="fa-solid fa-phone"></i> Call</a>` : ''}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function initAfterschoolFilterPills(activities) {
  const container = document.getElementById('afterschoolList');
  const pills = document.querySelectorAll('#afterschoolFilterPills .filter-pill');
  if (!pills.length || !container) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      if (filter === 'all') {
        renderAfterschoolCards(container, activities);
      } else {
        const filtered = activities.filter(act =>
          (act.category || '').toLowerCase().includes(filter.toLowerCase()) ||
          (act.title || '').toLowerCase().includes(filter.toLowerCase())
        );
        renderAfterschoolCards(container, filtered);
      }
    });
  });
}

async function initDynamicAfterschool() {
  const container = document.getElementById('afterschoolList');
  if (!container) return;

  if (!GOOGLE_AFTERSCHOOL_CSV_URL || GOOGLE_AFTERSCHOOL_CSV_URL.trim() === '') {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
        <i class="fa-solid fa-circle-exclamation" style="font-size: 2rem; color: var(--amber-accent); margin-bottom: 0.75rem;"></i>
        <h3 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.15rem; color: var(--text-heading);">Afterschool CSV URL Not Configured</h3>
      </div>
    `;
    return;
  }

  try {
    const response = await fetch(GOOGLE_AFTERSCHOOL_CSV_URL);
    if (!response.ok) throw new Error(`HTTP Error ${response.status} when fetching Google Sheet CSV`);

    const csvText = await response.text();
    const rows = parseCSVRows(csvText);

    const activities = [];
    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i];
      if (cols.length >= 1) {
        const title = cols[0];
        const category = cols[1] || 'General';
        const ageGroup = cols[2] || 'All Pupils';
        const schedule = cols[3] || 'Schedule TBC';
        const location = cols[4] || 'School Premises';
        const description = cols[5] || '';
        const contactName = cols[6] || '';
        const contactEmail = cols[7] || '';
        const contactPhone = cols[8] || '';
        const fee = cols[9] || 'Contact Provider';

        if (i === 0 && (title.toLowerCase().includes('title') || title.toLowerCase().includes('activity') || title.toLowerCase().includes('name'))) {
          continue;
        }

        if (title && title.trim() !== '') {
          activities.push({
            title,
            category: category || 'General',
            ageGroup: ageGroup || 'All Pupils',
            schedule,
            location,
            description,
            contactName,
            contactEmail,
            contactPhone,
            fee
          });
        }
      }
    }

    if (activities.length > 0) {
      renderAfterschoolCards(container, activities);
      initAfterschoolFilterPills(activities);
    } else {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <i class="fa-solid fa-folder-open" style="font-size: 2rem; color: var(--teal-brand); margin-bottom: 0.75rem;"></i>
          <h3 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.15rem; color: var(--text-heading);">No Activities Found in Published CSV</h3>
        </div>
      `;
    }
  } catch (err) {
    console.warn('Fetching Afterschool Google Sheet CSV failed:', err);
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.2rem; color: var(--amber-accent); margin-bottom: 0.75rem;"></i>
        <h3 style="font-family: var(--font-heading); font-weight: 800; font-size: 1.2rem; color: var(--text-heading); margin-bottom: 0.5rem;">Could Not Fetch CSV Data</h3>
        <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 1rem; line-height: 1.6;">
          ${escapeHTML(err.message || 'Network or CORS restriction occurred while fetching CSV.')}
        </p>
      </div>
    `;
  }
}

