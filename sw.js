/* ERRE Complete — service worker. Sube VERSION cuando cambies este archivo. */
const VERSION='erre-v3',CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin!==location.origin)return; /* Supabase, YouTube, fuentes: siempre red, nunca caché */
  if(r.mode==='navigate'){ /* la app: primero red (para recibir actualizaciones), si no hay señal, la copia guardada */
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(VERSION).then(c=>c.put('index.html',cp));return res;}).catch(()=>caches.match('index.html')));return;}
  e.respondWith(caches.match(r).then(h=>{const n=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp));}return res;}).catch(()=>h);return h||n;}));
});

self.addEventListener('push',e=>{
  let d={};try{d=e.data?e.data.json():{};}catch(x){d={title:'ERRE Complete',body:e.data?e.data.text():''};}
  e.waitUntil(self.registration.showNotification(d.title||'ERRE Complete',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag||'erre',renotify:true,data:{url:d.url||'./'}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();const url=new URL((e.notification.data&&e.notification.data.url)||'./',self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(ws=>{for(const w of ws){if(w.url.startsWith(self.registration.scope)&&'focus' in w)return w.focus();}return self.clients.openWindow(url);}));
});
