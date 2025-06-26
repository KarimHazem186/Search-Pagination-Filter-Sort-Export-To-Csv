# 🧾 MERN CRUD Dashboard — Search, Pagination, Filter, Sort, Export to CSV

A full-stack MERN (MongoDB, Express, React, Node.js) application with advanced data management features:

✅ Search  
✅ Filter  
✅ Pagination  
✅ Sorting  
✅ CSV Export  

---

## 📁 Project Folder Structure

### 🔹 Frontend (React)

client/
└── src/
├── Components/
│ ├── Header/
│ ├── Footer/
│ ├── Pagination/
│ └── Tables/
│
├── Assets/
│ └── Images/
│
├── Pages/
│ ├── Home/
│ ├── Edit/
│ ├── Profile/
│ └── Register/
│
├── Services/
│ └── Apis/ # Axios service calls
│
├── App.js # Root component
└── index.js # Entry point

---

### 🔹 Backend (Node.js + Express)

server/
├── Controllers/
│ └── userController.js # Business logic
│
├── db/
│ └── Connection.js # MongoDB connection
│
├── models/
│ └── userSchema.js # Mongoose schema
│
├── multerconfig/ # File upload config
│
├── public/ # Static assets (if needed)
│
├── Routes/
│ └── Router.js # All API routes
│
├── uploads/ # Uploaded files
│
├── .env # Environment variables
├── app.js # Express entry point
└── node_modules/

---

## 🧩 Features

- 🔍 **Search**: Real-time filtering by name, email, etc.
- 🔃 **Pagination**: Page through data (limit, skip)
- 🔽 **Sorting**: Sort by fields (name, date, etc.)
- 🎯 **Filtering**: By role, status, department
- 📤 **Export to CSV**: Download filtered data as CSV
- ⬆️ **Image upload** (using `multer`)
- 📡 **REST API** (Express + MongoDB)

---

## 🚀 Getting Started

### 1️⃣ Backend Setup

cd server
npm install
node app.js

### 2️⃣ Frontend Setup

cd client
npm install
npm start


