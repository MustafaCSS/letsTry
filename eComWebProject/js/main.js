document.addEventListener('DOMContentLoaded', () => {
  // Initialize Swiper slider
  if (document.querySelector('.swiper')) {
    const swiper = new Swiper('.swiper', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  const products = [
    { id: 1, name: 'هاتف', price: 2500, image: 'images/smartPhone.avif', category: 'electronics' },
    { id: 2, name: 'لابتوب', price: 4500, image: 'images/laptop.avif', category: 'electronics' },
    { id: 3, name: 'قميص رياضي', price: 150, image: 'images/tShirt.avif', category: 'clothes' },
    { id: 4, name: 'ساعة', price: 800, image: 'images/watch.avif', category: 'electronics' },
    { id: 5, name: 'قهوة', price: 600, image: 'images/coffe.avif', category: 'home' },
    { id: 6, name: 'حذاء رياضي', price: 350, image: 'images/shoes.avif', category: 'clothes' }
  ];

  let cart = [];

  const elements = {
    productsContainer: document.getElementById('products-container'),
    cartItems: document.getElementById('cart-items'),
    cartCount: document.querySelector('.cart-count'),
    cartTotal: document.getElementById('cart-total'),
    cartOverlay: document.getElementById('cart-overlay'),
    categories: document.querySelectorAll('.category'),
    sections: document.querySelectorAll('.section'),
    stats: document.querySelectorAll('.about-page .number')
  };

  function displayProducts(category = 'all') {
    if (!elements.productsContainer) return;
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    elements.productsContainer.innerHTML = filtered.map(product => `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">${product.price} جنيه</p>
          <button class="add-to-cart" data-id="${product.id}">
            <i class="fas fa-cart-plus"></i> إضافة للسلة
          </button>
        </div>
      </div>
    `).join('');
  }

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });
    updateCart();
  }

  function updateCart() {
    if (!elements.cartItems) return;
    elements.cartItems.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <p class="cart-item-price">${item.price} جنيه</p>
          <div class="cart-item-actions">
            <button class="quantity-btn" data-index="${i}" data-action="decrease">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${i}">
            <button class="quantity-btn" data-index="${i}" data-action="increase">+</button>
            <span class="remove-item" data-index="${i}"><i class="fas fa-trash"></i></span>
          </div>
        </div>
      </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (elements.cartCount) elements.cartCount.textContent = count;
    if (elements.cartTotal) elements.cartTotal.textContent = `${total} جنيه`;
  }

  function updateQuantity(index, newQty) {
    const qty = parseInt(newQty, 10);
    if (qty < 1) removeFromCart(index);
    else {
      cart[index].quantity = qty;
      updateCart();
    }
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  function showCart() {
    if (elements.cartOverlay) elements.cartOverlay.style.display = 'flex';
  }

  function closeCart() {
    if (elements.cartOverlay) elements.cartOverlay.style.display = 'none';
  }

  function checkout() {
    if (!cart.length) {
      alert('سلة التسوق فارغة');
    } else {
      alert('تم إرسال الطلب بنجاح');
      cart = [];
      updateCart();
    }
  }

  if (elements.productsContainer) {
    displayProducts();
    elements.productsContainer.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart')) {
        const id = parseInt(e.target.closest('.add-to-cart').dataset.id);
        addToCart(id);
      }
    });
  }

  if (elements.cartItems) {
    elements.cartItems.addEventListener('click', (e) => {
      const index = parseInt(e.target.closest('[data-index]')?.dataset.index);
      if (e.target.closest('[data-action="increase"]')) updateQuantity(index, cart[index].quantity + 1);
      if (e.target.closest('[data-action="decrease"]')) updateQuantity(index, cart[index].quantity - 1);
      if (e.target.closest('.remove-item')) removeFromCart(index);
    });

    elements.cartItems.addEventListener('change', (e) => {
      if (e.target.classList.contains('quantity-input')) {
        const index = parseInt(e.target.dataset.index);
        const value = e.target.value;
        updateQuantity(index, value);
      }
    });
  }

  elements.categories.forEach(cat => {
    cat.addEventListener('click', () => {
      elements.categories.forEach(c => c.classList.remove('active'));
      cat.classList.add('active');
      displayProducts(cat.dataset.category);
    });
  });

  window.addToCart = addToCart;
  window.updateQuantity = updateQuantity;
  window.removeFromCart = removeFromCart;
  window.showCart = showCart;
  window.closeCart = closeCart;
  window.checkout = checkout;

  function reveal() {
    const trigger = window.innerHeight * 0.8;
    elements.sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top < trigger) sec.classList.add('visible');
    });
  }

  window.addEventListener('scroll', reveal);
  reveal();

  function animateStats() {
    elements.stats.forEach(el => {
      const end = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.ceil(end / 50);
      const timer = setInterval(() => {
        current += step;
        if (current >= end) {
          el.textContent = end;
          clearInterval(timer);
        } else {
          el.textContent = current;
        }
      }, 50);
    });
  }
  animateStats();
});