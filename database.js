const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'humanresources_db'
});

function getTable(tableName) {
  connection.query(`
  SELECT * 
  FROM ${tableName}
  `, function(err, results, fields) {
    if (err) return err;
    console.table(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
    return results;
  })
}

//Define queries
const addEmployee = (first_name, last_name, role_id) => `
  INSERT INTO employee (first_name, last_name, role_id)
  VALUES ("${first_name}", "${last_name}", "${role_id}")`;

const addRole = (title, salary, department_id) => `
  INSERT INTO role (title, salary, department_id)
  VALUES ("${title}", "${salary}", "${department_id}")`;

const addDepartment = (department) => `
  INSERT INTO department (name) 
  VALUES (${department});`;

function addToDb(objType) {
}

module.exports = { getTable, addToDb };