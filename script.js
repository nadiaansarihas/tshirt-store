// Product Data - Y2K Streetwear Collection
const products = [
    {
        id: 1,
        name: "CYBER DREAMS TEE",
        description: "Matrix-inspired graphic tee with holographic print. Perfect for main character energy ✨",
        price: 45.00,
        category: "tees",
        image: "static/images/cyber_dreams.png",
        trending: true
    },
    {
        id: 2,
        name: "NEON NIGHTS HOODIE",
        description: "Oversized hoodie with glow-in-the-dark details. Comfort meets Y2K vibes 🔥",
        price: 85.00,
        category: "hoodies",
        image: "static/images/neon_nights.png",
        trending: true
    },
    {
        id: 3,
        name: "DIGITAL ANGEL CROP TOP",
        description: "Cropped mesh top with metallic angel wing graphics. Serving future fairy core 🧚‍♀️",
        price: 35.00,
        category: "tees",
        image: "static/images/digital_angel.png",
        trending: false
    },
    {
        id: 4,
        name: "CHROME HEARTS CHAIN",
        description: "Chunky silver chain with Y2K charm pendants. The perfect statement piece 💎",
        price: 65.00,
        category: "accessories",
        image: "static/images/chrome hearts chain.png",
        trending: true
    },
    {
        id: 5,
        name: "PIXEL PARADISE HOODIE",
        description: "Retro gaming-inspired hoodie with 8-bit graphics. For the nostalgic gamers 🎮",
        price: 75.00,
        category: "hoodies",
        image: "static/images/pixel.png",
        trending: false
    },
    {
        id: 6,
        name: "BUTTERFLY EFFECT TEE",
        description: "Iridescent butterfly print on black cotton. Giving metamorphosis energy 🦋",
        price: 40.00,
        category: "tees",
        emoji: "🦋",
        trending: true
    },
    {
        id: 7,
        name: "HOLOGRAM BUCKET HAT",
        description: "Reflective holographic bucket hat. Protects from haters and UV rays ☀️",
        price: 55.00,
        category: "accessories",
        emoji: "🪣",
        trending: false
    },
    {
        id: 8,
        name: "MATRIX CODE HOODIE",
        description: "Digital rain print hoodie with hidden messages. Decode the future 🔢",
        price: 90.00,
        category: "hoodies",
        emoji: "💾",
        trending: true
    },
    {
        id: 9,
        name: "STARS ALIGN TEE",
        description: "Celestial constellation print with glow-in-the-dark stars. Written in the stars ⭐",
        price: 42.00,
        category: "tees",
        emoji: "✨",
        trending: false
    },
    {
        id: 10,
        name: "CYBER PUNK GLASSES",
        description: "Futuristic LED glasses with customizable colors. See the world differently 👀",
        price: 125.00,
        category: "accessories",
        emoji: "🤓",
        trending: true
    },
    {
        id: 11,
        name: "ELECTRIC DREAMS HOODIE",
        description: "Lightning bolt graphics with reflective threading. Spark up your wardrobe ⚡",
        price: 80.00,
        category: "hoodies",
        emoji: "⚡",
        trending: false
    },
    {
        id: 12,
        name: "RETRO FUTURE TEE",
        description: "Vintage sci-fi poster print. What the 2000s thought 2025 would look like 🚀",
        price: 38.00,
        category: "tees",
        emoji: "🚀",
        trending: true
    }
];

// Cart functionality
let cart = [];
let currentFilter = 'all';

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const cursorTrail = document.querySelector('.cursor-trail');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartDisplay();
    initializeEventListeners();
    createCursorTrail();
    addScrollAnimations();
    initializeVibeCheck();
    animateStats();
});

