create_database:
	python ./manage.py makemigrations --noinput
	python ./manage.py migrate --noinput

make_fixtures:
	python ./manage.py create_users
	python ./manage.py create_gems
	python ./manage.py create_pictures