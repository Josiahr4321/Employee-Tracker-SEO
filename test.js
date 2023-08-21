const inquirer = require('inquirer')

function main(){
    inquirer.prompt([{
        type: "list",
        name: "task",
        message: "select your action",
        choices: ["view all departments", "view all roles", "view all employees", "add role", "add department", "add employee"] 
    }]).then(console.log)
}main();