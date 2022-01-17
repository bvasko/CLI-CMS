DROP DATABASE IF EXISTS registrar_db;
CREATE DATABASE registrar_db;

USE registrar_db;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT 
);
