document.addEventListener('DOMContentLoaded', () => {
    const data = DB.getData();
    const tbody = document.getElementById('sales-history-body');
    if (data.sales.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No sales recorded yet.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = data.sales.map(sale => `
        <tr>
            <td>${sale.id}</td>
            <td>${sale.date}</td>
            <td>${sale.items} item(s)</td>
            <td>₱${sale.total.toLocaleString()}</td>
            <td>${sale.payment}</td>
            <td><span class="badge in-stock">${sale.status}</span></td>
        </tr>
    `).join('');
});