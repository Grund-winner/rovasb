FROM debian:bookworm-slim

# Install Apache, PHP 8.2 and required extensions from Debian packages
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
    apache2 \
    php8.2 \
    php8.2-sqlite3 \
    php8.2-mbstring \
    php8.2-curl \
    php8.2-xml \
    libapache2-mod-php8.2 \
    sqlite3 \
    unzip \
    curl \
    && a2enmod rewrite php8.2 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set Apache DocumentRoot to the Auto directory
ENV APACHE_DOCUMENT_ROOT /var/www/html/Auto
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!<Directory /var/www/>!<Directory /var/www/html/Auto>!g' /etc/apache2/apache2.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# Set PHP configuration
RUN echo "memory_limit = 256M" >> /etc/php/8.2/apache2/conf.d/custom.ini \
    && echo "upload_max_filesize = 50M" >> /etc/php/8.2/apache2/conf.d/custom.ini \
    && echo "post_max_size = 50M" >> /etc/php/8.2/apache2/conf.d/custom.ini \
    && echo "max_execution_time = 300" >> /etc/php/8.2/apache2/conf.d/custom.ini

# Copy all project files
COPY . /var/www/html/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html/Auto \
    && chmod -R 755 /var/www/html/Auto \
    && mkdir -p /var/www/html/Auto/data \
    && chown www-data:www-data /var/www/html/Auto/data

EXPOSE 80

CMD ["apache2-foreground"]
