FROM php:8.1-apache

# Install SQLite3 development library
RUN apt-get update \
    && apt-get install -y --no-install-recommends libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PDO + SQLite via PDO (works reliably)
RUN docker-php-ext-install pdo pdo_sqlite

# Install sqlite3 extension via PECL as fallback
RUN pecl install sqlite3 \
    && docker-php-ext-enable sqlite3 \
    || echo "SQLite3 extension install skipped"

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy project files
COPY . /var/www/html/

# Create data directory and set permissions
RUN mkdir -p /var/www/html/Auto/data \
    && chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80
