var cacheName = 'v1';

var cacheFiles = [
    '/',
    '/home',
    '/review',
    '/persona_results',
    '/persona',
    '../../public/stylecheets/style.css',
    '../../public/javascripts/persona-steps',
    '../../public/javascripts/bundle.js'
];


self.addEventListener('install', function(event) {
    console.log(' Service worker installation');
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {

            console.log('cache files', cacheFiles);
            cache.addAll(cacheFiles);
        })
    );

});


self.addEventListener('activate', function(event) {
    console.log(' Service worker activated');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                if (thisCacheName !== cacheName) {
                    return caches.delete(thisCacheName);
                }
            }));
        })
    );
});


self.addEventListener('fetch', function(event) {
    console.log('[serviceWorker] fetching', event.request.url);
    event.respondWith(

        caches.match(event.request).then(function(response) {
            if (response) {
                console.log("[serviceWorker] Found in cache", event.request.url);
                return response;
            }

            var requestClone = event.request.clone();
            fetch(requestClone).then(function(response) {
                    if (!response) {
                        console.log("[serviceWorker] No response from fetch");
                        return response;
                    }
                    var responseClone = response.clone();
                    caches.open(cacheName).then(function(cache) {
                        console.log("[serviceWorker] New Data New", event.request.url);
                        cache.put(event.request, responseClone);
                        return response;
                    });
                })
                .catch(function(err) {
                    console.log('[serviceWorker] error fetching and cashing new request', err);
                });
            return fetch(event.request);
        }));
});
