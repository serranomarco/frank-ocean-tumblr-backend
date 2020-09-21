# frank-ocean-tumblr-backend

## Setup
1. Clone project
2. Create .env files in the root directory (example.env included)
3. install packages with npm
4. From the root directory, run [npm install]

### Steps to Configure Project
1. Run the following to confirm that Express is configured correctly:
```bash
npm start  # starts the express server on port 8080
```
2. Run the following to confirm database connection to app:
```bash
npx dotenv sequelize db:migrate:all # will run all migrations files

# after migration have been run, do the following command:
npx dotenv sequelize db:seed:all # will seed the database
```

### Express.js:
- JWT Auth
- Form validations
- API Endpoints for User/Posts/Location CRUD

### Package List
- Express
- Express Bearer Token
- Express Validator
- Morgan
- per-env
- Sequelize
- Bcryptjs
- Faker

## API Endpoints

### User
- Create User
- Return Users
- User Auth -> /token

### Post
- Create Post
- Delete Post
- Update Post
- Return a Post
- Return all posts a user follows
- Return posts for a user

### Photo Post
- Create Photo Post
- Delete Photo Post
- Update Photo Post

### Quote Post
- Create Quote Post
- Delete Quote Post
- Update Quote Post

### Text Post
- Create Text Post
- Delete Text Post
- Update Text Post