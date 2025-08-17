import React, { useState } from 'react';
import InspectorNavigation from '../navigation/InspectorNavigation';
// import { InspectorApiProvider } from './context/InspectorApiContext'; // Placeholder for future

const InspectorApp = ({ user, onLogout }) => {
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
        return <InspectorDashboard />;
      case 'tasks':
        return <AssignedTasks />;
      case 'locations':
        return <InspectionLocations />;
      case 'reports':
        return <InspectionReports />;
      default:
        return <InspectorDashboard />;
    }
  };

  return (
    // <InspectorApiProvider> // Uncomment when InspectorApiProvider is ready
    <div>
      <InspectorNavigation
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
    // </InspectorApiProvider>
  );
};

// Placeholder components for inspector functionality
const InspectorDashboard = () => (
  <div className="dashboard">
    <h1>Inspector Dashboard</h1>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Assigned Tasks</h3>
        <p className="stat-number">8</p>
      </div>
      <div className="stat-card">
        <h3>Completed Today</h3>
        <p className="stat-number">3</p>
      </div>
      <div className="stat-card">
        <h3>Pending Reports</h3>
        <p className="stat-number">2</p>
      </div>
      <div className="stat-card">
        <h3>Success Rate</h3>
        <p className="stat-number">92%</p>
      </div>
    </div>
    <div className="today-schedule">
      <h2>Today's Schedule</h2>
      <div className="schedule-item">
        <div className="time">09:00 AM</div>
        <div className="task">Inspect John's Food Truck - Downtown Location</div>
        <div className="status pending">Pending</div>
      </div>
      <div className="schedule-item">
        <div className="time">11:30 AM</div>
        <div className="task">Inspect Maria's Tacos - Westside Location</div>
        <div className="status completed">Completed</div>
      </div>
      <div className="schedule-item">
        <div className="time">02:00 PM</div>
        <div className="task">Inspect Bob's Burgers - Mall Food Court</div>
        <div className="status pending">Pending</div>
      </div>
    </div>
  </div>
);

const AssignedTasks = () => (
  <div className="assigned-tasks">
    <h1>Assigned Inspection Tasks</h1>
    <div className="tasks-list">
      <div className="task-card">
        <h3>John's Food Truck Inspection</h3>
        <p><strong>Location:</strong> Downtown Plaza, 123 Main St</p>
        <p><strong>Scheduled:</strong> Today, 09:00 AM</p>
        <p><strong>Type:</strong> Health & Safety Inspection</p>
        <div className="task-checklist">
          <h4>Inspection Checklist:</h4>
          <ul>
            <li>Food storage temperature</li>
            <li>Cleanliness and sanitation</li>
            <li>Equipment functionality</li>
            <li>Staff hygiene practices</li>
            <li>License and permits display</li>
          </ul>
        </div>
        <div className="task-actions">
          <button className="start-inspection-btn">Start Inspection</button>
          <button className="view-location-btn">View on Map</button>
        </div>
      </div>
      
      <div className="task-card">
        <h3>Bob's Burgers Inspection</h3>
        <p><strong>Location:</strong> City Mall Food Court, Level 2</p>
        <p><strong>Scheduled:</strong> Today, 02:00 PM</p>
        <p><strong>Type:</strong> Follow-up Inspection</p>
        <div className="task-checklist">
          <h4>Follow-up Items:</h4>
          <ul>
            <li>Verify previous violations corrected</li>
            <li>Check new equipment installation</li>
            <li>Review updated procedures</li>
          </ul>
        </div>
        <div className="task-actions">
          <button className="start-inspection-btn">Start Inspection</button>
          <button className="view-location-btn">View on Map</button>
        </div>
      </div>
      
      <div className="task-card">
        <h3>Pizza Express Inspection</h3>
        <p><strong>Location:</strong> University Campus, Building A</p>
        <p><strong>Scheduled:</strong> Tomorrow, 10:00 AM</p>
        <p><strong>Type:</strong> Initial License Inspection</p>
        <div className="task-checklist">
          <h4>Inspection Items:</h4>
          <ul>
            <li>Initial setup compliance</li>
            <li>Safety equipment installation</li>
            <li>Documentation review</li>
            <li>Staff training verification</li>
          </ul>
        </div>
        <div className="task-actions">
          <button className="view-details-btn">View Details</button>
          <button className="view-location-btn">View on Map</button>
        </div>
      </div>
    </div>
  </div>
);

