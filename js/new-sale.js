let allProducts = [], cart = [];
document.addEventListener('DOMContentLoaded', () => {
    allProducts = DB.getData().products;
    renderProducts(allProducts);
});

function renderProducts(products) {
    const grid = document.getElementById('pos-product-grid');
    const available = products.filter(p => p.stock > 0);
    if (available.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No products available.</p>';
        return;
    }
    grid.innerHTML = available.map(product => `
        <div class="pos-product-card" onclick="addToCart(${product.id})">
            <i class="fa-solid fa-box" style="font-size: 2rem; color: var(--primary); margin-bottom: 10px;"></i>
            <h4>${product.name}</h4>
            <p>₱${product.price}</p>
            <span>Stock: ${product.stock}</span>
        </div>
    `).join('');
}

function filterProducts() {
    const query = document.getElementById('pos-search').value.toLowerCase();
    renderProducts(allProducts.filter(p => p.name.toLowerCase().includes(query)));
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        if (existingItem.qty < product.stock) existingItem.qty += 1;
        else { alert("Cannot add more. Reached maximum stock."); return; }
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted); margin-top: 20px;">Cart is empty</p>';
        totalEl.innerText = '₱0.00';
        return;
    }
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info"><h4>${item.name}</h4><p>₱${item.price}</p></div>

            <div class="cart-item-controls">
                <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
            </div>

            <div style="width: 60px; text-align: right; font-weight: bold;">₱${(item.price * item.qty).toLocaleString()}</div>
        </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    totalEl.innerText = `₱${total.toLocaleString()}`;
}

function changeQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    const product = allProducts.find(p => p.id === productId);
    if (change > 0 && item.qty >= product.stock) { alert("Reached maximum stock."); return; }
    item.qty += change;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== productId);
    updateCartUI();
}

function completeSale() {
    if (cart.length === 0) { alert("Cart is empty!"); return; }
    const paymentMethod = document.getElementById('payment-method').value;
    const sale = DB.processSale(cart, paymentMethod);
    showReceipt(sale);
    cart = [];
    updateCartUI();
    allProducts = DB.getData().products;
    renderProducts(allProducts);
}

function showReceipt(sale) {
    const modalHTML = `
        <div id="receipt-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
            <div style="background: white; padding: 30px; border-radius: 10px; width: 350px; text-align: center;">
                <h2 style="color: var(--primary); margin-bottom: 5px;"><i class="fa-solid fa-utensils"></i> MunchTrack</h2>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 15px;">Receipt No: ${sale.id} | ${sale.date}</p>
                <hr style="border: 1px dashed var(--border); margin: 15px 0;">

                <div style="text-align: left; font-size: 0.9rem; margin-bottom: 15px;">
                    <p><strong>Items:</strong> ${sale.items}</p>
                    <p><strong>Payment:</strong> ${sale.payment}</p>
                </div>

                <hr style="border: 1px dashed var(--border); margin: 15px 0;">
                <h3 style="margin-bottom: 20px;">Total: ₱${sale.total.toLocaleString()}</h3>
                <button class="btn btn-primary-sm" style="width: 100%;" onclick="document.getElementById('receipt-modal').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}