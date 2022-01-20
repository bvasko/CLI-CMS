const inquirer = require('inquirer');
const logo = require('asciiart-logo');

console.log(
  logo({
      name: 'Employee Manager',
      // font: 'Speed',
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: 'grey',
      logoColor: 'bold-cyan',
      textColor: 'green',
  })
  .emptyLine()
  .right('version 1.0')
  .emptyLine()
  .center('by Bonnie Dipasquale')
  .render()
);

function app(database, userOptions) {
  const app = {};

  app.startApp = function(questions) {
    inquirer
    .prompt(questions)
    .then((answers) => {
      app.doAction(answers.action);
    });
  }

  app.doAction = function(action) {
    const arr = action.split(" ");
    /*
      Split answer string into array: [{queryType}, {model}]
      So 'view roles' will be ['view', 'roles']
    */
    const [queryType, model] = arr;
    switch(queryType) {
      case 'View': {
        database.getTable(model).then(rows => {
          console.table(rows);
          app.startApp(userOptions.list);
        });
        break;
      }
      case 'Add': {
        //get model questions object from userOptions
        const options = userOptions.options.add[model];
        let questions = '';
        
        if (options.hasList) {
          /* get list of options from database */
          database.getTable(options.list).then((rows) => {
            // Get the questions array from the object
            questions = options.questions(rows);
            inquirer.prompt(questions)
              .then((answers) => {
                database.addToDb(model, answers, rows);
                app.startApp(userOptions.list);
              });
          });
        } else {
          questions = options.questions();
          inquirer.prompt(questions)
              .then((answers) => {
                database.addToDb(model, answers.name, null);
                app.startApp(userOptions.list);
              });
        }
        break;
      }
      case 'Update': {
        const options = userOptions.options.update[model];
        const [roles, employees] = options.list;
        database.getTable(roles).then((rolesList) => {
          database.getTable(employees).then((employeeList) => {
            questions = options.questions(rolesList, employeeList);
            inquirer.prompt(questions)
              .then((answers) => {
                const employeeId = answers.employeeName.split(':')[1]
                const roleId = rolesList.filter( role => answers.roleTitle === role.title )[0].id;
                database.updateDb(model, roleId, employeeId);
                app.startApp(userOptions.list);
              });
          });
        });
       break;
      }
      case 'Quit': {
        process.exit()
        break;
      }
    }
  };

  return app;
}

module.exports = app;