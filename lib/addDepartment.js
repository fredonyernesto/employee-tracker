const inquirer = require('inquirer');
const pool = require('../db/pool');

async function addDepartment() {
  try {
    const answers = await inquirer.prompt([

      {
        type: 'input',
        name: 'department',
        message: 'What is name of the department?',
      },
    ]);

    const { department } = answers;

    // Update the employee's role in the database
    await pool.query(
      'INSERT INTO department (name) VALUES ($1)',
      [department] 
    );

    console.log('Department was added to the database');
  } catch (error) {
    console.error('Error adding department', error);
  }
}

module.exports = { addDepartment };
