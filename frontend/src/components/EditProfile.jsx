import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Save, X } from 'lucide-react';
import './EditProfile.css';

const EditProfile = ({ user, userType, onSave, onCancel }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const BASE_URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.id) {
        try {
          const endpoint = userType === 'vendor' 
            ? `${BASE_URL}/api/vendors/${user.id}`
            : `${BASE_URL}/api/users/${user.id}`;

          const response = await fetch(endpoint);
          if (response.ok) {
            const userData = await response.json();
            setProfileData({
              name: userData.name || '',
              email: userData.email || '',
              password: '',
              confirmPassword: ''
            });
          } else {
            // Fallback to user prop data
            let userEmail = user.email;
            if (!userEmail) {
              userEmail = localStorage.getItem('userEmail') || '';
            }
            
            setProfileData({
              name: user.name || '',
              email: userEmail,
              password: '',
              confirmPassword: ''
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Fallback to user prop data
          let userEmail = user.email;
          if (!userEmail) {
            userEmail = localStorage.getItem('userEmail') || '';
          }
          
          setProfileData({
            name: user.name || '',
            email: userEmail,
            password: '',
            confirmPassword: ''
          });
        }
      }
    };

    fetchUserData();
  }, [user, userType, BASE_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!profileData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!profileData.email.trim()) {
      setError('Email is required');
      return;
    }

    if (profileData.password && profileData.password !== profileData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        name: profileData.name,
        email: profileData.email
      };

      // Only include password if it's being changed
      if (profileData.password) {
        updateData.password = profileData.password;
      }

      const endpoint = userType === 'vendor' 
        ? `${BASE_URL}/api/vendors/${user.id}`
        : `${BASE_URL}/api/users/${user.id}`;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          throw new Error('A user with this email already exists');
        }
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedUser = await response.json();
      setSuccess('Profile updated successfully!');
      
      // Update localStorage with the new user data
      const storedUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const updatedUserInfo = { ...storedUserInfo, ...updatedUser };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      
      // Update the form data with the new user data
      setProfileData({
        name: updatedUser.name || '',
        email: updatedUser.email || '',
        password: '',
        confirmPassword: ''
      });
      
      // Call the onSave callback with updated user data
      if (onSave) {
        onSave(updatedUser);
      }

    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-modal">
        <div className="edit-profile-header">
          <h2>Edit Profile</h2>
          <button 
            className="close-btn" 
            onClick={onCancel}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-group">
            <label htmlFor="name">
              <User size={16} />
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={16} />
              New Password (leave blank to keep current)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={profileData.password}
              onChange={handleInputChange}
              placeholder="Enter new password"
            />
          </div>

          {profileData.password && (
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <Lock size={16} />
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={profileData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
              />
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              <Save size={16} />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
