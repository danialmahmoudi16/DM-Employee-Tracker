const inquirer = require('inquirer');
const mysql = require('mysql2')
const console = require('console')

const db = mysql.createConnection(
    {
        host: 'localhost',
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
        console.table("Employees", results)
        choice()
    })
}

const viewAllRoles = function () {
    db.query('SELECT * FROM role', function (err, results) {
        console.table("Roles", results)
        choice()
    })
}

const viewAllDepartments = function () {
    db.query('SELECT * FORM department', function (err, results) {
        console.table("Departments", results)
        choice()
    })
}

function addEmployee() {
    db.query(`SELECT * FROM role`, function (err, results) {
        if (err) {
            console.log(err);
        }
        const roles = results.map((role) => ({
            name: `${role.title}`,
            value: role,
        }))

        db.query(`SELECT * FROM employee`, function (err, results) {
            if (err) {
                console.log(err);
            }
            const managers = results.map((employee) => ({
                name: `${employee.manager_id}`,
                value: employee,
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
                        firstName = resp.firstname;
                        console.log("First name: " + firstName)
                        lastName = resp.lastname;
                        console.log("Last name: " + lastName)
                        selectedRole = resp.role
                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${firstName}", "${lastName}", ${selectedRole.role_id}, ${resp.manager.manager_id})`, function (err, results) {
                            if (err) {
                                console.log("Data Insert Error")
                            } else {
                                console.log(`${firstName} ${lastName} has been added`)
                                choice()
                            }
                        })
                    })
        })
    })
}

const newRole = function () {
    var roles = {};
    db.query(`SELECT * FROM role`, (err, results) => {
        if (err) {
            console.log(err)
            return
        }
        const roles = results.map((role) => ({
            name: `${role.role_title}`,
            value: role,
        }))
    })

    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
            console.log(err)
            return
        }
        const employees = results.map((employee) => ({
            name: `${remployee.first_name} ${employee.lastname}`,
            value: employee,
        }))

        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employees role would you like to update?',
                name: 'employee',
                choices: employees
            },
            {
                type: 'list',
                message: 'Which role would you like to appropriate to the selected employee?',
                name: 'employee',
                choices: roles
            },
        ])
            .then((resp) => {
                const selectedRole = resp.role_id

                db.query(`UPDATE employee SET role_id = ${selectedRole.role_id} ${employee.last_Name}`, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Role has been updated');
                    choice();
                });
            })
    })
}


