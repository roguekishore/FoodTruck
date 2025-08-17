import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Utensils } from 'lucide-react';
import FormModal from './FormModal';
import DynamicForm from './DynamicForm';
import { useApi } from '../context/ApiContext';
import '../css/TrucksSection.css'

const TrucksSection = ({ brand, onSelectFoodTruck, onBack }) => {
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [showFoodTruckForm, setShowFoodTruckForm] = useState(false);
  const [currentFoodTruck, setCurrentFoodTruck] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { getFoodTrucksByBrand, createFoodTruck, updateFoodTruck, deleteFoodTruck } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFoodTrucks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const trucks = await getFoodTrucksByBrand(brand.id);
      setFoodTrucks(trucks);
    } catch (err) {
      setError('Failed to fetch food trucks.');
      console.error('Failed to fetch food trucks:', err);
    } finally {
      setLoading(false);
    }
  }, [getFoodTrucksByBrand, brand.id]);

  useEffect(() => {
    fetchFoodTrucks();
  }, [fetchFoodTrucks]);

  const handleCreateFoodTruck = async (formData) => {
    setLoading(true);
    try {
      const newTruck = await createFoodTruck(brand.id, formData);
      setFoodTrucks(prev => [...prev, newTruck]);
      setShowFoodTruckForm(false);
    } catch (err) {
      setError('Failed to create food truck.');
      console.error('Failed to create food truck:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFoodTruck = async (formData) => {
    setLoading(true);
    try {
      const updatedTruck = await updateFoodTruck(currentFoodTruck.id, formData);
      setFoodTrucks(prev => prev.map(truck =>
        truck.id === currentFoodTruck.id ? updatedTruck : truck
      ));
      setShowFoodTruckForm(false);
      setCurrentFoodTruck(null);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update food truck.');
      console.error('Failed to update food truck:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFoodTruck = async (truckId) => {
    if (window.confirm('Are you sure you want to delete this food truck?')) {
      setLoading(true);
      try {
        await deleteFoodTruck(truckId);
        setFoodTrucks(prev => prev.filter(truck => truck.id !== truckId));
      } catch (err) {
        setError('Failed to delete food truck.');
        console.error('Failed to delete food truck:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = (truck) => {
    setCurrentFoodTruck(truck);
    setIsEditing(true);
    setShowFoodTruckForm(true);
  };

  return (
    <div className="foodtrucks-container">
      <button onClick={onBack} className="back-btn">Back to Brands</button>
      <div className="foodtrucks-header">
        <h2>Food Trucks for {brand.brandName}</h2>
        <button
          onClick={() => {
            setCurrentFoodTruck(null);
            setIsEditing(false);
            setShowFoodTruckForm(true);
          }}
          className="add-foodtruck-btn"
          disabled={loading}
        >
          <Plus className="icon" />
          <span>Add Food Truck</span>
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading food trucks...</div>
      ) : (
        <div className="foodtrucks-grid">
          {foodTrucks.map((truck) => (
            <div key={truck.id} className="foodtruck-card">
              <div className="foodtruck-content">
                <h3>{truck.operatingRegion}</h3>
                <p>Location: {truck.location}</p>
                <div className="foodtruck-actions">
                  <button
                    className="view-menu-btn"
                    onClick={() => onSelectFoodTruck(truck)}
                    disabled={loading}
                  >
                    <Utensils className="icon" />
                    View Menu
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(truck)}
                    disabled={loading}
                  >
                    <Edit className="icon" />
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteFoodTruck(truck.id)}
                    disabled={loading}
                  >
                    <Trash2 className="icon" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormModal
        title={isEditing ? 'Edit Food Truck' : 'Add New Food Truck'}
        isOpen={showFoodTruckForm}
        onClose={() => {
          setShowFoodTruckForm(false);
          setCurrentFoodTruck(null);
          setIsEditing(false);
        }}
      >
        <DynamicForm
          entityType="foodTruck"
          initialData={currentFoodTruck || {}}
          onSubmit={isEditing ? handleUpdateFoodTruck : handleCreateFoodTruck}
          onCancel={() => {
            setShowFoodTruckForm(false);
            setCurrentFoodTruck(null);
            setIsEditing(false);
          }}
          submitButtonText={isEditing ? 'Update Food Truck' : 'Create Food Truck'}
        />
      </FormModal>
    </div>
  );
};

export default TrucksSection;