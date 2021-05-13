-- 1. Set up a new PG user with db creation permissions, log into postgres as that user then create the test database:
CREATE DATABASE cms_db_test;
-- 2. Connect to the cms_db_test database in postgres
\c cms_db_test;
-- 3. Create posts table
CREATE TABLE posts(content_id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, content VARCHAR(255) NOT NULL, date_created TIMESTAMP NOT NULL);
-- 4. !!IMPORTANT!! Create the pgcrypto extension as below to encrypt passwords in users table.  This should be done before you create the users table
CREATE EXTENSION pgcrypto;
-- 5. Create Users table
CREATE TABLE users(user_id SERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL,
  password VARCHAR(350) NOT NULL, role VARCHAR(50) NOT NULL, date_created TIMESTAMP NOT NULL);
-- 6. While logged in as the same pg user create the production database
CREATE DATABASE cms_db;
-- 7.. Repeat steps 2-5 and create the tables for the 'production' database
