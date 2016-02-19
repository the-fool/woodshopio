syncdb:
	python ./manage.py makemigrations --noinput
	python ./manage.py migrate --noinput

fixtures:
	python ./manage.py create_users
	python ./manage.py create_gems
	python ./manage.py create_pictures