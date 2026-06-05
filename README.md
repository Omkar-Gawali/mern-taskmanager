# MERN Task Manager

## Overview

MERN Task Manager is a full-stack task management application built using MongoDB, Express.js, React.js, and Node.js. The application allows users to securely manage tasks with authentication, task tracking, filtering, and dashboard analytics.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Task Management

* Create Task
* View Tasks
* Update Task
* Delete Task
* Mark Tasks as Completed or Pending

### Dashboard

* Total Tasks
* Completed Tasks
* Pending Tasks
* Overdue Tasks
* Recent Activity Feed

### Additional Features

* Search Tasks
* Filter by Status
* Filter by Priority
* Pagination
* Dark Mode
* Responsive Design

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose

## Installation & Setup

### Clone Repository

git clone <repository-url>
cd mern-task-manager

### Backend Setup

cd backend
npm install
npm run dev

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend Setup

cd frontend
npm install
npm run dev

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

### Tasks

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/tasks          |
| POST   | /api/tasks          |
| PUT    | /api/tasks/:id      |
| DELETE | /api/tasks/:id      |
| GET    | /api/tasks/stats    |
| GET    | /api/tasks/activity |

## Project Structure

mern-task-manager
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── package.json
│
└── README.md

## Author

**Omkar Gawali**

Artificial Intelligence & Data Science

Terna Engineering College, Navi Mumbai
