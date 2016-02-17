# Initialize the project
Create and activate a virtualenv:

```bash
virtualenv env
source env/bin/activate
```
Install dependencies (requires NPM + Bower):

```bash
pip install -r requirements/local.txt
manage.py bower install
```
Create the database:

```bash
createdb woodshop
```


Migrate the database and create a superuser:
```bash
python woodshop/manage.py migrate
python woodshop/manage.py createsuperuser
```

Run the development server: 
```bash
python woodshop/manage.py runserver
```
