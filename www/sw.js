// Máscara contra Máscara — service worker (funciona sin internet)
// Cuando subas una versión nueva del juego, cambia el número de VERSION para que los celulares la descarguen.
const VERSION = 'mcm-v34';
const FILES = ['./', './index.html', './css/juego.css', './js/juego.js', './manifest.json', './icon-180.png', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './privacidad.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Red primero para el juego (así recibes actualizaciones); si no hay internet, usa la copia guardada.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        const copy = r.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy));
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
