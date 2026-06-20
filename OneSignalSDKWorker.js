importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Apenas interceta a navegação de páginas (ex: atualizar a app sem net)
  // Ignora completamente pedidos à API para não crashar as notificações
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(
          '<html><body style="background:#0F172A;color:white;font-family:sans-serif;text-align:center;padding:3rem;"><h2>Sem Ligação à Internet</h2><p>Verifique a sua rede e tente aceder novamente.</p></body></html>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      })
    );
  }
});