const InspectionLocations = () => (
  <div className="inspection-locations">
    <h1>Inspection Locations</h1>
    <div className="map-placeholder">
      <div className="map-container">
        <p>[Interactive Map will be displayed here]</p>
        <p>Showing all inspection locations with status indicators</p>
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-color pending"></span>
            <span>Pending Inspection</span>
          </div>
          <div className="legend-item">
            <span className="legend-color completed"></span>
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <span className="legend-color overdue"></span>
            <span>Overdue</span>
          </div>
        </div>
      </div>
    </div>
    <div className="locations-list">
      <h2>Upcoming Locations</h2>
      <div className="location-item">
        <h3>Downtown Plaza</h3>
        <p><strong>Address:</strong> 123 Main St</p>
        <p><strong>Vendor:</strong> John's Food Truck</p>
        <p><strong>Next Inspection:</strong> Today 09:00 AM</p>
        <p><strong>Status:</strong> <span className="status-badge pending">Pending</span></p>
        <div className="location-actions">
          <button className="navigate-btn">Get Directions</button>
          <button className="contact-btn">Contact Vendor</button>
        </div>
      </div>
      
      <div className="location-item">
        <h3>City Mall Food Court</h3>
        <p><strong>Address:</strong> 456 Mall Blvd, Level 2</p>
        <p><strong>Vendor:</strong> Bob's Burgers</p>
        <p><strong>Next Inspection:</strong> Today 02:00 PM</p>
        <p><strong>Status:</strong> <span className="status-badge pending">Pending</span></p>
        <div className="location-actions">
          <button className="navigate-btn">Get Directions</button>
          <button className="contact-btn">Contact Vendor</button>
        </div>
      </div>
      
      <div className="location-item">
        <h3>University Campus</h3>
        <p><strong>Address:</strong> 789 College Ave, Building A</p>
        <p><strong>Vendor:</strong> Pizza Express</p>
        <p><strong>Next Inspection:</strong> Tomorrow 10:00 AM</p>
        <p><strong>Status:</strong> <span className="status-badge scheduled">Scheduled</span></p>
        <div className="location-actions">
          <button className="navigate-btn">Get Directions</button>
          <button className="contact-btn">Contact Vendor</button>
        </div>
      </div>
    </div>
  </div>
);

const InspectionReports = () => (
  <div className="inspection-reports">
    <h1>Inspection Reports</h1>
    <div className="report-actions">
      <button className="new-report-btn">Create New Report</button>
      <select className="report-filter">
        <option value="all">All Reports</option>
        <option value="pending">Pending Submission</option>
        <option value="submitted">Submitted</option>
        <option value="approved">Approved</option>
      </select>
      <input type="date" className="date-filter" />
    </div>
    
    <div className="reports-list">
      <div className="report-card">
        <h3>Maria's Tacos - Health Inspection</h3>
        <p><strong>Inspection Date:</strong> Today, 11:30 AM</p>
        <p><strong>Inspector:</strong> Current User</p>
        <p><strong>Status:</strong> <span className="status-badge completed">Completed</span></p>
        <p><strong>Result:</strong> Pass with minor violations</p>
        <div className="report-summary">
          <p><strong>Violations Found:</strong></p>
          <ul>
            <li>Hand washing station needs soap refill</li>
            <li>Temperature log needs updating</li>
          </ul>
          <p><strong>Score:</strong> 87/100</p>
        </div>
        <div className="report-actions">
          <button className="view-report-btn">View Full Report</button>
          <button className="submit-report-btn">Submit Report</button>
          <button className="print-report-btn">Print Report</button>
        </div>
      </div>
      
      <div className="report-card">
        <h3>Quick Bites - Follow-up Inspection</h3>
        <p><strong>Inspection Date:</strong> Yesterday</p>
        <p><strong>Inspector:</strong> Current User</p>
        <p><strong>Status:</strong> <span className="status-badge submitted">Submitted</span></p>
        <p><strong>Result:</strong> Pass - All violations corrected</p>
        <div className="report-summary">
          <p><strong>Previous Issues Resolved:</strong></p>
          <ul>
            <li>✓ Food storage temperature maintained</li>
            <li>✓ Hand washing station properly stocked</li>
            <li>✓ Equipment cleaned and sanitized</li>
          </ul>
          <p><strong>Score:</strong> 95/100</p>
        </div>
        <div className="report-actions">
          <button className="view-report-btn">View Full Report</button>
          <button className="print-report-btn">Print Report</button>
        </div>
      </div>
      
      <div className="report-card">
        <h3>Taco Supreme - Initial Inspection</h3>
        <p><strong>Inspection Date:</strong> 3 days ago</p>
        <p><strong>Inspector:</strong> Current User</p>
        <p><strong>Status:</strong> <span className="status-badge approved">Approved</span></p>
        <p><strong>Result:</strong> Pass - Ready for operation</p>
        <div className="report-summary">
          <p><strong>All Requirements Met:</strong></p>
          <ul>
            <li>✓ All safety equipment installed</li>
            <li>✓ Staff properly trained</li>
            <li>✓ All permits and licenses verified</li>
          </ul>
          <p><strong>Score:</strong> 98/100</p>
        </div>
        <div className="report-actions">
          <button className="view-report-btn">View Full Report</button>
          <button className="print-report-btn">Print Report</button>
        </div>
      </div>
    </div>
  </div>
);

export default InspectorApp;