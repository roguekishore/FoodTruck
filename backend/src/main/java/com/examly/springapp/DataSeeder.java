package com.examly.springapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.examly.springapp.model.Brand;
import com.examly.springapp.model.FoodTruck;
import com.examly.springapp.model.MenuItem;
import com.examly.springapp.model.Vendor;
import com.examly.springapp.service.BrandService;
import com.examly.springapp.service.FoodTruckService;
import com.examly.springapp.service.MenuItemService;
import com.examly.springapp.service.VendorService;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;

@Component
// public class DataSeeder implements CommandLineRunner {
public class DataSeeder {

    @Autowired
    private VendorService vendorService;
    @Autowired
    private BrandService brandService;
    @Autowired
    private FoodTruckService foodTruckService;
    @Autowired
    private MenuItemService menuItemService;

    // @Override
        // public void run(String... args) throws Exception {
    public void seedData() {
        System.out.println("Starting data seeding process...");

        Vendor vendor1 = seedVendor("Global Food Ventures", "9876543210", "demo@gmail.com", "123 Main Street, Chennai", "password");
        Vendor vendor2 = seedVendor("Metro Eats Group", "9988776655", "info@metroeats.com", "456 Side Street, Bangalore", "password");
        Vendor vendor3 = seedVendor("Street Foods Inc.", "9000000000", "support@streetfoods.com", "789 Park Avenue, Chennai", "password");
        Vendor vendor4 = seedVendor("The Gourmet Wagon", "9123456789", "contact@gourmetwagon.com", "1011 Highway, Bangalore", "password");
        Vendor vendor5 = seedVendor("Fusion Flavors Co.", "9234567890", "fusion@flavors.com", "1213 Lakeview Drive, Delhi", "password");

        if (vendor1 != null) {
            Brand brand = seedBrand("The Taco Stand", vendor1.getId());
            if (brand != null) {
                FoodTruck foodTruck = seedFoodTruck("Chennai", "Anna Nagar", "9988776655", "Mexican", "Tacos, Burritos, Quesadillas", brand.getId());
                if (foodTruck != null) {
                    seedMenuItems(foodTruck.getId());
                }
            }
        }
        
        if (vendor2 != null) {
            Brand brand = seedBrand("Burger Bliss", vendor2.getId());
            if (brand != null) {
                FoodTruck foodTruck = seedFoodTruck("Bangalore", "Koramangala", "9911223344", "American", "Classic Burgers, Shakes", brand.getId());
                if (foodTruck != null) {
                    seedMenuItems(foodTruck.getId());
                }
            }
        }
        
        if (vendor3 != null) {
            Brand brand = seedBrand("Curry Up!", vendor3.getId());
            if (brand != null) {
                FoodTruck foodTruck = seedFoodTruck("Chennai", "T. Nagar", "9900000000", "Indian", "Butter Chicken, Naan", brand.getId());
                if (foodTruck != null) {
                    seedMenuItems(foodTruck.getId());
                }
            }
        }
        
        if (vendor4 != null) {
            Brand brand = seedBrand("The Shawarma King", vendor4.getId());
            if (brand != null) {
                FoodTruck foodTruck = seedFoodTruck("Bangalore", "Whitefield", "9012345678", "Middle Eastern", "Chicken Shawarma, Falafel", brand.getId());
                if (foodTruck != null) {
                    seedMenuItems(foodTruck.getId());
                }
            }
        }
        
        if (vendor5 != null) {
            Brand brand = seedBrand("Asian Fusion Delights", vendor5.getId());
            if (brand != null) {
                FoodTruck foodTruck = seedFoodTruck("Delhi", "Connaught Place", "9111122222", "Asian, Thai", "Pad Thai, Drunken Noodles", brand.getId());
                if (foodTruck != null) {
                    seedMenuItems(foodTruck.getId());
                }
            }
        }
        
        System.out.println("Data seeding process complete.");
    }

