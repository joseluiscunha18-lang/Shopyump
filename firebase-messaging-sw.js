// Importa o Firebase compatível com Service Workers de background
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Repete a tua configuração no background
firebase.initializeApp({
  apiKey: "AIzaSyBTWweTX-vR2TJR--QLP9bIdCMbYEQdbuw",
  authDomain: "carbide-crowbar-479120-s7.firebaseapp.com",
  projectId: "carbide-crowbar-479120-s7",
  storageBucket: "carbide-crowbar-479120-s7.firebasestorage.app",
  messagingSenderId: "199596159576",
  appId: "1:199596159576:web:d4b53fb23220884d46902d"
});

const messaging = firebase.messaging();

// Lida com Notificações que chegam quando a App PWA está fechada (Android native feel)
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Recebeu notificação em Background ', payload);

  const notificationTitle = payload.notification.title || "Novo Pedido Recebido!";
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://bpufeystnepnmvnprnaz.supabase.co/storage/v1/object/public/Logo/logo-192x192.png',
  };

  // Diz ao sistema operativo do telemóvel para mostrar a pop-up
  self.registration.showNotification(notificationTitle, notificationOptions);
});