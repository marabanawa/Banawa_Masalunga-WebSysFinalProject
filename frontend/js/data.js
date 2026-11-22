function initData() {
    if (!localStorage.getItem('munchtrack_data')) {
        const defaultData = {
            business: { 
                name: "My Cafe", 
                owner: "Admin",
                email: "admin@munchtrack.com",
                currency: "₱",
                taxRate: 12,
                lowStockAlerts: true
            },
            products: [
                { id: 1, name: "Iced Coffee", category: "Beverages", price: 75, stock: 80, minStock: 20 },
                { id: 2, name: "Milk Tea", category: "Beverages", price: 80, stock: 65, minStock: 20 },
                { id: 3, name: "Cheesecake", category: "Desserts", price: 120, stock: 40, minStock: 10 },
                { id: 4, name: "Brownie", category: "Desserts", price: 90, stock: 5, minStock: 10 }
            ],
            sales: [
                { id: "SV-0012", date: "11/17/2026 2:30 PM", items: 2, total: 195, payment: "Cash", status: "Completed" }
            ]
        };
        localStorage.setItem('munchtrack_data', JSON.stringify(defaultData));
    }
}
initData();

const DB = {
    getData: () => JSON.parse(localStorage.getItem('munchtrack_data')),
    saveData: (data) => localStorage.setItem('munchtrack_data', JSON.stringify(data)),
    addProduct: (product) => {
        const data = DB.getData();
        product.id = data.products.length > 0 ? Math.max(...data.products.map(p => p.id)) + 1 : 1;
        data.products.push(product);
        DB.saveData(data);
    },
    getStats: () => {
        const data = DB.getData();
        const totalProducts = data.products.length;
        const todaySales = data.sales.reduce((sum, sale) => sum + sale.total, 0);
        const lowStockCount = data.products.filter(p => p.stock <= p.minStock && p.stock > 0).length;
        const monthlyRevenue = todaySales * 15;
        const topSelling = [...data.products].sort((a, b) => b.stock - a.stock).slice(0, 3);
        return { totalProducts, todaySales, lowStockCount, monthlyRevenue, topSelling, business: data.business };
    },
    processSale: (cartItems, paymentMethod) => {
        const data = DB.getData();
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const newSale = {
            id: "SV-" + String(data.sales.length + 1).padStart(4, '0'),
            date: new Date().toLocaleString(),
            items: cartItems.reduce((sum, item) => sum + item.qty, 0),
            total: total,
            payment: paymentMethod,
            status: "Completed"
        };
        cartItems.forEach(cartItem => {
            const product = data.products.find(p => p.id === cartItem.id);
            if (product) product.stock -= cartItem.qty;
        });
        data.sales.unshift(newSale);
        DB.saveData(data);
        return newSale;
    }
};