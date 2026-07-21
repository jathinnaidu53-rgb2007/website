self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// A basic fetch handler satisfies Chrome's PWA criteria
self.addEventListener("fetch", (event) => {
  // Let the browser handle the fetch requests natively
});
