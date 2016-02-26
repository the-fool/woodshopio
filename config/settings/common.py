import os

from configurations import Configuration, values


BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
APPS_DIR = os.path.join(BASE_DIR, 'woodshop')

class Common(Configuration):

    INSTALLED_APPS = (
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',

        # Third party apps
        'rest_framework',            # utilities for rest apis
        'rest_framework.authtoken',  # token authentication
        'rest_auth',                 # basic login/logout
        'rest_auth.registration',
        'django_rq',                 # asynchronous queuing
        'versatileimagefield',       # image manipulation
        'djangobower',               # frontend asset manager
        'corsheaders',               # allows requests from multiple ports

        # My apps
        'woodshop.api.authentication',  # helper auth 
        'woodshop.frontend',
        'woodshop.frontend.bazaar',     # main frontend app (i.e, not the interface to managing a store or viewing analytics) 
        'woodshop.frontend.cubicle',    # dashboard management for vendors
        'woodshop.api.gems',            # manage gem assets
        'woodshop.api.users',           # eponymous
        'woodshop.api.reviews'

    )

    BOWER_INSTALLED_APPS = ('angular#1.5.0',
         'angular-animate#1.5.0',
         'angular-bootstrap#1.1.2',
         'angular-cookies#1.5.0',
         'angular-mocks#1.5.0',
         'angular-resource#1.5.0',
         'angular-route#1.5.0',
         'angular-sanitize#1.5.0',
         'bootstrap#3.3.6',
         'font-awesome#4.5.0',
         'jasmine#2.4.1',
         'jasmine-jquery#2.1.1',
         'jquery#2.2.0',
         'lodash#4.4.0',
         'metisMenu#2.4.0',
         'modernizr#3.3.1',
         'underscore#1.8.3'
        )


    # https://docs.djangoproject.com/en/1.8/topics/http/middleware/
    MIDDLEWARE_CLASSES = (
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
        'django.middleware.security.SecurityMiddleware',
        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.common.CommonMiddleware',
    )

    ROOT_URLCONF = 'config.urls'
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]

    SECRET_KEY = 'Not a secret'
    WSGI_APPLICATION = 'config.wsgi.application'
    CORS_ORIGIN_WHITELIST = (
            '127.0.0.1:8000',
            'localhost:8000'
        )
    CORS_ALLOW_CREDENTIALS = True
    # Allow for less strict handling of urls
    APPEND_SLASH = True

    # Migrations
    MIGRATION_MODULES = {
        'sites': 'contrib.sites.migrations'
    }

    # Set DEBUG to False as a default for safety
    # https://docs.djangoproject.com/en/dev/ref/settings/#debug
    DEBUG = values.BooleanValue(False)
    for config in TEMPLATES:
        config['OPTIONS']['debug'] = DEBUG

    # Email
    EMAIL_BACKEND = values.Value('django.core.mail.backends.smtp.EmailBackend')

    MANAGERS = (
        ("Author", 'sketchbang@gmail.com'),
    )

    # Postgres
    DATABASES = values.DatabaseURLValue('postgres://localhost/woodshop')

    # General
    APPEND_SLASH = False
    TIME_ZONE = 'UTC'
    LANGUAGE_CODE = 'en-us'
    SITE_ID = 1
    # If you set this to False, Django will make some optimizations so as not
    # to load the internationalization machinery.
    USE_I18N = False
    USE_L10N = True
    USE_TZ = True
    LOGIN_REDIRECT_URL = '/'

    # Directory structure
    PROJECT_ROOT = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../.."),
    )


    # Static Files
    BOWER_COMPONENTS_ROOT = os.path.join(PROJECT_ROOT, 'components')
    STATIC_ROOT = os.path.join(PROJECT_ROOT, '../static')
    STATIC_URL = '/static/'
    STATICFILES_FINDERS = (
        'django.contrib.staticfiles.finders.FileSystemFinder',
        'django.contrib.staticfiles.finders.AppDirectoriesFinder',
        'djangobower.finders.BowerFinder',
    )

    # Media files
    MEDIA_ROOT = os.path.join(PROJECT_ROOT, 'media')
    MEDIA_URL = '/media/'

    # Logging
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'filters': {
            'require_debug_false': {
                '()': 'django.utils.log.RequireDebugFalse'
            }
        },
        'formatters': {
            'verbose': {
                'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
            },
            'simple': {
                'format': '%(levelname)s %(message)s'
            },
            "rq_console": {
                "format": "%(asctime)s %(message)s",
                "datefmt": "%H:%M:%S",
            },
        },
        'handlers': {
            'mail_admins': {
                'level': 'ERROR',
                'filters': ['require_debug_false'],
                'class': 'django.utils.log.AdminEmailHandler'
            },
            'console': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
                'formatter': 'simple'
            },
            "rq_console": {
                "level": "DEBUG",
                "class": "rq.utils.ColorizingStreamHandler",
                "formatter": "rq_console",
                "exclude": ["%(asctime)s"],
            },
        },
        'loggers': {
            'django.request': {
                'handlers': ['mail_admins'],
                'level': 'ERROR',
                'propagate': True
            },
            "rq.worker": {
                "handlers": ["rq_console"],
                "level": "DEBUG"
            },
        }
    }

    # Custom user app

    AUTH_USER_MODEL = 'users.User'
   
    # Django Rest Framework
    REST_FRAMEWORK = {
        'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
        'PAGE_SIZE': 100,
        'DATETIME_FORMAT': '%Y-%m-%dT%H:%M:%S%z',
        'DEFAULT_RENDERER_CLASSES': (
            'rest_framework.renderers.JSONRenderer',
            'rest_framework.renderers.BrowsableAPIRenderer',
        ),
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticated',
        ],
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework.authentication.TokenAuthentication',
            'rest_framework.authentication.SessionAuthentication',
        )
    }

    # Versatile Image Field
    VERSATILEIMAGEFIELD_SETTINGS = {
        # The amount of time, in seconds, that references to created images
        # should be stored in the cache. Defaults to `2592000` (30 days)
        'cache_length': 2592000,
        'cache_name': 'versatileimagefield_cache',
        'jpeg_resize_quality': 70,
        'sized_directory_name': '__sized__',
        'filtered_directory_name': '__filtered__',
        'placeholder_directory_name': '__placeholder__',
        'create_images_on_demand': False
    }
