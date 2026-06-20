const CACHE_NAME = 'shopyump-pwa-v1';

// Instala o service worker sem esperar
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Responde a pedidos de rede (fallback moderno minimalista)
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(() => new Response('Offline - Sem Internet')));
});