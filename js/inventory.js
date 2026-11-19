document.addEventListener('DOMContentLoaded', () => {
    const data = DB.getData();
    const tbody = document.getElementById('inventory-body');
    tbody.innerHTML = data.products.map(product => {
        let statusClass = "in-stock", statusText = "In Stock";
        if (product.stock === 0) { statusClass = "out-stock"; statusText = "Out of Stock"; }
        else if (product.stock <= product.minStock) { statusClass = "low-stock"; statusText = "Low Stock"; }
        return `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.stock}</td>
                <td>${product.minStock}</td>
                <td><span class="badge ${statusClass}">${statusText}</span></td>
            </tr>
        `;
    }).join('');
});