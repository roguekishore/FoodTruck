import React, { useState } from 'react';
import { Clipboard, Calendar, MapPin, FileText, LogOut, User } from 'lucide-react';
import EditProfile from '../components/EditProfile';
import '../css/Navigation.css';

const InspectorNavigation = ({ activeSection, setActiveSection, onLogout, onProfileUpdate, user }) => {
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
            <Clipboard className="truck-icon" />
            <span>Inspector</span>
          </div>
          <div className="nav-links">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: Clipboard },
              { key: 'tasks', label: 'Assigned Tasks', icon: Calendar },
              { key: 'locations', label: 'Locations', icon: MapPin },
              { key: 'reports', label: 'Reports', icon: FileText }
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

export default InspectorNavigation;