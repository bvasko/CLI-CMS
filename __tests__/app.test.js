const request = require('supertest');
const makeApp = require('../app.js');
const inquirer = require('inquirer');
const userOptions = require('../userOptions.js');

jest.mock('inquirer');

const getEmployees = jest.fn()

const app = makeApp({
  getEmployees
})

describe('Command line application that accepts user input', () => {
  it("should prompt the user to make a selection", async () => {
    // expect.assertions(1);
    inquirer.prompt = jest.fn().mockResolvedValue({ name: 'View employees' });
    console.log(app.startApp())
    await expect(app.startApp()).resolves.toEqual({ name: 'View employees' });
  })
  it("should show department names and ids when view departments is selected", () => {

  })
  it("should show job title, role id, department role belongs to, and salary for role", () => {

  })
  it("should show employee data: ids, first name, last name, job title, department, salary, and managers", () => {

  })
  it("should prompt me when I choose add department for department name", () => {

  })
  it("should add the department to the database", () => {

  })
  it("should prompt me when I add an employee for first name, last name, role, manager", () => {

  })
  it("should add the employee to the database", () => {

  })
  it("when I update an employee it should prompt me to select an employee and update their role", () => {

  })
})