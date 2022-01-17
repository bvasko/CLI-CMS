const { getTable } = require("../database");

const parseAction = function(action) {
  const arr = action.split(" ");
  if (arr[0] === 'View') {
    return [getTable, arr[1]];
  }
  return [arr[0], arr[1]];
};

module.exports = parseAction;