// Render products based on current filter
function renderProducts() {
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(product => product.category === currentFilter);
    
    productGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    
    // Add stagger animation
    const cards = productGrid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const imageContent = product.image 
        ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">`
        : product.emoji;
    
    card.innerHTML = `
        <div class="product-image">
            ${imageContent}
            ${product.trending ? '<div class="trending-badge">🔥 VIRAL</div>' : ''}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                ADD TO BAG 🛍️
            </button>
        </div>
    `;
    return card;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartDisplay();
    showAddToCartAnimation();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your bag is empty... time to shop! 🛍️</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    🗑️
                </button>
            </div>
        `).join('');
    }
}

// Toggle cart visibility
function toggleCart() {
    cartOverlay.classList.toggle('active');
    
    if (cartOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Filter products
function filterProducts(category) {
    currentFilter = category;
    
    // Update active filter button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    renderProducts();
}

// Smooth scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Initialize event listeners
function initializeEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterProducts(button.dataset.category);
        });
    });
    
    // Close cart when clicking overlay
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            toggleCart();
        }
    });
    
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (cartOverlay.classList.contains('active')) {
                toggleCart();
            }
        }
    });
}

// Custom cursor trail
function createCursorTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        
        trailX += dx * 0.1;
        trailY += dy * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Add to cart animation
function showAddToCartAnimation() {
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification';
    notification.innerHTML = '✨ Added to bag! ✨';
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--gradient-primary);
        color: #000;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-weight: bold;
        z-index: 10000;
        animation: popup 1s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 1000);
}

// Scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.section-title, .about-text, .retro-computer').forEach(el => {
        observer.observe(el);
    });
}

// Glitch text effect for random elements
function addRandomGlitch() {
    const glitchElements = document.querySelectorAll('.product-name, .nav-link');
    
    setInterval(() => {
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        randomElement.style.animation = 'glitch 0.3s ease-out';
        
        setTimeout(() => {
            randomElement.style.animation = '';
        }, 300);
    }, 5000);
}

// Initialize glitch effects
setTimeout(addRandomGlitch, 2000);

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes popup {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    .animate-in {
        animation: slideInFromLeft 0.8s ease-out forwards;
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        margin-bottom: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        border: 1px solid rgba(0, 255, 255, 0.2);
    }
    
    .cart-item-info h4 {
        color: var(--neon-blue);
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }
    
    .cart-item-info p {
        color: #ccc;
        font-size: 0.8rem;
    }
    
    .remove-item {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: none;
        transition: transform 0.2s ease;
    }
    
    .remove-item:hover {
        transform: scale(1.2);
    }
    
    .trending-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: var(--gradient-primary);
        color: #000;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.7rem;
        font-weight: bold;
        animation: pulse-glow 2s infinite;
    }
    
    @keyframes pulse-glow {
        0%, 100% {
            box-shadow: 0 0 5px rgba(255, 0, 255, 0.5);
        }
        50% {
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.8);
        }
    }
    
    @media (max-width: 768px) {
        .hero-visual {
            display: none;
        }
        
        .hero-content {
            flex: 1;
            text-align: center;
        }
        
        .floating-elements {
            display: none;
        }
    }
`;

document.head.appendChild(style);

// Add the additional styles
const extraStyle = document.createElement('style');
extraStyle.textContent = additionalStyles;
document.head.appendChild(extraStyle);

// Console Easter Egg
console.log(`
🌟 WELCOME TO NEON THREADS 🌟
   
 ██████╗██╗   ██╗██████╗ ███████╗██████╗ 
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗
╚██████╗   ██║   ██████╔╝███████╗██║  ██║
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝
                                         
Welcome to the matrix, digital fashionista! 🔥
The future of streetwear is now loading...
Ready to upgrade your wardrobe? 👾
`);

// Secret konami code for special discount
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showSecretMessage();
        konamiCode = [];
    }
});

function showSecretMessage() {
    const secretDiv = document.createElement('div');
    secretDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--gradient-primary);
            color: #000;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            font-family: 'Press Start 2P', cursive;
            font-size: 1rem;
            animation: glitch 2s infinite;
        ">
            🎮 KONAMI CODE ACTIVATED! 🎮<br>
            <span style="font-size: 0.8rem;">Secret 30% off unlocked!</span><br>
            <span style="font-size: 0.6rem;">Use code: MATRIX30</span>
        </div>
    `;
    
    document.body.appendChild(secretDiv);
    
    setTimeout(() => {
        secretDiv.remove();
    }, 3000);
}

// Vibe Check Functions
function initializeVibeCheck() {
    setTimeout(() => {
        const vibeFill = document.getElementById('vibeFill');
        const vibeLabel = document.getElementById('vibeLabel');
        
        // Animate vibe meter
        vibeFill.style.width = '95%';
        
        setTimeout(() => {
            vibeLabel.textContent = 'IMMACULATE ✨';
        }, 1000);
    }, 1000);
}

function runVibeCheck() {
    const vibeMessages = [
        "VIBE STATUS: ABSOLUTELY SENDING 🚀",
        "ENERGY LEVEL: MAIN CHARACTER ✨",
        "SWAG METER: OFF THE CHARTS 📈",
        "CONFIDENCE: MAXIMUM OVERDRIVE 💎",
        "STYLE POINTS: LEGENDARY 🏆",
        "AURA: UNMATCHED BRILLIANCE 🌟"
    ];
    
    const randomMessage = vibeMessages[Math.floor(Math.random() * vibeMessages.length)];
    
    // Create popup notification
    const notification = document.createElement('div');
    notification.className = 'vibe-notification';
    notification.innerHTML = randomMessage;
    notification.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--gradient-secondary);
        color: #000;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        font-weight: bold;
        z-index: 10000;
        animation: vibePopup 2s ease-out forwards;
        pointer-events: none;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.8rem;
        text-align: center;
        border: 2px solid var(--neon-green);
        box-shadow: 0 0 30px rgba(0, 255, 65, 0.6);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function generateCompliment() {
    const compliments = [
        "You're giving main character energy! 💫",
        "Your style is absolutely iconic! 🔥",
        "You're about to break the internet! 📱",
        "That fit is going to be legendary! ⚡",
        "You're serving looks and taking names! 👑",
        "Your vibe is immaculate! ✨",
        "You're the moment! 🌟",
        "That's some serious main character behavior! 🎬"
    ];
    
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    
    // Update terminal with compliment
    const terminalContent = document.getElementById('terminalContent');
    const newLine = document.createElement('div');
    newLine.className = 'code-line';
    newLine.innerHTML = `
        <span class="line-number">007</span>
        <span class="code" style="color: var(--neon-pink);">> ${randomCompliment}</span>
    `;
    
    terminalContent.appendChild(newLine);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (newLine.parentNode) {
            newLine.remove();
        }
    }, 3000);
}

// Animate statistics counters
function animateStats() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.stat-number');
                const target = parseInt(numberElement.dataset.target);
                animateNumber(numberElement, target);
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => observer.observe(card));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 20);
}

// Add more dynamic styles
const additionalStyles = `
    @keyframes vibePopup {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3) rotate(-10deg);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1) rotate(2deg);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
    }
    
    .typing {
        animation: typeWriter 2s steps(20) infinite;
    }
    
    @keyframes typeWriter {
        0%, 90% { width: 0; }
        100% { width: 100%; }
    }
`;
