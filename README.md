## Content Management System

### To run CMS
1. Clone Git repo to local directory
2. Move to directory in terminal and run ```npm install```
3. Install Postgres, if already installed then  create database and tables as per db-schema.sql file in root directory
4. Create .env file with variables PG_USER, PG_PASSWORD, and
NODE_ENV=production

#### To run tests
1. Run ```npm test```

##### Coverage (Express API Routes)
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|----------------------------------------
All files    |    92.5 |    82.05 |     100 |    92.5 |
 database.js |     100 |        0 |     100 |     100 | 9
 index.js    |   91.78 |    84.21 |     100 |   91.78 | 18-19,30-31,73-74,87-88,99-100,142-143

### Tech used:
- Express for APIs
- Jest to test back end

### Restful APIs
- Content
  - GET /content/:id (get one content post)
  - GET /content/ (get all content)
  - POST /content/add (add one content post)
  - PUT /content/:id (update one content post)
  - DELETE /content/:id (delete one content post)

- Users
  - GET /users/:id (get one user record)
  - GET /users/ (get all users)
  - POST /users/add (add one user record)
  - PUT /users/:id (update one user record)
  - DELETE /users/:id (delete one user record)