    private Vendor seedVendor(String name, String phoneNumber, String emailId, String address, String password) {
        try {
            Vendor vendor = new Vendor();
            vendor.setName(name);
            vendor.setEmail(emailId);
            vendor.setPassword(password);
            Vendor savedVendor = vendorService.saveVendor(vendor);
            System.out.println("  - Vendor seeded: " + name + " (ID: " + savedVendor.getId() + ")");
            return savedVendor;
        } catch (Exception e) {
            System.err.println("  - Failed to seed vendor: " + name + ". Error: " + e.getMessage());
            return null;
        }
    }

    private Brand seedBrand(String brandName, Long vendorId) {
        try {
            Brand brand = new Brand();
            brand.setBrandName(brandName);
            Brand savedBrand = brandService.saveBrand(vendorId, brand);
            System.out.println("  - Brand seeded: " + brandName + " (Vendor ID: " + vendorId + ")");
            return savedBrand;
        } catch (Exception e) {
            System.err.println("  - Failed to seed brand: " + brandName + ". Error: " + e.getMessage());
            return null;
        }
    }

    private FoodTruck seedFoodTruck(String operatingRegion, String location, String phoneNumber, String cuisineSpecialties, String menuHighlights, Long brandId) {
        try {
            FoodTruck foodTruck = new FoodTruck();
            foodTruck.setOperatingRegion(operatingRegion);
            foodTruck.setLocation(location);
            foodTruck.setPhoneNumber(phoneNumber);
            foodTruck.setCuisineSpecialties(cuisineSpecialties);
            foodTruck.setMenuHighlights(menuHighlights);
            FoodTruck savedFoodTruck = foodTruckService.saveFoodTruck(brandId, foodTruck);
            System.out.println("  - FoodTruck seeded: " + savedFoodTruck.getLocation() + " (Brand ID: " + brandId + ")");
            return savedFoodTruck;
        } catch (Exception e) {
            System.err.println("  - Failed to seed food truck. Error: " + e.getMessage());
            return null;
        }
    }

    private void seedMenuItems(Long foodTruckId) {
        List<MenuItem> menuItems = Arrays.asList(
            createMenuItem("Classic Burger", 9.50, "A juicy beef patty with lettuce, tomato, and onion on a toasted bun."),
            createMenuItem("Spicy Veggie Wrap", 8.25, "A spinach tortilla with spicy hummus, avocado, and fresh veggies."),
            createMenuItem("Sweet Potato Fries", 4.50, "Crispy sweet potato fries served with a side of chipotle mayo."),
            createMenuItem("Chicken Tacos", 11.00, "Three grilled chicken tacos topped with pico de gallo and sour cream."),
            createMenuItem("Cheese Quesadilla", 6.75, "Melted cheese in a warm flour tortilla, served with guacamole."),
            createMenuItem("Lemonade", 2.50, "Freshly squeezed lemonade."),
            createMenuItem("Onion Rings", 3.50, "Golden fried onion rings served with a tangy dipping sauce."),
            createMenuItem("Classic Margherita Pizza", 12.00, "Classic pizza with fresh mozzarella, tomatoes, and basil."),
            createMenuItem("Pad Thai Noodles", 10.50, "Stir-fried rice noodles with shrimp, chicken, peanuts, and lime."),
            createMenuItem("Butter Chicken", 15.00, "Tender chicken cooked in a creamy tomato sauce, served with naan."),
            createMenuItem("Chocolate Brownie", 5.00, "Rich and fudgy chocolate brownie."),
            createMenuItem("Mineral Water", 1.50, "Bottled mineral water.")
        );

        for (MenuItem item : menuItems) {
            try {
                menuItemService.saveMenuItem(foodTruckId, item);
                System.out.println("    - Menu item seeded: " + item.getName() + " (FoodTruck ID: " + foodTruckId + ")");
            } catch (Exception e) {
                System.err.println("    - Failed to seed menu item: " + item.getName() + ". Error: " + e.getMessage());
            }
        }
    }
    
    private MenuItem createMenuItem(String name, double price, String description) {
        MenuItem item = new MenuItem();
        item.setName(name);
        item.setPrice(price);
        item.setDescription(description);
        return item;
    }
}