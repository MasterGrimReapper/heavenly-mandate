/* heavenlymandate.net: the shared script (the store badges, the menu, the hero filter, the gentle reveal).
   Every page works without it: the download page and the home page carry a plain HTML copy of the store panel. */

/* ====== STORE LINKS: fill in a value to put a store live. null = not available yet (shown as a disabled badge). ======
   googlePlay: 'https://play.google.com/store/apps/details?id=com.heavenlymandate.game'   (when the listing is public)
   appStore:   the App Store URL, if an iOS version ever ships
   steam:      'https://store.steampowered.com/app/<appid>/'                              (when the Steam page exists)
   apk:        the direct Android download (set to null to hide it once Google Play is live, if wanted) */
const STORE = {
  googlePlay: null,
  appStore: null,
  steam: null,
  apk: 'https://github.com/MasterGrimReapper/heavenly-mandate/raw/main/android/HeavenlyMandate-Android.apk'
};

(function () {
  'use strict';
  const doc = document, root = doc.documentElement;
  root.classList.add('js');

  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 3.5v17a1 1 0 0 0 1.5.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 5 3.5Z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 18.5h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    android: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 9h10v8a1.5 1.5 0 0 1-1.5 1.5H15V21a1 1 0 0 1-2 0v-2.5h-2V21a1 1 0 0 1-2 0v-2.5h-.5A1.5 1.5 0 0 1 7 17V9Zm-2.5 0a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1Zm15 0a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1ZM7.2 8a4.9 4.9 0 0 1 2.4-3.7l-.9-1.5a.4.4 0 1 1 .7-.4l.9 1.6a5.5 5.5 0 0 1 3.4 0l.9-1.6a.4.4 0 1 1 .7.4l-.9 1.5A4.9 4.9 0 0 1 16.8 8H7.2Zm2.8-2a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2Zm4 0a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2Z"/></svg>',
    desktop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4" width="19" height="12.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 20.5h8M12 16.5v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0-5-5m5 5 5-5M4 20h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    steam: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="15.5" cy="9" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="8.6" cy="15.4" r="1.9" fill="currentColor"/><path d="M8.6 15.4 13.6 10.6" stroke="currentColor" stroke-width="1.6"/></svg>'
  };

  /* a store badge: a link when its URL is set, a disabled placeholder when it is not */
  function badge(url, icon, liveSmall, liveBig, offSmall, offBig, tag) {
    if (url) return `<a class="badge" href="${url}" rel="noopener" target="_blank">${icon}<span><small>${liveSmall}</small><b>${liveBig}</b></span></a>`;
    return `<span class="badge" role="img" aria-disabled="true" aria-label="${offBig}: ${tag}">${icon}<span><small>${offSmall}</small><b>${offBig}</b></span><span class="tag">${tag}</span></span>`;
  }

  /* the store panel: every [data-store-panel] block (the download page and the #play section on the home page) */
  function panelHTML() {
    const apk = STORE.apk ? `<a class="btn gold" href="${STORE.apk}" download>${ICON.down}Download the APK now</a>
      <p class="note">Android 8 or newer, about 32 MB. The app updates itself.</p>` : '';
    return `<div class="store-panel">
  <section class="store-group" aria-labelledby="sg-mobile">
    <h3 id="sg-mobile">${ICON.phone.replace('<svg', '<svg width="22" height="22"')}Mobile</h3>
    <div class="store-cols">
      <div class="store-card frame">
        <h4>${ICON.android}Android</h4>
        ${badge(STORE.googlePlay, ICON.play, 'Get it on', 'Google Play', 'Soon on', 'Google Play', 'Coming soon')}
        ${apk}
      </div>
      <div class="store-card frame">
        <h4>${ICON.phone}iOS</h4>
        ${badge(STORE.appStore, ICON.phone, 'Download on the', 'App Store', 'Later on the', 'App Store', 'Planned')}
        <p class="note">An iPhone and iPad version is planned for later. Android comes first.</p>
      </div>
    </div>
  </section>
  <section class="store-group" aria-labelledby="sg-desk">
    <h3 id="sg-desk">${ICON.desktop.replace('<svg', '<svg width="22" height="22"')}Desktop <small>Windows · <span class="wip">Work in progress</span></small></h3>
    <div class="store-card frame">
      ${badge(STORE.steam, ICON.steam, 'Wishlist on', 'Steam', 'Coming to', 'Steam', 'Wishlist soon')}
      <p class="note">${STORE.steam ? 'Add Heavenly Mandate to your Steam wishlist to hear the moment it launches.' : 'A Windows version for Steam is in the works. The wishlist opens as soon as the store page is up.'}</p>
    </div>
  </section>
</div>`;
  }

  function fillPanels() { doc.querySelectorAll('[data-store-panel]').forEach(el => { el.innerHTML = panelHTML(); }); }

  /* ---------- the menu on small screens ---------- */
  function menu() {
    const btn = doc.querySelector('.menu-btn'), nav = doc.getElementById('site-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => { const open = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', String(open)); });
    doc.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); } });
  }

  /* ---------- the hero filter (heroes page) ---------- */
  function heroFilter() {
    const bar = doc.querySelector('.filters'); if (!bar) return;
    bar.hidden = false;
    const cards = [...doc.querySelectorAll('.hcard')], count = doc.getElementById('hero-count');
    bar.addEventListener('click', e => {
      const b = e.target.closest('button[data-role]'); if (!b) return;
      bar.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      const r = b.dataset.role; let n = 0;
      cards.forEach(c => { const on = r === 'all' || c.dataset.role === r; c.hidden = !on; if (on) n++; });
      if (count) count.textContent = r === 'all' ? `Showing all ${n} immortals` : `Showing ${n} ${b.dataset.label}`;
    });
    // open a hero's card when the page is reached with #hero-id
    const id = location.hash.slice(1), el = id && doc.getElementById(id);
    if (el && el.classList.contains('hcard')) { const d = el.querySelector('details'); if (d) d.open = true; }
  }

  /* ---------- a gentle rise on scroll ---------- */
  function reveal() {
    const els = doc.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(e => io.observe(e));
  }

  function init() {
    fillPanels(); menu(); heroFilter(); reveal();
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
})();
