/* Home page — local script. Reserved for home-only interactions.
   Shared navbar behavior lives in /shared/components.js. */

(function () {
  'use strict';

  // Smooth-scroll for in-page anchors. Defensive: only handles same-page hashes.
  function initSmoothScroll() {
    document.addEventListener('click', function (event) {
      var link = event.target && event.target.closest('a[href^="#"]');
      if (!link) return;
      var hash = link.getAttribute('href');
      if (hash.length < 2) return;
      var target = document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      var rect = target.getBoundingClientRect();
      var top = window.scrollY + rect.top - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  function initStatementCtaGlow() {
    if (typeof gsap === 'undefined') return;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    var ctas = document.querySelectorAll('.statement_cta');
    ctas.forEach(function (cta) {
      var outer = cta.querySelector('.statement_cta_glow_outer');
      var inner = cta.querySelector('.statement_cta_glow_inner');
      if (!outer || !inner) return;

      var isAnimating = false;

      cta.addEventListener('mouseenter', function () {
        if (isAnimating) return;
        isAnimating = true;

        var tl = gsap.timeline({
          onComplete: function () { isAnimating = false; }
        });

        tl.set(outer, { x: 0, yPercent: -50, opacity: 0.5 });
        tl.set(inner, { x: 0, yPercent: -50, opacity: 0.3 }, 0);

        tl.to([outer, inner], {
          x: '36rem',
          duration: 0.45,
          ease: 'power2.in'
        }, 0);
        tl.to(outer, { opacity: 0.25, duration: 0.45, ease: 'power2.in' }, 0);
        tl.to(inner, { opacity: 0.15, duration: 0.45, ease: 'power2.in' }, 0);

        tl.to({}, { duration: 0.13 });

        tl.set(outer, { x: '-12rem' });
        tl.set(inner, { x: '-12rem' }, '<');

        tl.to([outer, inner], {
          x: 0,
          duration: 0.55,
          ease: 'power2.out'
        });
        tl.to(outer, { opacity: 0.5, duration: 0.55, ease: 'power2.out' }, '<');
        tl.to(inner, { opacity: 0.3, duration: 0.55, ease: 'power2.out' }, '<');
      });
    });
  }

  function initHeroCtaGlow() {
    if (typeof gsap === 'undefined') return;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    var ctas = document.querySelectorAll('.hero_cta');
    ctas.forEach(function (cta) {
      var outer = cta.querySelector('.hero_cta_glow_outer');
      var inner = cta.querySelector('.hero_cta_glow_inner');
      if (!outer || !inner) return;

      var isAnimating = false;

      cta.addEventListener('mouseenter', function () {
        if (isAnimating) return;
        isAnimating = true;

        var tl = gsap.timeline({
          onComplete: function () {
            gsap.set(outer, { x: '-12rem', opacity: 0 });
            gsap.set(inner, { x: '-12rem', opacity: 0 });
            isAnimating = false;
          }
        });

        tl.set(outer, { x: '-12rem', yPercent: -50, opacity: 0 });
        tl.set(inner, { x: '-12rem', yPercent: -50, opacity: 0 }, 0);

        tl.to([outer, inner], { x: '36rem', duration: 0.7, ease: 'none' }, 0);

        tl.to(outer, { opacity: 0.5, duration: 0.2, ease: 'power2.out' }, 0);
        tl.to(inner, { opacity: 0.3, duration: 0.2, ease: 'power2.out' }, 0);

        tl.to(outer, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.5);
        tl.to(inner, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.5);
      });
    });
  }

  function initTrustCtaGlow() {
    if (typeof gsap === 'undefined') return;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    var ctas = document.querySelectorAll('.trust_cta');
    ctas.forEach(function (cta) {
      var outer = cta.querySelector('.trust_cta_glow_outer');
      var inner = cta.querySelector('.trust_cta_glow_inner');
      if (!outer || !inner) return;

      var isAnimating = false;

      cta.addEventListener('mouseenter', function () {
        if (isAnimating) return;
        isAnimating = true;

        var tl = gsap.timeline({
          onComplete: function () {
            gsap.set(outer, { x: '-12rem', opacity: 0 });
            gsap.set(inner, { x: '-12rem', opacity: 0 });
            isAnimating = false;
          }
        });

        tl.set(outer, { x: '-12rem', yPercent: -50, opacity: 0 });
        tl.set(inner, { x: '-12rem', yPercent: -50, opacity: 0 }, 0);

        tl.to([outer, inner], { x: '36rem', duration: 0.7, ease: 'none' }, 0);

        tl.to(outer, { opacity: 0.5, duration: 0.2, ease: 'power2.out' }, 0);
        tl.to(inner, { opacity: 0.3, duration: 0.2, ease: 'power2.out' }, 0);

        tl.to(outer, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.5);
        tl.to(inner, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0.5);
      });
    });
  }

  function initServicesCardLinkLine() {
    if (typeof gsap === 'undefined') return;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    var links = document.querySelectorAll('.services_card_link');
    links.forEach(function (link) {
      var line = link.querySelector('.services_card_link_line');
      if (!line) return;

      var isAnimating = false;

      link.addEventListener('mouseenter', function () {
        if (isAnimating) return;
        isAnimating = true;

        var tl = gsap.timeline({
          onComplete: function () {
            gsap.set(line, { scaleX: 1, transformOrigin: 'right center' });
            isAnimating = false;
          }
        });

        tl.set(line, { scaleX: 1, transformOrigin: 'right center' });
        tl.to(line, { scaleX: 0, duration: 0.32, ease: 'power2.in' });
        tl.set(line, { transformOrigin: 'left center' });
        tl.to(line, { scaleX: 1, duration: 0.36, ease: 'power2.out' });
      });
    });
  }

  function initTitleItalicReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    var italics = document.querySelectorAll(
      '.hero_title_italic, .services_title_italic, .statement_title_italic, .feature_title_italic, .trust_title_italic, .cta_title_italic'
    );

    italics.forEach(function (el) {
      var natural = window.getComputedStyle(el).color;
      var gradient =
        'linear-gradient(90deg, ' +
        natural + ' 0%, ' + natural + ' 45%, ' +
        '#65C395 55%, #65C395 100%)';

      el.style.backgroundImage = gradient;
      el.style.backgroundSize = '300% 100%';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.backgroundClip = 'text';
      el.style.webkitBackgroundClip = 'text';
      el.style.webkitTextFillColor = 'transparent';
      el.style.color = 'transparent';
      el.style.backgroundPosition = '100% 0%';
      el.style.filter = 'blur(0.5rem)';
      el.style.willChange = 'background-position, filter';

      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            backgroundPosition: '0% 0%',
            filter: 'blur(0rem)',
            duration: 1.4,
            ease: 'power2.out',
            onComplete: function () {
              el.style.backgroundImage = '';
              el.style.backgroundSize = '';
              el.style.backgroundRepeat = '';
              el.style.backgroundClip = '';
              el.style.webkitBackgroundClip = '';
              el.style.webkitTextFillColor = '';
              el.style.color = '';
              el.style.filter = '';
              el.style.backgroundPosition = '';
              el.style.willChange = '';
            }
          });
        }
      });
    });
  }

  function initTrustStatCount() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    var nums = document.querySelectorAll('.trust_stat_value_num[data-target]');
    if (nums.length === 0) return;

    var statGroups = [];

    Array.prototype.forEach.call(nums, function (numEl) {
      var target = parseInt(numEl.dataset.target, 10);
      var digits = parseInt(numEl.dataset.digits, 10) || String(target).length;
      if (isNaN(target) || target < 0) return;

      numEl.textContent = '';
      var cols = [];

      // Build all columns visible from the start. Each column carries the
      // full count ladder (target+1 digits) so all columns animate in lockstep.
      // Example for "10" tens column: [0,0,0,0,0,0,0,0,0,0,1] (11 items).
      for (var p = digits - 1; p >= 0; p--) {
        var divisor = Math.pow(10, p);

        var col = document.createElement('span');
        col.className = 'num_col num_col_pristine';

        var strip = document.createElement('span');
        strip.className = 'num_strip';

        for (var i = 0; i <= target; i++) {
          var dv = Math.floor(i / divisor) % 10;
          var ds = document.createElement('span');
          ds.className = 'num_digit';
          ds.textContent = String(dv);
          strip.appendChild(ds);
        }

        col.appendChild(strip);
        numEl.appendChild(col);

        cols.push({ el: col, strip: strip });
      }

      statGroups.push({ target: target, cols: cols });
    });

    var trustStatsEl = document.querySelector('.trust_stats');
    if (!trustStatsEl) return;

    ScrollTrigger.create({
      trigger: trustStatsEl,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        // Reveal all columns simultaneously
        statGroups.forEach(function (g) {
          g.cols.forEach(function (c) {
            c.el.classList.remove('num_col_pristine');
          });
        });

        var duration = 2.4;
        var ease = 'power1.out';

        statGroups.forEach(function (g, statIdx) {
          var firstStrip = g.cols[0] && g.cols[0].strip;
          var firstDigit = firstStrip && firstStrip.firstElementChild;
          if (!firstDigit) return;
          var colHeight = firstDigit.getBoundingClientRect().height;
          if (!colHeight) return;

          // All strips animate in unison — the multi-digit display reads as
          // a real odometer: ones rolls 9→0 at the exact moment tens rolls 0→1.
          var tl = gsap.timeline({ delay: statIdx * 0.12 });
          g.cols.forEach(function (c) {
            tl.fromTo(c.strip,
              { y: 0 },
              { y: -g.target * colHeight, duration: duration, ease: ease },
              0
            );
          });
        });
      }
    });
  }

  function initFooterWordmarkSplit() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger === 'undefined' || typeof SplitText === 'undefined') return;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    var wordmark = document.querySelector('.footer_wordmark_text');
    if (!wordmark) return;
    var container = wordmark.parentElement;
    if (!container) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    function fit() {
      var cs = window.getComputedStyle(container);
      var cw = container.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (!cw) return;
      var sideInset = cw * 0.04;
      var targetWidth = cw - (sideInset * 2);
      wordmark.style.width = 'auto';
      wordmark.style.display = 'inline-block';
      wordmark.style.fontSize = '100px';
      var tw = wordmark.getBoundingClientRect().width;
      wordmark.style.display = 'block';
      wordmark.style.width = '100%';
      if (!tw) return;
      var fitSize = 100 * (targetWidth / tw);
      wordmark.style.fontSize = fitSize + 'px';
    }

    var split;
    var trigger;

    function build() {
      fit();
      split = new SplitText(wordmark, { type: 'chars,words' });
      var tween = gsap.from(split.chars, {
        yPercent: 110,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wordmark,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1
        }
      });
      trigger = tween.scrollTrigger;
    }

    function ready() {
      build();

      var resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if (trigger) trigger.kill();
          if (split) split.revert();
          build();
        }, 200);
      });
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(ready);
    } else {
      ready();
    }
  }

  function init() {
    initSmoothScroll();
    initStatementCtaGlow();
    initHeroCtaGlow();
    initTrustCtaGlow();
    initServicesCardLinkLine();
    initTitleItalicReveal();
    initTrustStatCount();
    initFooterWordmarkSplit();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();