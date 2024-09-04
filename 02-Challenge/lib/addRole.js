const inquirer = require('inquirer');
const pool = require('./db');

async function addRole() {
  try {
    // Fetch departments from the database
    const departmentResults = await pool.query('SELECT id, name FROM department');
    const departments = departmentResults.rows;

    // Convert departments to choice format
    const departmentChoices = departments.map(department => ({ name: department.name, value: department.id }));

    // Prompt the user for role details
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'What department does this role belong to?',
        choices: departmentChoices
      }
    ]);

    const { roleName, salary, departmentId } = answers;

    // Insert the new role into the database
    await pool.query(
      'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
      [roleName, salary, departmentId]
    );

    console.log('Role added successfully');
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

module.exports = { addRole };
