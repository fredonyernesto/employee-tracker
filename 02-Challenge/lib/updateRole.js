const inquirer = require('inquirer');
const pool = require('./db');

async function updateRole() {
  try {
    // Fetch roles from the database
    const rolesResult = await pool.query('SELECT id, title FROM roles');
    const roles = rolesResult.rows;

    // Fetch employees from the database
    const employeeResults = await pool.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employees');
    const employees = employeeResults.rows;

    // Convert roles and employees to choice format
    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
    const employeeChoices = employees.map(employee => ({ name: employee.name, value: employee.id }));

    // Prompt user for input
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee\'s role do you want to update?',
        choices: employeeChoices
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Which role do you want to assign to the selected employee?',
        choices: roleChoices
      },
    ]);

    const { employeeId, roleId } = answers;

    // Update the employee's role in the database
    await pool.query(
      'UPDATE employees SET role_id = $1 WHERE id = $2',
      [roleId, employeeId] 
    );

    console.log('Employee role updated successfully');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}

module.exports = { updateRole };
