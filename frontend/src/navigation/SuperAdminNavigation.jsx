import React, { useState } from 'react';
import EditProfile from '../components/EditProfile';
import '../css/Navigation.css';

const SuperAdminNavigation = ({ activeSection, setActiveSection, onLogout, onProfileUpdate, user }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleProfileUpdate = (updatedUser) => {
    onProfileUpdate(updatedUser);
    setShowProfileModal(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>FoodTruck Super Admin</h2>
        </div>
        <ul className="nav-menu">
          <li className={activeSection === 'dashboard' ? 'active' : ''}>
            <a onClick={() => setActiveSection('dashboard')}>
              Dashboard
            </a>
          </li>
          <li className={activeSection === 'users' ? 'active' : ''}>
            <a onClick={() => setActiveSection('users')}>
              User Management
            </a>
          </li>
          <li className={activeSection === 'admin-requests' ? 'active' : ''}>
            <a onClick={() => setActiveSection('admin-requests')}>
              Admin Requests
            </a>
          </li>
        </ul>
        <div className="nav-user">
          <span className="user-name" onClick={handleProfileClick}>
            {user.name}
          </span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
      
      {showProfileModal && (
        <EditProfile
          user={user}
          onClose={() => setShowProfileModal(false)}
          onSave={handleProfileUpdate}
        />
      )}
    </nav>
  );
};

export default SuperAdminNavigation;