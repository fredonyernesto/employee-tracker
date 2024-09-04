const fs = require('fs');
const inquirer = require('inquirer');
const pool = require('./db');
const { addEmployee } = require('./addEmployee');
const { updateRole } = require('./updateRole');
const { addRole } = require('./addRole');
const { addDepartment } = require('./addDepartment');
const { del } = require('./del'); 

class CLI {
  run() {
    return inquirer
      .prompt([
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
      ])
      .then(answers => {
        const choice = answers.Question;

        switch (choice) {
          case 'View All Employees':
            pool.query('SELECT * FROM employees', (err, { rows }) => {
              if (err) {
                console.error('Error fetching employees:', err);
                return;
              }
              console.log(rows);
            });
            break;

          case 'Add Employee':
            addEmployee();
            break;

          case 'Update Employee Role':
            updateRole();
            break;

          case 'Add Role':
            addRole();
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
            addDepartment();
            break;
            
          case 'DELETE!':
            del(); 
            break;

          default: 
            console.log('No valid option selected');
        }
      })
      .then(() => {
        return this.run(); 
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

module.exports = CLI;
