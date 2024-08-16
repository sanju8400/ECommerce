# E-Commerce Project

**Student Name**: Sanjay Sharma  
**Student Number**: 8890604 
**Date**: 19/07/2024

### Technology Stack

**Frontend**: Angular  
**Backend**: .Net  
**Database**: MongoDB (Atlas)

### How to run the Project
**Frontend**: check-out ecommerece-web and open in cmd and run below commands
	- `npm install`
	- `ng serve`

**Backend**: check check-out backend/ECommerce and open in visual studio and click run 


### Project Setup

1. **Project Initialization**: Repository created on GitHub and cloned to local machine.
2. **Frontend Setup**: Initialized ReactJS project.
3. **Backend Setup**: Initialized .Net project and connected to MongoDB (Atlas).

### Database Schema Design

**Products Schema (MongoDB)**

- `name`: String
- `description`: String
- `price`: Number
- `category`: String
- `imageUrl`: String
- `brand`: String
- `createdAt`: Date
- `updatedAt`: Date

**Orders Schema (MongoDB)**

- `userId`: ObjectId (Reference to Users)
- `products`: Array of Objects
  - `productId`: ObjectId (Reference to Products)
  - `quantity`: Number
  - `price`: Number
- `status`: String
- `totalPrice`: Number
- `shippingAddress`: Object
  - `street`: String
  - `city`: String
  - `state`: String
  - `zipCode`: String
  - `country`: String
- `createdAt`: Date
- `updatedAt`: Date

  ### Test Cases:
1. Display products
2. View Product Details
3. Add to cart
4. Update Quantity
5. Check out products
6. Place order
7. Login using username: admin, pass: admin
8. Display the dashboard
9. CRUD category
10. CRUD products

### Frontend Setup

1. Basic structure set up for React components, including directories for components and services.
2. State management planned to handle user sessions and cart data.

### Notes

- The project is set up using Git and GitHub for version control.
- Further development will include implementing user interfaces for product listings, shopping cart, and checkout.
