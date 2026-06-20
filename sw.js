// 1. CARREGA O MOTOR DAS NOTIFICAÇÕES (ONESIGNAL) DENTRO DO PWA
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// 2. CONFIGURA O MODO APP OFFLINE (PWA)
const CACHE_NAME = 'shopyump-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Responde aos pedidos da app
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(() => new Response('Offline - Sem Internet')));
});