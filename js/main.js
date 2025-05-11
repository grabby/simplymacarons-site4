/**
 * Simply Macarons Static Site JavaScript
 */

// Flavors data
const flavors = [
  {
    id: 1,
    name: "Vanilla",
    description: "Classic vanilla macaron with smooth vanilla buttercream filling",
    imageUrl: "assets/vanilla.svg",
    price: 200, // $2.00
    available: true
  },
  {
    id: 2,
    name: "Chocolate",
    description: "Rich chocolate macaron with dark chocolate ganache",
    imageUrl: "assets/chocolate.svg",
    price: 200,
    available: true
  },
  {
    id: 3,
    name: "Salted Caramel",
    description: "Sweet and salty caramel macaron with decadent caramel filling",
    imageUrl: "assets/salted_caramel.svg",
    price: 200,
    available: true
  },
  {
    id: 4,
    name: "Raspberry",
    description: "Vibrant raspberry macaron with raspberry jam filling",
    imageUrl: "assets/raspberry.svg",
    price: 200,
    available: true
  },
  {
    id: 5,
    name: "Pistachio",
    description: "Nutty pistachio macaron with creamy pistachio buttercream",
    imageUrl: "assets/pistachio.svg",
    price: 200,
    available: true,
    tags: ["Top 5"]
  },
  {
    id: 6,
    name: "Lemon",
    description: "Tangy lemon macaron with zesty lemon curd filling",
    imageUrl: "assets/lemon.svg",
    price: 200,
    available: true,
    tags: ["Top 5"]
  },
  {
    id: 7,
    name: "Hazelnut Chocolate",
    description: "Hazelnut-infused macaron with chocolate hazelnut filling",
    imageUrl: "assets/chocolate.svg",
    price: 200,
    available: true
  },
  {
    id: 8,
    name: "Coffee",
    description: "Bold coffee macaron with espresso buttercream",
    imageUrl: "assets/image_1746926444734.png",
    price: 200,
    available: true
  },
  {
    id: 9,
    name: "Earl Grey",
    description: "Fragrant Earl Grey tea-infused macaron with vanilla filling",
    imageUrl: "assets/earlgrey.svg",
    price: 200,
    available: true,
    tags: ["Top 5"]
  },
  {
    id: 10,
    name: "Strawberry",
    description: "Sweet strawberry macaron with strawberry jam filling",
    imageUrl: "assets/raspberry.svg",
    price: 200,
    available: true
  },
  {
    id: 11,
    name: "Cookies & Cream",
    description: "Delicious cookies & cream macaron with creamy Oreo filling",
    imageUrl: "assets/image_1746925627751.png",
    price: 200,
    available: true,
    tags: ["Top 5"]
  },
  {
    id: 12,
    name: "Red Velvet",
    description: "Rich red velvet macaron with cream cheese filling",
    imageUrl: "assets/image_1746926444734.png",
    price: 200,
    available: true,
    tags: ["Top 5"]
  },
  {
    id: 13,
    name: "Matcha",
    description: "Japanese green tea macaron with matcha buttercream",
    imageUrl: "assets/pistachio.svg",
    price: 200,
    available: true
  },
  {
    id: 14,
    name: "Fuzzy Peach",
    description: "Sweet peach-flavored macaron with fuzzy peach filling",
    imageUrl: "assets/image_1746925627751.png",
    price: 200,
    available: true,
    tags: ["Kid Favourite"]
  },
  {
    id: 15,
    name: "Crème Brûlée",
    description: "Classic crème brûlée macaron with caramelized sugar top",
    imageUrl: "assets/cremebrulee.png",
    price: 200,
    available: true
  }
];

