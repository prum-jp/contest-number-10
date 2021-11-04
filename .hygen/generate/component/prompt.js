module.exports = [
  {
    type: 'select',
    name: 'category',
    message: "Choose the component's category",
    choices: ['atoms', 'molecules', 'organisms', 'templates'],
  },
  {
    type: 'input',
    name: 'name',
    message: "Enter the component's name (Don't put the Initial of Category. Write in camel case.)",
  },
]
