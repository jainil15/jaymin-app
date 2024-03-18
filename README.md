# Customer Success Platform

Welcome to the Promact Customer Success Platform! Our platform is designed to streamline your customer success operations and enhance your interactions with clients. Below, you'll find a comprehensive guide on how to set up and run the project locally, along with an overview of the project structure and the technologies we've employed.

## Setup Guide

### Local Setup

1. **Clone the Repository:**
   ```
   git clone https://github.com/JAY1820/Customer_Success_Platform.git
   ```

### Backend Setup

1. **Navigate to the Backend folder:**
   ```
   cd server
   ```
   
2. **Install Dependencies:**
   ```
   npm install
   ```

3. **Start the Backend Server:**
   ```
   npm start
   ```

### Frontend Setup

1. **Navigate to the Frontend folder:**
   ```
   cd client
   ```

2. **Install Dependencies:**
   ```
   npm install
   ```

3. **Start the Frontend Server:**
   ```
   npm start
   ```

Once both the backend and frontend servers are running, access the application by navigating to the provided URL in your browser.

## Project Structure

The project is structured as follows:

- **Main Folder:** Contains `client` and `server` folders.
  
- **Client Folder:** Contains all frontend code.
  
- **Server Folder:** Contains all backend code.

## Technologies Used

1. **React:** A JavaScript library for building user interfaces.
   
2. **Node.js:** A JavaScript runtime environment for executing JavaScript code server-side.
   
3. **Express.js:** A web application framework for Node.js, designed for building web applications and APIs.
   
4. **MongoDB:** A NoSQL database used for storing application data.

## About the Project

The Customer Success Platform aims to optimize customer success operations by providing a centralized hub for managing client interactions. Key features include:

- **Client Management:** Easily manage client information and interactions.
  
- **Task Tracking:** Keep track of tasks and deadlines related to client accounts.
  
- **Communication Tools:** Facilitate seamless communication with clients through integrated messaging features.
  
- **Analytics Dashboard:** Gain insights into customer satisfaction and engagement metrics through interactive dashboards.

## Role of the Customer Success Platform

### Functionality

- **Role Based Management:**
  - **Admin Role:**
    - **Credentials:**
      - Email: iamjay1820@gmail.com
      - Password: 1234@Jay
    - Full access to create/update/read/delete all projects and sections.
    - Manage users (all stakeholders).
  
  - **Auditor Role:**
    - **Credentials:**
      - Email: kingthestar111@gmail.com
      - Password: 1234@Abcd
    - Register using Microsoft credentials via Auth0.
    - Access project management features.
    - Assign project managers.
    - Add stakeholders and view platform for all projects.
  
  - **Project Manager Role:**
    - Register using Microsoft credentials via Auth0.
    - Manage content for assigned projects.
    - Save and submit updates for assigned projects.
  
  - **Other Stakeholders:**
    - View customer success platform for assigned projects.

With the Customer Success Platform, enhance your customer relationships and drive business growth through efficient and personalized client management. Start using the platform today to elevate your customer success efforts!

### Project Graph - Adddition Feature not mentioned in the Requirement

 we've implemented a project graph feature to provide users with visual representations of project data. The project graph offers insights into various aspects of project management, such as project status distribution, project manager workload, and project progress over time. With this feature, users can quickly assess project performance and make informed decisions to ensure successful project outcomes.