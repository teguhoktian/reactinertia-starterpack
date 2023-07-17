# Inertia-React Auth Starterpack

Starterpack for make application based on Inertia.js and React.js

### Stack & Package

-   Laravel 10.x.x
-   React.js
-   Inertia.js
-   Laravel Breeze
-   Tailwind CSS
-   RainPurple Theme by Me
-   [Laravel Permission v5.x](https://spatie.be/docs/laravel-permission/v5/introduction)
-   [Laravel Backup v8.x](https://spatie.be/docs/laravel-backup/v8/introduction)
-   [Laravel Setting](https://github.com/spatie/laravel-settings)
-   [Laravel Log Activity v4.x](https://spatie.be/docs/laravel-activitylog/v4/introduction)

### Usage

-   Clone repository
-   Clone `.env` file from `.env.example`
-   Setting `.env` variable
-   Add location of dump binary mysql database to `MYSQL_DUMP_PATH` variable on `.env` file.
-   Update Composer

```bash
composer update
```

-   Generate Key

```bash
php artisan key:generate
```

-   Migrate database structure

```bash
php artisan migrate
```

-   Add Dummy Data of user

```bash
php artisan db:seed
```

-   Add Google Fonts

```bash
php artisan google-font:fetch
```

-   Storage Link

```bash
php artisan storage:link
```

-   Run localhost

```bash
php artisan serve
```

-   Run Queue

```bash
php artisan queue:work
```

-   Install npm package

```bash
npm install
```

-   Run develepoment

```bash
npm run dev
```

Visit Localhost (http://localhost:8000/)

### Licensing

-   Copyright 2023 [Raincode.My.Id](https://raincode.my.id)
-   Licensed under **MIT**

### Donation

Buy Me some Cofee and Snack with Donate me at [Saweria](https://saweria.co/raincodemyid)
