CREATE DATABASE cms_db;

-- connect to cms_database in psql then add table below

CREATE TABLE posts(
  content_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content VARCHAR(255)
);
