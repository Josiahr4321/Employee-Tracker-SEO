const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'business_db'
    }
    
);

// db.promise().query("SELECT * FROM department").then(([response]) => console.log(response));

function mainMenu ()  {
    
    inquirer.prompt([{
        type: "list",
        name: "task",
        message: "select your action",
        choices: ["view all departments", "view all roles", "view all employees", "add role", "add department", "add employee"] 
    }]).then(answer => {
        switch (answer.task) {
            case "view all departments":
                viewDepartments()
                break;
            case "view all roles":
                viewRoles()
                break;
            case "view all employees":
                viewEmployees()
                break;
            case "add role":
                addRole()
                break;
            case "add department": 
                addDepartment()
                break;
            case "add employee": 
                break;
            default:
                break;
        }
    }).catch(console.log)
};

function viewDepartments() {
    db.promise().query("SELECT * FROM department").then(([response]) => {
        console.table(response)
        mainMenu()
    });

} function viewRoles() {
    db.promise().query("SELECT * FROM role LEFT JOIN department ON role.department_id = department.id").then(([response]) => {
        console.table(response)
        mainMenu()
    });
} function viewEmployees() {
    db.promise().query("SELECT CONCAT(employee.first_name, ' ',employee.last_name) AS Name, role.title AS Title, role.salary AS Salary, department.department_name AS Department, manager.first_name AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id").then(([response]) => {
        console.table(response)
        mainMenu()
    });
}
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Enter department name:',
        }
    ]).then(({ department_name }) => {
        db.promise().query("INSERT INTO department (department_name) VALUES (?)", [department_name])
            .then(([rows]) => {
                if (rows.affectedRows === 1) {
                    viewDepartments();
                } else {
                    console.info("Failed to add new department.");
                    mainMenu();
                }
            });
    });

}
async function addRole() {
    const [departments] = await db.promise().query("SELECT * FROM department")
   const departmentArray = departments.map(({id,department_name})=>({
    name:department_name,
    value:id
   }));
   console.log(departmentArray)
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter employee title',
        },
        {
            type:'input',
            name:'salary',
            message:'Enter employee salary',
        },
        {
            type:'list',
            name:'department_id',
            message:'Select department from list',
            choices:departmentArray,
        }
    ]).then (({title,salary,department_id})=>{
    const roleObject = {
        title,salary,department_id
    }
    db.promise().query("INSERT INTO role SET ?", roleObject).then(([rows])=>{
        if(rows.affectedRows === 1){
            viewRoles()
        }else{
            console.info("fail to add new role")
            mainMenu()
        }
    })
    });
}
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee first name:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employee last name:',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select employee role:',
            choices: roleChoices, 
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select employee manager:',
            choices: managerChoices, 
        }
    ]).then(({ first_name, last_name, role_id, manager_id }) => {
        const employeeObject = {
            first_name,
            last_name,
            role_id,
            manager_id,
        };
        db.promise().query("INSERT INTO employee SET ?", employeeObject)
            .then(([rows]) => {
                if (rows.affectedRows === 1) {
                    viewEmployees();
                } else {
                    console.info("Failed to add new employee.");
                    mainMenu();
                }
            });
    });
}
mainMenu();