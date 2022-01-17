const list = {
  type: 'list',
  name: 'action',
  message: 'What do you want to do?',
  choices: [
    'View employees',
    'Add employee',
    'Update employee role',
    'View roles',
    'Add role',
    'View departments',
    'Add department',
    'Quit'
  ]
};

const options = () => [

];

module.exports = {options, list};