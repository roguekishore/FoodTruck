import React, { useState } from 'react';
import AdminNavigation from '../navigation/AdminNavigation';
// import { AdminApiProvider } from './context/AdminApiContext'; // Placeholder for future

const AdminApp = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleNavLinkClick = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    setActiveSection('dashboard');
    onLogout();
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'reviewers':
        return <AssignReviewers />;
      case 'regions':
        return <RegionalView />;
      case 'applications':
        return <ApplicationsManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    // <AdminApiProvider> // Uncomment when AdminApiProvider is ready
    <div>
      <AdminNavigation
        activeSection={activeSection}
        setActiveSection={handleNavLinkClick}
        onLogout={handleLogout}
        user={user}
      />
      <div className='app-wrapper'>
        <div className="app-container">
          {renderContent()}
        </div>
      </div>
    </div>
    // </AdminApiProvider>
  );
};

// Placeholder components for admin functionality
const AdminDashboard = () => (
  <div className="dashboard">
    <h1>Admin Dashboard</h1>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Pending Applications</h3>
        <p className="stat-number">12</p>
      </div>
      <div className="stat-card">
        <h3>Active Vendors</h3>
        <p className="stat-number">48</p>
      </div>
      <div className="stat-card">
        <h3>Reviewers Available</h3>
        <p className="stat-number">8</p>
      </div>
      <div className="stat-card">
        <h3>Regions Covered</h3>
        <p className="stat-number">15</p>
      </div>
    </div>
  </div>
);

const AssignReviewers = () => (
  <div className="assign-reviewers">
    <h1>Assign Reviewers to Vendor Applications</h1>
    <div className="applications-list">
      <div className="application-item">
        <h3>Vendor Application #001</h3>
        <p>Vendor: John's Food Truck</p>
        <p>Region: Downtown</p>
        <select className="reviewer-select">
          <option value="">Select Reviewer</option>
          <option value="1">Sarah Johnson</option>
          <option value="2">Mike Chen</option>
          <option value="3">Lisa Rodriguez</option>
        </select>
        <button className="assign-btn">Assign</button>
      </div>
      <div className="application-item">
        <h3>Vendor Application #002</h3>
        <p>Vendor: Maria's Tacos</p>
        <p>Region: Westside</p>
        <select className="reviewer-select">
          <option value="">Select Reviewer</option>
          <option value="1">Sarah Johnson</option>
          <option value="2">Mike Chen</option>
          <option value="3">Lisa Rodriguez</option>
        </select>
        <button className="assign-btn">Assign</button>
      </div>
    </div>
  </div>
);

const RegionalView = () => (
  <div className="regional-view">
    <h1>Vendors by Operating Region</h1>
    <div className="regions-grid">
      <div className="region-card">
        <h3>Downtown</h3>
        <p>Active Vendors: 12</p>
        <p>Pending Applications: 3</p>
        <button className="view-details-btn">View Details</button>
      </div>
      <div className="region-card">
        <h3>Westside</h3>
        <p>Active Vendors: 8</p>
        <p>Pending Applications: 2</p>
        <button className="view-details-btn">View Details</button>
      </div>
      <div className="region-card">
        <h3>Eastside</h3>
        <p>Active Vendors: 15</p>
        <p>Pending Applications: 4</p>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  </div>
);

const ApplicationsManagement = () => (
  <div className="applications-management">
    <h1>Vendor Applications Management</h1>
    <div className="filters">
      <select className="status-filter">
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <select className="region-filter">
        <option value="all">All Regions</option>
        <option value="downtown">Downtown</option>
        <option value="westside">Westside</option>
        <option value="eastside">Eastside</option>
      </select>
    </div>
    <div className="applications-table">
      <p>Applications list will be displayed here with search and filter capabilities.</p>
    </div>
  </div>
);

export default AdminApp;