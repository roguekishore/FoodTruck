import React, { useState } from 'react';
import { FileCheck, Inbox, CheckCircle, XCircle, LogOut, User } from 'lucide-react';
import EditProfile from '../components/EditProfile';
import '../css/Navigation.css';

const ReviewerNavigation = ({ activeSection, setActiveSection, onLogout, onProfileUpdate, user }) => {
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
            <FileCheck className="truck-icon" />
            <span>Reviewer</span>
          </div>
          <div className="nav-links">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: Inbox },
              { key: 'pending', label: 'Pending Reviews', icon: FileCheck },
              { key: 'approved', label: 'Approved', icon: CheckCircle },
              { key: 'rejected', label: 'Rejected', icon: XCircle }
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

export default ReviewerNavigation;