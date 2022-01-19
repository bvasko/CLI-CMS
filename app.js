const inquirer = require('inquirer');

function app(database, userOptions) {
  const app = {};

  app.startApp = function() {
    inquirer
    .prompt(userOptions.list)
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
      database.getTable(model, app.displayRows);
      return;
    }
    if (queryType === 'Add') {
      //get model questions object from userOptions
      const options = userOptions.options.add[model];
      let list = '';
      /*
      * Check to see if the questions need a list from the db
      */
      if (options.hasList) {
        //create callback to pass to query, 
        //bind questions to arg list
        const askQuestions = function(err, results) {
          console.log('results ', results);
          console.log('arguments', arguments[0]())
        }.bind(null, [options.questions]);

        /* get list of options from database */
        database.getTable(options.list, askQuestions);
        return;
      }
      inquirer.prompt(options.questions())
        .then((answers) => {
          database.addToDb(model, [answers.name]);
          console.log('Department created');
        });
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