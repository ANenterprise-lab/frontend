import React from 'react';
import api from '../axiosConfig'; // The path might be './axiosConfig' if you're in App.jsx
function AboutUsPage() {
    return (
        <div>
            <h1>About Our Brand</h1>
            <p>Welcome to our pet food brand, where we believe that a healthy pet is a happy pet. Our mission is to provide the highest quality, all-natural ingredients in every bag.</p>
            <p>Founded in 2025, we are dedicated to transparency, quality, and the well-being of your furry family members.</p>
        </div>
    );
}

export default AboutUsPage;