var APP = 'glimmer-synth';
var ASSETS = [
  '.',
  'index.html',
  'https://fonts.googleapis.com/css?family=Open+Sans:300|Gruppo:400|Roboto+Mono:400,800&subset=latin'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(APP).then(function(cache) {
      return fetch('./asset-map.json')
        .then(function(res) {
          return res.ok ? res.json() : {};
        })
        .then(function(json) {
          var assets = json.assets || {};
          var activeCache = Object.keys(assets)
            .map(function(key) {
              return '/' + assets[key];
            })
            .concat(ASSETS);
          cache.addAll(activeCache);
          self._activeCache = activeCache;
        });
    })
  );
});

self.addEventListener('fetch', function(event) {
  var request = event.request;
  event.respondWith(
    caches.match(request).then(function(response) {
      return response || fetch(request);
    })
  );
});
