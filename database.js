const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'humanresources_db'
});

function getTable(tableName, cb) {
  connection.query(`SELECT * FROM ${tableName}`, function(err, results, fields){
    if (err) new Error(err);
    return cb(err, results, ...arguments)
  })
}

const insertQuery = {
  employee: (first_name, last_name, role_id) => `
    INSERT INTO employees (first_name, last_name, role_id)
    VALUES ("${first_name}", "${last_name}", "${role_id}");`,
  role: (title, salary, department_id) => `
    INSERT INTO roles (title, salary, department_id)
    VALUES ("${title}", "${salary}", "${department_id}");`,
  department: (department) => `
    INSERT INTO departments (name) 
    VALUES (${department});`
}

function addToDb(objType, args) {
  console.log(objType, ' add: ', args);
  const query = insertQuery[objType](...args);
  connection.insertQuery
}

module.exports = { getTable, insertQuery, addToDb };