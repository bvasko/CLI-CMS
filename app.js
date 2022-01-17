const express = require('express');

function app(database) {
  const app = express()
  app.post('/employee', async (req, res) => {

  });
  app.get('/employees', async (req, res) => {
    database.getTable('employees');
  })
  return app
}

module.exports = app;