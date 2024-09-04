const fs = require('fs');
const inquirer = require('inquirer');
const { Pool } = require('pg');
const { addEmployee } = require('./addEmployee');

const pool = new Pool(
    {
      // TODO: Enter PostgreSQL username
      user: 'postgres',
      // TODO: Enter PostgreSQL password
      password: 'Fredboom11',
      host: 'localhost',
      database: 'books_db'
    },
    console.log(`Connected to the books_db database.`)
  )

  class CLI {

    run(){
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
            'Add Department'
          ]
        }
      ])
      .then(answers => {
        const choice = answers.Question;

        switch(choice){
          case 'View All Employees':
            pool.query('SELECT * FROM employees', (err, { rows }) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(rows);
            });
            break;

            case 'Add Employee':
              addEmployee()
              break;

              case 'Update Employee Role':
                
              
        }
      })
    }
  }

  
