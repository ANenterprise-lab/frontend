import React from 'react';
import { Link } from 'react-router-dom';
import { ParallaxBanner } from 'react-scroll-parallax'; // Import ParallaxBanner
import api from '../axiosConfig'; // The path might be './axiosConfig' if you're in App.jsx
function HomePage() {
    return (
        <div>
            {/* Use ParallaxBanner for a simpler and more robust hero section */}
            <ParallaxBanner
                layers={[{ image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', speed: -20 }]}
                className="hero-banner"
            >
                <div className="hero-content">
                    <h1>High-Quality Nutrition for Your Best Friend</h1>
                    <p>Discover our range of premium, all-natural pet foods.</p>
                    <Link to="/store" className="btn btn-primary btn-lg">
                        Shop Now
                    </Link>
                </div>
            </ParallaxBanner>

            {/* Extra content to make the page scrollable */}
            <div style={{ height: '100vh', padding: '2rem' }}>
                <h2>Our Commitment to Quality</h2>
                <p>We source only the finest ingredients because we believe your pet deserves the best. Explore our store to find the perfect meal.</p>
            </div>
        </div>
    );
}

export default HomePage;