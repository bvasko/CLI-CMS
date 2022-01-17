USE humanresources_db;

INSERT INTO department (name)
VALUES ("engineering"), ("marketing"), ("data science");

INSERT INTO role (title, salary, department_id)
VALUES ("Principal Architect", 450000.00, 1),
("Marketing Director", 225000.25, 2),
("Lead Data Scientist", 200000.00, 3),
("Software Engineer", 130000.00, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Bonnie", "Dipasquale", 4),
("Gareth", "Mcdonald", 1),
("Yusuf", "Mahmoud", 2),
("Tom", "Murphy", 3);