import React, { useState } from 'react';
import { Plus, Truck, Users, Menu, MapPin, Star, Clock, Edit, Trash2 } from 'lucide-react';
import './index.css';

const FoodTruckVendorApp = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [brands, setBrands] = useState([
    {
      id: 1,
      name: 'Tasty Bites Co.',
      description: 'Gourmet burgers and fries',
      logo: null,
      established: '2020',
      foodTrucks: [
        {
          id: 1,
          name: 'Burger Master',
          location: 'Downtown Plaza',
          status: 'active',
          rating: 4.5,
          menuItems: [
            { id: 1, name: 'Classic Burger', price: 12.99, category: 'Burgers' },
            { id: 2, name: 'Cheese Fries', price: 6.99, category: 'Sides' }
          ]
        }
      ]
    }
  ]);

  const [showBrandForm, setShowBrandForm] = useState(false);
  const [showTruckForm, setShowTruckForm] = useState(false);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedTruckId, setSelectedTruckId] = useState(null);

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white shadow-lg mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-800">FoodTruck Pro</span>
          </div>
          <div className="flex space-x-6">
            {['home', 'brands', 'trucks', 'menu'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === section
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  // Home Screen Component
  const HomeScreen = () => (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 mb-12 text-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">Welcome to FoodTruck Pro</h1>
            <p className="text-xl mb-8 leading-relaxed">
              The ultimate platform for food truck vendors to manage their brands, 
              trucks, and menu items all in one place. Streamline your operations 
              and grow your mobile food business with our intuitive management tools.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveSection('brands')}
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Manage Brands
              </button>
              <button 
                onClick={() => setActiveSection('trucks')}
                className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                View Trucks
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white/20 rounded-2xl p-8 backdrop-blur-sm">
              <Truck className="h-32 w-32 text-white mx-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Users className="h-12 w-12 text-orange-600 mb-4" />
          <h3 className="text-xl font-bold mb-3">Brand Management</h3>
          <p className="text-gray-600">Create and manage multiple brands under your vendor account. Each brand can have its own identity and food trucks.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Truck className="h-12 w-12 text-orange-600 mb-4" />
          <h3 className="text-xl font-bold mb-3">Fleet Control</h3>
          <p className="text-gray-600">Monitor and manage your food trucks, track locations, and oversee operations across all your mobile units.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Menu className="h-12 w-12 text-orange-600 mb-4" />
          <h3 className="text-xl font-bold mb-3">Menu System</h3>
          <p className="text-gray-600">Design and update menus for each food truck with pricing, categories, and detailed item descriptions.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Quick Stats</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{brands.length}</div>
            <div className="text-gray-600">Active Brands</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {brands.reduce((total, brand) => total + brand.foodTrucks.length, 0)}
            </div>
            <div className="text-gray-600">Food Trucks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {brands.reduce((total, brand) => 
                total + brand.foodTrucks.reduce((truckTotal, truck) => 
                  truckTotal + truck.menuItems.length, 0), 0)}
            </div>
            <div className="text-gray-600">Menu Items</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.5</div>
            <div className="text-gray-600">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Generic Form Component
  const FormModal = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  // Brands Section
  const BrandsSection = () => (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Brands</h2>
        <button
          onClick={() => setShowBrandForm(true)}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Brand</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-24"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
              <p className="text-gray-600 mb-4">{brand.description}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Est. {brand.established}</span>
                <span>{brand.foodTrucks.length} Trucks</span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-orange-100 text-orange-600 py-2 px-4 rounded-lg hover:bg-orange-200 transition-colors">
                  <Edit className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
                <button className="flex-1 bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors">
                  <Trash2 className="h-4 w-4 inline mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FormModal 
        title="Add New Brand" 
        isOpen={showBrandForm} 
        onClose={() => setShowBrandForm(false)}
      >
        <div className="space-y-4">
          <p className="text-gray-600">Form fields will be added here based on your entity structure.</p>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowBrandForm(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button 
              onClick={() => setShowBrandForm(false)}
              className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
            >
              Create Brand
            </button>
          </div>
        </div>
      </FormModal>
    </div>
  );

  // Food Trucks Section
  const TrucksSection = () => (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Food Trucks</h2>
        <button
          onClick={() => setShowTruckForm(true)}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Food Truck</span>
        </button>
      </div>

      <div className="space-y-6">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-orange-600">{brand.name}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brand.foodTrucks.map((truck) => (
                <div key={truck.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg">{truck.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      truck.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {truck.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{truck.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{truck.rating}/5.0</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Menu className="h-4 w-4" />
                      <span>{truck.menuItems.length} menu items</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-orange-100 text-orange-600 py-2 px-3 rounded-lg text-sm hover:bg-orange-200">
                      Edit
                    </button>
                    <button className="flex-1 bg-blue-100 text-blue-600 py-2 px-3 rounded-lg text-sm hover:bg-blue-200">
                      View Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <FormModal 
        title="Add New Food Truck" 
        isOpen={showTruckForm} 
        onClose={() => setShowTruckForm(false)}
      >
        <div className="space-y-4">
          <p className="text-gray-600">Form fields will be added here. Include brand selection dropdown.</p>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowTruckForm(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button 
              onClick={() => setShowTruckForm(false)}
              className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
            >
              Create Truck
            </button>
          </div>
        </div>
      </FormModal>
    </div>
  );

  // Menu Items Section
  const MenuSection = () => (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Menu Management</h2>
        <button
          onClick={() => setShowMenuForm(true)}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Menu Item</span>
        </button>
      </div>

      <div className="space-y-8">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-orange-600">{brand.name}</h3>
            {brand.foodTrucks.map((truck) => (
              <div key={truck.id} className="mb-6 last:mb-0">
                <div className="flex items-center space-x-3 mb-4">
                  <Truck className="h-5 w-5 text-gray-600" />
                  <h4 className="text-lg font-semibold">{truck.name}</h4>
                  <span className="text-sm text-gray-500">({truck.menuItems.length} items)</span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ml-8">
                  {truck.menuItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold">{item.name}</h5>
                        <span className="text-orange-600 font-bold">${item.price}</span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <div className="flex space-x-2 mt-3">
                        <button className="flex-1 text-sm bg-orange-100 text-orange-600 py-1 px-3 rounded hover:bg-orange-200">
                          Edit
                        </button>
                        <button className="flex-1 text-sm bg-red-100 text-red-600 py-1 px-3 rounded hover:bg-red-200">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <FormModal 
        title="Add Menu Item" 
        isOpen={showMenuForm} 
        onClose={() => setShowMenuForm(false)}
      >
        <div className="space-y-4">
          <p className="text-gray-600">Form fields will be added here. Include brand and truck selection dropdowns.</p>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowMenuForm(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button 
              onClick={() => setShowMenuForm(false)}
              className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
            >
              Add Item
            </button>
          </div>
        </div>
      </FormModal>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {activeSection === 'home' && <HomeScreen />}
      {activeSection === 'brands' && <BrandsSection />}
      {activeSection === 'trucks' && <TrucksSection />}
      {activeSection === 'menu' && <MenuSection />}
    </div>
  );
};

export default FoodTruckVendorApp;