const { up } = require('inquirer/lib/utils/readline');
const mysql = require('mysql2/promise');

async function getTable(tableName) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'humanresources_db'
  });
  const [rows] = await connection.execute(`SELECT * FROM ${tableName}`)
  return rows;
}

const insertQuery = {
  employee: (vals, roles) => {
    const {first_name, last_name, role: roleTitle} = vals;
    const role_id = roles.filter(role => role.title === roleTitle)[0].id;
    return `INSERT INTO employees (first_name, last_name, role_id)
    VALUES ("${first_name}", "${last_name}", "${role_id}");`
  },
  role: (vals, departments) => {
    const {title, salary, departmentTitle} = vals;
    const department_id = departments.filter(dept => dept.name === departmentTitle)[0].id;
    return {
      queryStr: `INSERT INTO roles (title, salary, department_id)
        VALUES (?, ?, ?)`,
      queryValues: [title, salary, department_id]
    }
  },
  department: (department) => {
    return `INSERT INTO departments (name) 
    VALUES ("${department}");`}
}

const updateQuery = {
  employee: (roleId, employeeId) => {
    return {
      queryStr: `UPDATE employees SET role_id = ? WHERE id = ?`,
      queryValues: [roleId, employeeId]
    }
  }
}


async function addToDb(objType, answers, rows) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'humanresources_db'
  });
  const sqlQuery = insertQuery[objType](answers, rows);
  await connection.execute(sqlQuery.queryStr, sqlQuery.queryValues);
}

async function updateDb(role, roleId, employeeId) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'humanresources_db'
  });
  const sqlQuery = updateQuery[role](roleId, employeeId)
  await connection.execute(sqlQuery.queryStr, sqlQuery.queryValues);
}

module.exports = { getTable, addToDb, updateDb };