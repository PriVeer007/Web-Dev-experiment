/* ========================================
   Developer Card — Interactive Behaviour
   ======================================== */

(function () {
  'use strict';

  // ------------------------------------------------------------------
  // DOM Elements
  // ------------------------------------------------------------------
  const themeBtn = document.getElementById('theme-btn');
  const htmlEl = document.documentElement;

  // ------------------------------------------------------------------
  // Theme Management
  // ------------------------------------------------------------------
  const THEME_KEY = 'developer-card-theme';
  const THEMES = { LIGHT: 'light', DARK: 'dark' };

  // Resolve the theme to apply:
  //   1. User's saved preference (localStorage)
  //   2. System prefers-color-scheme
  //   3. Default: light
  function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark ? THEMES.DARK : THEMES.LIGHT;
  }

  // Apply a theme to the document and sync the toggle button state
  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeButton(theme);
  }

  // Toggle between light and dark themes
  function toggleTheme() {
    const current = htmlEl.getAttribute('data-theme') || THEMES.LIGHT;
    setTheme(current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  }

  // Update button text and icon based on the active theme
  function updateThemeButton(theme) {
    if (!themeBtn) return;

    const isDark = theme === THEMES.DARK;
    themeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    themeBtn.setAttribute('aria-pressed', isDark);
    themeBtn.setAttribute('aria-label', isDark
      ? 'Switch to light mode'
      : 'Switch to dark mode');
  }

  // Respect system theme changes while the page is open,
  // but only if the user hasn't explicitly saved a preference.
  function watchSystemTheme() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (event) => {
      const saved = localStorage.getItem(THEME_KEY);
      if (!saved) {
        setTheme(event.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };
    media.addEventListener('change', handler);
  }

  // ------------------------------------------------------------------
  // Card Entrance Animation
  // ------------------------------------------------------------------
  function animateEntrance() {
    const card = document.querySelector('.card');
    const elements = card
      ? [card.querySelector('.avatar-box'), card.querySelector('h1'),
         card.querySelector('.role'), card.querySelector('.section'),
         card.querySelector('.skills'), card.querySelector('.socials')]
              .filter(Boolean)
      : [];

    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = `opacity ${300 + index * 100}ms ease,
                             transform ${300 + index * 100}ms ease`;

      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }

  // ------------------------------------------------------------------
  // Initialization
  // ------------------------------------------------------------------
  function init() {
    // Set initial theme
    setTheme(getInitialTheme());

    // Wire up the theme toggle button
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Watch for system theme changes
    watchSystemTheme();

    // Animate the card in once the page is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', animateEntrance);
    } else {
      animateEntrance();
    }
  }

  init();
})();