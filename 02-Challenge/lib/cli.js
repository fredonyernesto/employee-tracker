const inquirer = require('inquirer');
const pool = require('../db/pool');
const { addEmployee } = require('./addEmployee');
const { updateRole } = require('./updateRole');
const { addRole } = require('./addRole');
const { addDepartment } = require('./addDepartment');
const { del } = require('./del');

class CLI {
  async run() {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'Question',
          message: 'What would you like to do?',
          choices: [
            'View All Employees', 
            'Add Employee', 
            'Update Employee Role',
            'Add Role',
            'View All Departments',
            'Add Department',
            'DELETE!'
          ]
        }
      ]);

      const choice = answers.Question;

      switch (choice) {
        case 'View All Employees':
          pool.query('SELECT * FROM employee', (err, { rows }) => {
            if (err) {
              console.error('Error fetching employees:', err);
              return;
            }
            console.log(rows);
          });
          break;

        case 'Add Employee':
          await addEmployee();
          break;

        case 'Update Employee Role':
          await updateRole();
          break;

        case 'Add Role':
          await addRole();
          break;

        case 'View All Departments':
          pool.query('SELECT * FROM department', (err, { rows }) => {
            if (err) {
              console.error('Error fetching departments:', err);
              return;
            }
            console.log(rows);
          });
          break;

        case 'Add Department':
          await addDepartment();
          break;
          
        case 'DELETE!':
          await del(); 
          break;

        default: 
          console.log('No valid option selected');
      }
      this.run();
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

module.exports = CLI;
