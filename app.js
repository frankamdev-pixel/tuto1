
    // small helpers & state
    document.getElementById('yr').textContent = new Date().getFullYear();

    // burger menu simple
    const burger = document.getElementById('burger');
    burger?.addEventListener('click', ()=> {
      const nav = document.querySelector('nav');
      if(!nav) return;
      if(nav.style.display === 'flex'){nav.style.display='none'; burger.textContent='☰';}
      else {nav.style.display='flex'; burger.textContent='✕'; nav.style.flexDirection='column'; nav.style.background='linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))'; nav.style.padding='12px'; nav.style.borderRadius='12px';}
    });

    // intersection observer reveal
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting) e.target.classList.add('reveal');
      });
    }, {threshold:0.12});
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

    // contact demo handler
    function handleContact(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      const status = document.getElementById('formStatus');
      if(!name||!email||!subject||!message){ status.textContent='Veuillez remplir tout le formulaire.'; return; }
      status.textContent = 'Merci — message simulé envoyé ✔️';
      e.target.reset();
      setTimeout(()=> status.textContent='Pas d\'envoi réel — demo locale', 4000);
    }

    // simple particle system (canvas)
    (function(){
      const canvas = document.getElementById('particles');
      if(!canvas) return;
      const ctx = canvas.getContext('2d');
      let w=canvas.width=innerWidth, h=canvas.height=innerHeight;
      window.addEventListener('resize', ()=>{ w=canvas.width=innerWidth; h=canvas.height=innerHeight; init(); });

      const config = {count: Math.min(120, Math.floor((w*h)/8000)), speed: 0.3, size: {min:1, max:2.6}};
      let particles=[];

      function rand(min,max){return Math.random()*(max-min)+min;}
      function init(){
        particles = [];
        for(let i=0;i<config.count;i++){
          particles.push({
            x: Math.random()*w,
            y: Math.random()*h,
            vx: rand(-config.speed, config.speed),
            vy: rand(-config.speed, config.speed),
            r: rand(config.size.min, config.size.max),
            hue: rand(180,260),
            alpha: rand(0.06,0.18)
          });
        }
      }

      function step(){
        ctx.clearRect(0,0,w,h);
        for(let p of particles){
          p.x += p.vx;
          p.y += p.vy;
          if(p.x < -10) p.x = w + 10;
          if(p.x > w + 10) p.x = -10;
          if(p.y < -10) p.y = h + 10;
          if(p.y > h + 10) p.y = -10;
          ctx.beginPath();
          const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);
          g.addColorStop(0, `hsla(${p.hue},90%,60%,${p.alpha})`);
          g.addColorStop(1, `rgba(7,10,15,0)`);
          ctx.fillStyle=g;
          ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
          ctx.fill();
        }
        requestAnimationFrame(step);
      }

      init(); step();
    })();

    // subtle parallax on mouse for card-right
    (function(){
      const card = document.querySelector('.card-right-inner');
      if(!card) return;
      document.addEventListener('mousemove', (e)=>{
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width/2;
        const cy = rect.top + rect.height/2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        card.style.transform = `translate3d(${dx*6}px,${dy*6}px,0)`;
      });
      document.addEventListener('mouseleave', ()=> card.style.transform = '');
    })();
  