let CACHE_NAME = 'my-site-cache-v1';

//import하면서 항상 응답이 같을 수 밖에 없는 resource
const immutableRequests = [
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
];

//가지고 있는데 내용이 변치 않는 resource
const mutableRequests = [
  "/index.html",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      const newImmutableRequests = [];
      return Promise.all(
        immutableRequests.map(function (url) {
          return caches.match(url).then(function (response) {
            if (response) {
              return cache.put(url, response);
            } else {
              newImmutableRequests.push(url);
              return Promise.resolve();
            }
          });
        })
      ).then(function () {
        return cache.addAll(newImmutableRequests.concat(mutableRequests));
      });
    })
  );
});

// Modified fetch event handler
self.addEventListener('fetch', event => {
  const checkurl = event.request.url;

  console.log("____________________________redirect test____________________________");

  // Directly fetch the request if it includes /img/404error.jpg or if it's an API request
  if (checkurl.includes('/api') || checkurl.includes('/manifest') || checkurl.includes('/serviceWorker')) {
    console.log("____________________________test____________________________");
    event.respondWith(fetch(event.request));
    return;
  }

  // For other requests, follow the cache-then-network strategy
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
  );
});
