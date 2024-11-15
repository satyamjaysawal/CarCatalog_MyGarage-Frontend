

# Car Management Application 🚗

## Overview
The **Car Management Application** is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). This application allows users to manage their car inventory with features such as adding, viewing, editing, and deleting cars. Each car can have up to 10 images, a title, a description, and associated tags. The app supports user authentication and authorization, ensuring users can only manage their own cars. Additionally, it provides a search functionality for filtering cars based on keywords.

## Features
1. **User Authentication**: Sign up and log in with secure JWT-based authentication.
2. **Car Management**:
   - Create cars with up to 10 images, a title, description, and tags.
   - View all cars created by the logged-in user.
   - Edit car details including images, title, description, and tags.
   - Delete a car.
3. **Global Search**: Search for cars based on keywords in the title, description, or tags.
4. **Car Details**: View detailed information about a specific car.
5. **API Documentation**: All backend APIs are documented using Postman.

## Tech Stack
### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests to the backend API.
- **React Router**: For client-side routing.

### Backend
- **Node.js**: JavaScript runtime for server-side programming.
- **Express**: A web application framework for Node.js.
- **MongoDB**: NoSQL database to store users and car data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT**: JSON Web Tokens for secure user authentication.
- **Cloudinary**: (Optional) for image storage if needed.

## Installation

### Prerequisites
- **Node.js** and **npm** installed.
- **MongoDB** instance running locally or use a cloud provider like MongoDB Atlas.
- (Optional) **Vercel** for deploying the frontend.
- (Optional) **Heroku** or similar cloud provider for backend deployment.



## Delpoyed Link :
Frontend : https://car-catalog-my-garage-frontend.vercel.app/login

Backend : https://car-catalog-my-garage-backend.vercel.app/
### Clone the Repository
```bash
git clone https://github.com/satyamjaysawal/CarCatalog_MyGarage-backend.git

git clone https://github.com/satyamjaysawal/CarCatalog_MyGarage-Frontend.git
cd car-management-app
```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory for the API URL:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm start
   ```

## API Endpoints
### **Authentication**
- `POST /api/auth/signup` - Sign up a new user.
- `POST /api/auth/login` - Log in a user and get a JWT token.

### **Car Management**
- `POST /api/cars` - Create a new car.
- `GET /api/cars` - List all cars for the authenticated user.
- `GET /api/cars/search?keyword={keyword}` - Search cars based on a keyword.
- `GET /api/cars/:id` - Get details of a specific car.
- `PUT /api/cars/:id` - Update a car’s information.
- `DELETE /api/cars/:id` - Delete a car.

## Deployment
### **Frontend Deployment** (Vercel)
1. Push your frontend code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and create a new project.
3. Import the repository and set up the project.
4. Configure environment variables in the Vercel dashboard.
5. Deploy the project and get the live URL.

### **Backend Deployment** (Heroku)
1. Install the Heroku CLI and log in:
   ```bash
   heroku login
   ```
2. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
3. Add your MongoDB URI and JWT secret as environment variables in Heroku:
   ```bash
   heroku config:set MONGO_URI=your-mongodb-uri JWT_SECRET=your-secret
   ```
4. Deploy to Heroku:
   ```bash
   git push heroku main
   ```
5. Get the live URL for the backend and update your frontend API URL if necessary.

## Usage
1. **Sign Up** using the registration page.
2. **Log In** to access your dashboard.
3. **Add Cars** via the form, including images, title, description, and tags.
4. **View, Edit, or Delete Cars** from the dashboard.
5. Use the **Search Bar** to find specific cars using keywords.

---
![image](https://github.com/user-attachments/assets/4bb33f39-1f16-49b9-ba90-0e33ec09c0f8)

![image](https://github.com/user-attachments/assets/1bd660be-2706-4b0a-9648-63600b1309d9)
![image](https://github.com/user-attachments/assets/bb0496da-4b05-4281-8552-9ee351fa4325)


![image](https://github.com/user-attachments/assets/303579ed-d99c-4a43-b764-3504cd3a14e2)

![image](https://github.com/user-attachments/assets/e40fa6db-433a-43b5-b26f-65e1772705d7)



---
