# guardz-assignment

## 🎯 Objective

In this project there is an implementation of a user and single user edit

## 🚀 Quick Start

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Set environment variables:**
   - SQLite is used, so no additional database setup is required.

4. **Run database migrations:**
   ```bash
   npm run migration:run
   ```

5. **Start development servers:**
   ```bash
   # Backend (from backend directory)
   npm run start:dev

   # Frontend (from frontend directory)
   npm run dev
   ```

- Application endpoints:
  - Frontend: http://localhost:5173
  - Backend: http://localhost:3000

---

## Project Structure

```
├── backend/        # Backend application
│   ├── src/        # Source code
│   ├── database.sqlite
│   └── package.json
├── frontend/       # Frontend application
│   ├── src/        # Source code
│   └── package.json
└── README.md
```

---