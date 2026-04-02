/* ============================================================
   LUMIÈRE v2 — main.js
   Features: Loader · Cursor · Gallery · Zoom Modal · Cart Drawer
             Wishlist · Variants · Qty · Sticky Bar · Scroll Reveal
             Social Proof · Helpful Votes · Back to Top · 3D Tilt
   ============================================================ */

(function () {
  'use strict';

  // ── PRODUCT DATA ───────────────────────────────────────────
  const SKIN_DESCRIPTIONS = {
    all:       'A potent fusion of Vitamin C, Bakuchiol, and rare Orchid Extract. Visibly reduces dark spots in 14 days while restoring luminosity to stressed, dull skin. Dermatologist-tested. Fragrance-free.',
    sensitive: 'Specially formulated for reactive skin. Our Bakuchiol-first formula delivers retinol-like results without redness or irritation. Tested by dermatologists on the most sensitive skin types. No fragrance, no essential oils.',
    oily:      'Lightweight, fast-absorbing formula that regulates sebum while delivering Vitamin C brightening. Won\'t clog pores. Mattifies without dehydrating. Perfect for oily, combination, and acne-prone skin types.'
  };

  const PRODUCT = {
    name:    'Radiant Youth Complex',
    img:     'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=85',
    sizes: {
      '30ml': { price: 89,  old: 112 },
      '50ml': { price: 129, old: 160 }
    }
  };

  // ── STATE ──────────────────────────────────────────────────
  let qty          = 1;
  let currentSize  = '30ml';
  let currentPrice = 89;
  let wishlisted   = JSON.parse(localStorage.getItem('lumiere_wish') || 'false');
  let cart         = JSON.parse(localStorage.getItem('lumiere_cart_v2') || '[]');
  let toastTimer;

  // ── DOM REFS ───────────────────────────────────────────────
  const $ = id => document.getElementById(id);
  const loader       = $('pageLoader');
  const cursor       = $('cursor');
  const cursorDot    = $('cursorDot');
  const nav          = $('nav');
  const navCartBtn   = $('navCartBtn');
  const navWishlist  = $('navWishlist');
  const cartCount    = $('cartCount');
  const cartDrawer   = $('cartDrawer');
  const cartOverlay  = $('cartOverlay');
  const cartClose    = $('cartClose');
  const cartBody     = $('cartBody');
  const cartEmpty    = $('cartEmpty');
  const cartItems    = $('cartItems');
  const cartFooter   = $('cartFooter');
  const cartSubtotal = $('cartSubtotal');
  const cartContinue = $('cartContinue');
  const mainImage    = $('mainImage');
  const galleryMain  = $('galleryMain');
  const zoomBtn      = $('zoomBtn');
  const zoomModal    = $('zoomModal');
  const zoomClose    = $('zoomClose');
  const zoomImg      = $('zoomImg');
  const qtyMinus     = $('qtyMinus');
  const qtyPlus      = $('qtyPlus');
  const qtyVal       = $('qtyVal');
  const addToCart    = $('addToCart');
  const stickyAddToCart = $('stickyAddToCart');
  const stickyBar    = $('stickyBar');
  const stickySize   = $('stickySize');
  const wishlistBtn  = $('wishlistBtn');
  const toast        = $('toast');
  const backToTop    = $('backToTop');
  const productTop   = $('productTop');
  const currentPriceEl = $('currentPrice');
  const ctaPrice     = $('ctaPrice');
  const productDesc  = $('productDesc');
  const viewerCount  = $('viewerCount');
  const thumbBtns    = document.querySelectorAll('.gallery__thumb');

  // ── INIT ───────────────────────────────────────────────────
  function init() {
    initLoader();
    initCursor();
    initGallery();
    initTilt();
    initZoom();
    initQty();
    initVariants();
    initCart();
    initWishlist();
    initStickyBar();
    initScrollReveal();
    initSocialProof();
    initHelpfulVotes();
    initBackToTop();
    initNav();
    syncWishlistUI();
    renderCart();
  }

  // ── PAGE LOADER ────────────────────────────────────────────
  function initLoader() {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 800);
    });
    // Fallback
    setTimeout(() => loader.classList.add('hidden'), 2200);
  }

  // ── CUSTOM CURSOR ──────────────────────────────────────────
  function initCursor() {
    if (window.matchMedia('(max-width: 960px)').matches) return;

    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursorDot.style.left = mx + 'px';
      cursorDot.style.top  = my + 'px';
    });

    // Lerp the outer ring for the trailing effect
    function animateCursor() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover states on interactive elements
    const hoverEls = document.querySelectorAll('a, button, .gallery__thumb, .variant');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-active'));
  }

  // ── GALLERY ────────────────────────────────────────────────
  function initGallery() {
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.dataset.src;
        const alt = btn.dataset.alt;

        thumbBtns.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');

        mainImage.style.opacity = '0';
        setTimeout(() => {
          mainImage.src = src;
          mainImage.alt = alt;
          mainImage.style.opacity = '1';
        }, 200);
      });
    });
  }

  // ── 3D TILT (WOW FACTOR) ───────────────────────────────────
  function initTilt() {
    if (!galleryMain || window.matchMedia('(max-width: 960px)').matches) return;

    const gloss = document.createElement('div');
    gloss.style.cssText = `
      position:absolute;inset:0;border-radius:inherit;
      pointer-events:none;z-index:2;opacity:0;
      transition:opacity .3s ease;
      background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.16) 0%,transparent 65%);
    `;
    galleryMain.appendChild(gloss);

    galleryMain.addEventListener('mousemove', e => {
      const r = galleryMain.getBoundingClientRect();
      const x = (e.clientX - r.left)  / r.width;
      const y = (e.clientY - r.top)   / r.height;
      const rx = (y - .5) * -13;
      const ry = (x - .5) *  13;

      galleryMain.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
      galleryMain.style.transition = 'transform .08s ease';
      gloss.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%,rgba(255,255,255,.2) 0%,transparent 60%)`;
      gloss.style.opacity = '1';
    });

    galleryMain.addEventListener('mouseleave', () => {
      galleryMain.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      galleryMain.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1)';
      gloss.style.opacity = '0';
    });
  }

  // ── ZOOM MODAL ─────────────────────────────────────────────
  function initZoom() {
    function openZoom() {
      zoomImg.src = mainImage.src;
      zoomImg.alt = mainImage.alt;
      zoomModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeZoom() {
      zoomModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    zoomBtn.addEventListener('click', openZoom);
    galleryMain.addEventListener('dblclick', openZoom);
    zoomClose.addEventListener('click', closeZoom);
    zoomModal.addEventListener('click', e => { if (e.target === zoomModal) closeZoom(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeZoom(); });
  }

  // ── QTY ────────────────────────────────────────────────────
  function initQty() {
    qtyMinus.addEventListener('click', () => {
      if (qty > 1) { qty--; qtyVal.textContent = qty; pop(qtyVal); }
    });
    qtyPlus.addEventListener('click', () => {
      if (qty < 10) { qty++; qtyVal.textContent = qty; pop(qtyVal); }
    });
  }

  // ── VARIANTS ───────────────────────────────────────────────
  function initVariants() {
    // Size
    document.querySelectorAll('[data-group="size"] .variant').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-group="size"] .variant').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSize  = btn.dataset.size;
        currentPrice = PRODUCT.sizes[currentSize].price;
        const oldP   = PRODUCT.sizes[currentSize].old;
        const save   = Math.round((1 - currentPrice / oldP) * 100);

        currentPriceEl.textContent = `£${currentPrice}.00`;
        $('oldPrice').textContent   = `£${oldP}.00`;
        $('saveLabel').textContent  = `Save ${save}%`;
        ctaPrice.textContent        = `£${currentPrice}.00`;
        stickySize.textContent      = `${currentSize} · £${currentPrice}.00`;
        pop(currentPriceEl);
      });
    });

    // Skin type — updates description
    document.querySelectorAll('[data-group="skin"] .variant').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-group="skin"] .variant').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.dataset.skin;
        productDesc.style.opacity = '0';
        setTimeout(() => {
          productDesc.textContent = SKIN_DESCRIPTIONS[key];
          productDesc.style.opacity = '1';
        }, 200);
      });
    });
  }

  // ── CART ───────────────────────────────────────────────────
  function initCart() {
    // Open / close
    navCartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    cartContinue.addEventListener('click', closeCart);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

    // Add to cart triggers
    addToCart.addEventListener('click', handleAdd);
    stickyAddToCart.addEventListener('click', handleAdd);
  }

  function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function handleAdd() {
    const existing = cart.find(i => i.size === currentSize);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        size:  currentSize,
        price: currentPrice,
        qty:   qty
      });
    }
    saveCart();
    renderCart();
    showToast(`✓  ${qty} item${qty > 1 ? 's' : ''} added to cart`);
    pop(cartCount);
  }

  function renderCart() {
    const total     = cart.reduce((s, i) => s + i.qty, 0);
    const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const hasItems  = cart.length > 0;

    // Badge
    cartCount.textContent = total;
    cartCount.classList.toggle('visible', total > 0);

    // Empty / items toggle
    cartEmpty.style.display  = hasItems ? 'none'  : 'block';
    cartItems.style.display  = hasItems ? 'flex'  : 'none';
    cartFooter.style.display = hasItems ? 'flex'  : 'none';

    // Subtotal
    cartSubtotal.textContent = `£${subtotal.toFixed(2)}`;

    // Render items
    cartItems.innerHTML = '';
    cart.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <img class="cart-item__img" src="${PRODUCT.img}" alt="${PRODUCT.name}" loading="lazy"/>
        <div class="cart-item__info">
          <p class="cart-item__name">${PRODUCT.name}</p>
          <p class="cart-item__size">${item.size} · Brightening Serum</p>
          <div class="cart-item__bottom">
            <span class="cart-item__price">£${(item.price * item.qty).toFixed(2)}</span>
            <div class="cart-item__controls">
              <button class="cart-item__qty-btn" data-action="dec" data-idx="${idx}" aria-label="Decrease">−</button>
              <span class="cart-item__qty">${item.qty}</span>
              <button class="cart-item__qty-btn" data-action="inc" data-idx="${idx}" aria-label="Increase">+</button>
            </div>
          </div>
          <button class="cart-item__remove" data-idx="${idx}">Remove</button>
        </div>
      `;
      cartItems.appendChild(el);
    });

    // Delegate events on cart items
    cartItems.querySelectorAll('.cart-item__qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i   = parseInt(btn.dataset.idx);
        const act = btn.dataset.action;
        if (act === 'inc') cart[i].qty++;
        if (act === 'dec') {
          cart[i].qty--;
          if (cart[i].qty <= 0) cart.splice(i, 1);
        }
        saveCart();
        renderCart();
      });
    });

    cartItems.querySelectorAll('.cart-item__remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.idx);
        cart.splice(i, 1);
        saveCart();
        renderCart();
        showToast('Item removed from cart');
      });
    });
  }

  function saveCart() {
    localStorage.setItem('lumiere_cart_v2', JSON.stringify(cart));
  }

  // ── WISHLIST ───────────────────────────────────────────────
  function initWishlist() {
    wishlistBtn.addEventListener('click', toggleWishlist);
    navWishlist.addEventListener('click', toggleWishlist);
  }

  function toggleWishlist() {
    wishlisted = !wishlisted;
    localStorage.setItem('lumiere_wish', JSON.stringify(wishlisted));
    syncWishlistUI();
    showToast(wishlisted ? '♡  Saved to wishlist' : 'Removed from wishlist');
  }

  function syncWishlistUI() {
    wishlistBtn.classList.toggle('active', wishlisted);
    wishlistBtn.setAttribute('aria-pressed', wishlisted);
    navWishlist.classList.toggle('active', wishlisted);
  }

  // ── STICKY BAR ─────────────────────────────────────────────
  function initStickyBar() {
    if (!productTop) return;
    const obs = new IntersectionObserver(([e]) => {
      stickyBar.classList.toggle('visible', !e.isIntersecting);
      stickyBar.setAttribute('aria-hidden', e.isIntersecting ? 'true' : 'false');
    }, { threshold: .1 });
    obs.observe(productTop);
  }

  // ── SCROLL REVEAL (Ingredients + Reviews) ──────────────────
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay based on element index within its parent
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 90}ms`;
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => obs.observe(el));
  }

  // ── SOCIAL PROOF COUNTER ───────────────────────────────────
  function initSocialProof() {
    if (!viewerCount) return;
    let count = 9 + Math.floor(Math.random() * 8);
    viewerCount.textContent = count;

    setInterval(() => {
      const delta = Math.random() < .5 ? 1 : -1;
      count = Math.max(6, Math.min(24, count + delta));
      viewerCount.textContent = count;
    }, 4500);
  }

  // ── HELPFUL VOTES ──────────────────────────────────────────
  function initHelpfulVotes() {
    document.querySelectorAll('.helpful-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.review-card__helpful');
        if (card.dataset.voted) return; // one vote per card
        card.dataset.voted = '1';
        btn.classList.add('voted');
        const type = btn.dataset.type;
        // Increment count in label
        const match = btn.textContent.match(/\((\d+)\)/);
        if (match) {
          const n = parseInt(match[1]) + 1;
          btn.textContent = btn.textContent.replace(`(${match[1]})`, `(${n})`);
        }
        showToast(type === 'yes' ? 'Thanks for your feedback!' : 'Thanks for letting us know.');
      });
    });
  }

  // ── BACK TO TOP ────────────────────────────────────────────
  function initBackToTop() {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── NAV ────────────────────────────────────────────────────
  function initNav() {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ── INGREDIENT CARD ACCENT COLOURS ────────────────────────
  function initIngredientAccents() {
    document.querySelectorAll('.ingredient-card[data-accent]').forEach(card => {
      card.style.setProperty('--accent', card.dataset.accent);
    });
  }

  // ── TOAST ──────────────────────────────────────────────────
  function showToast(msg) {
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  // ── UTILS ──────────────────────────────────────────────────
  function pop(el) {
    el.style.transform = 'scale(1.22)';
    el.style.transition = 'transform .15s ease';
    setTimeout(() => { el.style.transform = 'scale(1)'; }, 150);
  }

  // ── RUN ────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init(); initIngredientAccents(); });
  } else {
    init();
    initIngredientAccents();
  }

})();