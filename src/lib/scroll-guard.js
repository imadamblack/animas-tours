export const SCROLL_GUARD = String.raw`
(function () {
  try {
    var UA = navigator.userAgent || '';
    // Instagram y Facebook, iOS y Android. IABMV aparece en el IAB de Meta.
    if (!/FBAN|FBAV|FB_IAB|FBIOS|IABMV|Instagram/i.test(UA)) return;
    if (window.__sg) return;
    window.__sg = 1;

    var LOCK_MS   = 900;    // bloqueo duro inicial
    var WINDOW_MS = 3500;   // vigilancia reactiva total
    var TOLERANCE = 4;      // px antes de considerarlo salto
    var TELEMETRY = true;   // pon en false cuando termines de calibrar
    var ENDPOINT  = '/api/t';

    var anchorY = 0;
    var user = false;
    var locked = false;
    var logged = false;
    var t0 = Date.now();
    var html = document.documentElement;
    var body = document.body;
    var prev = {};

    // Momento en que el guardián entró, medido desde el inicio de la navegación.
    var guardIn = 0;
    try { guardIn = performance.now(); } catch (e) {}
    window.__sgT = guardIn;

    function now() {
      try { return performance.now(); } catch (e) { return Date.now() - t0; }
    }

    // Un fragmento que tú no pusiste no debe sobrevivir.
    try {
      if (location.hash) {
        history.replaceState(null, '', location.pathname + location.search);
      }
      history.scrollRestoration = 'manual';
    } catch (e) {}

    var GESTURES = ['touchstart','touchmove','wheel','pointerdown','mousedown','keydown'];

    function report(y) {
      if (!TELEMETRY || logged) return;
      logged = true;
      try {
        var at = now();
        navigator.sendBeacon(ENDPOINT, JSON.stringify({
          guardIn:    Math.round(guardIn),
          jumpAt:     Math.round(at),
          sinceGuard: Math.round(at - guardIn),
          wasLocked:  locked,
          y:          Math.round(y),
          href:       location.href.slice(0, 300),
          hash:       location.hash,
          ua:         UA.slice(0, 200)
        }));
      } catch (e) {}
    }

    function hardScroll(y) {
      var p = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, y);
      html.style.scrollBehavior = p;
    }

    function lock() {
      if (locked) return;
      locked = true;
      prev.hOverflow = html.style.overflow;
      prev.hOverscroll = html.style.overscrollBehavior;
      html.style.overflow = 'hidden';
      html.style.overscrollBehavior = 'none';
      if (body) {
        prev.bOverflow = body.style.overflow;
        body.style.overflow = 'hidden';
      }
    }

    function unlock() {
      if (!locked) return;
      locked = false;
      html.style.overflow = prev.hOverflow || '';
      html.style.overscrollBehavior = prev.hOverscroll || '';
      if (body) body.style.overflow = prev.bOverflow || '';
    }

    function correct() {
      if (user) return;
      var y = window.scrollY || window.pageYOffset || 0;
      if (Math.abs(y - anchorY) > TOLERANCE) {
        report(y);
        // Si el salto vino de un focus (autofill), soltar el campo o reincide.
        var ae = document.activeElement;
        if (ae && ae !== document.body && ae !== html &&
            typeof ae.blur === 'function' &&
            /INPUT|TEXTAREA|SELECT|BUTTON/.test(ae.tagName || '')) {
          try { ae.blur(); } catch (e) {}
        }
        hardScroll(anchorY);
      }
    }

    function onScroll() {
      if (user || now() - guardIn > WINDOW_MS) return;
      correct();
    }

    function tick() {
      if (user || now() - guardIn > WINDOW_MS) return;
      correct();
      requestAnimationFrame(tick);
    }

    function release() {
      if (user) return;
      user = true;
      unlock();
      GESTURES.forEach(function (ev) {
        window.removeEventListener(ev, release, true);
      });
      window.removeEventListener('scroll', onScroll, true);
    }

    GESTURES.forEach(function (ev) {
      window.addEventListener(ev, release, { capture: true, passive: true });
    });
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });

    lock();
    setTimeout(unlock, LOCK_MS);
    requestAnimationFrame(tick);

    // Si no hubo salto, reportar igual para tener la línea base de guardIn.
    if (TELEMETRY) {
      setTimeout(function () {
        if (logged) return;
        logged = true;
        try {
          navigator.sendBeacon(ENDPOINT, JSON.stringify({
            guardIn: Math.round(guardIn),
            jumpAt: null,
            sinceGuard: null,
            note: 'sin salto detectado',
            href: location.href.slice(0, 300),
            ua: UA.slice(0, 200)
          }));
        } catch (e) {}
      }, WINDOW_MS + 500);
    }

    window.addEventListener('hashchange', function () {
      if (user) return;
      try {
        history.replaceState(null, '', location.pathname + location.search);
      } catch (e) {}
      hardScroll(anchorY);
    });
  } catch (e) { /* nunca romper la página */ }
})();
`;