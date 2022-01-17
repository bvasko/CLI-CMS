// const express = require('express');
const inquirer = require('inquirer');
const { getTable } = require('./database');

function app(database, userOptions) {
  const app = {};
  const action = '';

  app.startApp = async function() {
    await inquirer
      .prompt(userOptions.list)
      .then((answers) => {
        // Use user feedback for... whatever!!
        console.log("You chose: ", answers.action);
        action = answers.action;
        return answers.action;
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
  
  app.getRows = function getRows(tableName){
    return getTable(tableName);
  }

  return app;
}

module.exports = app;