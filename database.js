const database = require('./database.js');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'employee-tracker'
})

async function getTable(tableName) {
  const [rows] = await connection.promise().query(`
  SELECT * 
  FROM ${tableName}
  `)
  return rows;
}

module.exports = getTable;