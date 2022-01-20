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
    employee: {
      list: ['roles', 'employees'],
      questions: (roles, employees) => {
        const roleTitles = roles.map(role => role.title)
        const employeeTitles = employees.map(employee => `${employee.first_name} ${employee.last_name} : ${employee.id}`)
        return [
        {
          type: 'list', 
          name: 'employeeName',
          message: 'Which employee\'s role do you want to update?',
          choices: employeeTitles
        },
        {
          type: 'list', 
          name: 'roleTitle',
          message: 'Which role do you want to assign to the selected employee?',
          choices: roleTitles
        }
      ]}
    }
  }
}
module.exports = {options, list};