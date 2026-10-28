const V='sabbir-v9',CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!='GET')return;const u=new URL(q.url);if(u.origin!=location.origin&&!/(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(u.hostname))return;
e.respondWith(caches.open(V).then(c=>c.match(q).then(r=>{
const n=fetch(q).then(res=>{if(res&&(res.ok||res.type=='opaque'))c.put(q,res.clone());return res}).catch(()=>r||c.match('index.html'));
return r||n})))})