import { useState } from 'react';
import api from '../axiosConfig'; // The path might be './axiosConfig' if you're in App.jsx
function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            await api.post(
                'http://localhost:5000/api/users/register',
                { name, email, password },
                config
            );
            alert('Registration successful! Please log in.');
            // Redirect to login page after successful registration
            window.location.href = '/login';
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;