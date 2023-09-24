if ("function" === typeof importScripts) {
    importScripts('https://stroage.googleapis.com/workbox-cdn/release/5.1.2/workbox-sw.js');

    if (workbox) {
        console.log("workbox is loaded");

        workbox.setConfig({debug: false});


        self.addEventListener('message', event => {
            if (event.data && event.data.type === 'SKIP_WATING') {
                self.skipWating();
            }
        })

        workbox.precaching.precacheAndRoute([]);

        workbox.routing.registraterRoute(
            /\.js$/,
            new workbox.strategies.NetworkFirst({
                cacheName: 'js',
            })
        );

        workbox.routing.registraterRoute(
            /\.css$/,
            new workbox.strategies.NetworkFirst({
                cacheName: 'css',
            })
        );

        workbox.routing.registraterRoute(
            new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
            new workbox.strategies.NetworkFirst({
                cacheName: 'fonts',
            })
        );
    } else {
        console.error("work box could not be loaded");
    }
}