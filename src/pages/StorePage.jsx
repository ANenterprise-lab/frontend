import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import api from '../axiosConfig'; // The path might be './axiosConfig' if you're in App.jsx
function StorePage() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const cartTotal = cart.reduce((total, product) => total + product.price, 0);

    const addToCart = (product) => {
        if (!cart.find(item => item._id === product._id)) {
            setCart([...cart, product]);
        } else {
            alert("Item is already in the cart!");
        }
    };

    const removeFromCart = (productToRemove) => {
        setCart(cart.filter(product => product._id !== productToRemove._id));
    };

    const handlePlaceOrder = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) {
                alert('Please log in to place an order.');
                return;
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const orderData = { cartItems: cart, totalPrice: cartTotal };
            await api.post('http://localhost:5000/api/orders', orderData, config);
            alert('Order placed successfully!');
            setCart([]);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to place order.');
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('http://localhost:5000/api/products');
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <div className="cart-section">
                <h2>🛒 Your Cart</h2>
                {cart.length === 0 ? <p>Your cart is empty.</p> : (
                    <>
                        {cart.map(item => (
                            <div key={item._id} className="cart-item">
                                <span>{item.name}</span>
                                <span>₹{item.price}</span>
                                <button onClick={() => removeFromCart(item)} className="remove-btn">Remove</button>
                            </div>
                        ))}
                        <hr />
                        <div className="cart-total">
                            <strong>Total: ₹{cartTotal}</strong>
                            <Button onClick={handlePlaceOrder} variant="success">Place Order</Button>
                        </div>
                    </>
                )}
            </div>
            <hr />
            <h1>Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Card className="my-3 p-3 rounded">
                            <Card.Img src={product.imageUrl || '/placeholder.jpg'} variant="top" />
                            <Card.Body>
                                <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
                                <Card.Text as="p">{product.description}</Card.Text>
                                <Card.Text as="h3">₹{product.price}</Card.Text>
                                <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default StorePage;