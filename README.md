# BaseTask - Full Stack Application

A full-stack web application built with **React + TypeScript** (Frontend) and **Express.js + Sequelize** (Backend) for managing tasks and items with advanced search and filtering capabilities.

## 📋 Project Overview

This project is a task management system with:
- **Frontend**: React 19 with TypeScript, Vite, and Axios for API communication
- **Backend**: Node.js with Express.js, MySQL database, and Sequelize ORM
- **Features**: Get all items, search by name, filter by date

---

## 🛠️ Tech Stack

### Frontend
- React 19.2.6
- TypeScript
- Vite (build tool)
- Axios (HTTP client)
- ESLint (code linting)

### Backend
- Node.js
- Express.js 5.2.1
- MySQL 2 with Sequelize ORM
- CORS support
- Environment variables with dotenv

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MySQL** database server running locally or remotely

### Clone the Repository

```bash
git clone https://github.com/SOOD-11/baseTask.git
cd baseTask
```

---

## 🚀 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment Variables
Copy the example environment file and update with your database credentials:
```bash
cp example.env .env
```

Edit `.env` file with your database configuration:
```env
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_HOST=localhost
DB_NAME=your_database_name
```

### 4. Run Database Migrations (if available)
```bash
npx sequelize-cli db:migrate
```

### 5. Seed Database (if seeders available)
```bash
npx sequelize-cli db:seed:all
```

### 6. Start Backend Server
```bash
npm start
```

The backend server will start on **http://localhost:3000**

---

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment Variables
```bash
cp example.env .env
```

Update `.env` if needed (e.g., API base URL):
```env
VITE_API_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```

The frontend will be available at **http://localhost:5173**

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api/items
```

### API Endpoints

#### 1. Get All Items
**Endpoint:** `GET /api/items/`

**Description:** Retrieve all items from the database.

**Request:**
```http
GET /api/items/ HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Item 1",
    "createdAt": "2026-06-13T10:00:00Z",
    "updatedAt": "2026-06-13T10:00:00Z"
  },
  {
    "id": 2,
    "name": "Item 2",
    "createdAt": "2026-06-13T11:00:00Z",
    "updatedAt": "2026-06-13T11:00:00Z"
  }
]
```

**Error Response (500):**
```json
{
  "error": "Error message"
}
```

---

#### 2. Search Items by Name
**Endpoint:** `GET /api/items/search?name=<search_term>`

**Description:** Search for items by name using partial matching.

**Request:**
```http
GET /api/items/search?name=task HTTP/1.1
Host: localhost:3000
```

**Query Parameters:**
- `name` (required, string): The search term to match against item names

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Task Item 1",
    "createdAt": "2026-06-13T10:00:00Z",
    "updatedAt": "2026-06-13T10:00:00Z"
  }
]
```

**Error Response (500):**
```json
{
  "error": "Error message"
}
```

---

#### 3. Get Items by Date
**Endpoint:** `GET /api/items/by-date?date=<YYYY-MM-DD>`

**Description:** Retrieve all items created on a specific date.

**Request:**
```http
GET /api/items/by-date?date=2026-06-13 HTTP/1.1
Host: localhost:3000
```

**Query Parameters:**
- `date` (required, string): Date in format YYYY-MM-DD

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Item Created Today",
    "createdAt": "2026-06-13T10:30:00Z",
    "updatedAt": "2026-06-13T10:30:00Z"
  },
  {
    "id": 3,
    "name": "Another Item",
    "createdAt": "2026-06-13T14:15:00Z",
    "updatedAt": "2026-06-13T14:15:00Z"
  }
]
```

**Error Response (500):**
```json
{
  "error": "Error message"
}
```

---

## 📝 API Summary Table

| Method | Endpoint | Purpose | Query Parameters |
|--------|----------|---------|------------------|
| GET | `/api/items/` | Get all items | None |
| GET | `/api/items/search` | Search items by name | `name` (required) |
| GET | `/api/items/by-date` | Filter items by creation date | `date` (required, YYYY-MM-DD) |

---

## 🗂️ Project Structure

```
baseTask/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # API controllers (business logic)
│   ├── models/           # Sequelize models
│   ├── routes/           # Express route definitions
│   ├── migrations/       # Database migrations
│   ├── seeders/          # Database seeders
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   ├── example.env       # Environment variables example
│   └── .sequelizerc       # Sequelize CLI configuration
│
└── frontend/
    ├── src/              # React components and logic
    ├── public/           # Static assets
    ├── index.html        # HTML entry point
    ├── vite.config.ts    # Vite configuration
    ├── tsconfig.json     # TypeScript configuration
    ├── package.json      # Frontend dependencies
    ├── example.env       # Environment variables example
    └── eslint.config.js  # ESLint configuration
```

---

## 🔧 Development Commands

### Backend Commands
```bash
cd backend

# Install dependencies
npm install

# Start server
npm start

# Run migrations
npx sequelize-cli db:migrate

# Seed database
npx sequelize-cli db:seed:all
```

### Frontend Commands
```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

---

## 📊 Database Configuration

The application uses MySQL with Sequelize ORM. Configure your database in the `.env` file:

```env
DB_USER=root
DB_PASS=your_password
DB_HOST=localhost
DB_NAME=basetask_db
```

---

## 🐛 Troubleshooting

### Backend won't start
- Ensure MySQL is running
- Check `.env` file has correct database credentials
- Verify dependencies are installed: `npm install`

### Frontend won't connect to backend
- Ensure backend is running on `http://localhost:3000`
- Check CORS is enabled in `backend/server.js`
- Verify `VITE_API_URL` in frontend `.env`

### Database errors
- Check database exists and user has permissions
- Run migrations: `npx sequelize-cli db:migrate`
- Check `.sequelizerc` configuration file

---

## 📄 License

ISC

---

## 👤 Author

SOOD-11

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

**Last Updated:** June 13, 2026
