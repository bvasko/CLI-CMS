const express = require('express');
const inquirer = require('inquirer');
const userOptions = require('./userOptions.js');

function app(database) {
  const app = express()
  
  app.startApp = () => {
    inquirer
      .prompt(userOptions)
      .then((answers) => {
        // Use user feedback for... whatever!!
        console.log(answers)
        return answers;
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          throw new Error('prompt couldn\'t be rendered');
        } else {
          throw new Error(error);
        }
      });
  }

  app.post('/employee', async (req, res) => {

  });
  app.get('/employees', async (req, res) => {
    database.getTable('employees');
  })
  return app
}

module.exports = app;