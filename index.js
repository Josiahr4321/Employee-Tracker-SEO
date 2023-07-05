const mysql = require('mysql2');
const inquirer= require('inquirer');
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

 const mainMenu= ()=>{
    const prompt= inquirer.createPromptModule()
    prompt({
        type:"list",
        name:"task",
        message:"select your action",
        choices:["view all departments","view all roles","view all employees"]
    }).then(answer => {
        switch (answer.task) {
            case "view all departments":
                db.promise().query("SELECT * FROM department").then(([response]) =>{ 
                    console.table(response)
                    mainMenu()
                });

                break;
                case "view all roles":
                    db.promise().query("SELECT * FROM role").then(([response]) => console.table(response));
                break;
                case "view all employees":
                    db.promise().query("SELECT * FROM employee").then(([response]) => console.table(response));
            default:
                break;
                
        }
    })
 };

 mainMenu();