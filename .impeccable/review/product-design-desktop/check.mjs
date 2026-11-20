import fs from 'node:fs';
const out='out/product-design-desktop/';
const tabs=await(await fetch('http://127.0.0.1:9296/json')).json();
const ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map();
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id)}};
const call=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,m=>m.error?reject(m.error):resolve(m.result));ws.send(JSON.stringify({id:n,method,params}))});
const ev=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
const wait=(ms=100)=>new Promise(r=>setTimeout(r,ms));
const until=async expr=>{for(let i=0;i<180;i++){if(await ev(expr))return;await wait()}throw Error('Timed out '+expr)};
const assert=(x,m)=>{if(!x)throw Error(m)};
const shot=async name=>{const s=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(out+name+'.png',Buffer.from(s.data,'base64'))};
const point=sel=>ev(`(()=>{const r=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
const click=async sel=>{const p=await point(sel);await call('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',clickCount:1});await call('Input.dispatchMouseEvent',{type:'mouseReleased',...p,button:'left',clickCount:1})};
const results=[];await call('Page.enable');
for(const width of [1440,800])for(const persona of ['designer','dev']){
 const height=width===1440?900:600;
 await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:'http://127.0.0.1:8796/'});await until('!!document.querySelector(".poweroff-btn")');
 assert(await ev('!document.querySelector(".poweroff a")'),'poweroff prompt');
 await shot(`poweroff-${width}-${persona}`);
 await click('.poweroff-btn');
 await until('!document.querySelector(".boot")');
 assert(await ev('!!document.querySelector(".loginscreen-users") && !document.querySelector(".loginscreen-content a")'),'login prompt');
 await shot(`login-${width}-${persona}`);
 await click(`.loginscreen-user:nth-child(${persona==='designer'?1:2})`);
 await until('!document.querySelector(".loginscreen-root")');
 const data=await ev(`(()=>{const a=document.querySelector('a.dicon-link');const r=a?.getBoundingClientRect();return {label:a?.textContent,href:a?.getAttribute('href'),target:a?.target,rel:a?.rel,aria:a?.getAttribute('aria-label'),prompts:document.querySelectorAll('.product-portfolio-link,.welcome-widget a').length,visible:!!r&&r.x>=0&&r.y>=28&&r.bottom<innerHeight-76,icons:[...document.querySelectorAll('.dicon-label')].map(e=>e.textContent),overflow:document.documentElement.scrollWidth>innerWidth}})()`);
 assert(data.href==='/product-design/'&&data.target==='_blank'&&data.rel==='noopener'&&data.visible&&!data.prompts&&!data.overflow,JSON.stringify(data));
 await shot(`desktop-${width}-${persona}`);
 let before=await call('Target.getTargets');const ids=new Set(before.targetInfos.map(t=>t.targetId));
 if(persona==='dev'){
 await ev(`document.querySelector('a.dicon-link').focus()`);
 assert(await ev(`document.activeElement===document.querySelector('a.dicon-link')`),'focus');
 await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
 }else await click('a.dicon-link');
 await wait(1200);
 const popup=(await call('Target.getTargets')).targetInfos.find(t=>!ids.has(t.targetId)&&t.type==='page');
 assert(popup?.url==='http://127.0.0.1:8796/product-design/','popup '+JSON.stringify(popup));
 assert(await ev(`location.pathname==='/' && !document.querySelector('.loginscreen-root')`),'source preserved');
 const ptabs=await(await fetch('http://127.0.0.1:9296/json')).json();const pw=new WebSocket(ptabs.find(t=>t.id===popup.targetId).webSocketDebuggerUrl);await new Promise(r=>pw.onopen=r);
 const check=new Promise(resolve=>pw.onmessage=e=>resolve(JSON.parse(e.data)));
 pw.send(JSON.stringify({id:1,method:'Runtime.evaluate',params:{expression:'window.opener===null',returnByValue:true}}));assert((await check).result.result.value,'opener not null');pw.close();
 await call('Target.closeTarget',{targetId:popup.targetId});
 // A drag repositions the icon without opening another tab.
 const p=await point('a.dicon-link');
 await call('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',clickCount:1});
 await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:p.x-110,y:p.y+15,button:'left',buttons:1});
 await wait(100);
 await call('Input.dispatchMouseEvent',{type:'mouseReleased',x:p.x-110,y:p.y+15,button:'left',clickCount:1});
 await wait(200);
 assert(!(await call('Target.getTargets')).targetInfos.some(t=>t.type==='page'&&!ids.has(t.targetId)),'drag opened popup');
 console.log('Passed desktop',width,persona);results.push({width,height,persona,...data,activation:persona==='dev'?'Enter':'mouse',popup:popup.url,openerNull:true,dragNoPopup:true});
 await ev('localStorage.clear()');
}
await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await call('Page.navigate',{url:'http://127.0.0.1:8796/'});await until('!!document.querySelector(".mobile-notice")');
assert(await ev(`!document.querySelector('a[href="/product-design/"]') && !document.querySelector('.product-portfolio-link')`),'mobile prompt');await shot('mobile-390');
results.push({width:390,entry:'MobileNotice',noPrompt:true,desktopNotMounted:true});
for(const route of ['/product-design/','/product-design/work/fastgovbid/']){
await call('Page.navigate',{url:'http://127.0.0.1:8796'+route});await until('!!document.querySelector("main")');
const cv=await ev(`[...document.querySelectorAll('a,button')].filter(e=>/resume|résumé|\\.pdf/i.test(e.textContent+' '+(e.getAttribute('href')||''))).length`);assert(cv===0,'Resume regression');results.push({route,resumeControls:cv});}
fs.writeFileSync(out+'browser-results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));ws.close();
