## Content Management System

### To run CMS
1. Clone Git repo to local directory
2. Move to directory in terminal and run ```npm install```
3. Install Postgres, if already installed then create database, extensions and tables as per db-schema.sql file in root directory
4. Create .env file with variables PG_USER, PG_PASSWORD, and
NODE_ENV=production
5. To run the app go to the parent folder and run ```npm start```

#### To run tests
1. Run ```npm test```

##### Coverage (Express API Routes)
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|-----------------------------------------
All files    |   92.59 |    82.93 |     100 |   92.59 |
 database.js |     100 |        0 |     100 |     100 | 9
 index.js    |   91.89 |       85 |     100 |   91.89 | 20-21,32-33,75-76,89-90,101-102,144-145


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
