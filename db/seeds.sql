INSERT INTO department (department_name)
VALUES  ("Accounting"),
        ("Audit"),
        ("Financial Planing & Budgeting"),
        ("Corporate Treasury");

INSERT INTO  role (title, salary, department_id)
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

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Clive", "Tyldesley", 9),
        ("Alan", "Smith", 10),
        ("Josh", "Barker", 1),
        ("Celine", "Scott", 2),
        ("Stephanie", "Maguire", 4),
        ("Steve", "Macanally", 5),
        ("David", "Robinson", 3),
        ("Katie", "McCabe", 6),
        ("Stina", "Goldsmith", 7),
        ("Peter", "Drury", 8);


