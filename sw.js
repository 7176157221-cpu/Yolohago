// Service Worker de YoLoHago
const CACHE = 'yolohago-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Permite que la app muestre notificaciones a través del SW
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'NOTIFICACION') {
    const { titulo, cuerpo } = event.data;
    self.registration.showNotification(titulo, {
      body: cuerpo,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'yolohago-msg'
    });
  }
});

// Al tocar la notificación, abrir/enfocar la app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('/');
    })
  );
});
