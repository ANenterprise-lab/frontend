import { useState, useEffect } from 'react';
import api from '../axiosConfig'; // The path might be './axiosConfig' if you're in App.jsx
function StockPage() {
    const [products, setProducts] = useState([]);
    const [barcode, setBarcode] = useState('');

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('http://localhost:5000/api/products');
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleStockScan = async (e) => {
        e.preventDefault();
        if (!barcode) return;

        try {
            const { data } = await api.post('http://localhost:5000/api/products/add-stock', { barcode });
            alert(`${data.product.name} stock updated to ${data.product.stockLevel}`);
            setBarcode(''); // Clear input
            fetchProducts(); // Refresh product list
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred.");
            console.error("Error adding stock:", error);
        }
    };

    return (
        <div>
            <h1>Manage Stock</h1>
            <form onSubmit={handleStockScan}>
                <input
                    type="text"
                    placeholder="Scan product barcode to add stock..."
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                />
                <button type="submit">Add Stock</button>
            </form>

            <h2>Current Inventory</h2>
            <div className="stock-list">
                {products.map(product => (
                    <div key={product._id} className="stock-item">
                        <span>{product.name}</span>
                        <strong>Stock: {product.stockLevel}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StockPage;