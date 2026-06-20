// 1. Bibliotecas do Firebase compatíveis com Service Workers
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// 2. Conectar à tua App
firebase.initializeApp({
  apiKey: "AIzaSyBTWweTX-vR2TJR--QLP9bIdCMbYEQdbuw",
  authDomain: "carbide-crowbar-479120-s7.firebaseapp.com",
  projectId: "carbide-crowbar-479120-s7",
  storageBucket: "carbide-crowbar-479120-s7.firebasestorage.app",
  messagingSenderId: "199596159576",
  appId: "1:199596159576:web:d4b53fb23220884d46902d"
});

const messaging = firebase.messaging();

// 3. Ouvinte quando a app PWA está FECHADA ou em Background no telemóvel
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "🛍 Novo Pedido Recebido!";
  const notificationOptions = {
    body: payload.notification?.body || "Abre o painel para verificar a encomenda.",
    icon: "https://bpufeystnepnmvnprnaz.supabase.co/storage/v1/object/public/Logo/logo-192x192.png",
    badge: "https://bpufeystnepnmvnprnaz.supabase.co/storage/v1/object/public/Logo/logo-192x192.png",
    vibrate: [200, 100, 200, 100, 200],
    data: { url: "/dashboard.html" } 
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Ação de clique na notificação para reabrir a App (PWA) de forma nativa
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Se já houver um Chrome focado nisso, abre-o
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url.indexOf(event.notification.data.url) !== -1 && 'focus' in client) return client.focus();
      }
      // Instancia nova se fechado de raiz
      if (clients.openWindow) return clients.openWindow(event.notification.data.url);
    })
  );
});

// 4. Lógica de PWA (Instalação Rápida)
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('fetch', (event) => {
  // Supabase/Firebase não caem no cache (senão o envio de ordens offline daria erro invisivel)
  if (event.request.url.includes('supabase.co') || event.request.url.includes('firestore')) return;
  event.respondWith(fetch(event.request).catch(() => new Response('Offline - Sem Internet')));
});