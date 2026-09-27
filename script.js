const observer=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}}));

const menuToggle=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('.mobile-menu');
if(menuToggle&&mobileMenu){
  menuToggle.addEventListener('click',()=>{
    const open=mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('open',open);
    menuToggle.setAttribute('aria-expanded',String(open));
  });
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded','false');
  }));
}
