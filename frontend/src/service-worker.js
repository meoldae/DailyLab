/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, NetworkOnly } from "workbox-strategies";

// importScripts("workbox-core.js");
// importScripts("workbox-expiration.js");
// importScripts("workbox-precaching.js");
// importScripts("workbox-routing.js");
// importScripts("workbox-strategies.js");

// // 가져온 스크립트 파일로 사용
// const { clientsClaim } = workbox.core;
// const { ExpirationPlugin } = workbox.expiration;
// const { precacheAndRoute, createHandlerBoundToURL } = workbox.precaching;
// const { registerRoute } = workbox.routing;
// const { StaleWhileRevalidate, NetworkOnly } = workbox.strategies;

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");

registerRoute(({ request, url }) => {
  if (request.mode !== "navigate") {
    return false;
  }

  if (url.pathname.startsWith("/_")) {
    return false;
  }

  if (url.pathname.match(fileExtensionRegexp)) {
    return false;
  }

  return true;
}, createHandlerBoundToURL(import.meta.env.VITE_DEV + "/index.html"));
// }, createHandlerBoundToURL("/index.html"));

registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith(".png"),
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

registerRoute(
  ({ url }) => url.href.includes("/oauth2"),
  new NetworkOnly({
    cacheName: "oauth2-cache",
  })
);

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});


// Modified fetch event handler
self.addEventListener("fetch", event => {
  const checkurl = event.request.url;
  console.log(checkurl);

  if (checkurl.includes("/oauth2")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // For other requests, follow the cache-then-network strategy
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

