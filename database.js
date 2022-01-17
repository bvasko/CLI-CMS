const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'humanresources_db'
})

async function getTable(tableName) {
  const [rows] = await connection.promise().query(`
  SELECT * 
  FROM ${tableName}
  `)
  return rows;
}

module.exports = getTable;