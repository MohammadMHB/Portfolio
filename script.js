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


// Project details modal
document.querySelectorAll('.project').forEach(project=>{
  const info=project.querySelector('.project-info');
  if(!info)return;
  const title=info.querySelector('h3');
  const desc=info.querySelector('p');
  if(!title||!desc)return;
  const actions=info.querySelector('.project-link,.private-note');
  const btn=document.createElement('button');
  btn.className='project-details-btn';
  btn.type='button';
  btn.textContent='Details ↗';
  if(actions) actions.insertAdjacentElement('afterend',btn); else info.appendChild(btn);
  btn.addEventListener('click',()=>{
    const modal=document.getElementById('project-modal');
    document.getElementById('modal-title').textContent=title.textContent;
    document.getElementById('modal-description').textContent=desc.textContent;
    const chips=document.getElementById('modal-chips');
    chips.innerHTML='';
    info.querySelectorAll('.chips span').forEach(chip=>{
      const el=document.createElement('span');
      el.textContent=chip.textContent;
      chips.appendChild(el);
    });
    const link=document.getElementById('modal-link');
    link.innerHTML='';
    const href=info.querySelector('.project-link');
    if(href){
      const a=document.createElement('a');
      a.href=href.href;a.target='_blank';a.rel='noreferrer';a.className='project-link';a.textContent=href.textContent;
      link.appendChild(a);
    }else{
      const note=info.querySelector('.private-note');
      if(note){const s=document.createElement('span');s.className='private-note';s.textContent=note.textContent;link.appendChild(s);}
    }
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  });
});
document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',()=>{
  const modal=document.getElementById('project-modal');
  if(modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
}));
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    const modal=document.getElementById('project-modal');
    if(modal?.classList.contains('open')){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  }
});

// Project brief helper
const projectForm=document.getElementById('project-form');
if(projectForm){
  projectForm.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(projectForm);
    const brief='Project inquiry\n\nName: '+data.get('name')+'\nProject type: '+data.get('project')+'\n\nMessage:\n'+data.get('message');
    navigator.clipboard?.writeText(brief);
    alert('Your project brief has been copied. You can paste it into LinkedIn and send it.');
    window.open('https://ir.linkedin.com/in/mohammad-mohebianfar-32852b229','_blank','noopener,noreferrer');
  });
}
