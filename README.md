📝 MERN Stack Todo Application

A full-stack Todo Application built using the MERN stack (MongoDB, Express.js, React, Node.js).
This project supports complete CRUD operations with a clean UI and RESTful backend integration.

🚀 Features

Add new todo items

View all todos

Edit existing todos

Update todos

Delete todos

Real-time UI updates

REST API integration

Local MongoDB database

🛠️ Tech Stack

Frontend: React, Bootstrap

Backend: Node.js, Express.js

Database: MongoDB (Local)

API Testing: Postman

📁 Project Structure
todo-project/
│
├── backend/
│   ├── index.js
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   └── Todo.jsx
│   ├── package.json
│
└── README.md

⚙️ Prerequisites

Make sure you have the following installed:

Node.js

MongoDB (running locally)

npm or yarn

▶️ How to Run the Project
1️⃣ Start MongoDB

Make sure MongoDB is running locally:

mongod

2️⃣ Run Backend Server
cd backend
npm install
node index.js


Server will run on:

http://localhost:8000

3️⃣ Run Frontend Application
cd frontend
npm install
npm start


Frontend will run on:

http://localhost:3000

🔗 API Endpoints
Method	Endpoint	Description
GET	/todos	Get all todos
POST	/todos	Create a new todo
PUT	/todos/:id	Update a todo
DELETE	/todos/:id	Delete a todo
🧪 Testing with Postman
➕ Create Todo

POST /todos

{
  "title": "Learn MERN",
  "description": "Practice MERN stack daily"
}

📄 Get Todos

GET /todos

✏️ Update Todo

PUT /todos/:id

{
  "title": "Updated Title",
  "description": "Updated Description"
}

❌ Delete Todo

DELETE /todos/:id

🖥️ How to Use the Application

Enter Title and Description

Click Submit to add a todo

Click Edit to modify a todo

Click Update to save changes

Click Cancel to discard edit

Click Delete to remove a todo

📸 Screenshots (Optional)

Add screenshots of:

Home page

Add Todo

Edit Todo

🎯 Learning Outcomes

-->Understanding MERN architecture

-->REST API development

-->React hooks (useState, useEffect)

-->MongoDB CRUD operations

-->Frontend–Backend integration

-->CORS handling
