const inquirer = require('inquirer');
const mysql = require('mysql2')
const console = require('console')

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '12345',
        database: 'employee_db'
    }
)

const questions = [
    {
        type: 'list',
        message: 'Please select an option',
        name: 'options',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit'
        ]
    }
]

function choice() {
    inquirer.prompt(questions)
        .then((response) => {
            if (response.options === 'Quit') {
                return;
            } else {
                preference(response);
            }
        })
}

const preference = async (response) => {
    switch (response.options) {
        case "View All Employees":
            return viewAllEmployees();
            break;


        case "Add Employee":
            return addEmployee();
            break;


        case "Update Employee Role":
            return updateEmployeeRole();
            break;


        case "View All Roles":
            return viewAllRoles();
            break;


        case "Add Role":
            return addRole();
            break;


        case "View All Departments":
            return viewAllDepartments();
            break;

        case "Add Department":
            return addDepartment();
            break;

        case "Quit":
            return quitDB();
            break;
    }
}

const viewAllEmployees = function () {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results)
        choice()
    })
}

const viewAllRoles = function () {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results)
        choice()
    })
}

const viewAllDepartments = function () {
    db.query("SELECT * FROM department", function (err, results) {
        console.table(results)
        choice()
    })
}

function addEmployee() {
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.log(err);
        }
        const roles = results.map((role) => ({
            name: role.title,
            value: role.id,
        }))

        db.query(`SELECT id, first_name, last_name FROM employee`, (err, results) => {
            if (err) {
                console.log(err);
            }
            const managers = results.map((employee) => ({
                name: employee.first_name + employee.last_name,
                value: employee.id,
            }))

            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the employees first name?',
                    name: 'firstName'
                },
                {
                    type: 'input',
                    message: 'What is the employees last name?',
                    name: 'lastName'
                },
                {
                    type: 'list',
                    message: 'What is the employees role?',
                    name: 'role',
                    choices: roles
                },
                {
                    type: 'list',
                    message: 'Who is the employees manager?',
                    name: 'manager',
                    choices: managers
                }
            ])
                .then(
                    (resp) => {
                        const firstName = resp.firstName;
                        console.log("First name: " + firstName)
                        const lastName = resp.lastName;
                        console.log("Last name: " + lastName)
                        const selectedRole = resp.role
                        const selectedManager = resp.manager
                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${firstName}", "${lastName}", ${selectedRole}, ${selectedManager})`, function (err, results) {
                            if (err) {
                                console.log("Data Insert Error")
                            } else {
                                console.log(`Added ${firstName} ${lastName} to the database`)
                                choice()
                            }
                        })
                    })
        })
    })
}

const updateEmployeeRole = function () {
    var roles = {};
    db.query(`SELECT * FROM role`, (err, results) => {
        if (err) {
            console.log(err)
        }
        const roles = results.map((role) => ({
            name: `${role.title}`,
            value: role,
        }))
    })

    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
            console.log(err)
        }
        const employees = results.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee,
        }))

        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employees role would you like to update?',
                name: 'employee',
                choices: employees
            }])
            .then((resp) => {
                const employee = resp.employee;
            
                inquirer.prompt([
            {
                type: 'list',
                message: 'Which role would you like to appropriate to the selected employee?',
                name: 'roleID',
                choices: roles
            },
        ])
            .then((resp) => {
                const selectedRole = resp.roleID

                db.query(`UPDATE employee SET role_id = ${selectedRole.id} WHERE employee_id = ${employee.id}`, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Role has been updated');
                    choice();
                });
            })
    })
})
}

function addRole() {
    db.query(`SELECT * FROM department`, function (err, results) {
        if (err){
            console.log(err)
        }
        const department = results.map((department) => ({
            name: `${department.department_name}`,
            value: department
        }));
    
    inquirer.prompt([
        {
            type: 'input',
            message: 'what is the name of the role?',
            name: "roleName"
        },
        {
            type: 'input',
            message: 'what is the salary of the role?',
            name: "roleSalary"
        },
        {
            type: 'list',
            message: 'which department does the role belong to?',
            name: 'departmentID',
            choices: department
        }
    ])
    .then((resp) => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES('${resp.roleName}', ${resp.roleSalary}, ${resp.departmentID.department_id})`)
        console.log(`Added ${resp.roleName} to the database`);
        choice();
    })
    })
}

function addDepartment () {
    inquirer.prompt([ 
        {
            type:'input',
            message: "What is the name of the new department?",
            name: 'departmentName',
        }
    ])
    .then((resp) => {
        db.query(`INSERT INTO department (department_name) VALUES ("${resp.departmentName})`, function (err,results){
            if (err){
                console.log(err)
            }
            console.log(`Added ${resp.departmentName} to the database`)
            choice();
        })
    }
)}

choice();