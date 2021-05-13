## Content Management System

### To run the CMS
1. Clone the Git repo to your local directory
2. Move to the root directory and run ```npm install```
3. Ensure postgres is installed, then create a postgres user with database creation permissions.
4. Create the databases, extensions and tables as per the instructions [here](db-schema.sql)
5. Create .env file with variables PG_USER, PG_PASSWORD (use the credentials for the postgres user set up in step 4), PORT (use pg default port) and
NODE_ENV=production
6. To run the app go to the parent directory and run ```npm start```

### Screenshots
![home](Screenshots/Homepage.JPG)
![AddContent](Screenshots/AddContent.JPG)
![AllContent](Screenshots/AllContent.JPG)
![AddUsers](Screenshots/AddUser.JPG)
![AllUsers](Screenshots/AllUsers.JPG)

##### Tests
- Express API back end test coverage:

File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|---------------------
All files    |   91.78 |    95.45 |     100 |   91.78 |
 database.js |     100 |       50 |     100 |     100 | 9
 index.js    |   91.18 |      100 |     100 |   91.18 | 20,32,75,89,101,144


### Tech used:
- Express for APIs
- Postgres for the database
  - Postgres extension pgcrypto for encryption
- Jest to test back end
- React for the front end (create-react-app)
- Jest/React Testing Library to test the front end

NB. Frameworks chosen due to some previous experience of each.  

### Project Summary
#### Functionality included:
- Adding and deleting users and content.
- APIs created for GET/POST/PUT/DELETE for both users and content.  
- Password encryption in the PG database.  
- Some interactivity such as navigation to home screen and cycling through users or content.  
- CSS styling.
- Edge cases considered e.g. app continues when no data in database, broken number sequence of record ids due to data deletion guarded against when cycling through records, input form text box size variability using text area.   
- Styled with a focus on mobile view as shown in screenshots above.  

#### Improvements required:
- Authentication.  This was attempted but dropped due to issues with linking chosen authentication provider to users' table.
- Further refactoring to clean up code and remove repetition.
- Update React syntax.
- More in depth front end testing and full integration testing.
- Improve the CSS styling to be more visually appealing.
- Functionality to amend records (this was adue to time).
- Make dates more readable (this was attempted but dropped due to issues and time).

#### Time Spent
- 1 week

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
