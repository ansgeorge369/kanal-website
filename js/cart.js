document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Add to cart event
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            const price = parseFloat(btn.dataset.price);
            addToCart(name, price);
        });
    });

    function addToCart(name, price) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cart.findIndex(item => item.name === name);

        if (index !== -1) {
            cart[index].quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} added to cart`);
    }

    // Display cart if on cart page
    const cartList = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    function displayCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartList.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartList.innerHTML = `<p style="text-align:center; font-style:italic; font-size:18px;">Your cart is empty. Go to <a href="menu.html">Menu</a> to add items.</p>`;
            totalEl.textContent = 'Total: ₹0';
            return;
        }

        cart.forEach((item, i) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartList.innerHTML += `
                <div class="cart-item">
                  <span>${item.name}</span>
                  <input type="number" min="1" value="${item.quantity}" data-index="${i}" />
                  <span>₹${itemTotal}</span>
                </div>
            `;
        });

        totalEl.textContent = `Total: ₹${total}`;
    }

    if (cartList && totalEl) {
        displayCart();

        cartList.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT') {
                const index = e.target.dataset.index;
                const newQty = parseInt(e.target.value);
                if (newQty > 0) {
                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
                    cart[index].quantity = newQty;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    displayCart(); // Live update
                }
            }
        });
    }

    // Clear Cart (triggered via button)
    window.clearCart = function () {
        localStorage.removeItem('cart');
        displayCart();
    };

    // ----------------------
    // Maintenance Popup Logic
    // ----------------------
    const popup = document.getElementById('maintenance-popup');

    if (popup) {
        const dismissed = localStorage.getItem('maintenanceDismissed');
        if (!dismissed) {
            popup.style.display = 'flex';
        }
    }

    window.closePopup = function () {
        const popup = document.getElementById('maintenance-popup');
        if (popup) {
            popup.style.display = 'none';
            // Optional: prevent future popups
            // localStorage.setItem('maintenanceDismissed', 'true');
        }
    };
});
