-- To create the test database
CREATE DATABASE cms_db_test;

-- connect to cms_db_test in psql then add the tables below

CREATE TABLE posts(
  content_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL
);

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL
);

-- insert the below records or insert your own

-- To create the production database
CREATE DATABASE cms_db;

-- connect to cms_db in psql then add the tables below

CREATE TABLE posts(
  content_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL
);

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL
);

-- insert the below records or insert your own
