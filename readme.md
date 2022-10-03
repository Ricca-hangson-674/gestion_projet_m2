$ docker-compose up --build -d

$ docker-compose up

$ docker exec -it nrh_php_fpm bash

$ ls /usr/local/include/php/ext

$ adduser --disabled-password --gecos '' nginx

$ chown -R nginx:nginx storage
$ chown -R nginx:nginx bootstrap/cache

#### LARAVEL

$ cd laravel
$ composer create-project --prefer-dist laravel/laravel .
$ php artisan --seed

$ chown -R nginx:nginx .
$ chmod -R o+w storage

### SYMFONY

$ cd symfony
$ symfony check:requirements

$ composer create-project symfony/skeleton:"6.1.*" .
$ composer require webapp


$ chown -R nginx:nginx .


### /etc/hosts || C:\windows\system32\drivers\etc\hosts

127.0.0.1  localhost.laravel
127.0.0.1  localhost.symfony

http://localhost.symfony:8080
http://localhost.laravel:8080

http://127.0.0.1:8081
