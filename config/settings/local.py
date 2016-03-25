import os
from .common import Common
from configurations import values

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
APPS_DIR = os.path.join(BASE_DIR, 'woodshop')

class Local(Common):
    # Gulp injected tmp files (override)
    # ------------------------------------------------------------------------------
    Common.TEMPLATES[0]['DIRS'] = [os.path.join(BASE_DIR, '.tmp/serve')]
    Common.STATICFILES_DIRS += (os.path.join(BASE_DIR, '.tmp/serve'),)

    Common.SECRET_KEY = env('SECRET_KEY')
    DEBUG = values.BooleanValue(True)
    for config in Common.TEMPLATES:
        config['OPTIONS']['debug'] = DEBUG

    # Testing
    INSTALLED_APPS = Common.INSTALLED_APPS
    INSTALLED_APPS += ('django_nose', 'django_extensions', 'debug_toolbar')

    TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'
    NOSE_ARGS = [
        BASE_DIR,
        '--nocapture',
        '--nologcapture',
        '--with-coverage',
       # '--cover-erase',
       # '--cover-html',
        '--with-progressive',
        '--cover-package={}'.format(BASE_DIR)
    ]

    # Mail
    EMAIL_HOST = 'localhost'
    EMAIL_PORT = 1025
    EMAIL_BACKEND = values.Value('django.core.mail.backends.console.EmailBackend')

    # Django RQ local settings
    RQ_QUEUES = {
        'default': {
            'URL': os.getenv('REDISTOGO_URL', 'redis://localhost:6379'),
            'DB': 0,
            'DEFAULT_TIMEOUT': 500,
        },
    }
