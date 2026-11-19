document.addEventListener('DOMContentLoaded', () => {
    const data = DB.getData();
    const tbody = document.getElementById('product-list-body');
    
    if (data.products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No products found. Add one!</td></tr>`;
        return;
    }
    
    tbody.innerHTML = data.products.map(product => {
        let statusClass = "in-stock", statusText = "In Stock";
        if (product.stock === 0) { statusClass = "out-stock"; statusText = "Out of Stock"; }
        else if (product.stock <= product.minStock) { statusClass = "low-stock"; statusText = "Low Stock"; }
        
        return `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>₱${product.price}</td>
                <td>${product.stock}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
                <td>
                    <i class="fa-solid fa-edit" style="cursor: pointer; color: var(--primary);"></i> 
                    <i class="fa-solid fa-trash" style="cursor: pointer; color: var(--danger);"></i>
                </td>
            </tr>
        `;
    }).join('');
});