// Shopping cart class
class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.updateUI();
  }

  addItem(item) {
    // Check if the item already exists in the cart
    const existingItemIndex = this.items.findIndex(i => i.id === item.id);
    
    if (existingItemIndex !== -1) {
      // Update quantity if the item exists
      this.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      this.items.push(item);
    }
    
    this.saveCart();
    this.updateUI();
    this.showToast(`Added ${item.name} to cart`, 'success');
  }

  updateQuantity(id, quantity) {
    const index = this.items.findIndex(item => item.id === id);
    
    if (index !== -1) {
      if (quantity <= 0) {
        this.removeItem(id);
      } else {
        this.items[index].quantity = quantity;
        this.saveCart();
        this.updateUI();
      }
    }
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveCart();
    this.updateUI();
    this.showToast('Item removed from cart', 'info');
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateUI();
    this.showToast('Cart cleared', 'info');
    this.closeCart();
  }

  getTotalPrice() {
    const totalQuantity = this.getTotalItems();
    
    // Calculate the base price without discounts
    const baseTotal = this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    // Apply discount if order is 50 or more macarons
    if (totalQuantity >= 50) {
      // 10% discount: price * 0.9 (or multiply by 0.9)
      return Math.round(baseTotal * 0.9);
    }
    
    return baseTotal;
  }

  getTotalItems() {
    return this.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  updateUI() {
    // Update cart count
    const cartCount = document.getElementById('cart-count');
    const totalItems = this.getTotalItems();
    if (cartCount) {
      cartCount.textContent = totalItems;
    }
    
    // Update cart total
    const cartTotal = document.getElementById('cart-total');
    if (cartTotal) {
      cartTotal.textContent = formatCurrency(this.getTotalPrice());
    }
    
    // Update checkout total in the cart panel
    const checkoutTotal = document.getElementById('cart-checkout-total');
    if (checkoutTotal) {
      checkoutTotal.textContent = formatCurrency(this.getTotalPrice());
    }
    
    // Show/hide cart banner
    const cartBanner = document.getElementById('cart-banner');
    if (cartBanner) {
      cartBanner.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // Update discount message
    const discountMessage = document.getElementById('cart-discount-message');
    if (discountMessage) {
      if (totalItems >= 50) {
        discountMessage.textContent = '10% discount applied for orders of 50+ macarons!';
        discountMessage.style.display = 'block';
      } else if (totalItems > 0) {
        const neededForDiscount = 50 - totalItems;
        discountMessage.textContent = `Add ${neededForDiscount} more macarons for a 10% discount!`;
        discountMessage.style.display = 'block';
      } else {
        discountMessage.style.display = 'none';
      }
    }
    
    // Update cart items list
    const cartItemsList = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    
    if (cartItemsList && cartEmpty) {
      cartItemsList.innerHTML = '';
      
      if (this.items.length === 0) {
        cartEmpty.style.display = 'block';
      } else {
        cartEmpty.style.display = 'none';
        
        this.items.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">${formatCurrency(item.price)} each</div>
            </div>
            <div class="cart-item-quantity">
              <button class="quantity-button" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
              <span class="quantity-value">${item.quantity}</span>
              <button class="quantity-button" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
          `;
          cartItemsList.appendChild(cartItem);
        });
      }
    }
    
    // Update checkout button
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
      checkoutButton.disabled = this.items.length === 0;
    }
  }

  openCart() {
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
      cartContainer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCart() {
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
      cartContainer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}

// Utility functions
function formatCurrency(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

function generateOrderNumber() {
  return `SM-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
}

// Initialize shopping cart
let cart;

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart
  cart = new ShoppingCart();
  
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const navLinks = document.getElementById('nav-links');
  
  if (mobileMenuButton && navLinks) {
    mobileMenuButton.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }
  
  // Navigate to page
  const currentPath = window.location.pathname;
  const pageContainer = document.getElementById('page-container');
  
  if (pageContainer) {
    // Get the page based on URL
    let pageName = 'home';
    
    if (currentPath.includes('flavours.html')) {
      pageName = 'flavours';
    } else if (currentPath.includes('order.html')) {
      pageName = 'order';
    } else if (currentPath.includes('about.html')) {
      pageName = 'about';
    } else if (currentPath.includes('invoice.html')) {
      pageName = 'invoice';
    }
    
    // Handle incorrect flavor spelling (redirect to flavours)
    if (currentPath.includes('flavors.html')) {
      window.location.href = 'flavours.html';
      return;
    }
    
    loadPage(pageName);
  }
  
  // Handle form submissions
  document.addEventListener('submit', function(event) {
    if (event.target.id === 'order-form') {
      event.preventDefault();
      handleOrderSubmission(event.target);
    }
  });
});

function loadPage(pageName) {
  // Ensure proper spelling: always use 'flavours' (Canadian spelling)
  if (pageName === 'flavors') {
    pageName = 'flavours';
  }

  // Update active nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    }
  });
  
  // Display page content
  const pageContainer = document.getElementById('page-container');
  if (!pageContainer) return;
  
  switch(pageName) {
    case 'home':
      renderHomePage(pageContainer);
      break;
    case 'flavours':
      renderFlavoursPage(pageContainer);
      break;
    case 'order':
      renderOrderPage(pageContainer);
      break;
    case 'about':
      renderAboutPage(pageContainer);
      break;
    case 'invoice':
      renderInvoicePage(pageContainer);
      break;
    default:
      renderNotFoundPage(pageContainer);
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

function renderHomePage(container) {
  container.innerHTML = `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Welcome to Simply Macarons</h1>
          <p class="hero-subtitle">Handcrafted macarons in Victoria, BC 🇨🇦</p>
          <a href="flavours.html" class="button button-primary" onclick="loadPage('flavours'); return false;">View Our Flavours</a>
        </div>
      </div>
    </section>
    
    <section class="section">
      <div class="container">
        <h2 class="section-title">Our Top Flavours</h2>
        <p class="section-subtitle">Discover our most popular macaron flavours</p>
        
        <div class="flavors-grid" id="top-flavors-grid"></div>
        
        <div class="text-center mt-8">
          <a href="flavours.html" class="button button-outline" onclick="loadPage('flavours'); return false;">See All Flavours</a>
        </div>
      </div>
    </section>
    
    <section class="section" style="background-color: var(--background-secondary);">
      <div class="container">
        <h2 class="section-title">Why Choose Simply Macarons?</h2>
        
        <div class="flex flex-col gap-4 mt-8" style="max-width: 800px; margin: 0 auto;">
          <div class="flex gap-4 items-center">
            <div style="min-width: 48px; height: 48px; background-color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
            <div>
              <h3 class="text-xl font-semibold mb-1">Handcrafted with Love</h3>
              <p>Each macaron is carefully handcrafted in small batches to ensure freshness and quality.</p>
            </div>
          </div>
          
          <div class="flex gap-4 items-center">
            <div style="min-width: 48px; height: 48px; background-color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
            <div>
              <h3 class="text-xl font-semibold mb-1">Local Ingredients</h3>
              <p>Whenever possible, we source our ingredients locally to support other small businesses.</p>
            </div>
          </div>
          
          <div class="flex gap-4 items-center">
            <div style="min-width: 48px; height: 48px; background-color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>
            <div>
              <h3 class="text-xl font-semibold mb-1">Dietary Options</h3>
              <p>We offer dairy-free and gluten-free options so everyone can enjoy our delicious macarons.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  
  // Render top flavors
  const topFlavors = flavors.filter(flavor => flavor.tags && flavor.tags.includes('Top 5')).slice(0, 4);
  const topFlavorsGrid = document.getElementById('top-flavors-grid');
  
  topFlavors.forEach(flavor => {
    const flavorCard = document.createElement('div');
    flavorCard.className = 'flavor-card';
    flavorCard.innerHTML = `
      <img src="${flavor.imageUrl}" alt="${flavor.name}" class="flavor-image">
      <div class="flavor-content">
        <h3 class="flavor-title">${flavor.name}</h3>
        <p class="flavor-description">${flavor.description}</p>
        <div class="flex justify-between items-center mt-4">
          <span class="flavor-price">${formatCurrency(flavor.price)}</span>
          <button class="button button-primary" onclick="addToCartFromCard(${flavor.id})">Add to Cart</button>
        </div>
      </div>
      <div class="flavor-badge">Top 5</div>
    `;
    topFlavorsGrid.appendChild(flavorCard);
  });
}

function renderFlavoursPage(container) {
  container.innerHTML = `
    <section class="section">
      <div class="container">
        <h1 class="section-title">Our Flavours</h1>
        <p class="section-subtitle">All of our macarons are available in dairy-free and gluten-free varieties upon request</p>
        
        <div class="flavors-grid" id="flavors-grid"></div>
      </div>
    </section>
  `;
  
  // Render all flavors
  const flavorsGrid = document.getElementById('flavors-grid');
  
  flavors.forEach(flavor => {
    const flavorCard = document.createElement('div');
    flavorCard.className = 'flavor-card';
    flavorCard.innerHTML = `
      <img src="${flavor.imageUrl}" alt="${flavor.name}" class="flavor-image">
      <div class="flavor-content">
        <h3 class="flavor-title">${flavor.name}</h3>
        <p class="flavor-description">${flavor.description}</p>
        <div class="flex justify-between items-center mt-4">
          <span class="flavor-price">${formatCurrency(flavor.price)}</span>
          <button class="button button-primary" onclick="addToCartFromCard(${flavor.id})">Add to Cart</button>
        </div>
      </div>
      ${flavor.tags && flavor.tags.includes('Top 5') ? '<div class="flavor-badge">Top 5</div>' : ''}
      ${flavor.tags && flavor.tags.includes('Kid Favourite') ? '<div class="flavor-badge">Kid Favourite</div>' : ''}
    `;
    flavorsGrid.appendChild(flavorCard);
  });
}

function renderOrderPage(container) {
  // Check if cart is empty
  if (cart.items.length === 0) {
    container.innerHTML = `
      <section class="section">
        <div class="container">
          <h1 class="section-title">Your Cart is Empty</h1>
          <p class="text-center mb-8">Please add some macarons to your cart before checking out.</p>
          <div class="text-center">
            <a href="flavours.html" class="button button-primary" onclick="loadPage('flavours'); return false;">View Our Flavours</a>
          </div>
        </div>
      </section>
    `;
    return;
  }
  
  container.innerHTML = `
    <section class="section">
      <div class="container">
        <h1 class="section-title">Complete Your Order</h1>
        
        <div class="flex flex-col md:flex-row gap-8">
          <div class="order-summary">
            <h2 class="order-summary-title">Order Summary</h2>
            <div class="order-summary-list" id="order-summary-list"></div>
            ${cart.getTotalItems() >= 50 ? 
              `<div style="text-align: center; color: #10b981; margin: 1rem 0; font-weight: 500;">
                10% discount applied for orders of 50+ macarons!
              </div>` : ''}
            <div class="order-summary-total">
              <span>Total:</span>
              <span>${formatCurrency(cart.getTotalPrice())}</span>
            </div>
          </div>
          
          <div class="form">
            <form id="order-form">
              <div class="form-group">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" id="firstName" name="firstName" class="form-input" required>
              </div>
              
              <div class="form-group">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" id="lastName" name="lastName" class="form-input" required>
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-input" required>
              </div>
              
              <div class="form-group">
                <label for="phone" class="form-label">Phone</label>
                <input type="tel" id="phone" name="phone" class="form-input" maxlength="10" pattern="[0-9]{10}" placeholder="10-digit phone number" required>
              </div>
              
              <div class="form-group">
                <label class="form-label">Preferred Method</label>
                <div class="flex gap-4">
                  <label>
                    <input type="radio" name="deliveryOption" value="pickup" checked> Pickup
                  </label>
                  <label>
                    <input type="radio" name="deliveryOption" value="delivery"> Delivery
                  </label>
                </div>
              </div>
              
              <div id="pickup-fields">
                <div class="form-group">
                  <label for="pickupDate" class="form-label">Pickup Date</label>
                  <input type="date" id="pickupDate" name="pickupDate" class="form-input">
                </div>
                
                <div class="form-group">
                  <label for="pickupTime" class="form-label">Pickup Time</label>
                  <input type="time" id="pickupTime" name="pickupTime" class="form-input">
                </div>
              </div>
              
              <div id="delivery-fields" style="display: none;">
                <div class="form-group">
                  <label for="deliveryAddress" class="form-label">Delivery Address</label>
                  <input type="text" id="deliveryAddress" name="deliveryAddress" class="form-input">
                </div>
                
                <div class="form-group">
                  <label for="deliveryCity" class="form-label">City</label>
                  <input type="text" id="deliveryCity" name="deliveryCity" class="form-input" value="Victoria">
                </div>
                
                <div class="form-group">
                  <label for="deliveryPostalCode" class="form-label">Postal Code</label>
                  <input type="text" id="deliveryPostalCode" name="deliveryPostalCode" class="form-input">
                </div>
              </div>
              
              <div class="form-group">
                <label for="specialInstructions" class="form-label">Special Instructions</label>
                <textarea id="specialInstructions" name="specialInstructions" class="form-input" rows="3"></textarea>
              </div>
              
              <div class="form-group">
                <button type="submit" class="button button-primary" style="width: 100%;">Place Order</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
  
  // Populate order summary
  const orderSummaryList = document.getElementById('order-summary-list');
  
  cart.items.forEach(item => {
    const summaryItem = document.createElement('div');
    summaryItem.className = 'order-summary-item';
    summaryItem.innerHTML = `
      <span>${item.name} × ${item.quantity}</span>
      <span>${formatCurrency(item.price * item.quantity)}</span>
    `;
    orderSummaryList.appendChild(summaryItem);
  });
  
  // Handle delivery option toggle
  const deliveryOptions = document.getElementsByName('deliveryOption');
  const pickupFields = document.getElementById('pickup-fields');
  const deliveryFields = document.getElementById('delivery-fields');
  
  deliveryOptions.forEach(option => {
    option.addEventListener('change', function() {
      if (this.value === 'pickup') {
        pickupFields.style.display = 'block';
        deliveryFields.style.display = 'none';
      } else {
        pickupFields.style.display = 'none';
        deliveryFields.style.display = 'block';
      }
    });
  });
}

function renderAboutPage(container) {
  container.innerHTML = `
    <section class="section">
      <div class="container">
        <h1 class="section-title">About Simply Macarons</h1>
        
        <div style="max-width: 800px; margin: 0 auto;">
          <p class="mb-4">Simply Macarons is a home-based macaron business located in Victoria, BC. We specialize in creating delicious, handcrafted macarons with a variety of flavours to satisfy any sweet tooth.</p>
          
          <p class="mb-4">Our macarons are made using high-quality ingredients and can be customized for special events, parties, and celebrations. We offer both dairy-free and gluten-free options to accommodate dietary restrictions.</p>
          
          <h2 class="text-2xl font-bold mb-4 mt-8">Our Story</h2>
          
          <p class="mb-4">Simply Macarons began in 2022 when our founder discovered a passion for baking these delicate French treats. What started as a hobby quickly turned into a small business as friends and family began requesting macarons for special occasions.</p>
          
          <p class="mb-4">Today, we serve the Victoria community with our handcrafted macarons, each made with attention to detail and a commitment to quality.</p>
          
          <h2 class="text-2xl font-bold mb-4 mt-8">Contact Information</h2>
          
          <p class="mb-2"><strong>Email:</strong> <a href="mailto:simplymacaronsyyj@gmail.com">simplymacaronsyyj@gmail.com</a></p>
          <p class="mb-2"><strong>Location:</strong> Victoria, BC, Canada</p>
          <p class="mb-2"><strong>Instagram:</strong> <a href="https://www.instagram.com/simply_macarons_yyj/" target="_blank">@simply_macarons_yyj</a></p>
          <p class="mb-2"><strong>Facebook:</strong> <a href="https://www.facebook.com/profile.php?id=61560268713262" target="_blank">Simply Macarons</a></p>
        </div>
      </div>
    </section>
  `;
}

function renderInvoicePage(container) {
  // Get order number from URL
  const urlParams = new URLSearchParams(window.location.search);
  const orderNumber = urlParams.get('orderNumber');
  
  // Get order from localStorage
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const order = orders.find(o => o.orderNumber === orderNumber);
  
  if (!order) {
    container.innerHTML = `
      <section class="section">
        <div class="container">
          <h1 class="section-title">Order Not Found</h1>
          <p class="text-center">The order you're looking for could not be found.</p>
          <div class="text-center mt-8">
            <a href="index.html" class="button button-primary" onclick="loadPage('home'); return false;">Return to Home</a>
          </div>
        </div>
      </section>
    `;
    return;
  }
  
  // Format date
  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  container.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="invoice">
          <div class="invoice-header">
            <div>
              <h1 class="invoice-title">Order Confirmation</h1>
              <p>Thank you for your order!</p>
            </div>
            <div>
              <p><strong>Order #:</strong> ${order.orderNumber}</p>
              <p><strong>Date:</strong> ${formattedDate}</p>
            </div>
          </div>
          
          <div class="invoice-details">
            <div class="invoice-detail">
              <span class="invoice-detail-label">Name:</span>
              <span>${order.firstName} ${order.lastName}</span>
            </div>
            <div class="invoice-detail">
              <span class="invoice-detail-label">Email:</span>
              <span>${order.email}</span>
            </div>
            <div class="invoice-detail">
              <span class="invoice-detail-label">Phone:</span>
              <span>${order.phone}</span>
            </div>
            
            ${order.deliveryOption === 'pickup' ? `
              <div class="invoice-detail">
                <span class="invoice-detail-label">Pickup Date:</span>
                <span>${order.pickupDate || 'To be arranged'}</span>
              </div>
              <div class="invoice-detail">
                <span class="invoice-detail-label">Pickup Time:</span>
                <span>${order.pickupTime || 'To be arranged'}</span>
              </div>
            ` : `
              <div class="invoice-detail">
                <span class="invoice-detail-label">Delivery Address:</span>
                <span>${order.deliveryAddress}, ${order.deliveryCity}, ${order.deliveryPostalCode}</span>
              </div>
            `}
            
            ${order.specialInstructions ? `
              <div class="invoice-detail">
                <span class="invoice-detail-label">Special Instructions:</span>
                <span>${order.specialInstructions}</span>
              </div>
            ` : ''}
          </div>
          
          <table class="invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody id="invoice-items"></tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right"><strong>Total</strong></td>
                <td class="invoice-total">${formatCurrency(order.total)}</td>
              </tr>
            </tfoot>
          </table>
          
          <div class="text-center mt-8">
            <div style="background-color: #ecfdf5; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem;">
              <p class="mb-2" style="font-weight: 500; color: #047857;">Email Confirmation Sent</p>
              <p>An order confirmation has been sent to <strong>${order.email}</strong>.</p>
              <p>Please check your inbox (and spam folder) for details about your order.</p>
            </div>
            <p class="mb-4">Payment will be collected upon pickup or delivery.</p>
            <a href="index.html" class="button button-primary" onclick="loadPage('home'); return false;">Return to Home</a>
          </div>
        </div>
      </div>
    </section>
  `;
  
  // Populate invoice items
  const invoiceItems = document.getElementById('invoice-items');
  
  order.items.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(item.price * item.quantity)}</td>
    `;
    invoiceItems.appendChild(row);
  });
}

