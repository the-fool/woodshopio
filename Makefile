syncdb:
	python ./manage.py makemigrations --noinput
	python ./manage.py migrate --noinput

fixtures:
	python ./manage.py create_users
	python ./manage.py create_gems
	python ./manage.py create_categories
	python ./manage.py categorize_gems
	python ./manage.py create_pictures
	python ./manage.py review_gems
	python ./manage.py categories_to_html_nav
