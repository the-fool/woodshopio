# Initialize the project
Create and activate a virtualenv:

```bash
virtualenv env
source env/bin/activate
```
Install dependencies:

```bash
pip install -r requirements/local.txt
```
Create the database:

```bash
createdb woodshop
```
Initialize the git repository

```
git init
git remote add origin git@github.com:the-fool/woodshop.git
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
