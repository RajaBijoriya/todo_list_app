FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpq-dev \
    libmcrypt-dev \
    mysql-client \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    bcmath

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy application files
COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Navigate to backend and install dependencies
WORKDIR /var/www/html/backend

RUN composer install --no-dev --optimize-autoloader

# Set permissions for storage
RUN chmod -R 755 storage bootstrap/cache

# Expose port
EXPOSE 8000

# Start script
CMD ["bash", "../start.sh"]
