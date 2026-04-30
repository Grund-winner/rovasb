FROM php:8.1-apache

# Install SQLite3 development library
RUN apt-get update \
    && apt-get install -y --no-install-recommends libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions one by one to isolate issues
RUN docker-php-ext-install pdo
RUN docker-php-ext-install pdo_sqlite
RUN docker-php-ext-install sqlite3

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy project files
COPY . /var/www/html/

# Create data directory and set permissions
RUN mkdir -p /var/www/html/Auto/data \
    && chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80
