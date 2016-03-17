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
        'guardian',
        'dry_rest_permissions',
        'django_rq',                 # asynchronous queuing
        'versatileimagefield',       # image manipulation
        'storages',
        'corsheaders',               # allows requests from multiple ports

        # My apps
        'woodshop.api.authentication',  # helper auth
        'woodshop.frontend',
        'woodshop.frontend.bazaar',     # main frontend app (i.e, not the interface to managing a store or viewing analytics)
        'woodshop.frontend.cubicle',    # dashboard management for vendors
        'woodshop.api.gems',            # manage gem assets
        'woodshop.api.reviews',         # reviews functionality
        'woodshop.api.vendors',
        'woodshop.api.transactions',
        'woodshop.api.users'            # eponymous

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
            # See: https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-TEMPLATES-BACKEND
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            # See: https://docs.djangoproject.com/en/dev/ref/settings/#template-dirs
            'DIRS': [
                os.path.join(APPS_DIR, 'frontend/templates'),
            ],
            'OPTIONS': {
                # See: https://docs.djangoproject.com/en/dev/ref/settings/#template-loaders
                # https://docs.djangoproject.com/en/dev/ref/templates/api/#loader-types
                'loaders': [
                    'django.template.loaders.filesystem.Loader',
                    'django.template.loaders.app_directories.Loader',
                ],
                # See: https://docs.djangoproject.com/en/dev/ref/settings/#template-context-processors
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.template.context_processors.i18n',
                    'django.template.context_processors.media',
                    'django.template.context_processors.static',
                    'django.template.context_processors.tz',
                    'django.contrib.messages.context_processors.messages',
                    # Your stuff: custom template context processors go here
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
    DATABASES = values.DatabaseURLValue('postgres://127.0.0.1/woodshop')

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
    STATIC_ROOT = os.path.join(PROJECT_ROOT, '../static')
    STATIC_URL = '/static/'
    STATICFILES_FINDERS = (
        'django.contrib.staticfiles.finders.FileSystemFinder',
        'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    )
    STATICFILES_DIRS = (
        os.path.join(APPS_DIR, 'frontend/static'),
    )

    # Media files
    #Toggle on for storing media on S3
    """
    AWS_STORAGE_BUCKET_NAME = 'woodshopstorage'
    AWS_ACCESS_KEY_ID = 'AKIAIIHWNZZZIGGBRCBQ'
    AWS_SECRET_ACCESS_KEY = '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'
    AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
    MEDIA_URL = "https://%s/" % AWS_S3_CUSTOM_DOMAIN
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
    """
    #Toggle on for storing media locally
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

    # Backend authentication
    ANONYMOUS_USER_ID = '813b2783-23e7-484d-b259-696c24076b0f'
    AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'guardian.backends.ObjectPermissionBackend',
    )

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
            'rest_framework.authentication.SessionAuthentication',
            'rest_framework.authentication.TokenAuthentication',
        )
    }
    REST_SESSION_LOGIN = True

    REST_AUTH_SERIALIZERS = {
        'USER_DETAILS_SERIALIZER': 'woodshop.api.users.serializers.UserSerializer'
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
