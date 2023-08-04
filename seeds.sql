-- Inserting seed data
INSERT INTO department (id, department_name) VALUES
  (1, 'Sales'),
  (2, 'Marketing'),
  (3, 'Finance'),
  (4, 'Human Resources'),
  (5, 'Information Technology'),
  (6, 'Operations'),
  (7, 'Research and Development'),
  (8, 'Customer Support'),
  (9, 'Administration'),
  (10, 'Quality Assurance');

  -- Inserting seed data
INSERT INTO role (id, title, department_id) VALUES
  (1, 'Manager', 100000, 1),
  (2, 'Sales Representative', 80000, 1),
  (3, 'Marketing Specialist', 100000, 2),
  (4, 'Financial Analyst', 80000, 3),
  (5, 'HR Coordinator', 75000, 4),
  (6, 'IT Technician', 75000, 5),
  (7, 'Operations Manager', 60000, 6),
  (8, 'Research Scientist', 120000, 7),
  (9, 'Customer Support Representative', 40000, 8),
  (10, 'Administrative Assistant', 50000, 9);

  INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
  (1, 'John', 'Doe', 1, NULL),
  (2, 'Jane', 'Smith', 2, 1),
  (3, 'Michael', 'Johnson', 3, 1),
  (4, 'Emily', 'Davis', 4, 2),
  (5, 'Robert', 'Wilson', 5, 2),
  (6, 'Laura', 'Anderson', 6, 3),
  (7, 'William', 'Taylor', 7, 3),
  (8, 'Olivia', 'Clark', 8, 4),
  (9, 'James', 'Thomas', 9, 5),
  (10, 'Sophia', 'Moore', 10, 6);