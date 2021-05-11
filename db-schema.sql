-- 1. To create the test database
CREATE DATABASE cms_db_test;
-- 2. connect to cms_db_test in psql then add the tables below
\c cms_db_test;
-- 3. Create posts table
CREATE TABLE posts(
  content_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL,
  date_created TIMESTAMP
);
-- 4. Create pgcrypto extension to encrypt passwords in users table
CREATE EXTENSION pgcrypto;
-- 5. Create Users table
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(350) NOT NULL,
  role VARCHAR(50) NOT NULL,
  date_created TIMESTAMP
);
-- 6. To create the production database
CREATE DATABASE cms_db;
-- 7.. Repeat steps 2-5 and create the tables for the 'production' database
