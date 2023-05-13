INSERT INTO department (department_name)
VALUES  ("Accounting"),
        ("Audit"),
        ("Financial Planing & Budgeting"),
        ("Corporate Treasury");

INSERT INTO  employeeRole (title, salary, department_id)
VALUES  ("Senior Accountant", 85000, 1),
        ("Junior Accountant", 65000, 2),
        ("Tax Accountant", 60000, 3),
        ("Auditor", 80000, 4),
        ("Information Technology Auditor", 95000, 5),
        ("Financial Manager", 150000, 6),
        ("Financial Analyst", 100000, 7),
        ("Budget Analyst", 84000, 8),
        ("Finance Director", 200000, 9),
        ("Tax Director", 160000, 10);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Clive", "Tyldesley", 9, NULL),
        ("Alan", "Smith", 10, 9),
        ("Josh", "Barker", 1, 9),
        ("Celine", "Scott", 2, 1),
        ("Stephanie", "Maguire", 4, 9),
        ("Steve", "Macanally", 5, 9),
        ("David", "Robinson", 3, 1),
        ("Katie", "McCabe", 6, 9),
        ("Stina", "Goldsmith", 7, 6),
        ("Peter", "Drury", 8, 6);


