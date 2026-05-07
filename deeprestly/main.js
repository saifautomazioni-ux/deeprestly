(function () {
  'use strict';

  // ---------- 1. NAVBAR scroll state ----------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('nav-blur');
    else nav.classList.remove('nav-blur');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- 2. Reveal on scroll (Intersection Observer) ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // ---------- 3. FAQ accordion (one open at a time) ----------
  const faqs = document.querySelectorAll('details.faq');
  faqs.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        faqs.forEach(other => { if (other !== d) other.open = false; });
      }
    });
  });

  // ---------- 6. Smooth scroll for in-page anchors (with sticky nav offset) ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = nav.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH + 4;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------- 7. Light "drag-to-scroll" on testimonials track for desktop fallback ----------
  const track = document.getElementById('reviews-track');
  if (track && window.matchMedia('(max-width: 1023px)').matches) {
    let isDown = false, startX = 0, scrollLeft = 0;
    track.addEventListener('pointerdown', (e) => {
      isDown = true;
      track.setPointerCapture(e.pointerId);
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX);
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev =>
      track.addEventListener(ev, () => { isDown = false; })
    );
  }

  // ---------- 8. Hero carousel (prev/next arrows, with wraparound) ----------
  const heroCarousel = document.getElementById('hero-carousel');
  const heroPrev = document.getElementById('hero-prev');
  const heroNext = document.getElementById('hero-next');
  if (heroCarousel && heroPrev && heroNext) {
    const goTo = (dir) => {
      const w = heroCarousel.clientWidth;
      const total = heroCarousel.children.length;
      const current = Math.round(heroCarousel.scrollLeft / w);
      let next = current + dir;
      if (next < 0) next = total - 1;
      if (next >= total) next = 0;
      const slide = heroCarousel.children[next];
      if (slide) heroCarousel.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    };
    heroPrev.addEventListener('click', () => goTo(-1));
    heroNext.addEventListener('click', () => goTo(1));
  }

  // ---------- 9. Quantity selector ----------
  const qtyVal = document.getElementById('qty-val');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  if (qtyVal && qtyMinus && qtyPlus) {
    let qty = 1;
    qtyMinus.addEventListener('click', () => { if (qty > 1) { qty--; qtyVal.textContent = qty; } });
    qtyPlus.addEventListener('click', () => { qty++; qtyVal.textContent = qty; });
  }

  // ---------- 10. Color pills ----------
  const colorPills = document.querySelectorAll('.color-pill');
  colorPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      colorPills.forEach((p) => {
        const active = p === pill;
        p.classList.toggle('border-accent', active);
        p.classList.toggle('bg-accent/10', active);
        p.classList.toggle('text-accent', active);
        p.classList.toggle('border-ink/15', !active);
        p.classList.toggle('bg-white', !active);
        p.classList.toggle('text-ink', !active);
      });
    });
  });


  // ---------- 11. Account modal + Cart drawer ----------

  let isLoggedIn = sessionStorage.getItem('dr_logged') === '1';

  function setLoggedIn(val) {
    isLoggedIn = val;
    sessionStorage.setItem('dr_logged', val ? '1' : '0');
  }

  // --- elementi ---
  const modalLogin    = document.getElementById('modal-login');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose    = document.getElementById('modal-close');
  const btnLogin      = document.getElementById('btn-login');
  const tabAccedi     = document.getElementById('tab-accedi');
  const tabRegistrati = document.getElementById('tab-registrati');
  const panelAccedi   = document.getElementById('panel-accedi');
  const panelReg      = document.getElementById('panel-registrati');
  const loginForm     = document.getElementById('login-form');
  const registerForm  = document.getElementById('register-form');
  const cartPanel     = document.getElementById('cart-panel');
  const cartBack      = document.getElementById('cart-backdrop');
  const cartClose     = document.getElementById('cart-close');
  const btnCart       = document.getElementById('btn-cart');
  const cartGuest     = document.getElementById('cart-guest');
  const cartLogged    = document.getElementById('cart-logged');
  const cartOpenLogin = document.getElementById('cart-open-login');
  const cartContinue  = document.getElementById('cart-continue');

  // --- Modal: usa style diretto, niente classList con Tailwind dinamico ---
  function openModal(tab) {
    if (!modalLogin) return;
    modalLogin.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    switchTab(tab === 'registrati' ? 'registrati' : 'accedi');
  }
  function closeModal() {
    if (!modalLogin) return;
    modalLogin.style.display = 'none';
    document.body.style.overflow = '';
  }
  function switchTab(tab) {
    var toLogin = tab === 'accedi';
    // tab buttons
    if (tabAccedi) {
      tabAccedi.style.color = toLogin ? '#1A1A1A' : 'rgba(26,26,26,0.35)';
      tabAccedi.style.borderBottomColor = toLogin ? '#1A1A1A' : 'transparent';
    }
    if (tabRegistrati) {
      tabRegistrati.style.color = toLogin ? 'rgba(26,26,26,0.35)' : '#1A1A1A';
      tabRegistrati.style.borderBottomColor = toLogin ? 'transparent' : '#1A1A1A';
    }
    // panels
    if (panelAccedi) panelAccedi.style.display = toLogin ? 'block' : 'none';
    if (panelReg)    panelReg.style.display    = toLogin ? 'none'  : 'block';
  }

  // --- Cart: usa style.transform e style.opacity ---
  function renderCart() {
    if (!cartGuest || !cartLogged) return;
    cartGuest.style.display  = isLoggedIn ? 'none'  : 'flex';
    cartLogged.style.display = isLoggedIn ? 'flex'  : 'none';
  }
  function openCart() {
    if (!cartPanel || !cartBack) return;
    renderCart();
    cartBack.style.display = 'block';
    requestAnimationFrame(function() {
      cartBack.style.opacity  = '1';
      cartPanel.style.transform = 'translateX(0)';
    });
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    if (!cartPanel || !cartBack) return;
    cartBack.style.opacity    = '0';
    cartPanel.style.transform = 'translateX(100%)';
    setTimeout(function() { cartBack.style.display = 'none'; }, 300);
    document.body.style.overflow = '';
  }

  // --- event listeners ---
  if (btnLogin)      btnLogin.addEventListener('click', function() { openModal('accedi'); });
  if (modalClose)    modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (tabAccedi)     tabAccedi.addEventListener('click', function() { switchTab('accedi'); });
  if (tabRegistrati) tabRegistrati.addEventListener('click', function() { switchTab('registrati'); });
  if (loginForm)     loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); setLoggedIn(true); closeModal(); renderCart();
  });
  if (registerForm)  registerForm.addEventListener('submit', function(e) {
    e.preventDefault(); setLoggedIn(true); closeModal(); renderCart();
  });
  if (btnCart)       btnCart.addEventListener('click', openCart);
  if (cartClose)     cartClose.addEventListener('click', closeCart);
  if (cartBack)      cartBack.addEventListener('click', closeCart);
  if (cartOpenLogin) cartOpenLogin.addEventListener('click', function() { closeCart(); openModal('accedi'); });
  if (cartContinue)  cartContinue.addEventListener('click', closeCart);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeModal(); closeCart(); }
  });

  // inizializza: il modal parte nascosto via style inline
  if (modalLogin) modalLogin.style.display = 'none';
  // cart panel: imposta transform iniziale via style (sovrascrive classe Tailwind)
  if (cartPanel) cartPanel.style.transform = 'translateX(100%)';
  if (cartBack)  { cartBack.style.opacity = '0'; cartBack.style.display = 'none'; }

  // ---------- 12. Contact form ----------
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      contactSuccess.classList.remove('hidden');
    });
  }

})();
