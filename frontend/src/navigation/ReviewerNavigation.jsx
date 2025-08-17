import React from 'react';
import { FileCheck, Inbox, CheckCircle, XCircle, LogOut } from 'lucide-react';
import '../css/Navigation.css';

const ReviewerNavigation = ({ activeSection, setActiveSection, onLogout, user }) => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <FileCheck className="truck-icon" />
          <span>FoodTruck Pro - Reviewer</span>
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
            <span className="user-info">Reviewer: {user.name}</span>
            <button onClick={onLogout} className="logout-btn">
              <LogOut size={18} className="logout-icon" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ReviewerNavigation;