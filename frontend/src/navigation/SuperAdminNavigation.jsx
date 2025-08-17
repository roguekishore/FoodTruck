import React from 'react';
import { Crown, Users, Shield, Activity, Settings, LogOut } from 'lucide-react';
import '../css/Navigation.css';

const SuperAdminNavigation = ({ activeSection, setActiveSection, onLogout, user }) => {
  return (
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
            <span className="user-info">Super Admin: {user.name}</span>
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

export default SuperAdminNavigation;