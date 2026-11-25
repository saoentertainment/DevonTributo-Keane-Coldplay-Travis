// sw.js - DEVON Tributo
const CACHE_NAME = 'devon-cache-v3'; // Si volvés a tener problemas, cambiá v3 por v4
const urlsToCache = [
  './',
  './index.html',
  './guias.js',
  './logo-devon.jpg'
];

// Instalar y forzar a que se active de inmediato
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Limpiar las memorias viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Buscar en internet primero, si falla, usar el caché (Network First)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
