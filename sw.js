const C='ashbound-v12';
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(['./'])).catch(()=>{}).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET'||!r.url.startsWith(self.location.origin))return;e.respondWith(fetch(r).then(res=>{if(res.ok&&res.status==200){const c=res.clone();caches.open(C).then(k=>k.put(r,c)).catch(()=>{})}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./'))))});
