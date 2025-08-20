import React, { useState } from 'react';
import SuperAdminNavigation from '../navigation/SuperAdminNavigation';
// import { SuperAdminApiProvider } from './context/SuperAdminApiContext'; // Placeholder for future

const SuperAdminApp = ({ user, onLogout, onProfileUpdate }) => {
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
        return <SuperAdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManagement />;
      case 'audit':
        return <AuditLogs />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <SuperAdminDashboard />;
    }
  };

  return (
    // <SuperAdminApiProvider> // Uncomment when SuperAdminApiProvider is ready
    <div>
      <SuperAdminNavigation
        activeSection={activeSection}
        setActiveSection={handleNavLinkClick}
        onLogout={handleLogout}
        onProfileUpdate={onProfileUpdate}
        user={user}
      />
      <div className='app-wrapper'>
        <div className="app-container">
          {renderContent()}
        </div>
      </div>
    </div>
    // </SuperAdminApiProvider>
  );
};

// Placeholder components for super admin functionality
const SuperAdminDashboard = () => (
  <div className="dashboard">
    <h1>Super Admin Dashboard</h1>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Users</h3>
        <p className="stat-number">156</p>
      </div>
      <div className="stat-card">
        <h3>Active Sessions</h3>
        <p className="stat-number">42</p>
      </div>
      <div className="stat-card">
        <h3>System Health</h3>
        <p className="stat-number">98%</p>
      </div>
      <div className="stat-card">
        <h3>Security Alerts</h3>
        <p className="stat-number critical">3</p>
      </div>
    </div>
    <div className="system-overview">
      <h2>System Overview</h2>
      <div className="overview-grid">
        <div className="overview-item">
          <h3>Recent Security Events</h3>
          <div className="security-event">
            <p>Failed login attempts from IP: 192.168.1.100</p>
            <span className="event-time">5 minutes ago</span>
          </div>
          <div className="security-event">
            <p>New user registration: reviewer@company.com</p>
            <span className="event-time">1 hour ago</span>
          </div>
          <div className="security-event">
            <p>Role change: John Doe promoted to Admin</p>
            <span className="event-time">2 hours ago</span>
          </div>
        </div>
        <div className="overview-item">
          <h3>System Performance</h3>
          <div className="performance-metric">
            <span>CPU Usage:</span>
            <span className="metric-value">65%</span>
          </div>
          <div className="performance-metric">
            <span>Memory Usage:</span>
            <span className="metric-value">78%</span>
          </div>
          <div className="performance-metric">
            <span>Database Response:</span>
            <span className="metric-value">120ms</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UserManagement = () => (
  <div className="user-management">
    <h1>User Management</h1>
    <div className="user-actions">
      <button className="add-user-btn">Add New User</button>
      <input type="text" placeholder="Search users..." className="user-search" />
      <select className="role-filter">
        <option value="all">All Roles</option>
        <option value="VENDOR">Vendors</option>
        <option value="ADMIN">Admins</option>
        <option value="INSPECTOR">Inspectors</option>
        <option value="REVIEWER">Reviewers</option>
      </select>
    </div>
    <div className="users-table">
      <div className="table-header">
        <span>Name</span>
        <span>Email</span>
        <span>Role</span>
        <span>Status</span>
        <span>Last Login</span>
        <span>Actions</span>
      </div>
      <div className="table-row">
        <span>John Doe</span>
        <span>john@example.com</span>
        <span className="role-badge admin">ADMIN</span>
        <span className="status-badge active">Active</span>
        <span>2 hours ago</span>
        <div className="user-actions">
          <button className="edit-btn">Edit</button>
          <button className="suspend-btn">Suspend</button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
      <div className="table-row">
        <span>Sarah Johnson</span>
        <span>sarah@example.com</span>
        <span className="role-badge reviewer">REVIEWER</span>
        <span className="status-badge active">Active</span>
        <span>1 day ago</span>
        <div className="user-actions">
          <button className="edit-btn">Edit</button>
          <button className="suspend-btn">Suspend</button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
      <div className="table-row">
        <span>Mike Chen</span>
        <span>mike@example.com</span>
        <span className="role-badge inspector">INSPECTOR</span>
        <span className="status-badge suspended">Suspended</span>
        <span>1 week ago</span>
        <div className="user-actions">
          <button className="edit-btn">Edit</button>
          <button className="activate-btn">Activate</button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
);

const RoleManagement = () => (
  <div className="role-management">
    <h1>Role Management</h1>
    <div className="roles-grid">
      <div className="role-card">
        <h3>VENDOR</h3>
        <p><strong>Users:</strong> 48</p>
        <p><strong>Permissions:</strong></p>
        <ul>
          <li>Manage own brands</li>
          <li>Manage food trucks</li>
          <li>Update menu items</li>
          <li>View inspection reports</li>
        </ul>
        <button className="edit-permissions-btn">Edit Permissions</button>
      </div>
      <div className="role-card">
        <h3>ADMIN</h3>
        <p><strong>Users:</strong> 8</p>
        <p><strong>Permissions:</strong></p>
        <ul>
          <li>Assign reviewers</li>
          <li>View regional data</li>
          <li>Manage applications</li>
          <li>Generate reports</li>
        </ul>
        <button className="edit-permissions-btn">Edit Permissions</button>
      </div>
      <div className="role-card">
        <h3>INSPECTOR</h3>
        <p><strong>Users:</strong> 12</p>
        <p><strong>Permissions:</strong></p>
        <ul>
          <li>View assigned tasks</li>
          <li>Submit inspection reports</li>
          <li>Access location data</li>
          <li>Update inspection status</li>
        </ul>
        <button className="edit-permissions-btn">Edit Permissions</button>
      </div>
      <div className="role-card">
        <h3>REVIEWER</h3>
        <p><strong>Users:</strong> 6</p>
        <p><strong>Permissions:</strong></p>
        <ul>
          <li>Review applications</li>
          <li>Approve/reject documents</li>
          <li>Request changes</li>
          <li>Generate review reports</li>
        </ul>
        <button className="edit-permissions-btn">Edit Permissions</button>
      </div>
    </div>
  </div>
);

const AuditLogs = () => (
  <div className="audit-logs">
    <h1>Audit Logs</h1>
    <div className="audit-filters">
      <select className="action-filter">
        <option value="all">All Actions</option>
        <option value="login">Login Attempts</option>
        <option value="role_change">Role Changes</option>
        <option value="data_access">Data Access</option>
        <option value="system_change">System Changes</option>
      </select>
      <select className="user-filter">
        <option value="all">All Users</option>
        <option value="admin">Admins</option>
        <option value="suspicious">Suspicious Activity</option>
      </select>
      <input type="date" className="date-filter" />
    </div>
    <div className="logs-table">
      <div className="log-entry suspicious">
        <div className="log-time">2024-01-15 14:32:15</div>
        <div className="log-user">unknown@suspicious.com</div>
        <div className="log-action">Failed Login Attempt</div>
        <div className="log-details">Multiple failed attempts from IP: 192.168.1.100</div>
        <div className="log-severity critical">Critical</div>
      </div>
      <div className="log-entry">
        <div className="log-time">2024-01-15 14:20:05</div>
        <div className="log-user">admin@company.com</div>
        <div className="log-action">Role Change</div>
        <div className="log-details">Changed user John Doe role from REVIEWER to ADMIN</div>
        <div className="log-severity normal">Normal</div>
      </div>
      <div className="log-entry">
        <div className="log-time">2024-01-15 13:45:22</div>
        <div className="log-user">reviewer@company.com</div>
        <div className="log-action">Document Access</div>
        <div className="log-details">Accessed vendor application documents for review</div>
        <div className="log-severity normal">Normal</div>
      </div>
      <div className="log-entry">
        <div className="log-time">2024-01-15 12:15:33</div>
        <div className="log-user">super.admin@company.com</div>
        <div className="log-action">System Configuration</div>
        <div className="log-details">Modified system security settings</div>
        <div className="log-severity high">High</div>
      </div>
    </div>
  </div>
);

const SystemSettings = () => (
  <div className="system-settings">
    <h1>System Settings</h1>
    <div className="settings-sections">
      <div className="settings-section">
        <h2>Security Settings</h2>
        <div className="setting-item">
          <label>Password Policy</label>
          <select>
            <option value="basic">Basic (8 characters)</option>
            <option value="medium">Medium (12 characters + symbols)</option>
            <option value="strong">Strong (16 characters + complexity)</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Session Timeout (minutes)</label>
          <input type="number" value="30" min="15" max="240" />
        </div>
        <div className="setting-item">
          <label>Two-Factor Authentication</label>
          <input type="checkbox" checked /> Enabled
        </div>
      </div>
      <div className="settings-section">
        <h2>Application Settings</h2>
        <div className="setting-item">
          <label>Max Application Review Time (days)</label>
          <input type="number" value="7" min="1" max="30" />
        </div>
        <div className="setting-item">
          <label>Auto-assign Reviewers</label>
          <input type="checkbox" checked /> Enabled
        </div>
        <div className="setting-item">
          <label>Inspection Reminder Days</label>
          <input type="number" value="3" min="1" max="14" />
        </div>
      </div>
      <div className="settings-section">
        <h2>System Maintenance</h2>
        <div className="setting-item">
          <label>Database Backup Schedule</label>
          <select>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Log Retention Period (days)</label>
          <input type="number" value="90" min="30" max="365" />
        </div>
        <button className="maintenance-btn">Run System Diagnostics</button>
      </div>
    </div>
    <div className="settings-actions">
      <button className="save-settings-btn">Save All Settings</button>
      <button className="reset-settings-btn">Reset to Defaults</button>
    </div>
  </div>
);

export default SuperAdminApp;