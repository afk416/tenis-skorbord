// Tenis Skorbord — Service Worker (çevrimdışı destekli + HEP GÜNCEL)
// Strateji: sayfa/HTML için ÖNCE AĞ (çevrimiçiyken daima son sürüm), ağ yoksa önbellek.
// Kurulumda HTTP cache baypas edilir ({cache:'reload'}) → bayat içerik cache'lenmez.
const CACHE = 'tenis-skor-v10';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(ASSETS.map((u) => c.add(new Request(u, { cache: 'reload' })))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const req = e.request;

  // HTML / sayfa açılışı → ÖNCE AĞ (sunucuyla doğrula), yoksa önbellek
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy));
          return resp;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // Diğer varlıklar (ikon/manifest) → önbellek öncelikli (hızlı), yoksa ağ
  e.respondWith(
    caches.match(req).then((r) =>
      r || fetch(req).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return resp;
      }).catch(() => undefined)
    )
  );
});