function renderNotFoundPage(container) {
  container.innerHTML = `
    <section class="section">
      <div class="container">
        <h1 class="section-title">Page Not Found</h1>
        <p class="text-center">The page you're looking for could not be found.</p>
        <div class="text-center mt-8">
          <a href="index.html" class="button button-primary" onclick="loadPage('home'); return false;">Return to Home</a>
        </div>
      </div>
    </section>
  `;
}

function addToCartFromCard(flavorId) {
  const flavor = flavors.find(f => f.id === flavorId);
  if (!flavor) return;
  
  // Add 12 macarons as the default quantity
  cart.addItem({
    id: flavor.id,
    name: flavor.name,
    price: flavor.price,
    quantity: 12
  });
}

async function handleOrderSubmission(form) {
  // Create FormData from the form
  const formData = new FormData(form);
  
  // Create order object
  const order = {
    orderNumber: generateOrderNumber(),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    deliveryOption: formData.get('deliveryOption'),
    items: cart.items,
    total: cart.getTotalPrice(),
    createdAt: new Date().toISOString()
  };
  
  // Add pickup or delivery details based on delivery option
  if (order.deliveryOption === 'pickup') {
    order.pickupDate = formData.get('pickupDate');
    order.pickupTime = formData.get('pickupTime');
  } else {
    order.deliveryAddress = formData.get('deliveryAddress');
    order.deliveryCity = formData.get('deliveryCity');
    order.deliveryPostalCode = formData.get('deliveryPostalCode');
  }
  
  // Add special instructions if provided
  const specialInstructions = formData.get('specialInstructions');
  if (specialInstructions) {
    order.specialInstructions = specialInstructions;
  }
  
  // Save order to localStorage
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  
  // Show a toast indicating the email would be sent (since we can't actually send it from client-side)
  cart.showToast(`Order confirmation would be sent to ${order.email}`, 'success');
  
  // Clear cart
  cart.clearCart();
  
  // Log the email that would be sent in a real implementation
  console.log("Order confirmation email template:", generateOrderConfirmationEmail(order));
  
  // Since we can't actually send an email from client-side code, this is just a simulation
  // In a real implementation, this would call a serverless function that sends the email
  // For now, we just log a message to the console
  const emailResult = await sendOrderConfirmationEmail(order);
  console.log(emailResult.message);
  
  // Redirect to invoice page
  window.location.href = `invoice.html?orderNumber=${order.orderNumber}`;
}

function navigateTo(page) {
  // Update URL without page reload
  history.pushState(null, null, `${page}.html`);
  loadPage(page);
}

// Initialize the toast container
function createToastContainer() {
  if (!document.getElementById('toast-container')) {
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '4rem';
    toastContainer.style.right = '1rem';
    toastContainer.style.zIndex = '1000';
    document.body.appendChild(toastContainer);
  }
}

// Create toast container when the script loads
createToastContainer();