-- To create the test database
CREATE DATABASE cms_db_test;

-- connect to cms_db_test in psql then add table below

CREATE TABLE posts(
  content_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL
);



-- To create the production database
CREATE DATABASE cms_db;

-- connect to cms_db in psql then add table below

CREATE TABLE posts(
  content_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL
);
