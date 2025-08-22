import React, { useState } from 'react';
import { Shield, User, LogOut } from 'lucide-react';
import EditProfile from '../components/EditProfile';
import '../css/Navigation.css';

const SuperAdminNavigation = ({ activeSection, setActiveSection, onLogout, onProfileUpdate, user }) => {
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
            <Shield className="truck-icon" />
            <span>Super Admin</span>
          </div>
          <div className="nav-links">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`nav-link ${activeSection === 'dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection('users')}
              className={`nav-link ${activeSection === 'users' ? 'active' : ''}`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveSection('admin-requests')}
              className={`nav-link ${activeSection === 'admin-requests' ? 'active' : ''}`}
            >
              Admin Requests
            </button>
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
          userType="user"
          onSave={handleProfileUpdate}
          onCancel={() => setShowEditProfile(false)}
        />
      )}
    </>
  );
};

export default SuperAdminNavigation;