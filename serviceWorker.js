const staticSite = "nearbyplaces-site-v1";
const assets = [
    "/",
    "/index.html",
    "/style/style.css",
    "/script/map.js",
    "/serviceWorker.js",
    "/manifest.json"
];

self.addEventListener("install", (installEvent) => {
    installEvent.waitUntil(
        caches.open(staticSite).then((cache) => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then((res) => {
            return res || fetch(fetchEvent.request);
        })
    );
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then((res) => console.log("service worker registered"))
            .catch((err) => console.log("service worker not registered", err));
    });
}
