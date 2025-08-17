import React from 'react';
import { Truck, Users, Menu } from 'lucide-react';
import '../css/VendorScreen.css';

const VendorScreen = ({ setActiveSection }) => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to FoodTruck Pro</h1>
          <p>
            The ultimate platform for food truck vendors to manage their brands, 
            trucks, and menu items all in one place. Streamline your operations 
            and grow your mobile food business with our intuitive management tools.
          </p>
          <div className="hero-buttons">
            <button onClick={() => setActiveSection('brands')}>
              Manage Brands
            </button>
            <button onClick={() => setActiveSection('trucks')}>
              View Trucks
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="icon-background">
            <Truck className="truck-icon" />
          </div>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <Users className="feature-icon" />
          <h3>Brand Management</h3>
          <p>Create and manage multiple brands under your vendor account. Each brand can have its own identity and food trucks.</p>
        </div>
        <div className="feature-card">
          <Truck className="feature-icon" />
          <h3>Fleet Control</h3>
          <p>Monitor and manage your food trucks, track locations, and oversee operations across all your mobile units.</p>
        </div>
        <div className="feature-card">
          <Menu className="feature-icon" />
          <h3>Menu System</h3>
          <p>Design and update menus for each food truck with pricing, categories, and detailed item descriptions.</p>
        </div>
      </div>

      {/* <div className="stats-section">
        <h2>Quick Stats</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{brands.length}</div>
            <div className="stat-label">Active Brands</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              {brands.reduce((total, brand) => total + brand.foodTrucks.length, 0)}
            </div>
            <div className="stat-label">Food Trucks</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              {brands.reduce((total, brand) => 
                total + brand.foodTrucks.reduce((truckTotal, truck) => 
                  truckTotal + truck.menuItems.length, 0), 0)}
            </div>
            <div className="stat-label">Menu Items</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">4.5</div>
            <div className="stat-label">Avg Rating</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default VendorScreen;
