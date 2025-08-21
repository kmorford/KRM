(function(){
  const canvas = document.getElementById('matrix');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha:false });
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w,h,cols,drops,fontSize,last=0;
  // Numbers + symbols for hacker vibe
  const chars = "0123456789#$%&@";

  function resize(){
    const dpr = Math.max(1, Math.min(window.devicePixelRatio||1, 2));
    w = canvas.clientWidth = innerWidth;
    h = canvas.clientHeight = innerHeight;
    canvas.width = Math.floor(w*dpr);
    canvas.height = Math.floor(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    fontSize = Math.max(14, Math.floor(Math.min(w,h)/50));
    ctx.font = `${fontSize}px "Courier New", monospace`;
    cols = Math.floor(w/fontSize);
    drops = new Array(cols).fill(0).map(()=>Math.floor(Math.random()*-50));
  }
  function draw(ts){
    if (ts-last<16){ requestAnimationFrame(draw); return; }
    last=ts;
    ctx.fillStyle='rgba(11,11,11,.08)'; ctx.fillRect(0,0,w,h);
    ctx.shadowColor='#00ff99'; ctx.fillStyle='#00ff99';
    for(let i=0;i<cols;i++){
      const x=i*fontSize, y=drops[i]*fontSize;
      ctx.shadowBlur=8;
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)], x,y);
      ctx.shadowBlur=0;
      if(y>h && Math.random()>0.975) drops[i]=Math.floor(-Math.random()*30);
      else drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  function start(){
    resize();
    ctx.fillStyle='#0b0b0b'; ctx.fillRect(0,0,w,h);
    if(!prefersReduced) requestAnimationFrame(draw);
  }
  addEventListener('resize', resize, {passive:true});
  document.addEventListener('visibilitychange', ()=>{
    if(document.visibilityState==='visible'){
      ctx.fillStyle='#0b0b0b'; ctx.fillRect(0,0,w,h);
    }
  });
  start();
})();
