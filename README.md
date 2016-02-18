# Initialize the project
Create and activate a virtualenv:

```bash
virtualenv env
source env/bin/activate
```
Install dependencies (requires node):

```bash
pip install -r requirements/local.txt
npm install
manage.py bower install
```
Create the postgres database:

```bash
createdb woodshop
```


Migrate the database and create a superuser:
```bash
python woodshop/manage.py migrate
python woodshop/manage.py createsuperuser
```

Test-it
```bash
python manage.py test
npm test
```

Run the development server: 
```bash
python woodshop/manage.py runserver
```
