import React, { useState } from 'react';
import VendorScreen from '../comps/VendorScreen';
import BrandsSection from '../comps/BrandsSection';
import FoodTrucksSection from '../comps/TrucksSection';
import MenuItemsSection from '../comps/MenuSection';
import VendorNavigation from '../navigation/VendorNavigation';
import { ApiProvider } from '../context/ApiContext';
// import './App.css';

const FoodTruckVendorApp = ({ user, onLogout, onProfileUpdate }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedFoodTruck, setSelectedFoodTruck] = useState(null);

  const handleNavLinkClick = (section) => {
    setActiveSection(section);
    setSelectedBrand(null);
    setSelectedFoodTruck(null);
  };

  const handleLogout = () => {
    // Reset local state
    setActiveSection('home');
    setSelectedBrand(null);
    setSelectedFoodTruck(null);
    
    // Call parent logout handler
    onLogout();
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

  return (
    <ApiProvider>
      <div>
        <VendorNavigation
          activeSection={activeSection}
          setActiveSection={handleNavLinkClick}
          onLogout={handleLogout}
          onProfileUpdate={onProfileUpdate}
          user={user}
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