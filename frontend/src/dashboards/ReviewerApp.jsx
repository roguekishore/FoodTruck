import React, { useState } from 'react';
import ReviewerNavigation from '../navigation/ReviewerNavigation';
// import { ReviewerApiProvider } from './context/ReviewerApiContext'; // Placeholder for future

const ReviewerApp = ({ user, onLogout }) => {
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
        return <ReviewerDashboard />;
      case 'pending':
        return <PendingReviews />;
      case 'approved':
        return <ApprovedApplications />;
      case 'rejected':
        return <RejectedApplications />;
      default:
        return <ReviewerDashboard />;
    }
  };

  return (
    // <ReviewerApiProvider> // Uncomment when ReviewerApiProvider is ready
    <div>
      <ReviewerNavigation
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
    // </ReviewerApiProvider>
  );
};

// Placeholder components for reviewer functionality
const ReviewerDashboard = () => (
  <div className="dashboard">
    <h1>Reviewer Dashboard</h1>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Pending Reviews</h3>
        <p className="stat-number">5</p>
      </div>
      <div className="stat-card">
        <h3>Completed This Week</h3>
        <p className="stat-number">12</p>
      </div>
      <div className="stat-card">
        <h3>Approval Rate</h3>
        <p className="stat-number">78%</p>
      </div>
      <div className="stat-card">
        <h3>Average Review Time</h3>
        <p className="stat-number">2.5 days</p>
      </div>
    </div>
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <div className="activity-item">
        <p>Reviewed application from John's Food Truck - Approved</p>
        <span className="activity-time">2 hours ago</span>
      </div>
      <div className="activity-item">
        <p>Reviewed application from Maria's Tacos - Requested changes</p>
        <span className="activity-time">1 day ago</span>
      </div>
    </div>
  </div>
);

const PendingReviews = () => (
  <div className="pending-reviews">
    <h1>Pending Document Reviews</h1>
    <div className="applications-list">
      <div className="application-card">
        <h3>Application #003 - Bob's Burgers</h3>
        <p><strong>Submitted:</strong> 2 days ago</p>
        <p><strong>Documents:</strong> Business License, Food Safety Certificate, Insurance</p>
        <div className="document-list">
          <div className="document-item">
            <span>Business License.pdf</span>
            <button className="view-doc-btn">View</button>
          </div>
          <div className="document-item">
            <span>Food Safety Cert.pdf</span>
            <button className="view-doc-btn">View</button>
          </div>
        </div>
        <div className="review-actions">
          <button className="approve-btn">Approve</button>
          <button className="reject-btn">Reject</button>
          <button className="request-changes-btn">Request Changes</button>
        </div>
      </div>
      <div className="application-card">
        <h3>Application #004 - Pizza Express</h3>
        <p><strong>Submitted:</strong> 1 day ago</p>
        <p><strong>Documents:</strong> Business License, Menu, Health Permit</p>
        <div className="document-list">
          <div className="document-item">
            <span>Business License.pdf</span>
            <button className="view-doc-btn">View</button>
          </div>
          <div className="document-item">
            <span>Menu.pdf</span>
            <button className="view-doc-btn">View</button>
          </div>
        </div>
        <div className="review-actions">
          <button className="approve-btn">Approve</button>
          <button className="reject-btn">Reject</button>
          <button className="request-changes-btn">Request Changes</button>
        </div>
      </div>
    </div>
  </div>
);

const ApprovedApplications = () => (
  <div className="approved-applications">
    <h1>Approved Applications</h1>
    <div className="applications-list">
      <div className="application-summary">
        <h3>Application #001 - John's Food Truck</h3>
        <p><strong>Approved:</strong> 3 days ago</p>
        <p><strong>Status:</strong> Documents verified</p>
        <button className="view-details-btn">View Details</button>
      </div>
      <div className="application-summary">
        <h3>Application #002 - Maria's Tacos</h3>
        <p><strong>Approved:</strong> 1 week ago</p>
        <p><strong>Status:</strong> All requirements met</p>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  </div>
);

const RejectedApplications = () => (
  <div className="rejected-applications">
    <h1>Rejected Applications</h1>
    <div className="applications-list">
      <div className="application-summary">
        <h3>Application #005 - Quick Bites</h3>
        <p><strong>Rejected:</strong> 2 days ago</p>
        <p><strong>Reason:</strong> Incomplete documentation</p>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  </div>
);

export default ReviewerApp;