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

const options = {
  add: {
    employee: {
      hasList: true,
      list: 'roles',
      questions: (roles) => {
        const roleTitles = roles.map(role => role.title)
        return [
        {
          type: 'input', 
          name: 'first_name',
          message: 'Enter first name'
        },
        {
          type: 'input', 
          name: 'last_name',
          message: 'Enter last name'
        },
        {
          type: 'list', 
          name: 'role',
          message: 'Select Role',
          choices: roleTitles
        }
      ]}
    },
    department: {
      hasList: false,
      questions: () => {
      return {
        type: 'input', 
        name: 'name',
        message: 'Enter department name'
      }}
    },
    role: {
      hasList: true,
      list: 'departments',
      questions: (departments) => {
        const departmentTitles = departments.map(department => department.name)
        console.log(departments, departmentTitles)
        return [
        {
          type: 'input', 
          name: 'title',
          message: 'Enter title'
        },
        {
          type: 'input', 
          name: 'salary',
          message: 'Enter salary'
        },
        {
          type: 'list', 
          name: 'departmentTitle',
          message: 'Select Department',
          choices: departmentTitles
        }
      ]}
    }
  },
  update: {
    employee: []
  }
}
module.exports = {options, list};