import React, { useState, useEffect } from 'react';
import { Truck, Users, Menu, MapPin, Plus } from 'lucide-react';
import '../css/DynamicForm.css';

const DynamicForm = ({
  entityType,
  initialData = {},
  onSubmit,
  onCancel,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const loading = false; 
  
  const formConfigs = {
    brand: {
      title: 'Brand Form',
      icon: <Users />,
      fields: [
        {
          name: 'brandName',
          label: 'Brand Name',
          type: 'text',
          required: true,
          placeholder: 'Enter brand name',
        }
      ],
    },
    foodTruck: {
      title: 'Food Truck Form',
      icon: <Truck />,
      fields: [
        {
          name: 'operatingRegion',
          label: 'Operating Region',
          type: 'text',
          required: true,
          placeholder: 'Enter operating region',
        },
        {
          name: 'location',
          label: 'Current Location',
          type: 'text',
          required: false,
          placeholder: 'Enter current location',
          icon: <MapPin />,
        },
        {
          name: 'cuisineSpecialties',
          label: 'Cuisine Specialties',
          type: 'text',
          required: false,
          placeholder: 'Enter specialties',
        },
      ],
    },
    menuItem: {
      title: 'Menu Item Form',
      icon: <Menu />,
      fields: [
        {
          name: 'name',
          label: 'Item Name',
          type: 'text',
          required: true,
          placeholder: 'Enter item name',
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          required: true,
          placeholder: 'Enter price',
          min: 0,
          step: 0.01,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: false,
          placeholder: 'Enter item description',
        }
      ],
    },
  };

  const config = formConfigs[entityType] || {
    title: 'Form',
    fields: [],
  };

  useEffect(() => {
    const initialFormData = {};
    config.fields.forEach((field) => {
      if (field.required && !initialData[field.name]) {
        initialFormData[field.name] = '';
      }
    });
    setFormData({ ...initialFormData, ...initialData });
  }, [entityType, initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    config.fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <span className="header-icon">{config.icon}</span>
        <h2 className="form-title">{config.title}</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="form-body">
        {config.fields.map((field) => (
          <div key={field.name} className="form-field-group">
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required-star"> *</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                rows={3}
                className={`form-input form-textarea ${
                  errors[field.name] ? 'input-error' : ''
                }`}
              />
            ) : (
              <div className="input-with-icon">
                {field.icon && (
                  <span className="input-icon">
                    {field.icon}
                  </span>
                )}
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  min={field.min}
                  step={field.step}
                  className={`form-input ${
                    field.icon ? 'has-icon' : ''
                  } ${errors[field.name] ? 'input-error' : ''}`}
                />
              </div>
            )}
            
            {errors[field.name] && (
              <p className="error-message">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="button button-secondary"
              disabled={loading}
            >
              {cancelButtonText}
            </button>
          )}
          <button
            type="submit"
            className="button button-primary"
            disabled={loading}
          >
            {loading ? (
              'Processing...'
            ) : (
              <span className="button-content">
                <span className="button-icon"><Plus /></span>
                {submitButtonText}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
