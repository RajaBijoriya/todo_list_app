# Todo List App

A full-stack todo list application built with Laravel (backend) and React (frontend).

## Project Structure

- **Backend**: Laravel 12 API with SQLite database
- **Frontend**: React 19 with React Router and Vite

## Prerequisites

- **Node.js** (v16 or higher)
- **PHP** (v8.2 or higher)
- **Composer** (PHP dependency manager)
- **npm** (comes with Node.js)

## Installation

### 1. Clone the Repository

```bash
cd c:\Users\rajab\OneDrive\Desktop\todo-list-app
```

### 2. Backend Setup

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
copy .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Install Node.js dependencies
npm install

# Build frontend assets
npm run build
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

## Running the Application

### Option A: Run Both Backend & Frontend Together (Recommended)

From the **backend** directory:

```bash
cd backend
npm run dev
```

This command will start:

- Laravel development server (http://localhost:8000)
- Node.js development server (Vite)
- Queue listener
- Log watcher

### Option B: Run Separately

**Backend** (from backend directory):

```bash
php artisan serve
```

**Frontend** (from frontend directory):

```bash
npm run dev
```

Then open your browser to the URL shown in the Vite output (typically http://localhost:5173).

## Building for Production

### Backend

```bash
cd backend
npm run build
```

### Frontend

```bash
cd frontend
npm run build
```

## Testing

Run tests from the backend directory:

```bash
cd backend
npm run test
```

## Project Commands

### Backend Commands

| Command               | Description              |
| --------------------- | ------------------------ |
| `composer install`    | Install PHP dependencies |
| `php artisan migrate` | Run database migrations  |
| `php artisan tinker`  | Interactive shell        |
| `php artisan test`    | Run tests                |
| `php artisan serve`   | Start development server |

### Frontend Commands

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run lint`    | Run ESLint               |
| `npm run preview` | Preview production build |

## Database

The application uses **SQLite** by default. The database file is located at `backend/todo_db`.

### Resetting the Database

```bash
cd backend
php artisan migrate:refresh --seed
```

## API Endpoints

The API is available at `http://localhost:8000/api`

### Todos

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/{id}` - Get a specific todo
- `PUT /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

## File Structure

```
todo-list-app/
├── backend/              # Laravel API
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── public/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── tests/
│   └── ...
├── frontend/             # React App
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── ...
└── README.md
```

## Troubleshooting

### Port Already in Use

If port 8000 is already in use:

```bash
php artisan serve --port=8001
```

### Database Issues

Clear cache and reset:

```bash
cd backend
php artisan cache:clear
php artisan migrate:refresh
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -r node_modules package-lock.json
npm install
```

## Development Workflow

1. Make changes to backend code
2. Make changes to frontend code
3. Both will hot-reload during development
4. Test in browser at the Vite URL
5. Commit and push changes

## Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

---

**Last Updated**: January 20, 2026
