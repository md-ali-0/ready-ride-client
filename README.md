# Bike Rental Service Website

## Overview

The Bike Rental Service Website is a frontend application designed to integrate seamlessly with the backend of the ReadyRide - Bike Rental Reservation System. This application offers a user-friendly interface for bike rentals, including functionalities for user authentication, bike management, booking, and administrative tasks.

## Technologies

-   **Frontend Framework**: React
-   **Styling**: TailwindCSS
-   **State Management**: Redux
-   **Form Handling**: React Hook Form
-   **Routing**: React Router
-   **UI Components**: Shadcn UI
-   **Animations**: Framer Motion

## Features

### User Features

1. **Authentication & Profile Management**

    - **Sign Up:** Register with name, email, password, phone, and address.
    - **Login:** Access the system with email and password.
    - **Profile Page:** View and update user details.

2. **Bike Management**

    - **Bike Listing:** Browse available bikes with filtering options.
    - **Bike Detail Page:** View detailed information about each bike and book it.

3. **Rental Management**
    - **Booking Process:** Reserve bikes with start time and payment.
    - **My Rentals Page:** View and manage rentals with "Paid" and "Unpaid" tabs.
    - **Pay Button:** Pay for unpaid rentals.

### Admin Features

1. **Admin Profile Management**

    - **Profile Page:** Similar functionalities as user profile management.

2. **Bike Management**

    - **Bike Listing:** View, create, update, and delete bikes.
    - **Create/Edit:** Add or modify bike details.
    - **Delete:** Remove bikes with a confirmation dialog.

3. **User Management**

    - **Manage Users:** Delete or promote users to admin roles.

4. **Return Bike**
    - **Return Process:** Manage bike returns, update rental status, and calculate costs.

## Error Handling

-   **Error Messages**: Displayed via toast notifications for API failures and next to form fields for validation errors.
-   **No Data Handling**: Friendly messages for empty data sets.
-   **404 Page**: Custom design for unmatched routes.

## Installation

### Setup

1. **Clone the Repository**

    ```sh
    git clone https://github.com/md-ali-0/ready-ride-client
    cd ready-ride-client
    ```

2. **Install Dependencies**
    ```sh
    npm install
    ```
3. **Run the Server**
    ```sh
    npm run build
    npm run start
    ```


## Usage

**Navigate to the Website:**
* Open your browser and go to http://localhost:5173 to view the application.

**User Interaction:**

* **Sign Up/Log In:** Access authentication pages from the navbar.
* **Browse Bikes:** Use the Bike Listing and Bike Detail pages.
* **Manage Rentals:** Book bikes and manage rentals from the My Rentals page.

**Admin Interaction:**

* **Manage Bikes and Users:** Access admin features through protected routes.
* **Handle Returns and Coupons:** Manage bike returns and coupon codes as an admin.

## Credential Details

### Admin Credential:

```bash
Email: admin@gmail.com
Password: 123456
```

### User Credential:

```bash
Email: user@gmail.com
Password: 123456
```

## Live Url:

- **Link**:
  - [ReadyRide -Client ](https://ready-ride.vercel.app)
  - [ReadyRide - Server](https://ready-ride-server.vercel.app)