importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')

if (workbox) {
  console.log('Workbox berhasil dimuat')
  // Precache App Shell
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/css/styles.css', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' }
  ])

  // Route pages
  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  )

  // Route matchteam pages
  workbox.routing.registerRoute(
    new RegExp('/matchteam.html'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'matchteam'
    })
  )

  // Route images
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50
        })
      ]
    })
  )

  // Route data footbal api
  workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org\/v2\//,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'apiFootball-data',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 210,
          maxEntries: 100
        })
      ]
    })
  )

  // Route google fonts
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'googleFonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30
        })
      ]
    })
  )

  // Push Notification
  self.addEventListener('push', function (event) {
    let body
    if (event.data) {
      body = event.data.text()
    } else {
      body = 'Push message no payload'
    }
    const options = {
      body: body,
      icon: 'maskable_icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    }
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    )
  })
} else {
  console.log('Workbox gagal dimuat')
}
