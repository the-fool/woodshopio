# Initialize the project

Create and activate a virtualenv:

```bash
virtualenv env
source env/bin/activate
```

Pull down woodshopio repository from github:

```bash
git clone https://github.com/the-fool/woodshopio.git
```

Navigate into the woodshopio repository you just created:

```bash
cd woodshopio
```

Install project dependencies (requires node):

```bash
pip install -r requirements/local.txt
npm install
bower install
```

Create the postgres database:

```bash
createdb woodshop
psql woodshop: ALTER USER you CREATEDB
$ export DATABASE_URL="postgres://you:password@127.0.0.1/woodshop"
```

Migrate the database and create a superuser:
```bash
python woodshop/manage.py migrate
python woodshop/manage.py createsuperuser
```

Populate dummy data
```bash
make fixtures
```

Test-it
```bash
python manage.py test
npm test
```
Now, it gets tricky.  Frontend assets must be compiled and injected into the html templates before being served.
You can do this with: 
```bash
gulp inject
```
And, while working on the frontend, just let gulp run in the background
```bash
gulp watch
```
Gulp will automatically update all relevant front-end files.

Finally:
Run the development server: 
```bash
python manage.py runserver
```
