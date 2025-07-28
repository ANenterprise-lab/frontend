import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProductAddPage() {
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [barcode, setBarcode] = useState('');
    const [category, setCategory] = useState('');
    const [variety, setVariety] = useState('');
    const [price, setPrice] = useState(0);
    const [stockLevel, setStockLevel] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const addProductHandler = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post(
                'http://localhost:5000/api/products',
                { name, sku, barcode, category, variety, price, stockLevel, imageUrl, description },
                config
            );

            alert('Product created successfully!');
            // We will create the product list page next
            // navigate('/admin/products'); 
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create product.');
        }
    };

    return (
        <div>
            <h1>Add New Product</h1>
            <Form onSubmit={addProductHandler}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='name' className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter product name' value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='price' className='my-2'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>
                {/* Add more rows for other fields: SKU, Barcode, Category, etc. */}
                <Row>
                     <Col md={6}>
                        <Form.Group controlId='sku' className='my-2'>
                            <Form.Label>SKU (Custom ID)</Form.Label>
                            <Form.Control type='text' placeholder='e.g., 20200000' value={sku} onChange={(e) => setSku(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='barcode' className='my-2'>
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control type='text' placeholder='Enter barcode' value={barcode} onChange={(e) => setBarcode(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>
                 <Row>
                     <Col md={6}>
                        <Form.Group controlId='category' className='my-2'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='e.g., Dogs' value={category} onChange={(e) => setCategory(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='variety' className='my-2'>
                            <Form.Label>Variety</Form.Label>
                            <Form.Control type='text' placeholder='e.g., Puppy' value={variety} onChange={(e) => setVariety(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>
                 <Row>
                     <Col md={6}>
                        <Form.Group controlId='stockLevel' className='my-2'>
                            <Form.Label>Stock Level</Form.Label>
                            <Form.Control type='number' placeholder='Enter stock level' value={stockLevel} onChange={(e) => setStockLevel(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='imageUrl' className='my-2'>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type='text' placeholder='Enter image URL' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId='description' className='my-2'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as='textarea' rows={3} placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} required />
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>
                    Create Product
                </Button>
            </Form>
        </div>
    );
}

export default ProductAddPage;