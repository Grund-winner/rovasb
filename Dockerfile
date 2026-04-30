FROM debian:bookworm-slim

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
    && a2enmod rewrite \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Override Apache DocumentRoot to Auto directory
RUN echo '<VirtualHost *:80>\
    DocumentRoot /var/www/html/Auto\
    <Directory /var/www/html/Auto>\
        Options -Indexes +FollowSymLinks\
        AllowOverride All\
        Require all granted\
    </Directory>\
    ErrorLog ${APACHE_LOG_DIR}/error.log\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf \
    && echo 'ServerName localhost' >> /etc/apache2/apache2.conf

# PHP settings
RUN echo "memory_limit = 256M\nupload_max_filesize = 50M\npost_max_size = 50M\nmax_execution_time = 300" > /etc/php/8.2/apache2/conf.d/custom.ini

COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html/Auto \
    && chmod -R 755 /var/www/html/Auto \
    && mkdir -p /var/www/html/Auto/data \
    && chown www-data:www-data /var/www/html/Auto/data

EXPOSE 80

CMD ["apache2-foreground"]
