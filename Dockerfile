FROM php:8.1-apache

# Install required system packages and PHP extensions
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    unzip \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-install sqlite3 pdo_sqlite \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Enable mod_rewrite for .htaccess
RUN a2enmod rewrite

# Set Apache DocumentRoot to the Auto directory
ENV APACHE_DOCUMENT_ROOT /var/www/html/Auto
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Set PHP configuration
RUN echo "memory_limit = 256M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "upload_max_filesize = 50M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "post_max_size = 50M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/custom.ini

# Copy all project files
COPY . /var/www/html/

# Set proper permissions for SQLite database writes
RUN chown -R www-data:www-data /var/www/html/Auto \
    && chmod -R 755 /var/www/html/Auto \
    && mkdir -p /var/www/html/Auto/data \
    && chown www-data:www-data /var/www/html/Auto/data

EXPOSE 80

CMD ["apache2-foreground"]
