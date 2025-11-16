// Mobile menu toggle, smooth-scrolling and contact form behavior
(function(){
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if(toggle && navLinks){
      toggle.addEventListener('click', () => {
        const visible = navLinks.style.display === 'flex';
        navLinks.style.display = visible ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0.08))';
        navLinks.style.padding = '12px';
        toggle.setAttribute('aria-expanded', String(!visible));
      });
      // Close menu on link click (mobile)
      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          if(window.innerWidth <= 900) navLinks.style.display = 'none';
        });
      });
    }
  
    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(!href || href === '#') return;
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          const yOffset = -80; // account for fixed header
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
        }
      });
    });
  
    // Contact form: open mail client with subject/body then show UI feedback
    const form = document.getElementById('contactForm');
    const sent = document.getElementById('sentMsg');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        const msgEl = document.getElementById('msg');
        const message = msgEl.value.trim();
        if(!message){
          alert('Please write a short message.');
          return;
        }
        const subject = encodeURIComponent('Portfolio enquiry from website');
        const body = encodeURIComponent(message + '\n\n--\nSent from portfolio site');
        // use mailto to open user's mail client
        window.location.href = `mailto:lingesh26@gmail.com?subject=${subject}&body=${body}`;
        // show success feedback briefly
        if(sent){
          sent.classList.remove('hidden');
          setTimeout(() => {
            sent.classList.add('hidden');
            form.reset();
          }, 3500);
        }
      });
    }
  })();
  