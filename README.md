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

Install dependencies (requires node):

```bash
pip install -r requirements/local.txt
npm install
python manage.py bower install
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

Run the development server: 
```bash
python manage.py runserver
```
