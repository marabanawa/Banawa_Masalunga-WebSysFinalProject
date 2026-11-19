document.addEventListener('DOMContentLoaded', () => {
    const stats = DB.getStats();
    const container = document.getElementById('dashboard-content');
    container.innerHTML = `
        <h2 style="margin-bottom: 20px;">Dashboard Overview</h2>
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-icon blue"><i class="fa-solid fa-box"></i></div>
                <div class="stat-info"><h4>Total Products</h4><h2>${stats.totalProducts}</h2></div>
            </div>

            <div class="stat-card">
                <div class="stat-icon green"><i class="fa-solid fa-peso-sign"></i></div>
                <div class="stat-info"><h4>Today's Sales</h4><h2>₱${stats.todaySales.toLocaleString()}</h2></div>
            </div>

            <div class="stat-card">
                <div class="stat-icon orange"><i class="fa-solid fa-triangle-exclamation"></i></div>
                <div class="stat-info"><h4>Low-Stock</h4><h2>${stats.lowStockCount}</h2></div>
            </div>

            <div class="stat-card">
                <div class="stat-icon red"><i class="fa-solid fa-chart-line"></i></div>
                <div class="stat-info"><h4>Monthly Revenue</h4><h2>₱${stats.monthlyRevenue.toLocaleString()}</h2></div>
            </div>
        </div>

        <div class="chart-section">
            <div class="card">
                <div class="card-header"><h3>Sales Trend</h3></div>
                <div class="chart-placeholder">
                    <div class="chart-bar" style="height: 40%;"></div>
                    <div class="chart-bar" style="height: 60%;"></div>
                    <div class="chart-bar" style="height: 30%;"></div>
                    <div class="chart-bar" style="height: 80%;"></div>
                    <div class="chart-bar" style="height: 50%;"></div>
                    <div class="chart-bar" style="height: 90%;"></div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header"><h3>Top Selling Products</h3></div>
                <ul style="list-style: none; line-height: 2.5;">
                    ${stats.topSelling.map(p => `<li><i class="fa-solid fa-box"></i> ${p.name} - <b>${p.stock} in stock</b></li>`).join('')}
                </ul>
            </div>
        </div>
    `;
});