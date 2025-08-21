package com.examly.springapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import com.examly.springapp.model.*;
import com.examly.springapp.model.dto.FoodTruckCreationDTO;
import com.examly.springapp.service.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserService userService;
    @Autowired
    private VendorService vendorService;
    @Autowired
    private BrandService brandService;
    @Autowired
    private FoodTruckService foodTruckService;
    @Autowired
    private MenuItemService menuItemService;
    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private DocumentService documentService;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Starting data seeding process...");
        seedUsers();
        seedVendorsAndRelatedData();
        System.out.println("Data seeding process complete.");
    }

    private void seedUsers() {
        System.out.println("Seeding users...");

        // Super Admin User
        User superAdminUser = new User("Super Admin", "superadmin@gmail.com", "demo", User.Role.SUPER_ADMIN);
        userService.save(superAdminUser);
        System.out.println(" - User seeded: superadmin@gmail.com (Role: SUPER_ADMIN)");

        // Admin Users
        User adminUser1 = new User("Admin User 1", "admin1@gmail.com", "demo", User.Role.ADMIN);
        userService.save(adminUser1);
        System.out.println(" - User seeded: admin1@gmail.com (Role: ADMIN)");

        User adminUser2 = new User("Admin User 2", "admin2@gmail.com", "demo", User.Role.ADMIN);
        userService.save(adminUser2);
        System.out.println(" - User seeded: admin2@gmail.com (Role: ADMIN)");

        // Inspector Users
        User inspectorUser1 = new User("Inspector User 1", "inspector1@gmail.com", "demo", User.Role.INSPECTOR);
        userService.save(inspectorUser1);
        System.out.println(" - User seeded: inspector1@gmail.com (Role: INSPECTOR)");

        User inspectorUser2 = new User("Inspector User 2", "inspector2@gmail.com", "demo", User.Role.INSPECTOR);
        userService.save(inspectorUser2);
        System.out.println(" - User seeded: inspector2@gmail.com (Role: INSPECTOR)");

        // Reviewer Users
        User reviewerUser1 = new User("Reviewer User 1", "reviewer1@gmail.com", "demo", User.Role.REVIEWER);
        userService.save(reviewerUser1);
        System.out.println(" - User seeded: reviewer1@gmail.com (Role: REVIEWER)");

        User reviewerUser2 = new User("Reviewer User 2", "reviewer2@gmail.com", "demo", User.Role.REVIEWER);
        userService.save(reviewerUser2);
        System.out.println(" - User seeded: reviewer2@gmail.com (Role: REVIEWER)");
    }

    private void seedVendorsAndRelatedData() {
        Vendor vendor = seedVendor("Single Vendor", "vendor@gmail.com", "demo");
        
        if (vendor != null) {
            // Create multiple brands and food trucks with applications - ALL SUBMITTED
            createFoodTruckWithApplicationAndDocuments(vendor.getId(), "The Taco Stand", "Chennai", "Anna Nagar", "Mexican", "Tacos, Burritos, Quesadillas");
            createFoodTruckWithApplicationAndDocuments(vendor.getId(), "Burger Bliss", "Bangalore", "Koramangala", "American", "Classic Burgers, Fries");
            createFoodTruckWithApplicationAndDocuments(vendor.getId(), "Curry Express", "Mumbai", "Bandra", "Indian", "Butter Chicken, Naan");
            createFoodTruckWithApplicationAndDocuments(vendor.getId(), "Pizza Paradise", "Delhi", "Connaught Place", "Italian", "Wood-fired Pizza, Pasta");
            createFoodTruckWithApplicationAndDocuments(vendor.getId(), "Asian Fusion", "Hyderabad", "Hitech City", "Asian", "Pad Thai, Dumplings");
            createFoodTruckWithApplicationAndDocuments(vendor.getId(), "Street Samosa", "Pune", "Koregaon Park", "Indian Street Food", "Samosas, Chaat, Vada Pav");
        }
    }

    private void createFoodTruckWithApplicationAndDocuments(Long vendorId, String brandName, String operatingRegion, String location, String cuisineSpecialties, String menuHighlights) {
        try {
            // Create brand
            Brand brand = seedBrand(brandName, vendorId);
            if (brand == null) return;

            // Create food truck
            FoodTruck foodTruck = new FoodTruck();
            foodTruck.setOperatingRegion(operatingRegion);
            foodTruck.setLocation(location);
            foodTruck.setCuisineSpecialties(cuisineSpecialties);
            foodTruck.setMenuHighlights(menuHighlights);
            foodTruck.setBrand(brand);

            // Save food truck
            FoodTruck savedFoodTruck = foodTruckService.saveFoodTruck(brand.getId(), foodTruck);
            System.out.println(" - FoodTruck seeded: " + savedFoodTruck.getLocation() + " (Brand: " + brandName + ")");

            // Create application for the food truck - ALL SUBMITTED BY DEFAULT
            Application application = new Application();
            application.setFoodTruck(savedFoodTruck);
            application.setStatus(Application.ApplicationStatus.SUBMITTED);
            application.setSubmissionDate(LocalDateTime.now().minusDays((long) (Math.random() * 30))); // Random date within last 30 days

            // Initialize documents list if null
            if (application.getDocuments() == null) {
                application.setDocuments(new java.util.ArrayList<>());
            }

            // Create documents and add to application BEFORE saving
            List<List<String>> documentsData = Arrays.asList(
                Arrays.asList("Business License", "/documents/business_license_" + brandName.toLowerCase().replace(" ", "_") + ".pdf"),
                Arrays.asList("Food Safety Certificate", "/documents/food_safety_" + brandName.toLowerCase().replace(" ", "_") + ".pdf"),
                Arrays.asList("Insurance Certificate", "/documents/insurance_" + brandName.toLowerCase().replace(" ", "_") + ".pdf"),
                Arrays.asList("Vehicle Registration", "/documents/vehicle_reg_" + brandName.toLowerCase().replace(" ", "_") + ".pdf"),
                Arrays.asList("Health Department Permit", "/documents/health_permit_" + brandName.toLowerCase().replace(" ", "_") + ".pdf")
            );

            for (List<String> docData : documentsData) {
                Document document = new Document();
                document.setDocumentName(docData.get(0));
                document.setFilePath(docData.get(1));
                document.setApplication(application); // set parent
                application.getDocuments().add(document); // add to parent's collection
            }

            // Save application (will cascade and save documents)
            Application savedApplication = applicationService.save(application);
            System.out.println(" - Application seeded: ID " + savedApplication.getId() + " (Status: " + savedApplication.getStatus() + ")");
            for (Document doc : savedApplication.getDocuments()) {
                System.out.println("    - Document seeded: " + doc.getDocumentName() + " (Application ID: " + savedApplication.getId() + ")");
            }

            // Seed reduced menu items (3 items)
            seedReducedMenuItems(savedFoodTruck.getId(), cuisineSpecialties);

        } catch (Exception e) {
            System.err.println(" - Failed to seed food truck for brand: " + brandName + ". Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private Application createApplication(FoodTruck foodTruck, Application.ApplicationStatus status) {
        try {
            Application application = new Application();
            application.setFoodTruck(foodTruck);
            application.setStatus(status);
            application.setSubmissionDate(LocalDateTime.now().minusDays((long) (Math.random() * 30))); // Random date within last 30 days
            
            Application savedApplication = applicationService.save(application);
            System.out.println(" - Application seeded: ID " + savedApplication.getId() + " (Status: " + status + ")");
            return savedApplication;
        } catch (Exception e) {
            System.err.println(" - Failed to create application for food truck: " + foodTruck.getId() + ". Error: " + e.getMessage());
            return null;
        }
    }

    private void createDocuments(Application application, String brandName) {
        if (application == null) return;
        
        List<List<String>> documentsData = Arrays.asList(
            Arrays.asList("Business License", "/documents/business_license_" + brandName.toLowerCase().replace(" ", "_") + ".pdf"),
            Arrays.asList("Food Safety Certificate", "/documents/food_safety_" + brandName.toLowerCase().replace(" ", "_") + ".pdf"),
            Arrays.asList("Insurance Certificate", "/documents/insurance_" + brandName.toLowerCase().replace(" ", "_") + ".pdf"),
            Arrays.asList("Vehicle Registration", "/documents/vehicle_reg_" + brandName.toLowerCase().replace(" ", "_") + ".pdf"),
            Arrays.asList("Health Department Permit", "/documents/health_permit_" + brandName.toLowerCase().replace(" ", "_") + ".pdf")
        );

        for (List<String> docData : documentsData) {
            try {
                Document document = new Document();
                document.setDocumentName(docData.get(0));
                document.setFilePath(docData.get(1));
                document.setApplication(application);
                // document.setUploadDate(LocalDateTime.now().minusDays((long) (Math.random() * 30)));
                
                documentService.save(document);
                System.out.println("    - Document seeded: " + docData.get(0) + " (Application ID: " + application.getId() + ")");
            } catch (Exception e) {
                System.err.println("    - Failed to seed document: " + docData.get(0) + ". Error: " + e.getMessage());
            }
        }
    }

    private Vendor seedVendor(String name, String emailId, String password) {
        try {
            Vendor vendor = new Vendor();
            vendor.setName(name);
            vendor.setEmail(emailId);
            vendor.setPassword(password);
            Vendor savedVendor = vendorService.saveVendor(vendor);
            System.out.println(" - Vendor seeded: " + name + " (ID: " + savedVendor.getId() + ")");
            return savedVendor;
        } catch (Exception e) {
            System.err.println(" - Failed to seed vendor: " + name + ". Error: " + e.getMessage());
            return null;
        }
    }

    private Brand seedBrand(String brandName, Long vendorId) {
        try {
            Brand brand = new Brand();
            brand.setBrandName(brandName);
            Brand savedBrand = brandService.saveBrand(vendorId, brand);
            System.out.println(" - Brand seeded: " + brandName + " (Vendor ID: " + vendorId + ")");
            return savedBrand;
        } catch (Exception e) {
            System.err.println(" - Failed to seed brand: " + brandName + ". Error: " + e.getMessage());
            return null;
        }
    }

    private void seedReducedMenuItems(Long foodTruckId, String cuisineType) {
        List<MenuItem> menuItems;
        
        switch (cuisineType.toLowerCase()) {
            case "mexican":
                menuItems = Arrays.asList(
                    createMenuItem("Classic Beef Tacos", 11.00, "Three grilled beef tacos topped with pico de gallo and sour cream."),
                    createMenuItem("Cheese Quesadilla", 8.75, "Melted cheese in a warm flour tortilla, served with guacamole."),
                    createMenuItem("Spicy Bean Burrito", 9.50, "Large burrito with spicy black beans, rice, and fresh salsa.")
                );
                break;
            case "american":
                menuItems = Arrays.asList(
                    createMenuItem("Classic Cheeseburger", 10.50, "Juicy beef patty with cheese, lettuce, tomato, and onion on a toasted bun."),
                    createMenuItem("Crispy Chicken Sandwich", 11.00, "Fried chicken breast with mayo and pickles on a brioche bun."),
                    createMenuItem("Sweet Potato Fries", 5.50, "Crispy sweet potato fries served with a side of chipotle mayo.")
                );
                break;
            case "indian":
                menuItems = Arrays.asList(
                    createMenuItem("Butter Chicken", 13.00, "Tender chicken cooked in a creamy tomato sauce, served with naan."),
                    createMenuItem("Vegetable Biryani", 11.50, "Fragrant basmati rice with mixed vegetables and aromatic spices."),
                    createMenuItem("Samosa Chat", 6.75, "Crispy samosas topped with chutneys and yogurt.")
                );
                break;
            case "italian":
                menuItems = Arrays.asList(
                    createMenuItem("Margherita Pizza", 12.00, "Classic pizza with fresh mozzarella, tomatoes, and basil."),
                    createMenuItem("Penne Arrabbiata", 10.50, "Penne pasta in spicy tomato sauce with garlic and red peppers."),
                    createMenuItem("Garlic Breadsticks", 4.50, "Warm breadsticks with garlic butter and parmesan cheese.")
                );
                break;
            case "asian":
                menuItems = Arrays.asList(
                    createMenuItem("Pad Thai Noodles", 11.50, "Stir-fried rice noodles with shrimp, chicken, peanuts, and lime."),
                    createMenuItem("Pork Dumplings", 8.00, "Steamed dumplings filled with seasoned pork and vegetables."),
                    createMenuItem("Thai Green Curry", 12.00, "Spicy green curry with coconut milk, vegetables, and jasmine rice.")
                );
                break;
            case "indian street food":
                menuItems = Arrays.asList(
                    createMenuItem("Mumbai Vada Pav", 3.50, "Spicy potato fritter in a bun with chutneys - Mumbai's burger!"),
                    createMenuItem("Pani Puri", 5.00, "Crispy shells filled with spiced water, tamarind, and chickpeas."),
                    createMenuItem("Aloo Tikki Chat", 6.50, "Potato patties topped with yogurt, chutneys, and sev.")
                );
                break;
            default:
                menuItems = Arrays.asList(
                    createMenuItem("Special Combo", 12.00, "Chef's special combination meal."),
                    createMenuItem("Fresh Salad", 7.50, "Mixed greens with seasonal vegetables and dressing."),
                    createMenuItem("Soft Drink", 2.50, "Choice of cola, lemon-lime, or orange soda.")
                );
        }

        for (MenuItem item : menuItems) {
            try {
                menuItemService.saveMenuItem(foodTruckId, item);
                System.out.println("    - Menu item seeded: " + item.getName() + " (FoodTruck ID: " + foodTruckId + ")");
            } catch (Exception e) {
                System.err.println("    - Failed to seed menu item: " + item.getName() + ". Error: " + e.getMessage());
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