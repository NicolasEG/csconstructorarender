(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches||!('IntersectionObserver' in window))return;
  const groups=['.intro > div','.principles > div','.section-title > *','.cards > .card','.steps > .step','.service-row > *','.faq > *','.contact-info > *','.contact-form','.cta > *','.footer-top > div','.footer-bottom > *','.parallax > div'];
  const elements=[...new Set(groups.flatMap(selector=>[...document.querySelectorAll(selector)]))];
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('revealed');observer.unobserve(entry.target);});},{threshold:.08,rootMargin:'0px 0px -35px 0px'});
  elements.forEach(el=>{el.classList.add('scroll-reveal');const siblings=[...el.parentElement.children];el.style.setProperty('--reveal-delay',`${Math.min(siblings.indexOf(el),3)*70}ms`);if(el.parentElement.matches('.service-row'))el.classList.add(el.matches('img')?'reveal-image':'reveal-copy');observer.observe(el);});
  const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
  const cover=document.querySelector('.hero > .cover');let scheduled=false;
  const update=()=>{const total=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${total>0?scrollY/total:0})`;if(cover&&scrollY<innerHeight*1.3)cover.style.transform=`translateY(${Math.min(scrollY*.15,120)}px) scale(1.08)`;scheduled=false;};
  const onScroll=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}};
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);update();
  reduced.addEventListener('change',event=>{if(event.matches){observer.disconnect();elements.forEach(el=>el.classList.add('revealed'));progress.remove();if(cover)cover.style.transform='none';removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);}});
})();
