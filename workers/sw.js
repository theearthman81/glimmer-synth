var CACHE_NAME = 'glimmer-synth-<@VERSION@>';
var ASSETS = [
  '.',
  'index.html',
  'https://fonts.googleapis.com/css?family=Open+Sans:300|Gruppo:400|Roboto+Mono:400,800&subset=latin'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return fetch('./asset-map.json')
        .then(function(res) {
          return res.ok ? res.json() : {};
        })
        .then(function(json) {
          var assets = json.assets || {};
          cache.addAll(
            Object.keys(assets)
              .map(function(key) {
                return '/' + assets[key];
              })
              .concat(ASSETS)
          );
        });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            return cacheName !== CACHE_NAME;
          })
          .map(function(cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  var request = event.request;
  var requestUrl = new URL(request.url);
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(request).then(function(res) {
        if (res) {
          return res;
        }

        return fetch(request).then(function(networkRes) {
          if (/fonts\.gstatic\.com\//.test(requestUrl.href)) {
            cache.put(request, networkRes.clone());
          }
          return networkRes;
        });
      });
    })
  );
});
