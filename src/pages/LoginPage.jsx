import { useState } from 'react';
import axios from 'axios';
import api from '../axiosConfig'; // The path might be './axiosConfig' if you're in App.jsx
function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post(
                'http://localhost:5000/api/users/login',
                { email, password }
            );
            // Save user info to browser's local storage
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert('Login successful!');
            window.location.href = '/'; // Redirect to homepage
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;