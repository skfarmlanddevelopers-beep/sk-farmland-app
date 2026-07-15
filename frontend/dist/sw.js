const CACHE_NAME = 'sk-farmland-assets-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.jpg',
  '/apple-touch-icon.jpg',
  '/robots.txt'
];

// Install Event - Pre-cache core static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Dynamic caching logic
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Exclude non-GET requests and API calls for database modifications or admin panels
  if (
    event.request.method !== 'GET' ||
    url.pathname.includes('/api/admin') ||
    url.pathname.includes('/api/leads') ||
    url.pathname.includes('/api/site-visits')
  ) {
    return;
  }

  // Handle SPA routing & index.html - Network-First falling back to Cache
  if (event.request.mode === 'navigate' || (event.request.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put('/index.html', responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Handle Assets and Images - Cache-First Strategy
  const isStaticAsset = 
    url.pathname.includes('/assets/') || 
    url.pathname.includes('/uploads/') ||
    url.pathname.endsWith('.js') || 
    url.pathname.endsWith('.css') ||
    /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache instantly. 
          // For assets that are not hashed and are not under uploads, fetch updates in background.
          if (!url.pathname.includes('/uploads/') && !url.pathname.includes('-')) {
            fetch(event.request).then((networkResponse) => {
              if (networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, networkResponse);
                });
              }
            }).catch(() => {});
          }
          return cachedResponse;
        }

        // Fetch from network and cache it dynamically
        return fetch(event.request)
          .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return networkResponse;
          })
          .catch(() => {
            // Handle offline case (return cached version if any, else fail)
            return caches.match(event.request);
          });
      })
    );
  }
});
