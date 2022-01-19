const inquirer = require('inquirer');

function app(database, userOptions) {
  const app = {};

  app.startApp = function(questions) {
    inquirer
    .prompt(questions)
    .then((answers) => {
      console.log("You chose: ", answers.action);
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

    if (queryType === 'View') {
      database.getTable(model).then(rows => {
        console.table(rows);
        app.startApp(userOptions.list);
      });
      return;
    }

    if (queryType === 'Add') {
      //get model questions object from userOptions
      const options = userOptions.options.add[model];
      console.log(options)
      let questions = '';
      /*
      * Check to see if the questions need a list from the db
      */
      if (options.hasList) {
        /* get list of options from database */
        database.getTable(options.list).then((rows) => {
          // Get the questions array from the object
          questions = options.questions(rows);
          inquirer.prompt(questions)
            .then((answers) => {
              database.addToDb(model, answers, rows);
              console.log(model, ' created');
              app.startApp(userOptions.list);
            });
        });
      } else {
        questions = options.questions();
        inquirer.prompt(questions)
            .then((answers) => {
              database.addToDb(model, answers.name, null);
              console.log(model, ' created');
              app.startApp(userOptions.list);
            });
      }
    }
  };
  
  app.displayRows = (err, results) => {
    if (err) console.error(err);
    console.table(results);
    return results;
  };

  return app;
}

module.exports = app;