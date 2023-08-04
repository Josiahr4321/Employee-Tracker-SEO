const mysql = require('mysql2');
const inquirer = require('inquirer');
const { default: prompt } = require('inquirer/lib/ui/prompt');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
);

// db.promise().query("SELECT * FROM department").then(([response]) => console.log(response));

const mainMenu = () => {
    const prompt = inquirer.createPromptModule()
    prompt({
        type: "list",
        name: "task",
        message: "select your action",
        choices: ["view all departments", "view all roles", "view all employees","add role"]
    }).then(answer => {
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
            default:
                break;

        }
    })
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

}
mainMenu();