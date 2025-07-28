import { useState, useEffect } from 'react';
import api from '../axiosConfig'; // The path might be './axiosConfig' if you're in App.jsx
function ProcessingPage() {
    const [orders, setOrders] = useState([]);
    const [scanInput, setScanInput] = useState({});

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('http://localhost:5000/api/orders');
            setOrders(data.filter(order => order.status === 'processing'));
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleInputChange = (orderId, value) => {
        setScanInput({ ...scanInput, [orderId]: value });
    };

    const handleScan = async (e, orderId) => {
        e.preventDefault();
        const barcode = scanInput[orderId];
        if (!barcode) return;

        try {
            await api.post('http://localhost:5000/api/orders/scan-item', { orderId, barcode });
            setScanInput({ ...scanInput, [orderId]: '' });
            fetchOrders();
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred.");
            console.error("Error scanning item:", error);
        }
    };

    return (
        <div>
            <h1>Process Orders</h1>
            {orders.length > 0 ? orders.map(order => (
                <div key={order._id} className="order-item">
                    <h3>Order ID: {order._id}</h3>
                    <form onSubmit={(e) => handleScan(e, order._id)}>
                        <input
                            type="text"
                            placeholder="Scan barcode here..."
                            value={scanInput[order._id] || ''}
                            onChange={(e) => handleInputChange(order._id, e.target.value)}
                        />
                        <button type="submit">Scan</button>
                    </form>
                    <ul>
                        {order.orderItems.map(item => (
                            <li key={item._id}>
                                {/* THIS IS THE CORRECTED LINE */}
                                {item.productId ? `${item.productId.name} ${item.scanned ? '✔️' : '...'}` : 'Product data missing'}
                            </li>
                        ))}
                    </ul>
                </div>
            )) : <p>No orders to process.</p>}
        </div>
    );
}

export default ProcessingPage;