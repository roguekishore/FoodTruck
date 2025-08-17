import React from 'react';
import { Clipboard, Calendar, MapPin, FileText, LogOut } from 'lucide-react';
import '../css/Navigation.css';

const InspectorNavigation = ({ activeSection, setActiveSection, onLogout, user }) => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Clipboard className="truck-icon" />
          <span>FoodTruck Pro - Inspector</span>
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
            <span className="user-info">Inspector: {user.name}</span>
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

export default InspectorNavigation;