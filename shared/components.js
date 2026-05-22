/* Shared navbar behaviour — runs on every page that includes it. */

(function () {
  'use strict';

  function initNavbar() {
    var burger = document.querySelector('.navbar_burger');
    var drawer = document.querySelector('.navbar_drawer');
    if (!burger || !drawer) return;

    var barTop    = document.querySelector('.navbar_burger_bar_top');
    var barMid    = document.querySelector('.navbar_burger_bar_middle');
    var barBottom = document.querySelector('.navbar_burger_bar_bottom');

    function close() {
      burger.classList.remove('navbar_burger_open');
      drawer.classList.remove('navbar_drawer_open');
      if (barTop)    barTop.classList.remove('navbar_burger_bar_top_active');
      if (barMid)    barMid.classList.remove('navbar_burger_bar_middle_active');
      if (barBottom) barBottom.classList.remove('navbar_burger_bar_bottom_active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function open() {
      burger.classList.add('navbar_burger_open');
      drawer.classList.add('navbar_drawer_open');
      if (barTop)    barTop.classList.add('navbar_burger_bar_top_active');
      if (barMid)    barMid.classList.add('navbar_burger_bar_middle_active');
      if (barBottom) barBottom.classList.add('navbar_burger_bar_bottom_active');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    burger.addEventListener('click', function () {
      var isOpen = burger.classList.contains('navbar_burger_open');
      if (isOpen) close();
      else open();
    });

    drawer.addEventListener('click', function (event) {
      var target = event.target;
      if (target && target.matches && target.matches('a, .navbar_drawer_link, .navbar_drawer_cta')) {
        close();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' &&
          burger.classList.contains('navbar_burger_open')) {
        close();
      }
    });

    var media = window.matchMedia('(min-width: 48rem)');
    media.addEventListener('change', function (e) {
      if (e.matches) close();
    });
  }

  function initNavbarCtaGlow() {
    if (typeof gsap === 'undefined') return;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    var ctas = document.querySelectorAll('.navbar_cta');
    ctas.forEach(function (cta) {
      var outer = cta.querySelector('.navbar_cta_glow_outer');
      var inner = cta.querySelector('.navbar_cta_glow_inner');
      if (!outer || !inner) return;

      var isAnimating = false;

      cta.addEventListener('mouseenter', function () {
        if (isAnimating) return;
        isAnimating = true;

        var tl = gsap.timeline({
          onComplete: function () {
            gsap.set(outer, { x: '-8rem', opacity: 0 });
            gsap.set(inner, { x: '-8rem', opacity: 0 });
            isAnimating = false;
          }
        });

        tl.set(outer, { x: '-8rem', yPercent: -50, opacity: 0 });
        tl.set(inner, { x: '-8rem', yPercent: -50, opacity: 0 }, 0);

        tl.to([outer, inner], { x: '24rem', duration: 0.6, ease: 'none' }, 0);

        tl.to(outer, { opacity: 0.5, duration: 0.16, ease: 'power2.out' }, 0);
        tl.to(inner, { opacity: 0.3, duration: 0.16, ease: 'power2.out' }, 0);

        tl.to(outer, { opacity: 0, duration: 0.16, ease: 'power2.in' }, 0.44);
        tl.to(inner, { opacity: 0, duration: 0.16, ease: 'power2.in' }, 0.44);
      });
    });
  }

  function initNavbarTheme() {
    var nav = document.querySelector('.navbar');
    if (!nav) return;
    var sections = document.querySelectorAll('[data-nav-theme]');
    if (sections.length === 0) return;

    var current = '';
    var navHalf = (nav.offsetHeight || 72) / 2;

    function update() {
      var probe = navHalf;     // viewport-y of navbar centerline
      var nextTheme = nav.dataset.theme || 'dark';
      for (var i = 0; i < sections.length; i++) {
        var sec = sections[i];
        var rect = sec.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          nextTheme = sec.dataset.navTheme;
          break;
        }
      }
      if (nextTheme !== current) {
        current = nextTheme;
        nav.dataset.theme = nextTheme;
      }
    }

    update();

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        update();
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () {
      navHalf = (nav.offsetHeight || 72) / 2;
      update();
    });
  }

  function applyLinkMask(link) {
    if (link.querySelector('.link_mask')) return;

    var textNode = null;
    for (var i = 0; i < link.childNodes.length; i++) {
      var c = link.childNodes[i];
      if (c.nodeType === 3 && c.nodeValue.trim()) {
        textNode = c;
        break;
      }
    }
    if (!textNode) return;

    var txt = textNode.nodeValue.trim();
    var mask = document.createElement('span');
    mask.className = 'link_mask';

    var base = document.createElement('span');
    base.className = 'link_mask_in link_mask_base';
    base.textContent = txt;

    var dup = document.createElement('span');
    dup.className = 'link_mask_in link_mask_dup';
    dup.setAttribute('aria-hidden', 'true');
    dup.textContent = txt;

    mask.appendChild(base);
    mask.appendChild(dup);
    link.replaceChild(mask, textNode);
  }

  function initLinkMaskReveal() {
    var selectors = [
      '.navbar_link',
      '.footer_navcol_link',
      '.footer_legal_link',
      '.navbar_cta_label',
      '.hero_cta_label',
      '.statement_cta_label',
      '.trust_cta_label',
      '.card_link'
    ];
    selectors.forEach(function (sel) {
      var links = document.querySelectorAll(sel);
      for (var i = 0; i < links.length; i++) applyLinkMask(links[i]);
    });
  }

  function initCardLinkLine() {
    if (typeof gsap === 'undefined') return;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    var links = document.querySelectorAll('.card_link');
    links.forEach(function (link) {
      var line = link.querySelector('.card_link_line');
      if (!line) return;

      var isAnimating = false;

      link.addEventListener('mouseenter', function () {
        if (isAnimating) return;
        isAnimating = true;

        var tl = gsap.timeline({
          onComplete: function () {
            gsap.set(line, {
              scaleX: 1,
              transformOrigin: 'right center'
            });
            isAnimating = false;
          }
        });

        tl.set(line, { scaleX: 1, transformOrigin: 'right center' });
        tl.to(line, {
          scaleX: 0,
          duration: 0.32,
          ease: 'power2.in'
        });
        tl.set(line, { transformOrigin: 'left center' });
        tl.to(line, {
          scaleX: 1,
          duration: 0.36,
          ease: 'power2.out'
        });
      });
    });
  }

  function init() {
    initNavbar();
    initNavbarCtaGlow();
    initNavbarTheme();
    initLinkMaskReveal();
    initCardLinkLine();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
