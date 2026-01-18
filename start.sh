#!/bin/bash

# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Generate app key if not exists
if [ -z "$APP_KEY" ]; then
  php artisan key:generate
fi

# Run migrations
php artisan migrate --force

# Start the application
php artisan serve --port=$PORT --host=0.0.0.0
