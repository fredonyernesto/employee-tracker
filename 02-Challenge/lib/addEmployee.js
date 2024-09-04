const inquirer = require('inquirer');
const pool = require('./db');

async function addEmployee() {
  try {
    // Fetch roles from database
    const rolesResult = await pool.query('SELECT id, title FROM roles');
    const roles = rolesResult.rows;

    // Fetch managers from database
    const managersResult = await pool.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employees WHERE manager_id IS NULL');
    const managers = managersResult.rows;

    // Convert roles and managers to choice format
    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
    const managerChoices = managers.map(manager => ({ name: manager.name, value: manager.id }));
    managerChoices.push({ name: 'None', value: null });

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter employee first name:'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter employee last name:'
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select employee role:',
        choices: roleChoices
      },
      {
        type: 'list',
        name: 'managerId',
        message: 'Select employee manager (or None):',
        choices: managerChoices
      }
    ]);

    const { firstName, lastName, roleId, managerId } = answers;

    await pool.query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
       VALUES ($1, $2, $3, $4)`,
      [firstName, lastName, roleId, managerId]
    );

    console.log('Employee added successfully');
  } catch (error) {
    console.error(error);
  }
}

module.exports = { addEmployee };
