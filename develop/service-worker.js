var CACHE_NAME = 'my-site-cache-v1';

var toCache = [
  "/",
  "/index.html",
  "/index.js",
  "/db.js",
  "/style.css"
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Files were successfully pre-cached');
        return cache.addAll(toCache);
      })
  );
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request).then(function(res) {
        if (res) {
          return res;
        } else if (e.request.headers.get("accept").includes("text/html")) {
          return caches.match("/index.html");
        }
      });
    })
  );
});

