web: newrelic-admin run-program gunicorn --pythonpath="$PWD/woodshop" wsgi:application
worker: python woodshop/manage.py rqworker default