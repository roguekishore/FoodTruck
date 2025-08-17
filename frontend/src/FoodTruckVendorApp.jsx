import React, { useState, useEffect } from 'react';
import VendorScreen from './comps/VendorScreen';
import BrandsSection from './comps/BrandsSection';
import FoodTrucksSection from './comps/TrucksSection';
import MenuItemsSection from './comps/MenuSection';
import Navigation from './comps/Navigation';
import Login from './comps/LoginPage';
import Register from './comps/RegisterPage';
import { ApiProvider } from './context/ApiContext';
import './App.css';

const FoodTruckVendorApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('vendorId'));
  const [showLogin, setShowLogin] = useState(true);
  const [vendorId, setVendorId] = useState(localStorage.getItem('vendorId'));
  const [activeSection, setActiveSection] = useState('home');

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedFoodTruck, setSelectedFoodTruck] = useState(null);

  const handleLogin = (vendorData) => {
    localStorage.setItem('vendorId', vendorData.id);
    localStorage.setItem('vendorName', vendorData.name);
    setVendorId(vendorData.id);
    setIsAuthenticated(true);
  };

  const handleRegister = (vendorData) => {
    localStorage.setItem('vendorId', vendorData.id);
    localStorage.setItem('vendorName', vendorData.name);
    setVendorId(vendorData.id);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('vendorId');
    localStorage.removeItem('vendorName');
    setVendorId(null);
    setIsAuthenticated(false);

    setShowLogin(true);
    setActiveSection('home');
    setSelectedBrand(null);
    setSelectedFoodTruck(null);
  };

  const switchToRegister = () => {
    setShowLogin(false);
  };

  const switchToLogin = () => {
    setShowLogin(true);
  };

  const handleNavLinkClick = (section) => {
    setActiveSection(section);
    setSelectedBrand(null);
    setSelectedFoodTruck(null);
  };

  const renderContent = () => {
    if (selectedFoodTruck) {
      return (
        <MenuItemsSection
          foodTruck={selectedFoodTruck}
          onBack={() => setSelectedFoodTruck(null)}
        />
      );
    }

    if (selectedBrand) {
      return (
        <FoodTrucksSection
          brand={selectedBrand}
          onSelectFoodTruck={setSelectedFoodTruck}
          onBack={() => setSelectedBrand(null)}
        />
      );
    }

    switch (activeSection) {
      case 'home':
        return <VendorScreen setActiveSection={setActiveSection} />;
      case 'brands':
        return <BrandsSection onSelectBrand={setSelectedBrand} />;
      case 'trucks':
        return <p>Select a brand from the "Brands" section to view its food trucks.</p>;
      case 'menu':
        return <p>Select a food truck to view its menu items.</p>;
      default:
        return <VendorScreen setActiveSection={setActiveSection} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container-wrapper">
        {showLogin ? (
          <Login
            onLogin={handleLogin}
            switchToRegister={switchToRegister}
          />
        ) : (
          <Register
            onRegister={handleRegister}
            switchToLogin={switchToLogin}
          />
        )}
      </div>
    );
  }

  return (
    <ApiProvider>
      <div>
        <Navigation
          activeSection={activeSection}
          setActiveSection={handleNavLinkClick}
          onLogout={handleLogout}
          vendorId={vendorId}
        />
        <div className='app-wrapper'>
          <div className="app-container">
            {renderContent()}
          </div>
        </div>
      </div>
    </ApiProvider>
  );
};

export default FoodTruckVendorApp;
