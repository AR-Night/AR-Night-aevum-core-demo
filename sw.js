const CACHE='aevum-core-public-v0.6-split';
const ASSETS=[
  './',
  './index.html',
  './app.css',
  './app-core.js',
  './app-ui.js',
  './app-demo.js',
  './guide.html',
  './iphone-preview.html',
  './manifest.webmanifest',
  './assets/icon.svg',
  './README.md',
  './COPYRIGHT.md'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(response=>response||caches.match('./index.html'))))});
