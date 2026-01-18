# Todo List App

A modern, full-stack todo list application built with **React** (frontend) and **Laravel** (backend) using a clean black and white UI.

## Features

**Add Todos** - Quickly add new tasks with the input field  
**Edit Todos** - Modify existing todo titles  
**Mark Complete** - Toggle completion status with checkboxes  
**Delete Todos** - Remove tasks with confirmation  
**Auto-Refresh** - Lists update instantly after changes  
**Modern UI** - Clean black and white design with smooth animations  
**Persistent Storage** - All todos saved in SQLite database

---

## Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Laravel 11** - PHP framework
- **SQLite** - Database
- **Eloquent ORM** - Database queries

---

## Installation & Setup

### Prerequisites
- PHP 8.2+
- Node.js 18+
- npm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install PHP dependencies:
```bash
composer install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Generate app key:
```bash
php artisan key:generate
```

5. Run migrations:
```bash
php artisan migrate
```

6. Start the backend server:
```bash
php artisan serve --port=8000
```

Backend will be available at: `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5174`

---

## Usage

### Adding a Todo
1. Type your todo task in the input field
2. Press `Enter` or click the **Add** button
3. The todo will appear in the list instantly

### Editing a Todo
1. Click the **Edit** button next to the todo
2. Modify the title in the input field
3. Click **Save** to update or **Cancel** to discard changes

### Marking Complete
1. Click the checkbox next to the todo
2. The text will show a strikethrough when completed

### Deleting a Todo
1. Click the **Delete** button
2. Confirm the deletion in the popup
3. The todo will be removed from the list

---

## API Endpoints

All endpoints are prefixed with `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| POST | `/todos` | Create a new todo |
| GET | `/todos/{id}` | Get a specific todo |
| PUT | `/todos/{id}` | Update a todo |
| DELETE | `/todos/{id}` | Delete a todo |

### Example Request
```bash
# Add a todo
curl -X POST http://localhost:8000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries"}'
```

---

## Database Schema

### Todos Table
```sql
CREATE TABLE todos (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  completed TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

---

## Deployment

### Frontend Deployment (Vercel)

1. **Connect your GitHub repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" and import your GitHub repository
   - Select the root directory as project root

2. **Configure Build Settings**
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add `VITE_API_URL` with your backend API URL (see below)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main

### Backend Deployment (Railway, Heroku, or Similar)

#### Option 1: Railway (Recommended)

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `composer install && php artisan migrate`
   - **Start Command:** `php artisan serve --port=$PORT`

5. Set Environment Variables:
   ```
   APP_ENV=production
   APP_DEBUG=false
   DB_CONNECTION=mysql
   DB_HOST=<your-db-host>
   DB_DATABASE=<your-db-name>
   DB_USERNAME=<your-db-user>
   DB_PASSWORD=<your-db-password>
   ```

6. After deployment, copy the backend URL and add it to Vercel's `VITE_API_URL`

#### Option 2: Heroku

```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set APP_KEY=<generate-with-php-artisan-key:generate>
heroku config:set APP_ENV=production
heroku config:set APP_DEBUG=false

# Deploy
git push heroku main
```

### Updating API URL After Deployment

Once your backend is deployed (Railway/Heroku):

1. Go to Vercel Project Settings
2. Environment Variables
3. Update `VITE_API_URL` to your backend's deployed URL:
   ```
   https://your-backend.railway.app/api
   ```
4. Redeploy frontend on Vercel

---

## Build for Production

### Frontend Build
```bash
cd frontend
npm run build
```

This creates an optimized build in `frontend/dist/`

### Backend
The backend is production-ready with:
- Proper error handling
- CORS configuration
- SQLite persistence

---

## Troubleshooting

### Issue: Backend returns 500 errors
**Solution:** Ensure migrations are run:
```bash
cd backend
php artisan migrate:refresh
```

### Issue: Frontend can't connect to backend
**Solution:** Verify the API URL in `frontend/src/api/axios.js`:
```javascript
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
```

### Issue: Todos not persisting
**Solution:** Check if SQLite database is created in `backend/database/database.sqlite`

---

## File Structure

```
todo-list-app/
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── Controller.php
│   │   └── Models/
│   │       └── Todo.php
│   ├── routes/
│   │   └── api.php
│   ├── database/
│   │   ├── migrations/
│   │   └── database.sqlite
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoList.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   └── AddTodo.jsx
│   │   ├── api/
│   │   │   ├── axios.js
│   │   │   └── todoApi.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Development Tips

### Enabling Hot Module Replacement (HMR)
The frontend uses Vite's HMR, which automatically reloads when files change.

### Database Reset
To reset all todos and start fresh:
```bash
cd backend
php artisan migrate:refresh
```

### Viewing Database
To inspect the database:
```bash
cd backend
php artisan tinker
>>> DB::table('todos')->get();
```

---

## License

This project is open source and available for personal and educational use.

---

## Support

For issues or questions, please check:
1. Browser console for errors (F12)
2. Backend logs in `backend/storage/logs/laravel.log`
3. Terminal output for server errors

---

**Enjoy organizing your todos!** 
