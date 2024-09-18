-- -- Seeding the department table
-- INSERT INTO department (name) VALUES
-- ('Engineering'),
-- ('Marketing'),
-- ('Human Resources');

-- -- Seeding the role table
-- INSERT INTO role (title, salary, department_id) VALUES
-- ('Software Engineer', 90000, 1),
-- ('QA Engineer', 80000, 1),
-- ('Marketing Specialist', 70000, 2),
-- ('HR Manager', 85000, 3);

-- -- Seeding the employee table
-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
-- ('John', 'Doe', 1, NULL),
-- ('Jane', 'Smith', 2, 1),
-- ('Emily', 'Johnson', 3, NULL),
-- ('Michael', 'Brown', 4, NULL),
-- ('Robert', 'Davis', 1, 1);


SELECT 
    employee.id AS id, 
    CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name, 
    role.title AS title, 
    department.name AS department,
    role.salary AS salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM 
    employee
JOIN 
    role ON employee.role_id = role.id
JOIN 
    department ON role.department_id = department.id
LEFT JOIN 
    employee AS manager ON employee.manager_id = manager.id;

