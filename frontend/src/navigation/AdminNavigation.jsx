import React from 'react';
import { Shield, Users, MapPin, FileText, LogOut, Search } from 'lucide-react';
import '../css/Navigation.css';

const AdminNavigation = ({ activeSection, setActiveSection, onLogout, user }) => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Shield className="truck-icon" />
          <span>Admin</span>
        </div>
        <div className="nav-links">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: FileText },
            { key: 'reviewers', label: 'Assign Reviewers', icon: Users },
            { key: 'inspectors', label: 'Assign Inspectors', icon: Search },
            { key: 'regions', label: 'Regional View', icon: MapPin },
            { key: 'applications', label: 'Applications', icon: FileText }
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
            {/* <span className="user-info">Admin: {user.name}</span> */}
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

export default AdminNavigation;