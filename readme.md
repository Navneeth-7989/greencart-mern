# 🛒 GreenCart – Full Stack Grocery Selling Web Application (MERN Stack)

GreenCart is a **full-stack grocery selling web application** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
The application supports **User and Seller roles**, allowing customers to browse products, manage carts, select payment methods, and place orders, while sellers can manage inventory, products, and orders through a dedicated dashboard.

---

## 🚀 Features

### 👤 User Features
- User authentication (Register / Login using JWT & cookies)
- Browse grocery products by category
- View product details with images
- Add products to cart
- Increase / decrease product quantity in cart
- Remove products from cart
- Manage delivery addresses
- Select payment method (Cash on Delivery)
- Place orders securely
- View user order history
- Fully responsive UI

---

### 🧑‍💼 Seller (Admin) Features
- Seller authentication
- Add new products with:
  - Product name
  - Description
  - Category
  - Price & offer price
  - Multiple images (Cloudinary)
- Edit and manage products
- Toggle **In-Stock / Out-of-Stock** status
- View all orders placed by users
- View complete order details (products, address, payment method)
- Seller dashboard for product & order management

---

### 🛠️ Core Application Features
- JWT-based authentication with HTTP-only cookies
- Role-based access (User / Seller)
- Cloudinary integration for image uploads
- RESTful API architecture
- Context API for global state management
- Protected routes for secure access
- Secure backend with CORS configuration
- Clean, scalable project structure

---

## 🧰 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Cookie-Parser
- Cloudinary
- Multer
- dotenv

---

## 📁 Project Structure

greencart-mern/
│
├── backend/
│ ├── configs/
│ │ ├── db.js
│ │ └── cloudinary.js
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── .env
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .env
│ └── vite.config.js
│
├── .gitignore
└── README.md


---

## 🔑 Environment Variables

### Backend Environment (`backend/.env`)
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


Frontend Environment (frontend/.env)
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=₹


⚙️ Installation & Setup (Full Project)

1️⃣ Clone the Repository

git clone https://github.com/your-username/greencart-mern.git
cd greencart-mern

2️⃣ Backend Setup

cd backend
npm install
npm run dev

Backend will run at: http://localhost:4000

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

Frontend will run at: http://localhost:5173