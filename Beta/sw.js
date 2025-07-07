self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
});

self.addEventListener('fetch', (event) => {
  // No intercepta nada por ahora
});
