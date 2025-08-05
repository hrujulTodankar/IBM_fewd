
        // Sample product data
        const products = [
            {
                id: 1,
                name: "Wireless Headphones",
                category: "electronics",
                price: 1200,
                description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
                rating: 4.5,
                icon: "🎧"
            },
            {
                id: 2,
                name: "Smartphone",
                category: "electronics",
                price: 15000,
                description: "Latest flagship smartphone with advanced camera and 5G connectivity.",
                rating: 4.8,
                icon: "📱"
            },
            {
                id: 3,
                name: "Laptop Stand",
                category: "accessories",
                price: 200,
                description: "Ergonomic aluminum laptop stand with adjustable height and angle.",
                rating: 4.3,
                icon: "💻"
            },
            {
                id: 4,
                name: "Gaming Mouse",
                category: "gaming",
                price: 200,
                description: "High-precision gaming mouse with RGB lighting and programmable buttons.",
                rating: 4.6,
                icon: "🖱️"
            },
            {
                id: 5,
                name: "Bluetooth Speaker",
                category: "electronics",
                price: 700,
                description: "Portable waterproof speaker with 360-degree sound and 24-hour battery.",
                rating: 4.4,
                icon: "🔊"
            },
            {
                id: 6,
                name: "USB-C Hub",
                category: "accessories",
                price: 34.99,
                description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and PD charging.",
                rating: 4.2,
                icon: "🔌"
            },
            {
                id: 7,
                name: "Gaming Keyboard",
                category: "gaming",
                price: 159.99,
                description: "Mechanical gaming keyboard with RGB backlighting and custom switches.",
                rating: 4.7,
                icon: "⌨️"
            },
            {
                id: 8,
                name: "Smartwatch",
                category: "electronics",
                price: 299.99,
                description: "Advanced fitness tracker with heart rate monitor and GPS.",
                rating: 4.5,
                icon: "⌚"
            },
            {
                id: 9,
                name: "Phone Case",
                category: "accessories",
                price: 24.99,
                description: "Durable protective case with wireless charging support.",
                rating: 4.1,
                icon: "📞"
            }
        ];

        let cart = [];
        let filteredProducts = [...products];
        let currentCategory = 'all';

        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            displayProducts();
            updateCartDisplay();
        });

        // Display products
        function displayProducts() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = '';

            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image">
                        ${product.icon}
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <div class="product-name">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-rating">
                            <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                            <span class="rating-text">(${product.rating})</span>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                `;
                grid.appendChild(productCard);
            });
        }

        // Filter products by category
        function filterByCategory(category) {
            currentCategory = category;
            
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            // Filter products
            if (category === 'all') {
                filteredProducts = [...products];
            } else {
                filteredProducts = products.filter(product => product.category === category);
            }

            // Apply search filter if there's a search term
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
            }

            displayProducts();
        }

        // Filter products by search
        function filterProducts() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            
            let baseProducts = currentCategory === 'all' ? products : 
                              products.filter(product => product.category === currentCategory);

            if (searchTerm) {
                filteredProducts = baseProducts.filter(product =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
            } else {
                filteredProducts = baseProducts;
            }

            displayProducts();
        }

        // Sort products
        function sortProducts(sortBy) {
            switch (sortBy) {
                case 'name':
                    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    filteredProducts.sort((a, b) => b.rating - a.rating);
                    break;
            }
            displayProducts();
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
            showNotification(`${product.name} added to cart!`);
        }

        // Update cart display
        function updateCartDisplay() {
            const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

            document.getElementById('cartCount').textContent = cartCount;
            document.getElementById('cartTotal').textContent = cartTotal.toFixed(2);
            document.getElementById('sidebarTotal').textContent = cartTotal.toFixed(2);

            updateCartItems();
        }

        // Update cart items in sidebar
        function updateCartItems() {
            const cartItemsContainer = document.getElementById('cartItems');
            cartItemsContainer.innerHTML = '';

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Your cart is empty</p>';
                return;
            }

            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="background: #ff4757; color: white; border-color: #ff4757;">✕</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        // Update item quantity
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id=== productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCartDisplay();
                }
            }
        }

        // Remove item from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartDisplay();
        }

        // Toggle cart sidebar
        function toggleCart() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.getElementById('overlay');
            
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }

        // Show notification
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Checkout function
        function checkout() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            showNotification(`Checkout complete! Total: $${total.toFixed(2)}`);
            
            // Clear cart
            cart = [];
            updateCartDisplay();
            toggleCart();
        }
   
