const CACHE_NAME = "daruma-wishes-v1";
const CORE_ASSETS = [
  "./",
  "./daruma-wishes.html",
  "./manifest.webmanifest",
  "./assets/daruma-wishes/daruma-cropped.png",
  "./assets/daruma-wishes/icon-192.png",
  "./assets/daruma-wishes/icon-512.png",
  "./assets/daruma-wishes/nippon-colors.js",
  "./assets/daruma-wishes/firebase-config.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./daruma-wishes.html"));
    })
  );
});
