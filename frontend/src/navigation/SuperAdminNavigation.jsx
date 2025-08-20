import React, { useState } from 'react';
import { Crown, Users, Shield, Activity, Settings, LogOut, User } from 'lucide-react';
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
            <Crown className="truck-icon" />
            <span>FoodTruck Pro - Super Admin</span>
          </div>
          <div className="nav-links">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: Activity },
              { key: 'users', label: 'User Management', icon: Users },
              { key: 'roles', label: 'Role Management', icon: Shield },
              { key: 'audit', label: 'Audit Logs', icon: Activity },
              { key: 'settings', label: 'System Settings', icon: Settings }
            ].map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`nav-link ${activeSection === section.key ? 'active' : ''}`}
              >
                <section.icon size={16} />
                {section.label}
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
          userType="user"
          onSave={handleProfileUpdate}
          onCancel={() => setShowEditProfile(false)}
        />
      )}
    </>
  );
};

export default SuperAdminNavigation;