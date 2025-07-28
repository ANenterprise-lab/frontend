import { useState } from 'react';
import api from '../axiosConfig'; // The path might be './axiosConfig' if you're in App.jsx
function B2BPage() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('http://localhost:5000/api/b2b-inquiry', formData);
            alert('Thank you! Your inquiry has been sent.');
            setFormData({ companyName: '', contactPerson: '', email: '', phone: '', message: '' });
        } catch (error) {
            alert('There was an error submitting your form.');
        }
    };

    return (
        <div>
            <h1>B2B & Wholesale Inquiries</h1>
            <p>Interested in stocking our products? Please fill out the form below.</p>
            <form onSubmit={handleSubmit} className="b2b-form">
                <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
                <input type="text" name="contactPerson" placeholder="Your Name" value={formData.contactPerson} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange}></textarea>
                <button type="submit">Submit Inquiry</button>
            </form>
        </div>
    );
}

export default B2BPage;