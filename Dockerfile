FROM php:8.1-apache

# Install PostgreSQL development library
RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PDO + PostgreSQL
RUN docker-php-ext-install pdo pdo_pgsql

# Also keep SQLite for compatibility (Rovaspredict.php uses it)
RUN apt-get update \
    && apt-get install -y --no-install-recommends libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install pdo_sqlite

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy project files
COPY . /var/www/html/

# Create data directory and set permissions
RUN mkdir -p /var/www/html/Auto/data \
    && chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80
