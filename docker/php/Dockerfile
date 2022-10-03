FROM php:8.1-fpm

RUN apt-get update \
    &&  apt-get install -y --no-install-recommends \
        locales apt-utils git libicu-dev g++ libpng-dev \
        libxml2-dev libzip-dev libonig-dev libxslt-dev unzip npm nodejs

# RUN rm -rf /var/lib/apt/lists/*

RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen  \
    &&  echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen \
     &&  locale-gen

RUN curl -sS https://getcomposer.org/installer | php -- \
    &&  mv composer.phar /usr/local/bin/composer

#RUN curl -sS https://get.symfony.com/cli/installer | bash \
#    &&  mv /root/.symfony5/bin/symfony /usr/local/bin

RUN git config --global user.email "n.riccahang674@gmail.com"
RUN git config --global user.name "NRH"

RUN docker-php-ext-configure intl

# /usr/local/include/php/ext

RUN docker-php-ext-install \
    pdo pdo_mysql opcache intl zip calendar dom mbstring gd xsl xml

RUN pecl install apcu && docker-php-ext-enable apcu

RUN npm install -g n && n latest

RUN npm install --global yarn

WORKDIR /code