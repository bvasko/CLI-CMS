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
    return `INSERT INTO roles (title, salary, department_id)
    VALUES ("${title}", "${salary}", "${department_id}");`},
  department: (department) => {
    return `INSERT INTO departments (name) 
    VALUES ("${department}");`}
}


async function addToDb(objType, answers, rows) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'humanresources_db'
  });
  const sqlQuery = insertQuery[objType](answers, rows);
  await connection.query(sqlQuery);
}

module.exports = { getTable, insertQuery, addToDb };