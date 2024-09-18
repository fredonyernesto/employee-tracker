const inquirer = require('inquirer');
const pool = require('../db/pool');

async function del() {
  try {
    const departmentResults = await pool.query('SELECT id, name FROM department');
    const departments = departmentResults.rows;

    const rolesResult = await pool.query('SELECT id, title FROM role');
    const roles = rolesResult.rows;

    const employeeResults = await pool.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee');
    const employees = employeeResults.rows;

    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
    const employeeChoices = employees.map(employee => ({ name: employee.name, value: employee.id }));
    const departmentChoices = departments.map(department => ({ name: department.name, value: department.id }));

    const { deleteChoice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'deleteChoice',
        message: 'What would you like to delete?',
        choices: [
          'Department',
          'Role',
          'Employee'
        ]
      }
    ]);

    switch (deleteChoice) {
      case 'Department':
        const { departmentList } = await inquirer.prompt([
          {
            type: 'list',
            name: 'departmentList',
            message: 'What department would you like to delete?',
            choices: departmentChoices
          }
        ]);

        await pool.query(
          'DELETE FROM department WHERE id = $1',
          [departmentList]
        );
        console.log('Department successfully deleted');
        break;

      case 'Role':
        const { roleList } = await inquirer.prompt([
          {
            type: 'list',
            name: 'roleList',
            message: 'What role would you like to delete?',
            choices: roleChoices
          }
        ]);

        await pool.query(
          'DELETE FROM role WHERE id = $1',
          [roleList]
        );
        console.log('Role successfully deleted');
        break;

      case 'Employee':
        const { employeeList } = await inquirer.prompt([
          {
            type: 'list',
            name: 'employeeList',
            message: 'Which employee would you like to delete?',
            choices: employeeChoices
          }
        ]);

        await pool.query(
          'DELETE FROM employee WHERE id = $1',
          [employeeList]
        );
        console.log('Employee successfully deleted');
        break;

      default:
        console.log('No valid option selected.');
    }
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

module.exports = { del };
