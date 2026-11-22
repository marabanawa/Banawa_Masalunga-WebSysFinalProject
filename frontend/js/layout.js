function loadLayout(activePage) {
    const data = DB.getData();
    const sidebarContainer = document.getElementById('sidebar-container');
    const headerContainer = document.getElementById('header-container');

    if (sidebarContainer) {
        sidebarContainer.innerHTML = `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <i class="fa-solid fa-utensils"></i>
                    <span>MunchTrack</span>
                </div>
                <nav class="sidebar-nav">
                    <a href="dashboard.html" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}"><i class="fa-solid fa-border-all"></i> Dashboard</a>
                    <a href="products.html" class="nav-item ${activePage === 'products' ? 'active' : ''}"><i class="fa-solid fa-box"></i> Products</a>
                    <a href="categories.html" class="nav-item ${activePage === 'categories' ? 'active' : ''}"><i class="fa-solid fa-tags"></i> Categories</a>
                    <a href="inventory.html" class="nav-item ${activePage === 'inventory' ? 'active' : ''}"><i class="fa-solid fa-warehouse"></i> Inventory</a>
                    <a href="stock-in.html" class="nav-item ${activePage === 'stock-in' ? 'active' : ''}"><i class="fa-solid fa-arrow-right-to-bracket"></i> Stock-In</a>
                    <a href="stock-out.html" class="nav-item ${activePage === 'stock-out' ? 'active' : ''}"><i class="fa-solid fa-arrow-right-from-bracket"></i> Stock-Out</a>
                    <a href="sales.html" class="nav-item ${activePage === 'sales' ? 'active' : ''}"><i class="fa-solid fa-receipt"></i> Sales</a>
                    <a href="analytics.html" class="nav-item ${activePage === 'analytics' ? 'active' : ''}"><i class="fa-solid fa-chart-line"></i> Analytics</a>
                    <a href="reports.html" class="nav-item ${activePage === 'reports' ? 'active' : ''}"><i class="fa-solid fa-file-invoice"></i> Reports</a>
                    <a href="notifications.html" class="nav-item ${activePage === 'notifications' ? 'active' : ''}"><i class="fa-solid fa-bell"></i> Notifications</a>
                </nav>
                <div class="sidebar-footer">
                    <a href="settings.html" class="nav-item ${activePage === 'settings' ? 'active' : ''}"><i class="fa-solid fa-gear"></i> Settings</a>
                    <a href="index.html" class="nav-item"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
                </div>
            </aside>
        `;
    }

    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="top-header">
                <div class="search-bar">
                    <i class="fa-solid fa-search" style="color: var(--text-muted);"></i>
                    <input type="text" placeholder="Search...">
                </div>
                <div class="header-profile">
                    <span style="font-weight: 600; color: var(--text-muted); margin-right: 15px;">
                        <i class="fa-solid fa-store"></i> ${data.business.name}
                    </span>
                    <div class="profile-info">
                        <span>${data.business.owner}</span>
                        <i class="fa-solid fa-circle-user"></i>
                    </div>
                </div>
            </header>
        `;
    }
}