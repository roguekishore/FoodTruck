import React, { useState } from 'react';
import { Truck, LogOut, User } from 'lucide-react';
import EditProfile from '../components/EditProfile';
import '../css/Navigation.css';

const VendorNavigation = ({ activeSection, setActiveSection, onLogout, onProfileUpdate, user }) => {
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleProfileUpdate = (updatedUser) => {
    setShowEditProfile(false);
    
    // Call the onProfileUpdate callback to update the parent state
    if (onProfileUpdate) {
      onProfileUpdate(updatedUser);
    }
  };

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <div className="nav-brand">
            <Truck className="truck-icon" />
            <span>Vendor</span>
          </div>
          <div className="nav-links">
            {['home', 'brands', 'trucks', 'menu'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
          {user && (
            <div className="nav-user">
              <button 
                onClick={() => setShowEditProfile(true)} 
                className="profile-btn"
                title="Edit Profile"
              >
                <User size={18} className="profile-icon" />
              </button>
              <button 
                onClick={onLogout} 
                className="logout-btn"
                title="Logout"
              >
                <LogOut size={18} className="logout-icon" />
              </button>
            </div>
          )}
        </div>
      </nav>
      
      {showEditProfile && (
        <EditProfile
          user={user}
          userType="vendor"
          onSave={handleProfileUpdate}
          onCancel={() => setShowEditProfile(false)}
        />
      )}
    </>
  );
};

export default VendorNavigation;