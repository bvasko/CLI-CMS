const { getTable } = require("../database");

const parseAction = function(action) {
  const arr = action.split(" ");
  if (arr[0] === 'View') {
    return [getTable, arr[1]];
  }
  if (arr[0] === 'Add') {
    
  }

};

module.exports = parseAction;